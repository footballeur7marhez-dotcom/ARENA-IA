"""Mini-emulateur ARMv4T (Thumb-1) pour verifier le code du hack hors-ligne.

Ne couvre que les encodages produits par tasm.py : c'est volontaire, il sert a
executer le selecteur de starter et a verifier qu'il ne plante pas.
"""
import struct

BIOS = 0x00000000
EWRAM = 0x02000000
IWRAM = 0x03000000
IO = 0x04000000
PRAM = 0x05000000
VRAM = 0x06000000
ROMBASE = 0x08000000


class Emu:
    def __init__(self, rom, ewram=None, iwram=None):
        self.rom = rom
        self.mem = {}
        self.mem[EWRAM] = bytearray(ewram if ewram is not None else b'\x00' * 0x40000)
        self.mem[IWRAM] = bytearray(iwram if iwram is not None else b'\x00' * 0x8000)
        self.mem[IO] = bytearray(0x400)
        self.mem[PRAM] = bytearray(0x400)
        self.mem[VRAM] = bytearray(0x18000)
        self.r = [0] * 16
        self.n = self.z = self.c = self.v = 0
        self.count = 0
        self.trace = []
        # touches : bits actifs a l'etat bas ; 0x3FF = aucune touche
        self.keys = 0x03FF
        # VBlank toujours actif
        self.mem[IO][4] |= 1
        # KEYINPUT actif-bas : 0x3FF = aucune touche enfoncee
        self.mem[IO][0x130] = 0xFF
        self.mem[IO][0x131] = 0x03
        self.hooks = {}
        self.schedule = []

    # ------------------------------------------------------------- memoire
    def _region(self, addr):
        for base, buf in self.mem.items():
            if base <= addr < base + len(buf):
                return buf, addr - base
        if ROMBASE <= addr < ROMBASE + len(self.rom):
            return self.rom, addr - ROMBASE
        return None, None

    def rd8(self, a):
        buf, o = self._region(a)
        return buf[o] if buf is not None else 0

    def rd16(self, a):
        return self.rd8(a) | (self.rd8(a + 1) << 8)

    def rd32(self, a):
        return self.rd16(a) | (self.rd16(a + 2) << 16)

    def wr8(self, a, v):
        buf, o = self._region(a)
        if buf is not None:
            buf[o] = v & 0xFF

    def wr16(self, a, v):
        self.wr8(a, v & 0xFF)
        self.wr8(a + 1, (v >> 8) & 0xFF)

    def wr32(self, a, v):
        self.wr16(a, v & 0xFFFF)
        self.wr16(a + 2, (v >> 16) & 0xFFFF)

    # ------------------------------------------------------------- drapeaux
    def _sub(self, a, b):
        r = (a - b) & 0xFFFFFFFF
        self.n = 1 if r & 0x80000000 else 0
        self.z = 1 if r == 0 else 0
        self.c = 1 if a >= b else 0
        self.v = 1 if ((a ^ b) & (a ^ r) & 0x80000000) else 0
        return r

    def _add(self, a, b):
        r = (a + b) & 0xFFFFFFFF
        self.n = 1 if r & 0x80000000 else 0
        self.z = 1 if r == 0 else 0
        self.c = 1 if r < a else 0
        self.v = 1 if ((a ^ r) & (b ^ r) & 0x80000000) else 0
        return r

    # ------------------------------------------------------------- execution
    def step(self, pc):
        ins = self.rd16(pc)
        nxt = pc + 2
        r = self.r
        hi = ins >> 12

        # ---- decalages immediats / ALU registre (0x0000-0x0FFF, 0x4000-0x43FF)
        if hi in (0, 1) or (0x4000 <= ins < 0x4400):
            op = (ins >> 11) & 0x1F if hi in (0, 1) else None
            if hi in (0, 1):
                opcode = (ins >> 11) & 3
                imm5 = (ins >> 6) & 0x1F
                rm = (ins >> 3) & 7
                rd = ins & 7
                if opcode == 0:                       # lsls
                    val = (r[rm] << imm5) & 0xFFFFFFFF
                    self._shift_flags(val, imm5, r[rm])
                    r[rd] = val
                elif opcode == 1:                     # lsrs (0 = #32)
                    val = 0 if imm5 == 0 else (r[rm] & 0xFFFFFFFF) >> imm5
                    self._shift_flags(val, imm5, r[rm])
                    r[rd] = val
                elif opcode == 2:                     # asrs
                    val = _asr(r[rm] & 0xFFFFFFFF, imm5)
                    self._shift_flags(val, imm5, r[rm])
                    r[rd] = val
                else:                                 # adds/subs registre
                    rn = (ins >> 3) & 7                  # bits 5-3 = Rn
                    rm = (ins >> 6) & 7                  # bits 8-6 = Rm
                    if ins & 0x0200:
                        r[rd] = self._sub(r[rn], r[rm])
                    else:
                        r[rd] = self._add(r[rn], r[rm])
            else:
                alu = (ins >> 6) & 0xF
                rm = (ins >> 3) & 7
                rd = ins & 7
                a, b = r[rd] & 0xFFFFFFFF, r[rm] & 0xFFFFFFFF
                if alu == 0x0:      r[rd] = a & b
                elif alu == 0x1:    r[rd] = a ^ b
                elif alu == 0x2:    r[rd] = _shl(a, b)
                elif alu == 0x3:    r[rd] = (a & 0xFFFFFFFF) >> (b & 0xFF)
                elif alu == 0x4:    r[rd] = _asr(a, b)
                elif alu == 0x5:    r[rd] = self._add(a, b)
                elif alu == 0x6:    r[rd] = self._sub(a, b)
                elif alu == 0x7:    r[rd] = _ror(a, b)
                elif alu == 0x8:    r[rd] = a & b; self._tst(a, b)
                elif alu == 0x9:    r[rd] = self._sub(0, b); self.n = 1 if (r[rd] & 0x80000000) else 0; self.z = 1 if r[rd] == 0 else 0
                elif alu == 0xA:    self._sub(a, b)
                elif alu == 0xB:    self._add(a, b); self.n = 1 if r[rd] & 0x80000000 else 0
                elif alu == 0xC:    r[rd] = a | b
                elif alu == 0xD:    r[rd] = a * b & 0xFFFFFFFF
                elif alu == 0xE:    r[rd] = a & (~b & 0xFFFFFFFF)
                else:               r[rd] = (~b) & 0xFFFFFFFF
            return nxt

        # ---- operations sur registres hauts (0x4400-0x47FF)
        if 0x4400 <= ins < 0x4800:
            op = (ins >> 8) & 3
            h1 = (ins >> 7) & 1
            h2 = (ins >> 6) & 1
            rm = ((ins >> 3) & 7) | (h2 << 3)
            rd = (ins & 7) | (h1 << 3)
            if op == 0:
                r[rd] = self._add(r[rd] & 0xFFFFFFFF, r[rm] & 0xFFFFFFFF)
            elif op == 1:
                self._sub(r[rd] & 0xFFFFFFFF, r[rm] & 0xFFFFFFFF)
            elif op == 2:
                r[rd] = r[rm] & 0xFFFFFFFF
            else:
                if ins & 0x0080:                    # blx
                    r[14] = (pc + 4) | 1
                return r[rm] & ~1
            return nxt

        # ---- immediates 32 bits (0x2000-0x3FFF)
        if 0x2000 <= ins < 0x4000:
            op = (ins >> 11) & 3
            rd = (ins >> 8) & 7
            imm = _thumb_imm(ins & 0xFF)
            if op == 0:      r[rd] = imm; self._tst(imm, 0)
            elif op == 1:    self._sub(r[rd] & 0xFFFFFFFF, imm)
            elif op == 2:    r[rd] = self._add(r[rd] & 0xFFFFFFFF, imm)
            else:            r[rd] = self._sub(r[rd] & 0xFFFFFFFF, imm)
            return nxt

        # ---- format 6 : ldr/str [rn, #imm] (mot 0x6xxx, octet 0x7xxx, demi 0x8xxx)
        if 0x6000 <= ins < 0x9000:
            nib = ins >> 12
            load = (ins >> 11) & 1
            imm5 = (ins >> 6) & 0x1F
            rn = (ins >> 3) & 7
            rt = ins & 7
            off = imm5 * (4 if nib == 6 else (2 if nib == 8 else 1))
            a = r[rn] + off
            if nib == 6:
                if load: r[rt] = self.rd32(a)
                else:    self.wr32(a, r[rt])
            elif nib == 8:
                if load: r[rt] = self.rd16(a)
                else:    self.wr16(a, r[rt])
            else:
                if load: r[rt] = self.rd8(a)
                else:    self.wr8(a, r[rt])
            return nxt

        # ---- ldr/str [sp, #imm] et ldr [pc, #imm]
        if 0x4800 <= ins < 0x5000:                       # ldr pc
            rt = (ins >> 8) & 7
            imm = (ins & 0xFF) * 4
            base = (pc + 4) & ~3
            r[rt] = self.rd32(base + imm)
            return nxt
        if 0x9000 <= ins < 0xA000:
            rt = (ins >> 8) & 7
            imm = (ins & 0xFF) * 4
            if ins & 0x0800:                             # ldr rt, [sp, #imm]
                r[rt] = self.rd32(r[13] + imm)
            else:                                        # str rt, [sp, #imm]
                self.wr32(r[13] + imm, r[rt])
            return nxt

        # ---- add rd, pc, #imm (0xA000) / add rd, sp, #imm (0xA800)
        if 0xA000 <= ins < 0xB000:
            rd = (ins >> 8) & 7
            imm = (ins & 0xFF) * 4
            if ins & 0x0800:
                r[rd] = (r[13] + imm) & 0xFFFFFFFF       # add rd, sp, #imm
            else:
                r[rd] = (((pc + 4) & ~3) + imm) & 0xFFFFFFFF   # add rd, pc, #imm
            return nxt

        # ---- push / pop (registres en ordre croissant, adresses croissantes)
        if 0xB400 <= ins < 0xB600:
            regs = [k for k in range(8) if ins & (1 << k)]
            if ins & 0x0100:
                regs.append(14)
            base = (r[13] - 4 * len(regs)) & 0xFFFFFFFF
            for i, k in enumerate(regs):
                self.wr32(base + 4 * i, r[k])
            r[13] = base
            return nxt
        if 0xBC00 <= ins < 0xBE00:
            regs = [k for k in range(8) if ins & (1 << k)]
            has_pc = bool(ins & 0x0100)
            for i, k in enumerate(regs):
                r[k] = self.rd32(r[13] + 4 * i)
            r[13] = (r[13] + 4 * len(regs)) & 0xFFFFFFFF
            if has_pc:
                val = self.rd32(r[13])
                r[13] = (r[13] + 4) & 0xFFFFFFFF
                self.r[15] = val & ~1
                return val & ~1
            return nxt

        # ---- sub sp / add sp (#imm7)
        if 0xB000 <= ins < 0xB200 and not (ins & 0x0E00):
            imm7 = (ins & 0x7F) * 4
            if ins & 0x0080:
                r[13] = (r[13] - imm7) & 0xFFFFFFFF      # sub sp, #imm7
            else:
                r[13] = (r[13] + imm7) & 0xFFFFFFFF      # add sp, #imm7
            return nxt

        # ---- bl
        if 0xF000 <= ins < 0xF800:
            ins2 = self.rd16(pc + 2)
            off = ((ins & 0x7FF) << 11) | (ins2 & 0x7FF)
            s = (ins >> 10) & 1
            j1 = (ins2 >> 13) & 1
            j2 = (ins2 >> 11) & 1
            i1 = (j1 ^ 1) ^ s
            i2 = (j2 ^ 1) ^ s
            off = (s << 24) | (i1 << 23) | (i2 << 22) | off
            if off & 0x1000000:                 # bit 24 = bit de signe
                off -= 0x2000000
            r[14] = (pc + 4) | 1
            return (pc + 4 + off * 2) & ~1

        # ---- bx
        if 0x4700 <= ins < 0x4800:
            rm = (ins >> 3) & 0xF
            return r[rm] & ~1

        # ---- b / b<cond>
        if 0xE000 <= ins < 0xF000:
            off = ins & 0x7FF
            if off & 0x400:
                off -= 0x800
            return pc + 4 + off * 2
        if 0xD000 <= ins < 0xDE00:
            cond = (ins >> 8) & 0xF
            off = ins & 0xFF
            if off & 0x80:
                off -= 0x100
            if self._cond(cond):
                return pc + 4 + off * 2
            return nxt

        raise Exception('instruction non geree : 0x%04X @ 0x%08X' % (ins, pc))

    def _cond(self, c):
        n, z, cc, v = self.n, self.z, self.c, self.v
        return [z == 1, z == 0, cc == 1, cc == 0, n == 1, n == 0, v == 1,
                v == 0, cc == 1 and z == 0, cc == 0 or z == 1, n == v,
                n != v, z == 0 and n == v, z == 1 or n != v, True, False][c]

    def _shift_flags(self, res, amount, val):
        if amount:
            self.n = 1 if res & 0x80000000 else 0
            self.z = 1 if res == 0 else 0
            self.c = 1 if (val >> (amount - 1)) & 1 else 0

    def _tst(self, a, b):
        res = a & b
        self.n = 1 if res & 0x80000000 else 0
        self.z = 1 if res == 0 else 0

    # ------------------------------------------------------------- boucle
    def run(self, pc, max_steps=400000, until=None, keys_after=None):
        """Execute jusqu'a ce que pc atteigne `until` (ou max_steps)."""
        self.r[15] = pc
        steps = 0
        while steps < max_steps:
            if until is not None and self.r[15] == until:
                return 'ok', steps
            if keys_after is not None and steps >= keys_after:
                self.mem[IO][0x130] = self.keys & 0xFF
                self.mem[IO][0x131] = (self.keys >> 8) & 0xFF
                keys_after = None
            while self.schedule and steps >= self.schedule[0][0]:
                _, m = self.schedule.pop(0)
                self.mem[IO][0x130] = m & 0xFF
                self.mem[IO][0x131] = (m >> 8) & 0xFF
            pc = self.r[15]
            self.r[15] = self.step(pc)
            # simulation immediate des DMA
            self._dma()
            steps += 1
            self.count += 1
        return 'timeout', steps

    def _dma(self):
        io = self.mem[IO]
        for ch, base in ((0, 0xB0), (1, 0xBC), (2, 0xC8), (3, 0xD4)):
            cnt = struct.unpack_from('<I', io, base + 8)[0]
            if not (cnt & 0x80000000):
                continue
            sad = struct.unpack_from('<I', io, base)[0]
            dad = struct.unpack_from('<I', io, base + 4)[0]
            n = cnt & 0xFFFF
            wide = (cnt >> 26) & 1          # bit 10 de CNT_H
            if wide:
                for _ in range(n):
                    self.wr32(dad, self.rd32(sad)); sad += 4; dad += 4
            else:
                for _ in range(n):
                    self.wr16(dad, self.rd16(sad)); sad += 2; dad += 2
            struct.pack_into('<I', io, base + 8, cnt & ~0x80000000)


def _thumb_imm(imm):
    return (imm >> (2 * ((imm >> 8) & 0xF))) & 0xFFFFFFFF if imm else 0


def _shl(a, b):
    b &= 0xFF
    return (a << b) & 0xFFFFFFFF if b < 32 else 0


def _asr(a, b):
    b &= 0xFF
    if b >= 32:
        return 0xFFFFFFFF if a & 0x80000000 else 0
    return (a >> b) | (0xFFFFFFFF << (32 - b)) if a & 0x80000000 else a >> b


def _ror(a, b):
    b &= 0xFF
    b &= 31
    return ((a >> b) | (a << (32 - b))) & 0xFFFFFFFF if b else a

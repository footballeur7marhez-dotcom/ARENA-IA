"""Assembleur Thumb-1 minimal pour le hack ROM Pokemon FireRed.

Encodages supportes (ARMv4T) :
  push/pop, mov (hauts registres), ldr/str/ldrb/strb/ldrh/strh ([rx + #imm]
  ou [sp + #imm]), ldr [pc, #imm] (pools de litteraux), shifts immediats,
  ALU registre, adds/subs (imm3, imm8 ou registre), add/sub sp,
  add rx, sp, #imm, bl, b, b<cond>, bx.
"""
import struct

CONDS = {'eq': 0x0, 'ne': 0x1, 'cs': 0x2, 'hs': 0x2, 'cc': 0x3, 'lo': 0x3,
         'mi': 0x4, 'pl': 0x5, 'vs': 0x6, 'vc': 0x7, 'hi': 0x8, 'ls': 0x9,
         'ge': 0xA, 'lt': 0xB, 'gt': 0xC, 'le': 0xD, 'al': 0xE}

ALU = {'ands': 0x4000, 'eors': 0x4040, 'lsl': 0x4080, 'lsr': 0x40C0,
       'asr': 0x4100, 'adcs': 0x4140, 'sbcs': 0x4180, 'rors': 0x41C0,
       'tst': 0x4200, 'negs': 0x4240, 'cmp': 0x4280, 'cmn': 0x42C0,
       'orrs': 0x4300, 'muls': 0x4340, 'bics': 0x4380, 'mvns': 0x43C0}


def _imm8(v):
    """Code une immediate 32 bits en (imm8, rotation) ; None si impossible."""
    v &= 0xFFFFFFFF
    for rot in range(16):
        r = (v >> (rot * 2)) | ((v << (32 - rot * 2)) & 0xFFFFFFFF) if rot else v
        r &= 0xFFFFFFFF
        if r <= 0xFF:
            return r, rot
    return None


class Asm:
    def __init__(self, base):
        self.base = base
        self.items = []

    # ---------------------------------------------------------- constructeurs
    def label(self, name):
        self.items.append(('label', name, None))
        return self

    def i(self, mnem, *a):
        self.items.append(('ins', mnem, a))
        return self

    def lit(self, rd, value):
        self.items.append(('ins', 'lit', (rd, value & 0xFFFFFFFF)))
        return self

    def load(self, rd, value):
        value &= 0xFFFFFFFF
        if value <= 0xFF:
            self.i('movs', rd, value)
        else:
            self.lit(rd, value)
        return self

    def push(self, regs):
        self.i('push', tuple(regs))
        return self

    def pop(self, regs):
        self.i('pop', tuple(regs))
        return self

    def bl(self, target):
        self.i('bl', target)
        return self

    def blabs(self, addr):
        self.i('blabs', addr)
        return self

    def b(self, target):
        self.i('b', target)
        return self

    def bc(self, cond, target):
        self.i('bc', cond, target)
        return self

    def bx(self, reg):
        self.i('bx', reg)
        return self

    def subspace(self, n):
        assert n >= 0 and n % 4 == 0, 'subspace %d' % n
        while n:
            step = min(n, 508)
            self.i('subspr', step)
            n -= step
        return self

    def addframe(self, n):
        assert n >= 0 and n % 4 == 0, 'addframe %d' % n
        while n:
            step = min(n, 508)
            self.i('addspr', step)
            n -= step
        return self

    def addrsp(self, rd, imm):
        self.i('addrsp', rd, imm)
        return self

    def pool_here(self):
        self.items.append(('pool', None, None))
        return self

    # -------------------------------------------------------------- assemblage
    def assemble(self):
        labels = {}
        pool_words = {}
        lit_target = {}
        pending = []

        def size_of(it):
            return 4 if (it[0] == 'ins' and it[1] in ('bl', 'blabs')) else 2

        # ---- passe 1 : adresses ----
        addr = self.base
        for idx, it in enumerate(self.items):
            if it[0] == 'label':
                labels[it[1]] = addr
            elif it[0] == 'pool':
                addr = (addr + 3) & ~3
                seen, words = {}, []
                for pidx, val in pending:
                    if val not in seen:
                        seen[val] = len(words)
                        words.append(val)
                    lit_target[pidx] = addr + seen[val] * 4
                pool_words[idx] = words
                pending = []
                addr += len(words) * 4
            else:
                if it[1] == 'lit':
                    pending.append((idx, it[2][1]))
                addr += size_of(it)
        assert not pending, 'lit sans pool_here()'
        total = addr - self.base

        # ---- passe 2 : encodage ----
        out = bytearray(total)
        addr = self.base
        for idx, it in enumerate(self.items):
            if it[0] == 'label':
                continue
            if it[0] == 'pool':
                addr = (addr + 3) & ~3
                for w in pool_words[idx]:
                    struct.pack_into('<I', out, addr - self.base, w)
                    addr += 4
                continue
            if it[1] == 'lit':
                rd = it[2][0]
                off = lit_target[idx] - ((addr + 4) & ~3)
                assert 0 <= off <= 1020, 'literal pool hors de portee (%d)' % off
                struct.pack_into('<H', out, addr - self.base,
                                 0x4800 | (rd << 8) | (off // 4))
            else:
                enc = _encode(it[1], it[2], addr, labels)
                struct.pack_into('<%dH' % (len(enc) // 2), out, addr - self.base,
                                 *struct.unpack('<%dH' % (len(enc) // 2), enc))
            addr += size_of(it)
        return bytes(out), labels


def _encode(mnem, a, addr, labels):
    # ---- format 3 : movs/cmp/adds/subs #imm8 ----
    if mnem == 'movs':
        enc = _imm8(a[1])
        assert enc is not None, 'movs #%d' % a[1]
        imm, rot = enc
        return struct.pack('<H', 0x2000 | (rot << 12) | (a[0] << 8) | imm)
    if mnem == 'cmpi':
        enc = _imm8(a[1])
        assert enc is not None, 'cmpi #%d' % a[1]
        imm, rot = enc
        return struct.pack('<H', 0x2800 | (rot << 12) | (a[0] << 8) | imm)
    if mnem == 'addsi':
        enc = _imm8(a[1])
        assert enc is not None, 'addsi #%d' % a[1]
        imm, rot = enc
        return struct.pack('<H', 0x3000 | (rot << 12) | (a[0] << 8) | imm)
    if mnem == 'subsi':
        enc = _imm8(a[1])
        assert enc is not None, 'subsi #%d' % a[1]
        imm, rot = enc
        return struct.pack('<H', 0x3800 | (rot << 12) | (a[0] << 8) | imm)
    # ---- format 2 : add/sub registre ou imm3 ----
    if mnem == 'adds':
        rd, rn, rm = a
        return struct.pack('<H', 0x1800 | (rm << 6) | (rn << 3) | rd)
    if mnem == 'subs':
        rd, rn, rm = a
        return struct.pack('<H', 0x1A00 | (rm << 6) | (rn << 3) | rd)
    if mnem == 'adds3':
        rd, rn, v = a
        assert 0 <= v <= 7, 'adds3 #%d' % v
        return struct.pack('<H', 0x1C00 | (v << 6) | (rn << 3) | rd)
    if mnem == 'subs3':
        rd, rn, v = a
        assert 0 <= v <= 7, 'subs3 #%d' % v
        return struct.pack('<H', 0x1D00 | (v << 6) | (rn << 3) | rd)
    # ---- format 1 : shifts immediats ----
    if mnem == 'lsls':
        assert 1 <= a[2] <= 31
        return struct.pack('<H', 0x0000 | (a[2] << 6) | (a[1] << 3) | a[0])
    if mnem == 'lsrs':
        assert 1 <= a[2] <= 31
        return struct.pack('<H', 0x0800 | (a[2] << 6) | (a[1] << 3) | a[0])
    if mnem == 'asrs':
        assert 1 <= a[2] <= 31
        return struct.pack('<H', 0x1000 | (a[2] << 6) | (a[1] << 3) | a[0])
    # ---- format 4 : ALU registre ----
    if mnem in ALU:
        return struct.pack('<H', ALU[mnem] | (a[1] << 3) | a[0])
    # ---- format 5 : registres hauts ----
    if mnem == 'movhi':
        rd, rm = a
        return struct.pack('<H', 0x4600 | (((rd >> 3) & 1) << 7)
                           | ((rm & 0xF) << 3) | (rd & 7))
    # ---- chargement / stockage ----
    if mnem == 'ldr':
        rd, rn, off = a
        assert off >= 0 and off % 4 == 0 and off // 4 <= 31, 'ldr #%d' % off
        if rn == 13:
            assert off // 4 <= 255, 'ldr sp #%d' % off
            return struct.pack('<H', 0x9800 | (rd << 8) | (off // 4))
        assert 0 <= rn <= 7, 'ldr: base r%d' % rn
        return struct.pack('<H', 0x6800 | ((off // 4) << 6) | (rn << 3) | rd)
    if mnem == 'str':
        rd, rn, off = a
        assert off >= 0 and off % 4 == 0 and off // 4 <= 31, 'str #%d' % off
        if rn == 13:
            assert off // 4 <= 255, 'str sp #%d' % off
            return struct.pack('<H', 0x9000 | (rd << 8) | (off // 4))
        assert 0 <= rn <= 7, 'str: base r%d' % rn
        return struct.pack('<H', 0x6000 | ((off // 4) << 6) | (rn << 3) | rd)
    if mnem == 'strb':
        rd, rn, off = a
        assert 0 <= off <= 31, 'strb #%d' % off
        assert 0 <= rn <= 7, 'strb: base r%d' % rn
        return struct.pack('<H', 0x7000 | (off << 6) | (rn << 3) | rd)
    if mnem == 'ldrb':
        rd, rn, off = a
        assert 0 <= off <= 31, 'ldrb #%d' % off
        assert 0 <= rn <= 7, 'ldrb: base r%d' % rn
        return struct.pack('<H', 0x7800 | (off << 6) | (rn << 3) | rd)
    if mnem == 'ldrh':
        rd, rn, off = a
        assert off >= 0 and off % 2 == 0 and off // 2 <= 31, 'ldrh #%d' % off
        assert 0 <= rn <= 7, 'ldrh: base r%d' % rn
        return struct.pack('<H', 0x8800 | ((off // 2) << 6) | (rn << 3) | rd)
    if mnem == 'strh':
        rd, rn, off = a
        assert off >= 0 and off % 2 == 0 and off // 2 <= 31, 'strh #%d' % off
        assert 0 <= rn <= 7, 'strh: base r%d' % rn
        return struct.pack('<H', 0x8000 | ((off // 2) << 6) | (rn << 3) | rd)
    if mnem == 'ldrsb':
        rd, rn, off = a
        assert 0 <= off <= 31
        assert 0 <= rn <= 7, 'ldrsb: base r%d' % rn
        return struct.pack('<H', 0x5600 | (off << 6) | (rn << 3) | rd)
    if mnem == 'ldrpc':
        return struct.pack('<H', 0x4800 | (a[0] << 8) | a[1])
    if mnem == 'ldrsp':
        rd, off = a
        assert off % 4 == 0 and off // 4 <= 255
        return struct.pack('<H', 0x9800 | (rd << 8) | (off // 4))
    if mnem == 'strsp':
        rd, off = a
        assert off % 4 == 0 and off // 4 <= 255
        return struct.pack('<H', 0x9000 | (rd << 8) | (off // 4))
    if mnem == 'addpc':
        rd, imm = a
        assert imm % 4 == 0 and imm // 4 <= 255
        return struct.pack('<H', 0xA000 | (rd << 8) | (imm // 4))
    if mnem == 'addrsp':
        rd, imm = a
        assert imm % 4 == 0 and 0 <= imm <= 1020, 'addrsp #%d' % imm
        return struct.pack('<H', 0xA800 | (rd << 8) | (imm // 4))
    if mnem == 'addspr':
        imm = a[0]
        assert imm % 4 == 0 and 0 <= imm <= 508, 'add sp #%d' % imm
        return struct.pack('<H', 0xB000 | ((imm // 4) & 0x7F))
    if mnem == 'subspr':
        imm = a[0]
        assert imm % 4 == 0 and 0 <= imm <= 508, 'sub sp #%d' % imm
        return struct.pack('<H', 0xB080 | ((imm // 4) & 0x7F))
    # ---- empilement ----
    if mnem == 'push':
        bits = 0
        for r in a[0]:
            assert 0 <= r <= 7 or r == 14, 'push r%d' % r
            bits |= 0x100 if r == 14 else (1 << r)
        return struct.pack('<H', 0xB400 | bits)
    if mnem == 'pop':
        bits = 0
        for r in a[0]:
            assert 0 <= r <= 7 or r == 15, 'pop r%d' % r
            bits |= 0x100 if r == 15 else (1 << r)
        return struct.pack('<H', 0xBC00 | bits)
    # ---- branches ----
    if mnem == 'b':
        tgt = a[0] if isinstance(a[0], int) else labels[a[0]]
        off = (tgt - (addr + 4)) // 2
        assert -1024 <= off <= 1023, 'b hors de portee (%d)' % off
        return struct.pack('<H', 0xE000 | (off & 0x7FF))
    if mnem == 'bc':
        cond, tgt = a[0], a[1]
        t = tgt if isinstance(tgt, int) else labels[tgt]
        off = (t - (addr + 4)) // 2
        assert -128 <= off <= 127, 'bc hors de portee (%d)' % off
        return struct.pack('<H', 0xD000 | (CONDS[cond] << 8) | (off & 0xFF))
    if mnem in ('bl', 'blabs'):
        tgt = a[0] if isinstance(a[0], int) else labels[a[0]]
        off = (tgt - (addr + 4)) // 2
        assert -(1 << 23) <= off < (1 << 23), 'bl hors de portee'
        s = (off >> 23) & 1
        i1 = (off >> 22) & 1
        i2 = (off >> 21) & 1
        j1 = (i1 ^ (0 if s else 1)) & 1
        j2 = (i2 ^ (0 if s else 1)) & 1
        hi = 0xF000 | (s << 10) | ((off >> 11) & 0x3FF)
        lo = 0xD000 | (j1 << 13) | (j2 << 11) | (off & 0x7FF)
        return struct.pack('<HH', hi, lo)
    if mnem == 'bx':
        return struct.pack('<H', 0x4700 | (a[0] << 3))
    raise AssertionError('mnemonique inconnu : %s' % mnem)

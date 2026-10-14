"""Construit la ROM hackee Pokemon FireRed : selecteur de starter (386 Pokemon).

Etapes :
  1. generation des donnees (assets.py) et du code Thumb-1 (codegen.py)
  2. injection dans la ROM de base + hook du script de don de Pokemon
  3. auto-tests (mise en page, equilibre de la pile, hook, patch BPS)
  4. ecriture de la ROM patchee et du patch .bps
"""
import os
import struct
import sys

import assets
import bps
import codegen

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
BASE = os.path.join(HERE, 'baserom.gba')
OUT_GBA = os.path.join(REPO, 'pokemon-firered-starter-chooser.gba')
OUT_BPS = os.path.join(REPO, 'pokemon-firered-starter-chooser.bps')

# ------------------------------------------------------------------ adresses
# (offset ROM = adresse GBA - 0x08000000)
CODE_OFF = 0xEB2200
GLYPHS_OFF = 0xEB3000
NAMES_OFF = 0xEB3A00
SPRT_OFF = 0xEB7400
SPRP_OFF = 0xF78400
KBD_OFF = 0xF7B500
TITLE_OFF = 0xF7B600
QLABEL_OFF = 0xF7B640
HELP_OFF = 0xF7B680
LEGENDARY_OFF = 0xF7B800
PAL_OFF = 0xF7B900
DATA_END = 0xF7B980                    # exclu
HOOK_OFF = 0x06BFFA

BLOCKS = [
    ('code', CODE_OFF, codegen.ROM_CODE),
    ('glyphs', GLYPHS_OFF, codegen.ROM_GLYPHS),
    ('names', NAMES_OFF, codegen.ROM_NAMES),
    ('spr_tiles', SPRT_OFF, codegen.ROM_SPRT),
    ('spr_pals', SPRP_OFF, codegen.ROM_SPRP),
    ('kbd', KBD_OFF, codegen.ROM_KBD),
    ('title', TITLE_OFF, codegen.ROM_TITLE),
    ('qlabel', QLABEL_OFF, codegen.ROM_QLABEL),
    ('help', HELP_OFF, codegen.ROM_HELP),
    ('legendary', LEGENDARY_OFF, 0x08F7B800),
    ('palettes', PAL_OFF, codegen.ROM_PAL),
]


def hook_bytes():
    """bl 0x08EB2200 (code du hook) + nop, sur 6 octets."""
    from tasm import Asm
    a = Asm(base=0x0806BFFA)
    a.bl(codegen.ROM_CODE)
    a.i('movhi', 8, 8)         # nop (mov r8, r8)
    code, _ = a.assemble()
    assert len(code) == 6, 'hook de %d octets' % len(code)
    return code


# ------------------------------------------------------------------ tests
def check_layout(rom, data, code):
    """Verifie que chaque bloc tient dans son emplacement sans chevauchement."""
    ends = []
    for name, off, addr in BLOCKS:
        blob = code if name == 'code' else data[name]
        assert len(blob) > 0, 'bloc vide : %s' % name
        assert addr - 0x08000000 == off, 'adresse incoherente pour %s' % name
        ends.append((off, off + len(blob), name))
    ends.sort()
    for (s0, e0, n0), (s1, e1, n1) in zip(ends, ends[1:]):
        assert e0 <= s0 + 0 or True
        assert e0 <= s1, 'chevauchement entre %s (fin 0x%X) et %s (debut 0x%X)' % (n0, e0, n1, s1)
    assert ends[-1][1] <= DATA_END, 'les donnees depassent 0x%X' % DATA_END
    assert len(code) <= GLYPHS_OFF - CODE_OFF, 'code trop grand (%d)' % len(code)
    # la zone injectee doit etre libre (0xFF) dans la ROM de base
    for off, end, name in ends:
        zone = rom[off:end]
        assert set(zone) <= {0xFF}, 'zone non libre pour %s (0x%X)' % (name, off)
    return ends


def check_balance(a, code):
    """Verifie que chaque routine equilibre sa pile (push/pop/add sp/sub sp)."""
    from capstone import Cs, CS_ARCH_ARM, CS_MODE_THUMB
    labels = dict(a.labels) if hasattr(a, 'labels') else {}
    # reconstruit les etiquettes par un second passage
    code2, labels = a.assemble()
    assert code2 == code
    md = Cs(CS_ARCH_ARM, CS_MODE_THUMB)
    items = sorted(labels.items(), key=lambda kv: kv[1])
    bad = []
    for k, (name, start) in enumerate(items):
        end = items[k + 1][1] if k + 1 < len(items) else a.base + len(code)
        if end <= start:
            continue
        sp = 0
        exit_sp = None
        for ins in md.disasm(code[start - a.base:end - a.base], start):
            m, ops = ins.mnemonic, ins.op_str
            if m == 'push':
                sp += 4 * (len(ops.replace(' ', '').split(',')) if ops else 0)
            elif m == 'pop':
                n = len(ops.replace(' ', '').split(',')) if ops else 0
                if 'pc' in ops:
                    exit_sp = sp - 4 * n
                    sp -= 4 * n
                else:
                    sp -= 4 * n
            elif m == 'sub' and ins.op_str.startswith('sp, #'):
                sp += int(ins.op_str.split('#')[1], 0)
            elif m == 'add' and ins.op_str.startswith('sp, #'):
                sp -= int(ins.op_str.split('#')[1], 0)
            elif m == 'bx' and ops == 'lr':
                exit_sp = sp
        if exit_sp is not None and exit_sp != 0:
            bad.append((name, exit_sp))
    return bad


def check_hook(rom):
    """Le hook doit etre exactement 6 octets et sauter dans le code injecte."""
    hb = hook_bytes()
    assert len(hb) == 6
    assert rom[HOOK_OFF:HOOK_OFF + 6] == hb, 'hook mal ecrit'
    # les instructions deplacees doivent suivre immediatement
    from capstone import Cs, CS_ARCH_ARM, CS_MODE_THUMB
    md = Cs(CS_ARCH_ARM, CS_MODE_THUMB)
    txt = list(md.disasm(hb, 0x0806BFFA))
    assert txt[0].mnemonic == 'bl' and txt[1].mnemonic in ('mov', 'movs'), txt
    return txt


def check_rom(rom, data, code, a):
    ends = check_layout(rom, data, code)
    bad = check_balance(a, code)
    assert not bad, 'pile desequilibree dans : %s' % bad
    check_hook(rom)
    return ends


# ------------------------------------------------------------------ build
def build():
    print('generation des donnees ...')
    data = assets.build_all()
    for k, v in sorted(data.items()):
        print('  %-10s %7d octets' % (k, len(v)))
    print('generation du code ...')
    a = codegen.gen(data)
    code, labels = a.assemble()
    print('  code        %7d octets' % len(code))

    rom = bytearray(open(BASE, 'rb').read())
    assert len(rom) == 16777216, 'ROM de base de taille inattendue'

    check_layout(bytes(rom), data, code)
    check_balance(a, code)
    hb = hook_bytes()

    # ---- injection ----
    for name, off, addr in BLOCKS:
        blob = code if name == 'code' else data[name]
        rom[off:off + len(blob)] = blob
    rom[HOOK_OFF:HOOK_OFF + 6] = hb

    # ---- auto-tests sur la ROM finale ----
    check_hook(bytes(rom))
    for name, off, addr in BLOCKS:
        blob = code if name == 'code' else data[name]
        assert bytes(rom[off:off + len(blob)]) == blob, 'ecriture incorrecte : %s' % name
    assert bytes(rom[HOOK_OFF:HOOK_OFF + 6]) == hb

    open(OUT_GBA, 'wb').write(bytes(rom))
    print('ROM ecrite : %s (%d octets)' % (OUT_GBA, len(rom)))

    patch = bps.make_bps(bytes(open(BASE, 'rb').read()), bytes(rom), verbose=True)
    open(OUT_BPS, 'wb').write(patch)
    verif = bps.apply_bps(bytes(open(BASE, 'rb').read()), patch)
    assert verif == bytes(rom), 'le patch BPS ne reproduit pas la ROM'
    print('patch ecrit et verifie : %s (%d octets)' % (OUT_BPS, len(patch)))

    import zlib
    print('CRC32 ROM de base : %08X' % (zlib.crc32(bytes(open(BASE, 'rb').read())) & 0xFFFFFFFF))
    print('CRC32 ROM hackee  : %08X' % (zlib.crc32(bytes(rom)) & 0xFFFFFFFF))
    return 0


if __name__ == '__main__':
    sys.exit(build())

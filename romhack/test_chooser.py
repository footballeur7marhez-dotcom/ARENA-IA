"""Execute le selecteur de starter dans le mini-emulateur et verifie le resultat."""
import struct
import sys

import assets
import codegen
from gbaemu import Emu

ROM = '/home/user/ARENA-IA/pokemon-firered-starter-chooser.gba'
HOOK = 0x08EB2200
CTX = 0x0203F000
CTX_PTR = 0x0203F010
SP = 0x03007F00
LR = 0x0806BFFF                     # retour du hook
SCR_AFTER_BL = 0x08EB221A           # instruction suivant `bl chooser` (+ add sp,#4)

K_A, K_B, K_SEL, K_ST = 0x01, 0x02, 0x04, 0x08
K_RT, K_LF, K_UP, K_DN = 0x10, 0x20, 0x40, 0x80
K_R, K_L = 0x100, 0x200
DIRMASK = K_UP | K_DN | K_LF | K_RT | K_L | K_R

FRAME = 0x03007A00
F = codegen
G = assets.G_IDX
GLYPH = assets.GLYPH_CHARS


def build():
    data = assets.build_all()
    a = codegen.gen(data)
    code, labels = a.assemble()
    return data, a, code, labels


def setup(emu):
    """Contexte de script factice : cmd_givepokemon(VAR_TEMP_2, 5)."""
    emu.wr32(CTX + 8, CTX_PTR)
    emu.wr16(CTX_PTR, 0x4002)
    emu.wr16(CTX_PTR + 2, 5)
    emu.r[0] = CTX
    emu.r[13] = SP
    emu.r[14] = LR


def run_scenario(name, keys, frames, press_at=200, expect=None, sched=None):
    data, a, code, labels = build()
    rom = open(ROM, 'rb').read()
    emu = Emu(rom)
    setup(emu)
    emu.keys = keys
    if sched:
        emu.schedule = list(sched)
    status, steps = emu.run(HOOK, max_steps=3000000, until=SCR_AFTER_BL,
                            keys_after=press_at)
    ok = status == 'ok'
    species = emu.r[0] & 0xFFFF
    print('%-28s statut=%-8s pas=%7d espece=%s' % (name, status, steps, species))
    if status != 'ok':
        print('   ECHEC : PC = 0x%08X  r0=%08X r1=%08X r2=%08X r13=%08X'
              % (emu.r[15], emu.r[0], emu.r[1], emu.r[2], emu.r[13]))
        return None, emu
    if expect is not None and species != expect:
        print('   ATTENDU %s' % expect)
        return None, emu
    return species, emu


def dump_screen(emu, rows=20, cols=32):
    """Rend la tilemap en texte (les numeros de tuiles -> glyphes)."""
    base = 0x0600D800
    out = []
    for y in range(rows):
        line = ''
        for x in range(cols):
            t = emu.rd16(base + y * 64 + x * 2) & 0x3FF
            ch = GLYPH[t] if t < len(GLYPH) else '?'
            line += (ch if ch else ' ')
        out.append(line.rstrip())
    return out


def show(emu, n=18):
    print('   +' + '-' * 32 + '+')
    for line in dump_screen(emu, n, 32):
        print('   |' + line.ljust(32) + '|')
    print('   +' + '-' * 32 + '+')


if __name__ == '__main__':
    which = sys.argv[1] if len(sys.argv) > 1 else 'all'
    fails = 0
    if which in ('all', 'a'):
        s, emu = run_scenario('A immediat (1er de la liste)', 0x3FF & ~K_A, 1, expect=1)
        if s is None:
            fails += 1
        else:
            show(emu)
    if which in ('all', 'down'):
        s, emu = run_scenario('BAS puis A', 0x3FF, 1, expect=2,
                              sched=[(200, 0x3FF & ~K_DN), (9000, 0x3FF), (9200, 0x3FF & ~K_A)])
        if s is None:
            fails += 1
    if which in ('all', 'up'):
        s, emu = run_scenario('HAUT puis A (boucle)', 0x3FF, 1, expect=386,
                              sched=[(200, 0x3FF & ~K_UP), (9000, 0x3FF), (9200, 0x3FF & ~K_A)])
        if s is None:
            fails += 1
    if which in ('all', 'start'):
        s, emu = run_scenario('START (aleatoire)', 0x3FF & ~K_ST, 1)
        if s is None or not (1 <= s <= 386):
            print('   ECHEC : espece aleatoire hors limites')
            fails += 1
        else:
            show(emu)
    print('\n%s : %d echec(s)' % ('TERMINE', fails))
    sys.exit(1 if fails else 0)

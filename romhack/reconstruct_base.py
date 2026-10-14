"""Reconstruit la ROM de base (vierge) depuis la ROM patchees.

Tout ce qui a ete injecte se trouve dans la plage 0xEB2200..0xF7B960, qui etait
de l'espace libre (0xFF) dans la ROM originale ; le hook est en 0x06BFFA.
"""
import sys

PATCHED = '/home/user/ARENA-IA/pokemon-firered-starter-chooser.gba'
OUT = '/home/user/ARENA-IA/romhack/baserom.gba'
HOOK_OFF = 0x06BFFA
HOOK_ORIG = bytes.fromhex('60b482b0041c')      # push {r5,r6} / sub sp,#8 / adds r4,r0,#0
INJECT_LO, INJECT_HI = 0xEB2200, 0xF7B960

rom = bytearray(open(PATCHED, 'rb').read())
assert len(rom) == 16777216
assert rom[HOOK_OFF:HOOK_OFF + 6] == bytes.fromhex('46f201d1c046'), 'hook inattendu'
rom[HOOK_OFF:HOOK_OFF + 6] = HOOK_ORIG
for i in range(INJECT_LO, INJECT_HI):
    rom[i] = 0xFF
open(OUT, 'wb').write(bytes(rom))
print('ROM de base ecrite : %s (%d octets)' % (OUT, len(rom)))

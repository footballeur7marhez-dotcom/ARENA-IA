"""Desassembleur annotue du code injecte dans la ROM (0x08EB2200..0x08EB2A58)."""
import sys
from capstone import *

ROM = '/home/user/ARENA-IA/pokemon-firered-starter-chooser.gba'
BASE = 0x08EB2200
END = 0x08EB2A58


def load():
    rom = open(ROM, 'rb').read()
    return rom[BASE - 0x08000000:END - 0x08000000]


def main():
    code = load()
    md = Cs(CS_ARCH_ARM, CS_MODE_THUMB)
    md.detail = False
    # passe 1 : collecter les cibles de branchement
    targets = set()
    insns = []
    addr = BASE
    while addr < BASE + len(code):
        got = []
        for ins in md.disasm(code[addr - BASE:addr - BASE + 64], addr):
            got.append(ins)
            addr = ins.address + ins.size
            if addr - BASE >= len(code):
                break
        if not got:
            addr += 2
            continue
        for ins in got:
            insns.append(ins)
            if ins.mnemonic[0] == 'b' and ins.mnemonic != 'bx':
                for tok in ins.op_str.replace(',', ' ').split():
                    if tok.startswith('0x'):
                        targets.add(int(tok, 16))
    out = []
    for ins in insns:
        pre = '\n%s:' % ('L_%08X' % ins.address) if ins.address in targets else ''
        if pre:
            out.append(pre)
        out.append('%08X  %-8s %s' % (ins.address, ins.mnemonic, ins.op_str))
    print('\n'.join(out))


if __name__ == '__main__':
    main()

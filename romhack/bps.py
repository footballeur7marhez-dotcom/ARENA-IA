"""Encodeur / decodeur BPS (byuu, spec publique) : SourceRead, TargetRead,
SourceCopy, TargetCopy.  Voir https://byuu.org/ (public domain).

Encodage des nombres : 7 bits par octet, le bit 7 est mis sur le DERNIER
octet, et on retranche 1 aux octets intermediaires (decodage inverse).
Les offsets de copie sont signes : bit 0 = negatif, puis la valeur absolue.
"""
import struct
import zlib


def crc32(data):
    return zlib.crc32(data) & 0xFFFFFFFF


# ------------------------------------------------------------------ nombres
def enc_num(n):
    out = bytearray()
    while True:
        x = n & 0x7F
        n >>= 7
        if n == 0:
            out.append(0x80 | x)
            break
        out.append(x)
        n -= 1
    return bytes(out)


def dec_num(data, i):
    val = 0
    shift = 1
    while True:
        b = data[i]
        i += 1
        val += (b & 0x7F) * shift
        if b & 0x80:
            break
        shift <<= 7
        val += shift
    return val, i


def enc_signed(n):
    return enc_num((abs(n) << 1) | (1 if n < 0 else 0))


def dec_signed(data, i):
    v, i = dec_num(data, i)
    return ((v >> 1) * (-1 if (v & 1) else 1)), i


# ------------------------------------------------------------------ encodage
_MIN_MATCH = 4


def _index_source(src, step=16, cap=4):
    """Index des prefixes de 4 octets du source (echantillonne)."""
    idx = {}
    n = len(src)
    for p in range(0, n - 4, step):
        key = src[p:p + 4]
        lst = idx.get(key)
        if lst is None:
            idx[key] = [p]
        elif len(lst) < cap:
            lst.append(p)
    return idx


def make_bps(src, dst, verbose=False):
    """Encode dst par rapport a src et retourne les octets du patch."""
    ns, nd = len(src), len(dst)
    assert ns and nd
    idx = _index_source(src)
    out = bytearray(b'BPS1')
    out += enc_num(ns) + enc_num(nd) + enc_num(0)
    srcrel = 0                       # curseur SourceCopy dans le source
    tgtrel = 0                       # curseur TargetCopy dans la sortie
    oi = 0
    lit = bytearray()

    def flush_lit():
        if lit:
            out.extend(enc_num(((len(lit) - 1) << 2) | 1))
            out.extend(lit)
            del lit[:]

    while oi < nd:
        # ---- 1) donnee identique au meme endroit : SourceRead
        if oi < ns and src[oi] == dst[oi]:
            run = 1
            while (oi + run < nd and oi + run < ns
                   and src[oi + run] == dst[oi + run]):
                run += 1
            flush_lit()
            out.extend(enc_num(((run - 1) << 2) | 0))
            oi += run
            continue
        # ---- 2) meilleure correspondance dans le source
        best_len, best_pos = 0, -1
        if oi + _MIN_MATCH <= nd:
            for p in idx.get(bytes(dst[oi:oi + 4]), ()):
                if p == oi:
                    continue
                l = 0
                lim = min(nd - oi, ns - p)
                while l < lim and src[p + l] == dst[oi + l]:
                    l += 1
                if l > best_len:
                    best_len, best_pos = l, p
        # ---- 3) repetition dans la sortie deja ecrite (RLE)
        rle = 0
        if oi >= 1 and dst[oi] == dst[oi - 1]:
            rle = 1
            while oi + rle < nd and dst[oi + rle] == dst[oi - 1]:
                rle += 1
        if best_len >= _MIN_MATCH and best_len >= rle:
            flush_lit()
            delta = best_pos - srcrel
            out.extend(enc_num(((best_len - 1) << 2) | 2))
            out.extend(enc_signed(delta))
            srcrel = best_pos + best_len
            oi += best_len
            continue
        if rle >= _MIN_MATCH:
            flush_lit()
            delta = (oi - 1) - tgtrel
            out.extend(enc_num(((rle - 1) << 2) | 3))
            out.extend(enc_signed(delta))
            tgtrel = (oi - 1) + rle
            oi += rle
            continue
        # ---- 4) litteral
        lit.append(dst[oi])
        oi += 1
    flush_lit()
    out.extend(struct.pack('<III', crc32(src), crc32(dst), 0))
    # checksum du patch : tout sauf les 4 derniers octets
    struct.pack_into('<I', out, len(out) - 4, crc32(bytes(out[:-4])))
    if verbose:
        print('BPS : %d octets (source %d, cible %d)'
              % (len(out), ns, nd))
    return bytes(out)


# ------------------------------------------------------------------ decodage
def apply_bps(src, patch):
    """Applique un patch BPS a src et retourne la cible (verifie les CRC)."""
    assert patch[:4] == b'BPS1', 'magic BPS1 attendu'
    i = 4
    ns, i = dec_num(patch, i)
    nd, i = dec_num(patch, i)
    meta, i = dec_num(patch, i)
    i += meta
    assert ns == len(src), 'taille du source inattendue (%d != %d)' % (ns, len(src))
    end = len(patch) - 12
    dst = bytearray()
    srcrel = 0
    tgtrel = 0
    while i < end:
        data, i = dec_num(patch, i)
        cmd = data & 3
        length = (data >> 2) + 1
        if cmd == 0:                                    # SourceRead
            dst += src[len(dst):len(dst) + length]
        elif cmd == 1:                                  # TargetRead
            dst += patch[i:i + length]
            i += length
        elif cmd == 2:                                  # SourceCopy
            delta, i = dec_signed(patch, i)
            srcrel += delta
            assert 0 <= srcrel and srcrel + length <= ns, 'SourceCopy hors limites'
            dst += src[srcrel:srcrel + length]
            srcrel += length
        else:                                           # TargetCopy
            delta, i = dec_signed(patch, i)
            tgtrel += delta
            assert 0 <= tgtrel < len(dst), 'TargetCopy hors limites'
            for _ in range(length):
                dst.append(dst[tgtrel])
                tgtrel += 1
    assert len(dst) == nd, 'taille de la cible inattendue'
    cs, ct, cp = struct.unpack('<III', patch[-12:])
    assert cs == crc32(src), 'CRC32 du source invalide'
    assert ct == crc32(bytes(dst)), 'CRC32 de la cible invalide'
    assert cp == crc32(patch[:-4]), 'CRC32 du patch invalide'
    return bytes(dst)


if __name__ == '__main__':
    # auto-test : round trip sur un cas aleatoire
    import random
    random.seed(1)
    src = bytearray(random.getrandbits(8) for _ in range(70000))
    src[1000:2000] = b'\xff' * 1000
    dst = bytearray(src)
    dst[5000:6000] = b'BONJOUR LE MONDE' * 41
    dst[60000:61000] = b'\x00' * 1000
    dst[65000] ^= 0xFF
    patch = make_bps(bytes(src), bytes(dst))
    assert apply_bps(bytes(src), patch) == bytes(dst)
    print('auto-test BPS : OK (%d octets pour %d octets de differences)'
          % (len(patch), 2100))

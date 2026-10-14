"""Genere les donnees du hack : glyphes, noms, sprites 4bpp, palettes, clavier."""
import json
import os
import struct

from PIL import Image, ImageDraw, ImageFont

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT = os.path.join(REPO, 'assets', 'fonts', 'press-start-2p-latin-400-normal.woff2')
SPR_DIR = os.path.join(REPO, 'assets', 'sprites')
DATA_JS = os.path.join(REPO, 'js', 'data.js')

# ------------------------------------------------------------------ glyphes
# index 0 = tuile vide ; 77 = espace
GLYPH_CHARS = [''] + list('ABCDEFGHIJKLMNOPQRSTUVWXYZ') + list('abcdefghijklmnopqrstuvwxyz') \
    + list('0123456789') + ['-', '.', '\u00c9', '\u00e8', '\u00e9', '\u00ea', '#', '/',
                            '>', ':', '!', '_', '<', '*', ' ']
G_IDX = {c: i for i, c in enumerate(GLYPH_CHARS)}
G_BLANK, G_SPACE = 0, G_IDX[' ']
NGLYPH = len(GLYPH_CHARS)

# table de normalisation pour la recherche (accents et casse ignores)
_NORM = {'\u00c9': 'E', '\u00e8': 'E', '\u00e9': 'E', '\u00ea': 'E'}


def _normalize(ch):
    u = ch.upper()
    return _NORM.get(ch, _NORM.get(u, u))


def glyph_tiles():
    """Tuiles 4bpp 8x8 (index 0 = vide)."""
    font = ImageFont.truetype(FONT, 8)
    out = bytearray()
    for ch in GLYPH_CHARS:
        if ch == '':
            out += b'\x00' * 32
            continue
        im = Image.new('L', (8, 8), 0)
        d = ImageDraw.Draw(im)
        d.text((0, 0), ch, font=font, fill=255)
        px = im.load()
        tile = bytearray(32)
        for y in range(8):
            for x in range(8):
                v = px[x, y]
                if v:
                    idx = 1 + (v * 15) // 255
                    if idx > 15:
                        idx = 15
                    b = y * 4 + x // 2
                    if x % 2 == 0:
                        tile[b] |= idx & 0x0F
                    else:
                        tile[b] |= (idx & 0x0F) << 4
        out += tile
    return bytes(out)


# ------------------------------------------------------------------ pokemon
def load_pokemon():
    """[(id, nom_fr, legendaire), ...] dans l'ordre 1..386."""
    txt = open(DATA_JS, encoding='utf-8').read()
    start = txt.index('[')
    end = txt.rindex(']') + 1
    arr = json.loads(txt[start:end])
    arr.sort(key=lambda p: p['id'])
    assert len(arr) == 386 and [p['id'] for p in arr] == list(range(1, 387))
    return [(p['id'], p['fr'], bool(p.get('leg') or p.get('myth'))) for p in arr]


def name_arrays(pokemon):
    """Par pokemon : 16 glyphes d'affichage + 16 normalises (termines par 0)."""
    out = bytearray()
    for _id, fr, _leg in pokemon:
        disp = [G_IDX.get(c, G_BLANK) for c in fr][:15]
        norm = [G_IDX.get(_normalize(c), G_BLANK) for c in fr][:15]
        disp += [0] * (16 - len(disp))
        norm += [0] * (16 - len(norm))
        out += bytes(disp) + bytes(norm)
    return bytes(out)


def sprite_data(pokemon):
    """(tuiles, palettes) : 386 * (2048 + 32) octets."""
    tiles = bytearray()
    pals = bytearray()
    for _id, _fr, _leg in pokemon:
        im = Image.open(os.path.join(SPR_DIR, '%d.png' % _id)).convert('P')
        pal = im.getpalette()
        px = im.load()
        # palette BGR555, 16 entrees (0 = fond sombre)
        for i in range(16):
            if i == 0:
                pals += bytes([0x62, 0x14])
                continue
            if i * 3 + 2 < len(pal):
                r, g, b = pal[i * 3], pal[i * 3 + 1], pal[i * 3 + 2]
            else:
                r = g = b = 0
            v = ((b >> 3) << 10) | ((g >> 3) << 5) | (r >> 3)
            pals += bytes([v & 0xFF, (v >> 8) & 0xFF])
        # 64 tuiles 8x8 en 4bpp
        for ty in range(8):
            for tx in range(8):
                tile = bytearray(32)
                for y in range(8):
                    for x in range(8):
                        c = px[tx * 8 + x, ty * 8 + y]
                        if c > 15:
                            c = 15
                        b = y * 4 + x // 2
                        if x % 2 == 0:
                            tile[b] |= c & 0x0F
                        else:
                            tile[b] |= (c & 0x0F) << 4
                tiles += tile
    return bytes(tiles), bytes(pals)


# ------------------------------------------------------------------ chaines
def enc_str(s):
    """Chaine de glyphes terminee par 0."""
    return bytes([G_IDX.get(c, G_BLANK) for c in s] + [0])


HELP_LINES = ['A: VALIDER', 'B: ANNULER', 'START: ALEATOIRE',
              'HAUT/BAS: DEFILER', 'L / R: PAGE', 'SELECT: CLAVIER']
HELP_W = 24                      # octets par ligne dans la ROM


def help_lines():
    """6 lignes de 24 octets, terminees par 0."""
    out = bytearray()
    for line in HELP_LINES:
        b = enc_str(line)
        assert len(b) <= HELP_W, 'ligne d\'aide trop longue : %r' % line
        out += b + b'\x00' * (HELP_W - len(b))
    return bytes(out)


KEYBOARD_ROWS = [
    list('ABCDEFG'),
    list('HIJKLMN'),
    list('OPQRSTU'),
    list('VWXYZ') + ['0', '1'],
    list('2345678'),
    ['9', '_', '-', '.', 0xFF, 0xFE, ' '],
]


def keyboard_layout():
    """6 rangees x 7 colonnes ; 0xFF = effacer, 0xFE = inserer tout."""
    out = bytearray()
    for r in KEYBOARD_ROWS:
        for c in r:
            out.append(0xFF if c == 0xFF else (0xFE if c == 0xFE else G_IDX[c]))
    return bytes(out)


def palettes():
    """Banque 0 (texte gris), 1 (surbrillance jaune), 3 (titre cyan) = 96 octets."""
    def ramp(c0, c1):
        b = bytearray()
        for i in range(16):
            r = c0[0] + (c1[0] - c0[0]) * i // 15
            g = c0[1] + (c1[1] - c0[1]) * i // 15
            bl = c0[2] + (c1[2] - c0[2]) * i // 15
            v = ((bl >> 3) << 10) | ((g >> 3) << 5) | (r >> 3)
            b += bytes([v & 0xFF, (v >> 8) & 0xFF])
        return bytes(b)
    gray = ramp((20, 20, 20), (235, 235, 235))
    yellow = ramp((70, 60, 10), (255, 235, 90))
    cyan = ramp((10, 60, 70), (120, 245, 255))
    # banque 2 (utilisee par le sprite) : laissee telle quelle
    return gray + yellow + b'\x00' * 32 + cyan


def build_all():
    pokemon = load_pokemon()
    spr_tiles, spr_pals = sprite_data(pokemon)
    return {
        'glyphs': glyph_tiles(),
        'names': name_arrays(pokemon),
        'spr_tiles': spr_tiles,
        'spr_pals': spr_pals,
        'kbd': keyboard_layout(),
        'title': enc_str('CHOISIS TON POK\u00c9MON !'),
        'qlabel': enc_str('RECHERCHE:'),
        'help': help_lines(),
        'legendary': b''.join(struct.pack('<H', i)
                              for i, _n, leg in pokemon if leg) + b'\x00\x00',
        'palettes': palettes(),
    }


if __name__ == '__main__':
    d = build_all()
    for k, v in sorted(d.items()):
        print('%-10s %7d octets' % (k, len(v)))

"""Genere le code Thumb-1 du hack : hook + selecteur de starter (386 Pokemon)."""
import assets
from tasm import Asm

# ------------------------------------------------------------------ ROM
ROM_CODE = 0x08EB2200
ROM_GLYPHS = 0x08EB3000
ROM_NAMES = 0x08EB3A00
ROM_SPRT = 0x08EB7400
ROM_SPRP = 0x08F78400
ROM_KBD = 0x08F7B500
ROM_TITLE = 0x08F7B600
ROM_QLABEL = 0x08F7B640
ROM_HELP = 0x08F7B680
ROM_PAL = 0x08F7B900

SCRCMD_GIVEMON = 0x0806BFF4
VARGET = 0x0806E478
VAR_TEMP_2 = 0x4002

# ------------------------------------------------------------------ IO
DISPCNT, DISPSTAT = 0x04000000, 0x04000004
BG0CNT, BG0HOFS, BG0VOFS = 0x04000008, 0x04000010, 0x04000012
KEYINPUT = 0x04000130
DMA3SAD, DMA3DAD, DMA3CNT = 0x040000D4, 0x040000D8, 0x040000DC
PRAM = 0x05000000

# ------------------------------------------------------------------ VRAM
CHBASE = 0x06004000                     # glyphes : tuiles 0..77
SPR_VRAM = 0x06005000                   # sprite  : tuiles 128..191
SCREENBASE = 0x0600D800                 # tilemap 32x32

# ------------------------------------------------------------------ ecran
TITLE_ROW, TITLE_COL = 0, 5
LIST_Y, LIST_N = 1, 7
INFO_ROW = 8
QUERY_ROW, QLABEL_COL, QCOL = 9, 1, 12
SPR_X, SPR_Y = 22, 1
KBD_X, KBD_Y = 1, 11
HELP_X, HELP_Y = 10, 11

# ------------------------------------------------------------------ touches
K_A, K_B, K_SEL, K_ST = 0x01, 0x02, 0x04, 0x08
K_RT, K_LF, K_UP, K_DN = 0x10, 0x20, 0x40, 0x80
K_R, K_L = 0x100, 0x200
DIRMASK = K_UP | K_DN | K_LF | K_RT | K_L | K_R

G = assets.G_IDX
G_ARROW, G_HASH, G_SLASH = G['>'], G['#'], G['/']
G_SPACEG, G_UNDER, G_DEL, G_ALL = G[' '], G['_'], G['<'], G['*']

# ------------------------------------------------------------------ frame
# r7 = sp ; [r7, r7+FRAME) = variables, [r7+FRAME, r7+FRAME+SBSAVE) = tilemap
F_QUERY, F_QLEN = 0x00, 0x10
F_CURSOR, F_TOP, F_FILTER, F_FOCUS = 0x14, 0x18, 0x1C, 0x20
F_PREVK, F_FRAMES = 0x24, 0x28
F_DISPCNT, F_BG0CNT, F_BG0HOFS, F_BG0VOFS = 0x2C, 0x2E, 0x30, 0x32
F_DIRTY, F_KX, F_KY, F_MCOUNT = 0x34, 0x38, 0x3C, 0x40
F_LASTSPR, F_RESULT, F_SPECIES, F_PRESSED, F_SEED = 0x44, 0x48, 0x4C, 0x50, 0x54
F_MBPTR = 0x58                          # adresse du tampon des correspondances
F_PAL = 0x60                            # 128 octets de palette sauvegardee
F_MBUF = 0xE0                           # 386 especes x 2 octets
FRAME = 0x3F0                           # <= 1020 (limite de add rx, sp, #imm)
SBSAVE = 0x800                          # 2048 octets de tilemap sauvegardee
RES_OK, RES_CANCEL = 1, 2
KBD_COLS, KBD_ROWS = 7, 6
HELP_N = 6


def simm(a, rd, v):
    """Charge un petit entier signe (-255..255) dans rd."""
    if 0 <= v <= 0xFF:
        a.i('movs', rd, v)
    else:
        a.i('movs', rd, -v)
        a.i('negs', rd, rd)
    return a


def simm_lt(a, rd, v):
    """Charge une constante eventuellement grande (movs si possible, sinon pool)."""
    if 0 <= v <= 0xFF:
        a.i('movs', rd, v)
    else:
        a.lit(rd, v)
    return a


def gen(data):
    a = Asm(base=ROM_CODE)
    ngl = len(data['glyphs']) // 32

    # ============================================================== HOOK
    # Remplace le `bl` de la commande de script 0x4002 (don d'un Pokemon) :
    # instructions deplacees push {r5,r6} / sub sp,#8 / adds r4,r0,#0
    a.label('hook')
    a.push([4, 5, 6, 14])
    a.i('movhi', 4, 0)                       # r4 = ctx
    a.i('ldr', 0, 4, 8)                      # r0 = ctx->ptr
    a.i('ldrh', 0, 0, 0)                     # r0 = 1er demi-mot du script
    a.lit(1, VAR_TEMP_2)
    a.i('cmp', 0, 1)
    a.bc('ne', 'skip')
    a.bl('chooser')                          # r0 = espece (0 = annule)
    a.i('cmpi', 0, 0)
    a.bc('eq', 'skip')
    a.i('movhi', 5, 0)
    a.lit(0, VAR_TEMP_2)
    a.blabs(VARGET)                          # r0 = &var
    a.i('strh', 5, 0, 0)
    a.label('skip')
    a.i('movhi', 0, 4)                       # r0 = ctx
    a.pop([4, 5, 6])
    a.addframe(4)                            # jette lr (on chaine par bx)
    a.push([5, 6])                           # deplace : push {r5, r6}
    a.subspace(8)                            # deplace : sub sp, #8
    a.i('adds3', 4, 0, 0)                    # deplace : adds r4, r0, #0
    a.lit(0, (SCRCMD_GIVEMON + 12) | 1)     # 0x0806C001 (bit 0 = Thumb)
    a.bx(0)
    a.pool_here()

    # ============================================================== SELECTEUR
    a.label('chooser')
    a.push([4, 5, 6, 7, 14])
    a.subspace(FRAME)
    a.subspace(SBSAVE)                       # sauvegarde de la tilemap du jeu
    a.i('movhi', 7, 13)                      # r7 = base de la frame

    # ---- sauvegarde de l'etat video ----
    for f, addr in ((F_DISPCNT, DISPCNT), (F_BG0CNT, BG0CNT),
                    (F_BG0HOFS, BG0HOFS), (F_BG0VOFS, BG0VOFS)):
        a.lit(0, addr)
        a.i('ldrh', 1, 0, 0)
        a.i('strh', 1, 7, f)
    a.lit(0, PRAM)
    a.addrsp(1, F_PAL)
    a.i('movs', 2, 128)
    a.label('sv_pal')
    a.i('ldrb', 3, 0, 0)
    a.i('strb', 3, 1, 0)
    a.i('addsi', 0, 1)
    a.i('addsi', 1, 1)
    a.i('subsi', 2, 1)
    a.bc('ne', 'sv_pal')
    a.lit(0, SCREENBASE)
    a.addrsp(1, FRAME)
    a.lit(2, 2048)
    a.bl('dma3')

    # ---- configuration de l'affichage ----
    a.lit(0, BG0CNT)
    a.lit(1, 0x1B04)                         # prio 0, charbase 1, screenbase 27
    a.i('strh', 1, 0, 0)
    a.lit(0, BG0HOFS)
    a.i('movs', 1, 0)
    a.i('strh', 1, 0, 0)
    a.lit(0, BG0VOFS)
    a.i('strh', 1, 0, 0)
    a.lit(0, DISPCNT)
    a.lit(1, 0x0100)                         # mode 0, BG0 seulement
    a.i('strh', 1, 0, 0)

    # ---- glyphes + palettes ----
    a.lit(0, ROM_GLYPHS)
    a.lit(1, CHBASE)
    a.lit(2, ngl * 32)
    a.bl('dma3')
    a.lit(0, ROM_PAL)
    a.lit(1, PRAM)
    a.lit(2, 128)
    a.bl('dma3')

    # ---- etat initial ----
    for f in (F_QUERY, F_CURSOR, F_TOP, F_FILTER, F_FOCUS,
              F_DIRTY, F_KX, F_KY, F_MCOUNT, F_LASTSPR, F_RESULT,
              F_SPECIES, F_PRESSED, F_PREVK, F_FRAMES):
        a.i('movs', 0, 0)
        a.i('str', 0, 7, f)
    a.lit(0, 0x12345678)
    a.i('str', 0, 7, F_SEED)
    a.addrsp(0, F_MBUF)
    a.i('str', 0, 7, F_MBPTR)
    a.bl('rebuild')
    a.lit(0, 1)
    a.i('str', 0, 7, F_DIRTY)

    # ============================================================== boucle
    a.label('main')
    a.bl('waitvblank')
    a.bl('readkeys')
    a.bl('handle_input')
    a.i('ldr', 0, 7, F_RESULT)
    a.i('cmpi', 0, 0)
    a.bc('ne', 'main_done')
    a.i('ldr', 0, 7, F_DIRTY)
    a.i('cmpi', 0, 0)
    a.bc('eq', 'main')
    a.bl('redraw')
    a.i('movs', 0, 0)
    a.i('str', 0, 7, F_DIRTY)
    a.b('main')

    # ============================================================== sortie
    a.label('main_done')
    a.addrsp(0, FRAME)
    a.lit(1, SCREENBASE)
    a.lit(2, 2048)
    a.bl('dma3')
    a.addrsp(0, F_PAL)
    a.lit(1, PRAM)
    a.i('movs', 2, 128)
    a.bl('dma3')
    a.i('ldrh', 0, 7, F_DISPCNT)
    a.lit(1, DISPCNT)
    a.i('strh', 0, 1, 0)
    a.i('ldrh', 0, 7, F_BG0CNT)
    a.lit(1, BG0CNT)
    a.i('strh', 0, 1, 0)
    a.i('ldrh', 0, 7, F_BG0HOFS)
    a.lit(1, BG0HOFS)
    a.i('strh', 0, 1, 0)
    a.i('ldrh', 0, 7, F_BG0VOFS)
    a.lit(1, BG0VOFS)
    a.i('strh', 0, 1, 0)
    a.i('ldr', 0, 7, F_RESULT)
    a.i('cmpi', 0, RES_OK)
    a.bc('ne', 'ch_cancel')
    a.i('ldr', 0, 7, F_SPECIES)
    a.b('ch_ret')
    a.label('ch_cancel')
    a.i('movs', 0, 0)
    a.label('ch_ret')
    a.addframe(SBSAVE)
    a.addframe(FRAME)
    a.pop([4, 5, 6, 7, 15])
    a.pool_here()

    # ============================================================== DMA3
    a.label('dma3')
    a.push([4, 14])
    a.lit(3, DMA3SAD)
    a.i('str', 0, 3, 0)
    a.lit(3, DMA3DAD)
    a.i('str', 1, 3, 0)
    a.i('lsrs', 2, 2, 1)
    a.i('movs', 3, 0x80)
    a.i('lsls', 3, 3, 24)
    a.i('orrs', 2, 3)
    a.lit(3, DMA3CNT)
    a.i('str', 2, 3, 0)
    a.pop([4, 15])
    a.pool_here()

    # ============================================================== attente VBlank
    a.label('waitvblank')
    a.push([4, 14])
    a.lit(0, DISPSTAT)
    a.label('wv_l')
    a.i('ldrh', 1, 0, 0)
    a.i('lsrs', 1, 1, 1)
    a.bc('cc', 'wv_l')
    a.pop([4, 15])
    a.pool_here()

    # ============================================================== touches
    a.label('readkeys')
    a.push([4, 5, 14])
    a.lit(0, KEYINPUT)
    a.i('ldrh', 0, 0, 0)
    a.i('mvns', 0, 0)
    a.i('movs', 1, 0xFF)
    a.i('lsls', 1, 1, 2)
    a.i('addsi', 1, 3)
    a.i('ands', 0, 1)
    a.i('movhi', 5, 0)
    a.i('ldr', 1, 7, F_PREVK)
    a.i('mvns', 4, 1)
    a.i('ands', 0, 4)
    a.i('str', 5, 7, F_PREVK)
    a.i('ldr', 1, 7, F_FRAMES)
    a.i('addsi', 1, 1)
    a.i('str', 1, 7, F_FRAMES)
    a.i('movs', 2, 7)
    a.i('ands', 1, 2)
    a.i('cmpi', 1, 0)
    a.bc('ne', 'rk_norep')
    a.i('ldr', 1, 7, F_FRAMES)
    a.lit(2, 20)
    a.i('cmp', 1, 2)
    a.bc('le', 'rk_norep')
    a.i('ldr', 1, 7, F_PREVK)
    a.lit(2, DIRMASK)
    a.i('ands', 1, 2)
    a.i('orrs', 0, 1)                       # pressed |= directionnelles maintenues
    a.label('rk_norep')
    a.i('str', 0, 7, F_PRESSED)             # <- le stock manquant
    a.pop([4, 5, 15])
    a.pool_here()

    # ============================================================== correspondances
    a.label('rebuild')
    a.push([4, 5, 6, 14])
    a.i('ldr', 4, 7, F_MBPTR)
    a.i('movs', 5, 0)                        # nombre de resultats
    a.i('movs', 6, 1)                        # espece courante
    a.label('rb_l')
    a.bl('match_species')
    a.i('cmpi', 0, 0)
    a.bc('eq', 'rb_next')
    a.i('strh', 6, 4, 0)
    a.i('addsi', 4, 2)
    a.i('addsi', 5, 1)
    a.label('rb_next')
    a.i('addsi', 6, 1)
    a.lit(0, 386)
    a.i('cmp', 6, 0)
    a.bc('le', 'rb_l')
    a.i('str', 5, 7, F_MCOUNT)
    a.pop([4, 5, 6, 15])
    a.pool_here()

    # r0 = espece a tester ; retourne r0 = espece ou 0
    a.label('match_species')
    a.push([4, 5, 6, 14])
    a.i('movhi', 3, 0)                       # r3 = espece
    a.i('ldr', 0, 7, F_QLEN)
    a.i('cmpi', 0, 0)
    a.bc('eq', 'ms_start')
    a.i('movhi', 0, 3)
    a.i('subsi', 0, 1)
    a.i('lsls', 0, 0, 5)
    a.lit(1, ROM_NAMES)
    a.i('adds', 0, 0, 1)
    a.i('addsi', 0, 16)                      # partie normalisee du nom
    a.i('movhi', 4, 0)                       # r4 = nom
    a.i('movs', 5, 0)                        # r5 = position
    a.label('ms_l')
    a.i('ldr', 6, 7, F_QLEN)
    a.i('cmp', 5, 6)
    a.bc('ge', 'ms_no')
    a.i('ldrb', 6, 4, 0)
    a.i('cmpi', 6, 0)
    a.bc('eq', 'ms_no')
    a.addrsp(0, F_QUERY)
    a.i('ldrb', 0, 0, 5)
    a.i('cmp', 6, 0)
    a.bc('ne', 'ms_no')
    a.i('addsi', 5, 1)
    a.i('addsi', 4, 1)
    a.b('ms_l')
    a.label('ms_no')
    a.i('movs', 0, 0)
    a.b('ms_ret')
    a.label('ms_start')
    a.i('movhi', 0, 3)
    a.label('ms_ret')
    a.pop([4, 5, 6, 15])
    a.pool_here()

    # ============================================================== curseur
    a.label('adjust_top')
    a.i('ldr', 0, 7, F_CURSOR)
    a.i('ldr', 1, 7, F_TOP)
    a.i('cmp', 0, 1)
    a.bc('ge', 'at_1')
    a.i('str', 0, 7, F_TOP)
    a.b('at_done')
    a.label('at_1')
    a.i('addsi', 1, LIST_N - 1)
    a.i('cmp', 0, 1)
    a.bc('le', 'at_done')
    a.i('subsi', 0, LIST_N - 1)
    a.i('str', 0, 7, F_TOP)
    a.label('at_done')
    a.bx(14)

    a.label('move_delta')
    a.push([4, 14])
    a.i('movhi', 4, 0)                       # r4 = delta (sauvegarde)
    a.i('ldr', 0, 7, F_MCOUNT)
    a.i('cmpi', 0, 0)
    a.bc('eq', 'md_done')
    a.i('ldr', 1, 7, F_CURSOR)
    a.i('adds', 1, 1, 4)                     # r1 = curseur + delta
    a.i('cmpi', 1, 0)
    a.bc('ge', 'md_1')
    a.i('ldr', 0, 7, F_MCOUNT)
    a.i('subsi', 0, 1)                       # r1 = total - 1
    a.i('movhi', 1, 0)
    a.label('md_1')
    a.i('ldr', 0, 7, F_MCOUNT)
    a.i('cmp', 1, 0)
    a.bc('lt', 'md_2')
    a.i('movs', 1, 0)
    a.label('md_2')
    a.i('str', 1, 7, F_CURSOR)
    a.bl('adjust_top')
    a.label('md_done')
    a.pop([4, 15])
    a.pool_here()

    # ============================================================== actions
    a.label('do_confirm')
    a.push([4, 14])
    a.i('ldr', 0, 7, F_MCOUNT)
    a.i('cmpi', 0, 0)
    a.bc('eq', 'dc_out')
    a.i('ldr', 0, 7, F_CURSOR)
    a.i('ldr', 1, 7, F_MCOUNT)
    a.i('cmp', 0, 1)
    a.bc('ge', 'dc_out')
    a.i('ldr', 1, 7, F_MBPTR)
    a.i('lsls', 2, 0, 1)
    a.i('adds', 1, 1, 2)
    a.i('ldrh', 4, 1, 0)
    a.i('str', 4, 7, F_SPECIES)
    a.lit(0, RES_OK)
    a.i('str', 0, 7, F_RESULT)
    a.label('dc_out')
    a.pop([4, 15])
    a.pool_here()

    a.label('do_random')
    a.push([4, 5, 14])
    a.i('ldr', 0, 7, F_MCOUNT)
    a.i('cmpi', 0, 0)
    a.bc('eq', 'dr_out')
    a.i('ldr', 4, 7, F_SEED)
    a.i('ldr', 5, 7, F_SEED)
    a.i('eors', 4, 5)                        # evite zero
    a.i('lsls', 5, 4, 13)
    a.i('eors', 4, 5)
    a.i('lsrs', 5, 4, 17)
    a.i('eors', 4, 5)
    a.i('lsls', 5, 4, 5)
    a.i('eors', 4, 5)
    a.i('cmpi', 4, 0)
    a.bc('ne', 'dr_1')
    a.i('movs', 4, 1)
    a.label('dr_1')
    a.i('str', 4, 7, F_SEED)
    a.i('movs', 5, 0xFF)
    a.i('lsls', 5, 5, 3)
    a.i('addsi', 5, 7)                       # r5 = 0x7FF
    a.i('ands', 4, 5)                        # r4 = index aleatoire
    a.label('dr_loop')
    a.i('ldr', 5, 7, F_MCOUNT)
    a.i('cmp', 4, 5)
    a.bc('lt', 'dr_ok')
    a.i('subs', 4, 4, 5)
    a.b('dr_loop')
    a.label('dr_ok')
    a.i('str', 4, 7, F_CURSOR)
    a.i('ldr', 1, 7, F_MBPTR)
    a.i('lsls', 2, 4, 1)
    a.i('adds', 1, 1, 2)
    a.i('ldrh', 4, 1, 0)
    a.i('str', 4, 7, F_SPECIES)
    a.bl('adjust_top')
    a.lit(0, RES_OK)
    a.i('str', 0, 7, F_RESULT)
    a.label('dr_out')
    a.pop([4, 5, 15])
    a.pool_here()

    # ============================================================== clavier
    a.label('type_key')
    a.push([4, 5, 14])
    a.i('ldr', 4, 7, F_KY)
    a.i('lsls', 5, 4, 3)
    a.i('subs', 5, 5, 4)
    a.i('ldr', 4, 7, F_KX)
    a.i('adds', 5, 5, 4)
    a.lit(0, ROM_KBD)
    a.i('adds', 0, 0, 5)
    a.i('ldrb', 4, 0, 0)
    a.i('movs', 0, 0xFF)
    a.i('cmp', 4, 0)
    a.bc('eq', 'tk_del')
    a.i('movs', 0, 0xFE)
    a.i('cmp', 4, 0)
    a.bc('ne', 'tk_char')
    a.i('movs', 0, 0)
    a.i('str', 0, 7, F_QLEN)
    a.b('tk_rebuild')
    a.label('tk_del')
    a.i('ldr', 0, 7, F_QLEN)
    a.i('cmpi', 0, 0)
    a.bc('eq', 'tk_done')
    a.i('subsi', 0, 1)
    a.i('str', 0, 7, F_QLEN)
    a.b('tk_rebuild')
    a.label('tk_char')
    a.i('ldr', 0, 7, F_QLEN)
    a.lit(1, 15)
    a.i('cmp', 0, 1)
    a.bc('ge', 'tk_done')
    a.addrsp(1, F_QUERY)
    a.i('adds', 1, 1, 0)
    a.i('strb', 4, 1, 0)
    a.i('addsi', 0, 1)
    a.i('str', 0, 7, F_QLEN)
    a.label('tk_rebuild')
    a.bl('rebuild')
    a.i('movs', 0, 0)
    a.i('str', 0, 7, F_CURSOR)
    a.i('str', 0, 7, F_TOP)
    a.bl('adjust_top')
    a.lit(0, 1)
    a.i('str', 0, 7, F_DIRTY)
    a.label('tk_done')
    a.pop([4, 5, 15])
    a.pool_here()

    for name, fld, limit, dec in (('kb_y_up', F_KY, 0, -1),
                                  ('kb_y_dn', F_KY, KBD_ROWS - 1, 1),
                                  ('kb_x_up', F_KX, 0, -1),
                                  ('kb_x_dn', F_KX, KBD_COLS - 1, 1)):
        a.label(name)
        a.i('ldr', 0, 7, fld)
        a.i('cmpi', 0, limit)
        a.bc('eq', name + '_end')
        if dec < 0:
            a.i('subsi', 0, 1)
        else:
            a.i('addsi', 0, 1)
        a.i('str', 0, 7, fld)
        a.lit(0, 1)
        a.i('str', 0, 7, F_DIRTY)
        a.label(name + '_end')
        a.bx(14)

    # ============================================================== dessin
    a.label('put_tile')
    a.push([4, 5, 6, 14])
    a.lit(4, SCREENBASE)
    a.i('lsls', 5, 1, 6)
    a.i('adds', 4, 4, 5)
    a.i('lsls', 5, 2, 1)
    a.i('adds', 4, 4, 5)
    a.i('lsls', 3, 3, 12)
    a.i('orrs', 0, 3)
    a.i('strh', 0, 4, 0)
    a.pop([4, 5, 6, 15])
    a.pool_here()

    a.label('draw_string')
    a.push([4, 5, 6, 14])
    a.lit(4, SCREENBASE)
    a.i('lsls', 5, 1, 6)
    a.i('adds', 4, 4, 5)
    a.i('lsls', 5, 2, 1)
    a.i('adds', 4, 4, 5)
    a.i('lsls', 3, 3, 12)
    a.label('ds_l')
    a.i('ldrb', 5, 0, 0)
    a.i('cmpi', 5, 0)
    a.bc('eq', 'ds_done')
    a.i('orrs', 5, 3)
    a.i('strh', 5, 4, 0)
    a.i('addsi', 4, 2)
    a.i('addsi', 0, 1)
    a.b('ds_l')
    a.label('ds_done')
    a.pop([4, 5, 6, 15])
    a.pool_here()

    # r0 = valeur (0..999), r1 = ligne, r2 = colonne, r3 = banque
    a.label('draw_num3')
    a.push([4, 5, 6, 14])
    a.subspace(20)
    a.i('str', 1, 13, 0)                     # ligne
    a.i('str', 2, 13, 4)                     # colonne
    a.i('str', 3, 13, 8)                     # banque
    a.i('movhi', 4, 0)                       # r4 = valeur
    a.i('movs', 5, 0)                        # r5 = centaines
    a.lit(6, 100)
    a.label('dn_h')
    a.i('cmp', 4, 6)
    a.bc('lt', 'dn_hd')
    a.i('subs', 4, 4, 6)
    a.i('addsi', 5, 1)
    a.b('dn_h')
    a.label('dn_hd')
    a.i('str', 5, 13, 12)
    a.i('movs', 5, 0)                        # r5 = dizaines
    a.lit(6, 10)
    a.label('dn_t')
    a.i('cmp', 4, 6)
    a.bc('lt', 'dn_td')
    a.i('subs', 4, 4, 6)
    a.i('addsi', 5, 1)
    a.b('dn_t')
    a.label('dn_td')
    a.i('str', 5, 13, 16)                    # dizaines
    a.i('ldr', 0, 13, 12)
    a.i('addsi', 0, 0x35)
    a.i('ldr', 1, 13, 0)
    a.i('ldr', 2, 13, 4)
    a.i('ldr', 3, 13, 8)
    a.bl('put_tile')
    a.i('ldr', 0, 13, 16)
    a.i('addsi', 0, 0x35)
    a.i('ldr', 1, 13, 0)
    a.i('ldr', 2, 13, 4)
    a.i('addsi', 2, 1)
    a.i('ldr', 3, 13, 8)
    a.bl('put_tile')
    a.i('movhi', 0, 4)
    a.i('addsi', 0, 0x35)
    a.i('ldr', 1, 13, 0)
    a.i('ldr', 2, 13, 4)
    a.i('addsi', 2, 2)
    a.i('ldr', 3, 13, 8)
    a.bl('put_tile')
    a.addframe(20)
    a.pop([4, 5, 6, 15])
    a.pool_here()

    a.label('load_sprite')
    a.push([4, 5, 6, 14])
    a.i('movhi', 5, 4)
    a.i('subsi', 5, 1)
    a.i('lsls', 6, 5, 11)
    a.lit(0, ROM_SPRT)
    a.i('adds', 0, 0, 6)
    a.lit(1, SPR_VRAM)
    a.lit(2, 2048)
    a.bl('dma3')
    a.i('lsls', 6, 5, 5)
    a.lit(0, ROM_SPRP)
    a.i('adds', 0, 0, 6)
    a.lit(1, PRAM + 0x40)
    a.lit(2, 32)
    a.bl('dma3')
    a.pop([4, 5, 6, 15])
    a.pool_here()

    # ============================================================== entrees
    a.label('handle_input')
    a.push([4, 5, 6, 14])
    a.i('ldr', 0, 7, F_PRESSED)
    a.i('ldr', 1, 7, F_FOCUS)
    a.i('cmpi', 1, 0)
    a.bc('ne', 'hi_kb')
    # ---- mode liste ----
    for key, lbl, act in ((K_A, 'hi_noA', 'confirm'), (K_B, 'hi_noB', 'cancel'),
                          (K_ST, 'hi_noSt', 'random'), (K_SEL, 'hi_noSel', 'focus'),
                          (K_L, 'hi_noL', 'pgup'), (K_R, 'hi_noR', 'pgdn'),
                          (K_LF, 'hi_noLf', 'left'), (K_UP, 'hi_noUp', 'up'),
                          (K_DN, 'hi_noDn', 'down'), (K_RT, 'hi_noRt', 'right')):
        simm_lt(a, 2, key)
        a.i('ands', 2, 0)
        a.i('cmpi', 2, 0)
        a.bc('eq', lbl)
        if act == 'confirm':
            a.bl('do_confirm')
        elif act == 'cancel':
            a.lit(2, RES_CANCEL)
            a.i('str', 2, 7, F_RESULT)
        elif act == 'random':
            a.bl('do_random')
        elif act == 'focus':
            a.i('movs', 2, 1)
            a.i('str', 2, 7, F_FOCUS)
        elif act == 'pgup':
            simm(a, 0, -LIST_N)
            a.bl('move_delta')
        elif act == 'pgdn':
            simm(a, 0, LIST_N)
            a.bl('move_delta')
        elif act == 'left':
            a.bl('backspace')
        elif act == 'up':
            simm(a, 0, -1)
            a.bl('move_delta')
        elif act == 'down':
            simm(a, 0, 1)
            a.bl('move_delta')
        elif act == 'right':
            a.i('movs', 2, 1)
            a.i('str', 2, 7, F_FOCUS)
        a.lit(2, 1)
        a.i('str', 2, 7, F_DIRTY)
        a.b('hi_end')
        a.label(lbl)
    a.b('hi_end')
    # ---- mode clavier ----
    a.label('hi_kb')
    for key, lbl, act in ((K_A, 'hi_kbnoA', 'key'), (K_B, 'hi_kbnoB', 'unfocus'),
                          (K_SEL, 'hi_kbnoSel', 'unfocus'),
                          (K_UP, 'hi_kbnoUp', 'up'), (K_DN, 'hi_kbnoDn', 'down'),
                          (K_LF, 'hi_kbnoLf', 'left'), (K_RT, 'hi_kbnoRt', 'right'),
                          (K_L, 'hi_kbnoL', 'unfocus'), (K_R, 'hi_kbnoR', 'unfocus'),
                          (K_ST, 'hi_kbnoSt', 'unfocus')):
        simm_lt(a, 2, key)
        a.i('ands', 2, 0)
        a.i('cmpi', 2, 0)
        a.bc('eq', lbl)
        if act == 'key':
            a.bl('type_key')
        elif act == 'unfocus':
            a.i('movs', 2, 0)
            a.i('str', 2, 7, F_FOCUS)
        elif act == 'up':
            a.bl('kb_y_up')
        elif act == 'down':
            a.bl('kb_y_dn')
        elif act == 'left':
            a.bl('kb_x_up')
        elif act == 'right':
            a.bl('kb_x_dn')
        a.b('hi_end')
        a.label(lbl)
    a.label('hi_end')
    a.pop([4, 5, 6, 15])
    a.pool_here()

    a.label('backspace')
    a.push([4, 14])
    a.i('ldr', 0, 7, F_QLEN)
    a.i('cmpi', 0, 0)
    a.bc('eq', 'bs_done')
    a.i('subsi', 0, 1)
    a.i('str', 0, 7, F_QLEN)
    a.bl('rebuild')
    a.i('movs', 0, 0)
    a.i('str', 0, 7, F_CURSOR)
    a.i('str', 0, 7, F_TOP)
    a.bl('adjust_top')
    a.lit(0, 1)
    a.i('str', 0, 7, F_DIRTY)
    a.label('bs_done')
    a.pop([4, 15])
    a.pool_here()

    # ============================================================== REDESSIN
    a.label('redraw')
    a.push([4, 5, 6, 14])
    a.lit(0, SCREENBASE)
    a.i('movs', 1, 0)
    a.lit(2, 640)
    a.label('rd_clr')
    a.i('strh', 1, 0, 0)
    a.i('addsi', 0, 2)
    a.i('subsi', 2, 1)
    a.bc('ne', 'rd_clr')
    # titre
    a.lit(0, ROM_TITLE)
    a.i('movs', 1, TITLE_ROW)
    a.i('movs', 2, TITLE_COL)
    a.i('movs', 3, 3)
    a.bl('draw_string')
    # liste
    a.i('movs', 4, 0)
    a.label('rd_list')
    a.i('cmpi', 4, LIST_N)
    a.bc('ge', 'rd_listdone')
    a.i('ldr', 0, 7, F_TOP)
    a.i('adds', 0, 0, 4)
    a.i('ldr', 1, 7, F_MCOUNT)
    a.i('cmp', 0, 1)
    a.bc('ge', 'rd_listdone')
    a.i('ldr', 1, 7, F_MBPTR)
    a.i('lsls', 2, 0, 1)
    a.i('adds', 1, 1, 2)
    a.i('ldrh', 5, 1, 0)
    a.i('movhi', 6, 5)
    a.i('ldr', 1, 7, F_CURSOR)
    a.i('cmp', 0, 1)
    a.bc('ne', 'rd_notcur')
    a.i('movs', 0, G_ARROW)
    a.i('movs', 1, LIST_Y)
    a.i('adds', 1, 1, 4)
    a.i('movs', 2, 0)
    a.i('movs', 3, 1)
    a.bl('put_tile')
    a.i('movs', 3, 1)
    a.b('rd_row')
    a.label('rd_notcur')
    a.i('movs', 3, 0)
    a.label('rd_row')
    a.i('movs', 0, G_HASH)
    a.i('movs', 1, LIST_Y)
    a.i('adds', 1, 1, 4)
    a.i('movs', 2, 1)
    a.bl('put_tile')
    a.i('movhi', 0, 6)
    a.i('movs', 1, LIST_Y)
    a.i('adds', 1, 1, 4)
    a.i('movs', 2, 2)
    a.bl('draw_num3')
    a.i('movs', 0, G_SPACEG)
    a.i('movs', 1, LIST_Y)
    a.i('adds', 1, 1, 4)
    a.i('movs', 2, 5)
    a.bl('put_tile')
    a.lit(0, ROM_NAMES)
    a.i('subsi', 6, 1)
    a.i('lsls', 6, 6, 5)
    a.i('adds', 0, 0, 6)
    a.i('movs', 1, LIST_Y)
    a.i('adds', 1, 1, 4)
    a.i('movs', 2, 6)
    a.bl('draw_string')
    a.i('addsi', 4, 1)
    a.b('rd_list')
    a.label('rd_listdone')
    # compteur position / total
    a.i('ldr', 0, 7, F_CURSOR)
    a.i('addsi', 0, 1)
    a.i('movs', 1, INFO_ROW)
    a.i('movs', 2, 1)
    a.i('movs', 3, 0)
    a.bl('draw_num3')
    a.i('movs', 0, G_SLASH)
    a.i('movs', 1, INFO_ROW)
    a.i('movs', 2, 4)
    a.i('movs', 3, 0)
    a.bl('put_tile')
    a.i('ldr', 0, 7, F_MCOUNT)
    a.i('movs', 1, INFO_ROW)
    a.i('movs', 2, 5)
    a.i('movs', 3, 0)
    a.bl('draw_num3')
    # sprite (bloc de 8x8 tuiles)
    a.i('movs', 4, 0)
    a.label('rd_sy')
    a.i('cmpi', 4, 8)
    a.bc('ge', 'rd_syd')
    a.i('movs', 5, 0)
    a.label('rd_sx')
    a.i('cmpi', 5, 8)
    a.bc('ge', 'rd_sxd')
    a.i('lsls', 6, 4, 3)
    a.i('adds', 6, 6, 5)
    a.i('addsi', 6, 128)
    a.i('movhi', 0, 6)
    a.i('movs', 1, SPR_Y)
    a.i('adds', 1, 1, 4)
    a.i('movs', 2, SPR_X)
    a.i('adds', 2, 2, 5)
    a.i('movs', 3, 2)
    a.bl('put_tile')
    a.i('addsi', 5, 1)
    a.b('rd_sx')
    a.label('rd_sxd')
    a.i('addsi', 4, 1)
    a.b('rd_sy')
    a.label('rd_syd')
    # chargement du sprite si l'espece a change
    a.i('ldr', 0, 7, F_CURSOR)
    a.i('ldr', 1, 7, F_TOP)
    a.i('adds', 0, 0, 1)
    a.i('ldr', 1, 7, F_MCOUNT)
    a.i('cmp', 0, 1)
    a.bc('ge', 'rd_nospr')
    a.i('ldr', 1, 7, F_MBPTR)
    a.i('lsls', 2, 0, 1)
    a.i('adds', 1, 1, 2)
    a.i('ldrh', 4, 1, 0)
    a.i('ldr', 0, 7, F_LASTSPR)
    a.i('cmp', 0, 4)
    a.bc('eq', 'rd_nospr')
    a.i('str', 4, 7, F_LASTSPR)
    a.bl('load_sprite')
    a.label('rd_nospr')
    # barre de recherche
    a.lit(0, ROM_QLABEL)
    a.i('movs', 1, QUERY_ROW)
    a.i('movs', 2, QLABEL_COL)
    a.i('movs', 3, 0)
    a.bl('draw_string')
    a.i('movs', 4, 0)
    a.label('rd_q')
    a.i('ldr', 5, 7, F_QLEN)
    a.i('cmp', 4, 5)
    a.bc('ge', 'rd_qd')
    a.addrsp(0, F_QUERY)
    a.i('ldrb', 0, 0, 4)
    a.i('movs', 1, QUERY_ROW)
    a.i('movs', 2, QCOL)
    a.i('adds', 2, 2, 4)
    a.i('movs', 3, 0)
    a.bl('put_tile')
    a.i('addsi', 4, 1)
    a.b('rd_q')
    a.label('rd_qd')
    a.i('movs', 0, G_UNDER)
    a.i('movs', 1, QUERY_ROW)
    a.i('movs', 2, QCOL)
    a.i('ldr', 3, 7, F_QLEN)
    a.i('adds', 2, 2, 3)
    a.i('movs', 3, 1)
    a.bl('put_tile')
    # clavier
    a.i('movs', 4, 0)
    a.label('rd_ky')
    a.i('cmpi', 4, KBD_ROWS)
    a.bc('ge', 'rd_kyd')
    a.i('movs', 5, 0)
    a.label('rd_kx')
    a.i('cmpi', 5, KBD_COLS)
    a.bc('ge', 'rd_kxd')
    a.i('lsls', 6, 4, 3)
    a.i('subs', 6, 6, 4)
    a.i('adds', 6, 6, 5)
    a.lit(0, ROM_KBD)
    a.i('adds', 0, 0, 6)
    a.i('ldrb', 0, 0, 0)
    a.i('cmpi', 0, 0x80)
    a.bc('lo', 'rd_kb1')
    a.i('cmpi', 0, 0xFF)
    a.bc('ne', 'rd_kb2')
    a.i('movs', 0, G_DEL)
    a.b('rd_kb1')
    a.label('rd_kb2')
    a.i('movs', 0, G_ALL)
    a.label('rd_kb1')
    a.i('ldr', 1, 7, F_FOCUS)
    a.i('cmpi', 1, 0)
    a.bc('eq', 'rd_kb3')
    a.i('ldr', 1, 7, F_KX)
    a.i('cmp', 1, 5)
    a.bc('ne', 'rd_kb3')
    a.i('ldr', 1, 7, F_KY)
    a.i('cmp', 1, 4)
    a.bc('ne', 'rd_kb3')
    a.i('movs', 3, 1)
    a.b('rd_kb4')
    a.label('rd_kb3')
    a.i('movs', 3, 0)
    a.label('rd_kb4')
    a.i('movs', 1, KBD_Y)
    a.i('adds', 1, 1, 4)
    a.i('movs', 2, KBD_X)
    a.i('adds', 2, 2, 5)
    a.bl('put_tile')
    a.i('addsi', 5, 1)
    a.b('rd_kx')
    a.label('rd_kxd')
    a.i('addsi', 4, 1)
    a.b('rd_ky')
    a.label('rd_kyd')
    # aide
    a.i('movs', 4, 0)
    a.label('rd_help')
    a.i('cmpi', 4, HELP_N)
    a.bc('ge', 'rd_helpd')
    a.i('lsls', 5, 4, 4)
    a.i('lsls', 6, 4, 3)
    a.i('adds', 5, 5, 6)
    a.lit(0, ROM_HELP)
    a.i('adds', 0, 0, 5)
    a.i('movs', 1, HELP_Y)
    a.i('adds', 1, 1, 4)
    a.i('movs', 2, HELP_X)
    a.i('movs', 3, 0)
    a.bl('draw_string')
    a.i('addsi', 4, 1)
    a.b('rd_help')
    a.label('rd_helpd')
    a.pop([4, 5, 6, 15])
    a.pool_here()
    return a


if __name__ == '__main__':
    data = assets.build_all()
    a = gen(data)
    code, labels = a.assemble()
    print('code : %d octets' % len(code))
    for k in ('hook', 'chooser', 'redraw', 'dma3', 'rebuild', 'match_species'):
        print('  %-14s 0x%08X' % (k, labels[k]))

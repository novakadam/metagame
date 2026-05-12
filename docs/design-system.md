# Metagame – Design System

> Design specifikus részletek, tokenek, méretek, asset lista.
> Ez változhat sűrűbben mint a prodspec.
> Utoljára frissítve: 2026-05-12

---

## Figma

- **Fő fájl:** metagame-Frontend-build
- **Design system forrás:** metagame-shadcn-studio-figma (Themes/Metagame collection)
- **Mód:** csak Dark mode – Light mode nincs tervezve egyelőre
- **Variables:** shadcn studio rendszer, Metagame collection felülírja az értékeket

---

## Design tokenek

A pontos értékek: `site/css/tokens.css`

### Színek (Figma Metagame collection alapján)

| Token | Hex | Használat |
|---|---|---|
| `--color-bg` | `#40022C` | Fő oldal háttér |
| `--color-bg-card` | `#720A2B` | Kártya, panel háttér |
| `--color-bg-muted` | `#5A0E3A` | Közbülső réteg, hover |
| `--color-bg-sidebar` | `#2A0020` | Nav háttér, legsötétebb |
| `--color-bg-popover` | `#022139` | Dropdown, tooltip, sötétkék |
| `--color-text` | `#F4F0DD` | Elsődleges szöveg |
| `--color-text-muted` | `#D8CBAF` | Másodlagos szöveg |
| `--color-text-card` | `#FFF3D7` | Kártya szöveg |
| `--color-gold` | `#B38A24` | Arany – gombok, keretek, díszek |
| `--color-gold-ring` | `#DAA415` | Arany hover, fókusz |
| `--color-red` | `#8B0000` | Sötétpiros sávok |
| `--color-destructive` | `#FF4400` | Hibák, törlés |
| `--color-secondary` | `#022139` | Sötétkék akcentus |
| `--color-border` | `#B38A24` | Arany keret |
| `--color-border-muted` | `#8A4515` | Barna keret, input |

### Tipográfia

| Token | Érték |
|---|---|
| `--font-display` | `'Playfair Display', Georgia, serif` |
| `--font-body` | `'Manrope', system-ui, sans-serif` |

Google Fonts import szükséges: Playfair Display + Manrope

### Border radius (fantasy stílus – szándékosan lapos)

| Token | Érték |
|---|---|
| `--radius-xs` | `2px` |
| `--radius-sm` | `6px` |
| `--radius-md` | `0px` |
| `--radius-pill` | `9999px` |

---

## Keret méretek (Illustrator mérések alapján)

```
Felső vonal:     24px-nél kezdődik az oldal tetejétől
Bal vonal:       13px-nél kezdődik az oldal bal szélétől
Jobb vonal:      12px-nél az oldal jobb szélétől
Footer:          37px magas

Bal nav:         255px széles összesen (vonal 56px-nél)
Jobb nav:        55px széles (50px ikon + 5px margó)
Top bar:         197px magas
Tartalom:        top: 197px, left: 255px, right: 55px, bottom: 37px
```

---

## SVG Asset lista

Helye: `assets/frame/`

```
frame-corner-tl.svg         ← bal felső sarok
frame-corner-tr.svg         ← jobb felső sarok (nav területtel együtt)
frame-corner-bl.svg         ← bal alsó sarok
frame-corner-br.svg         ← jobb alsó sarok
frame-line-top.svg          ← felső vonal
frame-line-left.svg         ← bal vonal
frame-line-right-bottom.svg ← jobb vonal alsó része (nav alatt)
frame-line-bottom.svg       ← alsó vonal
```

Logó: `assets/images/logo.webp`

### SVG export szabályok
- Stroke marad stroke (nem expand/outline)
- Nulla padding a bounding boxban
- Stroke szín: `#B38A24` (vagy `currentColor` ha lehetséges)

---

## Keret animációk (tervezett)

- **Shimmer effekt:** arany fény végigfut a keret vonalain
- CSS `linear-gradient` + animation, nem igényel összefüggő SVG path-t
- Implementálás: később, a keret widget stabilizálása után

---

## Ikonok

- **Bal nav főkategóriák:** színes, 2-3 színű, térbeli hexagon ikonok (Andras készíti)
- **Jobb nav funkciók:** monokróm ikonok (profil, kedvencek, kosár, értesítések, helyszín, telefon)
- **Kosár badge:** sárga kiemelés + számláló ha van termék

---

## Vizuális referencia képek

`docs/screenshots/` mappában:
- `mg-home.jpg` – teljes desktop home oldal
- `mg-frame.jpg` – keret dizájn referencia
- `mg-pr-list-modal.jpg` – termék lista + kosár drawer
- `mg-prdetails.jpg` – termék részlet oldal
- `mg-sections.jpg` – home szekciók teljes hosszban

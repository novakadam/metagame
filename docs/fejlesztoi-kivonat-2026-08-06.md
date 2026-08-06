# Frontend változás-kivonat — 2026. 08. 06.

Commitok a `bootstrap` branchen: `0812216`, `39091e0`, `275ec16`, `abe4b9f`

## 1. Termékkártya — 3 mezős névbontás ⭐ ÚJ ADATIGÉNY

A terméknév strukturálisan három mezőre bomlik (07.23-i meeting + Andris 07.27-i
email döntése alapján):

| Mező | Megjelenés | Példa |
|---|---|---|
| `product.system` | világ/rendszer — arany Playfair, 14px | Magic: the Gathering |
| `product.title` | terméknév — Manrope 600, 18px, fehér, **max 2 sor** (`.text-clamp-2`) | Strixhaven: School of Mages |
| `product.variant` | kiszerelés — Manrope 500, 12px | Draft Booster |

- Referencia-markup: `site/templates/product-card-bs.html` (pure BS) és
  `site/templates/product-list.html` (grid + hibrid kártya, BEM classokkal:
  `__system` / `__title` / `__subtitle`)
- A demo adatok Andris debella tesztneveivel futnak (`product-list.js`,
  `MG_DEMO_PRODUCTS`)
- Ugyanez a hierarchia a termék oldalon: a `__brand` sor is arany lett
  (konzisztencia), lásd `product-detail.css`

## 2. Termék grid — BS row-cols rács

- A custom CSS-grid (`repeat(auto-fill, minmax(300px,1fr))`) kivezetve;
  helyette: `row gx-4 gy-5 row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4`
- `.mg-product-grid` már csak JS-hook + padding
- Lista nézet: a JS a `row-cols-*` osztályokat cseréli (`GRID_COLS`,
  `product-list.js`); kártyák `col d-flex` wrapperben
- xl-től 4 oszlop → laptopon kisebb, teljesen kiférő kártya

## 3. Kártya-méretezés (Andris: „100%-on férjen ki a Kosárba gombbal")

- Képzóna `aspect-ratio: 1 / 0.85`, tömörített paddingok, 28px-es elérhetőség-sorok
- Kártya ~440px → 1536×864-es laptopon a teljes kártya + CTA látszik
- 1366×768-on még ~60px hiányzik — további zsugorítás designdöntés

## 4. Kategória-szalag (badge)

- A szalag **státuszt** jelöl (Ajánlott / Előrendelés / Akciós / Limitált) —
  rövid, kontrollált értékkészlet
- Túlcsordulás-védelem: `max-width` + ellipsis (hosszú név nem lóg ki)
- Playfair optikai közép-igazítás a kártya-szalagban és a BS `.badge-ribbon`-ban

## 5. Topbar/logó töréspont-fix

- `.mg-topbar-row` `max-width: calc(100% - 415px)` → `calc(100% - 620px)`
  (`frame.css`): 1400–1610px között a kereső-sor a teljes logóra csúszott
  (Csabi laptop-bugja)
- Tablet keretvonal-illesztés: `.mg-frame-line--top` left 161px → 174px
  (a tablet sarok-SVG végpontjához igazítva — kilógó vonalcsonk megszűnt)

## 6. Tablet bal nav (1024–1400)

- Az ikonsor a bal keretcsíkra igazítva (`translateX(24px)` + z-index),
  „gyöngysor" hatás
- A rombusz kompakt nézetben teljes, szimmetrikus (desktopon marad a
  levágott ötszög, ami a címke-sávba olvad)

## 7. Szűrő panel — offcanvas-xxl ⭐ STRUKTÚRA-VÁLTOZÁS

- `offcanvas-lg` → `offcanvas-xxl`: a szűrő **1400 alatt** gombról nyíló fiók
  (BS responsive offcanvas), 1400 felett statikus sidebar
- ⚠️ Az `<aside class="mg-filter-panel">` **DOM-ban a `.mg-frame` UTÁN, root
  szinten él** (products.html) — az `.mg-content` (position:absolute +
  z-index:1) stacking contextje alá szorította a fiókot és a backdropot.
  Wicket oldalon is így érdemes strukturálni.
- ≥1400: a panel `position:absolute; top:180; left:255; bottom:50`
  (`filter-panel.css`), a `.mg-product-layout` `margin-left:294px` +
  `width:calc(100% - 294px)` (`product-list.css`)
- A „Szűrők" gomb (`.mg-product-toolbar__filter-btn`) 1400 alatt látszik;
  hiányzó `btn` alaposztály pótolva

## 8. Megamenü-javítás (a „roncsolódott" demó oka)

- (a) A menü nem örökölt szövegszínt → BS body-szín (sötét a sötéten):
  fix `color: var(--color-text)` a `.mg-megamenu` gyökerén
- (b) A `mega-menu.js` régi markupot generált → most a
  `templates/mega-menu.html` mintáját adja: `nav.nav.flex-column.gap-3` +
  `a.nav-link.p-0`, brand név `__brand-name` BEM class
- Tablet: menü `left: 96px` (nem fedi az ikonsort), alkategóriák 2 hasábban,
  **Legnépszerűbb ajánló oszlop visszakapcsolva**
- ⭐ ADATIGÉNY: a „Legnépszerűbb" blokkhoz kategóriánkénti kiemelt/népszerű
  termék lista kell majd (most JS placeholder)

## 9. Új utility-k (`theme-bs.css`, kommentezve)

- `.text-clamp-2` — max 2 soros szöveg ellipszissel (BS-ben nincs line-clamp)
- `.font-body` — talpatlan betű heading tagen (a headingek Playfairre mappelve)

## 10. Oszlopszám-finomítás a sidebar sávjában

- 1400–1700 között (statikus szűrő mellett) 3 oszlop (`row-cols-xxl-3`),
  ≥1700-tól custom media override ad 4-et (BS-nek nincs 1700-as töréspontja)
- Elérhetőség-sor címkék: nowrap + ellipsis keskeny kártyán

## 11. Háttér-textúra PROTOTÍPUS (külön demo-oldal) ⭐ JÓVÁHAGYÁSRA VÁR

- Demo: `products-textura.html` + `css/components/bg-texture.css` — az éles
  oldalakat NEM érinti, jóváhagyás után emeljük át
- Rétegek: embléma-vonalmotívum watermark (data-URI SVG, oktogon + rombusz +
  körök a logó geometriájából) · mély bordó folt bal lent + sötétedő
  vignetta jobb lent (radial gradientek) · kártyák áttetsző bordó felülettel
  (`rgba(114,10,43,0.22)`) · kategória-csempéken 3px arany bal él-akcent ·
  a megamenü is kap motívumot + derengést
- Minden inline CSS-asset (data-URI + gradient), backend-et nem érint
- ⚠️ Megamenü: az alkategória-oszlop háttere átlátszó lett (a menü alapszínével
  azonos volt, de kitakarta a watermarkot)

## Nyitott / következő

- Epicarium (epicarium.eu) UI-elemzés + háttér-textúra javaslat a flat lila
  felületekre (Andris 07.17-i emailje)
- Megamenü 3. szint mock (Andris 07.27: jóváhagyva — „mehet még 1 szintnyi
  oldalra nyíló menü")
- 1366×768-as worst case kártyaméret — designdöntés

# Product detail (termék részletező) — BS template dokumentáció

**Fájl:** `site/templates/product-detail.html`
**Élő minta:** http://localhost:8080/templates/product-detail.html
**Élő oldal (régi, mg-* hibrid):** `site/product.html` — teljes oldal kerettel/navval; ez a template a **fő termékblokkot** mutatja BS-ben (galéria + info panel + accordion). A jobb sidebar külön: `related-products.html`.

## Layout

`row g-4 g-xl-5` → két `col-lg-6` oszlop (mobilon egymás alá). Bal: galéria + accordion. Jobb: info panel.

## Bal oszlop

| Elem | Megoldás |
|---|---|
| **Fő kép** | `ratio ratio-1x1` + `border border-gold` + `bg-product-frame` (gradient) + `object-fit-contain` |
| **Thumbnailek** | `d-flex gap-3`, mind `ratio ratio-1x1 flex-fill`; az aktív `border-2` |
| **Accordion** | BS standard `accordion` (a theme-bs.css adja a sötét stílust). **Globális szabály:** a nyitott elem teljesen vonal nélküli — (1) body alatt: `.accordion-item:has(> .accordion-collapse.show) { border-bottom-color: transparent }`, (2) header alatt: `.accordion-button:not(.collapsed) { box-shadow: none }` (a BS box-shadow-val húz belső vonalat). Minden accordiont érint |

## Jobb oszlop — info panel

A panel egy `border border-gold bg-card-mg position-relative` konténer, **szekciókra bontva** (mindegyik más háttérrel, BS `border-bottom`-mal elválasztva):

| Szekció | Háttér | Tartalom |
|---|---|---|
| Kategória badge | — | `badge badge-ribbon text-bg-primary` + `position-absolute top-0 start-50 translate-middle` (lelógó) |
| Heading | `bg-card-mg` | brand (`h6` Playfair), cím (`h1 fs-2` Playfair — SEO), `small` subtitle |
| Ár + készlet | `bg-secondary-mg` (kék) | ár (`h4 fw-bold` Playfair), eredeti ár (`text-decoration-line-through text-muted`), kedvezmény (`badge rounded-pill text-bg-danger`); készlet 3 sor `border border-gold`-ban, `text-success`/`text-danger` darabszám |
| Változatok | `bg-muted-mg` | label + thumbnail `<button>`-ök; a thumbok `bg-product-frame` gradienttel (különben a `<button>` UA-default világos hátteret kapna) |
| Kosár + leírás + benefits | — | qty stepper + Kosárba + wishlist, leírás, előnyök lista |

### Kosár sor
- **Qty stepper:** sima BS `input-group` (NEM a kompakt `qty-stepper` class — az alacsonyabb lenne; így a gombokkal egy magas), szűkített input
- **Kosárba:** `btn btn-secondary flex-grow-1`
- **Wishlist:** `btn btn-outline-secondary rounded-circle` (buttons.css ikon gomb)

## Tipográfia
- Heading-ek (brand `h6`, cím `h1 fs-2`, ár `h4`) → Playfair auto a theme-bs.css override-ból
- A régi `.mg-product__title` Manrope volt; itt Playfair (BS-first konzisztencia, mint az article-nél)

## Új utility-k (theme-bs.css, indoklással)

| Class | Miért |
|---|---|
| `.bg-card-mg` | BS `bg-*` mást jelent; ez a `--color-bg-card` szekció-háttér |
| `.bg-secondary-mg` | BS `bg-secondary` szürke; ez a `--color-secondary` (sötétkék ár-szekció) |
| `.bg-product-frame` | termékkép radial-gradient háttere — BS `card-img` nem tudja |
| `.border-gold` | BS-ben nincs arany szín token (közös a többi template-tel) |

> A 2 db `style="border-color:var(--color-bg)!important"` a szekció-elválasztóknál marad inline — a sötét (nem arany) belső elválasztó vonal egyedi, csak itt fordul elő. Wicketben kiemelhető class-ba, ha sokszor kell.

## Backend (Wicket) bekötési pontok

`<!-- BACKEND: -->` kommentek: `breadcrumb` foreach, `product.breadcrumb_title` / `.images` foreach / `.category` / `.brand` / `.title` / `.short_info` / `.price` / `.original_price` / `.discount_pct` / `.variants` foreach / `.description` / `.benefits` foreach, `stock.online` / `.store` / `.club`, `product.detail_sections` foreach (accordion), `add_to_cart`.

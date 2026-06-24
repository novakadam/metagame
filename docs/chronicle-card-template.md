# Chronicle card (hírblokk) — BS template dokumentáció

**Fájl:** `site/templates/chronicle-card.html`
**Élő minta:** http://localhost:8080/templates/chronicle-card.html
**Widget (régi, mg-* hibrid):** `site/widgets/chronicles.html` — a template a cél HTML struktúrát mutatja Wickethez.

## Betöltött CSS fájlok (sorrendben)

| Fájl | Mit ad |
|---|---|
| Bootstrap 5.3.3 CDN | alap komponensek + utility-k |
| `css/tokens.css` | design tokenek + `--bs-body-font-family` (Manrope), `--bs-heading-font-family` (Playfair) |
| `css/layout.css` | globális `.card` theme (arany border, bg-card háttér, 24px spacer) |
| `css/components/buttons.css` | btn variánsok + badge theme (pill színek, ribbon, oktogon) |
| `css/components/theme-bs.css` | BS selector override-ok (headings, fs-lépcsők, list-group, text-gold, border-gold…) |
| `templates/preview.css` | csak a preview oldal layoutja (template-label stb.) |

## 1. Szekció fejléc

```html
<h2>Friss hírek, események és újdonságok…</h2>
<p class="fs-4 text-muted mb-0">Kövesd a legújabb megjelenéseket…</p>
```

- **`h2`** — nincs rajta class: a Playfair Display + szín automatikus a theme-bs.css heading override-ból
- **`fs-4`** — 20px (a theme-bs.css fs-lépcsője: fs-1=36, fs-2=30, fs-3=24, fs-4=20, fs-5=18, fs-6=16, fs-7=12)
- **`text-muted`** — bézs másodlagos szövegszín (theme-elve)

## 2. Kiemelt cikk kártya

```html
<article class="card">
  <div class="card-body d-flex flex-column gap-3 pb-4">
    <div class="ratio ratio-4x3">
      <img src="…" class="rounded object-fit-cover" alt="…">
    </div>
    <p class="text-muted mb-0"><strong>ma</strong> | 2026. május 20.</p>
    <h3 class="mb-0">Megérkezett az új Pokémon…</h3>
    <p class="text-muted mb-0">Rövid összefoglaló…</p>
    <div class="d-flex flex-wrap gap-2">
      <span class="badge rounded-pill text-bg-dark">Bolt</span>
      <span class="badge rounded-pill border bg-transparent text-card">Pokémon</span>
    </div>
  </div>
  <a href="…" class="btn btn-outline-secondary btn-sm
       position-absolute top-100 start-50 translate-middle text-nowrap">Tovább olvasás</a>
</article>
```

### Layout
- **`card`** — BS kártya; arany border + sötét háttér a layout.css `.card` theme-ből, semmi extra class nem kell
- **`card-body d-flex flex-column gap-3`** — az elemek függőleges sorrendje, egységes 16px (gap-3) térközzel; nincs egyedi margin-játék
- **`ratio ratio-4x3`** — a kép képaránya BS-sel, fix pixel magasság helyett; reszponzív magától
- **`object-fit-cover rounded`** — kép kitöltés + lekerekítés BS utility-vel
- **Lelógó CTA** — tisztán BS position utility-k: `position-absolute top-100 start-50 translate-middle`
  - `top-100` → a gomb teteje a kártya aljára kerül
  - `start-50` + `translate-middle` → vízszintesen középre, és fel is tolja a saját magassága felével → **félig lóg le a kártya széléről**
  - működik, mert a BS `.card` alapból `position: relative` és nincs `overflow: hidden`
  - (a widgetben ez még custom `mg-chronicle-card__cta` transform — a template-ben már nem kell)

### Tipográfia
- **dátum:** sima `p text-muted` (16px Manrope) + `<strong>` a relatív dátumon ("ma")
- **cím:** `h3` — Playfair auto, nincs méret class (BS h3 ≈ 28px)
- **excerpt:** `p text-muted` — 16px Manrope, bézs

## 3. Cikk lista (jobb oldal)

```html
<div class="list-group list-group-flush">
  <a href="…" class="list-group-item list-group-item-action border-gold
       d-flex align-items-center gap-4 py-4">
    <div class="d-flex flex-column gap-2 flex-grow-1 min-w-0">
      <div>
        <p class="text-muted mb-1"><strong>3 napja</strong> | 2026. május 17.</p>
        <h4 class="fs-4 mb-0">Verseny beszámoló…</h4>
      </div>
      <div class="d-flex flex-wrap gap-2">…badge-ek…</div>
      <span class="small fw-medium text-gold">Olvasás <svg…></span>
    </div>
    <img src="…" width="169" height="150" class="rounded object-fit-cover flex-shrink-0">
  </a>
  …további sorok ugyanígy…
</div>
```

### Layout
- **`list-group list-group-flush`** — BS lista; a `flush` miatt csak az elemek KÖZÖTT van border → ez adja az elválasztó vonalakat, nem kell külön divider div
- **`list-group-item list-group-item-action`** — kattintható sor: hover háttér + fókusz state a BS-ből, a sötét theme a theme-bs.css-ben van (`--bs-list-group-*` változók)
- **`border-gold`** — az elválasztó arany színe (custom utility, lásd lent)
- **`d-flex align-items-center gap-4`** — szöveg balra, thumbnail jobbra, 24px térköz
- **`py-4`** — 24px függőleges padding; vízszintesen a BS default 16px item padding marad → a hover háttér nem ér hozzá a szöveg széléhez
- **`flex-grow-1 min-w-0`** — a szövegoszlop tölti a helyet; a `min-w-0` engedi a hosszú címek tördelését flexben
- **thumbnail:** `width="169" height="150"` **HTML attribútumokkal** + `object-fit-cover rounded flex-shrink-0` — nincs custom CSS a méretre

### Tipográfia
- **dátum:** `p text-muted mb-1` + `<strong>`
- **cím:** `h4 fs-4` — Playfair 20px (a h4 alapból 24px lenne, az fs-4 húzza 20-ra)
- **„Olvasás →":** `small fw-medium text-gold` + inline SVG nyíl `stroke="currentColor"`-ral (a szín a classból jön)

## 4. Badge-ek (pill)

| Jelentés | Class | Stílus |
|---|---|---|
| Bolt (kategória) | `badge rounded-pill text-bg-dark` | sötét kártya háttér + piros tint, **arany szöveg** |
| Klub (kategória) | `badge rounded-pill text-bg-primary` | **arany háttér**, fehér szöveg |
| Tag (Pokémon, Magic…) | `badge rounded-pill border bg-transparent text-card` | átlátszó, arany keret (a sima `border` utility már aranyat ad — lásd lent) |

- A `text-bg-primary` / `text-bg-dark` **BS standard selectorok, theme-ként átszabva** a `buttons.css`-ben (nem új class!) — primary = arany az egész designban (mint a btn-primary, ribbon arany)
- A theme a kereső „népszerű keresések" chipjeire is hat (`search-results.html`) — szándékosan, konzisztencia
- Outline badge-re nincs BS variáns → sima BS `border` utility (a default border szín arany a tokens.css-ből)

## 5. Szekció CTA

```html
<a href="#" class="btn btn-secondary">További hírek</a>
```
`btn-secondary` = arany filled gomb (buttons.css theme).

## Custom dolgok (indoklással)

| Mi | Hol | Miért nem BS |
|---|---|---|
| `.border-gold` utility | theme-bs.css | BS-ben nincs arany szín token (ugyanaz az indok, mint a meglévő `text-gold`-nál) |
| „Olvasás →" hover-reveal | chronicles.css (élesben) | BS-ben nincs hover-re megjelenő elem; a template-ben mindig látszik |
| Szekció keret (lecsapott sarkú „Krónikák" label, függőleges vonalak) | frame.css / chronicles.css | dekoratív frame komponens, nem része a template-nek |

> **Globális border theme:** a tokens.css átírja a `--bs-border-color` és `--bs-border-color-translucent` változókat `var(--color-border)`-re (**arany**), így a csupasz `border` utility és a BS komponens fallbackok (table, modal stb.) a theme arany keretszínét kapják a BS default szürke (#dee2e6) helyett. A halvány barna (`--color-border-muted`) csak explicit szabályokban él (inputok, naptár grid, list-group elválasztók).

## Backend (Wicket) bekötési pontok

A template-ben `<!-- BACKEND: -->` kommentek jelölik:
`section.title`, `section.description`, `section.cta_url`, `featured_article`, `articles` foreach, és cikkenként: `article.url`, `article.image` / `article.thumbnail`, `article.relative_date`, `article.date`, `article.title`, `article.excerpt`, `article.category`, `article.tags`.

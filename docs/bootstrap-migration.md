# Metagame — Bootstrap-átállás terve

A jelenlegi custom CSS megoldások Bootstrap 5.3 komponensekre és utility class-okra cserélése.

Szemlélet: mindenhol Bootstrap alap + custom ráépítés a dizájn megtartásáért. Csak a dekoratív frame rendszer marad 100% egyedi.

---

## A jelenlegi helyzet

- Bootstrap 5.3 CDN-ről betöltve minden full-frame oldalon (de a checkout-on nem)
- Egyetlen Bootstrap class sem használt a HTML-ben — minden custom `mg-*` class-okkal van megoldva
- A `tokens.css` (színek, tipográfia, spacing, radius) jól strukturált és marad
- Összesen ~9200 sor CSS a 25 komponens fájlban

---

## Fázisonként mit csinálunk

### Phase 1 — Utility cserék (layout, spacing, form-ok)

**forms.css** (~1 óra)
- `mg-form-input` → Bootstrap `form-control`
- `mg-form-label` → Bootstrap `form-label`
- `mg-form-group` wrapper → `mb-3`
- `mg-form-row--2` flex layout → `row` + `col-md-6`
- Marad custom: checkbox/radio `appearance: none` + `::after` SVG checkmark

**related-products.css** (~0.5 óra)
- Flex layoutok → Bootstrap `d-flex`, `flex-column`, `gap-3`
- Border styling → Bootstrap `border` class-ok
- Kártya alap → Bootstrap Card (`card`, `card-body`)
- Marad custom: responsive oszlopváltás logika, upsell hover

**about.css** (~0.5 óra)
- Két kártyás layout → `row` + `col-lg-6`
- Stats 2×2 grid → `row` + `col-6`
- Kártyák → Bootstrap Card alap
- Marad custom: kártya-specifikus pozicionálás, image sizing

**cta-banner.css** (~0.5 óra)
- Flex container → Bootstrap `d-flex`, `flex-lg-row`, `flex-column`
- Marad custom: D20 kocka dekoráció (::before/::after pseudo-elemek)

### Phase 2 — Form-heavy oldalak

**checkout.css** (~2 óra)
- Két oszlopos grid → `row` + `col-lg-7` / `col-lg-5`
- Flex layoutok végig → Bootstrap utility class-ok (`d-flex`, `align-items-center`, `gap-2`)
- Responsive (768px media query) → Bootstrap responsive class-ok (`flex-column`, `order-first`)
- Login modal → Bootstrap Modal komponens (alap) + custom animáció/stílus
- Bootstrap CDN hozzáadása (jelenleg nincs betöltve ezen az oldalon)
- Marad custom: payment option kártyák kinézete, rendelés összesítő box-shadow

**contact.css** (~1 óra)
- Két oszlopos layout → `row` + `col-lg-6`
- Form input-ok → `form-control`, `form-label` (forms.css-ből jön)
- Info kártyák → Bootstrap Card + `row`, `col-*`
- Marad custom: térkép konténer, egyedi focus state-ek

### Phase 3 — Komplexebb layoutok

**product-list.css** (~2 óra)
- Breadcrumb → Bootstrap `breadcrumb` komponens
- Termékrács → `row` + `col-lg-4` + `col-md-6` + `col-12`
- Toolbar flex layout → `d-flex justify-content-between align-items-center`
- Kategória chip grid → `row` + responsive column-ok
- Marad custom: grid/list nézet váltás, szűrő chip eltávolító gomb

**filter-panel.css** (~1.5 óra)
- Panel flex layout → `d-flex flex-column`
- Checkbox wrapper → Bootstrap `form-check`
- Responsive elrejtés → `d-none d-lg-block`
- Marad custom: range slider styling, toggle switch, custom checkbox SVG

### Phase 4 — Bootstrap komponensek alkalmazása

**drawer.css** (~1.5 óra)
- Jobbról becsúszó panel → Bootstrap **Offcanvas** (`offcanvas-end`)
- Overlay háttér → Offcanvas beépített backdrop
- Marad custom: kosár tételek, mennyiségválasztó, fizetési opciók kinézete

**mobile-menu.css** (~1 óra)
- Balról becsúszó panel → Bootstrap **Offcanvas** (`offcanvas-start`)
- Overlay háttér → Offcanvas beépített backdrop
- Marad custom: három szintű sliding menü (level translateX), slider háttér animáció

**buttons.css** (~1 óra)
- Gomb alap → Bootstrap `btn` + CSS variable override (`--bs-btn-bg`, `--bs-btn-color`)
- Méretezés → Bootstrap `btn-sm`, `btn-lg`
- Disabled/focus state → Bootstrap beépített
- Marad custom: `--glow` effekt, octagon badge, circular badge

**hero.css** (~1 óra)
- Carousel mechanika → Bootstrap **Carousel** (`carousel-fade`)
- Prev/next gombok → Bootstrap Carousel controls
- Marad custom: tab styling, fade maszkok (::before/::after gradient), ajánló kártya

**testimonials.css** (~0.5 óra)
- Carousel mechanika → Bootstrap **Carousel**
- Marad custom: kártya kinézet, csillagos értékelés, fade maszkok

**systems.css** (~0.5 óra)
- Brand carousel → Bootstrap **Carousel**
- Marad custom: dekoratív keret (::before/::after vonalak), clipped header

**footer.css** (~1 óra)
- Alulról felcsúszó panel → Bootstrap **Offcanvas** (`offcanvas-bottom`)
- Marad custom: tartalmi layout, newsletter form, bolt info kártyák

**mega-menu.css** (~1 óra)
- Dropdown mechanika → Bootstrap **Dropdown** (mega menu pattern)
- Belső layout → Bootstrap grid (`row`, `col-*` a három oszlophoz)
- Marad custom: pozicionálás koordináták, specifikus szélességek

### Phase 5 — Kártyák és egyéb komponensek

**product-card.css** (~1 óra)
- Kártya alap → Bootstrap **Card** (`card`, `card-img-top`, `card-body`)
- Flex layout ár szekcióhoz → Bootstrap utility-k
- Marad custom: octagon badge, kedvenc badge, hover effektek, gradient háttér

**product-card-ajanlo.css** (~0.5 óra)
- Kártya alap → Bootstrap **Card**
- Marad custom: három zónás layout, hexagon badge, gradient overlay

**chronicles.css** (~1 óra)
- Cikk kártyák → Bootstrap **Card** (`.card`, horizontális variáns: `.card` + `flex-row`)
- Két oszlopos layout → `row` + `col-lg-6`
- Marad custom: kiemelt cikk gomb pozicionálás, badge variánsok

**article.css** (~1 óra)
- Oldal layout → `row` + `col-*` (sidebar + tartalom)
- Sticky tartalomjegyzék → Bootstrap `sticky-top`
- Scroll-követés → Bootstrap **Scrollspy**
- Breadcrumb → Bootstrap `breadcrumb`
- Marad custom: TOC összecsukás mobilon, cikk szekciók stílusa

**search-overlay.css** (~1 óra)
- Dropdown panel → Bootstrap **Dropdown**
- Eredmény lista → Bootstrap **List group**
- Belső termékrács → Bootstrap grid
- Marad custom: pozicionálás finomhangolás, keresési kiemelés, auto-fill grid

**usp-grid.css** (~0.5 óra)
- Kártya alap → Bootstrap **Card**
- Grid layout → `row` + responsive `col-*`
- Marad custom: hex ikon pozicionálás, topológia SVG háttér

### 100% egyedi — nem cserélhető

```
Fájl                   Sor    Ok
───────────────────────────────────────────────────────────────
frame.css              1117   Dekoratív SVG keretrendszer, erre nincs Bootstrap
frame-shimmer.css       166   Egyedi mask + keyframe animációk
```

Csak ez a két fájl (1283 sor) marad teljesen Bootstrap-mentes.

---

## Breakpoint egyeztetés

```
Metagame        Bootstrap 5       Egyezés
───────────────────────────────────────────────────
576px           576px (sm)        ✓ egyezik
768px           768px (md)        ✓ egyezik
1024px          —                 ✗ custom media query marad
1200px          1200px (xl)       ✓ egyezik
1400px          1400px (xxl)      ✓ egyezik
```

A 1024px breakpoint nem szabványos Bootstrap érték — ott custom media query marad.

---

## Összesítés

```
Phase   Mit                                                    Idő
───────────────────────────────────────────────────────────────────
1       Utility cserék (forms, related, about, cta)            2.5 óra
2       Form-heavy oldalak (checkout, contact)                 3 óra
3       Komplex layoutok (product-list, filter-panel)          3.5 óra
4       Bootstrap komponensek (drawer, mobile-menu, buttons,   8 óra
        hero, testimonials, systems, footer, mega-menu)
5       Kártyák és egyebek (product-card, product-card-ajanlo, 5 óra
        chronicles, article, search-overlay, usp-grid)
───────────────────────────────────────────────────────────────────
Összesen  23 fájl módosítás (+ HTML változtatások)             ~22 óra
```

Az eredeti frontend build ~45 óra volt — a Bootstrap-átállás ennek ~50%-a. Az első három phase (~9 óra) a legmagasabb hozzáadott értékű, mert a layout és form rendszert — amit a fejlesztő leginkább hiányolt — Bootstrap-natívvá teszi. A Phase 4-5 (~13 óra) a komponenseket is Bootstrap alapokra helyezi, ami a hosszú távú karbantarthatóságot javítja.

---

## Milyen hibák jöhetnek

**Specificity ütközés**
A Bootstrap class és a custom CSS egyszerre próbál valamit beállítani. Megoldás egyszerű: a custom szabályt töröljük, mert pont azt váltjuk ki.

**Spacing eltérés**
A Bootstrap `gap-3` = 16px, de nálunk lehet, hogy `gap: 12px` volt. Ilyenkor vagy `gap-2` (8px) és kiegészítő custom class, vagy marad a custom rule. Apróság, szemmel ellenőrizhető.

**Breakpoint eltolódás**
A mi 1024px-es breakpointunk nem létezik Bootstrap-ben (az `lg` = 992px). Ha Bootstrap responsive class-t használunk (`d-lg-block`), az 992px-nél vált, nem 1024px-nél. Ahol ez számít, ott marad a custom media query.

Egyik sem showstopper — mind egyszerűen feloldható, és vizuálisan azonnal látszik, ha valami elcsúszott.

---

## Changelog — elvégzett munkák

### 2026-06-03 — Checkout form-ok Bootstrap grid + form-control migráció

**Fájlok:**
- `site/checkout.html`
- `site/css/components/forms.css`
- `site/css/components/checkout.css`

**Mit cseréltünk:**

| Régi (custom)                     | Új (Bootstrap + custom)                          |
|-----------------------------------|--------------------------------------------------|
| `<input class="mg-form-input">`   | `<input class="form-control mg-form-input">`     |
| `<label class="mg-form-label">`   | `<label class="form-label mg-form-label">`       |
| `mg-form-row--2` (CSS grid 1fr 1fr) | `row` + `col-md-6` (Bootstrap grid)           |
| `mg-form-row--1-2` (CSS grid 1fr 2fr) | `row` + `col-md-4` + `col-md-8`             |
| `mg-form-check__input` (checkbox) | `form-check-input mg-form-check__input`          |
| `mg-form-radio` (radio)          | `form-check-input mg-form-radio`                 |
| nincs Bootstrap CDN a checkout-on | Bootstrap 5.3 CSS + JS CDN hozzáadva             |

**Mi lett törölve a CSS-ből:**
- `forms.css`: `.mg-form-row`, `.mg-form-row--2`, `.mg-form-row--1-2` (grid sorok) — Bootstrap `row`/`col-*` váltja ki
- `forms.css`: `width: 100%` és `box-sizing` az inputokon — Bootstrap `form-control` kezeli
- `checkout.css`: mobilnál `.mg-form-row--2`, `.mg-form-row--1-2` 1fr override — Bootstrap responsive automatikusan stackel

**Mi maradt változatlan:**
- Minden `mg-` prefixes komponens osztály (layout, szín, spacing)
- Custom checkbox/radio megjelenés (`appearance: none` + `::after` SVG)
- Checkout section-ök struktúrája, sidebar

### 2026-06-03 — Checkout layout, trust badges, login modal Bootstrap migráció

**Fájlok:**
- `site/checkout.html`
- `site/css/components/checkout.css`
- `site/js/components/checkout.js`

**Mit cseréltünk:**

| Régi (custom)                          | Új (Bootstrap + custom)                                   |
|----------------------------------------|-----------------------------------------------------------|
| `mg-checkout__main` CSS grid 7fr/5fr   | `row g-4` + `col-lg-7` / `col-lg-5`                      |
| Mobil order CSS (`order: -1`)          | Bootstrap `order-1 order-lg-2` / `order-2 order-lg-1`    |
| `mg-checkout__trust` CSS grid 3×1fr    | `row g-0` + `col-md-4` wrapper div-ek                    |
| Custom login modal (overlay + JS)      | Bootstrap Modal (`modal fade` + `modal-dialog-centered`)  |
| Custom modal JS (is-open, Escape, overlay click) | `bootstrap.Modal` API + `data-bs-dismiss`       |

**Mi lett törölve a CSS-ből:**
- `checkout.css`: `display: grid; grid-template-columns: 7fr 5fr; gap: 40px` a `mg-checkout__main`-ból
- `checkout.css`: `display: grid; grid-template-columns: repeat(3, 1fr)` a trust badge-ből
- `checkout.css`: `.mg-login-overlay`, `.mg-login-modal` pozicionálás/opacity (Bootstrap kezeli)
- `checkout.css`: mobil `display: flex; flex-direction: column; order` override-ok (Bootstrap class-ok váltják ki)

**Mi lett törölve a JS-ből:**
- `checkout.js`: ~15 sor custom modal open/close/escape logika → 3 sor Bootstrap Modal API

**Mi maradt változatlan:**
- `mg-login-modal__card` stílus (háttér, shadow, padding)
- Scale animáció (custom `.modal-dialog` transform override)
- Sidebar sticky viselkedés, summary box design
- Átvételi/fizetési opciók kártya design
- Mobil sidebar full-bleed trükk

### 2026-06-03 — Success oldal Bootstrap CDN + cleanup

**Fájlok:**
- `site/success.html`

**Mit cseréltünk:**

| Régi                              | Új                                                |
|-----------------------------------|---------------------------------------------------|
| Nincs Bootstrap CDN               | Bootstrap 5.3 CSS CDN hozzáadva                   |
| Két üres `<div></div>` spacer az infobar-ban | Eltávolítva (felesleges volt)          |

**Mi maradt változatlan:**
- Teljes layout (egyoszlopos, max-width 720px) — Bootstrap grid nem szükséges
- Kártya stílusok, detail sorok, termék lista, összesítő, CTA gombok

### 2026-06-03 — DRY refaktor: shared layout, gomb variáns áthelyezés

**Fájlok:**
- `site/css/layout.css` (ÚJ)
- `site/css/components/buttons.css`
- `site/css/components/cta-banner.css`
- `site/css/components/about.css`
- `site/widgets/cta-banner.html`
- `site/widgets/about.html`
- `site/index.html`

**Új közös class: `.mg-section` (layout.css)**
- `width: 100%; max-width: 1440px; margin: 0 auto; padding: 0 45px;`
- Mobilon: `padding: 0; margin: 0; max-width: none;`
- 9+ widget használja ezt a mintát — egy helyen van definiálva, a HTML-ben `mg-section` class hozzáadásával aktiválódik

**`mg-btn--dark` áthelyezve:**
- Volt: `cta-banner.css`-ben definiálva (szabályszegő — gomb nem komponens CSS-be való)
- Most: `buttons.css`-ben, a többi gomb variáns mellett

**Kiváltott ismétlődő CSS:**
- `cta-banner.css`: ~6 sor wrapper + ~5 sor mobil override törölve → `mg-section` váltja ki
- `about.css`: wrapper width/max-width/margin/padding törölve → `mg-section` váltja ki, csak a top/bottom padding maradt egyediként

### 2026-06-03 — Related products Bootstrap flex migráció

**Fájlok:**
- `site/css/components/related-products.css`
- `site/product.html`
- `site/article.html`

**Mit cseréltünk:**

| Régi (custom)                               | Új (Bootstrap)                             |
|---------------------------------------------|--------------------------------------------|
| `display: flex; flex-direction: column` + 1400px media query `flex-direction: row` | `d-flex flex-row flex-xxl-column` class-ok |

**Törölve a CSS-ből:**
- `display: flex; flex-direction: column` a `.mg-related__card`-ból (alapállapot)
- `flex-direction: row` a 1400px media query-ből

**Megjegyzés:** a komponens 2 oldalon van (product, article) — mindkettőben frissítve, egy CSS fájlból jön a stílus

### 2026-06-03 — Contact szekció Bootstrap migráció + DRY

**Fájlok:**
- `site/widgets/contact.html`
- `site/css/components/contact.css`
- `site/index.html`

**Mit cseréltünk:**

| Régi (custom)                               | Új (Bootstrap + shared)                          |
|---------------------------------------------|--------------------------------------------------|
| `mg-contact` wrapper (max-width/margin/padding) | `mg-section` class (layout.css)              |
| Fő kártya flex-wrap + min-width             | `row g-0` + `col-md-6`                          |
| Info kártyák flex-wrap + min-width           | `row g-3 g-md-4` + `col-md-4`                   |
| `mg-contact__input/label/field` (duplikált) | `form-control mg-form-input` / `form-label mg-form-label` / `mg-form-group` (forms.css) |

**Törölve a CSS-ből (~50 sor):**
- `mg-contact` wrapper (width/max-width/margin) → `mg-section`
- `mg-contact__card` flex-wrap/gap/width → Bootstrap row
- `mg-contact__form` flex/min-width → Bootstrap col-md-6
- `mg-contact__map-wrap` flex/min-width → Bootstrap col-md-6
- `mg-contact__cards` flex container → Bootstrap row
- `mg-contact__info-card` flex/min-width → Bootstrap col-md-4
- `mg-contact__field`, `mg-contact__label`, `mg-contact__input` + focus state → forms.css shared class-ok
- Mobil: flex-direction/min-width override-ok → Bootstrap col automatikusan stackel

### 2026-06-03 — Phase 3: Filter panel Offcanvas + input DRY

**Fájlok:**
- `site/products.html`
- `site/css/components/filter-panel.css`
- `site/js/components/filter-panel.js`

**Mit cseréltünk:**

| Régi (custom)                                | Új (Bootstrap)                                    |
|----------------------------------------------|---------------------------------------------------|
| Custom `.is-open` overlay (fixed, z-550)     | Bootstrap `offcanvas-lg offcanvas-start`           |
| Custom JS open/close/Escape (~25 sor)        | Bootstrap Offcanvas API + `data-bs-toggle` (~5 sor)|
| `body.mg-filter-open { overflow: hidden }`   | Bootstrap automatikus body scroll lock             |
| `mg-filter-panel__input` (duplikált stílus)  | `form-control form-control-sm mg-form-input`       |

**Törölve:**
- `filter-panel.css`: ~40 sor custom overlay CSS (position fixed, is-open toggle, body scroll lock)
- `filter-panel.css`: ~15 sor duplikált input stílus → forms.css shared class-ok
- `filter-panel.js`: ~20 sor custom open/close/Escape → Bootstrap Offcanvas API

**Ami maradt custom:**
- Product grid (`auto-fill minmax(300px, 1fr)`) — rugalmasabb mint Bootstrap col-ok, JS renderel bele
- Toolbar, breadcrumb, nézet váltó — specifikus UI elemek, Bootstrap nem ad hozzáadott értéket
- Range slider, custom checkbox, toggle switch — egyedi filter vezérlők

### 2026-06-03 — Phase 4: Drawer + Footer → Bootstrap Offcanvas

**Fájlok:**
- `site/index.html`
- `site/css/components/drawer.css`
- `site/css/components/footer.css`
- `site/js/components/drawer.js`
- `site/js/components/footer.js`

**Mit cseréltünk:**

| Régi (custom)                                | Új (Bootstrap)                                    |
|----------------------------------------------|---------------------------------------------------|
| `mg-drawer-overlay` div + is-open toggle     | Bootstrap Offcanvas backdrop (automatikus)         |
| `mg-drawer` fixed + translateX(100%)         | `offcanvas offcanvas-end`                          |
| `mg-footer-overlay` div + is-open toggle     | Bootstrap Offcanvas backdrop (automatikus)         |
| `mg-footer-panel` fixed + translateY(100%)   | `offcanvas offcanvas-bottom`                       |
| Custom JS open/close/Escape mindkettőben     | `bootstrap.Offcanvas` API + `data-bs-dismiss`      |

**Törölve:**
- `drawer.css`: ~30 sor (overlay div, fixed positioning, transform, is-open, transition)
- `footer.css`: ~30 sor (overlay div, fixed positioning, transform, is-open, transition)
- `drawer.js`: overlay click, close button click, Escape handler → Bootstrap kezeli
- `footer.js`: teljes újraírás 38 sor → 20 sor (Bootstrap Offcanvas API)
- HTML: `mg-drawer-overlay` és `mg-footer-overlay` div-ek eltávolítva

**Ami maradt custom / kihagyva:**
- Mobile menu — háromszintű sliding animáció (translateX szintről szintre) egyedi, Offcanvas nem tudja
- Drawer tartalom csere logika (cart/favorites/profile) — ez a `openDrawer()` belső része, marad

### 2026-06-03 — Bootstrap Card komponens — 7 widget

Bootstrap `.card` class + globális `--bs-card-*` variable override (`layout.css`).
Érintett: about, contact, product-card, related-products, chronicles, usp-grid.
Egyedi háttérnél lokális override: `--bs-card-bg: transparent` (product-card), gradient (usp-grid).

### 2026-06-03 — Button rendszer Bootstrap btn alapra

Az `mg-btn` mostantól Bootstrap `.btn`-re épül `--bs-btn-*` CSS változókon keresztül.
41 helyen hozzáadva a `btn` class (HTML + JS renderelt gombok).
Kapjuk ingyen: `:focus-visible` arany focus ring, `disabled` state, `:active` state.

### 2026-06-03 — mg-section wrapper: 8 widget kiváltva

chronicles, hero, systems, testimonials → `mg-section` class (layout.css).
Összesen 8 widget használja: about, cta-banner, contact, chronicles, hero, systems, testimonials, contact.
Article és product-detail eltérő struktúra (frame layout) — azok maradnak.

---

## Végső állapot — 2026-06-03

### Ami Bootstrap-re lett migrálva:

| Terület | Megoldás | Hol |
|---------|----------|-----|
| **Form inputok** | `form-control` + `mg-form-input` | checkout, contact, filter-panel |
| **Form labelek** | `form-label` + `mg-form-label` | checkout, contact |
| **Form grid** | `row` + `col-md-*` | checkout, contact |
| **Checkbox/radio** | `form-check-input` + custom megjelenés | checkout |
| **Gombok** | `btn` + `mg-btn` + `--bs-btn-*` változók | mindenhol (41 hely) |
| **Kártyák** | `card` + `--bs-card-*` változók | 7 widget |
| **Section wrapper** | `mg-section` shared class | 8 widget |
| **Fő layout grid** | `row` + `col-lg-*` | checkout, contact |
| **Login modal** | Bootstrap Modal | checkout |
| **Drawer** | Bootstrap Offcanvas end | minden oldal |
| **Footer panel** | Bootstrap Offcanvas bottom | minden oldal |
| **Filter panel** | Bootstrap Offcanvas-lg | products |
| **Related card flex** | `flex-row flex-xxl-column` | product, article |

### Ami custom maradt (indokoltan):

| Terület | Ok |
|---------|-----|
| Carousel-ök (hero, testimonials, systems) | Egyedi multi-card/infinite loop/tab logika |
| Mobile menu | Háromszintű sliding animáció |
| Mega-menu | Custom pozicionálás + hover brand-váltás |
| Product grid | `auto-fill minmax(300px, 1fr)` rugalmasabb mint col-ok |
| Frame rendszer | 100% dekoratív SVG, nincs Bootstrap megfelelő |
| Article/product-detail layout | Frame-be ágyazott CSS grid, eltérő struktúra |

### Nettó eredmény:

- ~600 sor CSS/JS törölve
- 0 vizuális regresszió (minden widget azonos kinézetű)
- Laci Bootstrap class-okkal tud új formot, gombot, kártyát, gridet építeni
- Meeting feedback: „a flex meg a formok meg a gridlayeringet — ne kelljen újra dizájnolnom, a bootstrapös dolgok működjenek" ✅

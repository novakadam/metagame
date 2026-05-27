# Metagame.hu — Frontend prototípus összefoglaló

> Készült: 2026-05-27 | Célközönség: fejlesztő (Laci) meeting

---

## 1. Elkészült oldalak (7 db, statikus HTML)

| Oldal | Fájl | Tartalom |
|---|---|---|
| **Főoldal** | `index.html` | Hero szekció, USP grid ("Ezért választanak minket"), About kártyák, Testimonials slider, CTA banner |
| **Terméklista** | `products.html` | Szűrőpanel (bal oldal), termékkártya grid, rendezés, szűrő badge-ek |
| **Termékoldal** | `product.html` | Galéria (thumbnail+fő kép), info panel, accordion (leírás/jellemzők), kapcsolódó termékek |
| **Cikk/blog** | `article.html` | Cikk tartalom layout |
| **Pénztár** | `checkout.html` | Checkout form, rendelés összesítő |
| **Sikeres rendelés** | `success.html` | Visszaigazoló oldal |
| **Mobil előnézet** | `mobile-preview.html` | Mobil keret tesztelő |

---

## 2. Projekt struktúra

```
Metagame/
├── assets/                    ← Közös képek, SVG-k
│   ├── brands/                  Logo-k
│   ├── frame/                   Keret SVG-k (desktop + mobile)
│   └── images/                  Termékképek, ikonok
├── docs/                      ← Dokumentáció
├── site/
│   ├── assets → ../assets       ← Symlink (fontos Vercelhez!)
│   ├── css/
│   │   ├── tokens.css           ← Globális design tokenek (színek, fontok, spacing)
│   │   └── components/          ← 25 db BEM-alapú komponens CSS
│   ├── js/
│   │   ├── main.js              ← Központi inicializáló
│   │   └── components/          ← 15 db JS komponens
│   └── *.html                   ← Az oldalak
```

---

## 3. Git branch-ek

| Branch | Státusz | Leírás |
|---|---|---|
| `main` | Éles | Vercel-re deploy-ol automatikusan |
| `dev` | Fejlesztés | Szinkronban a main-nel jelenleg |
| `mobile` | Lezárt | Mobil keret (merge-ölve main + dev-be) |
| `color` | Kísérleti | Sötétlila paletta teszt (lokális, nincs push-olva) |

---

## 4. Technikai megoldások

### 4.1 Keret rendszer (frame.css)

A teljes oldalt egy SVG-alapú arany keret veszi körül, ami **nem dekoráció, hanem szerkezeti elem**: a navigáció, logó, topbar és footer mind a keret részeként pozícionáltak (`position: fixed`). A keret 4 sarokból + 4 vonalból áll, és a tartalom (`mg-content`) a bal nav szélességétől függ.

### 4.2 Breakpoint architektúra (4 lépcsős)

```
1440px+    Desktop: teljes keret, 255px széles bal nav feliratokkal
1400px     Köztes: kompakt M logó, 70px ikon-only nav, keret zsugorítás
1024px     Mobil: teljes keretváltás (desktop → mobil frame), alsó menüsáv
768px      Telefon: kisebb ikonok, egyoszlopos layout
```

A **1400px breakpoint** az, ahol a legtöbb adaptáció történik:

- **Logócsere**: két `<img>` elem (`mg-logo--full` + `mg-logo--compact`), CSS `display: none/block` váltás
- **Nav ikonok**: `transform: scale()` **helyett** tényleges méretcsökkentés + százalékos `clip-path` (a transform stacking context problémát okozott a z-index-szel)
- **Keret sarkok**: `overflow: hidden` + fix méretű belső img (nem resize, hanem clip — megtartja az SVG arányokat)

### 4.3 CSS Custom Properties theming (tokens.css)

Az **egész oldal színvilága ~12 CSS változóból áll** — a `color` branch-en egyetlen fájl módosításával teljesen más hangulatot kaptunk. A backend/CMS-ből érkező theme-ek is így kezelhetők lesznek.

```css
--color-bg:          #40022C;
--color-bg-card:     #720A2B;
--color-bg-muted:    #5A0E3A;
--color-gold:        #B38A24;
--color-text:        #F4F0DD;
/* ... stb. */
```

### 4.4 BEM naming + widget-alapú architektúra

Minden komponens önálló CSS + JS fájl, `mg-` prefix-szel, BEM konvenció:

- `.mg-hero`, `.mg-hero__title`, `.mg-hero__left`
- `.mg-usp-card`, `.mg-usp-card__icon`, `.mg-usp-card__body`

A JS-ben `main.js` inicializálja az összes komponenst, amelyek saját fájlból importálódnak.

### 4.5 Gombok/badge-ek közös rendszere (buttons.css)

Minden gomb és badge stílus **egyetlen központi CSS fájlban** van — a komponensek soha nem definiálnak saját gomb stílust. Osztályok: `.mg-btn`, `.mg-btn--gold`, `.mg-badge`, stb.

### 4.6 Mobil keret (display: contents trükk)

Mobilon a DOM sorrendet `display: contents`-szel oldjuk meg: a wrapper "eltűnik" a layout-ból, és a gyerekek a szülő grid/flex-ében újrarendeződnek `order` property-vel. Ez fontos, mert a hero, szűrő, stb. más sorrendben jelenik meg mobilon.

### 4.7 Mega menü

A bal oldali nav hover-re mega menüt nyit (`mg-megamenu`), ami a keret fölé pozícionálódik. Az 1400px breakpoint-nál újrapozícionálódik a keskenyebb nav-hoz igazodva.

### 4.8 Search overlay

A topbar keresőmezőből nyílik dropdown (`mg-search-overlay`), Luigi's Box-szerű UX-szel. Z-index: `--z-overlay: 300` szinten a keret fölött.

---

## 5. Vercel deploy

- **URL**: Vercel-en fut, GitHub remote-ról automatikus deploy
- **Fontos**: a `site/assets` egy **symlink** (`→ ../assets`), amit git-ben explicit hozzá kellett adni, különben a Vercel builden nem látszanak a képek
- A deploy a `main` branch-ről megy

---

## 6. Amire figyelni kell fejlesztésnél

- A `frame.css` a legérzékenyebb fájl — a keret pozícionálás és z-index rétegek bonyolultak, ha bármit módosítana, érdemes az összes breakpoint-on tesztelni
- A `clip-path` polygon értékek kézzel vannak finomhangolva a diamond nav elemekhez — ne transform-mal méretezze, hanem az elemméret + clip-path együtt változzon
- A `tokens.css` színeket módosítva az egész oldal színezése változik — ez a tervezett theming alap
- A `site/assets` symlink-et ne törölje, és ha asset-eket ad hozzá, az `assets/` gyökérkönyvtárba tegye

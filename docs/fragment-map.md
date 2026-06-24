# Metagame — Fragment térkép

Az oldalak közös és egyedi blokkjainak lebontása, a szerver oldali template hierarchia kialakításához.

---

## Oldalak áttekintése

```
Oldal              Fájl             Leírás
─────────────────────────────────────────────────────────────
Homepage           index.html       Főoldal, widget-alapú tartalom
Terméklista        products.html    Kategória/szűrés, termékrács
Termék részletek   product.html     Egyedi termékoldal
Cikk               article.html     Blog/krónika oldal
Checkout           checkout.html    Pénztár (egyszerűsített keret)
Siker              success.html     Rendelés visszaigazolás (egyszerűsített keret)
```

---

## Közös blokkok (fragmentek)

### 1. Teljes keret ("Full Frame") — Használja: Homepage, Terméklista, Termék, Cikk

Ezek az oldalak azonos keretben jelennek meg:

```
┌─────────────────────────────────────────────────────────┐
│  FRAME (dekoratív sarkok + vonalak, SVG)                │
│  ┌───────────────────────────────────────────────────┐  │
│  │  TOPBAR                                           │  │
│  │  Logo | Shop/Community toggle | Keresőmező        │  │
│  ├───────┬───────────────────────────────────┬───────┤  │
│  │ LEFT  │                                   │ RIGHT │  │
│  │ NAV   │       OLDAL-SPECIFIKUS            │ NAV   │  │
│  │       │         TARTALOM                  │       │  │
│  │ Kat.  │                                   │ Profil│  │
│  │ + comm│                                   │ Kedv. │  │
│  │       │                                   │ Kosár │  │
│  │       │                                   │ Értés.│  │
│  │       │                                   │ Hely  │  │
│  │       │                                   │ Tel.  │  │
│  ├───────┴───────────────────────────────────┴───────┤  │
│  │  FOOTER (kompakt: copyright + 2 bolt + linkek)    │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  MEGA MENU (rejtett, topbar-ból nyílik, full-width)     │
│  KERESŐ OVERLAY (rejtett, keresőmezőből nyílik)         │
│  DRAWER PANEL (rejtett, jobb oldali slide-in)           │
│  MOBIL MENÜ (rejtett, hamburgerből nyílik)              │
└─────────────────────────────────────────────────────────┘
```

**Alkotó elemek:**
- **Frame:** dekoratív SVG sarkok és vonalak (frame.css, frame.js, frame-shimmer.js)
- **Topbar:** logó, shop/community toggle, keresőmező (mega-menu.css, mega-menu.js)
- **Bal navigáció:** termékkategóriák (jelenleg 8 + közösségi szekció, bővíthető) animált ikonokkal
- **Jobb navigáció:** profil, kedvencek, kosár (badge), értesítések (badge), helyszín, telefon
- **Mega menu:** full-width dropdown a topbar alatt, kategória tartalom (mega-menu.css, mega-menu.js)
- **Footer:** kompakt sáv copyright + 2 bolt + linkek (footer.css, footer.js)
- **Mobil elemek:** hamburger, mobil kereső, alsó ikonsor (mobile-menu.css, mobile-menu.js)
- **Overlay-ek:** kereső overlay, drawer panel, mobil menü (rejtett állapotban mindig jelen vannak)

### 2. Egyszerűsített keret ("Simplified Frame") — Használja: Checkout, Siker

```
┌─────────────────────────────────────────────────────────┐
│  SARKOK + VONALAK (csak felső/alsó)                     │
│  ┌───────────────────────────────────────────────────┐  │
│  │  EGYSZERŰ HEADER (csak logó)                      │  │
│  │  INFO SÁV (vissza link | időzítő | biztonság)     │  │
│  ├───────────────────────────────────────────────────┤  │
│  │                                                   │  │
│  │           OLDAL-SPECIFIKUS TARTALOM               │  │
│  │                                                   │  │
│  ├───────────────────────────────────────────────────┤  │
│  │  EGYSZERŰ FOOTER (copyright + linkek)             │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

**Nincs:** bal nav, jobb nav, mega menu, hamburger, mobil alsó sáv, kereső, drawer

### 3. Kereső overlay — Használja: Homepage, Terméklista, Termék, Cikk

- `widgets/search-overlay.html` — külön HTML fragment (közös widget fájl)
- Homepage: `main.js` tölti be
- Többi oldal: jQuery `.load()` hívással

### 4. Kapcsolódó termékek oldalsáv — Használja: Termék, Cikk

- "Ezeket is ajánljuk" kártya + upsell lista (3 elem)
- CSS: `related-products.css`
- **Jelenleg nem közös widget** — mindkét oldalon inline duplikálva van (eltérő dummy tartalommal, de azonos struktúrával). Érdemes lenne közös fragmentként kiszervezni.

### 5. Breadcrumb navigáció — Használja: Terméklista, Termék, Cikk

- Kategória > Alkategória > Elem útvonal
- **Jelenleg nem közös widget** — mindhárom oldalon inline van, ráadásul eltérő class nevekkel (`mg-product__breadcrumb`, `mg-article__breadcrumb`, `mg-product-breadcrumb`). Érdemes egységesíteni.

---

## Kód megosztás jelenlegi állapota

Az alábbi elemek **duplikálva vannak** minden oldalban (nem közös fájlból jönnek):

- Frame (sarkok, vonalak) — copy-paste minden full-frame HTML-ben
- Topbar (logó, toggle, kereső) — copy-paste
- Bal navigáció — copy-paste
- Jobb navigáció — copy-paste
- Footer — copy-paste
- Mobil UI (hamburger, alsó sáv) — copy-paste
- Mega menu konténer — copy-paste
- Drawer konténer — copy-paste
- Kapcsolódó termékek oldalsáv — copy-paste (product.html, article.html)
- Breadcrumb — copy-paste, eltérő class nevekkel

**Közös fájlból jön** (widget):

- Kereső overlay → `widgets/search-overlay.html`
- Homepage widgetek → `widgets/*.html` (hero, systems, usp-grid, chronicles, testimonials, about, cta-banner, contact)

A szerver oldali template-elésnél (Thymeleaf) ezek a duplikált részek természetesen közös fragment-ekké válnak — a fenti térkép pontosan mutatja, melyik blokk melyik oldalra kell.

---

## Oldalspecifikus tartalom

### Homepage (`index.html`)

**Egyedi elemek:**
- Ticker/hírszalag (scrolling)
- Bővített footer panel (features, hírlevél, bolt infók — csak homepage-en)

**Widgetek (JS-sel betöltve a `main.js` által):**

```
  Widget              Fájl                       Saját JS
─────────────────────────────────────────────────────────────
1 Hero carousel       widgets/hero.html          hero.js
2 Systems             widgets/systems.html       systems.js
3 USP grid            widgets/usp-grid.html      —
4 Krónikák            widgets/chronicles.html    —
5 Vélemények          widgets/testimonials.html  testimonials.js
6 Rólunk              widgets/about.html         —
7 CTA banner          widgets/cta-banner.html    —
8 Kapcsolat + térkép  widgets/contact.html       contact.js + Leaflet
```

### Terméklista (`products.html`)

**Egyedi elemek:**
- Kategória cím + leírás + al-chipek
- Szűrőpanel (bal oldalt):
  - Ár csúszka + preset gombok
  - Márka szűrők (checkbox)
  - Terméktípus szűrők (checkbox)
  - Státusz chipek (Raktáron, Előrendelhető, stb.)
  - Szett dropdown
  - Nyelv dropdown
  - Foil toggle
  - Kiadási év
  - "Szűrők alkalmazása" gomb
- Terméklista terület:
  - Eszközsáv (szűrő gomb, darabszám, aktív szűrők, rendezés)
  - Nézet váltó (rács/lista)
  - Gyorsszűrő gombok
  - Termékrács (JS-sel töltve)
  - "Több betöltése" gomb

### Termék részletek (`product.html`)

**Egyedi elemek:**
- Bal: Képgaléria (fő kép + thumbnailek) + Accordion (3 szekció)
- Közép (Info panel):
  - Badge + márka + terméknév
  - Ár (aktuális, eredeti, kedvezmény %)
  - Készletjelzők (Online, Bolt, Klub)
  - Termékvariánsok (thumbnail váltó)
  - Mennyiségválasztó + Kosárba gomb + Kedvencek
  - Leírás + Előnyök lista
- Jobb: Kapcsolódó termékek (közös fragment, ld. fent)

### Cikk (`article.html`)

**Egyedi elemek:**
- Bal oldalsáv: Tartalomjegyzék (sticky, összecsukható mobilon)
- Középső tartalom:
  - Cím + alcím
  - Metaadatok (szerző, olvasási idő, dátum)
  - Kiemelt kép
  - Cikk szekciók (h2/h3 ID-kkal a TOC-hoz)
  - Képek feliratokkal
  - Előző/Következő cikk navigáció
- Jobb oldalsáv: Kapcsolódó termékek (közös fragment, ld. fent)

### Checkout (`checkout.html`)

**Egyedi elemek:**
- Bal oszlop (űrlapok):
  1. Vásárló adatok (név, email, telefon)
  2. Céges vásárlás (feltételes, checkbox-ra jelenik meg)
  3. Fiók létrehozás (feltételes, checkbox-ra jelenik meg)
  4. Szállítási mód (3 opció, feltételes címmezők)
  5. Fizetési mód (kártya, utánvét, Apple/Google Pay)
  6. Trust badge-ek
- Jobb oszlop: Rendelés összesítő + Fizetés gomb
- Login modal (rejtett, link-re aktiválódik)

### Siker (`success.html`)

**Egyedi elemek:**
- Siker ikon + visszaigazolás szöveg
- Rendelési adatok kártya (szám, email, fizetés, szállítás)
- Átvételi információ kártya (bolt, cím, nyitvatartás)
- Rendelés összesítő (tételek, végösszeg)
- CTA gombok (Rendelés részletei, Tovább vásárlás, Újdonságok)

---

## Fragment mátrix

Melyik blokk melyik oldalon jelenik meg:

```
Fragment                          Home   Lista  Termék  Cikk   Check  Siker
─────────────────────────────────────────────────────────────────────────────
KERET
  Dekoratív frame (teljes)         ✓      ✓      ✓       ✓      —      —
  Dekoratív frame (egyszerű)       —      —      —       —      ✓      ✓

NAVIGÁCIÓ
  Topbar (teljes)                  ✓      ✓      ✓       ✓      —      —
  Header (csak logó)               —      —      —       —      ✓      ✓
  Bal navigáció                    ✓      ✓      ✓       ✓      —      —
  Jobb navigáció                   ✓      ✓      ✓       ✓      —      —
  Mega menu                       ✓      ✓      ✓       ✓      —      —
  Breadcrumb                       —      ✓      ✓       ✓      —      —

FOOTER
  Footer (kompakt)                 ✓      ✓      ✓       ✓      —      —
  Footer (egyszerű)                —      —      —       —      ✓      ✓
  Footer (bővített panel)          ✓      —      —       —      —      —

MOBIL
  Hamburger + alsó sáv             ✓      ✓      ✓       ✓      —      —
  Mobil kereső                     ✓      ✓      ✓       ✓      —      —

OVERLAY-EK
  Kereső overlay                   ✓      ✓      ✓       ✓      —      —
  Drawer panel                     ✓      ✓      ✓       ✓      —      —
  Mobil menü                       ✓      ✓      ✓       ✓      —      —

OLDAL-SPECIFIKUS
  Ticker/hírszalag                 ✓      —      —       —      —      —
  Homepage widgetek (8 db)         ✓      —      —       —      —      —
  Szűrőpanel                       —      ✓      —       —      —      —
  Termékrács + toolbar             —      ✓      —       —      —      —
  Képgaléria                       —      —      ✓       —      —      —
  Info panel + kosár               —      —      ✓       —      —      —
  Accordion                        —      —      ✓       —      —      —
  Kapcsolódó termékek              —      —      ✓       ✓      —      —
  Tartalomjegyzék (sticky)         —      —      —       ✓      —      —
  Cikk tartalom                    —      —      —       ✓      —      —
  Checkout űrlapok                 —      —      —       —      ✓      —
  Login modal                      —      —      —       —      ✓      —
  Rendelés összesítő               —      —      —       —      ✓      ✓
  Siker visszaigazolás             —      —      —       —      —      ✓
```

---

## Közös ős javaslat (template hierarchia)

```
base.html
├── full-frame.html  (Homepage, Terméklista, Termék, Cikk)
│   ├── frame (sarkok, vonalak)
│   ├── topbar
│   ├── bal nav
│   ├── jobb nav
│   ├── mega menu
│   ├── footer (kompakt)
│   ├── mobil UI (hamburger, alsó sáv, mobil kereső)
│   ├── kereső overlay
│   ├── drawer
│   └── mobil menü
│
├── simple-frame.html  (Checkout, Siker)
│   ├── frame (egyszerű sarkok)
│   ├── logó header
│   └── egyszerű footer
│
└── [oldal-specifikus tartalom slot]
```

A `full-frame.html` fogja az oldalak ~80%-át. Innen 4 oldal származik, mindegyik csak a középső tartalmat cseréli ki.

A `simple-frame.html` a checkout flow-hoz — szándékosan lecsupaszított, hogy a vásárlóra fókuszáljon.

---

## CSS fájlok

```
Fájl                     Típus            Használja
─────────────────────────────────────────────────────────────
tokens.css               Design rendszer  Minden oldal
buttons.css              Komponens        Minden oldal
frame.css                Keret            Full frame oldalak
frame-shimmer.css        Keret            Full frame oldalak
mega-menu.css            Navigáció        Full frame oldalak
mobile-menu.css          Navigáció        Full frame oldalak
drawer.css               Overlay          Full frame oldalak
footer.css               Layout           Full frame oldalak
search-overlay.css       Overlay          Full frame oldalak
hero.css                 Widget           Homepage
systems.css              Widget           Homepage
usp-grid.css             Widget           Homepage
chronicles.css           Widget           Homepage
testimonials.css         Widget           Homepage
about.css                Widget           Homepage
cta-banner.css           Widget           Homepage
contact.css              Widget           Homepage
product-card.css         Komponens        Terméklista
product-card-ajanlo.css  Komponens        Homepage
product-list.css         Layout           Terméklista
filter-panel.css         Komponens        Terméklista
product-detail.css       Layout           Termék
related-products.css     Komponens        Termék, Cikk
article.css              Layout           Cikk
forms.css                Komponens        Checkout
checkout.css             Layout           Checkout, Siker
```

## JS fájlok

```
Fájl                Típus          Használja
─────────────────────────────────────────────────────────────
main.js             Widget loader  Homepage
frame.js            Keret          Full frame oldalak
frame-shimmer.js    Keret          Full frame oldalak
mega-menu.js        Navigáció      Full frame oldalak
mobile-menu.js      Navigáció      Full frame oldalak
drawer.js           Overlay        Full frame oldalak
footer.js           Layout         Full frame oldalak
search-overlay.js   Overlay        Full frame oldalak
hero.js             Widget         Homepage
systems.js          Widget         Homepage
testimonials.js     Widget         Homepage
contact.js          Widget         Homepage
product-list.js     Terméklista    Terméklista
filter-panel.js     Szűrő          Terméklista
product-detail.js   Termékoldal    Termék
checkout.js         Checkout       Checkout
```

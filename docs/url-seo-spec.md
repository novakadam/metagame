# URL- és SEO meta tag spec — metagames.hu

Cél: a fejlesztőnek (Wicket) átadható, egyértelmű spec arról, hogy oldaltípusonként
milyen URL-minta, `<title>`, `meta description`, Open Graph és structured data tartozik.

**Felelősség-megosztás**
- **Design/tartalom (én adom):** URL-konvenció, title/description sablonok, OG-kép.
- **Fejlesztő (Wicket):** route-olás, slug-generálás, redirectek, canonical, JSON-LD implementáció.
- **Egyeztetni:** JSON-LD mezőlista oldaltípusonként (lent megadom a javaslatot).

---

## 0. Globális szabályok

### URL-konvenció
- Csak **kisbetű**, szavak között **kötőjel** (`-`), aláhúzás soha.
- **Ékezetek slug-osítva:** `á→a, é→e, í→i, ó/ö/ő→o, ú/ü/ű→u` (a látható szövegben ékezet marad, az URL-ben nem).
- Stopszavak (a, az, és, of…) elhagyhatók a tisztább slug érdekében.
- A slug **stabil**: ha egy termék/cikk neve változik, a régi URL **301 redirect**tel mutasson az újra (fejlesztői feladat).
- ID a slugban: terméknél/eseménynél **igen** (`/jatekok/1234-catan`), mert garantáltan egyedi és átnevezésnél is stabil. Cikknél elég a tiszta slug.
- Trailing slash: **nincs** (`/jatekok` és nem `/jatekok/`), egységesen.

### Minden oldal `<head>`-jébe (közös)
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>…</title>
<meta name="description" content="…">
<link rel="canonical" href="https://metagames.hu/…">

<!-- Open Graph -->
<meta property="og:type" content="website"><!-- típusonként eltér, lásd lent -->
<meta property="og:site_name" content="Metagames">
<meta property="og:locale" content="hu_HU">
<meta property="og:title" content="…">
<meta property="og:description" content="…">
<meta property="og:url" content="https://metagames.hu/…">
<meta property="og:image" content="https://metagames.hu/…/og.jpg">

<!-- Twitter/X -->
<meta name="twitter:card" content="summary_large_image">
```

### Title / description hossz
- `<title>`: **max ~60 karakter** (különben levágja a Google).
- `meta description`: **120–160 karakter**, egyedi oldalanként, ne ismételje a title-t.
- Brand a title végén: ` | Metagames` (kötőjel helyett pipe, egységesen).

### OG-kép (az én asztalom — vizuális asset)
- Méret: **1200 × 630 px**, JPG/PNG, < 300 KB.
- Sablonok, amiket tervezek:
  - **Default brand OG** (kezdőlap, listák, általános) — logó + claim sötét/arany brand háttéren.
  - **Termék OG** — termékkép + terméknév + logó (dinamikusan generálható, vagy a termék fő képe + overlay).
  - **Esemény OG** — esemény borítókép + cím + dátum + helyszín.
- Ha nincs egyedi kép → fallback a default brand OG-ra.

---

## 1. Kezdőlap — `index.html`

| Mező | Érték |
|---|---|
| URL | `https://metagames.hu/` |
| og:type | `website` |
| title | `Metagames – társasjáték és TCG webshop és játékklub` |
| description | `Társasjátékok, kártyajátékok (Magic, Pokémon, Riftbound) és rendszeres játékklub egy helyen. Nézd meg kínálatunkat és eseménynaptárunkat.` |
| og:image | Default brand OG |
| JSON-LD | `Organization` + `WebSite` (utóbbi `SearchAction`-nel a kereséshez) |

---

## 2. Terméklista / Shop — `products.html`

| Mező | Érték |
|---|---|
| URL | `/jatekok` (kategória: `/jatekok/{kategoria-slug}`, pl. `/jatekok/magic-the-gathering`) |
| og:type | `website` |
| title | `Társasjátékok és kártyajátékok | Metagames` — kategóriánál: `{Kategórianév} | Metagames` |
| description | `Böngészd a Metagames teljes kínálatát: társasjátékok, TCG-k és kiegészítők. {Kategórianál: a kategória rövid leírása.}` |
| og:image | Default brand OG (vagy kategória-OG, ha lesz) |
| JSON-LD | `BreadcrumbList`; opcionálisan `ItemList` a látható termékekkel |

**Szűrők/lapozás URL-kezelése (egyeztetni a fejlesztővel):**
- Szűrők query paraméterben: `/jatekok?rendszer=magic&ar=0-5000`.
- A szűrt nézetek **canonical**-ja a tiszta kategória-URL legyen (duplikáció elkerülése), vagy `robots: noindex` a szűrt kombinációkra.
- A „LOAD MORE" (nem lapozó!) miatt nincs `?page=`; ha SEO-ból kell, megbeszéljük.

---

## 3. Termék részlet — `product.html`

| Mező | Érték |
|---|---|
| URL | `/jatekok/{id}-{termeknev-slug}` — pl. `/jatekok/1234-riftbound-set-one-booster-display` |
| og:type | `product` |
| title | `{Terméknév} – {Rendszer/Kategória} | Metagames` (ha túl hosszú, a rendszer elhagyható) |
| description | `{Terméknév} a Metagames kínálatában. {Rövid termékleírás 1 mondat.} Ár: {ár} Ft. Rendeld meg online.` |
| og:image | A termék fő képe (1200×630-ra vágva), fallback termék-OG sablon |
| JSON-LD | `Product` (lásd lent) |

**JSON-LD `Product` mezők (ezt egyeztesd a fejlesztővel — ő tölti adatból):**
- `name`, `image`, `description`, `sku`, `brand`
- `offers`: `price`, `priceCurrency: "HUF"`, `availability` (InStock / OutOfStock), `url`
- opcionális: `aggregateRating`, ha lesz értékelés

Példa title (a meglévő product.html alapján):
`Riftbound: League of Legends TCG – Set One Booster Display | Metagames`

---

## 4. Eseménynaptár — `events.html`

| Mező | Érték |
|---|---|
| URL | `/esemenyek` |
| og:type | `website` |
| title | `Eseménynaptár – játékklub és versenyek | Metagames` |
| description | `Nézd meg a Metagames közelgő eseményeit: játékklub-napok, versenyek és nevezés. Havi, heti és lista nézet.` |
| og:image | Default brand OG |
| JSON-LD | `BreadcrumbList` |

---

## 5. Esemény részlet — `event-detail.html`

| Mező | Érték |
|---|---|
| URL | `/esemenyek/{id}-{esemeny-slug}` — pl. `/esemenyek/567-pokemon-klubnap` (vagy dátummal: `/esemenyek/2026-06-20-pokemon-klubnap`) |
| og:type | `article` (eseményhez nincs natív OG type, az `article` a bevett) |
| title | `{Esemény neve} – {dátum} | Metagames` |
| description | `{Esemény neve} {dátum}, {helyszín}. {Rövid leírás / nevezési infó.}` |
| og:image | Esemény borítókép, fallback esemény-OG sablon |
| JSON-LD | `Event` (lásd lent) — **ez kifejezetten ajánlott**, mert a Google esemény-rich-resultöt ad |

**JSON-LD `Event` mezők (egyeztetni — adatból tölti a fejlesztő):**
- `name`, `startDate`, `endDate`, `eventStatus`, `eventAttendanceMode`
- `location` (`Place` → `name`, `address`)
- `image`, `description`
- `offers` ha van nevezési díj (`price`, `priceCurrency: "HUF"`, `url`, `availability`)
- `organizer` (Metagames)

---

## 6. Cikk / Krónika — `article.html`

| Mező | Érték |
|---|---|
| URL | `/cikkek/{cikk-slug}` (ID nélkül elég, ha a slug egyedi) |
| og:type | `article` |
| title | `{Cikk címe} | Metagames` |
| description | `{Lead / első bekezdés első ~155 karaktere, vagy kézzel írt összefoglaló.}` |
| og:image | Cikk borítókép, fallback default brand OG |
| JSON-LD | `Article` → `headline`, `image`, `datePublished`, `dateModified`, `author`, `publisher` |
| Extra OG | `article:published_time`, `article:modified_time` |

---

## 7. Tranzakciós / privát oldalak — `checkout.html`, `success.html`, kosár

| Mező | Érték |
|---|---|
| URL | `/penztar`, `/sikeres-rendeles` |
| robots | **`<meta name="robots" content="noindex, nofollow">`** |
| OG/JSON-LD | nem szükséges |

Ezek **ne** indexelődjenek — fejlesztői beállítás.

---

## Összefoglaló átadáshoz (fejlesztőnek)

1. URL-konvenciók a 0. és oldaltípus-szekciók szerint; slug-osítás + 301 redirect átnevezéskor a te dolgod.
2. A title/description sablonokat és az OG-képeket én adom (az OG-kép sablonokat Figmából exportálom).
3. `canonical`, `robots`, OG/Twitter tag-ek és a JSON-LD implementáció a tiéd — a JSON-LD mezőlistát fent megadtam, ezt egyeztessük át, hogy minden adat elérhető-e a backendből.
4. Tranzakciós oldalak: `noindex`.

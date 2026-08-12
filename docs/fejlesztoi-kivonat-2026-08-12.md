# Frontend változás-kivonat — 2026. 08. 12.

*A délelőtti heti meeting döntései alapján, aznap élesítve.
Commitok a `bootstrap`/`main` branchen: `9afa492` … `HEAD`.*

## 1. Termékkártya — cím-blokk egységes magasság

- A `.mg-product-card__info` **fix 126px magas flex-oszlop** lett, középre
  zárt sorokkal (`justify-content: center`, `gap: 4px`)
- Rövid (1 soros) címnél a maradék hely felül-alul oszlik el — a cím és a
  kiszerelés között marad a normál hézag
- **Az ár feletti vonal így minden kártyán azonos magasságban fut** (a
  meetingen kért „belső fixálás")
- Lista nézetben a fix magasság/flex visszavonva (`display:block; height:auto`
  a `--list` módosítóban)

## 2. Előrendelés-sorok — saját ikonok

- A kártya alsó info-sorai típust kaptak: `ok` (zöld pipa) / `no` (piros X) /
  **`date` (arany naptár — Megjelenés)** / **`res` (arany óra — Foglalás)**
- Az előrendelés-infó így ránézésre elválik a készletinfótól (a meetingen
  jelzett „nem választja szét a szem" probléma)
- BACKEND: a sor-típus a Thymeleaf/Wicket oldalon az adat jellegéből jön
  (készlet vs. előrendelés mező)

## 3. Szalag (badge) színvariánsok — VÉGLEGES

| Státusz | Szín | Módosító class |
|---|---|---|
| Ajánlott | arany háttér, sötét szöveg | `mg-product-card__category--gold` |
| Előrendelés | sötétkék + arany (alap) | — |
| Akciós | `--color-bg-card` piros + arany szöveg | `mg-product-card__category--sale` |

- A pure-BS template-ben az Ajánlott a meglévő `badge-ribbon text-bg-primary`
  arany variánst használja
- Az „új" oktogon változatlanul, minden státusz mellett megjelenhet

## 4. Megamenü — meeting-döntések átvezetve

- Az **„Alkategóriák" felirat kikerült** (félrevezető volt) — a hasáb a
  **Téma** értékkészletet listázza, csak aminek van aktív terméke
- **Nincs „továbbiak" vágás** — a teljes lista megjelenik (max ~20–25 elem)
- Új **„Összes <rendszer> termék →"** arany link a lista alján
  — BACKEND: a rendszer teljes terméklistájára mutat (= a rendszer-szűrős
  listaoldal)
- `templates/mega-menu-v2.html` mockban elkészült a **fotós kiajánló
  csempe** (kép + sötétítő gradient-overlay + kicker/cím/CTA) — a meetingen
  kért Epicarium-minta; BACKEND-igény: `menu.featured` (kép, kicker, cím)

## 5. Háttér-textúra — ÉLESÍTVE (tulaj-jóváhagyás a meetingen)

- A `bg-texture.css` mostantól az éles oldalakon fut: **index.html,
  products.html, product.html**
- Bekötés oldalanként: `<body class="mg-texture-page">` + a megamenü div-en
  `mg-texture-menu` class + a CSS link
- A rétegek a **`.mg-frame` hátterére** festődnek (a frame teljes-oldalas
  átlátszatlan háttere az egyetlen jó hordozó — a body-t takarja, a
  tartalom-doboz keretet rajzolna)
- Tartalma: embléma-vonalmotívum (data-URI SVG) + mély bordó folt (bal lent)
  + sötét vignetta (jobb lent) + kártyákon áttetsző bordó felület +
  kategória-csempéken arany bal él
- Wicket oldalon ugyanez a bekötés: body class + menü class + CSS — más
  teendő nincs

## Következik

- Bal nav köztes nézet fix (Csabi screenshotjára várunk)
- Ajánló-karusszel jobb széle (a lelógó ötöd-kártya)
- Szűrőkomponensek záró átnézése
- Bg-removal teszt valós képeken (Laci küld egy mappányi termékképet)

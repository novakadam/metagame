# Email-sablonok — 2026. 08. 06.

---

## 1. Tulajoknak (Andris + Csabi)

**Tárgy:** Metagame frontend — friss build + háttér-textúra demo

Sziasztok!

Kint van egy friss build, ezekkel haladtunk a múlt heti meeting és Andris
levelei alapján:

**Ami kész és élesben látható** ([LINK — products.html]):

- **Terméknevek szétbontva** — a kártyákon már 3 sorban jelenik meg:
  világ/rendszer (arany talpas) · terméknév (max 2 sor) · kiszerelés.
  A ti debella teszt-neveitekkel teszteltük (Strixhaven, FINAL FANTASY
  Scene Box, Final Girl stb.) — kiférnek. Ugyanez a hierarchia fut a
  termékoldalon is, szóval konzisztens.
- **A kártya 100%-os nézetben kifér** a Kosárba gombbal együtt (tömörített
  kártya + laptopon 4 oszlop) — Andris észrevétele javítva.
- **A kilógó kategória-szalag** hosszú névnél már nem lóg ki (rövidül …-tal),
  de a szalagba amúgy is csak rövid státuszok jönnek (Ajánlott, Előrendelés,
  Akciós).
- **A logó-összecsúszás** (Csabi laptopja) javítva — a kereső-sor most a
  logóhoz igazodik minden felbontáson.
- **Tablet nézet** rendbe téve: a bal ikonsor a keretvonalra fűzve, a szűrő
  gombról nyíló fiók lett (mint mobilon), a megamenü betűszín-hibája javítva,
  és bekerült a Legnépszerűbb ajánló-oszlop is.

**Háttér-textúra demo** ([LINK — products-textura.html]) — Andris 07.17-i
felvetésére: megnéztem az Epicariumot, ők a világos felületeket törik meg
halvány grafikával; nálunk ugyanezt fordítva csináltam meg — a sötét lila
mezőkön halvány arany vonalmotívum fut (a saját emblémánk geometriájából),
mély bordó átmenetekkel, a kártyák pedig áttetsző bordó felületet kaptak,
ami alatt átdereng a minta. Külön demo-oldalon van, az éles nézetet nem
érinti — **erre várnám a véleményeteket**, ha tetszik, átemeljük mindenhová.

**Következik:** a megamenü 3. szintje (köszi a jóváhagyást) + kiajánló
képes csempék a menübe az Epicarium mintájára. A kereső spec-hez is
gyűjtöttem inputot tőlük (darabszámos kategória-találatok a legördülőben) —
átküldöm külön, ha aktuális.

Üdv,
Ádám

---

## 2. Fejlesztőnek (Laci)

**Tárgy:** Friss build kint — változás-kivonat + 2 adatigény

Szia Laci!

Friss build ment ki a Vercelre ([LINK]), a repóban van egy pontos
változás-kivonat is: `docs/fejlesztoi-kivonat-2026-08-06.md` — fájlonként
összeszedve, mi markup, mi CSS, mi az, ami téged érint.

A lényeg röviden:

- **Termék grid**: BS `row-cols` rács lett (a custom CSS-grid kivezetve),
  a kártya markup a `templates/product-card-bs.html` / `product-list.html`
  szerint — Wicketben egyszer definiált, iterált komponens.
- ⭐ **Adatigény #1**: a terméknév 3 mezőre bomlik — `product.system`
  (világ/rendszer), `product.title` (max 2 sor), `product.variant`
  (kiszerelés). A meetingen beszélt strukturális szétbontás ez.
- ⭐ **Adatigény #2**: a megamenü „Legnépszerűbb" blokkjához kategóriánkénti
  kiemelt/népszerű termék lista kell majd (most JS placeholder).
- **Szűrő panel**: `offcanvas-xxl` lett — 1400 alatt gombról nyíló fiók.
  ⚠️ Az aside DOM-ban a `.mg-frame` UTÁN, root szinten él, mert az
  `.mg-content` (z-index:1) stacking contextje alá szorította a fiókot —
  a Wicket oldalstruktúrában is így érdemes elhelyezni.
- **Megamenü**: a demóban látott „elmászott betűszín" javítva (color-öröklés
  + a JS most a template markupját generálja nav-linkekkel).
- **Topbar fix**: a kereső-sor max-width a teljes logóval számol — az
  összecsúszás minden köztes felbontáson megszűnt.
- A `products-textura.html` egy **prototípus** (háttér-textúra koncepció a
  tulajoknak) — nem kell vele foglalkoznod, jóváhagyás után szólok, és
  akkor lesz belőle rendes komponens.

Ha bármi kérdés, hívj nyugodtan!

Üdv,
Ádám

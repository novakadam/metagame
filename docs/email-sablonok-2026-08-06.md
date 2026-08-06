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

## 2. Fejlesztőnek (Laci) — KÜLDÉSRE KÉSZ

**Tárgy:** Friss build kint — változás-kivonat + kérdés az átadásról

Szia Laci!

Friss build ment ki: https://metagame-build.vercel.app/products.html
(plusz van egy külön textúra-demo a tulajoknak: /products-textura.html —
ezzel neked most nem kell foglalkozni, még jóváhagyásra vár).

Ami a mostani körben változott, dióhéjban:

- **Termék grid**: BS row-cols rács lett (a custom CSS-grid kivezetve), a
  kártya markup a templates/product-card-bs.html és product-list.html
  szerint megy — a lista nézet is row-cols váltással működik.
- **Terméknév 3 mezőre bontva** a kártyán: product.system (világ/rendszer,
  arany Playfair) + product.title (max 2 sor) + product.variant (kiszerelés)
  — ⭐ ez neked adatigény, a meetingen beszélt szétbontás.
- **Szűrő panel**: offcanvas-xxl — 1400 alatt gombról nyíló fiók, felette
  statikus sidebar. ⚠️ Az aside DOM-ban a .mg-frame UTÁN, root szinten él
  (stacking context miatt) — a Wicket struktúrában is így érdemes.
- **Megamenü**: a demóban látott elmászott betűszínek javítva; a JS most a
  template markupját generálja (nav-link + BEM). ⭐ A "Legnépszerűbb"
  blokkhoz kategóriánkénti kiemelt termék lista kell majd (most placeholder).
- **Topbar/logó összecsúszás** javítva minden köztes felbontáson; tablet
  nézetben a bal ikonsor a keretvonalra került, teljes rombuszokkal.
- Kártya-tömörítés: 100%-os nézetben kifér a teljes kártya a Kosárba gombbal.

A repóban van egy pontos, fájlonkénti kivonat mindenről:
docs/fejlesztoi-kivonat-2026-08-06.md — commitok a bootstrap/main branchen.

**És egy kérdés: neked hogyan a legkényelmesebb átvenni ezeket a
változásokat?** Tudok:
a) commitonként hivatkozni a GitHub-on (logikus bontásban vannak),
b) a kivonat-doksit bővíteni, ha valamelyik ponthoz több kontextus kell,
c) leülni egy rövid hívásra és végigmenni rajta képernyőmegosztással,
d) vagy ha neked úgy jobb, template-fájlonként összefoglalni, hogy mi a
   végleges markup, amit a Wicket-be át kell venni.

Mondd, melyik működik neked, és úgy csinálom a továbbiakban is.

Üdv,
Ádám

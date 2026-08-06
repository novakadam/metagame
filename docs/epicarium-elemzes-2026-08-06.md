# Epicarium (epicarium.eu) — UI-elemzés és átvehető minták

*Készült: 2026. 08. 06. — válasz-anyag András 07.17-i kérdésére (háttér-textúrák)
és a 07.23-i meeting action pointjára (átvehető UI-megoldások).*

## 1. Háttér-textúrák — András kérdésére ⭐

**Hogyan csinálják:** az Epicarium a VILÁGOS (törtfehér) szekciók hátterét töri
meg egy halvány, alacsony kontrasztú **iránytű/térkép-vonalgrafikával**
(watermark a szekciók szélein, ~3–5% erősségű). A hero teljes képes háttér
(Warhammer artwork) sötét overlay-jel. A sötét navy felületeik texturálatlanok —
ott a kártyák arany szegélye adja a mélységet.

**Javaslat nálunk (fordított logikával, mert mi sötét alapon dolgozunk):**
- A nagy flat lila mezőkre **halvány arany vonalgrafika-watermark** a saját
  világunkból (a főoldali „szörnyes" motívumok vonalas, egyszínű változata
  vagy a keret-ornamentika elemei) — SVG background-image, 3–6% opacity,
  szekciónként 1 nagy motívum a sarkokban/széleken, NEM tapéta-szerű ismétlés
- A termékkártya-képeknél már működő radial gradient minta kiterjeszthető
  szekció-háttérként (sötétből enyhén világosodó folt a tartalom mögött)
- Költsége minimális: 1-2 SVG asset + pár sor CSS, a Thymeleaf oldalt nem érinti
- Konkrét helyek: webshop lista háttere, klub-oldal szekciói, checkout,
  megamenü jobb oldala

## 2. Megamenü — kiajánló blokk + számozott hasábok ⭐

A TÁRSAS·KÁRTYA·RPG menüjük felépítése:
- **Bal: kiajánló blokk** — 1 nagy featured csempe képpel (kicker: „KICK OFF
  TIME!" / cím: „BLOOD BOWL" / alcím / „Kínálat böngészése →") + alatta 2 kisebb
  kiajánló csempe. **Pontosan a Laci által emlegetett „kiajánló képes" minta.**
- **Jobb: számozott hasábok** — „1. Társasjátékok / 2. Kártyajátékok /
  3. Szerepjátékok", alattuk világ/brand-linklisták finom elválasztókkal
- Világos panel a sötét header alatt — erős kontraszt, nem folyik össze
  (nálunk ez a sötét menü + arany szegély + tömör háttér kombóval már rendben)

**Nálunk:** a „Legnépszerűbb" oszlop már él; következő lépés a featured
kiajánló csempe (backend-igény: kiemelt ajánlat kategóriánként) és a
3. szint (Andris jóváhagyta) — a számozott hasáb-minta jó alap a
Wargame → Warhammer 40k → frakció bontáshoz.

## 3. Termékkártya

- **Státusz-sor a kártya TETEJÉN**: kétrészes pill „● ELŐRENDELÉS |
  MEGJELENÉS: AUG. 15." — a dátumos előrendelés-jelzés jó minta
- Készlet-státusz színkóddal: „● Készleten" (zöld) / „○ Rendelhető" (üres pötty)
- Ár + áthúzott régi ár egy sorban
- Full-width Kosárba gomb
- **Amiben mi előrébb járunk:** náluk minden a terméknévben van („BLOOD BOWL:
  TOMB KINGS TEAM CARD PACK") — a mi 3 mezős bontásunk (világ/név/kiszerelés)
  átláthatóbb

## 4. Termékoldal

- **Attribútum-csempék**: 2×2 label-value rács (Blood Bowl/LICENC ·
  Games Workshop/GYÁRTÓ · Társasjáték/TÍPUS · Műanyag/ANYAG) — elegáns,
  szkennelhető; jól passzol Laci „kategória-szintű kiemelt attribútum"
  koncepciójához. Nálunk a specifikáció-accordion mellé/helyére mehetne.
- **Készlet-táblázat**: „Raktár — Készleten / Bolt — Nincs készleten" +
  „**Ma feladjuk**" microcopy — a mi Online/Bolt/Klub hármasunk ugyanez,
  a „ma feladjuk" típusú élő szöveg átvehető
- **Trust-sáv**: „Ingyenes szállítás 16 000 Ft felett | 14 napos visszaküldés"
  a Kosárba gomb alatt
- „Megosztom a felfedezést!" share-sor (FB / share / link)
- Galéria: sarok-keretjelölés + zoom gomb — hasonló szellemű, mint a mi keretünk

## 5. Kereső (input a spec-hez Andriséknak) ⭐

A „warham" beírásra azonnali kétoszlopos dropdown:
- **Bal „Felfedezés"**: kategória/licenc-találatok DARABSZÁMMAL
  („Warhammer Játékok — CATEGORY · 1353", „Warhammer 40 000 — LICENSE · 665")
- **Jobb „Talált termékek"**: thumb + brand-eyebrow + név + státusz badge
  (NEW / PRE-ORDER) + ár — max 4-5 elem
- Alul összesítő: „1353 catalogue matches for »warham«"
- Prefix-találat működik (fél szóra is), és ékezet nélküli változatokat is
  indexelnek („Warhammer Jatekok")

**A mi search-overlay tervünk ezzel nagyrészt egybevág** — a darabszámos
kategória-oszlop és az összesítő sor érdemes kiegészítés a spec-hez.

## 6. Hírek/tartalom-kártyák

- Sötét kártya arany bal szegéllyel a világos háttéren, státusz-pill
  (MÁR ÉLŐ / ELŐRENDELHETŐ / dátum) a sarokban
- Gold kicker-eyebrow („WARHAMMER 40K —") + serif cím
- **Kulcs-érték adatsorok** bal arany szegéllyel (NYERTESEK / VESZTESEK /
  ELÉRHETŐ / TARTALOM) — strukturált, nem folyószöveg; a krónikák/hírek
  szekciónkhoz jó minta

## 7. Összkép

Igényes, letisztult oldal — a szerkezeti mintáik (kiajánlós megamenü,
darabszámos kereső, attribútum-csempék, kulcs-érték hírkártyák) átvehetők.
A vizuális világuk sablonosabb a miénknél (világos alap + navy + arany);
a mi keretes, sötét világunk egyedibb — a textúra-kérdésben nem másolni
érdemes őket, hanem a logikát megfordítani: halvány arany motívum a sötét
mezőkön.

## Javasolt következő lépések

1. Textúra-prototípus 1-2 szekción (webshop lista + megamenü) — gyors demo
2. Megamenü featured kiajánló csempe + 3. szint mock
3. Kereső-spec kiegészítés a darabszámos kategória-oszloppal (Andriséknak)
4. Termékoldal attribútum-csempék beépítése a demóba

# Metagame Webshop – Prodspec

> Projekt szintű döntések és scope. Ritkán változik.
> Utoljára frissítve: 2026-05-12

---

## Mi ez a projekt?

A metagames.hu TCG/szerepjáték webshop teljes frontend újraépítése.
Fantasy/board game vizuális identitás: sötét bordó alapon arany dekoratív kerettel,
kártya- és playmat-ihletett elemekkel.

---

## Csapat

| Név | Szerep |
|---|---|
| Ádám | UX/UI designer – Claude Code-dal generál statikus HTML/CSS komponenseket |
| Laci | Backend/frontend fejlesztő – JSP integrációt végzi, widget-szinten veszi át a kódot |
| Andras | Ikonok, user story-k, projekt menedzsment |
| Csaba | Analitika, design doksi |

---

## Technológiai stack

| Réteg | Technológia | Megjegyzés |
|---|---|---|
| Backend / template | Java + JSP | Szerveroldali rendering, marad |
| Layout framework | Bootstrap 5 | Megbízhatóság miatt marad |
| JS / interakció | jQuery | Komplex frameworkök helyett |
| API kommunikáció | JSON API | Termékkeresés, szűrés, katalógus |
| CSS | Custom CSS/SCSS | Keret és komponensek |
| Képformátum | WebP | PNG helyett, teljesítmény miatt |
| Task tracking | GitLab Issue Tracker | Kommunikáció és időlogolás |

**Nincs React, Angular, Vue – nem generálunk ilyet.**

---

## Widget-alapú architektúra

Minden vizuális egység önálló widget (Laci elvárása):

```
widgets/widget-neve/
├── template.html   ← tiszta Bootstrap-barát HTML
├── style.css       ← dedikált CSS, design tokenekkel
└── script.js       ← saját jQuery logika
```

Data-heavy részek (keresés, szűrés, katalógus):
- JSON API-n keresztül kommunikálnak
- jQuery végzi a renderelést
- Kliens-oldali cache a kategória struktúrának és szűrési opcióknak

---

## Oldalak és scope

| Oldal | Státusz | Megjegyzés |
|---|---|---|
| Design tokenek + alap CSS | ✅ Kész | tokens.css |
| Keret komponens | 🔄 Folyamatban | Desktop, minden oldalon azonos |
| Home landing page | Elkészítendő | 8 szekció, lásd roadmap |
| Termék lista oldal | Elkészítendő | Filter panel + kosár drawer |
| Termék részlet oldal | Elkészítendő | Upsell sáv jobbra |
| Cikk/blog oldal | Elkészítendő | Scroll-spy TOC, kapcsolódó termékek |
| Mobil responsive | Elkészítendő | Desktop prototípusból generálva |
| Checkout oldal | Külön folyamat | One-page, már részben kész |

### Home oldal szekciók
1. Hero – tabs (Újdonságok / Előrendelések / Versenyek) + kiemelt termék kártya
2. Világok – horizontális scroll karusszel (Pokémon, Magic, stb.)
3. USP grid – 4 kártya (platform előnyök)
4. Krónikák – hírek kártyás elrendezésben
5. Testimonials – ügyfélvélemények
6. Metagame bemutató – bolt vs klub, kétoszlopos
7. CTA banner – arany háttér, dice ikon
8. Kapcsolat – form + térkép

---

## Navigáció

### Bal oldali megamenü – kétszintű logika
```
Főkategória (pl. TCG)
  └── Rendszer/Világ (pl. Pokémon, Magic)
        └── Szűrés típusra (pl. Booster, Display)
```
Shop / Közösség toggle váltja a bal nav tartalmát.

### Jobb oldali off-canvas panelek
Drawer-szerűen beúszó panelek: profil, kedvencek, kosár, értesítések, kapcsolat.
Kosárnál sárga kiemelés + számláló ha van benne termék.

### Keresés
Intelligens megakereső felület – a tartalom fölé úszik be.

---

## Mobil

- A dekoratív keret mobilon megmarad, leegyszerűsödve
- Top: M hexagon logo + search bar + hamburger
- Bottom: fix tab bar (galéria, kosár, profil)
- Off-canvas menü: teljes képernyős, alulról beúszik
- Gesztus navigáció a menüben (nem az előző oldalra visz)
- A mobil Figmában nincs frissítve – desktop dizájnból generáljuk

---

## Checkout döntések

- **One-page checkout:** kosár + fizetési adatok egy nézeten
- **Guest checkout:** engedélyezett, számlázási cím kötelező
- **Céges vásárlás:** csak regisztrált felhasználóknak
- **Social login:** Google/Facebook, email alapú azonosítás
- **Készletfoglalás:** 15 perces foglalás kosárba helyezéskor
- **Fizetés:** csak azonnali kártyás (Barion), Google/Apple Pay a Barion oldalon
- **Nincs "Később fizetek"** – félbehagyott rendelések elkerülése miatt

---

## Nyitott kérdések

| Téma | Státusz |
|---|---|
| Intelligens keresés | Luigi (500 EUR/hó) vs olcsóbb alternatíva – Ádám kutat |
| Termékképek háttértörlés | 10.000+ kép, automatizálás kell |
| Analitika | Looker Studio vs PostHog – Csaba értékeli |
| Terminológia | "Krónikák" vs "Hírek" stb. – workshop kell |
| Többnyelvűség | Angol verzió következő nagy fázis |

---

## Mérföldkövek

- **1. mérföldkő:** landing page + vásárlási folyamat
- **2. mérföldkő:** angol fordítás

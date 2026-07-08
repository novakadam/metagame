# Termékfotó háttér-eltávolító – Használati útmutató

Automata háttér-eltávolító **termékfotókhoz**: egy mappába tett képekről leszedi a hátteret,
és **átlátszó hátterű PNG-ket** ad vissza – készen a webshop termékkártyáihoz.

> Ez a dokumentum két részből áll:
> - **1–4. rész: mindenkinek** (mit tud, mibe kerül, hogyan használjuk) – nem kell hozzá technikai tudás.
> - **5. résztől: a fejlesztőnek** (telepítés lokál gépre és szerverre, paraméterek).

---

## 1. Mi ez, és mit tud?

- Beteszed a termékfotókat egy `input` mappába → lefuttatod → a kész, **átlátszó hátterű** képek egy `output` mappába kerülnek.
- Egyszerre több képet is feldolgoz (kötegelt/batch).
- A háttér felismerését egy **AI-modell** végzi, ami eldönti, mi a termék és mi a háttér.

### Fontos: mibe kerül? Kell hozzá előfizetés?

- **Teljesen ingyenes.** Nyílt forrású eszközön alapul (rembg).
- **Nincs havidíj, nincs képenkénti költség, nincs „kredit".**
- **Nem kell hozzá Claude, ChatGPT vagy bármilyen AI-előfizetés.** A háttér-eltávolító AI egy kis, letölthető program, ami a saját gépen fut – nincs köze semmilyen fizetős szolgáltatáshoz.
- Internet csak az **első** futtatáskor kell (egyszer letölti a modellt), utána **offline** is működik.

> Egy AI (Claude) segített megírni a programot – de ez egyszeri, kész munka. A **használathoz** semmilyen AI-fiók nem kell.

---

## 2. Mennyire jó az eredmény? (tesztek)

Négy különböző nehézségű termékfotón teszteltük:

| Termékfotó | Nehézség | Eredmény |
|---|---|---|
| Magic booster box (fehér háttér, szemből) | könnyű | ✅ tökéletes |
| Magic Super Heroes bundle (fehér háttér) | könnyű | ✅ tökéletes, éles él |
| Warhammer készlet (60+ apró figura, könyvek) | közepes | ✅ kiváló, még az apró részek is |
| Magic doboz **fóliázva, szőnyegen, ferdén** | nehéz | ✅ tiszta háttér, pontos él |

**A minőség kulcsa a fotó:** egyszínű/semleges háttér előtt, szemből fotózott termékeknél az eredmény szinte tökéletes. Tarka háttér, fólia, tükröződés, ferde szög esetén nehezebb, de a mostani beállítással így is jó lett.

> ⚠️ **Fontos megjelenítési tipp:** a kész, átlátszó PNG-t **mindig világos háttéren** nézd meg (pl. fehér lapra húzva vagy a webshopban), **soha ne fekete előnézeten** – a fekete háttéren a sötét termékrészek egybeolvadnak az átlátszósággal, és tévesen úgy tűnhet, hogy „belevágott a termékbe", pedig nem.

---

## 3. A „jó beállítás", amit végül választottunk: **BiRefNet**

Az eszköz többféle AI-modellel is tud dolgozni. Kipróbáltunk többet, és a **BiRefNet** (2024-es, jelenleg a legpontosabb ingyenes modell) adta a legjobb, legélesebb eredményt mindegyik teszten. Ezért **ez az alapértelmezett** – nem kell külön beállítani, a program magától ezt használja.

| Modell | Mikor? |
|---|---|
| **`birefnet-general`** (alapértelmezett) | **Legpontosabb élek.** Ezt használjuk. Nagyobb (~1 GB), kicsit lassabb. |
| `u2net` | Gyorsabb, kisebb (~170 MB). Sok kép gyors feldolgozásához, ha a maximális pontosság nem kritikus. |
| `isnet-general-use` | A teszteken gyengébb volt (nem ajánlott ehhez a feladathoz). |

---

## 4. Napi használat (a telepítés után)

1. Tedd a termékfotókat az **`input`** mappába (png, jpg, jpeg, webp – akárhány).
2. Futtasd a programot (lásd lentebb az adott géphez tartozó parancsot).
3. A kész, átlátszó képek az **`output`** mappában lesznek, ugyanazzal a névvel.

- A `--trim` kapcsoló levágja a termék körüli felesleges üres szélt, és egységes keretet ad (termékfotóhoz ajánlott).
- A program **kihagyja** a már feldolgozott képeket. Ha egy képet újra akarsz vágni, a `--overwrite` kapcsolót add hozzá.

### Webshop-kész képek egy paranccsal (méretezés + WebP)

A háttér-eltávolítás mellett a program **web-optimalizált méreteket** is legyárt egyszerre – négyzetes, egységes termékkártyákhoz, modern **WebP** formátumban:

```
python remove_bg.py --trim --square --sizes 1200,600,300 --webp
```

Ez minden képből **3 méretet** készít (a fájlnév végén a mérettel), pl. `termek_1200.webp`, `termek_600.webp`, `termek_300.webp`:

| Méret | Mire való |
|---|---|
| **1200×1200** | fő termékkép / nagyítás (retina-éles) |
| **600×600** | termékkártya a listában/gridben |
| **300×300** | kis előnézet / mobil |

- `--square` = a terméket négyzetes vászonra igazítja, középre (így egységesek a kártyák).
- `--sizes 1200,600,300` = a kívánt méretek px-ben (szabadon módosítható; egy méret is megadható, pl. `--sizes 1000`).
- `--webp` = kisebb fájlméret, gyorsabb oldal (a mostani metagames.hu még JPG/PNG-t használ, ehhez képest a WebP érdemi javulás).
- A méretarány megmarad, a program **nem nagyít fel** a forrásnál nagyobbra.

---

## 5. Telepítés – LOKÁLIS gépre (egyszeri)

Bármelyik gépen (Windows / Mac / Linux) működik. Minden lépés **ingyenes**.

### Előfeltétel: Python
- Telepíts **Python 3.10–3.12** verziót a [python.org](https://www.python.org/downloads/) oldalról.
- ⚠️ **A legújabb Python 3.14 még NEM jó** hozzá (a szükséges csomag nem települ rá). Használj 3.10–3.12-t.

### macOS / Linux
```bash
# a program mappájában:
cd product-bg-removal
python3.12 -m venv .venv           # egyszeri: külön környezet létrehozása
source .venv/bin/activate
pip install -r requirements.txt    # csomagok telepítése (ingyenes)

# futtatás (első alkalommal letölti a modellt, ~1 GB, egyszer):
python remove_bg.py --trim
```

### Windows
```bat
cd product-bg-removal
py -3.12 -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt

python remove_bg.py --trim
```

Ennyi. Utána már csak a képeket kell az `input` mappába tenni, és lefuttatni a `python remove_bg.py --trim` parancsot.

> **Ha nem szeretnétek terminálozni:** kérhettek egy „dupla kattintásra induló" indítófájlt (Windowson `.bat`, Mac-en `.command`), amivel csak a mappába tett képekre kell rákattintani. Ezt külön el tudjuk készíteni.

---

## 6. Telepítés – SZERVERRE (pl. Hostinger VPS)

Akkor érdemes szerverre tenni, ha **automatizálni** akarjátok (pl. a webshopba feltöltött képet automatikusan kivágja), vagy ha egy központi helyen szeretnétek futtatni.

### Milyen szerver kell?
- **VPS (saját, teljes hozzáférésű szerver) kell** – pl. **Hostinger VPS**, vagy bármilyen Linux VPS/konténer.
- ⚠️ A **sima (shared) webtárhely NEM alkalmas** – ott nincs elég erőforrás és jogosultság a Python + ~1 GB modell futtatásához.
- ⚠️ **Vercel serverless function sem ideális** erre (méret- és időkorlátok miatt) – ezért is jobb egy külön VPS.

### Telepítés Linux VPS-en (Ubuntu/Debian példa)
```bash
sudo apt update && sudo apt install -y python3.12 python3.12-venv python3-pip
git clone <a-repó-URL-je>          # vagy másold fel a product-bg-removal mappát
cd product-bg-removal
python3.12 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python remove_bg.py --trim
```

### Ajánlott szerver-paraméterek
- **RAM:** legalább 2 GB (a modell + feldolgozás pár száz MB–1 GB memóriát használhat).
- **Tárhely:** ~2 GB szabad hely (a modell ~1 GB + a képek).
- **CPU:** elég a sima CPU (nem kell drága videokártya/GPU); egy kép feldolgozása néhány másodperc.
- Ha automatizált (feltöltéskori) feldolgozás kell, a fejlesztő egy kis webes végpontot (pl. Python FastAPI) tehet köré, ami fogadja a képet és visszaadja a kivágottat.

---

## 7. Melyiket válasszuk? (lokál vs. szerver)

| | Lokális gép | Szerver (VPS) |
|---|---|---|
| **Mikor jó?** | Néhány / rendszeres kézi feldolgozás | Automatizálás, központi feldolgozás |
| **Bonyolultság** | Egyszerű (1× telepítés) | Fejlesztői beállítást igényel |
| **Költség** | 0 Ft (a meglévő gépen) | VPS havidíja (pl. Hostinger VPS) |
| **Ajánlás** | **Kezdésnek ez a legegyszerűbb** | Ha később skálázni/automatizálni kell |

**Javaslat:** kezdésnek a **lokális** futtatás a legegyszerűbb és ingyenes – egy benti gépre telepítve, terminálból. Ha később jön az automatizálás igénye, akkor érdemes **Hostinger VPS**-re (vagy hasonló Linux szerverre) tenni. Ehhez a programhoz **egyik esetben sem kell** semmilyen AI-előfizetés vagy fizetős szolgáltatás.

---

## 8. Csomagolás – hogyan kapja meg az ügyfél? (döntéshez)

Háromféleképpen adhatjuk át a programot – ez döntés kérdése, attól függően, milyen gépen fog futni és van-e technikai segítség:

| Mód | Előny | Hátrány | Kinek jó |
|---|---|---|---|
| **Windows `.exe`** | Nem kell Python telepítés; dupla kattintás | Csak Windowson fut; ~300–800 MB; Windows gépen vagy felhős build-del (GitHub Actions) kell legyártani | Bolti/irodai **Windows PC** |
| **Mac app (`.command`)** | Nem kell Python; Macen egyszerű | Csak Macen fut | **Mac** gép |
| **Python + indító** (`.bat`/`.command`) | Kicsi, könnyű frissíteni/karbantartani | A célgépen kell egyszer Python + a csomagok telepítése | Ha van **technikai segítség** (fejlesztő) |

**Közös mindháromnál:** az AI-modell (~1 GB) az **első** futtatáskor egyszer letöltődik (ehhez kell egyszer internet), utána offline megy.

**Ajánlás:**
- Ha egy **bolti Windows gépen**, technikai tudás nélkül futtatnák → **Windows `.exe`** a legkényelmesebb (felhős build-del legyártható Mac-ről is).
- Ha a **fejlesztő** kezeli → a **Python + indító** a legrugalmasabb és legkisebb.

> Ez a lépés még nyitott – amint eldől, melyik gépen fut (Windows vagy Mac) és ki kezeli, a megfelelő csomagot elő tudjuk állítani.

---

## 9. Technikai összefoglaló (a fejlesztőnek)

| | |
|---|---|
| **Alap** | [rembg](https://github.com/danielgatis/rembg) (nyílt forrás, MIT licenc) |
| **AI-modell** | BiRefNet (`birefnet-general`, ~1 GB) – alapértelmezett; alternatíva: U²-Net (`u2net`, ~170 MB) |
| **Motor** | onnxruntime, Pillow |
| **Nyelv** | Python 3.10–3.12 (3.14 még nem támogatott) |
| **Hardver** | CPU elég (GPU nem szükséges) |
| **Memória** | pár száz MB – ~1 GB RAM feldolgozás közben |
| **Hálózat** | csak a modell egyszeri letöltéséhez; utána offline |
| **Bemenet** | png, jpg, jpeg, webp, bmp, tiff |
| **Kimenet** | PNG (átlátszó háttérrel) |
| **Költség** | 0 – nincs API, kredit vagy előfizetés |

### Parancsok / kapcsolók
```bash
python remove_bg.py                 # input/ -> output/ (alap: BiRefNet)
python remove_bg.py --trim          # + a felesleges szél levágása (termékfotóhoz ajánlott)
python remove_bg.py --overwrite     # a már feldolgozott képeket is újravágja
python remove_bg.py --model u2net   # gyorsabb, kisebb modell (sok képhez)
python remove_bg.py -i <mappa> -o <mappa>   # egyedi be-/kimeneti mappa
python remove_bg.py --alpha-matting # finomabb élek (lassabb; hajszál/áttetsző részekhez)
python remove_bg.py --square        # négyzetes vászonra igazítás, termék középre
python remove_bg.py --sizes 1200,600,300  # több méret egyszerre (px)
python remove_bg.py --webp          # WebP kimenet PNG helyett
# Webshop-kész, minden együtt:
python remove_bg.py --trim --square --sizes 1200,600,300 --webp
```

**Javasolt webshop-méretek** (a metagames.hu jelenlegi ~900 px-es, négyzetes, WebP nélküli gyakorlatát modernizálva): `1200` (fő kép), `600` (kártya), `300` (thumbnail) – mind WebP.

### Fájlok a csomagban
- `remove_bg.py` – maga a program
- `requirements.txt` – a telepítendő csomagok
- `README.md` – rövid fejlesztői leírás
- `HASZNALATI_UTMUTATO.md` – ez a dokumentum
- `input/`, `output/` – be- és kimeneti mappák

---

*Kérdés esetén a fejlesztő a `README.md`-ben és a program `--help` kapcsolójában (`python remove_bg.py --help`) talál további részleteket.*

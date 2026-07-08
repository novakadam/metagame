# Termékfotó háttér-eltávolító

Kötegelt (batch) háttér-eltávolító termékfotókhoz, a nyílt forrású
[rembg](https://github.com/danielgatis/rembg) (U²-Net AI modell) segítségével.
Ingyenes, a modell letöltése után **offline** is működik – nincs API-kulcs, nincs havidíj.

Beteszed a képeket az `input/` mappába → lefuttatod → a kivágott, **átlátszó hátterű PNG-k**
az `output/` mappába kerülnek. Kész a webshop termékkártyáihoz.

## Telepítés

Python 3.9+ kell. A projekt mappájában:

```bash
cd tools/product-bg-removal
python -m venv .venv && source .venv/bin/activate   # ajánlott, de nem kötelező
pip install -r requirements.txt
```

## Használat

```bash
# 1) Másold a termékfotókat az input/ mappába (png, jpg, jpeg, webp, ...)
# 2) Futtasd:
python remove_bg.py
```

A kész, átlátszó PNG-k az `output/` mappába kerülnek (ugyanazzal a fájlnévvel, `.png` kiterjesztéssel).

> Első futáskor a rembg egyszer letölti a modellt (~170 MB a `~/.u2net` mappába).
> Utána már internet nélkül is megy.

### Kapcsolók

| Kapcsoló | Mit csinál |
|---|---|
| `-i, --input <mappa>` | Bemeneti mappa (alap: `input`) |
| `-o, --output <mappa>` | Kimeneti mappa (alap: `output`) |
| `--trim` | A kivágott termék körüli felesleges átlátszó szél levágása + egységes keret (**termékfotóhoz ajánlott**) |
| `--alpha-matting` | Finomabb élek (lassabb; hajszálakhoz, áttetsző részekhez jó) |
| `--model <név>` | rembg modell: `u2net` (alap), `isnet-general-use` (gyakran pontosabb), `u2netp` (gyorsabb) |
| `--overwrite` | Meglévő kimenetek újrafeldolgozása (alapból kihagyja őket) |

### Példák

```bash
# Termékfotók kivágva + körbevágva, egységes kerettel:
python remove_bg.py --trim

# Pontosabb modell, finom élek (lassabb):
python remove_bg.py --model isnet-general-use --alpha-matting --trim

# Egyedi mappákból:
python remove_bg.py -i /Users/te/Desktop/uj-termekek -o kivagott --trim
```

## Tippek

- **Jó bemenet = jó eredmény:** egyszínű/tiszta háttéren fotózott termékeknél szinte tökéletes a kivágás.
- **Nehéz esetek** (átlátszó fólia, tükröződő csomagolás): próbáld az `--alpha-matting` és/vagy `--model isnet-general-use` kombinációt.
- A kimenet mindig PNG (átlátszóság miatt). A webshopba töltés előtt érdemes még optimalizálni/tömöríteni (pl. Vercel Image Optimization vagy `pngquant`).
- Az `input/` és `output/` tartalma **nincs** verziókövetve (lásd `.gitignore`), csak maga a script.

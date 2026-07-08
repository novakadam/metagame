#!/usr/bin/env python3
"""
Termékfotó háttér-eltávolító batch script (rembg / U²-Net).

Egy input mappa képeiről leszedi a hátteret, és átlátszó PNG-ként menti
az output mappába. Termékfotókhoz készült: opcionális automatikus
körbevágással (a felesleges átlátszó szél levágása + egyenletes keret),
hogy a webshop kártyáin konzisztensen jelenjenek meg a termékek.

Használat:
    pip install -r requirements.txt
    python remove_bg.py                       # input/ -> output/
    python remove_bg.py -i fotok -o kivagott  # egyedi mappák
    python remove_bg.py --trim                # + körbevágás, egységes keret
    python remove_bg.py --alpha-matting       # finomabb élek (lassabb)
    python remove_bg.py --overwrite           # meglévő kimenetek újrafeldolgozása

Első futáskor a rembg letölti a modellt (~170 MB a ~/.u2net mappába),
utána már offline, internet nélkül is működik.
"""
import argparse
import io
import sys
from pathlib import Path

try:
    from rembg import remove, new_session
    from PIL import Image
except ImportError:
    sys.exit("Hiányzó függőség. Futtasd előbb: pip install -r requirements.txt")

SUPPORTED = {".png", ".jpg", ".jpeg", ".webp", ".bmp", ".tiff"}


def trim_transparent(img: "Image.Image", padding: int = 12) -> "Image.Image":
    """A kép körüli teljesen átlátszó szél levágása + kis egyenletes keret."""
    bbox = img.getbbox()
    if not bbox:
        return img
    img = img.crop(bbox)
    if padding > 0:
        w, h = img.size
        canvas = Image.new("RGBA", (w + 2 * padding, h + 2 * padding), (0, 0, 0, 0))
        canvas.paste(img, (padding, padding))
        img = canvas
    return img


def main() -> None:
    ap = argparse.ArgumentParser(description="Termékfotó háttér-eltávolító (rembg).")
    ap.add_argument("-i", "--input", default="input", help="Bemeneti mappa (alap: input)")
    ap.add_argument("-o", "--output", default="output", help="Kimeneti mappa (alap: output)")
    ap.add_argument("--model", default="birefnet-general",
                    help="rembg modell: birefnet-general (alap, legpontosabb élek – nagyobb/lassabb), "
                         "u2net (gyorsabb, sok képhez), isnet-general-use, u2netp, ...")
    ap.add_argument("--alpha-matting", action="store_true",
                    help="Finomabb élek (lassabb, jobb hajszál/áttetsző részekre)")
    ap.add_argument("--trim", action="store_true",
                    help="Átlátszó szél levágása + egységes keret (termékfotóhoz ajánlott)")
    ap.add_argument("--overwrite", action="store_true",
                    help="Meglévő kimenetek felülírása (alapból kihagyja őket)")
    args = ap.parse_args()

    in_dir = Path(args.input)
    out_dir = Path(args.output)
    if not in_dir.is_dir():
        sys.exit(f"Nincs ilyen bemeneti mappa: {in_dir.resolve()}")
    out_dir.mkdir(parents=True, exist_ok=True)

    files = sorted(f for f in in_dir.iterdir() if f.suffix.lower() in SUPPORTED)
    if not files:
        sys.exit(f"Nincs támogatott kép a mappában: {in_dir.resolve()}\n"
                 f"Támogatott: {', '.join(sorted(SUPPORTED))}")

    session = new_session(args.model)
    total = len(files)
    done = skipped = failed = 0

    flags = args.model
    if args.alpha_matting:
        flags += ", alpha-matting"
    if args.trim:
        flags += ", trim"
    print(f"{total} kép feldolgozása ({flags})...\n")

    for idx, f in enumerate(files, 1):
        out_path = out_dir / (f.stem + ".png")
        if out_path.exists() and not args.overwrite:
            print(f"[{idx}/{total}] –  kihagyva (már létezik): {f.name}")
            skipped += 1
            continue
        try:
            result = remove(f.read_bytes(), session=session, alpha_matting=args.alpha_matting)
            img = Image.open(io.BytesIO(result)).convert("RGBA")
            if args.trim:
                img = trim_transparent(img)
            img.save(out_path)
            print(f"[{idx}/{total}] ✓  {f.name}  ->  {out_path.name}  ({img.width}x{img.height})")
            done += 1
        except Exception as e:  # noqa: BLE001
            print(f"[{idx}/{total}] ✗  HIBA: {f.name} – {e}")
            failed += 1

    print(f"\nKész. {done} feldolgozva, {skipped} kihagyva, {failed} hiba.")
    print(f"Kimenet: {out_dir.resolve()}")


if __name__ == "__main__":
    main()

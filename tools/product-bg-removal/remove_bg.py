#!/usr/bin/env python3
"""
Termékfotó háttér-eltávolító + web-méretező batch script (rembg / BiRefNet).

Egy input mappa képeiről leszedi a hátteret, és átlátszó PNG/WebP-t ment az
output mappába. Termékfotókhoz: opcionális körbevágás (--trim), négyzetes
vászonra igazítás (--square), több webshop-méret egyszerre (--sizes), és
WebP kimenet (--webp).

Használat:
    pip install -r requirements.txt
    python remove_bg.py                                  # input/ -> output/ (BiRefNet)
    python remove_bg.py --trim                           # + felesleges szél levágása
    python remove_bg.py --trim --square --sizes 1200,600,300 --webp
                                                         # webshop-kész: 3 négyzetes WebP méret
    python remove_bg.py --model u2net                    # gyorsabb, kisebb modell
    python remove_bg.py --overwrite                      # meglévők újrafeldolgozása

Első futáskor letölti a kiválasztott modellt (birefnet-general ~1 GB;
u2net ~170 MB) a ~/.u2net mappába. Utána offline is működik.
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


def fit_size(img: "Image.Image", size: int, square: bool, pad_ratio: float = 0.04) -> "Image.Image":
    """Átméretezés `size` px-re. square=True: size×size átlátszó vászonra, a
    termék középre igazítva, kis belső margóval. square=False: a hosszabb oldal
    lesz `size` (arány megtartva, felfelé nem nagyítunk)."""
    w, h = img.size
    if square:
        margin = int(size * pad_ratio)
        target = max(1, size - 2 * margin)
        scale = min(target / w, target / h)
        nw, nh = max(1, round(w * scale)), max(1, round(h * scale))
        resized = img.resize((nw, nh), Image.LANCZOS)
        canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        canvas.paste(resized, ((size - nw) // 2, (size - nh) // 2), resized)
        return canvas
    scale = min(size / w, size / h, 1.0)
    return img.resize((max(1, round(w * scale)), max(1, round(h * scale))), Image.LANCZOS)


def out_name(stem: str, size, ext: str) -> str:
    return f"{stem}_{size}.{ext}" if size else f"{stem}.{ext}"


def main() -> None:
    ap = argparse.ArgumentParser(description="Termékfotó háttér-eltávolító + web-méretező (rembg).")
    ap.add_argument("-i", "--input", default="input", help="Bemeneti mappa (alap: input)")
    ap.add_argument("-o", "--output", default="output", help="Kimeneti mappa (alap: output)")
    ap.add_argument("--model", default="birefnet-general",
                    help="rembg modell: birefnet-general (alap, legpontosabb élek – nagyobb/lassabb), "
                         "u2net (gyorsabb, sok képhez), isnet-general-use, u2netp, ...")
    ap.add_argument("--alpha-matting", action="store_true",
                    help="Finomabb élek (lassabb, jobb hajszál/áttetsző részekre)")
    ap.add_argument("--trim", action="store_true",
                    help="Átlátszó szél levágása + egységes keret (termékfotóhoz ajánlott)")
    ap.add_argument("--square", action="store_true",
                    help="Négyzetes vászonra igazítás, termék középre (egységes termékkártyákhoz)")
    ap.add_argument("--sizes", default="",
                    help="Kimeneti méret(ek) px-ben, vesszővel: pl. 1200,600,300. "
                         "Üresen az eredeti (kivágott) méret marad.")
    ap.add_argument("--webp", action="store_true",
                    help="WebP kimenet PNG helyett (kisebb fájl, web-optimalizált)")
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

    try:
        sizes = [int(s) for s in args.sizes.split(",") if s.strip()] or [None]
    except ValueError:
        sys.exit(f"Hibás --sizes érték: {args.sizes!r}. Példa: --sizes 1200,600,300")
    ext = "webp" if args.webp else "png"

    session = new_session(args.model)
    total = len(files)
    done = skipped = failed = 0

    flags = [args.model]
    if args.alpha_matting:
        flags.append("alpha-matting")
    if args.trim:
        flags.append("trim")
    if args.square:
        flags.append("square")
    if sizes != [None]:
        flags.append("sizes=" + ",".join(map(str, sizes)))
    flags.append(ext)
    print(f"{total} kép feldolgozása ({', '.join(flags)})...\n")

    for idx, f in enumerate(files, 1):
        first_out = out_dir / out_name(f.stem, sizes[0], ext)
        if first_out.exists() and not args.overwrite:
            print(f"[{idx}/{total}] –  kihagyva (már létezik): {f.name}")
            skipped += 1
            continue
        try:
            result = remove(f.read_bytes(), session=session, alpha_matting=args.alpha_matting)
            img = Image.open(io.BytesIO(result)).convert("RGBA")
            if args.trim:
                img = trim_transparent(img)

            saved = []
            for size in sizes:
                out_img = fit_size(img, size, args.square) if size else img
                op = out_dir / out_name(f.stem, size, ext)
                if args.webp:
                    out_img.save(op, "WEBP", quality=90, method=6)
                else:
                    out_img.save(op)
                saved.append(f"{op.name} ({out_img.width}x{out_img.height})")

            print(f"[{idx}/{total}] ✓  {f.name}  ->  " + ", ".join(saved))
            done += 1
        except Exception as e:  # noqa: BLE001
            print(f"[{idx}/{total}] ✗  HIBA: {f.name} – {e}")
            failed += 1

    print(f"\nKész. {done} feldolgozva, {skipped} kihagyva, {failed} hiba.")
    print(f"Kimenet: {out_dir.resolve()}")


if __name__ == "__main__":
    main()

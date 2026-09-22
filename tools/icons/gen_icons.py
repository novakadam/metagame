"""Metagame kategória-piktogramok generálása (24×24, stroke 1.5, currentColor)."""
import math, os, sys
from shapely.geometry import Polygon, LineString, Point, box, MultiLineString, GeometryCollection
from shapely.ops import unary_union
from shapely import affinity

OUT = sys.argv[1]
os.makedirs(OUT, exist_ok=True)
GAP = 1.1  # takarásnál ennyivel marad el a hátsó vonal az elülső körvonaltól

HEAD = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" '
        'stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">')


def f(v):
    s = f"{v:.2f}".rstrip("0").rstrip(".")
    return "0" if s in ("-0", "") else s


def lines_of(g):
    if g.is_empty:
        return []
    if isinstance(g, LineString):
        return [g]
    if isinstance(g, (MultiLineString, GeometryCollection)):
        out = []
        for p in g.geoms:
            out += lines_of(p)
        return out
    return []


def to_path(lines):
    d = []
    for ln in lines:
        ln = ln.simplify(0.03)
        cs = list(ln.coords)
        if len(cs) < 2 or ln.length < 0.15:
            continue
        closed = cs[0] == cs[-1]
        pts = cs[:-1] if closed else cs
        d.append("M" + " L".join(f"{f(x)} {f(y)}" for x, y in pts) + ("Z" if closed else ""))
    return "".join(d)


def rrect(x, y, w, h, r):
    return box(x + r, y + r, x + w - r, y + h - r).buffer(r, quad_segs=6)


def write(name, body):
    svg = HEAD + body + "</svg>\n"
    with open(os.path.join(OUT, name + ".svg"), "w") as fh:
        fh.write(svg)


def layered(items):
    """items: [(fill_polygon, [outline_lines])] hátulról előre."""
    out = []
    for i, (fill, outl) in enumerate(items):
        cover = unary_union([it[0] for it in items[i + 1:]]) if i + 1 < len(items) else None
        for ln in outl:
            g = ln if cover is None else ln.difference(cover.buffer(GAP - 0.75))
            out += lines_of(g)
    return out


def boundary_lines(poly):
    return [LineString(poly.exterior.coords)]


def fit(geoms_lines, margin=2.0):
    """Az összes vonalat a 24-es rács [margin, 24-margin] tartományába skálázza."""
    u = unary_union(geoms_lines)
    minx, miny, maxx, maxy = u.bounds
    s = (24 - 2 * margin) / max(maxx - minx, maxy - miny)
    cx, cy = (minx + maxx) / 2, (miny + maxy) / 2
    return [affinity.translate(affinity.scale(l, s, s, origin=(cx, cy)), 12 - cx, 12 - cy) for l in geoms_lines]


# ── 1. Kártyák (TCG): három lap legyezőben ──────────────────────────
def cards():
    card = rrect(-3.7, -14.6, 7.4, 10.4, 1.1)  # a forgáspont a lapok alatt → az aljuk is szétnyílik
    items = []
    for ang in (-22, 0, 22):
        c = affinity.rotate(card, ang, origin=(0, 0))
        items.append((c, boundary_lines(c)))
    # hátulról előre: bal, középső, jobb
    lines = layered(items)
    lines = fit(lines, margin=2.4)
    write("mg-icon-kartya", f'<path d="{to_path(lines)}"/>')


# ── 2. Ecset (modellezés / festés) ──────────────────────────────────
def brush():
    body = (
        '<g transform="rotate(45 12 12)">'
        # sörte-fej, a hegye kicsit oldalra kunkorodik
        '<path d="M10.3 7.9C8.9 6.3 9.3 3.7 10.9 2.2C11.8 1.4 12.5 .5 12.9-.9C14.6 1 15.1 3.3 14.9 4.9C14.7 6.4 14.2 7.3 13.7 7.9Z"/>'
        # fém gyűrű + nyél, lekerekített véggel
        '<path d="M10.3 7.9L10.4 11.1C10.1 15.3 10.6 19.4 11.2 23.6A.8.8 0 0 0 12.8 23.6C13.4 19.4 13.9 15.3 13.6 11.1L13.7 7.9"/>'
        '<path d="M10.4 11.1H13.6"/>'
        '</g>'
    )
    write("mg-icon-ecset", body)


# ── 3. Meeple (társasjáték) ─────────────────────────────────────────
def meeple():
    d = ("M10.6 8.3A3.2 3.2 0 1 1 13.4 8.3"
         "C15.5 8.6 18.5 8.4 20.3 9.2C22 10 21.8 12.3 20 12.8C18.6 13.2 17.1 12.9 16.1 13.1"
         "C16.9 15.4 18.6 17.6 19.3 19.4C19.9 21 19.4 21.5 18.2 21.5H15.2"
         "C14.4 21.5 14.1 21.1 13.8 20.1C13.3 18.4 12.8 16.9 12 16.9C11.2 16.9 10.7 18.4 10.2 20.1"
         "C9.9 21.1 9.6 21.5 8.8 21.5H5.8C4.6 21.5 4.1 21 4.7 19.4C5.4 17.6 7.1 15.4 7.9 13.1"
         "C6.9 12.9 5.4 13.2 4 12.8C2.2 12.3 2 10 3.7 9.2C5.5 8.4 8.5 8.6 10.6 8.3Z")
    write("mg-icon-tarsas", f'<path d="{d}"/>')


# ── 4. Keresztbe tett kardok (szerepjáték / verseny) ────────────────
def sword(angle):
    # függőleges kard az origó körül, hegye felfelé
    blade = Polygon([(-1.7, 2.6), (-1.7, -9.4), (0, -12.4), (1.7, -9.4), (1.7, 2.6)])
    guard = rrect(-4.0, 2.6, 8.0, 2.0, 1.0)
    grip = box(-1.25, 4.6, 1.25, 7.9)
    pommel = Point(0, 9.5).buffer(1.6, quad_segs=8)
    fill = unary_union([blade, guard, grip, pommel])
    outl = [LineString(list(blade.exterior.coords)).difference(guard.buffer(-0.01))]
    outl += boundary_lines(guard)
    outl += [LineString([(-1.25, 4.6), (-1.25, 7.9)]), LineString([(1.25, 4.6), (1.25, 7.9)])]
    outl += boundary_lines(pommel)
    rot = lambda g: affinity.rotate(g, angle, origin=(0, 0))
    return rot(fill), [rot(l) for l in outl]


def swords():
    back = sword(-45)
    front = sword(45)
    lines = layered([back, front])
    lines = fit(lines, margin=2.0)
    write("mg-icon-kardok", f'<path d="{to_path(lines)}"/>')


# ── 5. Bolter (wargame) ─────────────────────────────────────────────
def bez(*pts, n=12):
    """Köbös Bézier mintavételezése (p0, c1, c2, p1)."""
    (x0, y0), (x1, y1), (x2, y2), (x3, y3) = pts
    out = []
    for i in range(n + 1):
        t = i / n; u = 1 - t
        out.append((u**3*x0 + 3*u*u*t*x1 + 3*u*t*t*x2 + t**3*x3,
                    u**3*y0 + 3*u*u*t*y1 + 3*u*t*t*y2 + t**3*y3))
    return out


def bolter():
    # Andris wargame.png vázlata alapján: vaskos tok ferde hátsó véggel, elöl lelépcsőző
    # (vastagabb) első rész, keskeny csőcsonk, tetején irányzékok és kiemelt blokk,
    # alatta markolat és hosszú, kissé előre dőlő tár. Vízszintesen rajzolva, megdöntve.
    body = Polygon([(1.0, 8.0), (17.4, 8.0), (17.4, 7.2), (22.0, 7.2), (22.0, 14.4),
                    (15.6, 14.4), (15.6, 12.8), (1.6, 12.8), (0, 10.4)])                  # tok, vastagabb eleje
    stub = Polygon([(22.0, 8.4), (25.0, 8.4), (25.0, 10.8), (22.0, 10.8)])                # csőcsonk
    rsight = Polygon([(1.8, 8.0), (1.8, 6.4), (3.4, 6.4), (3.4, 8.0)])                    # hátsó irányzék
    block = rrect(7.2, 6.2, 5.0, 2.4, 0.6)                                                # kiemelt blokk
    fsight = Polygon([(18.4, 7.2), (18.4, 5.4), (20.2, 5.4), (20.2, 7.2)])                # első irányzék
    grip = Polygon([(3.6, 12.8), (2.6, 19.6), (5.8, 20.0), (7.2, 12.8)])                  # markolat
    mag = LineString(bez((9.6, 12.8), (10.0, 15.6), (11.0, 18.4), (12.4, 20.6))
                     + [(15.0, 19.4)]
                     + bez((15.0, 19.4), (13.8, 17.4), (13.2, 15.2), (13.0, 12.8))[1:])  # hosszú tár
    # a tetején lévő elemek és a csőcsonk egybeolvad a tokkal (kicsiben úgyis összefolyna)
    shell = unary_union([body, stub, rsight, block, fsight])
    lines = [LineString(shell.exterior.coords), LineString(grip.exterior.coords), mag]
    lines[1] = lines[1].difference(body.buffer(-0.05))
    out = []
    for l in lines:
        out += lines_of(l)
    out = [affinity.rotate(l, -37, origin=(12, 12)) for l in out]
    out = fit(out, margin=1.6)
    write("mg-icon-bolter", f'<path d="{to_path(out)}"/>')


# ── Bővített készlet: saját játékos ikonok ──────────────────────────
def sword_single():
    fill, outl = sword(45)
    lines = fit(lines_of(unary_union([])) + [l for g in outl for l in lines_of(g)], margin=2.2)
    write("mg-icon-kard", f'<path d="{to_path(lines)}"/>')


def dice3d():
    # 09.17: a kis pöttyök kicsiben összefolytak → lapközepenként egy nagyobb pötty
    dots = [(12, 7.2), (7.75, 14.4), (16.25, 14.4)]
    body = ('<path d="M12 2.5L20.5 7.2V16.8L12 21.5L3.5 16.8V7.2Z"/>'
            '<path d="M3.5 7.2L12 12L20.5 7.2M12 12V21.5"/>'
            + "".join(f'<circle cx="{f(x)}" cy="{f(y)}" r="1.15" fill="currentColor" stroke="none"/>' for x, y in dots))
    write("mg-icon-kocka", body)


def d20():
    body = ('<path d="M12 2L20.7 7V17L12 22L3.3 17V7Z"/>'
            '<path d="M12 7.4L16.8 15.6H7.2Z"/>'
            '<path d="M12 2V7.4M3.3 7L12 7.4L20.7 7M3.3 7L7.2 15.6M20.7 7L16.8 15.6'
            'M3.3 17L7.2 15.6M20.7 17L16.8 15.6M7.2 15.6L12 22L16.8 15.6"/>')
    write("mg-icon-d20", body)


def chest():
    body = ('<path d="M10.3 11H4.5A1.5 1.5 0 0 0 3 12.5V18.5A1.5 1.5 0 0 0 4.5 20H19.5A1.5 1.5 0 0 0 21 18.5V12.5A1.5 1.5 0 0 0 19.5 11H13.7"/>'
            '<path d="M3 11V8.6C3 5.9 4.9 4 7.6 4H16.4C19.1 4 21 5.9 21 8.6V11"/>'
            '<path d="M7.5 4.2V9.2M16.5 4.2V9.2"/>'
            '<rect x="10.3" y="9.2" width="3.4" height="4.4" rx=".8"/>'
            '<path d="M12 11.1V11.8"/>')
    write("mg-icon-lada", body)


def paint_pot():
    body = ('<ellipse cx="12" cy="6" rx="7.5" ry="2.3"/>'
            '<path d="M4.5 6V18.5C4.5 20 7.8 21.3 12 21.3C16.2 21.3 19.5 20 19.5 18.5V6"/>'
            '<path d="M8.5 8.1V11A1 1 0 0 0 10.5 11V9.9A1 1 0 0 1 12.5 9.9V13.5A1.25 1.25 0 0 0 15 13.5V8.2"/>')
    write("mg-icon-festek", body)


def new_badge():
    pts = []
    n = 14
    for i in range(2 * n):
        r = 9.9 if i % 2 == 0 else 8.5
        a = math.pi * i / n - math.pi / 2
        pts.append((12 + r * math.cos(a), 12 + r * math.sin(a)))
    seal = "M" + " L".join(f"{f(x)} {f(y)}" for x, y in pts) + "Z"
    body = (f'<path d="{seal}"/>'
            '<path d="M7.8 10.4V13.4A1.6 1.6 0 0 0 11 13.4V10.4"/>'
            '<path d="M9.3 9.1L10.3 7.9"/>'
            '<path d="M16.2 10.4V13.4A1.7 1.7 0 0 1 12.8 13.4"/>')
    write("mg-icon-uj", body)


def club():
    # klubház: bástyafalas vár boltíves kapuval
    body = ('<path d="M4 21V5H6.4V7.5H8.53V5H10.93V7.5H13.07V5H15.47V7.5H17.6V5H20V21Z"/>'
            '<path d="M9.5 21V16.5A2.5 2.5 0 0 1 14.5 16.5V21"/>'
            '<path d="M7.2 11.2V13M16.8 11.2V13M12 10.4V12.2"/>')
    write("mg-icon-klub", body)


def collectible():
    # 09.17: pakli — hátsó lap csak kilógó kontúr, elöl képkeret szöveg nélkül
    # (a korábbi „kép + sorok” változat mobilra hajazott)
    body = ('<path d="M8.2 4.6L5.9 4.2A1.6 1.6 0 0 0 4 5.5L2.3 17.9A1.6 1.6 0 0 0 3.7 19.7L6.4 20.1"/>'
            '<rect x="8" y="2.5" width="13" height="19" rx="1.8"/>'
            '<rect x="10.5" y="5" width="8" height="11.5" rx=".6"/>')
    write("mg-icon-gyujtheto", body)


def single_card():
    # 09.17: a korábbi gyűjthető ikon (Magic-lap csillag-szimbólummal) lett a Singles
    body = ('<rect x="5.5" y="2.5" width="13" height="19" rx="1.8"/>'
            '<path d="M12 7.2Q12.7 11.3 16.8 12Q12.7 12.7 12 16.8Q11.3 12.7 7.2 12Q11.3 11.3 12 7.2Z"/>')
    write("mg-icon-singles", body)


def figure():
    body = ('<ellipse cx="12" cy="19" rx="7" ry="2.2"/>'
            '<circle cx="11" cy="5.4" r="2.3"/>'
            '<path d="M7.9 17.25L8.6 12.3C8.8 10.2 9.6 9 11 9C12.4 9 13.2 10.2 13.4 12.3L14.1 17.25"/>'
            '<path d="M13.2 11.4L16.6 10.4M16.8 3V17.45"/>')
    write("mg-icon-figura", body)


def helmet():
    # 09.17: Wargame — Andris Space Marine-sisak referenciája (kapott/wargame-clipart1852711.png)
    # alapján kézzel, szimmetrikusan: taraj, dóm, vállvért-kiszélesedés, két ferde szemlencse,
    # háromszög szájrács. A bolter kicsiben olvashatatlan volt.
    d = ("M9.4 2.5H14.6Q15.2 2.5 15.2 3.1V4C17.7 4.6 19.4 6.5 19.9 8.6V10.8L21.3 11.7Q22 12.1 22 12.9"
         "V16.7Q22 17.5 21.3 18L18.3 20.5Q17.8 20.9 17.2 21L12 21.5L6.8 21Q6.2 20.9 5.7 20.5L2.7 18"
         "Q2 17.5 2 16.7V12.9Q2 12.1 2.7 11.7L4.1 10.8V8.6C4.6 6.5 6.3 4.6 8.8 4V3.1Q8.8 2.5 9.4 2.5Z"
         "M13.1 12.1L18.7 10.9Q18.1 12.7 15.6 13.1Q14 13.3 13.1 12.1Z"
         "M10.9 12.1L5.3 10.9Q5.9 12.7 8.4 13.1Q10 13.3 10.9 12.1Z"
         "M12 14.2C13.3 14.2 14.7 16.9 14.9 19.3H9.1C9.3 16.9 10.7 14.2 12 14.2Z")
    write("mg-icon-sisak", f'<path d="{d}"/>')


# ── Díszkeret (rombusz + kör + tengelyirányú díszek), 64×64 ─────────
def badge_frame():
    c, R, r_in, rc = 32, 30.5, 26.6, 18.4
    def diamond(rad):
        return f"M{c} {f(c-rad)}L{f(c+rad)} {c}L{c} {f(c+rad)}L{f(c-rad)} {c}Z"
    orn = []
    for ang in (0, 90, 180, 270):
        # a tengely mentén a kör felől a csúcs felé: villa, szár, rombusz-pötty
        g = []
        g.append(f'<path d="M{c} {f(c-rc-.2)}V{f(c-rc-3.1)}"/>')                                      # szár
        g.append(f'<path d="M{f(c-1.3)} {f(c-rc-.3)}Q{c} {f(c-rc-1.6)} {f(c+1.3)} {f(c-rc-.3)}"/>')  # villa
        d0 = c - rc - 5.4
        g.append(f'<path d="M{c} {f(d0-1)}L{f(c+.8)} {f(d0)}L{c} {f(d0+1)}L{f(c-.8)} {f(d0)}Z" fill="currentColor"/>')
        orn.append(f'<g transform="rotate({ang} {c} {c})">' + "".join(g) + "</g>")
    svg = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" '
           'stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">'
           f'<path class="mg-badge__ground" d="{diamond(R)}" fill="var(--mg-badge-bg, #2A0020)" stroke-width="1.6"/>'
           f'<path d="{diamond(r_in)}" stroke-width=".7"/>'
           f'<circle cx="{c}" cy="{c}" r="{rc}" stroke-width="1.2"/>'
           + "".join(orn) + "</svg>\n")
    with open(os.path.join(OUT, "mg-badge-frame.svg"), "w") as fh:
        fh.write(svg)


cards(); brush(); meeple(); swords(); bolter()
sword_single(); club(); collectible(); single_card(); figure(); dice3d(); d20(); chest(); paint_pot(); new_badge(); helmet(); badge_frame()
print("ok", sorted(os.listdir(OUT)))

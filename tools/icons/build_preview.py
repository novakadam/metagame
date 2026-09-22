"""Előnézeti oldal a Metagame ikonokhoz (az icons/ mappából)."""
import re, sys, json

ICONS, OUT = sys.argv[1], sys.argv[2]
LUC = set(json.load(open(sys.argv[3])).values())


def inner(name):
    t = re.sub(r"<!--.*?-->", "", open(f"{ICONS}/mg-icon-{name}.svg").read()).strip()
    return re.sub(r"^<svg[^>]*>", "", t).replace("</svg>", "")


def icon(name, cls="ic"):
    return (f'<svg class="{cls}" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
            f'stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">{inner(name)}</svg>')


FRAME = re.sub(r"^<svg[^>]*>", "", open(f"{ICONS}/mg-badge-frame.svg").read().strip()).replace("</svg>", "")


def ring(name):
    return ('<svg class="ringsvg" aria-hidden="true" viewBox="0 0 64 64" fill="none">'
            '<circle cx="32" cy="32" r="30" fill="var(--mg-badge-bg)" stroke="currentColor" stroke-width="1.4"/>'
            f'<svg class="ic" x="13" y="13" width="38" height="38" viewBox="0 0 24 24" fill="none" '
            f'stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">{inner(name)}</svg></svg>')


def badge(name):
    return ('<svg class="badge" aria-hidden="true" viewBox="0 0 64 64" fill="none" stroke="currentColor" '
            f'stroke-width="1" stroke-linecap="round" stroke-linejoin="round">{FRAME}'
            f'<svg class="ic" x="15.8" y="15.8" width="32.4" height="32.4" viewBox="0 0 24 24" fill="none" '
            f'stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">{inner(name)}</svg></svg>')


CATS = [
    ("kartya", "TCG"), ("tarsas", "Társasjáték"), ("gyujtheto", "Gyűjthető kártya"),
    ("kocka", "Kiegészítők"), ("d20", "Szerepjátékok"), ("sisak", "Wargame"),
    ("ecset", "Modellezés"), ("figura", "Figurák"),
    ("kardok", "Események"), ("klub", "Klub"), ("tudastar", "Tudástár"), ("trofea", "Liga"),
    ("singles", "Singles"), ("galeria", "Galéria"),
]
SHOP_N = 8  # az első 8 a Shop blokk, a többi a Közösség

SET = [
    ("kartya", "Kártyák"), ("kocka", "Dobókocka"), ("kategoriak", "Kategóriák"), ("festek", "Festék"),
    ("pajzs", "Pajzs"), ("kard", "Kard"), ("ecset", "Ecset"), ("bolter", "Bolter"), ("sisak", "Sisak"),
    ("tarsas", "Társasjáték"), ("d20", "D20"), ("lada", "Kincsesláda"), ("kosar", "Kosár"),
    ("profil", "Profil"), ("kereses", "Keresés"), ("kedvenc", "Kedvencek"), ("ajandek", "Ajándék"),
    ("cimke", "Címke"), ("akcio", "Akció"), ("naptar", "Naptár"), ("trofea", "Trófea"),
    ("uj", "Új"), ("nepszeru", "Népszerű"), ("szallitas", "Szállítás"), ("helyszin", "Helyszín"),
    ("telefon", "Telefon"), ("email", "E-mail"), ("sugo", "Súgó"), ("beallitasok", "Beállítások"),
    ("kilepes", "Kilépés"), ("ertesites", "Értesítések"), ("uzenet", "Üzenet"), ("nyelv", "Nyelv"),
    ("tudastar", "Tudástár"), ("info", "Információ"), ("kozosseg", "Közösség"), ("kiemelt", "Kiemelt"),
    ("termek", "Termék"), ("bevasarlas", "Bevásárlókosár"), ("kupon", "Kupon"), ("premium", "Prémium"),
    ("partnerek", "Partnerek"), ("rendelesek", "Rendelések"), ("szerviz", "Szerviz"), ("kezmuves", "Kézműves"),
    ("bolt", "Bolt"), ("hashtag", "Hashtag"), ("liga", "Liga"), ("videojatek", "Videójáték"),
    ("kardok", "Kardok"), ("klub", "Klub"),
]

cards = []
for n, t in CATS:
    sv = icon(n)
    cards.append(f'''<article class="cat-card">
  <div class="stage">{icon(n)}</div>
  <div class="sizes" aria-label="Méretek az oldalon">
    <figure><span class="dot d38">{sv}</span><figcaption>38 px-es kör<br>asztali menü</figcaption></figure>
    <figure><span class="dot d44">{sv}</span><figcaption>44 px-es kör<br>mobilmenü</figcaption></figure>
    <figure><span class="dot d30">{sv}</span><figcaption>30 px-es kör<br>keskeny</figcaption></figure>
    <figure><span class="dot d24">{sv}</span><figcaption>24 px-es kör<br>legkisebb</figcaption></figure>
  </div>
  <div class="meta"><h3>{t}</h3><code>mg-icon-{n}.svg</code></div>
</article>''')

showcase = "".join(f'<figure class="show">{badge(n)}<figcaption>{t}</figcaption></figure>' for n, t in CATS)
sizes_row = "".join(f'<span class="bs b{s}">{badge("kartya")}<small>{s} px</small></span>' for s in (120, 88, 64, 48))

tiles = []
for n, t in SET:
    src = "Lucide" if n in LUC else "saját"
    tiles.append(f'''<li class="tile">
  <span class="framed">{ring(n)}</span><span class="bare">{icon(n)}</span>
  <span class="tl"><span class="tn">{t}</span><span class="src src-{'luc' if src == 'Lucide' else 'own'}">{src}</span></span>
</li>''')

def navrow(items):
    return "".join(f'<li><span class="ring">{icon(n)}</span><span class="lbl">{t}</span></li>' for n, t in items)
nav = (f'<div class="navgrp"><span class="navh">Shop</span><ul class="nav">{navrow(CATS[:SHOP_N])}</ul></div>'
       f'<div class="navgrp"><span class="navh">Közösség</span><ul class="nav">{navrow(CATS[SHOP_N:])}</ul></div>')

page = f'''<title>Metagame piktogramok</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Playfair+Display+SC:wght@700&family=Playfair+Display:wght@600;700&display=swap">
<style>
:root{{
  --bg:#40022C; --sidebar:#2A0020; --card:#720A2B; --muted:#5A0E3A;
  --text:#F4F0DD; --text-muted:#D8CBAF; --gold:#B38A24; --gold-ring:#DAA415;
  --display:'Playfair Display',Georgia,serif; --sc:'Playfair Display SC','Playfair Display',Georgia,serif;
  --body:'Manrope',system-ui,-apple-system,sans-serif;
  --sw:1.5; --mg-badge-bg:#2A0020;
  color-scheme:dark;
}}
*{{box-sizing:border-box}}
body{{margin:0;background:var(--bg);color:var(--text);font:400 15px/1.55 var(--body);
  background-image:radial-gradient(ellipse 70% 40% at 50% -8%,#6b0a3f 0%,transparent 70%)}}
.wrap{{max-width:1180px;margin:0 auto;padding-inline:20px;padding-block:44px 72px;display:grid;gap:56px}}
header{{display:grid;gap:10px;max-width:70ch}}
.eyebrow,.sec-h span{{font:700 12px/1 var(--sc);letter-spacing:.18em;color:var(--gold-ring);text-transform:uppercase}}
h1{{margin:0;font:700 clamp(30px,5vw,44px)/1.1 var(--display);text-wrap:balance}}
h2{{margin:0;font:700 clamp(22px,3vw,28px)/1.15 var(--display);text-wrap:balance}}
header p,.sec-h p{{margin:0;color:var(--text-muted);max-width:68ch}}
.controls{{display:flex;flex-wrap:wrap;gap:12px 28px;margin-top:10px}}
.ctl{{display:flex;align-items:center;gap:10px}}
.ctl>span{{font:700 11px/1 var(--sc);letter-spacing:.14em;text-transform:uppercase;color:var(--gold-ring)}}
.seg{{display:inline-flex;border:1px solid var(--gold)}}
.seg button{{font:600 13px/1 var(--body);color:var(--text);background:transparent;border:0;padding:8px 14px;cursor:pointer;font-variant-numeric:tabular-nums}}
.seg button+button{{border-left:1px solid var(--gold)}}
.seg button[aria-pressed="true"]{{background:var(--gold);color:var(--sidebar)}}
.seg button:focus-visible{{outline:2px solid var(--gold-ring);outline-offset:2px}}
section{{display:grid;gap:20px}}
.sec-h{{display:grid;gap:8px}}

.ic :is(path,circle,rect,ellipse,line,polyline,polygon,g){{stroke-width:var(--sw)}}
.ic [fill="currentColor"]{{stroke-width:0}}

.cats{{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:16px}}
.cat-card{{background:var(--sidebar);border:1px solid color-mix(in srgb,var(--gold) 45%,transparent);display:grid;grid-template-rows:auto auto 1fr}}
.stage{{aspect-ratio:16/10;display:grid;place-items:center;color:#fff;background:var(--bg);border-bottom:1px solid var(--muted)}}
.stage svg{{width:132px;height:132px}}
.sizes{{display:flex;justify-content:space-between;align-items:end;gap:8px;padding:16px 18px 14px;border-bottom:1px solid var(--muted)}}
.sizes figure{{margin:0;display:grid;justify-items:center;gap:6px}}
.sizes figcaption{{font:500 10.5px/1.25 var(--body);color:var(--text-muted);text-align:center}}
.dot{{display:grid;place-items:center;border-radius:50%;background:var(--card);color:#fff;box-shadow:inset 0 0 0 1.5px var(--gold)}}
.d38{{width:38px;height:38px}} .d38 svg{{width:25px;height:25px}}
.d44{{width:44px;height:44px}} .d44 svg{{width:29px;height:29px}}
.d30{{width:30px;height:30px}} .d30 svg{{width:20px;height:20px}}
.d24{{width:24px;height:24px}} .d24 svg{{width:16px;height:16px}}
.meta{{padding:14px 18px 18px;display:grid;gap:4px;align-content:start}}
.meta h3{{margin:0;font:700 20px/1.2 var(--display)}}
.cat{{margin:0;font:700 11px/1.3 var(--sc);letter-spacing:.14em;text-transform:uppercase;color:var(--gold-ring)}}
.meta code{{justify-self:start;margin-top:8px;font:500 12px/1 ui-monospace,Menlo,monospace;color:var(--text-muted);background:var(--muted);padding:5px 7px}}

.nav{{list-style:none;margin:0;padding:18px;display:flex;flex-wrap:wrap;gap:18px 28px;background:var(--sidebar);border-block:1px solid var(--gold)}}
.navgrp{{display:grid;gap:8px}}
.navh{{font:700 11px/1 var(--sc);letter-spacing:.16em;text-transform:uppercase;color:var(--text-muted)}}
.nav li{{display:flex;align-items:center;gap:10px}}
.ring{{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;color:var(--text);background:var(--bg);box-shadow:0 0 0 2px var(--gold),0 0 0 4px var(--sidebar),0 0 0 5px color-mix(in srgb,var(--gold) 50%,transparent)}}
.ring svg{{width:25px;height:25px}}
.lbl{{font:600 13px/1 var(--body);letter-spacing:.06em;text-transform:uppercase}}

.badge,.ringsvg{{display:block;width:100%;height:auto;color:var(--gold-ring)}}
.badge .ic,.ringsvg .ic{{color:var(--text)}}
.badge .ic{{color:var(--text)}}
.showcase{{display:flex;flex-wrap:wrap;gap:12px 20px;padding:24px;background:#1c0016;border:1px solid var(--muted)}}
.show{{margin:0;width:132px;display:grid;justify-items:center;gap:6px}}
.show figcaption{{font:600 12px/1.2 var(--body);letter-spacing:.06em;text-transform:uppercase;color:var(--text-muted)}}
.bsizes{{display:flex;flex-wrap:wrap;align-items:end;gap:20px}}
.bs{{display:grid;justify-items:center;gap:6px}}
.bs small{{font:500 11px/1 var(--body);color:var(--text-muted);font-variant-numeric:tabular-nums}}
.b120{{width:120px}} .b88{{width:88px}} .b64{{width:64px}} .b48{{width:48px}}

.set{{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:10px}}
.tile{{display:grid;justify-items:center;align-content:start;gap:8px;padding:14px 8px 12px;background:var(--sidebar);border:1px solid var(--muted)}}
.framed{{width:88px}}
.bare{{width:88px;height:88px;display:grid;place-items:center;color:var(--text)}}
.bare svg{{width:40px;height:40px}}
.set[data-mode="framed"] .bare, .set[data-mode="bare"] .framed{{display:none}}
.tl{{display:grid;justify-items:center;gap:4px;text-align:center}}
.tn{{font:600 13px/1.2 var(--body)}}
.src{{font:600 10px/1 var(--body);letter-spacing:.08em;text-transform:uppercase;padding:3px 6px;border:1px solid}}
.src-own{{color:var(--gold-ring);border-color:var(--gold)}}
.src-luc{{color:var(--text-muted);border-color:var(--muted)}}
@media (max-width:480px){{.stage svg{{width:130px;height:130px}} .show{{width:44%}} .set{{grid-template-columns:repeat(auto-fill,minmax(100px,1fr))}} .framed,.bare{{width:76px}}}}
</style>
<div class="wrap">
<header>
  <span class="eyebrow">Metagame · ikonok · 6. kör (09.22)</span>
  <h1>Piktogramok Andris vázlatai alapján</h1>
  <p>Egységes vonalas készlet: 24 × 24-es rács, lekerekített vonalvégek, <code>currentColor</code>. Az ikonok az oldal szövegszínét öröklik, így ugyanaz a fájl fehér a lila háttéren és arany a keretben.</p>
  <div class="controls">
    <div class="ctl"><span>Vonal</span>
      <div class="seg" role="group" aria-label="Vonalvastagság">
        <button type="button" id="sw150" data-sw="1.5" aria-pressed="true">1.5</button>
        <button type="button" id="sw125" data-sw="1.25" aria-pressed="false">1.25</button>
        <button type="button" id="sw100" data-sw="1" aria-pressed="false">1</button>
      </div>
    </div>
  </div>
</header>

<section>
  <div class="sec-h"><span>Főmenü</span><h2>A 14 főmenüpont ikonja, valós méretben</h2></div>
  <div class="cats">{"".join(cards)}</div>
  {nav}
</section>

<section>
  <div class="sec-h"><span>Díszkeret</span><h2>Rombusz, kör és díszek a tengelyeken</h2></div>
  <div class="showcase">{showcase}</div>
  <div class="bsizes" aria-label="Keret méretei">{sizes_row}</div>
</section>

<section>
  <div class="sec-h"><span>Bővített készlet</span><h2>Minden ikon, ami a webshopban kellhet</h2>
    <p>A játékos ikonokat saját rajzként készítettem, az általánosak a Lucide készletből jönnek (ISC licenc), 1.5-ös vonallal.</p>
    <div class="ctl"><span>Nézet</span>
      <div class="seg" role="group" aria-label="Nézet">
        <button type="button" id="mode-framed" data-mode="framed" aria-pressed="true">Körben</button>
        <button type="button" id="mode-bare" data-mode="bare" aria-pressed="false">Keret nélkül</button>
      </div>
    </div>
  </div>
  <ul class="set" id="set" data-mode="framed">{"".join(tiles)}</ul>
</section>
</div>
<script>
(function(){{
  function group(sel, fn){{
    var btns=document.querySelectorAll(sel);
    btns.forEach(function(b){{b.addEventListener('click',function(){{
      fn(b); btns.forEach(function(x){{x.setAttribute('aria-pressed',String(x===b));}});
    }});}});
  }}
  group('[data-sw]',function(b){{document.documentElement.style.setProperty('--sw',b.dataset.sw);}});
  group('[data-mode]',function(b){{document.getElementById('set').dataset.mode=b.dataset.mode;}});
}})();
</script>
'''
open(OUT, "w").write(page)
print("ok", len(SET))

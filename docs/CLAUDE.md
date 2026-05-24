# Metagame – Claude Code kontextus

> Ezt a fájlt Claude Code minden session elején automatikusan beolvassa.

## Stack – szigorúan tartandó
- **Layout:** Bootstrap 5
- **JS:** jQuery – nincs React, Vue, Angular, semmi modern framework
- **CSS:** vanilla CSS custom properties (design tokenek)
- **Backend:** Java + Thymeleaf template rendszer
- **Képek:** WebP formátum
- **Build tool:** nincs – Live Server elegendő

## Widget struktúra – minden komponens így épül fel
```
widgets/
└── widget-neve/
    ├── template.html   ← tiszta Bootstrap-barát HTML
    ├── style.css       ← dedikált CSS, csak design tokeneket használ
    └── script.js       ← saját jQuery logika
```

## Class névadás
- Minden class `mg-` prefixszel kezdődik (pl. `mg-frame`, `mg-nav-left`)

## JavaScript szabály – kritikus!
- **Ne használj ID selectorokat** – csak class és data attribútumok
- Az ID-k dinamikusan generálódnak a Thymeleaf template-ben
- Helyes: `$('.mg-nav-item')` vagy `$('[data-target="shop"]')`
- Helytelen: `$('#nav-item-1')`

## Backend kommentek
Ahol dinamikus adat kell, jelöld így:
```html
<!-- BACKEND: product.name -->
<!-- BACKEND: cart.count -->
```

## Kódminőség
- Tiszta, jól kommentált, karbantartható
- Nem verbose AI-output
- Laci (backend fejlesztő) hosszú távon tartja karban

## Figma
- Figma MCP be van kötve – használd a pontos értékek lekéréséhez
- Fájl: metagame-Frontend-build
- Komponensek: Components oldalon, pl. "Content / Home / Hero"
- Design tokenek: Themes/Metagame collection

## Gomb rendszer – KÖTELEZŐ használni!

Minden gomb a `site/css/components/buttons.css` fájlban van definiálva. **Új gomb stílust NE hozz létre komponens CSS-ben** – mindig a meglévő `.mg-btn` variánsokat használd.

```
Alap class:  .mg-btn  (mindig kell)
```

| Variáns         | Mikor használd                                  |
|-----------------|------------------------------------------------|
| `--filled`      | Elsődleges CTA (arany háttér, fehér szöveg)    |
| `--outline`     | Másodlagos akció (átlátszó, arany keret)       |
| `--glow`        | Kiemelt akció, ajánló kártya (gradient + fény) |
| `--soft`        | Visszafogott, pl. navigáció (halvány háttér)   |
| `--icon`        | Kör alakú, csak ikon (32px, kosár/kedvenc)     |

Méret módosító: `--sm` (36px magasság, kisebb padding)

Példa:
```html
<a class="mg-btn mg-btn--filled" href="#">Gomb szöveg</a>
<button class="mg-btn mg-btn--icon"><svg>…</svg></button>
```

Ha új gomb típusra van szükség, először a `buttons.css`-be add hozzá új variánsként.

## Referencia fájlok
- Design tokenek: `site/css/tokens.css`
- Design system részletek: `docs/design-system.md`
- Projekt scope és döntések: `docs/prodspec.md`
- Vizuális referencia képek: `docs/screenshots/`

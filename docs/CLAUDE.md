# Metagame – Claude Code kontextus

> Ezt a fájlt Claude Code minden session elején automatikusan beolvassa.

## Stack – szigorúan tartandó
- **Layout:** Bootstrap 5
- **JS:** jQuery – nincs React, Vue, Angular, semmi modern framework
- **CSS:** vanilla CSS custom properties (design tokenek)
- **Backend:** Java + JSP – a HTML legyen JSP-kompatibilis
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

## Referencia fájlok
- Design tokenek: `site/css/tokens.css`
- Design system részletek: `docs/design-system.md`
- Projekt scope és döntések: `docs/prodspec.md`
- Vizuális referencia képek: `docs/screenshots/`

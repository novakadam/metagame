# Article body (cikktörzs) — BS template dokumentáció

**Fájl:** `site/templates/article-body.html`
**Élő minta:** http://localhost:8080/templates/article-body.html
**Élő oldal (régi, mg-* hibrid):** `site/article.html` — a teljes oldal kerettel/navval; ez a template csak a **középső cikktörzset** mutatja BS-ben.

## Scope

Csak a **dinamikus + indexelendő** rész: a cikktörzs (CMS-content). A keret, nav, footer, TOC, sidebar **nem** része — azok statikus / külön widgetek (a sidebar a `related-products.html`).

## Felépítés

| Blokk | Megoldás |
|---|---|
| **Breadcrumb** | BS `breadcrumb small` (a theme-bs.css színezi) — SEO-hoz fontos belső linkek |
| **Cím** | `h1` (csupasz) → Playfair auto |
| **Kivonat** | BS `.lead text-muted` |
| **Elválasztó** | `hr border-gold opacity-100` |
| **Meta sor** | `d-flex flex-wrap justify-content-between gap-4` — szerző (avatar + név), olvasási idő, dátum |
| **Avatar** | `avatar-md rounded-circle` (48px) + `bg-muted-mg` placeholder |
| **Hero kép** | `ratio ratio-16x9` + `object-fit-cover rounded` |
| **Cikk törzs** | `.article-content` prose wrapper — lásd lent |
| **Inline kép** | BS `figure` / `figure-img` / `figure-caption` |
| **Prev/next** | `btn btn-light` + `btn btn-outline-secondary`, `border-top border-gold` elválasztóval |

## A lényeg: `.article-content` prose wrapper

A cikk törzsét a **CMS / szerkesztő** adja nyers HTML-ként — class nélküli `<h2>`, `<p>`, `<ul>`, `<figure>`. Ezekre **nem tehetünk elemenként BS utility-t**, mert nem mi írjuk őket. Ezért a Wicket egyetlen `<div class="article-content">…</div>` blokkba teszi a tartalmat, és a wrapper stílusozza a benne lévő elemeket (theme-bs.css):

```css
.article-content { display: flex; flex-direction: column; gap: 16px; }
.article-content > h2 { font-size: var(--font-size-2xl); color: var(--color-text); margin: 8px 0 0; }
.article-content > h3 { font-size: var(--font-size-xl);  color: var(--color-text); margin: 0; }
.article-content p    { font-size: var(--font-size-xl); line-height: 1.4; color: var(--color-text-muted); margin: 0; }
.article-content ul,
.article-content ol   { font-size: var(--font-size-xl); color: var(--color-text-muted); padding-left: 1.75rem; }
.article-content li::marker { color: var(--color-gold); }  /* CUSTOM: BS-ben nincs marker-szín utility */
.article-content img  { max-width: 100%; height: auto; border-radius: var(--radius-xs); }
```

> **Ez a "prose" minta a helyes BS-first megoldás CMS rich-text-re** — nem a kerék újrafeltalálása, hanem épp az ellenkezője: a szerkesztő nyers HTML-jét egyetlen szabályhalmaz stílusozza, nem 50 utility class.

## Eltérés a régi article.css-től

- A régi `.mg-article__h2/h3` **Manrope**-ot adott a címeknek; a template-ben a heading **Playfair** (a globális BS heading override-ból) — így konzisztens a többi oldallal (BS-first szabály: heading = Playfair).
- A régi BEM classok (`mg-article__title`, `mg-article__text`…) helyett csupasz HTML + wrapper — ez felel meg a valós CMS-outputnak.

## Custom (indoklással)

| Mi | Miért nem BS |
|---|---|
| `.article-content li::marker { color: gold }` | BS-ben nincs lista-marker szín utility |
| `.border-gold` | BS-ben nincs arany szín token (lásd [chronicle-card doksi]) |

## Backend (Wicket) bekötési pontok

`<!-- BACKEND: -->` kommentek jelölik: `breadcrumb` foreach, `article.category` / `.title` / `.excerpt` / `.read_time` / `.date` / `.image`, `author` (`.avatar`, `.name`), **`article.body_html`** (a teljes rich-text, escape nélkül a `.article-content`-be), `prev_article.url`, `next_article.url`.

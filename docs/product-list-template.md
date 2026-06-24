# Product list (termék lista) — BS template dokumentáció

**Fájl:** `site/templates/product-list.html`
**Élő minta:** http://localhost:8080/templates/product-list.html
**Élő oldal (régi, mg-* hibrid):** `site/products.html` — teljes oldal kerettel/navval/szűrőpanellel.

## Scope (Laci szűrője)

Csak a **dinamikus + indexelendő** rész: a termék grid + a **nem-ajaxos pagináció**.

- **Szűrőpanel NINCS** a template-ben — Laci kifejezetten mondta: *"nem kell a szűrődoboz, mert ha végig next-next, csak az kell, hogy az előre meg a hátra paging link legyen nem ajaxos"*.
- A toolbar (rendezés, nézetváltó, szűrő-chipek) szintén kimaradt — UI, nem indexelési content.

## Termék grid

```html
<div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xxl-4 g-4">
  <div class="col d-flex">
    <div class="card mg-product-card w-100"> … </div>
  </div>
  …
</div>
```

- **BS `row-cols-*`** reszponzív rács: 1 / 2 / 3 / 4 oszlop töréspontonként (mobil → széles monitor). Tiszta BS, a régi `.mg-product-grid` CSS-grid helyett.
- **`col d-flex` + kártyán `w-100`** → a kártyák egyenlő magasak és kitöltik az oszlopot.
- A **kártya markup a `product-card.html` template-ben** van részletezve (hibrid: a kártya belső struktúra még `mg-product-card`, a badge/gomb már BS). Wicketben egyszer definiált, iterált komponens.

## Load more (a tervben ez van)

```html
<div class="d-flex flex-column align-items-center gap-2">
  <a href="?page=2" class="btn btn-secondary d-inline-flex align-items-center gap-2">
    További 24 betöltése
    <svg> … lefelé nyíl … </svg>
  </a>
  <span class="small text-muted">1 / 10 oldal</span>
</div>
```

- **„További N betöltése" gomb**, ahogy a terv (eredeti products.html) tartalmazta.
- **Progressive enhancement:** a gomb egy `<a href="?page=2">` → JS-sel ajaxosan tölt (load more élmény), JS nélkül a következő oldalra navigál. Így a load more UX ÉS a crawler-bejárhatóság (Laci igénye) egyszerre teljesül — Laci maga említette ezt a JS/no-JS megoldást.
- A számozott BS **`pagination`** mintája a `bs-components.html` katalógusban érhető el, ha valahol mégis kellene.

## Backend (Wicket) bekötési pontok

`<!-- BACKEND: -->` kommentek: `resultCount`, `products` foreach (a kártya minden mezője a product-card.html-ben), `pagination` (`current_page`, `total_pages`, `base_url` — a `pages` foreach generálja a számokat + prev/next href-eket).

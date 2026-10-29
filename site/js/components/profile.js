/* profile.js – Fiókom oldal (10.15): almenü + nézetek hash szerint
 *
 * #rendelesek  → rendelések listája
 * #rendeles-ID → egy rendelés részletei
 * #kedvencek   → kedvencek (a régi kívánságlista), ugyanaz a kártya, mint a listán
 * #kredit      → egyenleg, lejáró tételek, egyenlegtörténet
 * #adatok      → elérhetőség, cím, jelszó
 * #ertesitesek → e-mail értesítések, hírlevél, érdeklődési körök
 *
 * BACKEND: ez mind demóadat, a valódi lista a customer.* mezőkből jön.
 */

var MG_PROFILE_STATUS = {
  feldolgozas: { label: 'Feldolgozás alatt', cls: 'border-warning text-warning' },
  atveheto:    { label: 'Átvehető',          cls: 'border-success text-success' },
  uton:        { label: 'Úton',              cls: 'border-info text-info' },
  elorendeles: { label: 'Előrendelés',       cls: 'border-secondary text-gold' },
  teljesitve:  { label: 'Teljesítve',        cls: 'border-light text-muted' },
  torolve:     { label: 'Törölve',           cls: 'border-danger text-danger' }
};

var MG_PROFILE_IMG = '../assets/images/content - placeholder/product/';

var MG_PROFILE_ORDERS = [
  { id: 'MG-2026-1042', date: '2026. okt. 27.', status: 'atveheto', delivery: 'Személyes átvétel · Metagame Bolt', payment: 'Bankkártya', paid: true,
    items: [
      { name: 'Riftbound Deck', sub: 'Origins Champion Deck', qty: 1, price: 12358, img: 'riftbound-deck-transparent.png' },
      { name: 'Riftbound Booster', sub: 'Origins Booster Display (24 pack)', qty: 2, price: 12800, img: 'riftbound-leag-booster-transparent.png' }
    ], coupon: 0, credit: 1867, shipping: 0 },
  { id: 'MG-2026-1031', date: '2026. okt. 19.', status: 'uton', delivery: 'GLS futárszolgálat', payment: 'Bankkártya', paid: true, tracking: 'GLS 6040 1234 5678',
    items: [ { name: 'Magic Play Display', sub: 'Play Boosters Display', qty: 1, price: 24900, img: 'magic-play-display-transparent.png' } ],
    coupon: 2490, credit: 0, shipping: 1790 },
  { id: 'MG-2026-0998', date: '2026. okt. 2.', status: 'elorendeles', delivery: 'Személyes átvétel · Metagame Klub', payment: 'Előre utalás', paid: true, eta: 'Várható érkezés: 2026. nov. 14.',
    items: [ { name: 'Riftbound Booster', sub: 'Spiritforged Booster Display', qty: 1, price: 34990, img: 'riftbound-leag-booster-transparent.png' } ],
    coupon: 0, credit: 0, shipping: 0 },
  { id: 'MG-2026-0951', date: '2026. szept. 16.', status: 'teljesitve', delivery: 'GLS csomagautomata', payment: 'Bankkártya', paid: true,
    items: [ { name: 'Riftbound Deck', sub: 'Origins Champion Deck', qty: 2, price: 12358, img: 'riftbound-deck-transparent.png' } ],
    coupon: 0, credit: 546, shipping: 1240 },
  { id: 'MG-2026-0907', date: '2026. szept. 9.', status: 'torolve', delivery: 'Személyes átvétel · Metagame Bolt', payment: 'Készpénz a boltban', paid: false,
    items: [ { name: 'Magic Play Display', sub: 'Play Boosters Display', qty: 1, price: 24900, img: 'magic-play-display-transparent.png' } ],
    coupon: 0, credit: 0, shipping: 0 }
];

var MG_PROFILE_CREDIT = [
  { date: '2026. okt. 27. 13:44', change: -1867, reason: 'Beváltás', note: 'MG-2026-1042', order: true },
  { date: '2026. okt. 25. 21:10', change: 1000, reason: 'Versenydíj', note: 'Riftbound liga, 3. hely' },
  { date: '2026. okt. 11. 20:30', change: 867, reason: 'Jóváírás', note: 'Kompenzáció' },
  { date: '2026. szept. 16. 10:37', change: -546, reason: 'Beváltás', note: 'MG-2026-0951', order: true },
  { date: '2026. szept. 9. 11:17', change: -263, reason: 'Lejárt', note: '' }
];

var MG_PROFILE_TITLES = {
  rendelesek: 'Rendeléseim', rendeles: 'Rendelés részletei', kedvencek: 'Kedvencek',
  kredit: 'Kreditek', adatok: 'Személyes adatok', ertesitesek: 'Értesítések'
};

function mgProfilePrice(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' Ft';
}

function mgProfileCalc(o) {
  var sub = 0;
  o.items.forEach(function (it) { sub += it.price * it.qty; });
  return { sub: sub, total: sub - o.coupon - o.credit + o.shipping };
}

function mgProfileBadge(status) {
  var s = MG_PROFILE_STATUS[status];
  return '<span class="badge border ' + s.cls + '">' + s.label + '</span>';
}

/* ── RENDELÉSEK LISTA ─────────────────────────────────────── */

function mgRenderProfileOrders() {
  var html = '';
  MG_PROFILE_ORDERS.forEach(function (o) {
    var c = mgProfileCalc(o);
    var count = o.items.reduce(function (a, it) { return a + it.qty; }, 0);
    var thumbs = o.items.slice(0, 3).map(function (it) {
      return '<span class="mg-profile__item-img mg-profile__item-img--sm"><img src="' + MG_PROFILE_IMG + it.img + '" alt=""></span>';
    }).join('');

    html += '<a class="list-group-item list-group-item-action mg-profile__order" href="#rendeles-' + o.id + '">' +
      '<div class="d-none d-sm-flex gap-2 flex-shrink-0">' + thumbs + '</div>' +
      '<div class="flex-grow-1 min-w-0">' +
        '<div class="d-flex flex-wrap align-items-center gap-2 mb-1">' +
          '<span class="fw-semibold text-card">' + o.id + '</span>' + mgProfileBadge(o.status) +
        '</div>' +
        '<div class="small text-muted">' + o.date + ' · ' + count + ' termék · ' + o.delivery + '</div>' +
        (o.eta ? '<div class="small text-gold">' + o.eta + '</div>' : '') +
      '</div>' +
      '<div class="text-end flex-shrink-0">' +
        '<div class="fw-semibold text-gold text-nowrap">' + mgProfilePrice(c.total) + '</div>' +
        '<span class="small text-muted">Részletek ›</span>' +
      '</div>' +
    '</a>';
  });
  $('.mg-profile__orders').html(html);
}

/* ── RENDELÉS RÉSZLETEI ───────────────────────────────────── */

function mgRenderProfileOrder(id) {
  var o = MG_PROFILE_ORDERS.filter(function (x) { return x.id === id; })[0] || MG_PROFILE_ORDERS[0];
  var c = mgProfileCalc(o);

  /* állapot-lépések: a törölt és az előrendelés külön út */
  var steps = ['Leadva', 'Feldolgozva', o.delivery.indexOf('átvétel') !== -1 ? 'Átvehető' : 'Feladva', 'Teljesítve'];
  var reached = { feldolgozas: 1, elorendeles: 1, atveheto: 3, uton: 3, teljesitve: 4, torolve: 1 }[o.status];
  var stepsHtml = o.status === 'torolve'
    ? '<div class="alert alert-danger mb-0">Ezt a rendelést 2026. szept. 10-én töröltük, mert 24 órán belül nem lett átvéve. Ha ez tévedés, írj nekünk.</div>'
    : '<ol class="mg-profile__steps">' + steps.map(function (s, i) {
        return '<li class="' + (i < reached ? 'is-done' : '') + (i === reached - 1 ? ' is-current' : '') + '"><span>' + s + '</span></li>';
      }).join('') + '</ol>';

  var items = o.items.map(function (it) {
    return '<li class="list-group-item d-flex gap-3 py-3 px-0">' +
      '<div class="mg-profile__item-img"><img src="' + MG_PROFILE_IMG + it.img + '" alt="' + it.name + '"></div>' +
      '<div class="flex-grow-1 min-w-0">' +
        '<a class="fw-medium text-card text-decoration-none" href="product-sotet.html">' + it.name + '</a>' +
        '<div class="small text-muted">' + it.sub + '</div>' +
        '<div class="small text-muted">' + it.qty + ' db × ' + mgProfilePrice(it.price) + '</div>' +
      '</div>' +
      '<span class="fw-semibold text-gold text-nowrap">' + mgProfilePrice(it.price * it.qty) + '</span>' +
    '</li>';
  }).join('');

  var row = function (l, v, cls) {
    return '<div class="d-flex justify-content-between mb-2 ' + (cls || 'text-muted') + '"><span>' + l + '</span><span>' + v + '</span></div>';
  };

  var actions = '';
  if (o.status === 'uton') actions += '<a class="btn btn-secondary" href="#" target="_blank" rel="noopener">Csomag követése</a>';
  if (o.status === 'teljesitve' || o.status === 'torolve') actions += '<a class="btn btn-secondary" href="checkout.html">Újrarendelem</a>';
  if (o.status === 'feldolgozas' || o.status === 'elorendeles') actions += '<button class="btn btn-outline-secondary" type="button">Rendelés lemondása</button>';
  actions += '<a class="btn btn-outline-secondary" href="mailto:info@metagames.hu?subject=' + o.id + '">Kérdésem van</a>';

  $('.mg-profile__view[data-view="rendeles"]').html(
    '<a class="small text-muted text-decoration-none d-inline-block mb-3" href="#rendelesek">‹ Vissza a rendelésekhez</a>' +
    '<div class="d-flex flex-wrap align-items-center gap-2 mb-1">' +
      '<h2 class="h4 mb-0">' + o.id + '</h2>' + mgProfileBadge(o.status) +
    '</div>' +
    '<p class="small text-muted mb-4">Leadva: ' + o.date + (o.eta ? ' · <span class="text-gold">' + o.eta + '</span>' : '') + '</p>' +

    '<div class="mg-profile__card mb-4">' + stepsHtml + '</div>' +

    '<div class="row g-4">' +
      '<div class="col-md-7">' +
        '<div class="mg-profile__card h-100">' +
          '<h3 class="h5 mb-2">Termékek</h3>' +
          '<ul class="list-group list-group-flush">' + items + '</ul>' +
        '</div>' +
      '</div>' +
      '<div class="col-md-5 d-flex flex-column gap-4">' +
        '<div class="mg-profile__card">' +
          '<h3 class="h5 mb-3">Összesítő</h3>' +
          row('Részösszeg', mgProfilePrice(c.sub)) +
          (o.coupon ? row('Kupon', '−' + mgProfilePrice(o.coupon), 'text-success') : '') +
          (o.credit ? row('Beváltott kredit', '−' + mgProfilePrice(o.credit), 'text-success') : '') +
          row('Szállítási költség', o.shipping ? mgProfilePrice(o.shipping) : 'Ingyenes') +
          '<hr class="opacity-25 my-2">' +
          '<div class="d-flex align-items-center justify-content-between mt-3">' +
            '<div class="fw-semibold text-card">Teljes összeg:</div>' +
            '<div class="fs-3 fw-bold text-gold font-monospace">' + mgProfilePrice(c.total) + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="mg-profile__card">' +
          '<div class="small text-muted">Átvétel</div><div class="mb-3">' + o.delivery + (o.tracking ? '<div class="small text-muted">' + o.tracking + '</div>' : '') + '</div>' +
          '<div class="small text-muted">Fizetés</div><div>' + o.payment + ' · ' + (o.paid ? '<span class="text-success">fizetve</span>' : '<span class="text-muted">nem fizetett</span>') + '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="d-flex flex-wrap gap-3 mt-4">' + actions + '</div>'
  );
}

/* ── KREDIT TÖRTÉNET ──────────────────────────────────────── */

function mgRenderProfileCredit() {
  var html = '';
  MG_PROFILE_CREDIT.forEach(function (h) {
    var plus = h.change > 0;
    var note = h.order ? '<a href="#rendeles-' + h.note + '">' + h.note + '</a>' : h.note;
    html += '<div class="list-group-item mg-profile__credit-row">' +
      '<div class="min-w-0">' +
        '<div class="fw-medium text-card">' + h.reason + '</div>' +
        '<div class="small text-muted">' + h.date + (note ? ' · ' + note : '') + '</div>' +
      '</div>' +
      '<span class="fw-semibold text-nowrap ' + (plus ? 'text-success' : 'text-muted') + '">' + (plus ? '+' : '−') + mgProfilePrice(Math.abs(h.change)) + '</span>' +
    '</div>';
  });
  $('.mg-profile__history').html(html);
}

/* ── NÉZETVÁLTÁS ──────────────────────────────────────────── */

function mgProfileShow() {
  var hash = (location.hash || '#rendelesek').slice(1);
  var view = hash.indexOf('rendeles-') === 0 ? 'rendeles' : hash;
  if (!MG_PROFILE_TITLES[view]) view = 'rendelesek';

  if (view === 'rendeles') mgRenderProfileOrder(hash.slice('rendeles-'.length));

  $('.mg-profile__view').addClass('d-none').filter('[data-view="' + view + '"]').removeClass('d-none');
  var navView = view === 'rendeles' ? 'rendelesek' : view;
  $('.mg-profile__nav-item').removeClass('active').removeAttr('aria-current')
    .filter('[data-view="' + navView + '"]').addClass('active').attr('aria-current', 'page');
  $('.mg-profile__crumb').text(MG_PROFILE_TITLES[view]);
  document.title = MG_PROFILE_TITLES[view] + ' – Metagame (sötét demo)';

  /* a görgető sáv tetejére, ne maradjon lent az előző nézet magasságán */
  $('.mg-content').scrollTop(0);
}

function mgInitProfile() {
  mgRenderProfileOrders();
  mgRenderProfileCredit();
  if (typeof mgCreateDemoCard === 'function') {
    var $favs = $('.mg-profile__favs');
    for (var i = 0; i < 6; i++) $favs.append(mgCreateDemoCard());
    $favs.find('[aria-label="Kedvencekhez"]').addClass('active').attr('aria-label', 'Eltávolítás a kedvencekből')
      .find('path').attr('fill', 'currentColor');
  }
  mgProfileShow();
  $(window).on('hashchange', mgProfileShow);
}

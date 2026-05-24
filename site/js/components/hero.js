/**
 * hero.js – Hero szekció
 *
 * Tab-váltás, bal oldali carousel, jobb oldali ajánló szinkron.
 *
 * BACKEND: heroData placeholderből dinamikus adat lesz.
 */

function mgInitHero() {

  var $hero = $('.mg-hero');
  if (!$hero.length) return;

  var $tabs    = $hero.find('.mg-hero__tab');
  var $strip   = $hero.find('.mg-hero__cards');
  var $ajanlo  = $hero.find('.mg-hero__ajanlo-wrap');
  var $prev    = $hero.find('.mg-hero__prev');
  var $next    = $hero.find('.mg-hero__next');
  var $linkTxt = $hero.find('.mg-hero__link-text');

  /* ── Placeholder adatok ──────────────────────────────────────── */

  var P = '../assets/images/content - placeholder/';

  var heroData = {
    ujdonsagok: [
      { type: 'event',   image: P + 'events/hq720.jpg',                          title: 'Friday Night Magic',     meta: 'Péntek 18:00',  badge: 'Verseny',     highlight: 'Péntek, 18:00',  rows: [{ label: 'Helyszín', value: 'Kádár utca' },    { label: 'Férőhely', value: '8/16' }],  action: 'Jelentkezés', isNew: true },
      { type: 'product', image: P + 'product/magic-play-display.png',             title: 'Set One: Origins',       meta: '12 358 Ft',     badge: 'TCG',         highlight: '12 358 Ft',      rows: [{ label: 'Üzlet',    value: '10+' },           { label: 'Klub',     value: '0 db' }],  action: 'Kosárba',     isNew: true },
      { type: 'event',   image: P + 'events/getting-started-video-thumbnail.jpg', title: 'Pokémon League',         meta: 'Szombat 14:00', badge: 'Verseny',     highlight: 'Szombat, 14:00', rows: [{ label: 'Helyszín', value: 'Kresz G. utca' }, { label: 'Férőhely', value: '12/24' }], action: 'Jelentkezés', isNew: false },
      { type: 'product', image: P + 'product/riftbound-deck-transparent.png',     title: 'Twilight Masquerade',    meta: '5 490 Ft',      badge: 'TCG',         highlight: '5 490 Ft',       rows: [{ label: 'Üzlet',    value: '25+' },           { label: 'Klub',     value: '-10%' }],  action: 'Kosárba',     isNew: false }
    ],
    elorendelesek: [
      { type: 'product', image: P + 'product/riftbound-leag-booster-transparent.png', title: 'Prismatic Evolutions',   meta: '18 990 Ft', badge: 'Előrendelés', highlight: '18 990 Ft', rows: [{ label: 'Megjelenés', value: '2026.07.15' }, { label: 'Foglalás', value: '3/50' }],  action: 'Előrendelés', isNew: true },
      { type: 'product', image: P + 'product/magic-play-display.png',                 title: 'Duskmourne',             meta: '14 500 Ft', badge: 'Előrendelés', highlight: '14 500 Ft', rows: [{ label: 'Megjelenés', value: '2026.08.02' }, { label: 'Foglalás', value: '12/30' }], action: 'Előrendelés', isNew: false },
      { type: 'product', image: P + 'product/riftbound-deck-transparent.png',          title: 'Shrouded Fable',         meta: '6 990 Ft',  badge: 'Előrendelés', highlight: '6 990 Ft',  rows: [{ label: 'Megjelenés', value: '2026.08.20' }, { label: 'Foglalás', value: '8/40' }],  action: 'Előrendelés', isNew: false },
      { type: 'product', image: P + 'product/riftbound-leag-booster-transparent.png',  title: 'Bloomburrow Bundle',     meta: '22 990 Ft', badge: 'Előrendelés', highlight: '22 990 Ft', rows: [{ label: 'Megjelenés', value: '2026.09.01' }, { label: 'Foglalás', value: '5/20' }],  action: 'Előrendelés', isNew: true }
    ],
    versenyek: [
      { type: 'event', image: P + 'events/hq720.jpg',                                                                                                  title: 'Friday Night Magic', meta: 'Péntek 18:00',   badge: 'Standard', highlight: 'Péntek, 18:00',   rows: [{ label: 'Helyszín', value: 'Kádár utca' },    { label: 'Férőhely', value: '8/16' }],  action: 'Jelentkezés', isNew: false },
      { type: 'event', image: P + 'events/bangkok-thailand-april-13-2023-260nw-2290472761.webp',                                                        title: 'Pokémon League Cup', meta: 'Szombat 10:00',  badge: 'Verseny',  highlight: 'Szombat, 10:00',  rows: [{ label: 'Helyszín', value: 'Kresz G. utca' }, { label: 'Férőhely', value: '24/32' }], action: 'Jelentkezés', isNew: true },
      { type: 'event', image: P + 'events/bangkok-thailand-may-man-playing-magic-gathering-card-game-man-playing-magic-gathering-card-game-217638876.webp', title: 'Yu-Gi-Oh! Locals',   meta: 'Vasárnap 15:00', badge: 'Casual',   highlight: 'Vasárnap, 15:00', rows: [{ label: 'Helyszín', value: 'Kádár utca' },    { label: 'Férőhely', value: '6/12' }],  action: 'Jelentkezés', isNew: false },
      { type: 'event', image: P + 'events/DSC00180-3c36.webp',                                                                                          title: 'MTG Draft Night',    meta: 'Kedd 18:00',     badge: 'Draft',    highlight: 'Kedd, 18:00',     rows: [{ label: 'Helyszín', value: 'Kádár utca' },    { label: 'Férőhely', value: '4/8' }],   action: 'Jelentkezés', isNew: false }
    ],
    tarsasok: []
  };

  var linkLabels = {
    ujdonsagok:     'Összes újdonság',
    elorendelesek:  'Összes előrendelés',
    versenyek:      'Összes verseny',
    tarsasok:       'Összes társas'
  };

  var tab  = 'ujdonsagok';
  var idx  = 0;
  var page = 0;
  var VIS  = 2;
  var GAP  = 16;

  function items() { return heroData[tab] || []; }

  function cardW() {
    var $c = $strip.find('.mg-hero-card');
    return $c.length ? $c.first().outerWidth() : 170;
  }

  /* ── Renderelés ──────────────────────────────────────────────── */

  function renderCards() {
    var list = items();
    var h = '';
    for (var i = 0; i < list.length; i++) {
      var it = list[i];
      h += '<div class="mg-hero-card mg-hero-card--' + it.type + (i === idx ? ' mg-hero-card--active' : '') + '" data-i="' + i + '">' +
        '<div class="mg-hero-card__image">' +
          '<img src="' + it.image + '" alt="' + it.title + '">' +
        '</div>' +
        '<div class="mg-hero-card__body">' +
          '<p class="mg-hero-card__title">' + it.title + '</p>' +
          '<p class="mg-hero-card__meta">' + it.meta + '</p>' +
        '</div></div>';
    }
    $strip.html(h);
    scroll();
  }

  function renderAjanlo() {
    var it = items()[idx];
    if (!it) { $ajanlo.empty(); return; }

    var checkSvg = '<svg class="mg-ajanlo__row-icon" viewBox="0 0 16 16" fill="none" stroke="#4CAF50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3.5 3.5L13 5"/></svg>';
    var xSvg = '<svg class="mg-ajanlo__row-icon" viewBox="0 0 16 16" fill="none" stroke="#FF4400" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l8 8M12 4l-8 8"/></svg>';

    var rows = '';
    for (var i = 0; i < it.rows.length; i++) {
      var r = it.rows[i];
      var icon = (r.value === '0 db' || r.value === '0db') ? xSvg : checkSvg;
      rows += '<div class="mg-ajanlo__row">' +
        '<span class="mg-ajanlo__row-label">' + icon + r.label + '</span>' +
        '<span class="mg-ajanlo__row-value">' + r.value + '</span></div>';
    }

    var heartSvg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';

    var newBadge = it.isNew
      ? '<span class="mg-badge-new"><span class="mg-badge-new__text">új</span></span>'
      : '';
    var favBtn = '<button class="mg-badge-fav" aria-label="Kedvenc"><span class="mg-badge-fav__inner">' + heartSvg + '</span></button>';

    $ajanlo.html(
      '<div class="mg-ajanlo mg-ajanlo--' + it.type + '">' +
        newBadge +
        favBtn +
        '<div class="mg-ajanlo__inner">' +
          '<div class="mg-ajanlo__image">' +
            '<img src="' + it.image + '" alt="' + it.title + '">' +
          '</div>' +
          '<div class="mg-ajanlo__info">' +
            '<span class="mg-ajanlo__badge">' + it.badge + '</span>' +
            '<h3 class="mg-ajanlo__title">' + it.title + '</h3>' +
            '<p class="mg-ajanlo__subtitle">' + (it.type === 'event' ? 'Következő esemény' : 'Kiemelt termék') + '</p>' +
          '</div>' +
          '<div class="mg-ajanlo__details">' +
            '<div class="mg-ajanlo__highlight">' + it.highlight + '</div>' +
            '<div class="mg-ajanlo__rows">' + rows + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="mg-ajanlo__action">' +
          '<a class="mg-btn mg-btn--glow" href="#">' + it.action + '</a>' +
        '</div>' +
      '</div>'
    );
  }

  /* ── Carousel vezérlés ───────────────────────────────────────── */

  var $carousel = $hero.find('.mg-hero__carousel');

  function scroll() {
    var w = cardW();
    var off = page * (w + GAP);
    $strip.stop().animate({ 'margin-left': -off }, 300, 'swing');
    $prev.attr('hidden', idx <= 0 ? '' : null);
    $next.attr('hidden', idx >= items().length - 1 ? '' : null);
    $carousel.toggleClass('mg-hero__carousel--has-prev', page > 0);
  }

  function setIdx(i, animate) {
    idx = i;
    $strip.find('.mg-hero-card').removeClass('mg-hero-card--active')
      .filter('[data-i="' + i + '"]').addClass('mg-hero-card--active');

    if (animate) {
      $ajanlo.addClass('mg-hero__ajanlo-wrap--exiting');
      setTimeout(function () {
        renderAjanlo();
        $ajanlo.removeClass('mg-hero__ajanlo-wrap--exiting');
      }, 300);
    } else {
      renderAjanlo();
    }

    if (idx >= page + VIS) { page = idx - VIS + 1; scroll(); }
    if (idx < page)        { page = idx; scroll(); }
  }

  function switchTab(t) {
    tab  = t;
    idx  = 0;
    page = 0;
    $tabs.removeClass('mg-hero__tab--active')
      .filter('[data-tab="' + t + '"]').addClass('mg-hero__tab--active');
    $linkTxt.text(linkLabels[t]);
    renderCards();
    renderAjanlo();
  }

  /* ── Események ───────────────────────────────────────────────── */

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(autoStep, AUTO_MS);
  }

  $tabs.on('click', function () {
    switchTab($(this).data('tab'));
    resetAuto();
  });

  $strip.on('click', '.mg-hero-card', function () {
    setIdx(+$(this).data('i'), true);
    resetAuto();
  });

  $next.on('click', function () {
    if (idx < items().length - 1) setIdx(idx + 1, true);
    resetAuto();
  });

  $prev.on('click', function () {
    if (idx > 0) setIdx(idx - 1, true);
    resetAuto();
  });

  /* ── Auto-play (5 mp-ként léptet, animált váltás) ───────────── */

  var AUTO_MS = 5000;
  var autoTimer;

  function autoStep() {
    var next = (idx + 1) % items().length;
    if (next < page) { page = next; scroll(); }
    if (next >= page + VIS) { page = next - VIS + 1; scroll(); }
    setIdx(next, true);
  }

  autoTimer = setInterval(autoStep, AUTO_MS);

  /* ── Indítás ─────────────────────────────────────────────────── */

  renderCards();
  renderAjanlo();
}

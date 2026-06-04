/**
 * testimonials.js – Vélemények carousel
 *
 * Bal oldali nyilakkal léptethető kártya carousel.
 * 3 kártya látható egyszerre, margin-left animációval léptet.
 *
 * BACKEND: testimonials placeholder → dinamikus adat.
 */

function mgInitTestimonials() {

  var $section = $('.mg-testimonials');
  if (!$section.length) return;

  var $strip = $section.find('.mg-testimonials__cards');
  var $prev  = $section.find('.mg-testimonials__nav-btn--prev');
  var $next  = $section.find('.mg-testimonials__nav-btn--next');

  /* ── Placeholder adatok ──────────────────────────────────────── */

  var testimonials = [
    { name: 'Dani',    role: 'Magic játékos',    stars: 4.5, quote: '„Az első draftom óta ide járok. Jó a hangulat, segítőkészek az emberek, és mindig van kivel játszani."' },
    { name: 'Bence',   role: 'Pokémon gyűjtő',   stars: 4.5, quote: '„Ritka kártyákat is találtam már itt, és mindig szólnak, ha jön valami új. Nekem ez a go-to hely."' },
    { name: 'Anna',    role: 'Kezdő játékos',     stars: 4.5, quote: '„Teljesen kezdőként mentem be, de mindenben segítettek. Azóta rendszeresen járok társasozni."' },
    { name: 'Márk',    role: 'Yu-Gi-Oh! rajongó', stars: 5,   quote: '„A locals közösség fantasztikus. Minden héten jövök, és mindig tanulok valami újat a tapasztaltabbaktól."' },
    { name: 'Petra',   role: 'Társas rajongó',     stars: 4.5, quote: '„Hatalmas társasjáték-választék és mindig lehet próbálni mielőtt megveszed. Ez nagyon sokat számít."' },
    { name: 'Gergő',   role: 'Warhammer festő',   stars: 5,   quote: '„A festő workshopok miatt kezdtem járni, de azóta a versenyek is beszippantottak. Szuper közösség!"' }
  ];

  var VIS = 3;
  var GAP = 24;
  var page = 0;

  function maxPage() {
    return Math.max(0, testimonials.length - VIS);
  }

  /* ── Avatar placeholder SVG ──────────────────────────────────── */

  function avatarSvg() {
    return '<svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="#022139"/><circle cx="32" cy="26" r="10" fill="#D8CBAF"/><path d="M14 54c0-9.941 8.059-18 18-18s18 8.059 18 18" fill="#D8CBAF"/></svg>';
  }

  /* ── Csillagok renderelése ───────────────────────────────────── */

  function starsSvg(rating) {
    var h = '';
    var full = Math.floor(rating);
    var hasHalf = rating % 1 >= 0.5;
    var uid = 'tstar-' + Math.random().toString(36).substr(2, 6);

    for (var i = 0; i < full; i++) {
      h += '<svg viewBox="0 0 16 16" fill="var(--color-gold)"><path d="M8 0l2.35 4.76 5.25.77-3.8 3.7.9 5.24L8 12.17l-4.7 2.3.9-5.24-3.8-3.7 5.25-.77z"/></svg>';
    }
    if (hasHalf) {
      h += '<svg viewBox="0 0 16 16"><defs><linearGradient id="' + uid + '"><stop offset="50%" stop-color="var(--color-gold)"/><stop offset="50%" stop-color="rgba(179,138,36,0.25)"/></linearGradient></defs><path d="M8 0l2.35 4.76 5.25.77-3.8 3.7.9 5.24L8 12.17l-4.7 2.3.9-5.24-3.8-3.7 5.25-.77z" fill="url(#' + uid + ')"/></svg>';
    }
    return h;
  }

  /* ── Renderelés ──────────────────────────────────────────────── */

  function render() {
    var h = '';
    for (var i = 0; i < testimonials.length; i++) {
      var t = testimonials[i];
      h += '<div class="mg-testimonial-card">' +
        '<div class="mg-testimonial-card__header">' +
          '<div class="mg-testimonial-card__avatar">' + avatarSvg() + '</div>' +
          '<div class="mg-testimonial-card__info">' +
            '<p class="fw-medium mb-0">' + t.name + '</p>' +
            '<p class="small text-muted mb-0">' + t.role + '</p>' +
          '</div>' +
        '</div>' +
        '<div class="mg-testimonial-card__stars">' + starsSvg(t.stars) + '</div>' +
        '<p class="text-muted mb-0">' + t.quote + '</p>' +
      '</div>';
    }
    $strip.html(h);
  }

  /* ── Carousel vezérlés ───────────────────────────────────────── */

  function cardW() {
    var $c = $strip.find('.mg-testimonial-card');
    return $c.length ? $c.first().outerWidth() : 270;
  }

  function scroll() {
    var w = cardW();
    var off = page * (w + GAP);
    $strip.stop().animate({ 'margin-left': -off }, 300, 'swing');
    updateButtons();
  }

  var $wrap = $section.find('.mg-testimonials__cards-wrap');

  function updateButtons() {
    $prev.prop('disabled', page <= 0);
    $next.prop('disabled', page >= maxPage());
    $wrap.toggleClass('has-fade-left', page > 0);
    $wrap.toggleClass('has-fade-right', page < maxPage());
  }

  $prev.on('click', function () {
    if (page > 0) { page--; scroll(); }
  });

  $next.on('click', function () {
    if (page < maxPage()) { page++; scroll(); }
  });

  /* ── Indítás ─────────────────────────────────────────────────── */

  render();
  updateButtons();
}

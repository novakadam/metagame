/**
 * systems.js – Világok (Systems) karusszel
 *
 * TranslateX alapú lapozás jQuery .animate()-tel.
 * Fix szélességű kártyák, 6 látszik egyszerre.
 *
 * BACKEND: brand lista dinamikusan töltődik JSP-ből.
 */

function mgInitSystems() {

  var $carousel = $('.mg-systems-carousel');
  if (!$carousel.length) return;

  var $strip = $carousel.find('.mg-brand-cards');
  var $cards = $carousel.find('.mg-brand-card');
  var $prev  = $carousel.find('.mg-carousel-prev');
  var $next  = $carousel.find('.mg-carousel-next');
  var total  = $cards.length;
  var page   = 0;

  function getCardWidth() {
    return $cards.first().outerWidth(true);
  }

  function maxPage() {
    var perPage = 6;
    return Math.max(0, Math.ceil(total / perPage) - 1);
  }

  function render() {
    var gap = 12;
    var offset = page * (getCardWidth() + gap) * 6;
    $strip.stop().animate({ 'margin-left': -offset }, 400, 'swing');
    $prev.attr('hidden', page === 0 ? '' : null);
    $next.attr('hidden', page >= maxPage() ? '' : null);
  }

  $next.on('click', function () {
    if (page < maxPage()) { page++; render(); }
  });

  $prev.on('click', function () {
    if (page > 0) { page--; render(); }
  });

  $strip.on('click', '.mg-brand-card', function () {
    $cards.removeClass('mg-brand-card--active');
    $(this).addClass('mg-brand-card--active');
  });

  render();
}

// mgInitSystems()-t a main.js hívja a widget betöltése után

/**
 * systems.js – Világok (Systems) karusszel
 *
 * Desktop: 6 kártya/oldal, margin-left lapozás.
 * Mobil:   végtelen kör-carousel, 1 kártya középen kiemelve.
 *
 * BACKEND: brand lista dinamikusan töltődik JSP-ből.
 */

function mgInitSystems() {

  var $carousel = $('.mg-systems-carousel');
  if (!$carousel.length) return;

  var $wrap  = $carousel.find('.mg-brand-cards-wrap');
  var $strip = $carousel.find('.mg-brand-cards');
  var $cards = $carousel.find('.mg-brand-card');
  var $prev  = $carousel.find('.mg-carousel-prev');
  var $next  = $carousel.find('.mg-carousel-next');
  var total  = $cards.length;
  var isMobile = window.innerWidth <= 768;

  if (isMobile) {

    /* ── Mobil: végtelen kör-carousel ── */

    var GAP = 12;
    var AUTO_MS = 3500;
    var autoTimer;
    var idx = total;       // start at first "real" card in the cloned set
    var animating = false;

    // Clone cards: [clone-set] [real-set] [clone-set]
    var cloneHtml = $strip.html();
    $strip.prepend(cloneHtml);
    $strip.append(cloneHtml);

    var $allCards = $strip.find('.mg-brand-card');

    function cardW() {
      return $allCards.first().outerWidth();
    }

    function positionAt(i, animate) {
      var w = cardW();
      var wrapW = $wrap.width();
      var center = (wrapW - w) / 2;
      var off = i * (w + GAP) - center;

      $allCards.removeClass('mg-brand-card--active');
      $allCards.eq(i).addClass('mg-brand-card--active');

      if (animate) {
        animating = true;
        $strip.stop().animate({ 'margin-left': -off }, 300, 'swing', function () {
          animating = false;
          wrapAround();
        });
      } else {
        $strip.css('margin-left', -off);
      }
    }

    function wrapAround() {
      if (idx >= total * 2) {
        idx = idx - total;
        positionAt(idx, false);
      } else if (idx < total) {
        idx = idx + total;
        positionAt(idx, false);
      }
    }

    function goTo(newIdx, animate) {
      idx = newIdx;
      positionAt(idx, animate !== false);
    }

    function resetAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(function () {
        goTo(idx + 1);
      }, AUTO_MS);
    }

    $prev.removeAttr('hidden');
    $next.removeAttr('hidden');

    $next.on('click', function () {
      if (animating) return;
      goTo(idx + 1); resetAuto();
    });

    $prev.on('click', function () {
      if (animating) return;
      goTo(idx - 1); resetAuto();
    });

    $strip.on('click', '.mg-brand-card', function () {
      if (animating) return;
      var i = $(this).index();
      if (i !== idx) { goTo(i); resetAuto(); }
    });

    /* Touch swipe */
    var touchX0, touchY0, touchML, swiping;

    $carousel.on('touchstart', function (e) {
      var t = e.originalEvent.touches[0];
      touchX0 = t.clientX;
      touchY0 = t.clientY;
      touchML = parseFloat($strip.css('margin-left')) || 0;
      swiping = null;
      $strip.stop();
    });

    $carousel[0].addEventListener('touchmove', function (e) {
      var t = e.touches[0];
      var dx = t.clientX - touchX0;
      var dy = t.clientY - touchY0;
      if (swiping === null) swiping = Math.abs(dx) > Math.abs(dy);
      if (swiping) {
        e.preventDefault();
        $strip.css('margin-left', touchML + dx);
      }
    }, { passive: false });

    $carousel.on('touchend', function (e) {
      if (!swiping) return;
      var dx = e.originalEvent.changedTouches[0].clientX - touchX0;
      if (dx < -40) {
        goTo(idx + 1);
      } else if (dx > 40) {
        goTo(idx - 1);
      } else {
        positionAt(idx, true);
      }
      resetAuto();
    });

    positionAt(idx, false);
    resetAuto();

  } else {

    /* ── Desktop: eredeti lapozás ── */

    var page = 0;

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
}

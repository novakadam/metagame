/**
 * frame.js – Metagame keret widget
 *
 * Felelősségek:
 *   - Shop / Közösség toggle: gomb active osztály + nav szekció váltás
 *
 * Bővítési pontok (BACKEND megjegyzéssel jelölve):
 *   - Aktív kategória kiemelése JSP-ből érkező state alapján
 *   - Kosár badge frissítése AJAX-szal
 */

$(function () {

  // ── SHOP / KÖZÖSSÉG TOGGLE ──────────────────────────────────────

  function updateToggleSlider($toggle) {
    var $active = $toggle.find('.mg-toggle__btn--active');
    var $slider = $toggle.find('.mg-toggle__slider');
    var inset = 4;
    $slider.css({
      left: $active.position().left + inset,
      width: $active.outerWidth() - inset * 2
    });
  }

  // Kezdeti slider pozíció
  $('.mg-toggle').each(function () { updateToggleSlider($(this)); });

  $('.mg-toggle__btn').on('click', function () {
    var $btn    = $(this);
    var target  = $btn.data('target');
    var $toggle = $btn.closest('.mg-toggle');

    // Shop / Eseménynaptár közti navigáció (prototípus — élesben BACKEND/router):
    // a másik oldalra váltás a nyitóoldalára visz (Shop → kezdőlap, Eseménynaptár → események).
    var pageMode = $toggle.data('page-mode') || $toggle.attr('data-active');
    $toggle.data('page-mode', pageMode);
    if (target !== pageMode) {
      window.location.href = target === 'community' ? 'events-sotet.html' : 'index-sotet.html';
      return;
    }

    $toggle.attr('data-active', target);

    $toggle.find('.mg-toggle__btn').removeClass('mg-toggle__btn--active');
    $btn.addClass('mg-toggle__btn--active');

    updateToggleSlider($toggle);

    // Nav szekciók váltása
    $('.mg-nav-section').addClass('mg-nav-section--hidden');
    $('.mg-nav-section[data-nav="' + target + '"]').removeClass('mg-nav-section--hidden');

    // BACKEND: navigáció tartalma itt töltődik (AJAX / JSP)
  });

  // ── AKTÍV NAV ELEM ─────────────────────────────────────────────
  // BACKEND: JSP-ből érkező currentCategory változó alapján
  // kell az adott .mg-nav-item-hez hozzáadni az mg-nav-item--active osztályt.
  // Példa: $('[data-category="tcg"]').addClass('mg-nav-item--active');

  // ── KOSÁR BADGE ────────────────────────────────────────────────
  // BACKEND: cart.count betöltésekor hívd meg:
  //   mgUpdateCartBadge(count);
  window.mgUpdateCartBadge = function (count) {
    var $badge = $('.mg-cart-badge');
    if (count > 0) {
      $badge.text(count).show();
    } else {
      $badge.hide();
    }
  };

});

/* ── KOSÁRBA TÉTEL VISSZAJELZÉSE (11.18) ─────────────────────────
   A 11.11-i meetingen: a mostani felugró üzenet nem ott jelenik meg, ahová nézünk.
   Megoldás: BS toast közvetlenül a kosár ikonja alatt (asztalon jobb felül,
   mobilon az alsó sáv kosara fölött), a kosár-badge száma közben felugrik.
   A toast 4 mp után eltűnik; egérrel fölötte a BS Toast magától megállítja az időzítőt.
   BACKEND: sikeres kosárba tétel (AJAX) után hívd:
     mgCartAdded({ name: 'Catan', img: '…/catan.jpg', qty: 1, count: 4 })
   count = a kosár új darabszáma (badge). Hiba esetén ne ezt, hanem egy
   text-bg-danger toastot (pl. „Nincs elég készlet”). */
window.mgCartAdded = function (item) {
  item = item || {};
  var $btn = $('.mg-nav-right__btn--cart:visible, .mg-mobile-bar-icons__btn--center:visible').first();

  // badge: új szám + a meglévő „pop” animáció újraindítása
  var $badge = $('.mg-nav-right__btn--cart .mg-nav-badge');
  var count = item.count || (parseInt($badge.text(), 10) || 0) + (item.qty || 1);
  $badge.text(count).removeClass('is-visible');
  void $badge[0] && $badge[0].offsetWidth;
  $badge.addClass('is-visible');

  var $area = $('.mg-cart-toast-area');
  if (!$area.length) $area = $('<div class="toast-container mg-cart-toast-area"></div>').appendTo('body');

  // hely: a látható kosár ikonhoz igazítva
  if ($btn.length) {
    var r = $btn[0].getBoundingClientRect();
    var below = r.top < window.innerHeight / 2;
    $area.toggleClass('is-above', !below);
    $area[0].style.setProperty('--mg-toast-top', (r.bottom + 12) + 'px');
    $area[0].style.setProperty('--mg-toast-bottom', (window.innerHeight - r.top + 12) + 'px');
    $area[0].style.setProperty('--mg-toast-right', Math.max(window.innerWidth - r.right - 8, 16) + 'px');
  }

  var esc = function (t) { return $('<div>').text(t || '').html(); };
  var $toast = $(
    '<div class="toast mg-cart-toast" role="status" aria-live="polite" aria-atomic="true">' +
      '<div class="toast-body d-flex align-items-center gap-3">' +
        (item.img ? '<img class="mg-cart-toast__img" src="' + esc(item.img) + '" alt="">' : '') +
        '<div class="min-w-0 flex-grow-1">' +
          '<div class="small text-success fw-semibold d-flex align-items-center gap-1">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>' +
            'Bekerült a kosárba' + ((item.qty || 1) > 1 ? ' (' + item.qty + ' db)' : '') +
          '</div>' +
          '<div class="fw-semibold text-truncate">' + esc(item.name || 'Termék') + '</div>' +
        '</div>' +
        '<button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Bezárás"></button>' +
      '</div>' +
      '<div class="d-flex gap-2 px-3 pb-3">' +
        '<button type="button" class="btn btn-secondary btn-sm flex-fill" data-action="toast-open-cart">Kosár</button>' +
        '<a class="btn btn-outline-secondary btn-sm flex-fill" href="checkout.html">Pénztár</a>' +
      '</div>' +
    '</div>');

  $area.empty().append($toast);
  var t = new bootstrap.Toast($toast[0], { delay: 4000 });
  $toast.on('hidden.bs.toast', function () { $toast.remove(); });
  t.show();
};

$(function () {
  // Demó: a Kosárba gombok (termékoldal, kártyák) a toastot mutatják navigálás helyett
  $(document).on('click', '.mg-product__add-to-cart, [data-mg-cart-add]', function (e) {
    e.preventDefault();
    var $card = $(this).closest('.mg-product-card, .card, .upsell-item');
    var name, img, qty = 1;
    if ($card.length) {
      name = $card.find('h3, h4, .mg-product-card__title, .text-card').first().text().trim();
      img = $card.find('img').first().attr('src');
    } else {
      name = $('h1').first().text().trim();
      img = $('.mg-product__gallery img, .mg-product img').first().attr('src');
      qty = parseInt($('.mg-product__qty-input').first().val(), 10) || 1;
    }
    mgCartAdded({ name: name, img: img, qty: qty });
  });
  $(document).on('click', '[data-action="toast-open-cart"]', function () {
    $('.mg-cart-toast').each(function () { var t = bootstrap.Toast.getInstance(this); if (t) t.dispose(); }).remove();
    $('.mg-nav-right__btn--cart:visible, .mg-mobile-bar-icons__btn--center:visible').first().trigger('click');
  });
});

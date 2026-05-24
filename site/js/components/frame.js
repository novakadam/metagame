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

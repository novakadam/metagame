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

  $('.mg-toggle__btn').on('click', function () {
    var $btn    = $(this);
    var target  = $btn.data('target'); // "shop" vagy "community"

    // Gomb active osztály csere
    $('.mg-toggle__btn').removeClass('mg-toggle__btn--active');
    $btn.addClass('mg-toggle__btn--active');

    // Nav szekciók váltása: a data-nav attribútum egyezik a data-target-tel
    $('.mg-nav-section').addClass('mg-nav-section--hidden');
    $('.mg-nav-section[data-nav="' + target + '"]').removeClass('mg-nav-section--hidden');

    // BACKEND: ha szükséges, itt lehet URL-t frissíteni vagy JSP-oldalt betölteni
    // pl.: window.location.hash = target;
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

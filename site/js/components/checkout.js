/* checkout.js – Metagame checkout interakció */

var mgCheckoutState = {
  delivery: 'bolt',
  payment: 'card',
  items: [
    { id: '1', name: 'Riftbound Deck',        sub: 'Origins Champion Deck',            price: 12358, qty: 1, stock: 3,  img: '../assets/images/content - placeholder/product/riftbound-deck-transparent.png',        boltOk: true,  klubOk: false },
    { id: '2', name: 'Riftbound Booster',      sub: 'Origins Booster Display (24 pack)', price: 12800, qty: 2, stock: 8,  img: '../assets/images/content - placeholder/product/riftbound-leag-booster-transparent.png', boltOk: true,  klubOk: true },
    { id: '3', name: 'Magic Play Display',     sub: 'Play Boosters Display',            price: 24900, qty: 1, stock: 25, img: '../assets/images/content - placeholder/product/magic-play-display-transparent.png',     boltOk: true,  klubOk: true }
  ]
};

function mgFormatPrice(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' Ft';
}

function mgCheckoutCalc() {
  var sub = 0;
  mgCheckoutState.items.forEach(function (it) { sub += it.price * it.qty; });
  var ship = mgCheckoutState.delivery === 'delivery' ? 1900 : 0;
  return { subtotal: sub, shipping: ship, total: sub + ship };
}

/* ── ÖSSZESÍTŐ RENDERELÉS ───────────────────────────────── */

function mgRenderSummaryItems() {
  var html = '';
  mgCheckoutState.items.forEach(function (it, i) {
    var stockBadge = it.stock <= 5
      ? '<span class="badge text-bg-warning position-absolute top-0 start-0 m-1" style="font-size:10px;">Még ' + it.stock + ' db</span>'
      : '';

    html += '<li class="list-group-item d-flex gap-3 py-3 px-0">' +
      '<div class="mg-checkout__item-img">' +
        '<img src="' + it.img + '" alt="' + it.name + '">' +
        stockBadge +
      '</div>' +
      '<div class="d-flex flex-column flex-grow-1 justify-content-between py-1" style="min-width:0;">' +
        '<div>' +
          '<div class="fw-medium small text-truncate">' + it.name + '</div>' +
          '<div class="small text-muted-mg text-truncate">' + it.sub + '</div>' +
        '</div>' +
        '<div class="d-flex align-items-center justify-content-between">' +
          '<div class="input-group input-group-sm qty-stepper">' +
            '<button class="btn btn-outline-secondary" data-action="dec" data-idx="' + i + '"' + (it.qty <= 1 ? ' disabled' : '') + '>−</button>' +
            '<input type="number" class="form-control text-center" value="' + it.qty + '" min="1" readonly>' +
            '<button class="btn btn-outline-secondary" data-action="inc" data-idx="' + i + '"' + (it.qty >= it.stock ? ' disabled' : '') + '>+</button>' +
          '</div>' +
          '<span class="fw-semibold text-gold" style="font-variant-numeric:tabular-nums;">' + mgFormatPrice(it.price * it.qty) + '</span>' +
        '</div>' +
      '</div>' +
    '</li>';
  });
  return html;
}

function mgRenderSummaryTotals() {
  var c = mgCheckoutCalc();
  var shipText = c.shipping === 0
    ? '<span class="text-success">Ingyenes</span>'
    : '<span>' + mgFormatPrice(c.shipping) + '</span>';

  return '<div class="d-flex justify-content-between small text-muted-mg mb-3"><span>Részösszeg</span><span class="text-card">' + mgFormatPrice(c.subtotal) + '</span></div>' +
    '<div class="d-flex justify-content-between small text-muted-mg mb-3"><span>Szállítás</span>' + shipText + '</div>' +
    '<hr class="my-3" style="opacity:0.3;">' +
    '<div class="d-flex align-items-center justify-content-between">' +
      '<span class="small text-muted-mg">Végösszeg</span>' +
      '<span class="fw-bold text-gold" style="font-size:var(--font-size-3xl);font-variant-numeric:tabular-nums;">' + mgFormatPrice(c.total) + '</span>' +
    '</div>';
}

function mgRefreshSummary() {
  $('.mg-checkout__items').html(mgRenderSummaryItems());
  $('.mg-checkout__totals').html(mgRenderSummaryTotals());
  $('.mg-checkout__summary-count').text(mgCheckoutState.items.length + ' termék');
}

/* ── INIT ───────────────────────────────────────────────── */

function mgInitCheckout() {

  mgRefreshSummary();

  /* Mennyiség léptető */
  $(document).on('click', '.mg-checkout__items .btn', function () {
    var $btn = $(this);
    var idx  = $btn.data('idx');
    var act  = $btn.data('action');
    var item = mgCheckoutState.items[idx];
    if (!item) return;

    if (act === 'inc' && item.qty < item.stock) item.qty++;
    if (act === 'dec' && item.qty > 1) item.qty--;

    mgRefreshSummary();
  });

  /* Átvételi mód */
  $('.mg-checkout__options--delivery').on('click', '.mg-checkout__option:not(.is-disabled)', function () {
    var method = $(this).data('method');
    mgCheckoutState.delivery = method;

    $(this).siblings().removeClass('is-selected').find('.form-check-input').prop('checked', false);
    $(this).addClass('is-selected').find('.form-check-input').prop('checked', true);

    if (method === 'delivery') {
      $('.mg-checkout__address').addClass('is-visible');
    } else {
      $('.mg-checkout__address').removeClass('is-visible');
    }

    mgRefreshSummary();
  });

  /* Fizetési mód */
  $('.mg-checkout__options--payment').on('click', '.mg-checkout__option', function () {
    var method = $(this).data('method');
    mgCheckoutState.payment = method;

    $(this).siblings('.mg-checkout__option').removeClass('is-selected').find('.form-check-input').prop('checked', false);
    $(this).addClass('is-selected').find('.form-check-input').prop('checked', true);
  });

  /* Cégként vásárlás checkbox */
  $('[data-toggle="company"]').on('change', function () {
    if ($(this).is(':checked')) {
      $('.mg-checkout__company-fields').addClass('is-visible');
    } else {
      $('.mg-checkout__company-fields').removeClass('is-visible');
    }
  });

  /* Fiók létrehozás checkbox */
  $('[data-toggle="account"]').on('change', function () {
    if ($(this).is(':checked')) {
      $('.mg-checkout__account-fields').addClass('is-visible');
    } else {
      $('.mg-checkout__account-fields').removeClass('is-visible');
    }
  });

  /* Login modal (Bootstrap Modal) */
  var loginModalEl = document.querySelector('.mg-login-modal');
  var loginModal = new bootstrap.Modal(loginModalEl);

  $('.mg-checkout__login-link').on('click', function () {
    loginModal.show();
  });

  /* Időzítő (kosár foglalás) */
  var timeLeft = 15 * 60;
  var $timer = $('.mg-checkout__timer-val');

  setInterval(function () {
    if (timeLeft <= 0) return;
    timeLeft--;
    var m = Math.floor(timeLeft / 60);
    var s = timeLeft % 60;
    $timer.text(m + ':' + (s < 10 ? '0' : '') + s);
  }, 1000);

}

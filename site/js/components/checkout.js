/* checkout.js – Metagame checkout interakció */

var mgCheckoutState = {
  delivery: 'bolt',
  payment: 'card',
  /* DEMO: bejelentkezett vásárló kredittel; kupon: METAGAME10 = 10% */
  creditBalance: 1867,
  credit: 0,
  coupon: null,
  items: [
    { id: '1', name: 'Riftbound Deck',        sub: 'Origins Champion Deck',            price: 12358, qty: 1, stock: 3,  img: '../assets/images/content - placeholder/product/riftbound-deck-transparent.png',        boltOk: true,  klubOk: false },
    { id: '2', name: 'Riftbound Booster',      sub: 'Origins Booster Display (24 pack)', price: 12800, qty: 2, stock: 8,  img: '../assets/images/content - placeholder/product/riftbound-leag-booster-transparent.png', boltOk: true,  klubOk: true },
    { id: '3', name: 'Magic Play Display',     sub: 'Play Boosters Display',            price: 24900, qty: 1, stock: 25, img: '../assets/images/content - placeholder/product/magic-play-display-transparent.png',     boltOk: true,  klubOk: true }
  ]
};

function mgFormatPrice(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' Ft';
}

var MG_DEMO_COUPONS = { 'METAGAME10': 0.10 };

function mgCheckoutCalc() {
  var st = mgCheckoutState, sub = 0;
  st.items.forEach(function (it) { sub += it.price * it.qty; });
  var ship = st.delivery === 'delivery' ? 1900 : 0;

  var coupon = st.coupon ? Math.round(sub * st.coupon.pct) : 0;
  /* a kredit legfeljebb a kupon utáni termékösszeg és az egyenleg lehet */
  var credit = Math.min(st.credit, sub - coupon, st.creditBalance);
  var disc = coupon + credit;

  /* súlyozott levonás: minden tétel a sorösszege arányában kapja a kedvezményt,
     a kerekítési maradék az utolsó tételre megy */
  var left = disc;
  var lines = st.items.map(function (it, i) {
    var line = it.price * it.qty;
    var d = i === st.items.length - 1 ? left : Math.round(disc * line / sub);
    left -= d;
    return { line: line, disc: d };
  });

  return { subtotal: sub, shipping: ship, coupon: coupon, credit: credit, lines: lines, total: sub - disc + ship };
}

/* ── ÖSSZESÍTŐ RENDERELÉS ───────────────────────────────── */

function mgRenderSummaryItems() {
  var html = '', c = mgCheckoutCalc();
  mgCheckoutState.items.forEach(function (it, i) {
    var ln = c.lines[i];
    /* beváltás után az új ár, mellette áthúzva a régi (mint az akciós kártyán) */
    var price = ln.disc > 0
      ? '<span class="mg-checkout__item-price"><span class="fw-semibold text-gold">' + mgFormatPrice(ln.line - ln.disc) + '</span>' +
        '<s class="small text-muted">' + mgFormatPrice(ln.line) + '</s></span>'
      : '<span class="fw-semibold text-gold">' + mgFormatPrice(ln.line) + '</span>';

    var stockBadge = it.stock <= 5
      ? '<span class="badge text-bg-warning position-absolute top-0 start-0 m-1 fs-7">Még ' + it.stock + ' db</span>'
      : '';

    html += '<li class="list-group-item d-flex gap-3 py-3 px-0">' +
      '<div class="mg-checkout__item-img">' +
        '<img src="' + it.img + '" alt="' + it.name + '">' +
        stockBadge +
      '</div>' +
      '<div class="d-flex flex-column flex-grow-1 justify-content-between py-1" style="min-width:0;">' +
        '<div>' +
          '<div class="fw-medium small text-truncate">' + it.name + '</div>' +
          '<div class="small text-muted text-truncate">' + it.sub + '</div>' +
        '</div>' +
        '<div class="d-flex align-items-center justify-content-between">' +
          '<div class="input-group input-group-sm qty-stepper">' +
            '<button class="btn btn-outline-secondary" data-action="dec" data-idx="' + i + '"' + (it.qty <= 1 ? ' disabled' : '') + '>−</button>' +
            '<input type="number" class="form-control text-center" value="' + it.qty + '" min="1" readonly>' +
            '<button class="btn btn-outline-secondary" data-action="inc" data-idx="' + i + '"' + (it.qty >= it.stock ? ' disabled' : '') + '>+</button>' +
          '</div>' +
          price +
        '</div>' +
      '</div>' +
    '</li>';
  });
  return html;
}

function mgRenderSummaryTotals() {
  var c = mgCheckoutCalc(), st = mgCheckoutState;
  var shipText = c.shipping === 0 ? 'Ingyenes' : mgFormatPrice(c.shipping);
  var row = function (label, val, cls) {
    return '<div class="d-flex justify-content-between mb-2' + (cls ? ' ' + cls : ' text-muted') + '"><span>' + label + '</span><span>' + val + '</span></div>';
  };

  /* Ugyanaz a markup, mint Laci közös kosár-komponensében (CartPanel.html), 10.15.
     A kupon és a kredit külön színnel (Andris, 10.15) */
  return row('Részösszeg', mgFormatPrice(c.subtotal)) +
    (c.coupon ? row('Kupon (' + st.coupon.code + ')', '−' + mgFormatPrice(c.coupon), 'text-success') : '') +
    (c.credit ? row('Beváltott kredit', '−' + mgFormatPrice(c.credit), 'text-success') : '') +
    '<div class="d-flex justify-content-between text-muted mb-3"><span>Szállítási költség</span><span>' + shipText + '</span></div>' +
    '<hr class="opacity-25 my-2">' +
    '<div class="d-flex align-items-center justify-content-between mt-3">' +
      '<div class="fw-semibold text-card">Teljes összeg:</div>' +
      '<div class="fs-2 fw-bold text-gold font-monospace">' + mgFormatPrice(c.total) + '</div>' +
    '</div>';
}

/* Kupon / kredit dobozok állapota */
function mgRenderDiscounts() {
  var st = mgCheckoutState, c = mgCheckoutCalc();
  if (st.credit && c.credit !== st.credit) st.credit = c.credit; /* kosárváltozás után a plafonra vágjuk */

  var hasCoupon = !!st.coupon;
  $('.mg-checkout__discount-form[data-discount="coupon"]').toggleClass('d-none', hasCoupon);
  $('.mg-checkout__discount-applied[data-discount="coupon"]').toggleClass('d-none', !hasCoupon).toggleClass('d-flex', hasCoupon);
  if (hasCoupon) {
    $('.mg-checkout__coupon-code').text(st.coupon.code);
    $('.mg-checkout__coupon-amount').text('−' + mgFormatPrice(c.coupon));
  }

  var hasCredit = st.credit > 0;
  $('.mg-checkout__discount-form[data-discount="credit"]').toggleClass('d-none', hasCredit);
  $('.mg-checkout__discount-applied[data-discount="credit"]').toggleClass('d-none', !hasCredit).toggleClass('d-flex', hasCredit);
  if (hasCredit) {
    $('.mg-checkout__credit-amount').text('−' + mgFormatPrice(st.credit));
    $('.mg-checkout__credit-rest').text('Marad: ' + mgFormatPrice(st.creditBalance - st.credit));
  }
}

function mgRefreshSummary() {
  $('.mg-checkout__items').html(mgRenderSummaryItems());
  $('.mg-checkout__totals').html(mgRenderSummaryTotals());
  $('.mg-checkout__summary-count').text(mgCheckoutState.items.length + ' termék');
  mgRenderDiscounts();
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

  /* Kupon */
  $('[data-action="coupon-apply"]').on('click', function () {
    var $in = $('#couponCode'), code = $.trim($in.val()).toUpperCase();
    var pct = MG_DEMO_COUPONS[code];
    $in.toggleClass('is-invalid', !pct);
    $in.closest('.mg-checkout__discount-form').toggleClass('is-invalid', !pct);
    if (!pct) return;
    mgCheckoutState.coupon = { code: code, pct: pct };
    $in.val('');
    mgRefreshSummary();
  });
  $('#couponCode').on('input', function () {
    $(this).removeClass('is-invalid').closest('.mg-checkout__discount-form').removeClass('is-invalid');
  }).on('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); $('[data-action="coupon-apply"]').trigger('click'); } });
  $('[data-action="coupon-remove"]').on('click', function () {
    mgCheckoutState.coupon = null;
    mgRefreshSummary();
  });

  /* Kredit: „Mind” a lehető legtöbbet írja be (egyenleg vagy a kupon utáni termékösszeg) */
  $('[data-action="credit-all"]').on('click', function () {
    var c = mgCheckoutCalc(), st = mgCheckoutState;
    $('#creditAmount').val(Math.min(st.creditBalance, c.subtotal - c.coupon));
  });
  $('[data-action="credit-apply"]').on('click', function () {
    var v = parseInt($('#creditAmount').val(), 10);
    if (!(v > 0)) return;
    mgCheckoutState.credit = v;
    $('#creditAmount').val('');
    mgRefreshSummary();
  });
  $('#creditAmount').on('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); $('[data-action="credit-apply"]').trigger('click'); } });
  $('[data-action="credit-remove"]').on('click', function () {
    mgCheckoutState.credit = 0;
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

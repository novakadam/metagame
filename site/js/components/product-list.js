/**
 * product-list.js – Termék lista oldal logika
 *
 * Kezeli: nézet váltás (grid/lista), rendezés, load more,
 *         szűrő chip törlés, összes törlése, és demo kártya renderelés.
 *
 * BACKEND: a kártyák Thymeleaf template-ből jönnek, a JS itt csak a demo-hoz generál.
 */

function mgInitProductList() {

  // ── NÉZET VÁLTÁS ──────────────────────────────────────────
  // Az oszlopokat a BS row-cols adja; lista nézetben 1 oszlopra váltunk
  var GRID_COLS = 'row-cols-sm-2 row-cols-lg-3 row-cols-xl-4';

  $('.mg-product-toolbar__view-btn').on('click', function () {
    var view = $(this).data('view');

    $('.mg-product-toolbar__view-btn').removeClass('is-active');
    $(this).addClass('is-active');

    var $grid = $('.mg-product-grid');
    if (view === 'list') {
      $grid.addClass('mg-product-grid--list').removeClass(GRID_COLS);
    } else {
      $grid.removeClass('mg-product-grid--list').addClass(GRID_COLS);
    }
  });

  // ── SZŰRŐ CHIP TÖRLÉS ────────────────────────────────────
  $(document).on('click', '.mg-filter-chip__close', function () {
    var label = $(this).siblings('.mg-filter-chip__label').text().trim();
    $(this).closest('.mg-filter-chip').remove();

    // Szinkronizálás: checkbox/chip visszaállítása a panelben
    $('.mg-filter-panel__checkbox.is-checked').each(function () {
      if ($(this).find('.mg-filter-panel__checkbox-label').text().trim() === label) {
        $(this).removeClass('is-checked');
      }
    });

    $('.mg-filter-panel__chip.is-active').each(function () {
      if ($(this).text().trim() === label) {
        $(this).removeClass('is-active');
      }
    });

    var remainingChips = $('.mg-product-toolbar__chips .mg-filter-chip').length;
    if (remainingChips === 0) {
      $('.mg-product-toolbar__clear').hide();
    }
  });

  // ── ÖSSZES SZŰRŐ TÖRLÉSE ─────────────────────────────────
  $('.mg-product-toolbar__clear').on('click', function (e) {
    e.preventDefault();
    $('.mg-filter-panel__checkbox').removeClass('is-checked');
    $('.mg-filter-panel__chip').removeClass('is-active');
    $('.mg-product-toolbar__chips').empty();
    $(this).hide();
  });

  // ── LOAD MORE ─────────────────────────────────────────────
  var currentPage = 1;
  var totalPages = 10;

  $('.mg-product-loadmore__btn').on('click', function () {
    currentPage++;

    // BACKEND: AJAX hívás az új termékekért
    mgRenderDemoCards(6);

    if (currentPage >= totalPages) {
      $(this).prop('disabled', true).text('Nincs több termék');
    } else {
      $(this).find('.mg-product-loadmore__btn-text')
        .text('További 24 betöltése');
    }

    $('.mg-product-loadmore__page').text('Page ' + currentPage + ' of ' + totalPages);
  });

  // ── RENDEZÉS ──────────────────────────────────────────────
  $('.mg-product-toolbar__sort-select').on('change', function () {
    // BACKEND: újra rendereli a listát az adott sorrend szerint
  });

  // ── GYORS SZŰRŐ GOMBOK ───────────────────────────────────
  $('.mg-product-toolbar__quick-filters .btn').on('click', function () {
    $('.mg-product-toolbar__quick-filters .btn')
      .removeClass('btn-secondary')
      .addClass('btn-light');
    $(this)
      .removeClass('btn-light')
      .addClass('btn-secondary');
  });

  // ── KÁRTYA KATTINTÁS → TERMÉK OLDAL ───────────────────────
  $(document).on('click', '.mg-product-card', function (e) {
    if ($(e.target).closest('.btn.rounded-circle, .mg-product-card__cta').length) return;
    window.location.href = 'product.html';
  });

  // ── KATEGÓRIA CHIPEK PROGRESSZÍV MEGJELENÍTÉS ─────────────
  var chipExpands = 0;
  var $chipContainer = $('.mg-category-chips');
  var $allChips = $chipContainer.find('.mg-category-chip');
  var $chipMore = $chipContainer.find('.mg-category-chips__more');

  function getChipStep() {
    if (window.matchMedia('(max-width: 768px)').matches) return 4;
    if (window.matchMedia('(max-width: 1024px)').matches) return 6;
    return 0;
  }

  function updateChipVisibility() {
    var step = getChipStep();
    if (step > 0 && $allChips.length > step) {
      var visible = step * (1 + chipExpands);
      $allChips.each(function (i) {
        $(this).toggle(i < visible);
      });
      $chipMore.toggle(visible < $allChips.length);
    } else {
      $allChips.show();
      $chipMore.hide();
    }
  }

  $chipMore.on('click', function () {
    chipExpands++;
    updateChipVisibility();
  });

  updateChipVisibility();
  $(window).on('resize', updateChipVisibility);

  // ── DEMO: KÁRTYÁK GENERÁLÁSA ──────────────────────────────
  mgRenderDemoCards(6);
}

/**
 * Demo termékkártyákat generál a gridbe.
 * BACKEND: ezt a Thymeleaf template helyettesíti.
 */
function mgRenderDemoCards(count) {
  var $grid = $('.mg-product-grid');

  for (var i = 0; i < count; i++) {
    var card = mgCreateDemoCard();
    $grid.append(card);
  }
}

/**
 * Demo termékadatok — Andris "debella" tesztnevei (2026.07.27. email).
 * A név 3 blokkra bontva: system (világ/rendszer) / title (max 2 sor) / variant (kiszerelés).
 * BACKEND: product.system, product.title, product.variant mezők.
 */
var MG_DEMO_PRODUCTS = [
  {
    system: 'Magic: the Gathering',
    title: 'Strixhaven: School of Mages',
    variant: 'Draft Booster',
    img: '../assets/images/content - placeholder/product/magic-play-display-transparent.png',
    price: '2 190 Ft',
    isNew: true,
    category: 'Ajánlott',
    rows: [
      { ok: true,  label: 'Üzletben elérhető', value: '10+' },
      { ok: false, label: 'Klubban nincs',     value: '0db' }
    ]
  },
  {
    system: 'Magic: the Gathering',
    title: 'FINAL FANTASY – Children of Fate',
    variant: 'Scene Box',
    img: '../assets/images/content - placeholder/product/magic-play-display.png',
    price: '24 990 Ft',
    isNew: true,
    category: 'Előrendelés',
    cta: 'Előrendelés',
    rows: [
      { ok: true, label: 'Megjelenés', value: '09.20' },
      { ok: true, label: 'Foglalás',   value: '3/50' }
    ]
  },
  {
    system: 'Társasjáték',
    title: 'Final Girl: Haunting of Creech Manor',
    variant: 'Alapjáték',
    img: '../assets/images/content - placeholder/product/riftbound-deck-transparent.png',
    price: '12 490 Ft',
    rows: [
      { ok: true, label: 'Üzletben elérhető', value: '3' },
      { ok: true, label: 'Klubban elérhető',  value: '1' }
    ]
  },
  {
    system: 'Társasjáték',
    title: 'Dune: Imperium – Uprising',
    variant: 'Kiegészítő',
    img: '../assets/images/content - placeholder/product/riftbound-leag-booster-transparent.png',
    price: '18 990 Ft',
    category: 'Akciós',
    rows: [
      { ok: true,  label: 'Üzletben elérhető', value: '5' },
      { ok: false, label: 'Klubban nincs',     value: '0db' }
    ]
  },
  {
    system: 'RPG kiegészítő',
    title: 'Kocka – RPG Diceset',
    variant: 'Blue/White',
    img: '../assets/images/content - placeholder/product/riftbound-deck-transparent.png',
    price: '4 490 Ft',
    rows: [
      { ok: true, label: 'Üzletben elérhető', value: '25+' }
    ]
  },
  {
    system: 'Riftbound',
    title: 'Set One: Origins Champion Deck – Viktor',
    variant: 'The League of Legends Deck',
    img: '../assets/images/content - placeholder/product/riftbound-leag-booster-transparent.png',
    price: '12 358 Ft',
    isNew: true,
    category: 'Ajánlott',
    rows: [
      { ok: true,  label: 'Üzletben elérhető', value: '10+' },
      { ok: false, label: 'Klubban nincs',     value: '0db' }
    ]
  }
];

var mgDemoCardIdx = 0;

function mgCreateDemoCard() {
  var p = MG_DEMO_PRODUCTS[mgDemoCardIdx % MG_DEMO_PRODUCTS.length];
  mgDemoCardIdx++;

  var cardClasses = 'card mg-product-card w-100';
  if (p.isNew) cardClasses += ' mg-product-card--new';
  if (p.category) cardClasses += ' mg-product-card--has-category';

  var okIcon = '<svg class="text-success" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8" stroke="currentColor" stroke-width="1.2"/><path d="M5.5 9l2.5 2.5 4.5-5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var noIcon = '<svg class="text-danger" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8" stroke="currentColor" stroke-width="1.2"/><path d="M6.5 6.5l5 5M11.5 6.5l-5 5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>';

  var rowsHtml = '';
  $.each(p.rows, function (i, row) {
    rowsHtml +=
      '<div class="mg-product-card__row">' +
        '<span class="mg-product-card__row-icon">' + (row.ok ? okIcon : noIcon) + '</span>' +
        '<span class="fs-7 fw-medium text-muted flex-grow-1">' + row.label + '</span>' +
        '<span class="fs-7 ' + (row.ok ? 'text-gold' : 'text-danger') + '">' + row.value + '</span>' +
      '</div>';
  });

  var categoryHtml = '';
  if (p.category) {
    categoryHtml =
      '<div class="mg-product-card__category">' +
        '<svg class="mg-product-card__category-arrow mg-product-card__category-arrow--left" width="12" height="24" viewBox="0 0 12 24" fill="currentColor"><polygon points="12,0 12,24 0,12"/></svg>' +
        '<span class="mg-product-card__category-text">' + p.category + '</span>' +
        '<svg class="mg-product-card__category-arrow mg-product-card__category-arrow--right" width="12" height="24" viewBox="0 0 12 24" fill="currentColor"><polygon points="0,0 12,12 0,24"/></svg>' +
      '</div>';
  }

  return $(
    '<div class="col d-flex">' +
      '<div class="' + cardClasses + '">' +

        (p.isNew ? '<span class="badge badge-octagon position-absolute">új</span>' : '') +
        '<button class="btn btn-outline-secondary rounded-circle position-absolute" aria-label="Kedvencekhez">' +
          '<svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M10 16.5S2 11.5 2 6.5A4 4 0 0 1 10 4.5a4 4 0 0 1 8 2c0 5-8 10-8 10z" stroke="currentColor" stroke-width="1.5"/></svg>' +
        '</button>' +

        '<div class="mg-product-card__image">' +
          '<img src="' + p.img + '" alt="' + p.title + '">' +
        '</div>' +

        '<div class="mg-product-card__info">' +
          categoryHtml +
          '<p class="mg-product-card__system">' + p.system + '</p>' +
          '<h3 class="mg-product-card__title text-clamp-2">' + p.title + '</h3>' +
          '<p class="mg-product-card__subtitle">' + p.variant + '</p>' +
        '</div>' +

        '<div class="mg-product-card__content">' +
          '<h4 class="fw-bold text-center text-white mb-0">' + p.price + '</h4>' +
          '<div class="mg-product-card__rows">' + rowsHtml + '</div>' +
        '</div>' +

        '<div class="mg-product-card__cta">' +
          '<a class="btn btn-primary" href="product.html">' + (p.cta || 'Kosárba') + '</a>' +
        '</div>' +

      '</div>' +
    '</div>'
  );
}

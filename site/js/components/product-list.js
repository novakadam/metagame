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
  $('.mg-product-toolbar__view-btn').on('click', function () {
    var view = $(this).data('view');

    $('.mg-product-toolbar__view-btn').removeClass('is-active');
    $(this).addClass('is-active');

    var $grid = $('.mg-product-grid');
    if (view === 'list') {
      $grid.addClass('mg-product-grid--list');
    } else {
      $grid.removeClass('mg-product-grid--list');
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
    if ($(e.target).closest('.mg-badge-fav, .mg-product-card__cta').length) return;
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

function mgCreateDemoCard() {
  var images = [
    '../assets/images/content - placeholder/product/riftbound-leag-booster-transparent.png',
    '../assets/images/content - placeholder/product/magic-play-display-transparent.png',
    '../assets/images/content - placeholder/product/riftbound-deck-transparent.png',
    '../assets/images/content - placeholder/product/magic-play-display.png'
  ];
  var titles = ['Set One:', 'Magic: The Gathering', 'Riftbound:', 'Magic: Play'];
  var subtitles = [
    'Origins Champion Deck - Viktor',
    'Play Booster Display - Aetherdrift',
    'The League of Legends Deck',
    'Booster Display Box'
  ];
  var prices = ['12 358 Ft', '28 990 Ft', '6 490 Ft', '34 500 Ft'];
  var idx = Math.floor(Math.random() * images.length);

  return $(
    '<div class="card mg-product-card mg-product-card--new mg-product-card--has-category">' +

      '<span class="badge badge-octagon position-absolute" style="top:-8px;left:-8px;z-index:3;">új</span>' +
      '<button class="btn btn-outline-secondary rounded-circle position-absolute top-0 end-0" style="margin:-8px -8px 0 0;z-index:3;width:36px;height:36px;padding:0;" aria-label="Kedvencekhez">' +
        '<svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M10 16.5S2 11.5 2 6.5A4 4 0 0 1 10 4.5a4 4 0 0 1 8 2c0 5-8 10-8 10z" stroke="currentColor" stroke-width="1.5"/></svg>' +
      '</button>' +

      '<img class="card-img-top" src="' + images[idx] + '" alt="' + titles[idx] + '">' +

      '<div class="card-body text-center position-relative border-bottom" style="border-color:var(--color-gold)!important;padding:28px 28px 24px;">' +
        '<span class="badge badge-ribbon">Ajánlott</span>' +
        '<h3 class="card-title mb-2">' + titles[idx] + '</h3>' +
        '<p class="card-subtitle mb-0">' + subtitles[idx] + '</p>' +
      '</div>' +

      '<div class="card-body px-4 py-0">' +
        '<p class="card-text price mb-0">' + prices[idx] + '</p>' +
        '<ul class="list-group list-group-flush">' +
          '<li class="list-group-item d-flex align-items-center gap-2 px-1">' +
            '<svg class="icon" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8" stroke="currentColor" stroke-width="1.2"/><path d="M5.5 9l2.5 2.5 4.5-5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
            '<span class="flex-grow-1">Üzletben elérhető</span>' +
            '<span class="value">10+</span>' +
          '</li>' +
          '<li class="list-group-item d-flex align-items-center gap-2 px-1">' +
            '<svg class="icon" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8" stroke="currentColor" stroke-width="1.2"/><path d="M6.5 6.5l5 5M11.5 6.5l-5 5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>' +
            '<span class="flex-grow-1">Klubban nincs</span>' +
            '<span class="value out">0db</span>' +
          '</li>' +
        '</ul>' +
      '</div>' +

      '<div class="mg-product-card__cta">' +
        '<a class="btn btn-primary" href="#">Kosárba</a>' +
      '</div>' +

    '</div>'
  );
}

/**
 * filter-panel.js – Szűrő panel interakciók
 *
 * Kezeli: checkbox toggle, chip toggle, toggle switch, "további" link,
 *         price slider (placeholder), és a szűrő változások broadcast-ját.
 */

function mgInitFilterPanel() {

  var $panel = $('.mg-filter-panel');
  if (!$panel.length) return;

  // Checkbox toggle
  $panel.on('click', '.mg-filter-panel__checkbox', function () {
    $(this).toggleClass('is-checked');
    mgSyncFilterChips();
  });

  // Chip toggle (ár chipek, státusz chipek)
  $panel.on('click', '.mg-filter-panel__chip', function () {
    $(this).toggleClass('is-active');
    mgSyncFilterChips();
  });

  // Toggle switch (foil/non-foil)
  $panel.on('click', '.mg-filter-panel__toggle-option', function () {
    var $toggle = $(this).closest('.mg-filter-panel__toggle');
    $toggle.find('.mg-filter-panel__toggle-option').removeClass('is-active');
    $(this).addClass('is-active');
  });

  // "További X" expand
  $panel.on('click', '.mg-filter-panel__more', function () {
    var $section = $(this).closest('.mg-filter-panel__section');
    var $hidden = $section.find('.mg-filter-panel__checkbox--hidden');

    if ($hidden.length) {
      $hidden.removeClass('mg-filter-panel__checkbox--hidden');
      $(this).text('kevesebb');
      $(this).addClass('mg-filter-panel__more--expanded');
    } else {
      var $checkboxes = $section.find('.mg-filter-panel__checkbox');
      $checkboxes.slice(3).addClass('mg-filter-panel__checkbox--hidden');
      var hiddenCount = $checkboxes.length - 3;
      $(this).text('további ' + hiddenCount);
      $(this).removeClass('mg-filter-panel__more--expanded');
    }
  });

  // Select change
  $panel.on('change', '.mg-filter-panel__select', function () {
    mgSyncFilterChips();
  });
}

function mgInitFilterOverlay() {
  var panelEl = document.querySelector('.mg-filter-panel');
  if (!panelEl) return;

  var offcanvas = bootstrap.Offcanvas.getOrCreateInstance(panelEl);

  $(document).on('click', '.mg-filter-panel__apply-btn', function () {
    offcanvas.hide();
    mgSyncFilterChips();
  });
}

/**
 * Szinkronizálja a toolbar szűrő chipeket a panel aktuális állapotával.
 * BACKEND: ez a logika majd szerver oldalon fut, itt csak UI demo.
 */
function mgSyncFilterChips() {
  var chips = [];

  $('.mg-filter-panel__checkbox.is-checked').each(function () {
    var label = $(this).find('.mg-filter-panel__checkbox-label').text().trim();
    if (label) chips.push(label);
  });

  $('.mg-filter-panel__chip.is-active').each(function () {
    var label = $(this).text().trim();
    if (label) chips.push(label);
  });

  var $container = $('.mg-product-toolbar__chips');
  $container.empty();

  chips.forEach(function (label) {
    var $chip = $(
      '<span class="mg-filter-chip">' +
        '<span class="mg-filter-chip__label">' + label + '</span>' +
        '<button class="mg-filter-chip__close" aria-label="Szűrő eltávolítása">' +
          '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>' +
        '</button>' +
      '</span>'
    );
    $container.append($chip);
  });

  var $clear = $('.mg-product-toolbar__clear');
  if (chips.length > 0) {
    $clear.show();
  } else {
    $clear.hide();
  }

  // BACKEND: product.count
  $('.mg-product-toolbar__count').text(chips.length > 0 ? '51 termék' : 'Minden termék');
}

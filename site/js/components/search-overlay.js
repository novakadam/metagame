/* search-overlay.js – Megakereső dropdown (topbar input alól) */

/* BACKEND: ez a tömb a backend keresési API-ból jönne */
var mgSearchProducts = [
  { id: '1',  name: 'Riftbound: LoL TCG Booster Display',         sub: 'Unleashed – 24 pack',         category: 'Gyűjtögetős kártyajátékok', price: 12800,  stock: 10, img: '../assets/images/content - placeholder/product/riftbound-leag-booster-transparent.png' },
  { id: '2',  name: 'Riftbound Champion Deck',                     sub: 'Origins Champion Deck',        category: 'Gyűjtögetős kártyajátékok', price: 12358,  stock: 3,  img: '../assets/images/content - placeholder/product/riftbound-deck-transparent.png' },
  { id: '3',  name: 'Magic: The Gathering Play Display',           sub: 'Play Boosters Display',        category: 'Gyűjtögetős kártyajátékok', price: 24900,  stock: 25, img: '../assets/images/content - placeholder/product/magic-play-display-transparent.png' },
  { id: '4',  name: 'Magic Foundations Collector Display',          sub: 'Collector Boosters – 12 pack', category: 'Gyűjtögetős kártyajátékok', price: 48990,  stock: 8,  img: '../assets/images/content - placeholder/product/magic-play-display.png' },
  { id: '5',  name: 'Pokémon Twilight Masquerade ETB',             sub: 'Elite Trainer Box',            category: 'Gyűjtögetős kártyajátékok', price: 14990,  stock: 12, img: '../assets/images/content - placeholder/product/riftbound-leag-booster-transparent.png' },
  { id: '6',  name: 'Pokémon Booster Bundle',                      sub: '6 booster pack',               category: 'Gyűjtögetős kártyajátékok', price: 7990,   stock: 20, img: '../assets/images/content - placeholder/product/riftbound-deck-transparent.png' },
  { id: '7',  name: 'Yu-Gi-Oh! 25th Anniversary Rarity Collection', sub: 'Booster Box',                category: 'Gyűjtögetős kártyajátékok', price: 32500,  stock: 4,  img: '../assets/images/content - placeholder/product/magic-play-display-transparent.png' },
  { id: '8',  name: 'Ultra Pro Eclipse Sleeves',                   sub: '100 db – Jet Black',           category: 'Kiegészítők',               price: 2400,   stock: 50, img: '../assets/images/content - placeholder/product/riftbound-deck-transparent.png' },
  { id: '9',  name: 'Ultra Pro Deck Box – Satin Tower',            sub: '100+ kártya kapacitás',        category: 'Kiegészítők',               price: 4800,   stock: 15, img: '../assets/images/content - placeholder/product/magic-play-display.png' },
  { id: '10', name: 'Dragon Shield Sleeves – Matte',               sub: '100 db – Crimson',             category: 'Kiegészítők',               price: 3200,   stock: 30, img: '../assets/images/content - placeholder/product/riftbound-leag-booster-transparent.png' },
  { id: '11', name: '9-Pocket Portfolio – Pro Binder',              sub: '360 kártya kapacitás',         category: 'Kiegészítők',               price: 4800,   stock: 0,  img: '../assets/images/content - placeholder/product/riftbound-deck-transparent.png' },
  { id: '12', name: 'Catan – Telepes',                             sub: 'Alap társasjáték',             category: 'Társasjátékok',             price: 11990,  stock: 7,  img: '../assets/images/content - placeholder/product/magic-play-display-transparent.png' },
  { id: '13', name: 'Ticket to Ride – Europe',                     sub: 'Családi társasjáték',          category: 'Társasjátékok',             price: 13490,  stock: 5,  img: '../assets/images/content - placeholder/product/magic-play-display.png' },
  { id: '14', name: 'Warhammer 40k Combat Patrol',                 sub: 'Space Marines',                category: 'Wargame',                   price: 42000,  stock: 2,  img: '../assets/images/content - placeholder/product/riftbound-leag-booster-transparent.png' }
];

function mgFormatSearchPrice(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' Ft';
}

function mgHighlight(text, query) {
  if (!query) return text;
  var escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp('(' + escaped + ')', 'gi'), '<mark>$1</mark>');
}

function mgSearchFilter(query) {
  var q = query.toLowerCase().trim();
  if (q.length < 2) return [];
  return mgSearchProducts.filter(function (p) {
    return p.name.toLowerCase().indexOf(q) !== -1 ||
           p.sub.toLowerCase().indexOf(q) !== -1 ||
           p.category.toLowerCase().indexOf(q) !== -1;
  });
}

function mgGroupByCategory(items) {
  var groups = {};
  var order = [];
  items.forEach(function (item) {
    if (!groups[item.category]) {
      groups[item.category] = [];
      order.push(item.category);
    }
    groups[item.category].push(item);
  });
  return { groups: groups, order: order };
}

function mgRenderResults(items, query) {
  var data = mgGroupByCategory(items);
  var html = '';

  data.order.forEach(function (cat) {
    html += '<div class="mg-search-panel__group">';
    html += '<h3 class="mg-search-panel__group-title">' + cat + '</h3>';
    html += '<div class="mg-search-panel__items">';

    data.groups[cat].forEach(function (p) {
      var stockHtml = '';
      if (p.stock === 0) {
        stockHtml = '<span class="mg-search-panel__item-stock mg-search-panel__item-stock--out">Elfogyott</span>';
      } else if (p.stock <= 5) {
        stockHtml = '<span class="mg-search-panel__item-stock">Még ' + p.stock + ' db</span>';
      }

      /* BACKEND: product.url */
      html += '<a href="product.html" class="mg-search-panel__item">' +
        '<div class="mg-search-panel__item-img"><img src="' + p.img + '" alt="' + p.name + '"></div>' +
        '<div class="mg-search-panel__item-info">' +
          '<span class="mg-search-panel__item-name">' + mgHighlight(p.name, query) + '</span>' +
          '<span class="mg-search-panel__item-sub">' + mgHighlight(p.sub, query) + '</span>' +
        '</div>' +
        stockHtml +
        '<span class="mg-search-panel__item-price">' + mgFormatSearchPrice(p.price) + '</span>' +
      '</a>';
    });

    html += '</div></div>';
  });

  return html;
}

function mgInitSearchOverlay() {
  var $overlay = $('.mg-search-overlay');
  var $panel   = $('.mg-search-panel');
  var $input   = $('.mg-search input');
  var $body    = $panel.find('.mg-search-panel__body');
  var $empty   = $body.find('.mg-search-panel__empty');
  var $results = $body.find('.mg-search-panel__results');
  var $noRes   = $body.find('.mg-search-panel__no-results');
  var $footer  = $panel.find('.mg-search-panel__footer');
  var $count   = $footer.find('.mg-search-panel__result-count');

  function open() {
    $overlay.addClass('is-open');
    $panel.addClass('is-open');
  }

  function close() {
    $overlay.removeClass('is-open');
    $panel.removeClass('is-open');
    $input.val('').blur();
    showEmpty();
  }

  function isOpen() {
    return $panel.hasClass('is-open');
  }

  function showEmpty() {
    $empty.show();
    $results.hide().empty();
    $noRes.hide();
    $footer.hide();
  }

  function showResults(items, query) {
    $empty.hide();
    $noRes.hide();
    $results.html(mgRenderResults(items, query)).show();
    $count.text(items.length + ' találat');
    $footer.show();
  }

  function showNoResults() {
    $empty.hide();
    $results.hide().empty();
    $noRes.show();
    $footer.hide();
  }

  /* Focus / klikk a topbar keresőre → megnyitás */
  $input.on('focus', function () {
    if (!isOpen()) open();
  });

  $('.mg-search__btn').on('click', function (e) {
    e.preventDefault();
    if (!isOpen()) {
      open();
      $input.focus();
    }
  });

  /* Gépelés → szűrés */
  $input.on('input', function () {
    var val = $(this).val();

    if (!isOpen()) open();

    if (val.trim().length < 2) {
      showEmpty();
      return;
    }

    /* BACKEND: itt hívnád az API-t, pl. fetch('/api/search?q=' + val) */
    var items = mgSearchFilter(val);

    if (items.length > 0) {
      showResults(items, val.trim());
    } else {
      showNoResults();
    }
  });

  /* Tag klikk → keresés indítása */
  $(document).on('click', '.mg-search-panel__tag', function () {
    var text = $(this).text().trim();
    $input.val(text).trigger('input').focus();
  });

  /* Bezárás: overlay klikk */
  $overlay.on('click', close);

  /* Bezárás: ESC */
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape' && isOpen()) {
      close();
    }
  });

  /* Billentyűzet navigáció: nyíl le/fel */
  $input.on('keydown', function (e) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      var $items = $results.find('.mg-search-panel__item');
      if (!$items.length) return;

      var $focused = $items.filter('.is-focused');
      var idx = $focused.length ? $items.index($focused) : -1;

      $items.removeClass('is-focused');

      if (e.key === 'ArrowDown') {
        idx = idx < $items.length - 1 ? idx + 1 : 0;
      } else {
        idx = idx > 0 ? idx - 1 : $items.length - 1;
      }

      $items.eq(idx).addClass('is-focused');
      $items.eq(idx)[0].scrollIntoView({ block: 'nearest' });
    }

    if (e.key === 'Enter') {
      var $focused = $results.find('.mg-search-panel__item.is-focused');
      if ($focused.length) {
        window.location.href = $focused.attr('href');
      }
    }
  });
}

/* ══════════════════════════════════════════════════════════════
   Mobil kereső overlay – teljes képernyős
   ══════════════════════════════════════════════════════════════ */

var mgMobileSearchTags = [
  'Pokémon', 'Magic', 'Booster', 'Riftbound', 'Yu-Gi-Oh!',
  'Társasjáték', 'Sleeve', 'Warhammer'
];

var mgMobileSearchFeatured = [
  { name: 'Riftbound Booster Display', price: '12 800 Ft', img: '../assets/images/content - placeholder/product/riftbound-leag-booster-transparent.png' },
  { name: 'Magic Play Display', price: '24 900 Ft', img: '../assets/images/content - placeholder/product/magic-play-display-transparent.png' },
  { name: 'Riftbound Champion Deck', price: '12 358 Ft', img: '../assets/images/content - placeholder/product/riftbound-deck-transparent.png' },
  { name: 'Pokémon ETB', price: '14 990 Ft', img: '../assets/images/content - placeholder/product/riftbound-leag-booster-transparent.png' }
];

function mgInitMobileSearch() {
  var $overlay = $('.mg-mobile-search-overlay');
  var $trigger = $('.mg-mobile-search');
  if (!$overlay.length || !$trigger.length) return;

  function closeSvg() {
    return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>';
  }

  function searchSvg() {
    return '<svg width="20" height="20" viewBox="0 0 16 16" fill="none"><circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" stroke-width="1.5"/><path d="M10.5 10.5L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
  }

  function buildEmpty() {
    var html = '<div class="mg-mobile-search-overlay__section-title">Népszerű keresések</div>';
    html += '<div class="mg-mobile-search-overlay__tags">';
    mgMobileSearchTags.forEach(function(tag) {
      html += '<span class="mg-mobile-search-overlay__tag">' + tag + '</span>';
    });
    html += '</div>';

    html += '<div class="mg-mobile-search-overlay__section-title">Ajánlott termékek</div>';
    html += '<div class="mg-mobile-search-overlay__featured">';
    mgMobileSearchFeatured.forEach(function(p) {
      html += '<a class="mg-mobile-search-overlay__featured-card" href="product.html">';
      html += '<img src="' + p.img + '" alt="' + p.name + '">';
      html += '<span class="mg-mobile-search-overlay__featured-name">' + p.name + '</span>';
      html += '<span class="mg-mobile-search-overlay__featured-price">' + p.price + '</span>';
      html += '</a>';
    });
    html += '</div>';
    return html;
  }

  function buildResults(items, query) {
    var data = mgGroupByCategory(items);
    var html = '<div class="mg-mobile-search-overlay__results">';
    data.order.forEach(function(cat) {
      html += '<div>';
      html += '<h3 class="mg-mobile-search-overlay__group-title">' + cat + '</h3>';
      data.groups[cat].forEach(function(p) {
        html += '<a class="mg-mobile-search-overlay__item" href="product.html">';
        html += '<div class="mg-mobile-search-overlay__item-img"><img src="' + p.img + '" alt="' + p.name + '"></div>';
        html += '<div class="mg-mobile-search-overlay__item-info">';
        html += '<span class="mg-mobile-search-overlay__item-name">' + mgHighlight(p.name, query) + '</span>';
        html += '<span class="mg-mobile-search-overlay__item-sub">' + p.sub + '</span>';
        html += '</div>';
        html += '<span class="mg-mobile-search-overlay__item-price">' + mgFormatSearchPrice(p.price) + '</span>';
        html += '</a>';
      });
      html += '</div>';
    });
    html += '</div>';
    return html;
  }

  function openSearch() {
    var html = '<div class="mg-mobile-search-overlay__header">';
    html += '<span style="color:var(--color-text-muted);display:flex;align-items:center">' + searchSvg() + '</span>';
    html += '<input class="mg-mobile-search-overlay__input" type="text" placeholder="Keresés..." autofocus>';
    html += '<button class="mg-mobile-search-overlay__close">' + closeSvg() + '</button>';
    html += '</div>';
    html += '<div class="mg-mobile-search-overlay__body">' + buildEmpty() + '</div>';

    $overlay.html(html);

    requestAnimationFrame(function() {
      $overlay.addClass('is-open');
      $('body').addClass('mg-mobile-search-open');
      $overlay.find('.mg-mobile-search-overlay__input').focus();
    });

    $overlay.find('.mg-mobile-search-overlay__close').on('click', closeSearch);

    $overlay.find('.mg-mobile-search-overlay__input').on('input', function() {
      var val = $(this).val().trim();
      var $body = $overlay.find('.mg-mobile-search-overlay__body');
      if (val.length < 2) {
        $body.html(buildEmpty());
        bindTags();
        return;
      }
      var items = mgSearchFilter(val);
      if (items.length) {
        $body.html(buildResults(items, val));
      } else {
        $body.html('<div class="mg-mobile-search-overlay__no-results">Nincs találat: „' + val + '"</div>');
      }
    });

    bindTags();
  }

  function bindTags() {
    $overlay.find('.mg-mobile-search-overlay__tag').on('click', function() {
      var text = $(this).text().trim();
      var $input = $overlay.find('.mg-mobile-search-overlay__input');
      $input.val(text).trigger('input').focus();
    });
  }

  function closeSearch() {
    $overlay.removeClass('is-open');
    $('body').removeClass('mg-mobile-search-open');
  }

  $trigger.on('click touchend', function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (window.innerWidth <= 768) {
      openSearch();
    }
  });

  $(document).on('keydown', function(e) {
    if (e.key === 'Escape' && $overlay.hasClass('is-open')) {
      closeSearch();
    }
  });
}

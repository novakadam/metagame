var mgMegaMenuData = {
  'TCG': {
    brands: [
      { name: 'Pokémon',              logo: '../assets/brands/pokemon.png',  active: true },
      { name: 'Magic: The Gathering', logo: '../assets/brands/magic.png' },
      { name: 'Yu-Gi-Oh!',            logo: '../assets/brands/yugioh.png' },
      { name: 'Továbbiak',            more: true }
    ],
    subcategories: {
      'Pokémon': [
        'Booster csomagok', 'Booster boxok', 'Displayek',
        'Elite/Prémium dobozok', 'Deckek', 'Single kártyák',
        'Kiegészítők (tok, mappa, dice, playmat)', 'Gyűjtői termékek'
      ],
      'Magic: The Gathering': [
        'Booster csomagok', 'Draft boosterek', 'Set boosterek',
        'Commander deckek', 'Single kártyák', 'Kiegészítők'
      ],
      'Yu-Gi-Oh!': [
        'Booster csomagok', 'Structure deckek', 'Tin dobozok',
        'Single kártyák', 'Kiegészítők'
      ]
    },
    popular: [
      { name: 'Magic Play Display', price: '2 500 Ft', img: '../assets/images/content - placeholder/product/magic-play-display-transparent.png' },
      { name: 'Riftbound Booster', price: '3 990 Ft', img: '../assets/images/content - placeholder/product/riftbound-leag-booster-transparent.png' }
    ]
  },
  'Társasjáték': {
    brands: [
      { name: 'Családi',       active: true },
      { name: 'Stratégiai' },
      { name: 'Kooperatív' },
      { name: 'Party' }
    ],
    subcategories: {
      'Családi':    ['2 játékos', '3-4 játékos', '5+ játékos', 'Gyerekeknek'],
      'Stratégiai': ['Euro', 'Area control', 'Munkás-elhelyezés', 'Motor-építő'],
      'Kooperatív': ['Legacy', 'Kampány', 'Egyszer játszható'],
      'Party':      ['Szó-játékok', 'Blöff', 'Gyorsasági']
    },
    popular: [
      { name: 'Riftbound Deck', price: '8 990 Ft', img: '../assets/images/content - placeholder/product/riftbound-deck-transparent.png' },
      { name: 'Magic Play Display', price: '12 490 Ft', img: '../assets/images/content - placeholder/product/magic-play-display-transparent.png' }
    ]
  }
};

function mgInitMegaMenu() {
  var $nav      = $('#mg-nav-left');
  var $items    = $nav.find('.mg-nav-item');
  var $menu     = $('#mg-megamenu');
  var hoverTimer = null;
  var leaveTimer = null;

  function chevronSvg(size) {
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 18l6-6-6-6"/></svg>';
  }

  function renderMenu(categoryName) {
    var data = mgMegaMenuData[categoryName];
    if (!data) { $menu.removeClass('is-open'); return; }

    var activeBrand = null;
    data.brands.forEach(function (b) { if (b.active) activeBrand = b.name; });
    if (!activeBrand && data.brands.length) activeBrand = data.brands[0].name;

    buildMenu(data, activeBrand);
    $menu.addClass('is-open');
  }

  function buildMenu(data, activeBrand) {
    var html = '<div class="mg-megamenu__brands">';

    data.brands.forEach(function (b) {
      var cls = 'mg-megamenu__brand' + (b.name === activeBrand ? ' is-active' : '');
      if (b.more) cls += ' mg-megamenu__brand--more';
      html += '<div class="' + cls + '" data-brand="' + b.name + '">';

      if (b.more) {
        html += '<div class="mg-megamenu__brand-logo">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>' +
          '</div>';
      } else if (b.logo) {
        html += '<img class="mg-megamenu__brand-logo" src="' + b.logo + '" alt="' + b.name + '">';
      }

      html += '<span class="flex-grow-1">' + b.name + '</span>';
      html += ' + '<svg class="chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 18l6-6-6-6"/></svg>';
      html += '</div>';
    });

    html += '</div>';

    html += '<div class="mg-megamenu__right">';
    html += buildSubcats(data, activeBrand);
    html += buildPopular(data);
    html += '</div>';

    $menu.html(html);

    $menu.find('.mg-megamenu__brand').on('mouseenter', function () {
      var brand = $(this).data('brand');
      $menu.find('.mg-megamenu__brand').removeClass('is-active');
      $(this).addClass('is-active');
      $menu.find('.mg-megamenu__subcats').replaceWith(buildSubcats(data, brand));
    });
  }

  function buildSubcats(data, brandName) {
    var subs = (data.subcategories && data.subcategories[brandName]) || [];
    var html = '<div class="mg-megamenu__subcats">';
    html += '<h6 class="fw-bold text-uppercase mb-4">Alkategóriák</h6>';
    html += '<div class="mg-megamenu__subcats-list">';
    subs.forEach(function (s) {
      html += '<a href="#">' + s + '</a>';
    });
    html += '</div></div>';
    return html;
  }

  function buildPopular(data) {
    var items = data.popular || [];
    var html = '<div class="mg-megamenu__popular">';
    html += '<h6 class="fw-bold text-uppercase mb-4">Legnépszerűbb</h6>';
    items.forEach(function (p) {
      var imgHtml = p.img
        ? '<img src="' + p.img + '" alt="' + p.name + '">'
        : '<div style="width:60px;height:60px;background:var(--color-bg-muted);border-radius:4px;"></div>';
      html += '<a class="mg-megamenu__product-card" href="#">' +
        '<div class="mg-megamenu__product-img">' + imgHtml + '</div>' +
        '<div>' +
        '<span class="d-block">' + p.name + '</span>' +
        '<span class="d-block fs-5 fw-semibold">' + p.price + '</span>' +
        '</div></a>';
    });
    html += '</div>';
    return html;
  }

  function closeMenu() {
    $menu.removeClass('is-open');
    $items.removeClass('mg-nav-item--active');
  }

  $items.on('mouseenter', function () {
    clearTimeout(leaveTimer);
    var $item = $(this);
    var categoryName = $item.find('.mg-nav-item__label').text().trim();

    hoverTimer = setTimeout(function () {
      $items.removeClass('mg-nav-item--active');
      $item.addClass('mg-nav-item--active');
      renderMenu(categoryName);
    }, 150);
  });

  $items.on('mouseleave', function () {
    clearTimeout(hoverTimer);
    leaveTimer = setTimeout(function () {
      closeMenu();
    }, 300);
  });

  $menu.on('mouseenter', function () {
    clearTimeout(leaveTimer);
  });

  $menu.on('mouseleave', function () {
    leaveTimer = setTimeout(function () {
      closeMenu();
    }, 200);
  });

}

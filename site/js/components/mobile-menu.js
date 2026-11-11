var mgMobileMenuData = {
  categories: [
    {
      name: 'TCG',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M8 3v18"/><path d="M16 3v18"/></svg>'
    },
    {
      name: 'Társasjáték',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="4" y="4" width="16" height="16" rx="2"/><circle cx="8.5" cy="8.5" r="1"/><circle cx="15.5" cy="8.5" r="1"/><circle cx="8.5" cy="15.5" r="1"/><circle cx="15.5" cy="15.5" r="1"/><circle cx="12" cy="12" r="1"/></svg>'
    },
    {
      name: 'Gyűjthető kártya',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="9" rx="1"/><rect x="3" y="15" width="7" height="6" rx="1"/><rect x="14" y="15" width="7" height="6" rx="1"/></svg>'
    },
    {
      name: 'Kiegészítők',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 01-8 0"/></svg>'
    },
    {
      name: 'Szerepjátékok',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>'
    },
    {
      name: 'Wargame',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 17.5L3 6V3h3l11.5 11.5"/><path d="M13 19l6-6"/><path d="M16 16l4 4"/><path d="M19 21l2-2"/></svg>'
    },
    {
      name: 'Modellezés',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>'
    },
    {
      name: 'További termékek',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>'
    }
  ],
  footerLinks: [
    {
      title: 'Vásárlás',
      links: ['Szállítás', 'Fizetés', 'Garancia', 'Rendelés követése']
    },
    {
      title: 'Segítség',
      links: ['GYIK', 'Kapcsolat', 'Ügyfélszolgálat']
    },
    {
      title: 'Jogi',
      links: ['ÁSZF', 'Adatvédelem', 'Cookie']
    },
    {
      title: 'Metagame',
      links: ['Rólunk', 'Klubhelyiség', 'Események']
    }
  ]
};

function mgInitMobileMenu() {
  var $menu = $('.mg-mobile-menu');
  var $hamburger = $('.mg-mobile-hamburger');
  if (!$menu.length || !$hamburger.length) return;

  var currentCategory = null;
  var currentBrand = null;
  var currentMode = 'shop';
  var startMode = 'shop';

  // A menüpontok az asztali bal menüből jönnek (.mg-nav-section), így a mobil és az asztali
  // menü mindig ugyanaz. A Shop / Klub felirat is az asztali toggle-ből jön.
  var $deskToggle = $('.mg-toggle').first();
  if ($deskToggle.attr('data-active') === 'community') currentMode = startMode = 'community';

  function navItems(mode) {
    var items = [];
    $('.mg-nav-section[data-nav="' + mode + '"] .mg-nav-item').each(function () {
      var $a = $(this);
      items.push({
        name: $.trim($a.find('.mg-nav-item__label').text()),
        href: $a.attr('href') || '#',
        icon: $a.find('.mg-nav-item__circle').html() || '',
        active: $a.hasClass('mg-nav-item--active')
      });
    });
    return items;
  }

  function toggleLabel(mode, fallback) {
    var t = $.trim($deskToggle.find('.mg-toggle__btn[data-target="' + mode + '"]').text());
    return t || fallback;
  }

  // Minden szint tetején egy "Összes …" sor: a felirat és a nyíl is a következő szintre visz,
  // a teljes listát ez a sor adja (11.03-i meeting).
  function allRow(name) {
    // BACKEND: link a kategória / rendszer teljes terméklistájára
    return '<a class="mg-mobile-menu__subcat mg-mobile-menu__all" href="products-sotet.html">Összes ' + name + ' termék</a>';
  }

  function chevronRight(size) {
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 18l6-6-6-6"/></svg>';
  }

  function chevronLeft(size) {
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M15 18l-6-6 6-6"/></svg>';
  }

  function closeSvg() {
    return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>';
  }

  function buildPopularHtml(items) {
    if (!items || !items.length) return '';
    var html = '<div class="mg-mobile-menu__popular">';
    html += '<div class="mg-mobile-menu__popular-title">Legnépszerűbb</div>';
    html += '<div class="mg-mobile-menu__popular-grid">';
    items.forEach(function(p) {
      html += '<a class="mg-mobile-menu__popular-card" href="#">';
      if (p.img) {
        html += '<img src="' + p.img + '" alt="' + p.name + '">';
      }
      html += '<div class="mg-mobile-menu__popular-card-info">';
      html += '<span class="mg-mobile-menu__popular-card-name">' + p.name + '</span>';
      html += '<span class="mg-mobile-menu__popular-card-price">' + p.price + '</span>';
      html += '</div></a>';
    });
    html += '</div></div>';
    return html;
  }

  function renderLevel1() {
    var cats = navItems(currentMode);
    // tartalék, ha az oldalon nincs asztali bal menü
    if (!cats.length && currentMode === 'shop') cats = mgMobileMenuData.categories;
    var html = '';
    cats.forEach(function(cat) {
      var hasSubmenu = currentMode === 'shop' && mgMegaMenuData[cat.name];
      var cls = 'mg-mobile-menu__item' + (cat.active ? ' is-active' : '');
      if (hasSubmenu) {
        html += '<div class="' + cls + '" data-category="' + cat.name + '">';
      } else {
        html += '<a class="' + cls + '" href="' + (cat.href || 'products-sotet.html') + '">';
      }
      html += '<div class="mg-mobile-menu__item-icon">' + cat.icon + '</div>';
      html += '<span class="mg-mobile-menu__item-label">' + cat.name + '</span>';
      if (hasSubmenu) {
        html += '<span class="mg-mobile-menu__item-arrow">' + chevronRight(20) + '</span>';
      }
      html += hasSubmenu ? '</div>' : '</a>';
    });

    html += '<div class="mg-mobile-menu__footer-links">';
    mgMobileMenuData.footerLinks.forEach(function(group) {
      html += '<div class="mg-mobile-menu__footer-group">';
      html += '<div class="mg-mobile-menu__footer-title">' + group.title + '</div>';
      group.links.forEach(function(link) {
        html += '<a class="mg-mobile-menu__footer-link" href="#">' + link + '</a>';
      });
      html += '</div>';
    });
    html += '</div>';

    return html;
  }

  function renderLevel2(categoryName) {
    var data = mgMegaMenuData[categoryName];
    if (!data) return '';

    var html = '<button class="mg-mobile-menu__back" data-action="back-to-1">';
    html += chevronLeft(20) + '<span>' + categoryName + '</span></button>';
    html += allRow(categoryName);

    if (data.brands) {
      data.brands.forEach(function(b) {
        var subs = data.subcategories && data.subcategories[b.name];
        var hasSubs = !!(subs && subs.length);
        // amelyik rendszernek nincs alszintje (és a Továbbiak), az rögtön a terméklistára visz
        html += hasSubs
          ? '<div class="mg-mobile-menu__brand" data-brand="' + b.name + '">'
          : '<a class="mg-mobile-menu__brand" href="products-sotet.html">';
        if (b.logo) {
          html += '<img class="mg-mobile-menu__brand-logo" src="' + b.logo + '" alt="' + b.name + '">';
        } else if (b.more) {
          html += '<div class="mg-mobile-menu__brand-logo" style="display:flex;align-items:center;justify-content:center;background:rgba(179,138,36,0.15);">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg></div>';
        } else {
          html += '<div class="mg-mobile-menu__brand-logo" style="display:flex;align-items:center;justify-content:center;background:rgba(179,138,36,0.1);font-family:var(--font-display);font-size:14px;font-weight:700;color:var(--color-gold);">' + b.name.charAt(0) + '</div>';
        }
        html += '<span class="mg-mobile-menu__brand-name">' + b.name + '</span>';
        if (hasSubs) {
          html += '<span class="mg-mobile-menu__brand-arrow">' + chevronRight(20) + '</span>';
        }
        html += hasSubs ? '</div>' : '</a>';
      });
    }

    html += buildPopularHtml(data.popular);

    return html;
  }

  function renderLevel3(categoryName, brandName) {
    var data = mgMegaMenuData[categoryName];
    if (!data) return '';
    var subs = (data.subcategories && data.subcategories[brandName]) || [];

    var html = '<button class="mg-mobile-menu__back" data-action="back-to-2">';
    html += chevronLeft(20) + '<span>' + brandName + '</span></button>';
    html += allRow(brandName);

    subs.forEach(function(sub) {
      html += '<a class="mg-mobile-menu__subcat" href="products-sotet.html">' + sub + '</a>';
    });

    html += buildPopularHtml(data.popular);

    return html;
  }

  function setLevel(targetLevel) {
    $menu.find('.mg-mobile-menu__level').each(function() {
      var $lv = $(this);
      var lv = parseInt($lv.data('level'));
      $lv.removeClass('mg-mobile-menu__level--active mg-mobile-menu__level--left mg-mobile-menu__level--right');
      if (lv === targetLevel) {
        $lv.addClass('mg-mobile-menu__level--active');
      } else if (lv < targetLevel) {
        $lv.addClass('mg-mobile-menu__level--left');
      } else {
        $lv.addClass('mg-mobile-menu__level--right');
      }
    });
  }

  function buildStructure() {
    var html = '<div class="mg-mobile-menu__header">';
    html += '<div class="mg-mobile-menu__toggle">';
    html += '<div class="mg-mobile-menu__toggle-inner">';
    html += '<div class="mg-mobile-menu__slider"></div>';
    html += '<button class="mg-mobile-menu__toggle-btn' + (currentMode === 'shop' ? ' is-active' : '') + '" data-target="shop">' + toggleLabel('shop', 'Shop') + '</button>';
    html += '<button class="mg-mobile-menu__toggle-btn' + (currentMode === 'community' ? ' is-active' : '') + '" data-target="community">' + toggleLabel('community', 'Klub') + '</button>';
    html += '</div></div>';
    html += '<button class="mg-mobile-menu__close">' + closeSvg() + '</button>';
    html += '</div>';

    html += '<div class="mg-mobile-menu__levels">';
    html += '<div class="mg-mobile-menu__level mg-mobile-menu__level--active" data-level="1">' + renderLevel1() + '</div>';
    html += '<div class="mg-mobile-menu__level mg-mobile-menu__level--right" data-level="2"></div>';
    html += '<div class="mg-mobile-menu__level mg-mobile-menu__level--right" data-level="3"></div>';
    html += '</div>';

    $menu.html(html);
  }

  function positionSlider() {
    var $active = $menu.find('.mg-mobile-menu__toggle-btn.is-active');
    var $slider = $menu.find('.mg-mobile-menu__slider');
    if (!$active.length || !$slider.length) return;
    $slider.css({
      left: $active.position().left + 'px',
      width: $active.outerWidth() + 'px'
    });
  }

  function openMenu() {
    buildStructure();
    bindEvents();
    requestAnimationFrame(function() {
      $menu.addClass('is-open');
      $('body').addClass('mg-mobile-menu-open');
      positionSlider();
    });
  }

  function closeMenu() {
    $menu.removeClass('is-open');
    $('body').removeClass('mg-mobile-menu-open');
    currentCategory = null;
    currentBrand = null;
    currentMode = startMode;
  }

  function bindEvents() {
    // minden nyitáskor újraépül a menü, ezért a delegált kezelőket előbb levesszük, különben halmozódnak
    $menu.off('click');
    $menu.find('.mg-mobile-menu__close').on('click', closeMenu);

    $menu.find('.mg-mobile-menu__toggle-btn').on('click', function() {
      $menu.find('.mg-mobile-menu__toggle-btn').removeClass('is-active');
      $(this).addClass('is-active');
      positionSlider();
      currentMode = $(this).data('target') === 'community' ? 'community' : 'shop';
      $menu.find('[data-level="1"]').html(renderLevel1());
      setLevel(1);
      currentCategory = null;
      currentBrand = null;
    });

    $menu.on('click', '.mg-mobile-menu__item[data-category]', function() {
      currentCategory = $(this).data('category');
      var $lv2 = $menu.find('[data-level="2"]');
      $lv2.html(renderLevel2(currentCategory));
      setLevel(2);
    });

    $menu.on('click', '.mg-mobile-menu__brand[data-brand]', function() {
      var brandName = $(this).data('brand');
      var data = mgMegaMenuData[currentCategory];
      var brandObj = null;
      if (data && data.brands) {
        data.brands.forEach(function(b) {
          if (b.name === brandName) brandObj = b;
        });
      }
      if (brandObj && brandObj.more) return;

      currentBrand = brandName;
      var subs = data && data.subcategories && data.subcategories[brandName];
      if (!subs || !subs.length) return;

      var $lv3 = $menu.find('[data-level="3"]');
      $lv3.html(renderLevel3(currentCategory, brandName));
      setLevel(3);
    });

    $menu.on('click', '[data-action="back-to-1"]', function() {
      setLevel(1);
      currentCategory = null;
    });

    $menu.on('click', '[data-action="back-to-2"]', function() {
      setLevel(2);
      currentBrand = null;
    });
  }

  $hamburger.on('click', function() {
    if ($menu.hasClass('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });
}

/* ══════════════════════════════════════════════════════════════════
   Mobil Drawer – Kosár / Profil / Kapcsolat overlay
   ══════════════════════════════════════════════════════════════════ */

function mgInitMobileDrawer() {
  var $drawer = $('.mg-mobile-drawer');
  var $btns = $('.mg-mobile-bar-icons__btn');
  if (!$drawer.length || !$btns.length) return;

  var currentType = null;
  var drawerTypes = ['contact', 'cart', 'profile'];

  function closeSvg() {
    return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>';
  }

  function getConf(type) {
    if (type === 'profile' && mgIsLoggedIn) {
      return mgDrawerContents.profileLoggedIn;
    }
    return mgDrawerContents[type];
  }

  function buildBody(type, conf) {
    if (type === 'cart') return mgBuildCartBody();
    if (type === 'favorites') return mgBuildFavBody();
    if (type === 'contact') {
      var html = '';
      if (typeof conf.body === 'function') html += conf.body();
      html += '<div class="mg-drawer-contact__divider"><span>Helyszíneink</span></div>';
      if (typeof mgDrawerContents.location.body === 'function') {
        html += mgDrawerContents.location.body();
      }
      return html;
    }
    return typeof conf.body === 'function' ? conf.body() : (conf.body || '');
  }

  function buildFooter(type, conf) {
    if (type === 'cart') return mgBuildCartFooter();
    if (conf.footer) {
      return typeof conf.footer === 'function' ? conf.footer() : conf.footer;
    }
    return '';
  }

  function openDrawer(type) {
    var conf = getConf(type);
    if (!conf) return;
    currentType = type;

    var footerHtml = buildFooter(type, conf);
    var hasFooter = !!footerHtml;

    var html = '<div class="mg-mobile-drawer__header">';
    html += '<h2 class="mg-mobile-drawer__title">' + conf.title + '</h2>';
    if (conf.subtitle) {
      html += '<span class="mg-mobile-drawer__subtitle">' + conf.subtitle + '</span>';
    }
    html += '<button class="mg-mobile-drawer__close">' + closeSvg() + '</button>';
    html += '</div>';
    html += '<div class="mg-mobile-drawer__body">' + buildBody(type, conf) + '</div>';
    if (hasFooter) {
      html += '<div class="mg-mobile-drawer__footer">' + footerHtml + '</div>';
    }

    $drawer.html(html);
    $drawer.toggleClass('mg-mobile-drawer--has-footer', hasFooter);

    requestAnimationFrame(function() {
      $drawer.addClass('is-open');
      $('body').addClass('mg-mobile-drawer-open');
    });

    bindEvents(type);
  }

  function closeDrawer() {
    $drawer.removeClass('is-open');
    $('body').removeClass('mg-mobile-drawer-open');
    currentType = null;
  }

  function bindEvents(type) {
    $drawer.find('.mg-mobile-drawer__close').on('click', closeDrawer);

    if (type === 'profile') {
      $drawer.find('#mg-drawer-login-btn').on('click', function() {
        mgIsLoggedIn = true;
        openDrawer('profile');
      });
      $drawer.find('#mg-drawer-logout-btn').on('click', function() {
        mgIsLoggedIn = false;
        openDrawer('profile');
      });
    }

    if (type === 'cart') {
      $drawer.on('click.mobileDrawer', '.qty-stepper .btn', function() {
        var $btn = $(this);
        var idx = parseInt($btn.data('idx'));
        var action = $btn.data('action');
        if (action === 'inc') mgCartItems[idx].qty++;
        if (action === 'dec' && mgCartItems[idx].qty > 1) mgCartItems[idx].qty--;
        $drawer.find('.mg-mobile-drawer__body').html(mgBuildCartBody());
      });
    }
  }

  $btns.each(function(index) {
    var type = drawerTypes[index];
    if (!type) return;
    $(this).on('click touchend', function(e) {
      e.preventDefault();
      if (currentType === type) {
        closeDrawer();
      } else {
        openDrawer(type);
      }
    });
  });

  $(document).on('keydown', function(e) {
    if (e.key === 'Escape' && $drawer.hasClass('is-open')) {
      closeDrawer();
    }
  });
}

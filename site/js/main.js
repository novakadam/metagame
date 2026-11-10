/**
 * main.js – Widget betöltés
 *
 * A .mg-content tartalmát widget fájlokból tölti be.
 * Minden widget saját HTML fragment a widgets/ mappában.
 *
 * BACKEND: az oldal route-ja határozza meg mely widgetek töltődnek.
 */

$(function () {

  var widgets = [
    { slot: '.mg-widget-hero',         src: 'widgets/hero.html',         init: mgInitHero },
    { slot: '.mg-widget-systems',      src: 'widgets/systems.html',      init: mgInitSystems },
    { slot: '.mg-widget-usp-grid',     src: 'widgets/usp-grid.html' },
    { slot: '.mg-widget-chronicles',   src: 'widgets/chronicles.html' },
    { slot: '.mg-widget-testimonials', src: 'widgets/testimonials.html', init: mgInitTestimonials },
    { slot: '.mg-widget-about',        src: 'widgets/about.html' },
    { slot: '.mg-widget-cta-banner',   src: 'widgets/cta-banner.html' },
    { slot: '.mg-widget-contact',      src: 'widgets/contact.html',  init: mgInitContact }
  ];

  widgets.forEach(function (w) {
    var $el = $(w.slot);
    $el.load(w.src, function () {
      if (!$el.children().length) $el.addClass('mg-widget--empty');
      if (w.init) w.init();
    });
  });

  $('.mg-widget-search-overlay').load('widgets/search-overlay.html', function () {
    mgInitSearchOverlay();
  });

  mgInitMegaMenu();
  mgInitMobileMenu();
  mgInitMobileSearch();
  mgInitMobileDrawer();
  mgInitDrawer();
  mgInitFooter();

});

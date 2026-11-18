function mgInitProductDetail() {
  // Galéria: thumbnail kattintás → fő kép csere
  $('.mg-product__gallery-thumb').on('click', function () {
    var src = $(this).find('img').attr('src');
    $(this).closest('.mg-product__gallery').find('.mg-product__gallery-main img').attr('src', src);
    $(this).siblings().removeClass('is-active');
    $(this).addClass('is-active');
  });

  // Accordion
  $('.mg-product__accordion-header').on('click', function () {
    $(this).closest('.mg-product__accordion-item').toggleClass('is-open');
  });

  // Mennyiség +/–
  $('.mg-product__qty-btn').on('click', function () {
    var $input = $(this).siblings('.mg-product__qty-input');
    var val = parseInt($input.val(), 10) || 1;
    if ($(this).data('action') === 'minus') {
      val = Math.max(1, val - 1);
    } else {
      val = Math.min(99, val + 1);
    }
    $input.val(val);
  });

  // Átvételi mód radio
  $('.mg-product__radio-option:not(.mg-product__radio-option--disabled)').on('click', function () {
    $(this).closest('.mg-product__delivery').find('.mg-product__radio').removeClass('is-selected');
    $(this).find('.mg-product__radio').addClass('is-selected');
  });

  // Variáns kattintás
  $('.mg-product__variant-thumb').on('click', function () {
    $(this).siblings().removeClass('is-active');
    $(this).addClass('is-active');
  });
}

/* GO-LIVE F (11.18): mobilon ragadós Kosárba-sáv. Akkor jelenik meg, ha a fő
   Kosárba gomb már kigördült felfelé; a sáv gombja a fő gombot nyomja meg. */
$(function () {
  var $bar = $('.mg-pd2__sticky-buy');
  var btn = document.querySelector('.mg-product__add-to-cart');
  if (!$bar.length || !btn) return;
  $bar.appendTo('body'); // a fix pozíció a görgethető keret-konténeren kívül legyen
  function check() { $bar.toggleClass('is-visible', btn.getBoundingClientRect().bottom < 0); }
  $(window).on('scroll resize', check);
  check();
  $bar.on('click', '[data-action="sticky-add"]', function () { $(btn).trigger('click'); });
});

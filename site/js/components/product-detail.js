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

function mgInitFooter() {
  var $trigger = $('.mg-footer__info-trigger');
  var $overlay = $('.mg-footer-overlay');
  var $panel   = $('.mg-footer-panel');

  function openPanel() {
    $overlay.addClass('is-open');
    $panel.addClass('is-open');
    $trigger.addClass('is-open');
    $('body').css('overflow', 'hidden');
  }

  function closePanel() {
    $overlay.removeClass('is-open');
    $panel.removeClass('is-open');
    $trigger.removeClass('is-open');
    $('body').css('overflow', '');
  }

  $trigger.on('click', function (e) {
    e.preventDefault();
    if ($panel.hasClass('is-open')) {
      closePanel();
    } else {
      openPanel();
    }
  });

  $overlay.on('click', closePanel);

  $('.mg-footer-panel__close-btn').on('click', closePanel);

  $(document).on('keydown', function (e) {
    if (e.key === 'Escape' && $panel.hasClass('is-open')) {
      closePanel();
    }
  });
}

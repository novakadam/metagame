function mgInitFooter() {
  var panelEl = document.querySelector('.mg-footer-panel');
  if (!panelEl) return;

  var bsOffcanvas = new bootstrap.Offcanvas(panelEl);
  var $trigger = $('.mg-footer__info-trigger');

  $trigger.on('click', function (e) {
    e.preventDefault();
    bsOffcanvas.toggle();
  });

  panelEl.addEventListener('shown.bs.offcanvas', function () {
    $trigger.addClass('is-open');
  });

  panelEl.addEventListener('hidden.bs.offcanvas', function () {
    $trigger.removeClass('is-open');
  });
}

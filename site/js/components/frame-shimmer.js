$(function () {
  var SPEED = 700;
  var PAUSE = 10000;
  var BEAM = 180;

  var segments = [
    { sel: '.mg-frame-corner--tl',        dir: 'h' },
    { sel: '.mg-frame-line--top',          dir: 'h' },
    { sel: '.mg-frame-corner--tr',         dir: 'h' },
    { sel: '.mg-frame-line--right-top',    dir: 'v' },
    { sel: '.mg-frame-line--right-bottom', dir: 'v' },
    { sel: '.mg-frame-corner--br',         dir: 'v' },
    { sel: '.mg-frame-line--bottom',       dir: 'h' },
    { sel: '.mg-frame-corner--bl',         dir: 'h' },
    { sel: '.mg-frame-line--left',         dir: 'v' }
  ];

  var $frame = $('.mg-frame');
  var timer = null;

  function runCycle() {
    if (timer) clearTimeout(timer);

    $frame.removeClass('mg-shimmer-run');
    void $frame[0].offsetWidth;

    var cumDelay = 0;
    var endTime = 0;

    segments.forEach(function (seg) {
      var el = document.querySelector(seg.sel);
      if (!el) return;

      var size = seg.dir === 'h' ? el.offsetWidth : el.offsetHeight;
      var dur = (size + BEAM) / SPEED;

      el.style.setProperty('--sh-dur', dur + 's');
      el.style.setProperty('--sh-delay', cumDelay + 's');

      endTime = cumDelay + dur;
      cumDelay += size / SPEED;
    });

    $frame.addClass('mg-shimmer-run');

    timer = setTimeout(runCycle, endTime * 1000 + PAUSE);
  }

  runCycle();
});

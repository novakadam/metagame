/**
 * klub.js – Klub landing interakciók
 *
 * mgInitKlubLibrary(): a "Próbáld ki" játékkönyvtár tab-váltója.
 * A tabokra kattintva kicseréli a nagy kiemelt képet + a jobb oldali
 * info panelt (badge, cím, leírás, felsorolás). Adat-vezérelt, hogy
 * a backend később könnyen feltölthesse.
 */

function mgInitKlubLibrary() {

  var $section = $('.mg-klub-library');
  if (!$section.length) return;

  var $tabs  = $section.find('.mg-klub-tab');
  var $img   = $section.find('.mg-klub-feature__img');
  var $badge = $section.find('.mg-klub-feature__badge');
  var $title = $section.find('.mg-klub-feature__title');
  var $desc  = $section.find('.mg-klub-feature__desc');
  var $list  = $section.find('.mg-klub-feature__list');

  var P = '../assets/images/';

  /* BACKEND: kategóriánként a kiemelt játék/élmény */
  var data = {
    tarsas: {
      img: P + 'about/klub.png',
      badge: 'Társasjátékok',
      title: 'Több száz társas a polcokon',
      desc: 'A könnyed party-játékoktól a több órás stratégiákig — vedd le, próbáld ki, és csak akkor vidd haza, ha tényleg bejött.',
      points: ['300+ kipróbálható cím', 'Ajánljuk a társaságodhoz illőt', 'Szabálymagyarázat a helyszínen']
    },
    tcg: {
      img: P + 'content%20-%20placeholder/events/DSC00180-3c36.webp',
      badge: 'Kártyajátékok',
      title: 'Magic, Pokémon, Yu-Gi-Oh! és társaik',
      desc: 'A legnépszerűbb gyűjthető kártyajátékok egy helyen — kezdő paklik kipróbálásától a kompetitív meta-deckekig.',
      points: ['Kezdő paklik kölcsönözhetők', 'Heti versenyek és ligák', 'Booster nyitás és csere']
    },
    szerep: {
      img: P + 'about/bolt.png',
      badge: 'Szerepjátékok',
      title: 'Kalandok mesélővel',
      desc: 'D&D és más rendszerek nyitott asztalokkal — új és tapasztalt játékosoknak, előre gyártott karakterekkel is.',
      points: ['Nyitott one-shot estek', 'Folyamatos kampányok', 'Kezdőbarát mesélők']
    },
    wargame: {
      img: P + 'chronicles/thumb-1.jpg',
      badge: 'Wargame & figurák',
      title: 'Csataasztalok és festősarok',
      desc: 'Terepasztalos csaták és festő workshopok — a hadsereged összerakásától az első ütközetig mindenben segítünk.',
      points: ['Terepasztalok foglalhatók', 'Festő workshopok', 'Rendszeres tornák']
    }
  };

  function show(key) {
    var d = data[key];
    if (!d) return;
    $img.attr('src', d.img).attr('alt', d.title);
    $badge.text(d.badge);
    $title.text(d.title);
    $desc.text(d.desc);
    $list.html(d.points.map(function (p) { return '<li>' + p + '</li>'; }).join(''));
    /* animáció újraindítása */
    $img.add($section.find('.mg-klub-feature__panel > *')).each(function () {
      this.style.animation = 'none';
      void this.offsetWidth;
      this.style.animation = '';
    });
  }

  $tabs.on('click', function () {
    $tabs.removeClass('mg-klub-tab--active');
    $(this).addClass('mg-klub-tab--active');
    show($(this).data('klub-tab'));
  });

  var startKey = $tabs.filter('.mg-klub-tab--active').data('klub-tab') || $tabs.first().data('klub-tab');
  show(startKey);
}

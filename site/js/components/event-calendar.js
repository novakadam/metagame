/*
 * event-calendar.js – FullCalendar v5 inicializálás Metagame stílussal
 *
 * BACKEND: Az events tömb a szerverről jön, itt demo adatokkal dolgozunk.
 */

function mgInitEventCalendar() {
  var calendarEl = document.getElementById('mg-calendar');
  if (!calendarEl) return;

  // Rendszer → szín mapping
  var systemColors = {
    magic:     '#1565C0',
    pokemon:   '#E8A517',
    yugioh:    '#7B1FA2',
    wargame:   '#2E7D32',
    boardgame: '#D84315',
    dnd:       '#C62828',
    lorcana:   '#00838F',
    general:   '#B38A24'
  };

  // BACKEND: events API endpoint – itt demo adatok
  var now = new Date();
  var y = now.getFullYear();
  var m = String(now.getMonth() + 1).padStart(2, '0');

  var events = [
    {
      title: 'Pokémon Liga Kupa',
      start: y + '-' + m + '-07T14:00:00',
      end:   y + '-' + m + '-07T19:00:00',
      color: systemColors.pokemon,
      textColor: '#1a1a1a',
      extendedProps: { system: 'pokemon', fee: '2000 Ft', slots: '32/32', location: 'Kádár utca' }
    },
    {
      title: 'Magic: Friday Night',
      start: y + '-' + m + '-06T18:00:00',
      end:   y + '-' + m + '-06T22:00:00',
      color: systemColors.magic,
      extendedProps: { system: 'magic', fee: '1500 Ft', slots: '16/24', location: 'Kresz Géza utca' }
    },
    {
      title: 'Magic: Modern Bajnokság',
      start: y + '-' + m + '-14T11:00:00',
      end:   y + '-' + m + '-14T20:00:00',
      color: systemColors.magic,
      extendedProps: { system: 'magic', fee: '3000 Ft', slots: '48/64', location: 'Kádár utca' }
    },
    {
      title: 'Yu-Gi-Oh! Locals',
      start: y + '-' + m + '-08T15:00:00',
      end:   y + '-' + m + '-08T19:00:00',
      color: systemColors.yugioh,
      extendedProps: { system: 'yugioh', fee: '1000 Ft', slots: '12/16', location: 'Kresz Géza utca' }
    },
    {
      title: 'Warhammer 40K Asztalfoglalás',
      start: y + '-' + m + '-09',
      color: systemColors.wargame,
      extendedProps: { system: 'wargame', fee: 'Ingyenes', slots: '3/6 asztal', location: 'Kádár utca' }
    },
    {
      title: 'Társasjáték Est',
      start: y + '-' + m + '-12T17:00:00',
      end:   y + '-' + m + '-12T21:00:00',
      color: systemColors.boardgame,
      extendedProps: { system: 'boardgame', fee: 'Ingyenes', slots: '20/30', location: 'Kresz Géza utca' }
    },
    {
      title: 'D&D One-shot Session',
      start: y + '-' + m + '-15T16:00:00',
      end:   y + '-' + m + '-15T21:00:00',
      color: systemColors.dnd,
      extendedProps: { system: 'dnd', fee: '500 Ft', slots: '5/6', location: 'Kádár utca' }
    },
    {
      title: 'Lorcana League',
      start: y + '-' + m + '-20T14:00:00',
      end:   y + '-' + m + '-20T18:00:00',
      color: systemColors.lorcana,
      extendedProps: { system: 'lorcana', fee: '1500 Ft', slots: '8/16', location: 'Kresz Géza utca' }
    },
    {
      title: 'Pokémon Prerelease',
      start: y + '-' + m + '-21T10:00:00',
      end:   y + '-' + m + '-21T17:00:00',
      color: systemColors.pokemon,
      textColor: '#1a1a1a',
      extendedProps: { system: 'pokemon', fee: '5000 Ft', slots: '20/32', location: 'Kádár utca' }
    },
    {
      title: 'Magic: Commander Night',
      start: y + '-' + m + '-13T18:00:00',
      end:   y + '-' + m + '-13T23:00:00',
      color: systemColors.magic,
      extendedProps: { system: 'magic', fee: 'Ingyenes', slots: '24/32', location: 'Kresz Géza utca' }
    },
    {
      title: 'Yu-Gi-Oh! Regionális',
      start: y + '-' + m + '-28T10:00:00',
      end:   y + '-' + m + '-28T19:00:00',
      color: systemColors.yugioh,
      extendedProps: { system: 'yugioh', fee: '3500 Ft', slots: '56/64', location: 'Kádár utca' }
    },
    {
      title: 'Wargame Festőműhely',
      start: y + '-' + m + '-22T14:00:00',
      end:   y + '-' + m + '-22T18:00:00',
      color: systemColors.wargame,
      extendedProps: { system: 'wargame', fee: '2000 Ft', slots: '6/10', location: 'Kádár utca' }
    }
  ];

  // Megjegyzett nézet visszaállítása
  var savedView = localStorage.getItem('mg-calendar-view');
  var initialView = savedView || 'dayGridMonth';

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: initialView,
    locale: 'hu',
    firstDay: 1,
    height: 'auto',
    dayMaxEvents: 3,
    navLinks: true,
    nowIndicator: true,

    headerToolbar: {
      left:   'prev,next today',
      center: 'title',
      right:  'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },

    buttonText: {
      today: 'Ma',
      month: 'Havi',
      week:  'Hét',
      day:   'Nap',
      list:  'Lista'
    },

    // Idősávos nézetek (hét/nap) beállítása
    slotMinTime: '08:00:00',
    slotMaxTime: '24:00:00',
    allDaySlot: true,
    allDayText: 'Egész nap',
    slotLabelFormat: { hour: '2-digit', minute: '2-digit', hour12: false },

    events: events,

    // Nézet megjegyzése
    viewDidMount: function(info) {
      localStorage.setItem('mg-calendar-view', info.view.type);
    },

    // Esemény kattintás → BACKEND: event detail page
    eventClick: function(info) {
      info.jsEvent.preventDefault();
      var props = info.event.extendedProps;
      var tooltip = document.getElementById('mg-event-tooltip');
      if (!tooltip) return;

      tooltip.querySelector('.mg-event-tooltip__title').textContent = info.event.title;

      var timeStr = '';
      if (info.event.start) {
        timeStr = info.event.start.toLocaleString('hu-HU', {
          month: 'long', day: 'numeric',
          hour: '2-digit', minute: '2-digit'
        });
      }
      if (info.event.end) {
        timeStr += ' – ' + info.event.end.toLocaleTimeString('hu-HU', {
          hour: '2-digit', minute: '2-digit'
        });
      }
      tooltip.querySelector('.mg-event-tooltip__time').textContent = timeStr;
      tooltip.querySelector('.mg-event-tooltip__fee').textContent = props.fee || '';
      tooltip.querySelector('.mg-event-tooltip__slots').textContent = props.slots || '';
      tooltip.querySelector('.mg-event-tooltip__location').textContent = props.location || '';

      var dot = tooltip.querySelector('.mg-event-tooltip__dot');
      dot.style.background = systemColors[props.system] || systemColors.general;

      tooltip.classList.add('is-visible');

      // Pozicionálás az esemény elem mellé
      var rect = info.el.getBoundingClientRect();
      tooltip.style.top = (rect.bottom + window.scrollY + 8) + 'px';
      tooltip.style.left = Math.min(rect.left, window.innerWidth - 300) + 'px';
    },

    // Rendszer-specifikus class hozzáadása
    eventClassNames: function(arg) {
      var system = arg.event.extendedProps.system;
      return system ? ['fc-event--' + system] : [];
    }
  });

  calendar.render();

  // Tooltip bezárás
  $(document).on('click', function(e) {
    var tooltip = document.getElementById('mg-event-tooltip');
    if (tooltip && !tooltip.contains(e.target) && !$(e.target).closest('.fc-event').length) {
      tooltip.classList.remove('is-visible');
    }
  });

  // Rendszer szűrő gombok
  var activeFilters = new Set();

  $('.mg-events-filter').on('click', function() {
    var system = $(this).data('system');
    $(this).toggleClass('is-active');

    if (activeFilters.has(system)) {
      activeFilters.delete(system);
    } else {
      activeFilters.add(system);
    }

    // URL frissítés (deep link)
    if (activeFilters.size > 0) {
      var params = Array.from(activeFilters).join(',');
      history.replaceState(null, '', '?rendszer=' + params);
    } else {
      history.replaceState(null, '', window.location.pathname);
    }

    // Események szűrése
    calendar.getEvents().forEach(function(event) {
      var eventSystem = event.extendedProps.system;
      if (activeFilters.size === 0) {
        event.setProp('display', 'auto');
      } else if (activeFilters.has(eventSystem)) {
        event.setProp('display', 'auto');
      } else {
        event.setProp('display', 'none');
      }
    });
  });

  // URL-ből szűrők visszaállítása (deep link support)
  var urlParams = new URLSearchParams(window.location.search);
  var rendszerParam = urlParams.get('rendszer');
  if (rendszerParam) {
    rendszerParam.split(',').forEach(function(system) {
      var btn = $('.mg-events-filter[data-system="' + system + '"]');
      if (btn.length) {
        btn.addClass('is-active');
        activeFilters.add(system);
      }
    });
    calendar.getEvents().forEach(function(event) {
      var eventSystem = event.extendedProps.system;
      if (!activeFilters.has(eventSystem)) {
        event.setProp('display', 'none');
      }
    });
  }
}

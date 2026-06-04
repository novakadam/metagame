/* ── DRAWER TARTALMAK ─────────────────────────────────────────── */

var mgDrawerContents = {

  /* ── PROFIL ─────────────────────────────────────────────────── */
  profile: {
    title: 'Fiókom',
    body: function () {
      return '<div class="mg-drawer-profile">' +

        '<div class="mg-drawer-profile__welcome">' +
          '<div class="mg-drawer-profile__avatar">' +
            '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="24" cy="18" r="10"/><path d="M6 44c0-9.941 8.059-18 18-18s18 8.059 18 18" stroke-linecap="round"/></svg>' +
          '</div>' +
          '<h3 class="mg-drawer-profile__heading">Üdvözlünk a Metagame-ben!</h3>' +
          '<p class="mg-drawer-profile__sub">Jelentkezz be, hogy hozzáférj kedvenceidhez, rendeléseidhez és exkluzív ajánlatainkhoz.</p>' +
        '</div>' +

        '<div class="mg-drawer-profile__social">' +
          '<button class="mg-drawer-profile__social-btn mg-drawer-profile__social-btn--google">' +
            '<svg viewBox="0 0 24 24" width="20" height="20"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09a6.97 6.97 0 0 1 0-4.17V7.07H2.18A11.97 11.97 0 0 0 0 12c0 1.94.46 3.77 1.28 5.4l3.56-2.77.01-.54z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.99 14.97.96 12 .96 7.7.96 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>' +
            '<span>Bejelentkezés Google fiókkal</span>' +
          '</button>' +
          '<button class="mg-drawer-profile__social-btn mg-drawer-profile__social-btn--facebook">' +
            '<svg viewBox="0 0 24 24" width="20" height="20" fill="#1877F2"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.49 0-1.956.93-1.956 1.886v2.283h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>' +
            '<span>Bejelentkezés Facebook fiókkal</span>' +
          '</button>' +
        '</div>' +

        '<div class="mg-drawer-profile__divider"><span>vagy e-mail címmel</span></div>' +

        '<form class="mg-drawer-profile__form" onsubmit="return false;">' +
          '<div class="mg-drawer-profile__field">' +
            '<label>E-mail cím</label>' +
            '<input type="email" placeholder="pelda@email.com">' +
          '</div>' +
          '<div class="mg-drawer-profile__field">' +
            '<label>Jelszó</label>' +
            '<input type="password" placeholder="••••••••">' +
          '</div>' +
          '<button class="btn btn-secondary mg-drawer-profile__login-btn" type="button" id="mg-drawer-login-btn">Bejelentkezés</button>' +
          '<p class="mg-drawer-profile__register">Még nincs fiókod? <a href="#">Regisztráció</a></p>' +
        '</form>' +

      '</div>';
    }
  },

  profileLoggedIn: {
    title: 'Fiókom',
    body: function () {
      return '<div class="mg-drawer-profile mg-drawer-profile--logged">' +

        '<div class="mg-drawer-profile__user">' +
          '<div class="mg-drawer-profile__user-avatar">ÁN</div>' +
          '<div class="mg-drawer-profile__user-info">' +
            '<span class="mg-drawer-profile__user-name">Novák Ádám</span>' +
            '<span class="mg-drawer-profile__user-email">novak.adam@metagame.hu</span>' +
          '</div>' +
        '</div>' +

        '<div class="mg-drawer-profile__stats">' +
          '<div class="mg-drawer-profile__stat">' +
            '<span class="mg-drawer-profile__stat-value">12</span>' +
            '<span class="mg-drawer-profile__stat-label">Rendelés</span>' +
          '</div>' +
          '<div class="mg-drawer-profile__stat">' +
            '<span class="mg-drawer-profile__stat-value">5</span>' +
            '<span class="mg-drawer-profile__stat-label">Kedvenc</span>' +
          '</div>' +
          '<div class="mg-drawer-profile__stat">' +
            '<span class="mg-drawer-profile__stat-value">2 340</span>' +
            '<span class="mg-drawer-profile__stat-label">Pont</span>' +
          '</div>' +
        '</div>' +

        '<nav class="mg-drawer-profile__menu">' +
          '<a class="mg-drawer-profile__menu-item" href="#">' +
            '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18"><rect x="2" y="4" width="16" height="12" rx="2"/><path d="M2 8h16"/></svg>' +
            '<span>Rendeléseim</span>' +
            '<svg class="mg-drawer-profile__menu-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M9 18l6-6-6-6"/></svg>' +
          '</a>' +
          '<a class="mg-drawer-profile__menu-item" href="#">' +
            '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18"><path d="M10 16.5S2 11.5 2 6.5A4 4 0 0 1 10 4.5a4 4 0 0 1 8 2c0 5-8 10-8 10z"/></svg>' +
            '<span>Kedvencek</span>' +
            '<svg class="mg-drawer-profile__menu-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M9 18l6-6-6-6"/></svg>' +
          '</a>' +
          '<a class="mg-drawer-profile__menu-item" href="#">' +
            '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18"><circle cx="10" cy="7" r="4"/><path d="M3 18c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke-linecap="round"/></svg>' +
            '<span>Személyes adatok</span>' +
            '<svg class="mg-drawer-profile__menu-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M9 18l6-6-6-6"/></svg>' +
          '</a>' +
          '<a class="mg-drawer-profile__menu-item" href="#">' +
            '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18"><path d="M10 2a6 6 0 0 0-6 6v4l-2 2h16l-2-2V8a6 6 0 0 0-6-6z"/><path d="M8 16a2 2 0 0 0 4 0"/></svg>' +
            '<span>Értesítési beállítások</span>' +
            '<svg class="mg-drawer-profile__menu-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M9 18l6-6-6-6"/></svg>' +
          '</a>' +
          '<a class="mg-drawer-profile__menu-item" href="#">' +
            '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 13l10 5 10-5"/></svg>' +
            '<span>Hűségprogram</span>' +
            '<svg class="mg-drawer-profile__menu-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M9 18l6-6-6-6"/></svg>' +
          '</a>' +
        '</nav>' +

        '<a class="btn btn-secondary mg-drawer-profile__admin-btn" href="#">' +
          '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V18a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>' +
          'Belépés az adminba' +
        '</a>' +

      '</div>';
    },
    footer: function () {
      return '<div class="mg-drawer-profile__logout">' +
        '<button class="btn btn-outline-secondary mg-drawer-profile__logout-btn w-100 justify-content-center" id="mg-drawer-logout-btn">' +
          '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><path d="M7 2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3"/><path d="M14 15l5-5-5-5"/><path d="M19 10H7"/></svg>' +
          'Kijelentkezés' +
        '</button>' +
      '</div>';
    }
  },

  /* ── KEDVENCEK ──────────────────────────────────────────────── */
  favorites: {
    title: 'Kedvencek',
    subtitle: '5 termék'
  },

  /* ── KOSÁR ──────────────────────────────────────────────────── */
  cart: {
    title: 'Kosár',
    subtitle: '3 Items in cart'
  },

  /* ── ÉRTESÍTÉSEK ────────────────────────────────────────────── */
  notifications: {
    title: 'Értesítések',
    icon: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 2a6 6 0 0 0-6 6v4l-2 2h16l-2-2V8a6 6 0 0 0-6-6z"/><path d="M8 16a2 2 0 0 0 4 0"/></svg>',
    body: '<div class="mg-drawer__empty"><div class="mg-drawer__empty-icon"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 2a6 6 0 0 0-6 6v4l-2 2h16l-2-2V8a6 6 0 0 0-6-6z"/><path d="M8 16a2 2 0 0 0 4 0"/></svg></div>Nincs új értesítésed.</div>'
  },

  /* ── HELYSZÍN ───────────────────────────────────────────────── */
  location: {
    title: 'Helyszíneink',
    body: function () {
      return '<div class="mg-drawer-location">' +

        '<div class="mg-drawer-location__card">' +
          '<div class="mg-drawer-location__badge">Bolt</div>' +
          '<h4 class="mg-drawer-location__name">Metagame Store</h4>' +
          '<div class="mg-drawer-location__row">' +
            '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><path d="M10 2a6 6 0 0 0-6 6c0 4 6 10 6 10s6-6 6-10a6 6 0 0 0-6-6z"/><circle cx="10" cy="8" r="2"/></svg>' +
            '<span>1132 Budapest, Kádár utca 10.</span>' +
          '</div>' +
          '<div class="mg-drawer-location__row">' +
            '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><circle cx="10" cy="10" r="8"/><path d="M10 5v5l3 3"/></svg>' +
            '<span>H–Szo: 10:00 – 18:00</span>' +
          '</div>' +
          '<div class="mg-drawer-location__row">' +
            '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><path d="M4 2h4l2 4-2 2a10 10 0 0 0 4 4l2-2 4 2v4a2 2 0 0 1-2 2A16 16 0 0 1 2 4a2 2 0 0 1 2-2z"/></svg>' +
            '<span>+36 1 794 4116</span>' +
          '</div>' +
          '<div class="mg-drawer-location__status mg-drawer-location__status--open">' +
            '<span class="mg-drawer-location__status-dot"></span>' +
            '<span>Jelenleg nyitva</span>' +
          '</div>' +
          '<a class="btn btn-outline-secondary mg-drawer-location__map-btn" href="https://maps.google.com/?q=1132+Budapest+K%C3%A1d%C3%A1r+utca+10" target="_blank">' +
            '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14"><path d="M18 2L2 9l7 2 2 7z"/></svg>' +
            'Útvonaltervezés' +
          '</a>' +
        '</div>' +

        '<div class="mg-drawer-location__card">' +
          '<div class="mg-drawer-location__badge mg-drawer-location__badge--club">Klub</div>' +
          '<h4 class="mg-drawer-location__name">Metagame Klub</h4>' +
          '<div class="mg-drawer-location__row">' +
            '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><path d="M10 2a6 6 0 0 0-6 6c0 4 6 10 6 10s6-6 6-10a6 6 0 0 0-6-6z"/><circle cx="10" cy="8" r="2"/></svg>' +
            '<span>1132 Budapest, Kresz Géza utca 36.</span>' +
          '</div>' +
          '<div class="mg-drawer-location__row">' +
            '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><circle cx="10" cy="10" r="8"/><path d="M10 5v5l3 3"/></svg>' +
            '<span>H–P: 16:00 – 22:00, Szo: 10:00 – 18:00</span>' +
          '</div>' +
          '<div class="mg-drawer-location__row">' +
            '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><path d="M4 2h4l2 4-2 2a10 10 0 0 0 4 4l2-2 4 2v4a2 2 0 0 1-2 2A16 16 0 0 1 2 4a2 2 0 0 1 2-2z"/></svg>' +
            '<span>+36 1 794 4116</span>' +
          '</div>' +
          '<div class="mg-drawer-location__status">' +
            '<span class="mg-drawer-location__status-dot"></span>' +
            '<span>Jelenleg zárva</span>' +
          '</div>' +
          '<a class="btn btn-outline-secondary mg-drawer-location__map-btn" href="https://maps.google.com/?q=1132+Budapest+Kresz+G%C3%A9za+utca+36" target="_blank">' +
            '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14"><path d="M18 2L2 9l7 2 2 7z"/></svg>' +
            'Útvonaltervezés' +
          '</a>' +
        '</div>' +

      '</div>';
    }
  },

  /* ── KAPCSOLAT ──────────────────────────────────────────────── */
  contact: {
    title: 'Kapcsolat',
    body: function () {
      return '<div class="mg-drawer-contact">' +

        '<div class="mg-drawer-contact__channels">' +
          '<a class="mg-drawer-contact__channel" href="tel:+3617944116">' +
            '<div class="mg-drawer-contact__channel-icon">' +
              '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><path d="M4 2h4l2 4-2 2a10 10 0 0 0 4 4l2-2 4 2v4a2 2 0 0 1-2 2A16 16 0 0 1 2 4a2 2 0 0 1 2-2z"/></svg>' +
            '</div>' +
            '<span class="mg-drawer-contact__channel-label">Telefon</span>' +
            '<span class="mg-drawer-contact__channel-value">+36 1 794 4116</span>' +
          '</a>' +
          '<a class="mg-drawer-contact__channel" href="mailto:info@metagames.hu">' +
            '<div class="mg-drawer-contact__channel-icon">' +
              '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><rect x="2" y="4" width="16" height="12" rx="2"/><path d="M2 4l8 6 8-6"/></svg>' +
            '</div>' +
            '<span class="mg-drawer-contact__channel-label">E-mail</span>' +
            '<span class="mg-drawer-contact__channel-value">info@metagames.hu</span>' +
          '</a>' +
          '<a class="mg-drawer-contact__channel" href="https://www.facebook.com/metagames.hu" target="_blank">' +
            '<div class="mg-drawer-contact__channel-icon">' +
              '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.49 0-1.956.93-1.956 1.886v2.283h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>' +
            '</div>' +
            '<span class="mg-drawer-contact__channel-label">Facebook</span>' +
            '<span class="mg-drawer-contact__channel-value">metagames.hu</span>' +
          '</a>' +
          '<a class="mg-drawer-contact__channel" href="https://www.instagram.com/metagames.hu" target="_blank">' +
            '<div class="mg-drawer-contact__channel-icon">' +
              '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>' +
            '</div>' +
            '<span class="mg-drawer-contact__channel-label">Instagram</span>' +
            '<span class="mg-drawer-contact__channel-value">@metagames.hu</span>' +
          '</a>' +
        '</div>' +

        '<div class="mg-drawer-contact__divider"><span>Azonnali üzenet</span></div>' +

        '<form class="mg-drawer-contact__form" onsubmit="return false;">' +
          '<div class="mg-drawer-contact__field">' +
            '<label>Név</label>' +
            '<input type="text" placeholder="Neved">' +
          '</div>' +
          '<div class="mg-drawer-contact__field">' +
            '<label>E-mail</label>' +
            '<input type="email" placeholder="pelda@email.com">' +
          '</div>' +
          '<div class="mg-drawer-contact__field">' +
            '<label>Üzenet</label>' +
            '<textarea rows="4" placeholder="Írd ide az üzeneted..."></textarea>' +
          '</div>' +
          '<button class="btn btn-secondary w-100 justify-content-center" type="submit">' +
            '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14"><path d="M18 2L2 9l7 2 2 7z"/></svg>' +
            'Üzenet küldése' +
          '</button>' +
        '</form>' +

      '</div>';
    }
  }
};

/* ── KOSÁR TÉTELEK ──────────────────────────────────────────── */

var mgCartItems = [
  { name: 'Riftbound Booster', sub: 'League of Legends TCG', price: '2 500 Ft', qty: 1, img: '../assets/images/content - placeholder/product/riftbound-leag-booster-transparent.png' },
  { name: 'Magic Play Display', sub: 'Foundations', price: '7 500 Ft', qty: 1, img: '../assets/images/content - placeholder/product/magic-play-display-transparent.png' },
  { name: 'Riftbound Deck', sub: 'Starter Pack', price: '12 800 Ft', qty: 1, img: '../assets/images/content - placeholder/product/riftbound-deck-transparent.png' }
];

/* ── KEDVENC TÉTELEK ────────────────────────────────────────── */

var mgFavItems = [
  { name: 'Riftbound Booster', sub: 'League of Legends TCG', price: '2 500 Ft', img: '../assets/images/content - placeholder/product/riftbound-leag-booster-transparent.png' },
  { name: 'Magic Play Display', sub: 'Foundations', price: '7 500 Ft', img: '../assets/images/content - placeholder/product/magic-play-display-transparent.png' },
  { name: 'Riftbound Deck', sub: 'Starter Pack', price: '12 800 Ft', img: '../assets/images/content - placeholder/product/riftbound-deck-transparent.png' },
  { name: 'Set One: Origins', sub: 'Champion Deck - Viktor', price: '6 490 Ft', img: '../assets/images/content - placeholder/product/riftbound-leag-booster-transparent.png' },
  { name: 'Magic Play Display', sub: 'Aetherdrift', price: '34 500 Ft', img: '../assets/images/content - placeholder/product/magic-play-display.png' }
];

/* ── KOSÁR BODY/FOOTER BUILDER ──────────────────────────────── */

function mgBuildCartBody() {
  var html = '<div class="mg-drawer-cart__list">';
  mgCartItems.forEach(function (item, i) {
    html += '<div class="mg-drawer-cart__item">' +
      '<div class="mg-drawer-cart__row">' +
        '<div class="mg-drawer-cart__img">' +
          '<img src="' + item.img + '" alt="' + item.name + '">' +
          '<span class="mg-drawer-cart__badge">' + item.qty + '</span>' +
        '</div>' +
        '<div class="mg-drawer-cart__name">' +
          '<span class="mg-drawer-cart__name-main">' + item.name + '</span>' +
          '<span class="mg-drawer-cart__name-sub">' + item.sub + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="mg-drawer-cart__price-row">' +
        '<span class="mg-drawer-cart__price">' + item.price + '</span>' +
        '<div class="mg-drawer-cart__qty">' +
          '<button class="mg-drawer-cart__qty-btn" data-action="dec" data-idx="' + i + '">−</button>' +
          '<span class="mg-drawer-cart__qty-val">' + item.qty + '</span>' +
          '<button class="mg-drawer-cart__qty-btn" data-action="inc" data-idx="' + i + '">+</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  });
  html += '</div>';
  return html;
}

function mgBuildCartFooter() {
  return '<div class="mg-drawer-cart__summary">' +
    '<div class="mg-drawer-cart__summary-row"><span>Részösszeg</span><span>22 800 Ft</span></div>' +
    '<div class="mg-drawer-cart__summary-row"><span>Szállítási költség</span><span>Ingyenes</span></div>' +
  '</div>' +
  '<div class="mg-drawer-cart__total">' +
    '<span class="mg-drawer-cart__total-label">Teljes összeg</span>' +
    '<span class="mg-drawer-cart__total-currency">HUF</span>' +
    '<span class="mg-drawer-cart__total-amount">22 800 Ft</span>' +
  '</div>' +
  '<div class="mg-drawer-cart__actions">' +
    '<a href="checkout.html" class="btn btn-secondary w-100 justify-content-center">Tovább a pénztárhoz</a>' +
    '<a href="#" class="btn btn-outline-secondary w-100 justify-content-center">Vásárlás folytatása</a>' +
  '</div>';
}

/* ── KEDVENC BODY/FOOTER BUILDER ────────────────────────────── */

function mgBuildFavBody() {
  var html = '<div class="mg-drawer-cart__list">';
  mgFavItems.forEach(function (item) {
    html += '<div class="mg-drawer-cart__item">' +
      '<div class="mg-drawer-cart__row">' +
        '<div class="mg-drawer-cart__img">' +
          '<img src="' + item.img + '" alt="' + item.name + '">' +
        '</div>' +
        '<div class="mg-drawer-cart__name">' +
          '<span class="mg-drawer-cart__name-main">' + item.name + '</span>' +
          '<span class="mg-drawer-cart__name-sub">' + item.sub + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="mg-drawer-cart__price-row">' +
        '<span class="mg-drawer-cart__price">' + item.price + '</span>' +
        '<div class="mg-drawer-fav__actions">' +
          '<a href="product.html" class="btn btn-secondary btn-sm">Megnézem</a>' +
          '<button class="btn mg-btn--icon mg-drawer-fav__remove" aria-label="Eltávolítás">' +
            '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14"><path d="M4 6h12M8 6V4h4v2M6 6v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6"/></svg>' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  });
  html += '</div>';
  return html;
}

function mgBuildFavFooter() {
  return '<div class="mg-drawer-cart__actions">' +
    '<a href="products.html" class="btn btn-outline-secondary w-100 justify-content-center">Böngéssz tovább</a>' +
  '</div>';
}

/* ── DRAWER INIT ────────────────────────────────────────────── */

var mgIsLoggedIn = false;

function mgInitDrawer() {
  var drawerEl = document.querySelector('.mg-drawer');
  var bsOffcanvas = new bootstrap.Offcanvas(drawerEl);
  var $drawer  = $('.mg-drawer');
  var $title   = $drawer.find('.mg-drawer__title');
  var $sub     = $drawer.find('.mg-drawer__subtitle');
  var $body    = $drawer.find('.mg-drawer__body');
  var $footer  = $drawer.find('.mg-drawer__footer');
  var $btns    = $('.mg-nav-right__btn');
  var currentDrawer = null;

  var drawerMap = ['profile', 'favorites', 'cart', 'notifications', 'location', 'contact'];

  function getContent(type) {
    var conf;
    if (type === 'profile' && mgIsLoggedIn) {
      conf = mgDrawerContents.profileLoggedIn;
    } else {
      conf = mgDrawerContents[type];
    }
    return conf;
  }

  function openDrawer(type) {
    var conf = getContent(type);
    if (!conf) return;

    currentDrawer = type;
    $title.text(conf.title);
    $sub.text(conf.subtitle || '');
    $sub.toggle(!!conf.subtitle);

    if (type === 'cart') {
      $body.html(mgBuildCartBody());
      $footer.html(mgBuildCartFooter()).show();
    } else if (type === 'favorites') {
      $body.html(mgBuildFavBody());
      $footer.html(mgBuildFavFooter()).show();
    } else {
      var bodyContent = typeof conf.body === 'function' ? conf.body() : (conf.body || '');
      $body.html(bodyContent);
      if (conf.footer) {
        var footerContent = typeof conf.footer === 'function' ? conf.footer() : conf.footer;
        $footer.html(footerContent).show();
      } else {
        $footer.empty().hide();
      }
    }

    bsOffcanvas.show();

    bindDrawerEvents(type);
  }

  function closeDrawer() {
    bsOffcanvas.hide();
    currentDrawer = null;
  }

  function bindDrawerEvents(type) {
    if (type === 'profile') {
      $body.find('#mg-drawer-login-btn').off('click').on('click', function () {
        mgIsLoggedIn = true;
        openDrawer('profile');
      });
      $footer.find('#mg-drawer-logout-btn').off('click').on('click', function () {
        mgIsLoggedIn = false;
        openDrawer('profile');
      });
    }
  }

  $btns.each(function (index) {
    var type = drawerMap[index];
    if (type) {
      $(this).on('click', function () {
        if (currentDrawer === type) {
          closeDrawer();
        } else {
          openDrawer(type);
        }
      });
    }
  });

  // URL hash → auto-open (pl. index.html#profile)
  var hashType = location.hash.replace('#', '');
  if (hashType && drawerMap.indexOf(hashType) !== -1) {
    setTimeout(function () { openDrawer(hashType); }, 300);
  }

  drawerEl.addEventListener('hidden.bs.offcanvas', function () {
    currentDrawer = null;
  });
}

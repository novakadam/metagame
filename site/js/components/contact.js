/**
 * contact.js – Kapcsolat térkép (Leaflet + OpenStreetMap)
 *
 * Két pin: Bolt (Kádár utca 10.) és Klub (Kresz Géza utca 36.)
 */

function mgInitContact() {
  var mapEl = document.getElementById('mg-contact-map');
  if (!mapEl || typeof L === 'undefined') return;

  var boltCoords = [47.5116473, 19.0544347];
  var klubCoords = [47.5159197, 19.0576684];
  var center     = [47.5138, 19.0560];

  var map = L.map(mapEl, {
    scrollWheelZoom: false
  }).setView(center, 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap',
    maxZoom: 19
  }).addTo(map);

  var goldIcon = L.divIcon({
    className: 'mg-map-pin',
    html: '<svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">'
        + '<path d="M16 0C7.16 0 0 7.16 0 16c0 12 16 26 16 26s16-14 16-26C32 7.16 24.84 0 16 0z" fill="#B38A24"/>'
        + '<circle cx="16" cy="15" r="6" fill="#40022C"/>'
        + '</svg>',
    iconSize:   [32, 42],
    iconAnchor: [16, 42],
    popupAnchor:[0, -42]
  });

  L.marker(boltCoords, { icon: goldIcon })
    .addTo(map)
    .bindPopup('<strong>Metagame Bolt</strong><br>Kádár utca 10.<br>H–SZ 10:00–18:00');

  L.marker(klubCoords, { icon: goldIcon })
    .addTo(map)
    .bindPopup('<strong>Metagame Klub</strong><br>Kresz Géza utca 36.<br>H–P 16:00–22:00, SZ 10:00–18:00');

  map.fitBounds([boltCoords, klubCoords], { padding: [60, 60] });
}

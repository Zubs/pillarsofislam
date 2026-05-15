// js/utils/qibla.js
const KAABA = { lat: 21.4225, lng: 39.8262 };

/**
 * Calculate the Qibla bearing from a given location (degrees from North)
 */
export function calcQibla(lat, lng) {
  const L1 = lat  * Math.PI / 180;
  const L2 = KAABA.lat * Math.PI / 180;
  const dL = (KAABA.lng - lng) * Math.PI / 180;
  const y = Math.sin(dL) * Math.cos(L2);
  const x = Math.cos(L1) * Math.sin(L2) - Math.sin(L1) * Math.cos(L2) * Math.cos(dL);
  const bearing = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
  return Math.round(bearing);
}

/**
 * Get compass direction label from bearing
 */
export function bearingToLabel(b) {
  const dirs = ['N','NE','E','SE','S','SW','W','NW'];
  return dirs[Math.round(b / 45) % 8];
}

/**
 * Great-circle distance to Makkah in km
 */
export function distanceToMakkah(lat, lng) {
  const R = 6371;
  const dLat = (KAABA.lat - lat) * Math.PI / 180;
  const dLon = (KAABA.lng - lng) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat*Math.PI/180) * Math.cos(KAABA.lat*Math.PI/180) * Math.sin(dLon/2)**2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
}

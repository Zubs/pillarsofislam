// js/utils/prayer.js
// Prayer time calculation using the standard astronomical formulas
// Methods: MWL, ISNA, Egypt, Makkah, Karachi, Tehran, Jafari

const DEG = Math.PI / 180;
const RAD = 180 / Math.PI;

function sinD(d) { return Math.sin(d * DEG); }
function cosD(d) { return Math.cos(d * DEG); }
function tanD(d) { return Math.tan(d * DEG); }
function asinD(x) { return Math.asin(x) * RAD; }
function atan2D(y, x) { return Math.atan2(y, x) * RAD; }
function acosd(x) { return Math.acos(x) * RAD; }
function fixAngle(a) { return a - 360 * Math.floor(a / 360); }
function fixHour(a)  { return a - 24  * Math.floor(a / 24);  }

// Sun position calculations
function sunPosition(jd) {
  const D = jd - 2451545.0;
  const g = fixAngle(357.529 + 0.98560028 * D);
  const q = fixAngle(280.459 + 0.98564736 * D);
  const L = fixAngle(q + 1.915 * sinD(g) + 0.020 * sinD(2 * g));
  const e = 23.439 - 0.00000036 * D;
  const RA = atan2D(cosD(e) * sinD(L), cosD(L)) / 15;
  const eqt = q / 15 - fixHour(RA);
  const decl = asinD(sinD(e) * sinD(L));
  return { decl, eqt };
}

function julianDate(year, month, day) {
  if (month <= 2) { year--; month += 12; }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
}

function hourAngle(angle, decl, lat) {
  const cos = (sinD(angle) - sinD(lat) * sinD(decl)) / (cosD(lat) * cosD(decl));
  if (cos < -1) return 180;
  if (cos > 1)  return 0;
  return acosd(cos) / 15;
}

// Calculation methods: [Fajr angle, Isha angle or offset]
const METHODS = {
  MWL:    { name: 'Muslim World League',      fajr: 18, isha: 17 },
  ISNA:   { name: 'Islamic Society of NA',    fajr: 15, isha: 15 },
  Egypt:  { name: 'Egyptian Authority',       fajr: 19.5, isha: 17.5 },
  Makkah: { name: 'Umm Al-Qura',             fajr: 18.5, isha: 90, ishaMin: true },
  Karachi:{ name: 'University of Karachi',    fajr: 18, isha: 18 },
};

/**
 * Calculate prayer times for a given date and location
 * @param {number} lat - latitude
 * @param {number} lng - longitude  
 * @param {Date}   date
 * @param {number} timezone - UTC offset in hours
 * @param {string} method - calculation method key
 * @returns {{ fajr, sunrise, dhuhr, asr, maghrib, isha }} times in HH:MM
 */
export function calcPrayerTimes(lat, lng, date, timezone, method = 'MWL') {
  const m = METHODS[method] || METHODS.MWL;
  const jd = julianDate(date.getFullYear(), date.getMonth() + 1, date.getDate()) - lng / 360;
  const { decl, eqt } = sunPosition(jd);

  const noon    = 12 - lng / 15 - eqt + timezone;
  const sunrise = noon - hourAngle(-0.833, decl, lat);
  const sunset  = noon + hourAngle(-0.833, decl, lat);
  const fajr    = noon - hourAngle(-m.fajr, decl, lat);
  const isha    = m.ishaMin ? sunset + m.isha / 60 : noon + hourAngle(-m.isha, decl, lat);

  // Asr (Shafi'i: shadow = object + 1; Hanafi: shadow = object + 2)
  // Altitude angle is positive (sun above horizon), so no negation here.
  const asrFactor = 1; // 1 = Shafi'i, 2 = Hanafi
  const asrAngle  = RAD * Math.atan(1 / (asrFactor + tanD(Math.abs(lat - decl))));
  const asr       = noon + hourAngle(asrAngle, decl, lat);

  const toHHMM = h => {
    const totalMin = Math.round(fixHour(h) * 60);
    const hh = Math.floor(totalMin / 60) % 24;
    const mm = totalMin % 60;
    return `${String(hh).padStart(2,'0')}:${String(mm).padStart(2,'0')}`;
  };

  return {
    fajr:    toHHMM(fajr),
    sunrise: toHHMM(sunrise),
    dhuhr:   toHHMM(noon),
    asr:     toHHMM(asr),
    maghrib: toHHMM(sunset),
    isha:    toHHMM(isha),
  };
}

/** Get current prayer name based on times */
export function getCurrentPrayer(times) {
  const now  = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  const t2m  = t => parseInt(t.split(':')[0]) * 60 + parseInt(t.split(':')[1]);

  const order = [
    { key: 'fajr',    label: 'Fajr' },
    { key: 'sunrise', label: 'Sunrise' },
    { key: 'dhuhr',   label: 'Dhuhr' },
    { key: 'asr',     label: 'Asr' },
    { key: 'maghrib', label: 'Maghrib' },
    { key: 'isha',    label: 'Isha' },
  ];

  let current = 'isha';
  for (let i = 0; i < order.length; i++) {
    if (mins >= t2m(times[order[i].key])) {
      current = order[i].key;
    }
  }
  return current;
}

/** Get next prayer and time remaining */
export function getNextPrayer(times) {
  const now  = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  const t2m  = t => parseInt(t.split(':')[0]) * 60 + parseInt(t.split(':')[1]);

  const order = ['fajr','sunrise','dhuhr','asr','maghrib','isha'];
  const labels = { fajr:'Fajr', sunrise:'Sunrise', dhuhr:'Dhuhr', asr:'Asr', maghrib:'Maghrib', isha:'Isha' };

  for (const key of order) {
    const pm = t2m(times[key]);
    if (pm > mins) {
      const diff = pm - mins;
      return { key, label: labels[key], minsRemaining: diff };
    }
  }
  // After isha — next is tomorrow's fajr
  const fajrMins = t2m(times.fajr) + 24 * 60;
  return { key: 'fajr', label: 'Fajr (tomorrow)', minsRemaining: fajrMins - mins };
}

/** Detect user's UTC offset */
export function getTimezoneOffset() {
  return -new Date().getTimezoneOffset() / 60;
}

export const PRAYER_LABELS = {
  fajr: 'Fajr', sunrise: 'Sunrise', dhuhr: 'Dhuhr',
  asr: 'Asr', maghrib: 'Maghrib', isha: 'Isha'
};

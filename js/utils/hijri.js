// js/utils/hijri.js — Gregorian ↔ Hijri calendar conversion

const HIJRI_MONTHS = [
  'Muharram','Ṣafar','Rabīʿ al-Awwal','Rabīʿ al-Thāni',
  'Jumādā al-Ūlā','Jumādā al-Ākhirah','Rajab','Shaʿbān',
  'Ramaḍān','Shawwāl','Dhū al-Qaʿdah','Dhū al-Ḥijjah'
];

export function toHijri(date = new Date()) {
  // Algorithm by Khalid Shaukat
  let m = date.getMonth() + 1;
  let d = date.getDate();
  let y = date.getFullYear();

  if (m < 3) { y -= 1; m += 12; }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  const JD = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5;

  const Z = Math.floor(JD - 1948438.5 + 0.5) / 29.53059;
  const K = Math.floor(Z);
  const R = Z - K;

  const hDay   = Math.floor(R * 29.53059) + 1;
  const hMonth = ((K % 12) + 12) % 12 + 1;
  const hYear  = Math.floor(K / 12) + 1;

  return {
    day: hDay,
    month: hMonth,
    year: hYear,
    monthName: HIJRI_MONTHS[hMonth - 1],
    formatted: `${hDay} ${HIJRI_MONTHS[hMonth - 1]} ${hYear} AH`,
  };
}

export { HIJRI_MONTHS };

/** Days remaining until Ramadan */
export function daysToRamadan() {
  const today = toHijri(new Date());
  if (today.month < 9) {
    // Count remaining days in current month + months to Ramadan
    const daysLeft = 30 - today.day; // approx
    const monthsLeft = 9 - today.month - 1;
    return daysLeft + monthsLeft * 29.5;
  }
  if (today.month === 9) return 0; // It's Ramadan!
  // Past Ramadan — count to next year's
  const daysLeft = 30 - today.day;
  const monthsLeft = 12 - today.month + 8; // to month 9 next year
  return Math.round(daysLeft + monthsLeft * 29.5);
}

/** Is it currently Ramadan? */
export function isRamadan() {
  return toHijri(new Date()).month === 9;
}

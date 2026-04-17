// js/state.js — shared reactive state across all pages

export const state = {
  // ── Currency ─────────────────────────────────
  currency: 'GBP',
  sym: '£',
  FX: { GBP: 1, USD: 1.294, EUR: 1.167, SAR: 4.851 },

  // ── Metal prices ──────────────────────────────
  goldGBP: 113.42,
  silverGBP: 1.07,
  pricesLive: false,
  pricesLoading: false,

  // ── Nisab ────────────────────────────────────
  nisabMethod: 'gold', // 'gold' | 'silver'
  GOLD_NISAB_G: 85,
  SILVER_NISAB_G: 595,

  // ── User location ─────────────────────────────
  location: null,   // { lat, lng, name }
  locationError: null,

  // ── Hijri date ────────────────────────────────
  hijriDate: null,

  // ── Listeners ────────────────────────────────
  _listeners: [],

  // ── Notify on change ──────────────────────────
  subscribe(fn) {
    this._listeners.push(fn);
    return () => { this._listeners = this._listeners.filter(l => l !== fn); };
  },
  notify() {
    this._listeners.forEach(fn => fn(this));
  },

  // ── Setters ───────────────────────────────────
  setCurrency(c, s) {
    this.currency = c;
    this.sym = s;
    this.notify();
  },
  setNisabMethod(m) {
    this.nisabMethod = m;
    this.notify();
  },
  setLocation(loc) {
    this.location = loc;
    this.notify();
  },
  setPrices(gold, silver, live) {
    this.goldGBP = gold;
    this.silverGBP = silver;
    this.pricesLive = live;
    this.notify();
  },

  // ── Computed helpers ──────────────────────────
  toLocal(gbpVal) {
    return gbpVal * (this.FX[this.currency] || 1);
  },
  get goldLocal() { return this.toLocal(this.goldGBP); },
  get silverLocal() { return this.toLocal(this.silverGBP); },
  get nisabValue() {
    return this.nisabMethod === 'gold'
      ? this.GOLD_NISAB_G * this.goldLocal
      : this.SILVER_NISAB_G * this.silverLocal;
  },
  fmt(n) {
    return this.sym + Number(n).toLocaleString('en-GB', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  },
};

// ── API fetchers ──────────────────────────────────────────────────────────────

export async function fetchFX() {
  try {
    const r = await fetch('https://api.frankfurter.app/latest?from=USD&to=GBP,EUR,SAR');
    if (!r.ok) return;
    const d = await r.json();
    state.FX.GBP = d.rates.GBP || 0.773;
    state.FX.EUR = d.rates.EUR || 0.922;
    state.FX.SAR = d.rates.SAR || 3.75;
  } catch (e) { /* use fallback */ }
}

export async function fetchPrices() {
  if (state.pricesLoading) return;
  state.pricesLoading = true;
  state.notify();
  try {
    const r = await fetch('https://api.metals.live/v1/spot/gold,silver');
    if (!r.ok) throw new Error();
    const d = await r.json();
    const gU = d.find?.(x => x.gold)?.gold || (Array.isArray(d) && d[0]?.gold);
    const sU = d.find?.(x => x.silver)?.silver || (Array.isArray(d) && d[1]?.silver);
    if (gU && sU) {
      await fetchFX();
      state.setPrices((gU / 31.1035) * state.FX.GBP, (sU / 31.1035) * state.FX.GBP, true);
      state.pricesLoading = false;
      state.notify();
      return;
    }
  } catch (e) { /* fall through */ }
  await fetchFX();
  state.setPrices(113.42, 1.07, false);
  state.pricesLoading = false;
  state.notify();
}

export async function requestLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      state.locationError = 'Geolocation not supported by your browser';
      state.notify();
      return reject(state.locationError);
    }
    navigator.geolocation.getCurrentPosition(
      async pos => {
        const { latitude: lat, longitude: lng } = pos.coords;
        let name = 'Your location';
        try {
          const r = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          );
          if (r.ok) {
            const d = await r.json();
            name = d.address?.city || d.address?.town || d.address?.county || name;
          }
        } catch (e) { /* ignore */ }
        state.setLocation({ lat, lng, name });
        state.locationError = null;
        resolve(state.location);
      },
      err => {
        state.locationError = 'Location access denied. Enter coordinates manually.';
        state.notify();
        reject(state.locationError);
      },
      { timeout: 10000 }
    );
  });
}

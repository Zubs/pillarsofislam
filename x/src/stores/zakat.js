import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useZakatStore = defineStore('zakat', () => {
  // ── State ────────────────────────────────────────────────────
  const currency = ref('GBP')
  const sym = ref('£')
  const FX = ref({
    GBP: 1,
    USD: 1.294,
    EUR: 1.167,
    SAR: 4.851
  })
  const goldGBP = ref(113.42)
  const silverGBP = ref(1.07)
  const pricesLive = ref(false)
  const pricesLoading = ref(false)
  const nisabMethod = ref('gold')  // 'gold' | 'silver'
  const location = ref(null)    // { lat, lng, name }
  const locationError = ref(null)
  const GOLD_NISAB_G = 85
  const SILVER_NISAB_G = 595

  // ── Computed ─────────────────────────────────────────────────
  const goldLocal = computed(() => goldGBP.value * (FX.value[currency.value] || 1))
  const silverLocal = computed(() => silverGBP.value * (FX.value[currency.value] || 1))
  const nisabValue = computed(() =>
    nisabMethod.value === 'gold'
      ? GOLD_NISAB_G * goldLocal.value
      : SILVER_NISAB_G * silverLocal.value
  )

  function fmt(n) {
    return sym.value + Number(n).toLocaleString('en-GB', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  // ── Actions ──────────────────────────────────────────────────
  function setCurrency(c, s) {
    currency.value = c;
    sym.value = s
  }

  function setNisabMethod(m) {
    nisabMethod.value = m
  }

  function setLocation(loc) {
    location.value = loc
  }

  async function fetchFX() {
    try {
      const r = await fetch('https://api.frankfurter.app/latest?from=USD&to=GBP,EUR,SAR')
      if (!r.ok) {
        return
      }

      const d = await r.json()
      FX.value.GBP = d.rates.GBP || 0.773
      FX.value.EUR = d.rates.EUR || 0.922
      FX.value.SAR = d.rates.SAR || 3.75
    } catch { /* use fallback */
    }
  }

  async function fetchPrices() {
    if (pricesLoading.value) {
      return
    }

    pricesLoading.value = true
    try {
      const r = await fetch('https://api.metals.live/v1/spot/gold,silver')
      if (!r.ok) {
        throw new Error()
      }

      const d = await r.json()
      const gU = d.find?.(x => x.gold)?.gold || (Array.isArray(d) && d[0]?.gold)
      const sU = d.find?.(x => x.silver)?.silver || (Array.isArray(d) && d[1]?.silver)
      if (gU && sU) {
        await fetchFX()
        goldGBP.value = (gU / 31.1035) * FX.value.GBP
        silverGBP.value = (sU / 31.1035) * FX.value.GBP
        pricesLive.value = true
        return
      }
    } catch { /* fall through */
    }
    await fetchFX()
    goldGBP.value = 113.42
    silverGBP.value = 1.07
    pricesLive.value = false
  }

  async function requestLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        locationError.value = 'Geolocation not supported'
        return reject(locationError.value)
      }

      navigator.geolocation.getCurrentPosition(
        async pos => {
          const {latitude: lat, longitude: lng} = pos.coords
          let name = 'Your location'
          try {
            const r = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
            )

            if (r.ok) {
              const d = await r.json()
              name = d.address?.city || d.address?.town || d.address?.county || name
            }
          } catch { /* ignore */
          }
          location.value = {
            lat,
            lng,
            name
          }

          locationError.value = null
          resolve(location.value)
        },
        err => {
          locationError.value = 'Location access denied. Enter coordinates manually.'
          reject(locationError.value)
        },
        {timeout: 10000}
      )
    })
  }

  return {
    currency,
    sym,
    FX,
    goldGBP,
    silverGBP,
    pricesLive,
    pricesLoading,
    nisabMethod,
    location,
    locationError,
    GOLD_NISAB_G,
    SILVER_NISAB_G,
    goldLocal,
    silverLocal,
    nisabValue,
    fmt,
    setCurrency,
    setNisabMethod,
    setLocation,
    fetchFX,
    fetchPrices,
    requestLocation,
  }
})

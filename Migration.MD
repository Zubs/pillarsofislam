# IslamicHub — Vue 3 Migration Guide

Complete step-by-step guide to rewriting IslamicHub from vanilla JS to Vue 3
using `npm create vue@latest`, Pinia, Vue Router, and Vite.

---

## What you'll end up with

```
islamichub-vue/
├── public/                         ← Static assets (favicon, og-image, robots.txt)
├── src/
│   ├── main.js                     ← App entry point
│   ├── App.vue                     ← Root component (nav + router-view + footer)
│   ├── router/
│   │   └── index.js                ← Vue Router: all routes
│   ├── stores/
│   │   └── zakat.js                ← Pinia: prices, currency, nisab, location
│   ├── utils/                      ← Copied unchanged from vanilla project
│   │   ├── prayer.js
│   │   ├── qibla.js
│   │   ├── hijri.js
│   │   └── inheritance.js
│   ├── composables/
│   │   └── useSeo.js               ← Per-route meta/title updater
│   ├── assets/
│   │   └── css/                    ← All 4 CSS files copied unchanged
│   │       ├── tokens.css
│   │       ├── base.css
│   │       ├── components.css
│   │       └── ornament.css
│   └── views/                      ← One .vue file per page/route
│       ├── HomeView.vue
│       ├── pillar/
│       │   ├── FaithView.vue
│       │   ├── PrayerView.vue
│       │   ├── ZakatView.vue
│       │   ├── FastingView.vue
│       │   └── HajjView.vue
│       └── tools/
│           ├── InheritanceView.vue
│           ├── AboutView.vue
│           └── ChangelogView.vue
├── index.html
├── vite.config.js
├── netlify.toml
└── package.json
```

---

## Step 1 — Scaffold the Vue project

Open a terminal and run:

```bash
npm create vue@latest islamichub-vue
```

You will be prompted with these options. Answer exactly as shown:

```
✔ Project name: islamichub-vue
✔ Add TypeScript? → No
✔ Add JSX Support? → No
✔ Add Vue Router for Single Page Application development? → Yes
✔ Add Pinia for state management? → Yes
✔ Add Vitest for Unit Testing? → No
✔ Add an End-to-End Testing Solution? → No
✔ Add ESLint for code quality? → Yes
✔ Add Prettier for code formatting? → Yes
✔ Add Vue DevTools 7 extension for debugging? → Yes (optional, recommended)
```

Then:

```bash
cd islamichub-vue
npm install
npm run dev        # Verify it starts at http://localhost:5173
```

You should see the default Vue welcome page. That confirms the scaffold works.

---

## Step 2 — Install additional dependencies

```bash
# vue-meta handles per-route <title> and <meta> tags
npm install @unhead/vue

# (Optional but recommended) auto-import composables
npm install -D unplugin-auto-import unplugin-vue-components
```

---

## Step 3 — Copy your CSS files unchanged

Your four CSS files are **pure CSS custom properties** — they work in Vite with zero changes.

```bash
# From your vanilla project root:
cp css/tokens.css     islamichub-vue/src/assets/css/tokens.css
cp css/base.css       islamichub-vue/src/assets/css/base.css
cp css/components.css islamichub-vue/src/assets/css/components.css
cp css/ornament.css   islamichub-vue/src/assets/css/ornament.css
```

---

## Step 4 — Copy your utility files unchanged

Your utils are pure functions with no DOM dependency — they move with zero changes.

```bash
cp js/utils/prayer.js      islamichub-vue/src/utils/prayer.js
cp js/utils/qibla.js       islamichub-vue/src/utils/qibla.js
cp js/utils/hijri.js       islamichub-vue/src/utils/hijri.js
cp js/utils/inheritance.js islamichub-vue/src/utils/inheritance.js
```

---

## Step 5 — Copy public assets

```bash
cp favicon.svg             islamichub-vue/public/favicon.svg
cp og-image.png            islamichub-vue/public/og-image.png   # if it exists
cp robots.txt              islamichub-vue/public/robots.txt
cp sitemap.xml             islamichub-vue/public/sitemap.xml
cp site.webmanifest        islamichub-vue/public/site.webmanifest
cp CONTRIBUTING.md         islamichub-vue/public/CONTRIBUTING.md
cp CHANGELOG.md            islamichub-vue/public/CHANGELOG.md
```

---

## Step 6 — Configure Vite

Replace `vite.config.js` with:

```js
// vite.config.js
import {fileURLToPath, URL} from 'node:url'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    // Ensures Vite doesn't strip the hash from URLs on dev server
    server: {
        historyApiFallback: true,
    },
})
```

---

## Step 7 — Set up main.js

Replace `src/main.js` with:

```js
// src/main.js
import {createApp} from 'vue'
import {createPinia} from 'pinia'
import {createHead} from '@unhead/vue'

import App from './App.vue'
import router from './router/index.js'

// Global CSS — imported once here, available everywhere
import './assets/css/tokens.css'
import './assets/css/base.css'
import './assets/css/components.css'
import './assets/css/ornament.css'

const app = createApp(App)
const pinia = createPinia()
const head = createHead()

app.use(pinia)
app.use(router)
app.use(head)

app.mount('#app')

// Kick off price fetching immediately (same as vanilla bootstrap())
import {useZakatStore} from './stores/zakat.js'

const store = useZakatStore()
store.fetchPrices()
```

---

## Step 8 — Set up the Pinia store

This replaces `js/state.js`. Create `src/stores/zakat.js`:

```js
// src/stores/zakat.js
import {defineStore} from 'pinia'
import {ref, computed} from 'vue'

export const useZakatStore = defineStore('zakat', () => {
    // ── State ────────────────────────────────────────────────────
    const currency = ref('GBP')
    const sym = ref('£')
    const FX = ref({GBP: 1, USD: 1.294, EUR: 1.167, SAR: 4.851})
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
            if (!r.ok) return
            const d = await r.json()
            FX.value.GBP = d.rates.GBP || 0.773
            FX.value.EUR = d.rates.EUR || 0.922
            FX.value.SAR = d.rates.SAR || 3.75
        } catch { /* use fallback */
        }
    }

    async function fetchPrices() {
        if (pricesLoading.value) return
        pricesLoading.value = true
        try {
            const r = await fetch('https://api.metals.live/v1/spot/gold,silver')
            if (!r.ok) throw new Error()
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
                    location.value = {lat, lng, name}
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
        currency, sym, FX, goldGBP, silverGBP, pricesLive, pricesLoading,
        nisabMethod, location, locationError,
        GOLD_NISAB_G, SILVER_NISAB_G,
        goldLocal, silverLocal, nisabValue,
        fmt, setCurrency, setNisabMethod, setLocation,
        fetchFX, fetchPrices, requestLocation,
    }
})
```

---

## Step 9 — Set up Vue Router

Replace `src/router/index.js` with:

```js
// src/router/index.js
import {createRouter, createWebHistory} from 'vue-router'

// Lazy-loaded views — Vite code-splits each route automatically
const routes = [
    {path: '/', name: 'home', component: () => import('@/views/HomeView.vue')},
    {path: '/faith', name: 'faith', component: () => import('@/views/pillar/FaithView.vue')},
    {path: '/prayer', name: 'prayer', component: () => import('@/views/pillar/PrayerView.vue')},
    {path: '/zakat', name: 'zakat', component: () => import('@/views/pillar/ZakatView.vue')},
    {path: '/fasting', name: 'fasting', component: () => import('@/views/pillar/FastingView.vue')},
    {path: '/hajj', name: 'hajj', component: () => import('@/views/pillar/HajjView.vue')},
    {path: '/inheritance', name: 'inheritance', component: () => import('@/views/tools/InheritanceView.vue')},
    {path: '/about', name: 'about', component: () => import('@/views/tools/AboutView.vue')},
    {path: '/changelog', name: 'changelog', component: () => import('@/views/tools/ChangelogView.vue')},
    // Catch-all: redirect unknown routes to home
    {path: '/:pathMatch(.*)*', redirect: '/'},
]

const router = createRouter({
    // createWebHistory uses clean URLs (/zakat not #/zakat)
    // Netlify's _redirects handles server-side fallback
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition
        return {top: 0, behavior: 'instant'}
    },
})

export default router
```

---

## Step 10 — SEO composable

Create `src/composables/useSeo.js`:

```js
// src/composables/useSeo.js
// Called inside each view's setup() to set per-page <title> and <meta>
import {useHead} from '@unhead/vue'

const BASE = 'https://islamichub.xyz'

const ROUTE_META = {
    home: {
        title: 'IslamicHub — Islamic Education, Prayer Times, Zakat Calculator & Five Pillars Guide',
        description: "Free Islamic learning platform covering all Five Pillars of Islam. Accurate prayer times and Qibla direction, Zakat calculator with live gold prices, Islamic inheritance (Fara'id) calculator, and Hadith-based scholarly guides.",
    },
    faith: {
        title: 'Shahada — Declaration of Faith, Tawhid & First Pillar of Islam | IslamicHub',
        description: 'Learn about the Shahada, the first pillar of Islam — Tawhid, the seven conditions, Risala, and all three dimensions of divine oneness, with Qur\'anic verses and Hadith.',
    },
    prayer: {
        title: 'Prayer Times, Qibla Direction & Salah Guide | IslamicHub',
        description: 'Get accurate Islamic prayer times for your location with 5 calculation methods. Find the Qibla direction with a live compass. Learn the second pillar of Islam with Hadith references.',
    },
    zakat: {
        title: 'Accurate Zakat Calculator Online — Live Gold & Silver Prices | IslamicHub',
        description: 'Calculate your annual Zakat with live gold and silver prices. Supports cash, gold/silver by weight, shares, ISAs, pensions, business inventory, and debt deductions. Dual Nisab methods. Free and private.',
    },
    fasting: {
        title: 'Ramadan Fasting Tracker, Suhoor & Iftar Times | IslamicHub',
        description: 'Live Suhoor and Iftar times for your location, fasting progress bar, Ramadan countdown, and a comprehensive Hadith-based guide to Sawm rulings.',
    },
    hajj: {
        title: 'Hajj Rites Guide — Complete Step-by-Step Pilgrimage | IslamicHub',
        description: 'Day-by-day Hajj rites for all five days, three types of Hajj (Tamattu, Qiran, Ifrad), full Umrah guide, conditions of obligation, and rulings from all four schools.',
    },
    inheritance: {
        title: "Islamic Inheritance Calculator (Fara'id) | IslamicHub",
        description: "Calculate Qur'anic inheritance shares for all 13 heir types based on Qur'an 4:11–12. Automatic blocking rules, awl reduction, and visual breakdown.",
    },
    about: {
        title: 'About IslamicHub — Open Source Islamic Education Platform',
        description: "Open-source Islamic education platform built by Zubair Idris Aweda and Yusuf Saif. Learn our mission, methodology, scholarly sources, and how to contribute on GitHub.",
    },
    changelog: {
        title: 'Changelog — IslamicHub Updates',
        description: 'Full changelog for IslamicHub: version history, new features, bug fixes, and improvements.',
    },
}

export function useSeo(routeName) {
    const meta = ROUTE_META[routeName] || ROUTE_META.home
    useHead({
        title: meta.title,
        meta: [
            {name: 'description', content: meta.description},
            {property: 'og:title', content: meta.title},
            {property: 'og:description', content: meta.description},
            {property: 'og:url', content: `${BASE}/${routeName === 'home' ? '' : routeName}`},
            {name: 'twitter:title', content: meta.title},
            {name: 'twitter:description', content: meta.description},
        ],
        link: [
            {rel: 'canonical', href: `${BASE}/${routeName === 'home' ? '' : routeName}`},
        ],
    })
}
```

---

## Step 11 — Root App.vue

Replace `src/App.vue` with:

```vue
<!-- src/App.vue -->
<template>
  <!-- Loading screen — shown until prices load on first visit -->
  <Transition name="loading">
    <div v-if="showLoading" class="loading-screen" role="status" aria-label="Loading IslamicHub">
      <div class="loading-inner">
        <div class="loading-ornament" aria-hidden="true">
          <div class="lo-gem"></div>
        </div>
        <div class="loading-bismillah" lang="ar">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</div>
        <div class="loading-logo" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5">
            <polygon points="12,2 20,7 20,17 12,22 4,17 4,7"/>
            <polygon points="12,6 17,9 17,15 12,18 7,15 7,9"/>
          </svg>
        </div>
        <div class="loading-name">Islamic<span>Hub</span></div>
        <div class="loading-sub">In the name of Allah, the Most Gracious, the Most Merciful</div>
      </div>
    </div>
  </Transition>

  <!-- Site nav -->
  <SiteNav/>

  <!-- Page content — Vue Router renders the matching view here -->
  <main id="app" role="main">
    <RouterView v-slot="{ Component }">
      <Transition name="page-fade" mode="out-in">
        <component :is="Component" :key="$route.path"/>
      </Transition>
    </RouterView>
  </main>

  <!-- Site footer -->
  <SiteFooter/>
</template>

<script setup>
  import {ref, onMounted} from 'vue'
  import {RouterView} from 'vue-router'
  import {useZakatStore} from '@/stores/zakat.js'
  import SiteNav from '@/components/SiteNav.vue'
  import SiteFooter from '@/components/SiteFooter.vue'

  const store = useZakatStore()
  const showLoading = ref(true)
  const MIN_MS = 2000
  const start = Date.now()

  onMounted(async () => {
    await store.fetchPrices()
    const elapsed = Date.now() - start
    const remaining = Math.max(0, MIN_MS - elapsed)
    setTimeout(() => {
      showLoading.value = false
    }, remaining)
  })
</script>

<style>
  /* Loading screen */
  .loading-screen {
    position: fixed;
    inset: 0;
    background-color: var(--cream);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }

  .loading-inner {
    text-align: center;
    max-width: 280px;
    padding: 0 1.5rem;
  }

  .loading-ornament {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 1.25rem;
  }

  .loading-ornament::before, .loading-ornament::after {
    content: '';
    height: 1px;
    width: 44px;
    background: linear-gradient(to right, transparent, var(--gold));
  }

  .loading-ornament::after {
    background: linear-gradient(to left, transparent, var(--gold));
  }

  .lo-gem {
    width: 7px;
    height: 7px;
    background: var(--gold);
    transform: rotate(45deg);
  }

  .loading-bismillah {
    font-size: 1.6rem;
    color: var(--green);
    direction: rtl;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .loading-logo {
    width: 48px;
    height: 48px;
    background: var(--green);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto .75rem;
  }

  .loading-name {
    font-family: var(--serif);
    font-size: 1.7rem;
    font-weight: 600;
    color: var(--ink);
    margin-bottom: .2rem;
  }

  .loading-name span {
    color: var(--green);
  }

  .loading-sub {
    font-size: 11px;
    color: var(--muted);
  }

  /* Loading transition */
  .loading-enter-active, .loading-leave-active {
    transition: opacity .4s ease;
  }

  .loading-enter-from, .loading-leave-to {
    opacity: 0;
  }

  /* Page fade transition */
  .page-fade-enter-active, .page-fade-leave-active {
    transition: opacity .15s ease, transform .15s ease;
  }

  .page-fade-enter-from {
    opacity: 0;
    transform: translateY(8px);
  }

  .page-fade-leave-to {
    opacity: 0;
    transform: translateY(-4px);
  }
</style>
```

---

## Step 12 — Create shared components

### SiteNav.vue

Create `src/components/SiteNav.vue`:

```vue
<!-- src/components/SiteNav.vue -->
<template>
  <header class="site-nav" role="banner">
    <div class="nav-inner">
      <RouterLink to="/" class="nav-logo" aria-label="IslamicHub home">
        <div class="nav-logo-mark" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5">
            <polygon points="12,2 20,7 20,17 12,22 4,17 4,7"/>
            <polygon points="12,6 17,9 17,15 12,18 7,15 7,9"/>
          </svg>
        </div>
        <span class="nav-logo-text">Islamic<span>Hub</span></span>
      </RouterLink>

      <nav class="nav-pillars" aria-label="Five Pillars navigation">
        <RouterLink v-for="p in pillars" :key="p.to" :to="p.to" class="nav-pill" :aria-label="p.label">
          <span class="nav-pill-icon" aria-hidden="true">{{ p.icon }}</span>
          <span class="nav-pill-label">{{ p.name }}</span>
        </RouterLink>
      </nav>

      <div class="nav-right">
        <RouterLink to="/inheritance" class="nav-tools-btn">⚖️ Inheritance</RouterLink>
        <RouterLink to="/about" class="nav-tools-btn">About</RouterLink>
        <a :href="GITHUB_REPO" target="_blank" rel="noopener noreferrer"
           class="nav-tools-btn" style="display:inline-flex;align-items:center;gap:5px">
          <GithubIcon/>
          GitHub
        </a>
      </div>

      <button class="nav-hamburger" @click="menuOpen = !menuOpen"
              :aria-expanded="menuOpen" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>

    <!-- Mobile menu -->
    <div class="nav-mobile-menu" :class="{ open: menuOpen }" role="dialog">
      <RouterLink v-for="item in allLinks" :key="item.to"
                  :to="item.to" class="nav-mobile-item" @click="menuOpen = false">
        <span class="icon" aria-hidden="true">{{ item.icon }}</span>
        {{ item.label }}
      </RouterLink>
    </div>
  </header>
</template>

<script setup>
  import {ref} from 'vue'
  import {RouterLink} from 'vue-router'

  const GITHUB_REPO = 'https://github.com/Zubs/pillarsofislam'
  const menuOpen = ref(false)

  const pillars = [
    {to: '/faith', icon: '☪️', name: 'Faith', label: 'Faith — Shahada'},
    {to: '/prayer', icon: '🕌', name: 'Prayer', label: 'Prayer — Salah and prayer times'},
    {to: '/zakat', icon: '✦', name: 'Zakat', label: 'Zakat calculator'},
    {to: '/fasting', icon: '🌙', name: 'Fasting', label: 'Fasting — Sawm and Ramadan'},
    {to: '/hajj', icon: '🕋', name: 'Hajj', label: 'Hajj — Pilgrimage guide'},
  ]

  const allLinks = [
    {to: '/', icon: '🏠', label: 'Home'},
    {to: '/faith', icon: '☪️', label: 'Faith (Shahada)'},
    {to: '/prayer', icon: '🕌', label: 'Prayer (Salah) & Prayer Times'},
    {to: '/zakat', icon: '✦', label: 'Zakat Calculator'},
    {to: '/fasting', icon: '🌙', label: 'Fasting (Sawm) & Ramadan'},
    {to: '/hajj', icon: '🕋', label: 'Hajj — Pilgrimage Guide'},
    {to: '/inheritance', icon: '⚖️', label: "Inheritance (Fara'id) Calculator"},
    {to: '/about', icon: 'ℹ️', label: 'About & Contributors'},
    {to: '/changelog', icon: '📋', label: 'Changelog'},
  ]
</script>
```

### GeoPattern.vue (replaces the geoPattern() helper)

Create `src/components/GeoPattern.vue`:

```vue
<!-- src/components/GeoPattern.vue -->
<template>
  <div class="geo-bg" aria-hidden="true">
    <svg xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="gp" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <polygon points="50,4 96,28 96,72 50,96 4,72 4,28" fill="none" stroke="#8BC4A8" stroke-width=".8"/>
          <polygon points="50,16 84,34 84,66 50,84 16,66 16,34" fill="none" stroke="#8BC4A8" stroke-width=".4"/>
          <line x1="50" y1="4" x2="50" y2="96" stroke="#8BC4A8" stroke-width=".25"/>
          <line x1="4" y1="28" x2="96" y2="72" stroke="#8BC4A8" stroke-width=".25"/>
          <line x1="96" y1="28" x2="4" y2="72" stroke="#8BC4A8" stroke-width=".25"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#gp)"/>
    </svg>
  </div>
</template>
```

### QuranBlock.vue (reusable component)

Create `src/components/QuranBlock.vue`:

```vue
<!-- src/components/QuranBlock.vue -->
<template>
  <div class="quran-block" :class="{ 'frame-calligraphy': framed, 'anim-target': animate }">
    <template v-if="framed">
      <div class="corner-ornament top-left" aria-hidden="true"></div>
      <div class="corner-ornament top-right" aria-hidden="true"></div>
      <div class="corner-ornament bottom-left" aria-hidden="true"></div>
      <div class="corner-ornament bottom-right" aria-hidden="true"></div>
    </template>
    <GeoPattern v-else/>
    <div class="quran-arabic" lang="ar">{{ arabic }}</div>
    <div class="quran-ref">{{ reference }}</div>
    <div class="quran-trans">"{{ translation }}"
      <template v-if="note"> — {{ note }}</template>
    </div>
  </div>
</template>

<script setup>
  import GeoPattern from './GeoPattern.vue'

  defineProps({
    arabic: {type: String, required: true},
    reference: {type: String, required: true},
    translation: {type: String, required: true},
    note: {type: String, default: ''},
    framed: {type: Boolean, default: false},
    animate: {type: Boolean, default: true},
  })
</script>
```

### FaqList.vue

Create `src/components/FaqList.vue`:

```vue
<!-- src/components/FaqList.vue -->
<template>
  <div class="faq-list">
    <div v-for="(faq, i) in faqs" :key="i" class="faq-item">
      <button class="faq-q" @click="toggle(i)">
        {{ faq.q }}
        <span class="faq-chev" :class="{ open: openIndex === i }">+</span>
      </button>
      <div class="faq-a" :class="{ open: openIndex === i }">{{ faq.a }}</div>
    </div>
  </div>
</template>

<script setup>
  import {ref} from 'vue'

  defineProps({faqs: {type: Array, required: true}})
  const openIndex = ref(null)

  function toggle(i) {
    openIndex.value = openIndex.value === i ? null : i
  }
</script>
```

---

## Step 13 — Example view (ZakatView.vue)

This shows the pattern for all interactive tool views.

Create `src/views/pillar/ZakatView.vue`:

```vue
<!-- src/views/pillar/ZakatView.vue -->
<template>
  <div>
    <div class="page-header pillar-header-zakat">
      <GeoPattern/>
      <div class="page-header-inner">
        <div class="pillar-num-badge" style="background:var(--zakat-light);color:var(--zakat-color)">
          Pillar 3 of 5 &nbsp;·&nbsp; الزكاة
        </div>
        <h1>Zakat — Obligatory Almsgiving</h1>
        <p>The third pillar — an annual 2.5% levy on zakatable wealth above the Nisab threshold.</p>
      </div>
    </div>

    <div class="content-wrap" style="max-width:1100px">

      <!-- Nisab / Currency controls -->
      <div class="card" style="margin-bottom:1rem">
        <div
            style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:12px">
          <div>
            <div class="ctrl-label">Currency</div>
            <div class="btn-group">
              <button v-for="c in currencies" :key="c.code"
                      class="pill-btn" :class="{ active: store.currency === c.code }"
                      @click="store.setCurrency(c.code, c.sym)">
                {{ c.sym }} {{ c.code }}
              </button>
            </div>
          </div>
          <div>
            <div class="ctrl-label" style="text-align:right">Nisab method</div>
            <div class="btn-group">
              <button class="pill-btn" :class="{ active: store.nisabMethod === 'gold' }"
                      @click="store.setNisabMethod('gold')">Gold (85g)
              </button>
              <button class="pill-btn" :class="{ active: store.nisabMethod === 'silver' }"
                      @click="store.setNisabMethod('silver')">Silver (595g)
              </button>
            </div>
          </div>
        </div>
        <div style="display:flex;justify-content:space-between;border-top:1px solid var(--border);padding-top:12px">
          <div>
            <div class="ctrl-label">Nisab threshold</div>
            <span style="font-family:var(--serif);font-size:1.6rem;font-weight:600;color:var(--green)">
              {{ store.fmt(store.nisabValue) }}
            </span>
            <span style="font-size:12px;color:var(--muted);margin-left:6px">
              {{ store.nisabMethod === 'gold'
                ? `85g × ${store.sym}${store.goldLocal.toFixed(2)}/g`
                : `595g × ${store.sym}${store.silverLocal.toFixed(2)}/g` }}
            </span>
          </div>
          <div style="text-align:right">
            <div class="ctrl-label">Gold price</div>
            <span>{{ store.sym }}{{ store.goldLocal.toFixed(2) }}/g</span>
            <span class="badge" :class="store.pricesLive ? 'badge-green' : 'badge-gold'" style="margin-left:6px">
              {{ store.pricesLive ? 'live' : 'reference' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Calculator layout -->
      <div class="calc-layout">
        <div>
          <!-- Cash & savings accordion -->
          <ZakatAccordion title="Cash & Bank Savings" sub="All liquid money you hold" icon="💵" icon-class="ai-teal"
                          :total="store.fmt(cashTotal)">
            <template #reference>
              <strong>Qur'an 9:103 · Sahih Bukhari 1454</strong>
              Cash and bank balances held above Nisab for a full lunar year are zakatable at 2.5%.
            </template>
            <div class="field-grid">
              <div class="field"><label>Cash at home</label>
                <div class="pfx-wrap"><span class="pfx">{{ store.sym }}</span>
                  <input type="number" class="input-field" v-model.number="fields.cashHome" min="0" placeholder="0.00">
                </div>
              </div>
              <div class="field"><label>Current accounts</label>
                <div class="pfx-wrap"><span class="pfx">{{ store.sym }}</span>
                  <input type="number" class="input-field" v-model.number="fields.cashCurrent" min="0"
                         placeholder="0.00">
                </div>
              </div>
              <div class="field"><label>Savings accounts</label>
                <div class="pfx-wrap"><span class="pfx">{{ store.sym }}</span>
                  <input type="number" class="input-field" v-model.number="fields.cashSavings" min="0"
                         placeholder="0.00">
                </div>
              </div>
              <div class="field"><label>Foreign currency (converted)</label>
                <div class="pfx-wrap"><span class="pfx">{{ store.sym }}</span>
                  <input type="number" class="input-field" v-model.number="fields.cashForeign" min="0"
                         placeholder="0.00">
                </div>
              </div>
            </div>
          </ZakatAccordion>

          <!-- … other accordions follow the same pattern … -->
        </div>

        <!-- Sidebar results -->
        <div class="calc-sidebar">
          <div class="results-card">
            <div class="rc-header">
              <span class="rc-title">Your Zakat</span>
              <span class="rc-rate">2.5% · 1/40th</span>
            </div>
            <div class="rc-body">
              <div class="hawl-warn">
                ⚠ <strong>Hawl:</strong> Zakat is only due after your wealth has exceeded
                Nisab for one complete lunar year (~354 days).
              </div>
              <div class="result-box" :class="obligated ? 'result-due' : 'result-none'">
                <div class="rb-label">
                  {{ obligated
                  ? 'Zakat is due — 2.5% of net zakatable wealth:'
                  : net > 0 ? 'Below Nisab — no obligation this year' : 'Enter your assets to begin' }}
                </div>
                <div :class="obligated ? 'rb-amount' : 'rb-empty'">
                  {{ obligated ? store.fmt(zakatDue) : net > 0 ? 'Below threshold' : '—' }}
                </div>
              </div>
              <div class="progress-bar" style="margin:10px 0 3px">
                <div class="progress-fill" :style="{ width: progressPct + '%' }"></div>
              </div>
              <div style="display:flex;justify-content:space-between;font-size:10.5px;color:#bbb;margin-bottom:12px">
                <span>{{ store.fmt(0) }}</span>
                <span>{{ store.fmt(store.nisabValue / 2) }}</span>
                <span>{{ store.fmt(store.nisabValue) }} (Nisab)</span>
              </div>
              <!-- Breakdown rows -->
              <div v-for="row in breakdown" :key="row.label"
                   class="brow" :class="{ bd: row.deduct, bt: row.bold, bh: row.highlight }">
                <span class="bl">{{ row.label }}</span>
                <span class="bv">{{ row.value > 0 ? (row.deduct ? '−' : '') + store.fmt(row.value) : '—' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {reactive, computed} from 'vue'
  import {useZakatStore} from '@/stores/zakat.js'
  import {useSeo} from '@/composables/useSeo.js'
  import GeoPattern from '@/components/GeoPattern.vue'
  import ZakatAccordion from '@/components/ZakatAccordion.vue'

  useSeo('zakat')

  const store = useZakatStore()

  const currencies = [
    {code: 'GBP', sym: '£'},
    {code: 'USD', sym: '$'},
    {code: 'EUR', sym: '€'},
    {code: 'SAR', sym: '﷼'},
  ]

  const fields = reactive({
    cashHome: 0, cashCurrent: 0, cashSavings: 0, cashForeign: 0,
    loansGiven: 0, unpaidIncome: 0, otherOwed: 0,
    goldGrams: 0, goldPurity: 0.9167, silverGrams: 0, metalsDirect: 0,
    shares: 0, isas: 0, inventory: 0, pension: 0,
    loansDue: 0, creditCards: 0, bills: 0, otherDebts: 0,
  })

  const cashTotal = computed(() => fields.cashHome + fields.cashCurrent + fields.cashSavings + fields.cashForeign)
  const owedTotal = computed(() => fields.loansGiven + fields.unpaidIncome + fields.otherOwed)
  const metalsTotal = computed(() => fields.goldGrams * store.goldLocal * fields.goldPurity + fields.silverGrams * store.silverLocal + fields.metalsDirect)
  const investTotal = computed(() => fields.shares + fields.isas + fields.inventory + fields.pension)
  const debtsTotal = computed(() => fields.loansDue + fields.creditCards + fields.bills + fields.otherDebts)
  const gross = computed(() => cashTotal.value + owedTotal.value + metalsTotal.value + investTotal.value)
  const net = computed(() => Math.max(0, gross.value - debtsTotal.value))
  const zakatDue = computed(() => net.value >= store.nisabValue ? net.value * 0.025 : 0)
  const obligated = computed(() => net.value >= store.nisabValue)
  const progressPct = computed(() => store.nisabValue > 0 ? Math.min(100, (net.value / store.nisabValue) * 100) : 0)

  const breakdown = computed(() => [
    {label: 'Cash & savings', value: cashTotal.value, deduct: false, bold: false, highlight: false},
    {label: 'Money owed', value: owedTotal.value, deduct: false, bold: false, highlight: false},
    {label: 'Gold & silver', value: metalsTotal.value, deduct: false, bold: false, highlight: false},
    {label: 'Investments', value: investTotal.value, deduct: false, bold: false, highlight: false},
    {label: 'Gross zakatable', value: gross.value, deduct: false, bold: true, highlight: false},
    {label: 'Less: debts', value: debtsTotal.value, deduct: true, bold: true, highlight: false},
    {label: 'Net zakatable', value: net.value, deduct: false, bold: true, highlight: false},
    {label: 'Zakat due (2.5%)', value: zakatDue.value, deduct: false, bold: true, highlight: true},
  ])
</script>
```

---

## Step 14 — Update index.html

Replace `index.html` (in project root) with:

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Base title — overridden per-route by @unhead/vue -->
    <title>IslamicHub — Islamic Education & Five Pillars Tools</title>
    <meta name="description"
          content="Free Islamic education platform: prayer times, Zakat calculator, Qibla finder, and guides for all Five Pillars.">
    <meta name="theme-color" content="#1B5C42">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="manifest" href="/site.webmanifest">
    <!-- Fonts preloaded for performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,400&family=DM+Sans:opsz,wght@9..40,400;9..40,500&display=swap"
          rel="stylesheet">
</head>
<body>
<div id="app"></div>
<!-- Vite injects the bundled JS here automatically -->
<script type="module" src="/src/main.js"></script>
</body>
</html>
```

---

## Step 15 — Update Netlify config for clean URLs

Vue Router with `createWebHistory` uses clean paths (`/zakat`, not `#/zakat`).
Netlify needs to redirect all paths to `index.html`.

Replace `netlify.toml`:

```toml
[build]
command = "npm run build"
publish = "dist"

[[redirects]]
from = "/*"
to = "/index.html"
status = 200

[[headers]]
for = "/*"
[headers.values]
X-Frame-Options = "DENY"
X-Content-Type-Options = "nosniff"
Cache-Control = "public, max-age=0, must-revalidate"

[[headers]]
for = "/assets/*"
[headers.values]
Cache-Control = "public, max-age=31536000, immutable"
```

And delete `_redirects` — `netlify.toml` covers it.

---

## Step 16 — Build and deploy

```bash
# Build for production
npm run build

# Preview the production build locally
npm run preview

# Deploy — push to GitHub and Netlify auto-deploys,
# or deploy manually:
npx netlify deploy --prod --dir=dist
```

---

## Migration mapping: vanilla → Vue

| Vanilla                   | Vue equivalent                                 |
|---------------------------|------------------------------------------------|
| `js/state.js` object      | `src/stores/zakat.js` (Pinia)                  |
| `js/router.js` class      | `src/router/index.js` (Vue Router)             |
| `js/seo.js` updateSEO()   | `src/composables/useSeo.js` + @unhead          |
| `js/app.js` buildNav()    | `src/components/SiteNav.vue`                   |
| `js/app.js` buildFooter() | `src/components/SiteFooter.vue`                |
| `js/app.js` geoPattern()  | `src/components/GeoPattern.vue`                |
| `js/app.js` initFaqs()    | `src/components/FaqList.vue`                   |
| `pages/*.js` render()     | `src/views/*.vue` (template + script)          |
| `js/utils/*.js`           | `src/utils/*.js` — **copied unchanged**        |
| `css/*.css`               | `src/assets/css/*.css` — **copied unchanged**  |
| Hash routing `#/zakat`    | Clean URLs `/zakat` via Vue Router             |
| `IntersectionObserver`    | `src/composables/useScrollReveal.js`           |
| `window._prayerTimer`     | `onUnmounted(() => clearInterval(...))`        |
| `window.toggleHeir`       | Reactive `ref()` in component `<script setup>` |

---

## Key differences to be aware of

**1. No more `window.showDay` globals**
The Hajj page used `window.showDay = (i) => ...`. In Vue, replace with a reactive ref:

```js
const activeDayIndex = ref(0)
// In template: <button @click="activeDayIndex = i">
// Content: <div v-show="activeDayIndex === i">
```

**2. Prayer page cleanup**
Use `onUnmounted` instead of returning a cleanup function:

```js
onMounted(() => { /* start interval */
})
onUnmounted(() => clearInterval(window._prayerTimer))
```

**3. Inheritance `window.toggleHeir`**
Replace with a reactive `Set` or object:

```js
const activeHeirs = reactive({})

function toggleHeir(key) {
    if (activeHeirs[key]) delete activeHeirs[key]
    else activeHeirs[key] = 1
}
```

**4. CSS class `.router-link-active`**
Vue Router automatically adds `.router-link-active` and `.router-link-exact-active` to `<RouterLink>` elements — your
existing `.nav-pill.active` CSS works if you rename the class or use `:class="{ active: $route.path === p.to }"`.

**5. `v-model.number`**
Zakat form fields use `v-model.number` — this replaces `parseFloat(el.value) || 0` everywhere.

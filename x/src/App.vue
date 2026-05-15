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
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff"
               stroke-width="1.5">
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
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useZakatStore } from '@/stores/zakat.js'
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

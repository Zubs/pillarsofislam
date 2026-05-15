<template>
  <header class="site-nav" role="banner">
    <div class="nav-inner">
      <RouterLink to="/" class="nav-logo" aria-label="IslamicHub home">
        <div class="nav-logo-mark" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff"
               stroke-width="1.5">
            <polygon points="12,2 20,7 20,17 12,22 4,17 4,7"/>
            <polygon points="12,6 17,9 17,15 12,18 7,15 7,9"/>
          </svg>
        </div>
        <span class="nav-logo-text">Islamic<span>Hub</span></span>
      </RouterLink>

      <nav class="nav-pillars" aria-label="Five Pillars navigation">
        <RouterLink v-for="p in pillars" :key="p.to" :to="p.to" class="nav-pill"
                    :aria-label="p.label">
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
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const GITHUB_REPO = 'https://github.com/Zubs/islamichub'
const menuOpen = ref(false)

const pillars = [
  {
    to: '/faith',
    icon: '☪️',
    name: 'Faith',
    label: 'Faith — Shahada'
  },
  {
    to: '/prayer',
    icon: '🕌',
    name: 'Prayer',
    label: 'Prayer — Salah and prayer times'
  },
  {
    to: '/zakat',
    icon: '✦',
    name: 'Zakat',
    label: 'Zakat calculator'
  },
  {
    to: '/fasting',
    icon: '🌙',
    name: 'Fasting',
    label: 'Fasting — Sawm and Ramadan'
  },
  {
    to: '/hajj',
    icon: '🕋',
    name: 'Hajj',
    label: 'Hajj — Pilgrimage guide'
  },
]

const allLinks = [
  {
    to: '/',
    icon: '🏠',
    label: 'Home'
  },
  {
    to: '/faith',
    icon: '☪️',
    label: 'Faith (Shahada)'
  },
  {
    to: '/prayer',
    icon: '🕌',
    label: 'Prayer (Salah) & Prayer Times'
  },
  {
    to: '/zakat',
    icon: '✦',
    label: 'Zakat Calculator'
  },
  {
    to: '/fasting',
    icon: '🌙',
    label: 'Fasting (Sawm) & Ramadan'
  },
  {
    to: '/hajj',
    icon: '🕋',
    label: 'Hajj — Pilgrimage Guide'
  },
  {
    to: '/inheritance',
    icon: '⚖️',
    label: "Inheritance (Fara'id) Calculator"
  },
  {
    to: '/about',
    icon: 'ℹ️',
    label: 'About & Contributors'
  },
  {
    to: '/changelog',
    icon: '📋',
    label: 'Changelog'
  },
]
</script>

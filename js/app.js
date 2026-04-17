// js/app.js — bootstrap: nav, footer, router

import { Router } from './router.js';
import { fetchPrices, state } from './state.js';

// ── NAV ──────────────────────────────────────────────────────────────────────
function buildNav() {
  const nav = document.getElementById('site-nav');
  nav.innerHTML = `
    <div class="nav-inner">
      <button class="nav-logo" data-route="#/">
        <div class="nav-logo-mark">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5">
            <polygon points="12,2 20,7 20,17 12,22 4,17 4,7"/>
            <polygon points="12,6 17,9 17,15 12,18 7,15 7,9"/>
          </svg>
        </div>
        <span class="nav-logo-text">Islamic<span>Hub</span></span>
      </button>

      <nav class="nav-pillars" aria-label="Five Pillars">
        <button class="nav-pill" data-route="#/faith">
          <span class="nav-pill-icon">☪️</span>
          <span class="nav-pill-label">Faith</span>
        </button>
        <button class="nav-pill" data-route="#/prayer">
          <span class="nav-pill-icon">🕌</span>
          <span class="nav-pill-label">Prayer</span>
        </button>
        <button class="nav-pill" data-route="#/zakat">
          <span class="nav-pill-icon">✦</span>
          <span class="nav-pill-label">Zakat</span>
        </button>
        <button class="nav-pill" data-route="#/fasting">
          <span class="nav-pill-icon">🌙</span>
          <span class="nav-pill-label">Fasting</span>
        </button>
        <button class="nav-pill" data-route="#/hajj">
          <span class="nav-pill-icon">🕋</span>
          <span class="nav-pill-label">Hajj</span>
        </button>
      </nav>

      <div class="nav-right">
        <button class="nav-tools-btn" data-route="#/inheritance">⚖️ Inheritance</button>
        <button class="nav-tools-btn" data-route="#/about">About</button>
      </div>

      <button class="nav-hamburger" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>

    <div class="nav-mobile-menu" id="mobile-menu">
      <div class="corner-ornament top-left" aria-hidden="true"></div>
      <div class="corner-ornament top-right" aria-hidden="true"></div>
      <div class="corner-ornament bottom-left" aria-hidden="true"></div>
      <div class="corner-ornament bottom-right" aria-hidden="true"></div>
      <button class="nav-mobile-item" data-route="#/"><span class="icon">🏠</span> Home</button>
      <button class="nav-mobile-item" data-route="#/faith"><span class="icon">☪️</span> Faith (Shahada)</button>
      <button class="nav-mobile-item" data-route="#/prayer"><span class="icon">🕌</span> Prayer (Salah)</button>
      <button class="nav-mobile-item" data-route="#/zakat"><span class="icon">✦</span> Zakat</button>
      <button class="nav-mobile-item" data-route="#/fasting"><span class="icon">🌙</span> Fasting (Sawm)</button>
      <button class="nav-mobile-item" data-route="#/hajj"><span class="icon">🕋</span> Hajj</button>
      <div class="divider-kufic" aria-hidden="true"><div class="divider-kufic-icon"></div></div>
      <button class="nav-mobile-item" data-route="#/inheritance"><span class="icon">⚖️</span> Inheritance Calculator</button>
      <button class="nav-mobile-item" data-route="#/about"><span class="icon">ℹ️</span> About</button>
    </div>
  `;

  // Hamburger toggle
  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.toggle('open');
  });
}

// ── FOOTER ───────────────────────────────────────────────────────────────────
function buildFooter() {
  const footer = document.getElementById('site-footer');
  footer.style.position = 'relative';
  footer.innerHTML = `
    <div class="bg-kufic-grid dark" aria-hidden="true"></div>
    <div class="footer-inner" style="position:relative; z-index:1;">
      <div class="footer-top">
        <div class="footer-brand">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:4px">
            <div class="nav-logo-mark" style="width:30px;height:30px">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5">
                <polygon points="12,2 20,7 20,17 12,22 4,17 4,7"/>
              </svg>
            </div>
            <span style="font-family:var(--serif);font-size:18px;font-weight:600;color:#fff">Islamic<span style="color:#8BC4A8">Hub</span></span>
          </div>
          <p>A comprehensive educational platform for the Five Pillars of Islam and Islamic tools — grounded in Qur'an, Hadith, and scholarly tradition.</p>
        </div>
        <div class="footer-col">
          <h4>Five Pillars</h4>
          <button data-route="#/faith">Faith (Shahada)</button>
          <button data-route="#/prayer">Prayer (Salah)</button>
          <button data-route="#/zakat">Zakat</button>
          <button data-route="#/fasting">Fasting (Sawm)</button>
          <button data-route="#/hajj">Hajj</button>
        </div>
        <div class="footer-col">
          <h4>Tools</h4>
          <button data-route="#/zakat">Zakat Calculator</button>
          <button data-route="#/prayer">Prayer Times</button>
          <button data-route="#/prayer">Qibla Finder</button>
          <button data-route="#/inheritance">Inheritance Calculator</button>
          <button data-route="#/fasting">Ramadan Tracker</button>
        </div>
        <div class="footer-col">
          <h4>More</h4>
          <button data-route="#/about">About</button>
          <button data-route="#/">Home</button>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 IslamicHub. Built with sincerity.</span>
        <span>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</span>
      </div>
      <p class="footer-disc">Disclaimer: IslamicHub is an educational guidance tool. It is not a fatwa or formal religious ruling. Prayer times are calculated astronomically and may differ slightly from local mosque announcements. For religious rulings, consult a qualified Islamic scholar.</p>
    </div>
  `;
}

// ── DELEGATION — all [data-route] clicks ─────────────────────────────────────
export function bindNavigation(router) {
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-route]');
    if (!el) return;
    e.preventDefault();
    const route = el.dataset.route;
    router.navigate(route);
    // Close mobile menu
    document.getElementById('mobile-menu')?.classList.remove('open');
  });
}

// ── GEO PATTERN helper ────────────────────────────────────────────────────────
export function geoPattern() {
  return `<div class="geo-bg"><svg xmlns="http://www.w3.org/2000/svg">
    <defs><pattern id="gp" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
      <polygon points="50,4 96,28 96,72 50,96 4,72 4,28" fill="none" stroke="#8BC4A8" stroke-width=".8"/>
      <polygon points="50,16 84,34 84,66 50,84 16,66 16,34" fill="none" stroke="#8BC4A8" stroke-width=".4"/>
      <line x1="50" y1="4" x2="50" y2="96" stroke="#8BC4A8" stroke-width=".25"/>
      <line x1="4" y1="28" x2="96" y2="72" stroke="#8BC4A8" stroke-width=".25"/>
      <line x1="96" y1="28" x2="4" y2="72" stroke="#8BC4A8" stroke-width=".25"/>
    </pattern></defs>
    <rect width="100%" height="100%" fill="url(#gp)"/>
  </svg></div>`;
}

// ── FAQ helper ────────────────────────────────────────────────────────────────
export function initFaqs(container) {
  container.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const a    = btn.nextElementSibling;
      const chev = btn.querySelector('.faq-chev');
      const open = a.classList.contains('open');
      // Close all
      container.querySelectorAll('.faq-a.open').forEach(el => {
        el.classList.remove('open');
        el.previousElementSibling.querySelector('.faq-chev').classList.remove('open');
      });
      if (!open) { a.classList.add('open'); chev.classList.add('open'); }
    });
  });
}

// ── BOOTSTRAP ────────────────────────────────────────────────────────────────
export function bootstrap() {
  buildNav();
  buildFooter();

  const outlet = document.getElementById('app');

  const router = new Router({
    '#/':           () => import('../pages/Home.js'),
    '#/faith':      () => import('../pages/pillar/Faith.js'),
    '#/prayer':     () => import('../pages/pillar/Prayer.js'),
    '#/zakat':      () => import('../pages/pillar/Zakat.js'),
    '#/fasting':    () => import('../pages/pillar/Fasting.js'),
    '#/hajj':       () => import('../pages/pillar/Hajj.js'),
    '#/inheritance':() => import('../pages/tools/Inheritance.js'),
    '#/about':      () => import('../pages/tools/About.js'),
  }, outlet);

  bindNavigation(router);
  fetchPrices();

  return router;
}

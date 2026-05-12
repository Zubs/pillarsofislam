// js/app.js — bootstrap: nav, footer, router
import { Router } from './router.js';
import { fetchPrices } from './state.js';

const GITHUB_REPO = 'https://github.com/Zubs/pillarsofislam';

// ── NAV ──────────────────────────────────────────────────────────────────────
function buildNav() {
    const nav = document.getElementById('site-nav');
    nav.innerHTML = `
    <div class="nav-inner">
      <button class="nav-logo" data-route="#/" aria-label="IslamicHub home">
        <div class="nav-logo-mark" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5">
            <polygon points="12,2 20,7 20,17 12,22 4,17 4,7"/>
            <polygon points="12,6 17,9 17,15 12,18 7,15 7,9"/>
          </svg>
        </div>
        <span class="nav-logo-text">Islamic<span>Hub</span></span>
      </button>

      <nav class="nav-pillars" aria-label="Five Pillars navigation">
        <button class="nav-pill" data-route="#/faith"   aria-label="Faith — Shahada">
          <span class="nav-pill-icon" aria-hidden="true">☪️</span>
          <span class="nav-pill-label">Faith</span>
        </button>
        <button class="nav-pill" data-route="#/prayer"  aria-label="Prayer — Salah and Prayer Times">
          <span class="nav-pill-icon" aria-hidden="true">🕌</span>
          <span class="nav-pill-label">Prayer</span>
        </button>
        <button class="nav-pill" data-route="#/zakat"   aria-label="Zakat Calculator">
          <span class="nav-pill-icon" aria-hidden="true">✦</span>
          <span class="nav-pill-label">Zakat</span>
        </button>
        <button class="nav-pill" data-route="#/fasting" aria-label="Fasting — Sawm and Ramadan">
          <span class="nav-pill-icon" aria-hidden="true">🌙</span>
          <span class="nav-pill-label">Fasting</span>
        </button>
        <button class="nav-pill" data-route="#/hajj"    aria-label="Hajj — Pilgrimage Guide">
          <span class="nav-pill-icon" aria-hidden="true">🕋</span>
          <span class="nav-pill-label">Hajj</span>
        </button>
      </nav>

      <div class="nav-right">
        <button class="nav-tools-btn" data-route="#/inheritance" aria-label="Islamic Inheritance Calculator">⚖️ Inheritance</button>
        <button class="nav-tools-btn" data-route="#/about"       aria-label="About IslamicHub">About</button>
        <a href="${GITHUB_REPO}" target="_blank" rel="noopener noreferrer"
           class="nav-tools-btn" aria-label="IslamicHub on GitHub"
           style="display:inline-flex;align-items:center;gap:5px;text-decoration:none">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub
        </a>
      </div>

      <button class="nav-hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>

    <div class="nav-mobile-menu" id="mobile-menu" role="dialog" aria-label="Navigation menu">
      <div class="corner-ornament top-left"     aria-hidden="true"></div>
      <div class="corner-ornament top-right"    aria-hidden="true"></div>
      <div class="corner-ornament bottom-left"  aria-hidden="true"></div>
      <div class="corner-ornament bottom-right" aria-hidden="true"></div>
      <button class="nav-mobile-item" data-route="#/">
        <span class="icon" aria-hidden="true">🏠</span> Home
      </button>
      <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--muted);padding:8px 16px 2px">Five Pillars</div>
      <button class="nav-mobile-item" data-route="#/faith">
        <span class="icon" aria-hidden="true">☪️</span> Faith (Shahada)
      </button>
      <button class="nav-mobile-item" data-route="#/prayer">
        <span class="icon" aria-hidden="true">🕌</span> Prayer (Salah) &amp; Prayer Times
      </button>
      <button class="nav-mobile-item" data-route="#/zakat">
        <span class="icon" aria-hidden="true">✦</span> Zakat Calculator
      </button>
      <button class="nav-mobile-item" data-route="#/fasting">
        <span class="icon" aria-hidden="true">🌙</span> Fasting (Sawm) &amp; Ramadan
      </button>
      <button class="nav-mobile-item" data-route="#/hajj">
        <span class="icon" aria-hidden="true">🕋</span> Hajj — Pilgrimage Guide
      </button>
      <hr style="border:none;border-top:1px solid var(--border);margin:6px 0">
      <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--muted);padding:8px 16px 2px">Tools &amp; More</div>
      <button class="nav-mobile-item" data-route="#/inheritance">
        <span class="icon" aria-hidden="true">⚖️</span> Inheritance (Fara'id) Calculator
      </button>
      <button class="nav-mobile-item" data-route="#/about">
        <span class="icon" aria-hidden="true">ℹ️</span> About &amp; Contributors
      </button>
      <button class="nav-mobile-item" data-route="#/changelog">
        <span class="icon" aria-hidden="true">📋</span> Changelog
      </button>
      <a href="${GITHUB_REPO}" target="_blank" rel="noopener noreferrer"
         class="nav-mobile-item" style="text-decoration:none;color:inherit">
        <span class="icon" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
        </span> View source on GitHub
      </a>
    </div>
  `;

    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    hamburger.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', String(isOpen));
    });
}

// ── FOOTER ───────────────────────────────────────────────────────────────────
function buildFooter() {
    const footer = document.getElementById('site-footer');
    footer.innerHTML = `
    <div class="bg-kufic-grid dark" aria-hidden="true"></div>
    <div class="footer-inner" style="position:relative;z-index:1">
      <div class="divider-kufic" style="margin-bottom:var(--space-8)" aria-hidden="true">
        <span class="divider-kufic-icon"></span>
      </div>
      <div class="footer-top">
        <div class="footer-brand">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:.5rem">
            <div class="nav-logo-mark" style="width:30px;height:30px" aria-hidden="true">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5">
                <polygon points="12,2 20,7 20,17 12,22 4,17 4,7"/>
                <polygon points="12,6 17,9 17,15 12,18 7,15 7,9"/>
              </svg>
            </div>
            <span style="font-family:var(--serif);font-size:18px;font-weight:600;color:#fff">Islamic<span style="color:#8BC4A8">Hub</span></span>
          </div>
          <p>Free Islamic education and tools for the Muslim community — prayer times, Zakat calculator, Qibla finder, inheritance calculator, and scholarly guides for all Five Pillars.</p>
          <div style="display:flex;gap:10px;margin-top:1rem;flex-wrap:wrap">
            <a href="${GITHUB_REPO}" target="_blank" rel="noopener noreferrer"
               class="footer-social-link" aria-label="IslamicHub on GitHub">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
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
          <h4>Project</h4>
          <button data-route="#/about">About &amp; Team</button>
          <button data-route="#/changelog">Changelog</button>
          <a href="${GITHUB_REPO}" target="_blank" rel="noopener noreferrer"
             style="color:rgba(255,255,255,.4);text-decoration:none;font-size:13.5px;display:block;margin-bottom:.6rem">
            GitHub Repository
          </a>
          <a href="${GITHUB_REPO}/issues" target="_blank" rel="noopener noreferrer"
             style="color:rgba(255,255,255,.4);text-decoration:none;font-size:13.5px;display:block;margin-bottom:.6rem">
            Report an issue
          </a>
          <a href="${GITHUB_REPO}/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer"
             style="color:rgba(255,255,255,.4);text-decoration:none;font-size:13.5px;display:block">
            Contribute
          </a>
        </div>
      </div>

      <div class="footer-bottom">
        <span>© 2026 IslamicHub — Built by
          <a href="https://github.com/Zubs" target="_blank" rel="noopener noreferrer" style="color:rgba(255,255,255,.55);text-decoration:none">Zubair</a>
          &amp;
          <a href="https://github.com/yusuf-saif" target="_blank" rel="noopener noreferrer" style="color:rgba(255,255,255,.55);text-decoration:none">Yusuf</a>
        </span>
        <span style="direction:rtl" lang="ar">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</span>
      </div>

      <p class="footer-disc">Disclaimer: IslamicHub is an educational and guidance tool — not a fatwa or formal religious ruling. Prayer times are calculated astronomically and may differ from local mosque announcements. For personal religious rulings, consult a qualified Islamic scholar (mufti). Built with sincerity for the Muslim community.</p>
    </div>

    <style>
      .footer-social-link {
        display: inline-flex; align-items: center; gap: 6px;
        font-size: 12.5px; color: rgba(255,255,255,.5);
        text-decoration: none; padding: 5px 10px;
        border: 1px solid rgba(255,255,255,.12); border-radius: 8px;
        transition: all .15s;
      }
      .footer-social-link:hover {
        color: rgba(255,255,255,.85);
        border-color: rgba(255,255,255,.3);
      }
    </style>
  `;
}

// ── CLICK DELEGATION — all [data-route] ──────────────────────────────────────
export function bindNavigation(router) {
    document.addEventListener('click', e => {
        const el = e.target.closest('[data-route]');
        if (!el) {
          return;
        }
        e.preventDefault();
        router.navigate(el.dataset.route);
        document.getElementById('mobile-menu')?.classList.remove('open');
        document.getElementById('hamburger')?.setAttribute('aria-expanded', 'false');
    });
}

// ── GEO PATTERN helper ────────────────────────────────────────────────────────
export function geoPattern() {
    return `<div class="geo-bg" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg">
    <defs><pattern id="gp" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
      <polygon points="50,4 96,28 96,72 50,96 4,72 4,28" fill="none" stroke="#8BC4A8" stroke-width=".8"/>
      <polygon points="50,16 84,34 84,66 50,84 16,66 16,34" fill="none" stroke="#8BC4A8" stroke-width=".4"/>
      <line x1="50" y1="4"  x2="50" y2="96" stroke="#8BC4A8" stroke-width=".25"/>
      <line x1="4"  y1="28" x2="96" y2="72" stroke="#8BC4A8" stroke-width=".25"/>
      <line x1="96" y1="28" x2="4"  y2="72" stroke="#8BC4A8" stroke-width=".25"/>
    </pattern></defs>
    <rect width="100%" height="100%" fill="url(#gp)"/>
  </svg></div>`;
}

// ── SCROLL ANIMATIONS ─────────────────────────────────────────────────────────
export function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('anim-visible');
                }, i * 70);
                observer.unobserve(entry.target);
            }
        });
    }, {threshold: 0.1});

    document.querySelectorAll('.anim-target').forEach(el => observer.observe(el));
}

// ── FAQ ACCORDIONS ────────────────────────────────────────────────────────────
export function initFaqs(container) {
    if (!container) {
      return;
    }

    container.querySelectorAll('.faq-q').forEach(btn => {
        btn.addEventListener('click', () => {
            const a = btn.nextElementSibling;
            const chev = btn.querySelector('.faq-chev');
            const open = a.classList.contains('open');
            container.querySelectorAll('.faq-a.open').forEach(el => {
                el.classList.remove('open');
                el.previousElementSibling.querySelector('.faq-chev')?.classList.remove('open');
            });
            if (!open) {
                a.classList.add('open');
                chev?.classList.add('open');
            }
        });
    });
}

// ── BOOTSTRAP ────────────────────────────────────────────────────────────────
export function bootstrap() {
    buildNav();
    buildFooter();

    const outlet = document.getElementById('app');

    const router = new Router({
        '#/': () => import('../pages/Home.js'),
        '#/faith': () => import('../pages/pillar/Faith.js'),
        '#/prayer': () => import('../pages/pillar/Prayer.js'),
        '#/zakat': () => import('../pages/pillar/Zakat.js'),
        '#/fasting': () => import('../pages/pillar/Fasting.js'),
        '#/hajj': () => import('../pages/pillar/Hajj.js'),
        '#/inheritance': () => import('../pages/tools/Inheritance.js'),
        '#/about': () => import('../pages/tools/About.js'),
        '#/changelog': () => import('../pages/tools/Changelog.js'), // ← restored
    }, outlet);

    // Run scroll animations after every page render
    router.afterRender = () => initScrollAnimations();

    bindNavigation(router);
    fetchPrices();

    return router;
}

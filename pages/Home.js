// pages/Home.js
import { state } from '../js/state.js';
import { toHijri, daysToRamadan, isRamadan } from '../js/utils/hijri.js';
import { geoPattern } from '../js/app.js';

export function render(outlet) {
  const hijri = toHijri();
  const ramadanDays = Math.round(daysToRamadan());
  const inRamadan = isRamadan();

  outlet.innerHTML = `
<!-- ══ HERO ══════════════════════════════════════════════════════ -->
<section class="hero-section">
  <div class="bg-kufic-grid" aria-hidden="true"></div>
  <div class="ornament-hanging left" aria-hidden="true"></div>
  <div class="ornament-hanging right" aria-hidden="true"></div>
  ${geoPattern()}
  <div class="hero-inner">
    <div>
      <div class="hero-badge">Your complete Islamic learning & practice companion</div>
      <h1 class="hero-title">
        Understand &amp; live<br>the <em>Five Pillars</em>
      </h1>
      <p class="hero-body">
        IslamicHub brings together education, prayer tools, Zakat calculation, inheritance planning and more — all grounded in Qur'an, Hadith, and authentic scholarship.
      </p>
      <div class="btn-group">
        <button class="btn btn-primary btn-lg" data-route="#/faith">Explore the Pillars</button>
        <button class="btn btn-secondary btn-lg" data-route="#/about">About this project</button>
      </div>
      <div class="hero-stats">
        <div>
          <div class="stat-num">5</div>
          <div class="stat-lbl">Pillars covered</div>
        </div>
        <div>
          <div class="stat-num">${hijri.monthName}</div>
          <div class="stat-lbl">${hijri.year} AH — today</div>
        </div>
        <div>
          <div class="stat-num">${inRamadan ? '🌙' : ramadanDays + 'd'}</div>
          <div class="stat-lbl">${inRamadan ? 'Ramadan Mubarak!' : 'to Ramadan'}</div>
        </div>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:16px">
      <!-- Today's card -->
      <div class="card" style="border-left:4px solid var(--green)">
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.6px;color:var(--muted);margin-bottom:8px">Today</div>
        <div style="font-family:var(--serif);font-size:1.4rem;font-weight:600;margin-bottom:2px">${new Date().toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long'})}</div>
        <div style="font-size:14px;color:var(--muted)">${hijri.formatted}</div>
      </div>
      <!-- Quran verse -->
      <div class="quran-block frame-calligraphy" style="margin:0">
        <div class="corner-ornament top-left" aria-hidden="true"></div>
        <div class="corner-ornament top-right" aria-hidden="true"></div>
        <div class="corner-ornament bottom-left" aria-hidden="true"></div>
        <div class="corner-ornament bottom-right" aria-hidden="true"></div>
        <div class="quran-arabic">وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ</div>
        <div class="quran-ref">Qur'an 2:43</div>
        <div class="quran-trans">"Establish prayer and give Zakat." — The two pillars most frequently paired in the Qur'an.</div>
      </div>
    </div>
  </div>
</section>

<!-- ══ FIVE PILLARS HUB ══════════════════════════════════════════ -->
<section class="section" style="background:var(--cream-dark)">
  <div class="section-wide">
    <span class="eyebrow">The Five Pillars</span>
    <h2 class="section-title">أركان الإسلام</h2>
    <p class="section-sub">The five fundamental acts of worship that form the backbone of a Muslim's life. Each pillar is both educational and practical — tap to learn and use the tools.</p>
    <div class="pillars-hub" style="margin-top:var(--space-8)">
      <button class="pillar-hub-card phc-faith" data-num="١" data-route="#/faith">
        <div class="phc-icon">☪️</div>
        <div class="phc-name">Shahada</div>
        <div class="phc-sub">Declaration of Faith</div>
        <span class="phc-tag">Educational</span>
      </button>
      <button class="pillar-hub-card phc-prayer" data-num="٢" data-route="#/prayer">
        <div class="phc-icon">🕌</div>
        <div class="phc-name">Salah</div>
        <div class="phc-sub">Five Daily Prayers</div>
        <span class="phc-tag">+ Prayer Times & Qibla</span>
      </button>
      <button class="pillar-hub-card phc-zakat" data-num="٣" data-route="#/zakat">
        <div class="phc-icon">✦</div>
        <div class="phc-name">Zakat</div>
        <div class="phc-sub">Obligatory Almsgiving</div>
        <span class="phc-tag">+ Calculator</span>
      </button>
      <button class="pillar-hub-card phc-fasting" data-num="٤" data-route="#/fasting">
        <div class="phc-icon">🌙</div>
        <div class="phc-name">Sawm</div>
        <div class="phc-sub">Ramadan Fasting</div>
        <span class="phc-tag">+ Ramadan Tracker</span>
      </button>
      <button class="pillar-hub-card phc-hajj" data-num="٥" data-route="#/hajj">
        <div class="phc-icon">🕋</div>
        <div class="phc-name">Hajj</div>
        <div class="phc-sub">Pilgrimage to Makkah</div>
        <span class="phc-tag">+ Rites Guide</span>
      </button>
    </div>
  </div>
</section>

<!-- ══ TOOLS ═════════════════════════════════════════════════════ -->
<section class="section">
  <div class="section-wide">
    <span class="eyebrow">Islamic Tools</span>
    <h2 class="section-title">Practical tools for everyday practice</h2>
    <p class="section-sub">Accurate, scholarly-grounded tools to help you fulfil your obligations and understand your rights.</p>
    <div class="tools-strip" style="margin-top:var(--space-8)">
      <button class="tool-card" data-route="#/zakat">
        <span class="tc-icon">⚖️</span>
        <div>
          <div class="tc-name">Zakat Calculator</div>
          <div class="tc-desc">Live gold &amp; silver prices, full asset coverage, dual Nisab methods</div>
        </div>
      </button>
      <button class="tool-card" data-route="#/prayer">
        <span class="tc-icon">🕐</span>
        <div>
          <div class="tc-name">Prayer Times</div>
          <div class="tc-desc">Accurate prayer times for your location with next prayer countdown</div>
        </div>
      </button>
      <button class="tool-card" data-route="#/prayer">
        <span class="tc-icon">🧭</span>
        <div>
          <div class="tc-name">Qibla Finder</div>
          <div class="tc-desc">Precise compass bearing to the Ka'bah from anywhere on Earth</div>
        </div>
      </button>
      <button class="tool-card" data-route="#/inheritance">
        <span class="tc-icon">📜</span>
        <div>
          <div class="tc-name">Inheritance (Fara'id)</div>
          <div class="tc-desc">Qur'anic inheritance shares for all heirs with full breakdown</div>
        </div>
      </button>
    </div>
  </div>
</section>

<!-- ══ WHY ════════════════════════════════════════════════════════ -->
<section class="section" style="background:var(--ink)">
  <div class="section-wide">
    <span class="eyebrow" style="color:#8BC4A8">Why IslamicHub</span>
    <h2 class="section-title" style="color:#fff;margin-bottom:.75rem">Knowledge before action</h2>
    <p class="section-sub" style="color:rgba(255,255,255,.55);margin-bottom:var(--space-8)">Every tool and article on IslamicHub begins with understanding — the Qur'anic basis, the prophetic tradition, and the scholarly consensus behind each practice.</p>
    <div class="card-grid card-grid-3">
      <div class="card card-dark" style="border:1px solid rgba(255,255,255,.08)">
        <div style="font-size:28px;margin-bottom:var(--space-4)">📖</div>
        <h3 style="font-family:var(--serif);font-size:1.1rem;color:#fff;margin-bottom:.5rem">Qur'an &amp; Hadith First</h3>
        <p style="font-size:14px;color:rgba(255,255,255,.5);line-height:1.65">Every calculation and ruling is cited back to its primary source. No unsupported claims.</p>
      </div>
      <div class="card card-dark" style="border:1px solid rgba(255,255,255,.08)">
        <div style="font-size:28px;margin-bottom:var(--space-4)">🕌</div>
        <h3 style="font-family:var(--serif);font-size:1.1rem;color:#fff;margin-bottom:.5rem">All Four Schools</h3>
        <p style="font-size:14px;color:rgba(255,255,255,.5);line-height:1.65">Hanafi, Maliki, Shafi'i, and Hanbali positions are noted. Disagreements are surfaced, not hidden.</p>
      </div>
      <div class="card card-dark" style="border:1px solid rgba(255,255,255,.08)">
        <div style="font-size:28px;margin-bottom:var(--space-4)">🔒</div>
        <h3 style="font-family:var(--serif);font-size:1.1rem;color:#fff;margin-bottom:.5rem">Private &amp; Free</h3>
        <p style="font-size:14px;color:rgba(255,255,255,.5);line-height:1.65">No account. No tracking. All calculations run in your browser. Your data stays with you.</p>
      </div>
    </div>
  </div>
</section>

<!-- ══ CTA ════════════════════════════════════════════════════════ -->
<section class="section">
  <div class="section-wide">
    <div class="cta-strip" style="position:relative">
      <div class="ornament-hanging left" aria-hidden="true" style="top:-32px; height:60px"></div>
      <div class="ornament-hanging right" aria-hidden="true" style="top:-32px; height:60px"></div>
      ${geoPattern()}
      <h2>Begin with the first pillar</h2>
      <p>Start with Shahada — the declaration that anchors everything else — and work through each pillar with depth and understanding.</p>
      <button class="btn btn-white btn-lg" data-route="#/faith">Start with Faith →</button>
    </div>
  </div>
</section>
  `;
  return null; // no cleanup needed
}

// pages/Home.js
import { toHijri, daysToRamadan, isRamadan } from '../js/utils/hijri.js';
import { geoPattern } from '../js/app.js';

export function render(outlet) {
    const hijri = toHijri();
    const inRamadan = isRamadan();
    const daysLeft = Math.round(daysToRamadan());

    outlet.innerHTML = `

<!-- ══ HERO ══════════════════════════════════════════════════════════ -->
<section class="hero-section" aria-label="IslamicHub — Islamic education and tools">
  <div class="bg-kufic-grid" aria-hidden="true"></div>
  <div class="ornament-hanging left"  aria-hidden="true"></div>
  <div class="ornament-hanging right" aria-hidden="true"></div>
  <div class="hero-inner">
    <div>
      <div class="hero-badge" role="note">Free · Scholarly · No account needed</div>
      <h1 class="hero-title">
        Learn &amp; live the<br><em>Five Pillars of Islam</em>
      </h1>
      <p class="hero-body">
        IslamicHub is a free Islamic education and tools platform — accurate prayer times with Qibla finder, Zakat calculator with live gold and silver prices, Islamic inheritance (Fara'id) calculator, and in-depth guides for all five pillars, grounded in Qur'an, Hadith, and all four schools of thought.
      </p>
      <div class="btn-group">
        <button class="btn btn-primary btn-lg" data-route="#/faith">Explore the Five Pillars</button>
        <button class="btn btn-secondary btn-lg" data-route="#/zakat">Zakat Calculator</button>
      </div>
      <div class="hero-stats" aria-label="Platform highlights">
        <div><div class="stat-num">5</div><div class="stat-lbl">Pillars covered</div></div>
        <div>
          <div class="stat-num">${hijri.monthName}</div>
          <div class="stat-lbl">${hijri.year} AH · today</div>
        </div>
        <div>
          <div class="stat-num">${inRamadan ? '🌙' : daysLeft + 'd'}</div>
          <div class="stat-lbl">${inRamadan ? 'Ramadan Mubarak' : 'until Ramadan'}</div>
        </div>
      </div>
    </div>

    <!-- Right column: date card + Qur'an verse -->
    <div style="display:flex;flex-direction:column;gap:16px">
      <div class="card" style="border-left:4px solid var(--green)" role="complementary" aria-label="Today's Islamic date">
        <div style="font-size:10.5px;font-weight:600;text-transform:uppercase;letter-spacing:.6px;color:var(--muted);margin-bottom:6px">Today</div>
        <div style="font-family:var(--serif);font-size:1.35rem;font-weight:600;margin-bottom:2px">
          ${new Date().toLocaleDateString('en-GB', {weekday: 'long', day: 'numeric', month: 'long'})}
        </div>
        <div style="font-size:13.5px;color:var(--muted)">${hijri.formatted}</div>
        ${inRamadan ? `<div style="margin-top:8px;font-size:12px;background:var(--fasting-light);color:var(--fasting-color);padding:4px 10px;border-radius:10px;display:inline-block;font-weight:500">🌙 Ramadan Day ${hijri.day}</div>` : ''}
      </div>

      <!-- frame-calligraphy preserves the gold-bordered light style from v1.1 -->
      <div class="quran-block frame-calligraphy" role="complementary" aria-label="Qur'anic verse">
        <div class="corner-ornament top-left"     aria-hidden="true"></div>
        <div class="corner-ornament top-right"    aria-hidden="true"></div>
        <div class="corner-ornament bottom-left"  aria-hidden="true"></div>
        <div class="corner-ornament bottom-right" aria-hidden="true"></div>
        <div class="quran-arabic" lang="ar">وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ</div>
        <div class="quran-ref">Qur'an 2:43</div>
        <div class="quran-trans">"Establish prayer and give Zakat." — The two pillars most frequently paired in the Qur'an, named together in over 30 verses.</div>
      </div>
    </div>
  </div>
</section>

<!-- ══ FIVE PILLARS HUB ══════════════════════════════════════════════ -->
<section class="section" style="background:var(--cream-dark)" aria-labelledby="pillars-heading">
  <div class="section-wide">
    <span class="eyebrow">The Five Pillars of Islam · أركان الإسلام</span>
    <h2 class="section-title" id="pillars-heading">Understand and practise each pillar</h2>
    <p class="section-sub">Every pillar has a dedicated page with scholarly education <em>and</em> a practical tool — learn the ruling, understand the evidence, and fulfil the obligation.</p>
    <div class="pillars-hub" style="margin-top:var(--space-8)" role="list">
      <button class="pillar-hub-card phc-faith"   data-num="١" data-route="#/faith"   role="listitem" aria-label="Faith — Shahada, declaration of faith">
        <div class="phc-icon" aria-hidden="true">☪️</div>
        <div class="phc-name">Shahada</div>
        <div class="phc-sub">Declaration of Faith · Tawhid</div>
        <span class="phc-tag">Educational</span>
      </button>
      <button class="pillar-hub-card phc-prayer"  data-num="٢" data-route="#/prayer"  role="listitem" aria-label="Prayer — Salah, prayer times and Qibla finder">
        <div class="phc-icon" aria-hidden="true">🕌</div>
        <div class="phc-name">Salah</div>
        <div class="phc-sub">Prayer Times &amp; Qibla</div>
        <span class="phc-tag">+ Live calculator</span>
      </button>
      <button class="pillar-hub-card phc-zakat"   data-num="٣" data-route="#/zakat"   role="listitem" aria-label="Zakat — calculator with live gold and silver prices">
        <div class="phc-icon" aria-hidden="true">✦</div>
        <div class="phc-name">Zakat</div>
        <div class="phc-sub">Almsgiving · Live prices</div>
        <span class="phc-tag">+ Calculator</span>
      </button>
      <button class="pillar-hub-card phc-fasting" data-num="٤" data-route="#/fasting" role="listitem" aria-label="Fasting — Sawm, Ramadan tracker">
        <div class="phc-icon" aria-hidden="true">🌙</div>
        <div class="phc-name">Sawm</div>
        <div class="phc-sub">Ramadan &amp; Fasting</div>
        <span class="phc-tag">+ Ramadan tracker</span>
      </button>
      <button class="pillar-hub-card phc-hajj"    data-num="٥" data-route="#/hajj"    role="listitem" aria-label="Hajj — complete pilgrimage rites guide">
        <div class="phc-icon" aria-hidden="true">🕋</div>
        <div class="phc-name">Hajj</div>
        <div class="phc-sub">Pilgrimage to Makkah</div>
        <span class="phc-tag">+ Rites guide</span>
      </button>
    </div>
  </div>
</section>

<!-- ══ TOOLS ═════════════════════════════════════════════════════════ -->
<section class="section" aria-labelledby="tools-heading">
  <div class="section-wide">
    <span class="eyebrow">Islamic Tools</span>
    <h2 class="section-title" id="tools-heading">Practical tools for daily Islamic practice</h2>
    <p class="section-sub">Accurate, free, and private — every tool runs entirely in your browser with no account required and no data stored.</p>
    <div class="tools-strip" style="margin-top:var(--space-8)" role="list">
      <button class="tool-card" data-route="#/zakat" role="listitem" aria-label="Accurate Zakat calculator with live gold prices">
        <span class="tc-icon" aria-hidden="true">⚖️</span>
        <div>
          <div class="tc-name">Zakat Calculator</div>
          <div class="tc-desc">Live gold &amp; silver prices · dual Nisab methods · all asset types including shares, ISAs, and pension</div>
        </div>
      </button>
      <button class="tool-card" data-route="#/prayer" role="listitem" aria-label="Prayer times for your city">
        <span class="tc-icon" aria-hidden="true">🕐</span>
        <div>
          <div class="tc-name">Prayer Times</div>
          <div class="tc-desc">Fajr, Dhuhr, Asr, Maghrib &amp; Isha for your city · 5 calculation methods · live countdown to next prayer</div>
        </div>
      </button>
      <button class="tool-card" data-route="#/prayer" role="listitem" aria-label="Qibla direction compass">
        <span class="tc-icon" aria-hidden="true">🧭</span>
        <div>
          <div class="tc-name">Qibla Finder</div>
          <div class="tc-desc">Precise compass bearing to the Ka'bah · distance to Makkah in km · works from any location</div>
        </div>
      </button>
      <button class="tool-card" data-route="#/inheritance" role="listitem" aria-label="Free Islamic inheritance Faraid calculator">
        <span class="tc-icon" aria-hidden="true">📜</span>
        <div>
          <div class="tc-name">Inheritance (Fara'id)</div>
          <div class="tc-desc">Qur'anic shares for all heirs · automatic blocking rules · visual breakdown by amount and percentage</div>
        </div>
      </button>
    </div>
  </div>
</section>

<!-- ══ WHY / CONTENT CLUSTER ═════════════════════════════════════════ -->
<section class="section" style="background:var(--cream-dark)" aria-labelledby="why-heading">
  <div class="section-wide">
    <span class="eyebrow">Why IslamicHub</span>
    <h2 class="section-title" id="why-heading">Scholarly accuracy meets modern tools</h2>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:start;margin-top:var(--space-8)" class="why-grid">
      <div class="prose">
        <p>IslamicHub is a free Islamic learning platform that combines in-depth education with practical digital tools. Unlike apps that give you a number with no explanation, every section here gives you both: the ruling and the evidence behind it.</p>
        <p>Our <strong>Zakat calculator</strong> fetches live gold and silver spot prices, applies your chosen Nisab method (85g gold or 595g silver), deducts valid debts, and shows a precise figure — alongside the Qur'anic verse and Hadith references that establish each rule.</p>
        <p>Our <strong>prayer times calculator</strong> uses a full astronomical algorithm to compute prayer times for any coordinates on Earth — with five calculation methods. The same tool gives you the <strong>Qibla direction</strong> as an exact compass bearing.</p>
        <p>Our <strong>Islamic inheritance calculator</strong> implements the complete Fara'id system from Qur'an 4:11–12 and 4:176 — all 13 heir types, automatic hijab (blocking) rules, and awl (proportional reduction) when shares exceed the estate.</p>
      </div>
      <div style="display:flex;flex-direction:column;gap:1rem">
        ${[
        ['📖', 'Qur\'an &amp; Hadith first', 'Every ruling is cited back to its primary source. We don\'t just give you an answer; we tell you why.'],
        ['🕌', 'All four schools', 'Hanafi, Maliki, Shafi\'i, and Hanbali positions are considered. Disagreements are surfaced, not hidden.'],
        ['🔒', 'Private by design', 'No account. No tracking. Everything runs in your browser. Your financial and religious information stays with you.'],
        ['🌍', 'Multi-currency', 'GBP, USD, EUR, or SAR — with live exchange rates fetched automatically alongside metal prices.'],
        ['🤝', 'Open source', 'The entire platform is open source on GitHub. Contributions, corrections, and translations are welcome.'],
    ].map(([icon, title, desc]) => `
          <div class="card" style="display:flex;gap:14px;align-items:flex-start;padding:1rem 1.25rem">
            <div style="font-size:20px;flex-shrink:0;margin-top:2px" aria-hidden="true">${icon}</div>
            <div>
              <div style="font-family:var(--serif);font-size:.95rem;font-weight:600;margin-bottom:.25rem">${title}</div>
              <div style="font-size:13px;color:var(--muted);line-height:1.6">${desc}</div>
            </div>
          </div>`).join('')}
      </div>
    </div>
  </div>
</section>

<!-- ══ DARK FEATURES GRID ════════════════════════════════════════════ -->
<section class="section" style="background:var(--ink)" aria-labelledby="features-heading">
  <div class="section-wide">
    <span class="eyebrow" style="color:#8BC4A8">What's inside</span>
    <h2 class="section-title" style="color:#fff;margin-bottom:var(--space-8)" id="features-heading">Everything a Muslim needs in one place</h2>
    <div class="card-grid card-grid-3" role="list">
      ${[
        ['⚖️', 'Accurate Zakat Calculator with Live Gold Prices', 'Calculate Zakat on cash, savings, gold and silver (by weight and purity), shares, ISAs, pensions, and business inventory. Live spot prices. Dual Nisab. Full debt deduction.', '#/zakat', 'Open calculator'],
        ['🕌', 'Reliable Prayer Times for Any City + Qibla', 'Fajr, Dhuhr, Asr, Maghrib, Isha for your exact coordinates. Five calculation methods. Live countdown. Animated Qibla compass.', '#/prayer', 'Find prayer times'],
        ["📜", "Free Islamic Inheritance Calculator (Fara'id)", "Qur'anic shares for all 13 heir types. Auto-applies blocking rules. Visual percentage and amount breakdown. Based on Qur'an 4:11–12.", '#/inheritance', 'Calculate inheritance'],
        ['☪️', 'Understand the First Pillar — Shahada &amp; Tawhid', 'The declaration of faith, its seven conditions, the three dimensions of Tawhid, and Risala — with Qur\'anic verses and Hadith.', '#/faith', 'Learn about faith'],
        ['🌙', 'Ramadan Fasting Tracker — Suhoor &amp; Iftar Times', 'Live Suhoor and Iftar times for your location. Fasting progress bar. Ramadan countdown. Comprehensive Sawm rulings.', '#/fasting', 'Track your fast'],
        ['🕋', 'Pilgrimage to Makkah — Complete Hajj Rites Guide', 'Day-by-day rites for all five days. Three types of Hajj explained. Full Umrah guide. Scholarly rulings from all four schools.', '#/hajj', 'Read the Hajj guide'],
    ].map(([icon, title, desc, route, cta]) => `
        <article class="card card-dark" style="border:1px solid rgba(255,255,255,.08)" role="listitem">
          <div style="font-size:26px;margin-bottom:.75rem" aria-hidden="true">${icon}</div>
          <h3 style="font-family:var(--serif);font-size:1.05rem;color:#fff;margin-bottom:.5rem">${title}</h3>
          <p style="font-size:13.5px;color:rgba(255,255,255,.5);line-height:1.65;margin-bottom:1rem">${desc}</p>
          <button class="btn btn-sm" style="background:rgba(255,255,255,.08);color:rgba(255,255,255,.7);border:none" data-route="${route}">${cta} →</button>
        </article>`).join('')}
    </div>
  </div>
</section>

<!-- ══ BUILDERS TEASER ═══════════════════════════════════════════════ -->
<section class="section" aria-labelledby="team-heading">
  <div class="section-wide">
    <span class="eyebrow">Open source project</span>
    <h2 class="section-title" id="team-heading" style="margin-bottom:.75rem">Built by the community, for the community</h2>
    <p class="section-sub" style="margin-bottom:var(--space-8)">IslamicHub is open source, built by Zubair Idris Aweda and Saifur-Rahman Yusuf, and open to contributions from any Muslim who wants to help improve it.</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;max-width:640px" class="mini-builders-grid">
      ${[
        {
            name: 'Zubair Idris Aweda',
            role: 'Software Engineer & Technical Writer',
            login: 'Zubs',
            avatar: 'https://avatars.githubusercontent.com/u/53227444?v=4'
        },
        {
            name: 'Saifur-Rahman Yusuf',
            role: 'Project Manager & Technical Strategist',
            login: 'yusuf-saif',
            avatar: 'https://avatars.githubusercontent.com/u/54576722?v=4'
        },
    ].map(b => `
        <a href="https://github.com/${b.login}" target="_blank" rel="noopener noreferrer"
           style="display:flex;align-items:center;gap:12px;padding:14px;background:#fff;border:1px solid var(--border);border-radius:var(--radius-lg);text-decoration:none;color:inherit;transition:box-shadow .15s"
           onmouseover="this.style.boxShadow='var(--shadow)'" onmouseout="this.style.boxShadow='none'">
          <img src="${b.avatar}" alt="Photo of ${b.name}" width="44" height="44"
               style="border-radius:50%;border:2px solid var(--border);flex-shrink:0"
               loading="lazy" onerror="this.style.display='none'">
          <div>
            <div style="font-family:var(--serif);font-size:.95rem;font-weight:600;margin-bottom:1px">${b.name}</div>
            <div style="font-size:11.5px;color:var(--muted)">${b.role}</div>
          </div>
        </a>`).join('')}
    </div>
    <div style="margin-top:1.5rem">
      <button class="btn btn-secondary" data-route="#/about">About the project &amp; how to contribute →</button>
    </div>
  </div>
</section>

<!-- ══ FINAL CTA ════════════════════════════════════════════════════ -->
<section class="section" style="padding-top:0">
  <div class="section-wide">
    <div class="cta-strip" role="complementary">
      <div class="ornament-hanging left"  aria-hidden="true"></div>
      <div class="ornament-hanging right" aria-hidden="true"></div>
      ${geoPattern()}
      <h2>Begin with the first pillar</h2>
      <p>Start with the Shahada — the declaration that anchors everything in Islam — then work through each pillar with education and practical tools.</p>
      <div class="btn-group" style="justify-content:center">
        <button class="btn btn-white btn-lg" data-route="#/faith">Start with Faith →</button>
        <button class="btn btn-secondary btn-lg" style="color:#fff;border-color:rgba(255,255,255,.3)" data-route="#/prayer">Prayer Times &amp; Qibla</button>
      </div>
    </div>
  </div>
</section>

<style>
@media(max-width:900px){
  .hero-inner > div:last-child { display:none; }
  .why-grid { grid-template-columns:1fr !important; }
}
@media(max-width:640px){
  .mini-builders-grid { grid-template-columns:1fr !important; }
}
</style>
  `;

    return null;
}

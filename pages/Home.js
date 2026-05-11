// pages/Home.js
// SEO target keywords from Veesigro audit:
// "islamic learning platform five pillars", "accurate zakat calculator online",
// "best prayer times app with qibla", "islamic inheritance calculator free",
// "free islamic education tools", "hadith based islamic guidance",
// "ramadan fasting tracker", "zakat calculator with gold and silver prices",
// "find qibla direction from my location", "understand five pillars of islam",
// "scholarly islamic platform four madhabs", "digital islamic learning practice guide"

import { state } from '../js/state.js';
import { toHijri, daysToRamadan, isRamadan } from '../js/utils/hijri.js';
import { geoPattern } from '../js/app.js';

export function render(outlet) {
    const hijri = toHijri();
    const inRamadan = isRamadan();
    const daysLeft = Math.round(daysToRamadan());

    outlet.innerHTML = `

<!-- ══ HERO ══════════════════════════════════════════════════════════ -->
<section class="hero-section" aria-label="IslamicHub — Islamic education and tools">
  ${geoPattern()}
  <div class="hero-inner">
    <div>
      <div class="hero-badge" role="note">
        Free · Scholarly · No account needed
      </div>
      <h1 class="hero-title">
        Learn &amp; live the<br><em>Five Pillars of Islam</em>
      </h1>
      <p class="hero-body">
        IslamicHub is a free Islamic education and tools platform — accurate prayer times with Qibla finder, Zakat calculator with live gold and silver prices, Islamic inheritance (Fara'id) calculator, and in-depth guides for all five pillars, grounded in Qur'an, Hadith, and all four schools of thought.
      </p>
      <div class="btn-group">
        <button class="btn btn-primary btn-lg" data-route="#/faith">
          Explore the Five Pillars
        </button>
        <button class="btn btn-secondary btn-lg" data-route="#/zakat">
          Zakat Calculator
        </button>
      </div>
      <div class="hero-stats" aria-label="Platform highlights">
        <div>
          <div class="stat-num">5</div>
          <div class="stat-lbl">Pillars covered</div>
        </div>
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

    <!-- Today card + Qur'an verse — visible desktop only -->
    <div class="hero-aside" style="display:flex;flex-direction:column;gap:16px">
      <div class="card" style="border-left:4px solid var(--green)" role="complementary" aria-label="Today's Islamic date">
        <div style="font-size:10.5px;font-weight:600;text-transform:uppercase;letter-spacing:.6px;color:var(--muted);margin-bottom:6px">Today</div>
        <div style="font-family:var(--serif);font-size:1.35rem;font-weight:600;margin-bottom:2px">
          ${new Date().toLocaleDateString('en-GB', {weekday: 'long', day: 'numeric', month: 'long'})}
        </div>
        <div style="font-size:13.5px;color:var(--muted)">${hijri.formatted}</div>
        ${inRamadan ? `<div style="margin-top:8px;font-size:12px;background:var(--fasting-light);color:var(--fasting-color);padding:4px 10px;border-radius:10px;display:inline-block;font-weight:500">🌙 Ramadan Day ${hijri.day}</div>` : ''}
      </div>
      <div class="quran-block" style="margin:0" role="complementary" aria-label="Qur'anic verse">
        ${geoPattern()}
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
    <h2 class="section-title" id="pillars-heading">
      Understand and practise each pillar
    </h2>
    <p class="section-sub">
      Every pillar has a dedicated page with scholarly education <em>and</em> a practical tool — learn the ruling, understand the evidence, and fulfil the obligation.
    </p>

    <div class="pillars-hub" style="margin-top:var(--space-8)" role="list">

      <button class="pillar-hub-card phc-faith" data-num="١" data-route="#/faith" role="listitem"
        aria-label="Faith — Shahada, declaration of faith, Tawhid">
        <div class="phc-icon" aria-hidden="true">☪️</div>
        <div class="phc-name">Shahada</div>
        <div class="phc-sub">Declaration of Faith · Tawhid</div>
        <span class="phc-tag">Educational</span>
      </button>

      <button class="pillar-hub-card phc-prayer" data-num="٢" data-route="#/prayer" role="listitem"
        aria-label="Prayer — Salah, prayer times calculator and Qibla direction finder">
        <div class="phc-icon" aria-hidden="true">🕌</div>
        <div class="phc-name">Salah</div>
        <div class="phc-sub">Prayer Times &amp; Qibla</div>
        <span class="phc-tag">+ Live calculator</span>
      </button>

      <button class="pillar-hub-card phc-zakat" data-num="٣" data-route="#/zakat" role="listitem"
        aria-label="Zakat — online calculator with live gold and silver prices">
        <div class="phc-icon" aria-hidden="true">✦</div>
        <div class="phc-name">Zakat</div>
        <div class="phc-sub">Almsgiving · Live prices</div>
        <span class="phc-tag">+ Calculator</span>
      </button>

      <button class="pillar-hub-card phc-fasting" data-num="٤" data-route="#/fasting" role="listitem"
        aria-label="Fasting — Sawm, Ramadan tracker and Suhoor Iftar times">
        <div class="phc-icon" aria-hidden="true">🌙</div>
        <div class="phc-name">Sawm</div>
        <div class="phc-sub">Ramadan &amp; Fasting</div>
        <span class="phc-tag">+ Ramadan tracker</span>
      </button>

      <button class="pillar-hub-card phc-hajj" data-num="٥" data-route="#/hajj" role="listitem"
        aria-label="Hajj — complete pilgrimage to Makkah rites guide">
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
    <h2 class="section-title" id="tools-heading">
      Practical tools for daily Islamic practice
    </h2>
    <p class="section-sub">
      Accurate, free, and private — every tool runs entirely in your browser with no account required and no data stored.
    </p>

    <div class="tools-strip" style="margin-top:var(--space-8)" role="list">

      <button class="tool-card" data-route="#/zakat" role="listitem"
        aria-label="Accurate Zakat calculator with live gold and silver prices">
        <span class="tc-icon" aria-hidden="true">⚖️</span>
        <div>
          <div class="tc-name">Zakat Calculator</div>
          <div class="tc-desc">Live gold &amp; silver prices · dual Nisab methods (85g gold / 595g silver) · all asset types including shares, ISAs, and pension</div>
        </div>
      </button>

      <button class="tool-card" data-route="#/prayer" role="listitem"
        aria-label="Accurate Islamic prayer times for your city">
        <span class="tc-icon" aria-hidden="true">🕐</span>
        <div>
          <div class="tc-name">Prayer Times</div>
          <div class="tc-desc">Accurate Fajr, Dhuhr, Asr, Maghrib &amp; Isha times for your city · 5 calculation methods · live countdown to next prayer</div>
        </div>
      </button>

      <button class="tool-card" data-route="#/prayer" role="listitem"
        aria-label="Qibla direction finder — compass bearing to Makkah">
        <span class="tc-icon" aria-hidden="true">🧭</span>
        <div>
          <div class="tc-name">Qibla Finder</div>
          <div class="tc-desc">Precise compass bearing to the Ka'bah · distance to Makkah in km · works from any location on Earth</div>
        </div>
      </button>

      <button class="tool-card" data-route="#/inheritance" role="listitem"
        aria-label="Free Islamic inheritance Faraid calculator">
        <span class="tc-icon" aria-hidden="true">📜</span>
        <div>
          <div class="tc-name">Inheritance (Fara'id)</div>
          <div class="tc-desc">Qur'anic shares for all heirs based on Qur'an 4:11–12 · automatic blocking rules · visual breakdown by amount and percentage</div>
        </div>
      </button>

    </div>
  </div>
</section>

<!-- ══ CONTENT CLUSTER — WHY / HOW ══════════════════════════════════
     Veesigro flagged "no content cluster". This section creates
     keyword-rich body copy targeting the identified gaps.
══════════════════════════════════════════════════════════════════════ -->
<section class="section" style="background:var(--cream-dark)" aria-labelledby="why-heading">
  <div class="section-wide">
    <span class="eyebrow">Why IslamicHub</span>
    <h2 class="section-title" id="why-heading">
      Scholarly accuracy meets modern tools
    </h2>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:start;margin-top:var(--space-8)" class="why-grid">
      <div>
        <div class="prose">
          <p>
            IslamicHub is a free Islamic learning platform that combines in-depth education with practical digital tools — all in one place. Unlike apps that give you a number with no explanation, or textbooks with no interactivity, every section here gives you both: the ruling and the evidence behind it.
          </p>
          <p>
            Our <strong>Zakat calculator</strong> fetches live gold and silver spot prices, applies your chosen Nisab method (85g gold or 595g silver), deducts valid debts, and shows you a precise figure — alongside the Qur'anic verse and Hadith references that establish each rule. We support GBP, USD, EUR, and SAR.
          </p>
          <p>
            Our <strong>prayer times calculator</strong> uses a full astronomical algorithm to compute Fajr, Dhuhr, Asr, Maghrib, and Isha for any coordinates on Earth — with five calculation methods used by Muslim World League, ISNA, the Egyptian Authority, Umm Al-Qura, and Karachi University. The same tool gives you the <strong>Qibla direction</strong> as an exact compass bearing.
          </p>
          <p>
            Our <strong>Islamic inheritance calculator</strong> implements the complete Fara'id system from Qur'an 4:11–12 and 4:176 — all 13 heir types, automatic hijab (blocking) rules, and awl (proportional reduction) when shares exceed the estate. It is free, private, and grounded in authentic scholarship.
          </p>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:1rem">
        ${[
        ['📖', 'Qur\'an &amp; Hadith first', 'Every calculation and ruling is cited back to its primary source — Qur\'an or authenticated Hadith. We don\'t just give you an answer; we tell you why.'],
        ['🕌', 'All four schools', 'Hanafi, Maliki, Shafi\'i, and Hanbali positions are considered. Where scholars agree, we state the consensus. Where they differ, we present the options.'],
        ['🔒', 'Private by design', 'No account. No tracking. No data stored. Everything runs in your browser. Your financial and religious information stays with you — always.'],
        ['⭐', 'Hadith-based guidance', 'From the conditions of Zakat to the invalidators of fasting, every practical rule is backed by an authenticated narration with its source clearly cited.'],
        ['🌍', 'Multi-currency support', 'The Zakat calculator and Nisab threshold display in GBP, USD, EUR, or SAR — with live exchange rates fetched automatically.'],
        ['🤝', 'Open source', 'The entire platform is open source on GitHub. Contributions, corrections, and translations are welcome from the Muslim community.'],
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

<!-- ══ KEYWORD CONTENT CLUSTER — individual tool summaries ═══════════
     Each block targets a specific high-value keyword from the audit.
══════════════════════════════════════════════════════════════════════ -->
<section class="section" style="background:var(--ink)" aria-labelledby="features-heading">
  <div class="section-wide">
    <span class="eyebrow" style="color:#8BC4A8">What's inside</span>
    <h2 class="section-title" style="color:#fff;margin-bottom:var(--space-8)" id="features-heading">
      Everything a Muslim needs in one place
    </h2>

    <div class="card-grid card-grid-3" role="list">

      <!-- Zakat keyword cluster -->
      <article class="card card-dark" style="border:1px solid rgba(255,255,255,.08)" role="listitem">
        <div style="font-size:26px;margin-bottom:.75rem" aria-hidden="true">⚖️</div>
        <h3 style="font-family:var(--serif);font-size:1.05rem;color:#fff;margin-bottom:.5rem">
          Accurate Zakat Calculator with Live Gold Prices
        </h3>
        <p style="font-size:13.5px;color:rgba(255,255,255,.5);line-height:1.65;margin-bottom:1rem">
          Calculate your annual Zakat on cash, savings, gold and silver (by weight and purity), shares, ISAs, pensions, business inventory, and receivables. Live spot prices. Dual Nisab methods. Full debt deduction support.
        </p>
        <button class="btn btn-sm" style="background:rgba(255,255,255,.08);color:rgba(255,255,255,.7);border:none" data-route="#/zakat">
          Open calculator →
        </button>
      </article>

      <!-- Prayer times keyword cluster -->
      <article class="card card-dark" style="border:1px solid rgba(255,255,255,.08)" role="listitem">
        <div style="font-size:26px;margin-bottom:.75rem" aria-hidden="true">🕌</div>
        <h3 style="font-family:var(--serif);font-size:1.05rem;color:#fff;margin-bottom:.5rem">
          Reliable Prayer Times for Any City + Qibla Direction
        </h3>
        <p style="font-size:13.5px;color:rgba(255,255,255,.5);line-height:1.65;margin-bottom:1rem">
          Fajr, Dhuhr, Asr, Maghrib, Isha for your exact coordinates. Five calculation methods. Live countdown to the next prayer. Animated Qibla compass with exact bearing and distance to Makkah.
        </p>
        <button class="btn btn-sm" style="background:rgba(255,255,255,.08);color:rgba(255,255,255,.7);border:none" data-route="#/prayer">
          Find prayer times →
        </button>
      </article>

      <!-- Inheritance keyword cluster -->
      <article class="card card-dark" style="border:1px solid rgba(255,255,255,.08)" role="listitem">
        <div style="font-size:26px;margin-bottom:.75rem" aria-hidden="true">📜</div>
        <h3 style="font-family:var(--serif);font-size:1.05rem;color:#fff;margin-bottom:.5rem">
          Free Islamic Inheritance Calculator (Fara'id)
        </h3>
        <p style="font-size:13.5px;color:rgba(255,255,255,.5);line-height:1.65;margin-bottom:1rem">
          Qur'anic inheritance shares for all 13 heir types: husband, wife, sons, daughters, parents, grandparents, siblings, and more. Auto-applies blocking rules. Visual percentage and amount breakdown.
        </p>
        <button class="btn btn-sm" style="background:rgba(255,255,255,.08);color:rgba(255,255,255,.7);border:none" data-route="#/inheritance">
          Calculate inheritance →
        </button>
      </article>

      <!-- Faith / Shahada keyword cluster -->
      <article class="card card-dark" style="border:1px solid rgba(255,255,255,.08)" role="listitem">
        <div style="font-size:26px;margin-bottom:.75rem" aria-hidden="true">☪️</div>
        <h3 style="font-family:var(--serif);font-size:1.05rem;color:#fff;margin-bottom:.5rem">
          Understand the First Pillar — Shahada &amp; Tawhid
        </h3>
        <p style="font-size:13.5px;color:rgba(255,255,255,.5);line-height:1.65;margin-bottom:1rem">
          The declaration of faith, its seven conditions, the three dimensions of Tawhid, and the concept of Risala (prophethood) — all with Qur'anic verses, Hadith, and scholarly explanation.
        </p>
        <button class="btn btn-sm" style="background:rgba(255,255,255,.08);color:rgba(255,255,255,.7);border:none" data-route="#/faith">
          Learn about faith →
        </button>
      </article>

      <!-- Ramadan / Fasting keyword cluster -->
      <article class="card card-dark" style="border:1px solid rgba(255,255,255,.08)" role="listitem">
        <div style="font-size:26px;margin-bottom:.75rem" aria-hidden="true">🌙</div>
        <h3 style="font-family:var(--serif);font-size:1.05rem;color:#fff;margin-bottom:.5rem">
          Ramadan Fasting Tracker — Suhoor &amp; Iftar Times
        </h3>
        <p style="font-size:13.5px;color:rgba(255,255,255,.5);line-height:1.65;margin-bottom:1rem">
          Live Suhoor and Iftar times for your location. Fasting progress bar. Ramadan day counter. Comprehensive guide to Sawm rulings, Hadith on Ramadan, and the virtues of Laylat al-Qadr.
        </p>
        <button class="btn btn-sm" style="background:rgba(255,255,255,.08);color:rgba(255,255,255,.7);border:none" data-route="#/fasting">
          Track your fast →
        </button>
      </article>

      <!-- Hajj keyword cluster -->
      <article class="card card-dark" style="border:1px solid rgba(255,255,255,.08)" role="listitem">
        <div style="font-size:26px;margin-bottom:.75rem" aria-hidden="true">🕋</div>
        <h3 style="font-family:var(--serif);font-size:1.05rem;color:#fff;margin-bottom:.5rem">
          Pilgrimage to Makkah — Complete Hajj Rites Guide
        </h3>
        <p style="font-size:13.5px;color:rgba(255,255,255,.5);line-height:1.65;margin-bottom:1rem">
          Day-by-day Hajj rites from the 8th to the 13th of Dhul Hijjah. Three types of Hajj explained. Full Umrah guide. Conditions of obligation. Scholarly rulings from all four schools.
        </p>
        <button class="btn btn-sm" style="background:rgba(255,255,255,.08);color:rgba(255,255,255,.7);border:none" data-route="#/hajj">
          Read the Hajj guide →
        </button>
      </article>

    </div>
  </div>
</section>

<!-- ══ BUILDERS + OPEN SOURCE TEASER ════════════════════════════════ -->
<section class="section" aria-labelledby="team-heading">
  <div class="section-wide">
    <span class="eyebrow">Open source project</span>
    <h2 class="section-title" id="team-heading" style="margin-bottom:.75rem">Built by the community, for the community</h2>
    <p class="section-sub" style="margin-bottom:var(--space-8)">
      IslamicHub is open source, built by Zubair Idris Aweda and Yusuf Saif, and open to contributions from any Muslim who wants to help improve it.
    </p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;max-width:640px" class="mini-builders-grid">
      ${[
        {
            name: 'Zubair Idris Aweda',
            role: 'Software Engineer & Technical Writer',
            login: 'Zubs',
            avatar: 'https://avatars.githubusercontent.com/u/53227444?v=4'
        },
        {
            name: 'Yusuf Saif',
            role: 'Project Manager & Technical Strategist',
            login: 'yusuf-saif',
            avatar: 'https://avatars.githubusercontent.com/u/54576722?v=4'
        },
    ].map(b => `
        <a href="https://github.com/${b.login}" target="_blank" rel="noopener noreferrer"
           style="display:flex;align-items:center;gap:12px;padding:14px;background:#fff;border:1px solid var(--border);border-radius:var(--radius-lg);text-decoration:none;color:inherit;transition:box-shadow .15s"
           onmouseover="this.style.boxShadow='var(--shadow)'" onmouseout="this.style.boxShadow='none'">
          <img src="${b.avatar}" alt="${b.name}" width="44" height="44"
               style="border-radius:50%;border:2px solid var(--border);flex-shrink:0"
               loading="lazy"
               onerror="this.style.display='none'">
          <div>
            <div style="font-family:var(--serif);font-size:.95rem;font-weight:600;margin-bottom:1px">${b.name}</div>
            <div style="font-size:11.5px;color:var(--muted)">${b.role}</div>
          </div>
        </a>`).join('')}
    </div>
    <div style="margin-top:1.5rem">
      <button class="btn btn-secondary" data-route="#/about">
        About the project &amp; how to contribute →
      </button>
    </div>
  </div>
</section>

<!-- ══ FINAL CTA ════════════════════════════════════════════════════ -->
<section class="section" style="padding-top:0">
  <div class="section-wide">
    <div class="cta-strip" role="complementary">
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
  .hero-aside { display:none !important; }
  .why-grid   { grid-template-columns:1fr !important; }
}
@media(max-width:640px){
  .mini-builders-grid { grid-template-columns:1fr !important; }
}
</style>
  `;

    return null;
}

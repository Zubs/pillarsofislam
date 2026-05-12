// pages/tools/About.js
import {geoPattern} from '../../js/app.js';

const BUILDERS = [
    {
        login: 'Zubs',
        name: 'Zubair Idris Aweda',
        role: 'Software Engineer & Technical Writer',
        bio: 'Full-stack engineer behind the architecture, calculator engines, prayer time algorithms, and design system. Also built the original ZakatCalc and Kushirik projects that became IslamicHub.',
        avatar: 'https://avatars.githubusercontent.com/u/53227444?v=4',
        github: 'https://github.com/Zubs',
        contributions: ['Architecture & routing', 'Zakat calculator', 'Prayer times & Qibla engine', 'Inheritance (Fara\'id) engine', 'Design system & CSS'],
    },
    {
        login: 'yusuf-saif',
        name: 'Saifur-Rahman Yusuf',
        role: 'Project Manager & Technical Strategist',
        bio: 'Seasoned project manager with a robust background in technical solutions. Drives product direction, scholarly accuracy review, and ensures the platform stays true to its educational mission.',
        avatar: 'https://avatars.githubusercontent.com/u/54576722?v=4',
        github: 'https://github.com/yusuf-saif',
        contributions: ['Product strategy', 'Scholarly accuracy review', 'User experience direction', 'Content planning', 'Deployment & operations'],
    },
];

const REPO_URL = 'https://github.com/Zubs/pillarsofislam';
const ISSUES_URL = 'https://github.com/Zubs/pillarsofislam/issues';
const CONTRIB_URL = 'https://github.com/Zubs/pillarsofislam/blob/main/CONTRIBUTING.md';

export function render(outlet) {
    outlet.innerHTML = `
<!-- ══ PAGE HEADER ══════════════════════════════════════════════ -->
<div class="page-header" style="background:var(--ink)">
  ${geoPattern()}
  <div class="page-header-inner">
    <span class="page-eyebrow">About IslamicHub</span>
    <h1>Built with sincerity,<br>grounded in scholarship</h1>
    <p>IslamicHub began as two separate projects — ZakatCalc and Kushirik — and grew into a complete platform for learning and living the Five Pillars of Islam, with tools, education, and authentic references in one place.</p>
  </div>
</div>

<div class="content-narrow">

  <!-- ══ BUILDERS ════════════════════════════════════════════════ -->
  <span class="eyebrow" style="margin-top:2.5rem;display:block">The team</span>
  <h2 class="section-title" style="font-size:clamp(1.6rem,3vw,2.2rem);margin-bottom:.5rem">Built by Muslims, for Muslims</h2>
  <p class="prose" style="margin-bottom:2rem">IslamicHub is a passion project by two builders who wanted an Islamic platform that takes both technology and scholarship seriously.</p>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;margin-bottom:3rem" class="builders-grid">
    ${BUILDERS.map(b => `
    <div class="builder-card">
      <div class="builder-top">
        <img
          src="${b.avatar}"
          alt="${b.name} — GitHub profile photo"
          class="builder-avatar"
          width="64" height="64"
          loading="lazy"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
        >
        <div class="builder-avatar-fallback" aria-hidden="true" style="display:none">${b.name.charAt(0)}</div>
        <div class="builder-meta">
          <div class="builder-name">${b.name}</div>
          <div class="builder-role">${b.role}</div>
          <a href="${b.github}" target="_blank" rel="noopener noreferrer" class="builder-github-link" aria-label="${b.name} on GitHub">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            @${b.login}
          </a>
        </div>
      </div>
      <p class="builder-bio">${b.bio}</p>
      <div class="builder-contribs">
        <div class="builder-contribs-label">Contributions</div>
        <div class="builder-contribs-list">
          ${b.contributions.map(c => `<span class="contrib-tag">${c}</span>`).join('')}
        </div>
      </div>
    </div>`).join('')}
  </div>

  <!-- ══ OPEN SOURCE ══════════════════════════════════════════════ -->
  <div class="divider"></div>

  <span class="eyebrow">Open source</span>
  <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:1rem">Contributions welcome</h2>
  <div class="prose" style="margin-bottom:2rem">
    <p>IslamicHub is open source and we actively welcome contributions — whether that's a bug fix, a new educational section, a scholarly correction, a new language, or a UI improvement. The project lives on GitHub.</p>
    <p>If you notice an error in a scholarly reference, a calculation that feels off, or a feature that would help the Muslim community — please open an issue or submit a pull request. Every contribution, big or small, is valued and will be reviewed with care.</p>
  </div>

  <!-- Open source action cards -->
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:2rem" class="oss-grid">
    <a href="${REPO_URL}" target="_blank" rel="noopener noreferrer" class="oss-card">
      <div class="oss-icon" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
      </div>
      <div class="oss-name">View on GitHub</div>
      <div class="oss-desc">Browse the source code, fork the repo, and explore the project structure</div>
    </a>
    <a href="${ISSUES_URL}" target="_blank" rel="noopener noreferrer" class="oss-card">
      <div class="oss-icon" aria-hidden="true">🐛</div>
      <div class="oss-name">Report an issue</div>
      <div class="oss-desc">Found a bug, a calculation error, or an incorrect scholarly reference? Open an issue</div>
    </a>
    <a href="${CONTRIB_URL}" target="_blank" rel="noopener noreferrer" class="oss-card">
      <div class="oss-icon" aria-hidden="true">🤝</div>
      <div class="oss-name">How to contribute</div>
      <div class="oss-desc">Read the contribution guide — all skill levels welcome, from code to content to translations</div>
    </a>
  </div>

  <!-- Ways to contribute list -->
  <div class="card card-green" style="border-color:#B0D8C4;margin-bottom:2rem">
    <h3 style="font-family:var(--serif);font-size:1rem;font-weight:600;color:var(--green);margin-bottom:1rem">Ways you can contribute</h3>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem">
      ${[
        ['💻', 'Code — fix bugs, add features, improve performance'],
        ['📖', 'Content — write or improve educational articles'],
        ['🕌', 'Scholarship — correct or add Qur\'anic / Hadith references'],
        ['🌍', 'Translations — help make IslamicHub multilingual'],
        ['🎨', 'Design — UI improvements, icons, accessibility'],
        ['🧪', 'Testing — test across devices, browsers, and edge cases'],
        ['📣', 'Sharing — spread the word to the Muslim community'],
        ['⭐', 'Star on GitHub — it helps others discover the project'],
    ].map(([icon, text]) => `
        <div style="display:flex;align-items:flex-start;gap:8px;font-size:13.5px;color:var(--muted);padding:4px 0">
          <span style="flex-shrink:0">${icon}</span>
          <span>${text}</span>
        </div>`).join('')}
    </div>
  </div>

  <div class="divider"></div>

  <!-- ══ MISSION ══════════════════════════════════════════════════ -->
  <span class="eyebrow">Mission</span>
  <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:1.25rem">Why we built this</h2>
  <div class="prose">
    <p>Too many Islamic tools are either too simple — stripping away nuance until they're misleading — or too academic, presenting rulings without context for ordinary Muslims. IslamicHub was built to sit in the middle: rigorous enough to trust, accessible enough for anyone.</p>
    <p>The Five Pillars are not just obligations to tick off — they are acts of worship, each with a rich scholarly tradition and deep spiritual meaning. Every page on IslamicHub tries to give you both the practice and the understanding behind it.</p>
    <p>This project began as <strong>ZakatCalc</strong> (an accurate, live-priced Zakat calculator) and <strong>Kushirik</strong> (an inheritance sharing application), two separate projects by Zubair that were merged and expanded with Yusuf's direction into what IslamicHub is today.</p>
  </div>

  <div class="divider"></div>

  <!-- ══ PRINCIPLES ═══════════════════════════════════════════════ -->
  <span class="eyebrow">Principles</span>
  <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:1.5rem">What we stand for</h2>
  <div style="display:flex;flex-direction:column;gap:1.25rem;margin-bottom:2.5rem">
    ${[
        ['1', 'Primary sources first', 'Every ruling, calculation, and claim is traced back to Qur\'an or authenticated Hadith. We cite the source, not just the conclusion.'],
        ['2', 'All four schools', 'Hanafi, Maliki, Shafi\'i, and Hanbali positions are considered. Where they agree, we state the consensus. Where they differ, we present the options.'],
        ['3', 'Education over efficiency', 'A number without understanding is not enough. Every tool includes the scholarly basis for how the calculation works.'],
        ['4', 'Privacy by design', 'No accounts, no tracking, no data storage. Everything runs in your browser. Your financial and personal information stays with you.'],
        ['5', 'Humility before scholarship', 'We are builders, not scholars. For complex situations, we always direct users to a qualified mufti or scholar.'],
        ['6', 'Free, always', 'Helping Muslims fulfil their obligations should not be a commercial transaction. This platform is and will remain free.'],
    ].map(([n, title, desc]) => `
      <div style="display:flex;gap:1rem">
        <div style="font-family:var(--serif);font-size:2rem;font-weight:600;color:var(--green);opacity:.2;line-height:1;flex-shrink:0;width:32px">${n}</div>
        <div>
          <div style="font-family:var(--serif);font-size:1rem;font-weight:600;margin-bottom:.3rem">${title}</div>
          <div style="font-size:14px;color:var(--muted);line-height:1.6">${desc}</div>
        </div>
      </div>`).join('')}
  </div>

  <div class="divider"></div>

  <!-- ══ SCHOLARLY SOURCES ═════════════════════════════════════════ -->
  <span class="eyebrow" id="scholars">Scholarly sources</span>
  <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:1.5rem">What we draw from</h2>
  <div class="card-grid card-grid-2" style="margin-bottom:2.5rem">
    <div class="card"><div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--green);margin-bottom:.75rem">Primary texts</div><div style="font-size:13.5px;color:var(--muted);line-height:2">Qur'an — Surah 2, 3, 4, 9, 97, 112 et al.<br>Sahih Bukhari — Kitab al-Zakat, al-Salah, al-Sawm, al-Hajj<br>Sahih Muslim — multiple books<br>Sunan Abu Dawud · Ibn Majah · Al-Tirmidhi</div></div>
    <div class="card"><div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--green);margin-bottom:.75rem">Classical scholarship</div><div style="font-size:13.5px;color:var(--muted);line-height:2">Al-Mughni — Ibn Qudama al-Maqdisi<br>Al-Majmu' — Imam al-Nawawi<br>Bada'i' al-Sana'i' — Al-Kasani<br>Al-Umm — Imam al-Shafi'i<br>Al-Mudawwana — Imam Malik</div></div>
    <div class="card"><div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--green);margin-bottom:.75rem">Contemporary scholarship</div><div style="font-size:13.5px;color:var(--muted);line-height:2">Fiqh al-Zakat — Sheikh Yusuf al-Qaradawi<br>Contemporary Fatawa — Mufti Taqi Usmani<br>AAOIFI Shari'ah Standard No. 35<br>Zakat House (Kuwait) guidelines</div></div>
    <div class="card"><div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--green);margin-bottom:.75rem">Technical &amp; data sources</div><div style="font-size:13.5px;color:var(--muted);line-height:2">Prayer times: astronomical Adhan algorithm<br>metals.live — live gold/silver spot prices<br>frankfurter.app — live FX rates (GBP/USD/EUR/SAR)<br>Nominatim (OpenStreetMap) — reverse geocoding</div></div>
  </div>

  <!-- ══ DISCLAIMER ════════════════════════════════════════════════ -->
  <div class="card card-gold" style="border-color:#E0C87A;margin-bottom:3rem">
    <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:#7A5A10;margin-bottom:8px">⚠ Disclaimer</div>
    <p style="font-size:13.5px;color:#5A3E0A;line-height:1.7">IslamicHub is an educational and guidance tool. It is not a fatwa or formal religious ruling. Prayer times are calculated astronomically and may differ from local mosque announcements. Inheritance calculations cover standard cases — complex situations require expert consultation. For personal religious rulings, consult a qualified Islamic scholar (mufti).</p>
  </div>

  <!-- ══ FINAL CTA ══════════════════════════════════════════════════ -->
  <div class="cta-strip">
    ${geoPattern()}
    <h2>Join us in building this</h2>
    <p>Star the repo, open an issue, or submit a pull request. Every contribution helps the Muslim community.</p>
    <div class="btn-group" style="justify-content:center">
      <a href="${REPO_URL}" target="_blank" rel="noopener noreferrer" class="btn btn-white btn-lg">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
        View on GitHub
      </a>
      <button class="btn btn-secondary btn-lg" style="color:#fff;border-color:rgba(255,255,255,.35)" data-route="#/zakat">Try the Zakat Calculator</button>
    </div>
  </div>

</div>

<style>
/* ── Builder cards ─────────────────────────────────────────────── */
.builders-grid { }
@media(max-width:640px){ .builders-grid { grid-template-columns:1fr !important; } }

.builder-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: box-shadow .2s;
}
.builder-card:hover { box-shadow: var(--shadow); }

.builder-top { display: flex; align-items: flex-start; gap: 14px; }

.builder-avatar {
  width: 64px; height: 64px;
  border-radius: 50%;
  border: 2px solid var(--border);
  flex-shrink: 0;
  object-fit: cover;
}
.builder-avatar-fallback {
  width: 64px; height: 64px;
  border-radius: 50%;
  background: var(--green-light);
  color: var(--green);
  font-family: var(--serif);
  font-size: 1.8rem;
  font-weight: 600;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
}

.builder-name {
  font-family: var(--serif);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--ink);
  line-height: 1.2;
  margin-bottom: 2px;
}
.builder-role {
  font-size: 12.5px;
  color: var(--muted);
  margin-bottom: 6px;
  line-height: 1.3;
}
.builder-github-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 500;
  color: var(--green);
  text-decoration: none;
  padding: 3px 8px;
  background: var(--green-light);
  border-radius: 10px;
  transition: background .15s;
}
.builder-github-link:hover { background: #C8E8D8; }

.builder-bio {
  font-size: 13.5px;
  color: var(--muted);
  line-height: 1.65;
}

.builder-contribs-label {
  font-size: 10.5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .5px;
  color: var(--muted);
  margin-bottom: 6px;
}
.builder-contribs-list { display: flex; flex-wrap: wrap; gap: 5px; }
.contrib-tag {
  font-size: 11.5px;
  padding: 3px 9px;
  background: var(--cream-dark);
  border: 1px solid var(--border);
  border-radius: 10px;
  color: var(--muted);
}

/* ── OSS action cards ──────────────────────────────────────────── */
.oss-grid { }
@media(max-width:600px){ .oss-grid { grid-template-columns:1fr !important; } }

.oss-card {
  background: var(--cream-dark);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all .15s;
  color: inherit;
}
.oss-card:hover {
  background: #fff;
  box-shadow: var(--shadow-sm);
  border-color: var(--green);
  transform: translateY(-2px);
}
.oss-icon {
  font-size: 22px;
  width: 40px; height: 40px;
  background: var(--green-light);
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  color: var(--green);
}
.oss-name {
  font-family: var(--serif);
  font-size: 1rem;
  font-weight: 600;
  color: var(--ink);
}
.oss-desc { font-size: 12.5px; color: var(--muted); line-height: 1.5; }
</style>
  `;
    return null;
}

// pages/tools/About.js
import { geoPattern } from '../../js/app.js';

export function render(outlet) {
  outlet.innerHTML = `
<div class="page-header" style="background:var(--ink)">
  ${geoPattern()}
  <div class="page-header-inner">
    <span class="page-eyebrow">About IslamicHub</span>
    <h1>Built with sincerity, grounded in scholarship</h1>
    <p>IslamicHub began as a Zakat calculator and grew into a complete platform for learning and living the Five Pillars of Islam — with tools, education, and authentic references in one place.</p>
  </div>
</div>

<div class="content-narrow">

  <div style="margin-bottom:3rem">
    <span class="eyebrow">Mission</span>
    <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:1.25rem">Why we built this</h2>
    <div class="prose">
      <p>Too many Islamic tools are either too simple — stripping away nuance until they're misleading — or too academic, presenting rulings without context for ordinary Muslims. IslamicHub was built to sit in the middle: rigorous enough to trust, accessible enough for anyone.</p>
      <p>The Five Pillars are not just obligations to tick off — they are acts of worship, each with a rich scholarly tradition and deep spiritual meaning. Every page on IslamicHub tries to give you both the practice and the understanding.</p>
      <p>This project began as ZakatCalc (github.com/Zubs/zakatcalc) and Kushirik, two separate tools merged into a single educational platform. The name "IslamicHub" reflects its new scope — a central place for Islamic learning and practice.</p>
    </div>
  </div>

  <div class="divider"></div>

  <div style="margin-bottom:3rem">
    <span class="eyebrow">Principles</span>
    <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:1.5rem">What we stand for</h2>
    <div style="display:flex;flex-direction:column;gap:1.25rem">
      ${[
        ['1','Primary sources first','Every ruling, calculation, and claim is traced back to Qur\'an or authenticated Hadith. We cite the source, not just the conclusion.'],
        ['2','All four schools','Hanafi, Maliki, Shafi\'i, and Hanbali positions are all considered. Where they agree, we state the consensus. Where they differ, we present the options and explain the reasoning.'],
        ['3','Education over efficiency','A number without understanding is not enough. Every tool section includes the scholarly basis for why the calculation works as it does.'],
        ['4','Privacy by design','No accounts, no tracking, no data storage. Everything runs in your browser. Your financial and personal information stays with you.'],
        ['5','Humility before scholarship','We are builders, not scholars. For complex situations — business structures, unusual inheritance cases, disputed rulings — we always direct users to a qualified mufti or scholar.'],
        ['6','Free, always','Helping Muslims fulfil their obligations should not be a commercial transaction. This platform is and will remain free.'],
      ].map(([n,title,desc]) => `
        <div style="display:flex;gap:1rem">
          <div style="font-family:var(--serif);font-size:2rem;font-weight:600;color:var(--green);opacity:.2;line-height:1;flex-shrink:0;width:32px">${n}</div>
          <div>
            <div style="font-family:var(--serif);font-size:1rem;font-weight:600;margin-bottom:.3rem">${title}</div>
            <div style="font-size:14px;color:var(--muted);line-height:1.6">${desc}</div>
          </div>
        </div>`).join('')}
    </div>
  </div>

  <div class="divider"></div>

  <div style="margin-bottom:3rem">
    <span class="eyebrow">Scholarly sources</span>
    <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:1.5rem">What we draw from</h2>
    <div class="card-grid card-grid-2">
      <div class="card"><div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--green);margin-bottom:.75rem">Primary texts</div><div style="font-size:13.5px;color:var(--muted);line-height:2">Qur'an — multiple surahs<br>Sahih Bukhari — Kitab al-Zakat, al-Salah, al-Sawm, al-Hajj<br>Sahih Muslim — multiple books<br>Sunan Abu Dawud<br>Ibn Majah · Al-Tirmidhi</div></div>
      <div class="card"><div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--green);margin-bottom:.75rem">Classical scholarship</div><div style="font-size:13.5px;color:var(--muted);line-height:2">Al-Mughni — Ibn Qudama<br>Al-Majmu' — Imam al-Nawawi<br>Bada'i' al-Sana'i' — Al-Kasani<br>Al-Umm — Imam al-Shafi'i<br>Al-Mudawwana — Imam Malik</div></div>
      <div class="card"><div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--green);margin-bottom:.75rem">Contemporary scholarship</div><div style="font-size:13.5px;color:var(--muted);line-height:2">Fiqh al-Zakat — Sheikh al-Qaradawi<br>Contemporary Fatawa — Mufti Taqi Usmani<br>AAOIFI Shari'ah Standard No. 35<br>Zakat House (Kuwait) guidelines</div></div>
      <div class="card"><div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--green);margin-bottom:.75rem">Technical &amp; data sources</div><div style="font-size:13.5px;color:var(--muted);line-height:2">Prayer times: astronomical Adhan algorithm<br>metals.live — live gold/silver spot prices<br>frankfurter.app — live FX rates<br>Nominatim (OpenStreetMap) — reverse geocoding</div></div>
    </div>
  </div>

  <div class="divider"></div>

  <div style="margin-bottom:3rem">
    <span class="eyebrow">What's inside</span>
    <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:1.5rem">Platform overview</h2>
    <div class="card-grid" style="grid-template-columns:repeat(auto-fill,minmax(220px,1fr))">
      ${[
        ['☪️ Faith (Shahada)','The declaration of faith — Tawhid, the seven conditions, Risala, and the three dimensions of divine oneness'],
        ['🕌 Prayer (Salah)','Full prayer times calculator (astronomical algorithm), Qibla finder with compass, and complete educational guide'],
        ['✦ Zakat','Live-priced calculator with dual Nisab methods, all asset categories, debt deductions, and scholars references'],
        ['🌙 Fasting (Sawm)','Suhoor/Iftar times, fasting progress tracker, Ramadan countdown, and comprehensive ruling guide'],
        ['🕋 Hajj','Step-by-step rites guide for all five days, types of Hajj, Umrah guide, and condition explanations'],
        ['⚖️ Inheritance (Fara\'id)','Full Qur\'anic inheritance calculator with all 13 heir types, automatic blocking rules, and educational notes'],
      ].map(([t,d]) => `
        <div class="card">
          <div style="font-size:22px;margin-bottom:.75rem">${t.split(' ')[0]}</div>
          <div style="font-family:var(--serif);font-size:.95rem;font-weight:600;margin-bottom:.4rem">${t.split(' ').slice(1).join(' ')}</div>
          <div style="font-size:13px;color:var(--muted);line-height:1.55">${d}</div>
        </div>`).join('')}
    </div>
  </div>

  <div class="card card-gold" style="border-color:#E0C87A;margin-bottom:3rem">
    <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:#7A5A10;margin-bottom:8px">⚠ Disclaimer</div>
    <p style="font-size:13.5px;color:#5A3E0A;line-height:1.7">IslamicHub is an educational and guidance tool. It is not a fatwa or formal religious ruling. Prayer times are calculated astronomically and may differ from local mosque announcements. Inheritance calculations cover standard Hanafi cases — complex situations may require expert consultation. For personal religious rulings, please consult a qualified Islamic scholar (mufti).</p>
  </div>

  <div class="cta-strip">
    ${geoPattern()}
    <h2>Start exploring</h2>
    <p>Begin with the first pillar, or jump straight to the tool you need.</p>
    <div class="btn-group" style="justify-content:center">
      <button class="btn btn-white btn-lg" data-route="#/faith">Start with Faith</button>
      <button class="btn btn-secondary btn-lg" style="color:#fff;border-color:rgba(255,255,255,.35)" data-route="#/zakat">Zakat Calculator</button>
    </div>
  </div>

</div>`;
  return null;
}

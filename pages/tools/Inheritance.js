// pages/tools/Inheritance.js
import { geoPattern, initFaqs } from '../../js/app.js';
import { HEIR_DEFS, calcInheritance } from '../../js/utils/inheritance.js';
import { state } from '../../js/state.js';

export function render(outlet) {
  outlet.innerHTML = buildHTML();
  initFaqs(document.getElementById('faq-inh'));
  initCalculator();
  return null;
}

function buildHTML() {
  // Group heirs by category for layout
  const groups = {};
  for (const def of HEIR_DEFS) {
    if (!groups[def.group]) groups[def.group] = [];
    groups[def.group].push(def);
  }

  return `
<div class="page-header" style="background:var(--ink);border-bottom:3px solid var(--gold);position:relative">
  <div class="ornament-hanging left" aria-hidden="true" style="opacity:0.3"></div>
  <div class="ornament-hanging right" aria-hidden="true" style="opacity:0.3"></div>
  ${geoPattern()}
  <div class="page-header-inner">
    <div class="pillar-num-badge" style="background:var(--gold-light);color:var(--gold)">Islamic Tool &nbsp;·&nbsp; الميراث</div>
    <h1>Fara'id — Islamic Inheritance Calculator</h1>
    <p>Calculate the Qur'anic shares of inheritance based on the heirs present. Each share is derived directly from Qur'an 4:11–12 and 4:176.</p>
  </div>
</div>

<div class="content-wrap" style="max-width:1100px">

  <div class="quran-block frame-calligraphy" style="max-width:860px;margin-left:auto;margin-right:auto">
    <div class="corner-ornament top-left" aria-hidden="true"></div>
    <div class="corner-ornament top-right" aria-hidden="true"></div>
    <div class="corner-ornament bottom-left" aria-hidden="true"></div>
    <div class="corner-ornament bottom-right" aria-hidden="true"></div>
    <div class="quran-arabic">يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ ۖ لِلذَّكَرِ مِثْلُ حَظِّ الْأُنثَيَيْنِ</div>
    <div class="quran-ref">Qur'an 4:11</div>
    <div class="quran-trans">"Allah instructs you concerning your children: for the male, what is equal to the share of two females." — The foundational verse of Islamic inheritance law.</div>
  </div>

  <div style="margin-top:2.5rem;display:grid;grid-template-columns:1fr 380px;gap:2rem;align-items:start" id="inh-layout">

    <!-- LEFT: Heir input -->
    <div>
      <span class="eyebrow">Step 1</span>
      <h2 class="section-title" style="font-size:clamp(1.4rem,2.5vw,1.8rem);margin-bottom:.75rem">Select the heirs present</h2>
      <p class="prose" style="font-size:15px;margin-bottom:1.5rem">Toggle each heir present in the estate. For heirs where count matters (multiple wives, sons, daughters), enter the number.</p>

      <!-- Estate value -->
      <div class="card" style="margin-bottom:1.5rem">
        <div class="field">
          <label>Total estate value (after debts &amp; funeral expenses)</label>
          <div class="pfx-wrap">
            <span class="pfx" id="inh-sym">${state.sym}</span>
            <input type="number" class="input-field" id="estate-val" value="100000" min="0" step="1000">
          </div>
          <div class="hint">Zakat on zakatable portions should be calculated separately</div>
        </div>
      </div>

      ${Object.entries(groups).map(([group, heirs]) => `
        <div style="margin-bottom:1.5rem">
          <span class="eyebrow" style="margin-bottom:10px;display:block">${group}</span>
          ${heirs.map(def => `
            <div class="heir-toggle" id="heir-row-${def.key}">
              <div class="heir-info">
                <h4>${def.label}</h4>
                <p>${getHeirDesc(def.key)} <span style="color:var(--gold);font-weight:500">· ${def.quran}</span></p>
              </div>
              <div style="display:flex;align-items:center;gap:10px">
                <input type="number" class="input-field" id="heir-count-${def.key}" min="1" value="1"
                  style="width:60px;display:none;text-align:center" placeholder="1">
                <button class="toggle-switch" id="heir-toggle-${def.key}" data-key="${def.key}" onclick="window.toggleHeir('${def.key}')"></button>
              </div>
            </div>`).join('')}
        </div>`).join('')}
    </div>

    <!-- RIGHT: Results -->
    <div style="position:sticky;top:84px">
      <div class="inheritance-results" id="inh-results">
        <div class="inh-title">Inheritance Breakdown</div>
        <div id="inh-rows" style="color:rgba(255,255,255,.45);font-size:14px;text-align:center;padding:1.25rem 0">
          Select heirs on the left to calculate shares
        </div>
        <div id="inh-total" style="display:none;border-top:1px solid rgba(255,255,255,.12);margin-top:1rem;padding-top:1rem">
          <div style="display:flex;justify-content:space-between;font-size:13px;color:rgba(255,255,255,.5)">
            <span>Total estate distributed</span>
            <span id="inh-total-val" style="color:var(--gold);font-weight:600"></span>
          </div>
        </div>
      </div>

      <div class="card card-gold" style="margin-top:1rem;border-color:#E0C87A">
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:#7A5A10;margin-bottom:6px">⚠ Important note</div>
        <p style="font-size:13.5px;color:#5A3E0A;line-height:1.65">Inheritance law is complex. This calculator covers standard Hanafi cases with Qur'anic references. For non-standard situations — multiple marriages, missing heirs, disputes — consult a qualified Islamic scholar or mufti.</p>
      </div>
    </div>

  </div><!-- inh-layout -->

  <div class="divider-kufic" style="max-width:860px;margin:2.5rem auto" aria-hidden="true"><div class="divider-kufic-icon"></div></div>

  <!-- Education -->
  <div style="max-width:860px">
    <span class="eyebrow">Understanding Fara'id</span>
    <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:1rem">The Qur'anic system of inheritance</h2>
    <div class="prose">
      <p>Fara'id (فَرَائِض) — from the root meaning "obligatory portions" — is the Islamic law of inheritance derived primarily from Qur'an 4:11–12 and 4:176. It is one of the most precisely legislated areas of Islamic law, with specific fractional shares assigned directly by divine revelation.</p>
      <p>The system has two main categories of heirs: <strong>Dhawu al-furud</strong> (those with fixed Qur'anic shares) and <strong>Asaba</strong> (residuaries who receive the remainder after fixed shares are distributed). Males generally receive double the share of their equivalent female relative, reflecting the greater financial obligations Islam places on men.</p>
    </div>

    <div class="hadith-block" style="margin:1.5rem 0">
      <div class="hadith-source">Sahih Bukhari 6732 · Abu Dawud 2886</div>
      <div class="hadith-text">"Learn the Fara'id (laws of inheritance) and teach them, for it is half of knowledge, and it will be forgotten. It is the first thing that will be taken away from my nation." — The Prophet Muhammad ﷺ</div>
    </div>

    <div class="divider-kufic" aria-hidden="true"><div class="divider-kufic-icon"></div></div>

    <!-- Fixed shares table -->
    <span class="eyebrow">Quick reference</span>
    <h3 style="font-family:var(--serif);font-size:1.2rem;font-weight:600;margin-bottom:1rem;margin-top:.25rem">Fixed Qur'anic shares at a glance</h3>
    <div style="background:#fff;border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;margin-bottom:1.5rem">
      <table style="width:100%;border-collapse:collapse;font-size:13.5px">
        <thead>
          <tr style="background:var(--ink);color:#fff">
            <th style="padding:10px 14px;text-align:left;font-weight:600">Heir</th>
            <th style="padding:10px 14px;text-align:center;font-weight:600">With children</th>
            <th style="padding:10px 14px;text-align:center;font-weight:600">Without children</th>
            <th style="padding:10px 14px;text-align:left;font-weight:600">Source</th>
          </tr>
        </thead>
        <tbody>
          ${[
            ['Husband','1/4','1/2','Qur\'an 4:12'],
            ['Wife (or wives)','1/8','1/4','Qur\'an 4:12'],
            ['Father','1/6 (with sons)','Residue','Qur\'an 4:11'],
            ['Mother','1/6','1/3','Qur\'an 4:11'],
            ['Daughter (1)','1/2 (no sons)','1/2','Qur\'an 4:11'],
            ['Daughters (2+)','2/3 (no sons)','2/3','Qur\'an 4:11'],
            ['Son','Residue (double daughter)','Residue','Qur\'an 4:11'],
            ['Full Sister (1)','1/2 (if no closer heirs)','1/2','Qur\'an 4:176'],
          ].map((r,i) => `
            <tr style="${i%2===0?'background:var(--cream)':''}">
              ${r.map((c,j) => `<td style="padding:9px 14px;border-bottom:1px solid var(--border);${j>0&&j<3?'text-align:center;font-family:var(--serif);font-weight:600;color:var(--green)':''}">${c}</td>`).join('')}
            </tr>`).join('')}
        </tbody>
      </table>
    </div>

    <div class="faq-list" id="faq-inh">
      ${[
        ['What is awl (proportional reduction)?','When the sum of all fixed shares exceeds the estate (e.g. totals 7/6), the shares are proportionally reduced so they sum to the estate. This is called awl (العَوْل) — the consensus of the Companions, adopted by all schools except some early Hanbali positions.'],
        ['What is radd (return)?','When the fixed shares do not exhaust the estate and there are no residuary (asaba) heirs, the remainder is returned proportionally to the fixed-share heirs. This is called radd (الرَّدّ). Husband/wife do not generally receive radd.'],
        ['Who is a mahrum (excluded) heir?','Certain heirs are excluded from inheritance regardless: a murderer of the deceased, an apostate (those who leave Islam), and non-Muslims cannot inherit from a Muslim. These are the three main exclusions.'],
        ['Does a will override Qur\'anic shares?','No — the Qur\'anic shares (fara\'id) are mandatory and cannot be altered by a will. However, a Muslim may leave up to one-third of their estate to non-heirs (e.g. charity, friends, or non-Muslim relatives) through a valid wasiyyah (bequest).'],
      ].map(([q,a])=>`
        <div class="faq-item">
          <button class="faq-q">${q} <span class="faq-chev">+</span></button>
          <div class="faq-a">${a}</div>
        </div>`).join('')}
    </div>
  </div>

</div>`;
}

function getHeirDesc(key) {
  const descs = {
    husband: 'Receives 1/4 or 1/2 depending on children',
    wife: 'Receives 1/8 or 1/4 — divided equally among all wives',
    father: 'Receives 1/6 fixed or residue depending on sons',
    mother: 'Receives 1/6 or 1/3 depending on children & siblings',
    son: 'Residuary — receives double a daughter\'s share',
    daughter: 'Receives 1/2 (one), 2/3 (two+), or residue with son',
    grandson: 'Son\'s son — blocked by a son',
    granddaughter: 'Son\'s daughter — partially blocked',
    brother: 'Full brother — blocked by father or son',
    sister: 'Full sister — blocked by brother or father',
    paternal_grandfather: 'Father\'s father — blocked by father',
    paternal_grandmother: 'Receives 1/6 — blocked by mother or father',
    maternal_grandmother: 'Receives 1/6 — blocked by mother',
  };
  return descs[key] || '';
}

function initCalculator() {
  const activeHeirs = {};
  window.toggleHeir = (key) => {
    const btn = document.getElementById(`heir-toggle-${key}`);
    const countEl = document.getElementById(`heir-count-${key}`);
    const isOn = btn.classList.contains('on');
    if (isOn) {
      btn.classList.remove('on');
      countEl.style.display = 'none';
      delete activeHeirs[key];
    } else {
      btn.classList.add('on');
      const needsCount = ['wife','son','daughter','grandson','granddaughter','brother','sister'].includes(key);
      if (needsCount) countEl.style.display = '';
      activeHeirs[key] = parseInt(countEl.value) || 1;
    }
    recalc();
  };

  document.querySelectorAll('[id^="heir-count-"]').forEach(el => {
    el.addEventListener('input', () => {
      const key = el.id.replace('heir-count-','');
      if (activeHeirs[key] !== undefined) {
        activeHeirs[key] = parseInt(el.value) || 1;
        recalc();
      }
    });
  });

  document.getElementById('estate-val').addEventListener('input', recalc);
  const unsub = state.subscribe(recalc);

  function recalc() {
    const estate = parseFloat(document.getElementById('estate-val')?.value) || 100000;
    const sym = state.sym;
    document.getElementById('inh-sym').textContent = sym;

    if (Object.keys(activeHeirs).length === 0) {
      document.getElementById('inh-rows').innerHTML = '<div style="color:rgba(255,255,255,.4);font-size:14px;text-align:center;padding:1rem 0">Select heirs on the left</div>';
      document.getElementById('inh-total').style.display = 'none';
      return;
    }

    const results = calcInheritance(activeHeirs, estate);

    if (results.length === 0) {
      document.getElementById('inh-rows').innerHTML = '<div style="color:rgba(255,255,255,.4);font-size:14px;text-align:center;padding:1rem">No valid heirs or all heirs blocked</div>';
      return;
    }

    const fmtAmt = n => sym + Number(n).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    document.getElementById('inh-rows').innerHTML = results.map(r => `
      <div class="inh-row">
        <div class="inh-heir">${r.label}${r.count > 1 ? ` ×${r.count}` : ''}</div>
        <div class="inh-bar-wrap"><div class="inh-bar-fill" style="width:${r.percent}%"></div></div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:2px">
          <div class="inh-share">${r.shareStr === 'Residue' ? 'Residue' : r.shareStr} (${r.percent}%)</div>
          <div class="inh-amount">${fmtAmt(r.amount)}</div>
        </div>
      </div>`).join('');

    document.getElementById('inh-total').style.display = '';
    document.getElementById('inh-total-val').textContent = fmtAmt(estate);
  }

  return unsub;
}

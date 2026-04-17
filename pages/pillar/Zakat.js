// pages/pillar/Zakat.js
import { geoPattern, initFaqs } from '../../js/app.js';
import { state, fetchPrices } from '../../js/state.js';

export function render(outlet) {
  outlet.innerHTML = buildHTML();
  initFaqs(document.getElementById('faq-zakat'));
  initCalculator();
  const unsub = state.subscribe(() => refreshPrices());
  return unsub;
}

function buildHTML() {
  return `
<div class="page-header pillar-header-zakat" style="position:relative">
  <div class="ornament-hanging left" aria-hidden="true" style="opacity:0.3"></div>
  <div class="ornament-hanging right" aria-hidden="true" style="opacity:0.3"></div>
  ${geoPattern()}
  <div class="page-header-inner">
    <div class="pillar-num-badge" style="background:var(--zakat-light);color:var(--zakat-color)">Pillar 3 of 5 &nbsp;·&nbsp; الزكاة</div>
    <h1>Zakat — Obligatory Almsgiving</h1>
    <p>The third pillar — an annual 2.5% levy on zakatable wealth above the Nisab threshold, obligatory on every Muslim who meets the conditions.</p>
  </div>
</div>

<div class="content-wrap" style="max-width:1100px">

  <div class="quran-block frame-calligraphy" style="max-width:860px; margin-left:auto; margin-right:auto">
    <div class="corner-ornament top-left" aria-hidden="true"></div>
    <div class="corner-ornament top-right" aria-hidden="true"></div>
    <div class="corner-ornament bottom-left" aria-hidden="true"></div>
    <div class="corner-ornament bottom-right" aria-hidden="true"></div>
    <div class="quran-arabic">خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا</div>
    <div class="quran-ref">Qur'an 9:103</div>
    <div class="quran-trans">"Take from their wealth a charity by which you purify them and cause them increase." — The direct divine command establishing Zakat.</div>
  </div>

  <!-- Calculator section -->
  <div style="margin-top:2.5rem">
    <span class="eyebrow">Zakat Calculator</span>
    <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:.75rem">Calculate your obligation</h2>

    <!-- Controls -->
    <div class="card" style="margin-bottom:1rem">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:12px">
        <div>
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);margin-bottom:4px">Currency</div>
          <div class="btn-group">
            ${[['GBP','£'],['USD','$'],['EUR','€'],['SAR','﷼']].map(([c,s]) =>
              `<button class="pill-btn cur-btn${state.currency===c?' active':''}" data-cur="${c}" data-sym="${s}">${s} ${c}</button>`
            ).join('')}
          </div>
        </div>
        <div>
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);margin-bottom:4px;text-align:right">Nisab method</div>
          <div class="btn-group">
            <button class="pill-btn nisab-btn${state.nisabMethod==='gold'?' active':''}" data-nisab="gold">Gold (85g)</button>
            <button class="pill-btn nisab-btn${state.nisabMethod==='silver'?' active':''}" data-nisab="silver">Silver (595g)</button>
          </div>
        </div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:baseline;border-top:1px solid var(--border);padding-top:12px;flex-wrap:wrap;gap:8px">
        <div>
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);margin-bottom:3px">Nisab threshold</div>
          <span style="font-family:var(--serif);font-size:1.6rem;font-weight:600;color:var(--green)" id="nisab-display">—</span>
          <span style="font-size:12px;color:var(--muted);margin-left:6px" id="nisab-meta"></span>
        </div>
        <div style="text-align:right">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);margin-bottom:3px">Gold price</div>
          <span id="gold-price-disp" style="font-size:14px;color:var(--ink)">—</span>
          <span class="badge" id="price-badge" style="margin-left:6px">loading</span>
        </div>
      </div>
      <div style="font-size:11.5px;color:#bbb;margin-top:8px;line-height:1.5">
        Gold nisab: Hanafi/Shafi'i/Hanbali/Maliki majority — 85g of 24ct gold &nbsp;·&nbsp; Silver nisab: Some Hanafi scholars — 595g silver (Sahih Bukhari 1454)
      </div>
    </div>

    <!-- Main calc layout -->
    <div class="calc-layout">
      <div id="calc-main">

        ${accCard('cash','💵','ic-teal','Cash & Bank Savings','All liquid money you hold',true,`
          <div class="ref-box"><strong>Qur'an 9:103 · Sahih Bukhari 1454</strong>Cash and bank balances held above Nisab for a full lunar year (hawl) are zakatable at 2.5%.</div>
          <div class="field-grid">
            <div class="field"><label>Cash at home</label><div class="pfx-wrap"><span class="pfx sym">£</span><input type="number" class="input-field" id="f-cashHome" min="0" placeholder="0.00"></div></div>
            <div class="field"><label>Current accounts</label><div class="pfx-wrap"><span class="pfx sym">£</span><input type="number" class="input-field" id="f-cashCurrent" min="0" placeholder="0.00"></div></div>
          </div>
          <div class="field-grid">
            <div class="field"><label>Savings accounts</label><div class="pfx-wrap"><span class="pfx sym">£</span><input type="number" class="input-field" id="f-cashSavings" min="0" placeholder="0.00"></div></div>
            <div class="field"><label>Foreign currency (converted)</label><div class="pfx-wrap"><span class="pfx sym">£</span><input type="number" class="input-field" id="f-cashForeign" min="0" placeholder="0.00"></div></div>
          </div>`)}

        ${accCard('owed','💸','ic-blue','Money Owed To You','Loans given, expected income',false,`
          <div class="ref-box"><strong>Scholarly consensus (ijma') · Ibn Qudama, Al-Mughni</strong>Reliably expected money is zakatable. Uncertain receivables: exclude until received.</div>
          <div class="field-grid">
            <div class="field"><label>Loans given (expected back)</label><div class="pfx-wrap"><span class="pfx sym">£</span><input type="number" class="input-field" id="f-loansGiven" min="0" placeholder="0.00"></div></div>
            <div class="field"><label>Unpaid salary / income</label><div class="pfx-wrap"><span class="pfx sym">£</span><input type="number" class="input-field" id="f-unpaidIncome" min="0" placeholder="0.00"></div></div>
          </div>
          <div class="field-grid field-grid-1">
            <div class="field"><label>Other receivables</label><div class="pfx-wrap"><span class="pfx sym">£</span><input type="number" class="input-field" id="f-otherOwed" min="0" placeholder="0.00"></div></div>
          </div>`)}

        ${accCard('metals','✦','ic-amber','Gold & Silver','Jewellery, bars, coins — live prices',false,`
          <div class="ref-box"><strong>Qur'an 9:34 · Abu Dawud 1558</strong>Gold and silver are zakatable. Hanafi: worn women's ornaments exempt. Shafi'i/Hanbali/Maliki: all gold zakatable.</div>
          <div class="metal-tiles">
            <div class="metal-tile"><div class="mt-name">Gold spot · 24ct/gram</div><div class="mt-price" id="mt-gold">—<span class="mt-unit"> /gram</span></div><span class="badge" id="mt-gold-badge">loading</span></div>
            <div class="metal-tile"><div class="mt-name">Silver spot · per gram</div><div class="mt-price" id="mt-silver">—<span class="mt-unit"> /gram</span></div><span class="badge" id="mt-silver-badge">loading</span></div>
          </div>
          <div class="field-grid">
            <div class="field"><label>Gold purity</label><select class="select-field" id="f-goldPurity"><option value="1">24ct pure</option><option value="0.9167" selected>22ct</option><option value="0.75">18ct</option><option value="0.375">9ct</option></select></div>
            <div class="field"><label>Gold weight (grams)</label><input type="number" class="input-field" id="f-goldGrams" min="0" step="0.1" placeholder="0"></div>
          </div>
          <div class="field-grid">
            <div class="field"><label>Silver weight (grams)</label><input type="number" class="input-field" id="f-silverGrams" min="0" step="0.1" placeholder="0"></div>
            <div class="field"><label>Known total value (optional)</label><div class="pfx-wrap"><span class="pfx sym">£</span><input type="number" class="input-field" id="f-metalsDirect" min="0" placeholder="0.00"></div><div class="hint">Enter if you already know the value</div></div>
          </div>`)}

        ${accCard('invest','📈','ic-purple','Investments & Shares','Stocks, ISAs, pensions, business assets',false,`
          <div class="ref-box"><strong>AAOIFI Standard No. 35 · Sheikh al-Qaradawi</strong>Shares: 2.5% of market value (simplified, widely accepted). Business trade goods: 2.5% of market value. Pension: include only if accessible.</div>
          <div class="field-grid">
            <div class="field"><label>Shares / stocks (market value)</label><div class="pfx-wrap"><span class="pfx sym">£</span><input type="number" class="input-field" id="f-shares" min="0" placeholder="0.00"></div></div>
            <div class="field"><label>ISAs / unit trusts</label><div class="pfx-wrap"><span class="pfx sym">£</span><input type="number" class="input-field" id="f-isas" min="0" placeholder="0.00"></div></div>
          </div>
          <div class="field-grid">
            <div class="field"><label>Business trade goods</label><div class="pfx-wrap"><span class="pfx sym">£</span><input type="number" class="input-field" id="f-inventory" min="0" placeholder="0.00"></div></div>
            <div class="field"><label>Pension (accessible only)</label><div class="pfx-wrap"><span class="pfx sym">£</span><input type="number" class="input-field" id="f-pension" min="0" placeholder="0.00"></div><div class="hint">Include only if currently withdrawable</div></div>
          </div>`)}

        ${accCard('debts','➖','ic-coral','Debts & Liabilities','Deducted from your zakatable total',false,`
          <div class="ref-box"><strong>Al-Nawawi (Shafi'i) · Al-Kasani (Hanafi)</strong>Immediate debts due within the year reduce zakatable wealth. For mortgages: deduct only the current year's instalment.</div>
          <div class="field-grid">
            <div class="field"><label>Loans owed (due this year)</label><div class="pfx-wrap"><span class="pfx sym">£</span><input type="number" class="input-field" id="f-loansDue" min="0" placeholder="0.00"></div></div>
            <div class="field"><label>Credit card balances</label><div class="pfx-wrap"><span class="pfx sym">£</span><input type="number" class="input-field" id="f-creditCards" min="0" placeholder="0.00"></div></div>
          </div>
          <div class="field-grid">
            <div class="field"><label>Overdue rent / bills</label><div class="pfx-wrap"><span class="pfx sym">£</span><input type="number" class="input-field" id="f-bills" min="0" placeholder="0.00"></div></div>
            <div class="field"><label>Other immediate debts</label><div class="pfx-wrap"><span class="pfx sym">£</span><input type="number" class="input-field" id="f-otherDebts" min="0" placeholder="0.00"></div></div>
          </div>`)}

      </div><!-- #calc-main -->

      <!-- SIDEBAR -->
      <div class="calc-sidebar">
        <div class="results-card">
          <div class="rc-header">
            <span class="rc-title">Your Zakat</span>
            <span class="rc-rate">2.5% · 1/40th</span>
          </div>
          <div class="rc-body">
            <div class="hawl-warn">⚠ <strong>Hawl:</strong> Zakat is only due after your wealth has exceeded Nisab for one complete lunar year (~354 days).</div>
            <div class="result-box result-none" id="result-box">
              <div class="rb-label" id="result-label">Enter your assets to begin</div>
              <div class="rb-empty" id="result-amount">—</div>
            </div>
            <div class="progress-bar" style="margin:10px 0 3px"><div class="progress-fill" id="prog-fill" style="width:0%"></div></div>
            <div style="display:flex;justify-content:space-between;font-size:10.5px;color:#bbb;margin-bottom:12px">
              <span id="prog-l"></span><span id="prog-m"></span><span id="prog-r"></span>
            </div>
            <div id="breakdown"></div>
          </div>
        </div>
      </div>
    </div><!-- .calc-layout -->
  </div><!-- calculator section -->

  <div class="divider-kufic" style="max-width:860px; margin-left:auto; margin-right:auto" aria-hidden="true"><div class="divider-kufic-icon"></div></div>

  <!-- Educational content below calc -->
  <div style="max-width:860px">
    <span class="eyebrow">Scholarship</span>
    <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem)">Who receives Zakat?</h2>
    <p class="prose" style="margin-bottom:1.5rem">The Qur'an (9:60) identifies eight specific categories of Zakat recipients. Zakat cannot be spent on general charity that doesn't fall within these groups.</p>
    <div class="card-grid" style="grid-template-columns:repeat(auto-fill,minmax(180px,1fr));margin-bottom:2rem">
      ${[['1. Al-Fuqara','The poor — little/no income'],['2. Al-Masakin','The needy — insufficient income'],['3. Al-Amilin','Zakat administrators'],['4. Al-Mu\'allafah','Hearts to be reconciled'],['5. Ar-Riqab','Freeing of captives'],['6. Al-Gharimin','Overwhelmed by debt'],['7. Fi Sabilillah','In the cause of Allah'],['8. Ibn Al-Sabil','Stranded traveller']].map(([t,d])=>
        `<div class="card"><h4 style="font-family:var(--serif);font-size:.9rem;font-weight:600;margin-bottom:.3rem">${t}</h4><p style="font-size:12.5px;color:var(--muted)">${d}</p></div>`).join('')}
    </div>

    <div class="faq-list" id="faq-zakat">
      ${[
        ['What is the Nisab?','Nisab is the minimum wealth threshold for Zakat to be obligatory. It is set at 85g of 24ct gold (majority position) or 595g of silver (some Hanafi scholars). If your net zakatable wealth stays above Nisab for one lunar year (hawl), Zakat becomes due.'],
        ['Is Zakat due on gold jewellery?','Debated. Hanafi: regularly worn women\'s personal ornaments are exempt. Shafi\'i, Hanbali, Maliki: all gold and silver are zakatable. The cautious approach is to include all gold. Our calculator notes this in the gold section.'],
        ['Can I deduct my mortgage?','Most scholars allow deducting only the portion currently due (current year\'s instalment), not the full outstanding balance. Credit cards and short-term debts that are currently owed are deductible in full.'],
        ['What is the hawl?','The hawl is the completion of one full Islamic lunar year (~354 days). Zakat becomes due only when your net zakatable wealth has remained above Nisab continuously for this period. If it dips below, the hawl resets.'],
      ].map(([q,a])=>`
        <div class="faq-item">
          <button class="faq-q">${q} <span class="faq-chev">+</span></button>
          <div class="faq-a">${a}</div>
        </div>`).join('')}
    </div>
  </div>

  <div class="cta-strip" style="margin-top:2.5rem;max-width:860px">
    ${geoPattern()}
    <h2>Continue to the fourth pillar</h2>
    <p>Sawm — fasting during the blessed month of Ramadan.</p>
    <button class="btn btn-white btn-lg" data-route="#/fasting">Explore Fasting →</button>
  </div>

</div>
  `;
}

function accCard(id, icon, iconClass, name, sub, open, body) {
  return `
  <div class="acc-card" id="acc-${id}">
    <div class="acc-header" onclick="this.nextElementSibling.classList.toggle('open');this.querySelector('.acc-chev').classList.toggle('open')">
      <div style="display:flex;align-items:center;gap:10px">
        <div class="acc-icon ${iconClass}">${icon}</div>
        <div><div class="acc-name">${name}</div><div class="acc-sub">${sub}</div></div>
      </div>
      <div style="display:flex;align-items:center;gap:8px">
        <span class="acc-total" id="tot-${id}"></span>
        <span class="acc-chev ${open?'open':''}">▼</span>
      </div>
    </div>
    <div class="acc-body ${open?'open':''}">${body}</div>
  </div>`;
}

function initCalculator() {
  refreshPrices();

  // Currency buttons
  document.querySelectorAll('.cur-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.setCurrency(btn.dataset.cur, btn.dataset.sym);
      document.querySelectorAll('.cur-btn').forEach(b => b.classList.toggle('active', b === btn));
      document.querySelectorAll('.pfx.sym').forEach(el => el.textContent = btn.dataset.sym);
      refreshPrices();
      recalc();
    });
  });

  // Nisab buttons
  document.querySelectorAll('.nisab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.setNisabMethod(btn.dataset.nisab);
      document.querySelectorAll('.nisab-btn').forEach(b => b.classList.toggle('active', b === btn));
      refreshPrices();
      recalc();
    });
  });

  // Input listeners
  document.querySelectorAll('#calc-main input, #calc-main select').forEach(el => {
    el.addEventListener('input', recalc);
  });

  recalc();
}

function refreshPrices() {
  const g = state.goldLocal, s = state.silverLocal, sym = state.sym;
  const live = state.pricesLive;
  const badgeClass = live ? 'badge-green badge-live' : 'badge-gold';
  const badgeText  = live ? 'live' : 'reference';

  const setPriceEl = (id, val, badgeId) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = `${sym}${val.toFixed(2)}<span class="mt-unit"> /gram</span>`;
    const badge = document.getElementById(badgeId);
    if (badge) { badge.className = `badge ${badgeClass}`; badge.textContent = badgeText; }
  };
  setPriceEl('mt-gold', g, 'mt-gold-badge');
  setPriceEl('mt-silver', s, 'mt-silver-badge');

  const el = document.getElementById('gold-price-disp');
  if (el) el.textContent = `${sym}${g.toFixed(2)}/g`;
  const pb = document.getElementById('price-badge');
  if (pb) { pb.className = `badge ${badgeClass}`; pb.textContent = badgeText; }

  updateNisabDisplay();
  recalc();
}

function updateNisabDisplay() {
  const v = state.nisabValue, sym = state.sym, g = state.goldLocal, s = state.silverLocal;
  const el = document.getElementById('nisab-display');
  const me = document.getElementById('nisab-meta');
  if (el) el.textContent = state.fmt(v);
  if (me) me.textContent = state.nisabMethod === 'gold' ? `85g × ${sym}${g.toFixed(2)}/g` : `595g × ${sym}${s.toFixed(2)}/g`;
}

function gv(id) { return parseFloat(document.getElementById(id)?.value) || 0; }

function recalc() {
  const sym = state.sym;
  const g = state.goldLocal, s = state.silverLocal;
  const purity = parseFloat(document.getElementById('f-goldPurity')?.value) || 0.9167;

  const cash    = gv('f-cashHome') + gv('f-cashCurrent') + gv('f-cashSavings') + gv('f-cashForeign');
  const owed    = gv('f-loansGiven') + gv('f-unpaidIncome') + gv('f-otherOwed');
  const metals  = gv('f-goldGrams') * g * purity + gv('f-silverGrams') * s + gv('f-metalsDirect');
  const invest  = gv('f-shares') + gv('f-isas') + gv('f-inventory') + gv('f-pension');
  const debts   = gv('f-loansDue') + gv('f-creditCards') + gv('f-bills') + gv('f-otherDebts');
  const gross   = cash + owed + metals + invest;
  const net     = Math.max(0, gross - debts);
  const nisab   = state.nisabValue;
  const due     = net >= nisab ? net * .025 : 0;
  const obl     = net >= nisab;

  // Section totals
  [['cash',cash],['owed',owed],['metals',metals],['invest',invest],['debts',debts]].forEach(([id,v]) => {
    const el = document.getElementById(`tot-${id}`);
    if (el) el.textContent = v > 0 ? state.fmt(v) : '';
  });

  // Result box
  const rb = document.getElementById('result-box');
  if (rb) rb.className = `result-box ${obl ? 'result-due' : 'result-none'}`;
  const rl = document.getElementById('result-label');
  if (rl) rl.textContent = obl ? 'Zakat is due — 2.5% of net zakatable wealth:' : net > 0 ? 'Below Nisab — no obligation this year' : 'Enter your assets to begin';
  const ra = document.getElementById('result-amount');
  if (ra) {
    if (obl) { ra.className = 'rb-amount'; ra.textContent = state.fmt(due); }
    else { ra.className = 'rb-empty'; ra.textContent = net > 0 ? 'Below threshold' : '—'; }
  }

  // Progress bar
  const pct = nisab > 0 ? Math.min(100, (net / nisab) * 100) : 0;
  const pf = document.getElementById('prog-fill');
  if (pf) pf.style.width = pct.toFixed(1) + '%';
  const setL = (id,v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  setL('prog-l', state.fmt(0));
  setL('prog-m', state.fmt(nisab / 2));
  setL('prog-r', state.fmt(nisab) + ' (Nisab)');

  // Breakdown
  const bd = document.getElementById('breakdown');
  if (!bd) return;
  const rows = [
    ['Cash & savings', cash, false, false, false],
    ['Money owed', owed, false, false, false],
    ['Gold & silver', metals, false, false, false],
    ['Investments', invest, false, false, false],
    ['Gross zakatable', gross, false, true, false],
    ['Less: debts', debts, true, true, false],
    ['Net zakatable', net, false, true, false],
    ['Zakat due (2.5%)', due, false, true, true],
  ];
  bd.innerHTML = rows.map(([l,v,d,b,h]) => {
    const cls = `brow${b?' bt':''}${d?' bd':''}${h?' bh':''}`;
    return `<div class="${cls}"><span class="bl">${l}</span><span class="bv">${v>0?(d?'−':'')+state.fmt(v):'—'}</span></div>`;
  }).join('');
}

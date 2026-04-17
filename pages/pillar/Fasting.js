// pages/pillar/Fasting.js
import { geoPattern, initFaqs } from '../../js/app.js';
import { toHijri, daysToRamadan, isRamadan, HIJRI_MONTHS } from '../../js/utils/hijri.js';
import { calcPrayerTimes, getTimezoneOffset } from '../../js/utils/prayer.js';
import { state } from '../../js/state.js';

export function render(outlet) {
  outlet.innerHTML = buildHTML();
  initFaqs(document.getElementById('faq-fasting'));
  initTracker();
  return () => clearInterval(window._fastTimer);
}

function buildHTML() {
  const hijri     = toHijri();
  const inRamadan = isRamadan();
  const daysLeft  = Math.round(daysToRamadan());

  return `
<div class="page-header pillar-header-fasting" style="position:relative">
  <div class="ornament-hanging left" aria-hidden="true" style="opacity:0.3"></div>
  <div class="ornament-hanging right" aria-hidden="true" style="opacity:0.3"></div>
  ${geoPattern()}
  <div class="page-header-inner">
    <div class="pillar-num-badge" style="background:var(--fasting-light);color:var(--fasting-color)">Pillar 4 of 5 &nbsp;·&nbsp; الصوم</div>
    <h1>Sawm — Fasting</h1>
    <p>The fourth pillar — fasting during the month of Ramadan from dawn to sunset, abstaining from food, drink, and sexual relations as an act of worship and purification.</p>
  </div>
</div>

<div class="content-narrow">

  <div class="quran-block frame-calligraphy">
    <div class="corner-ornament top-left" aria-hidden="true"></div>
    <div class="corner-ornament top-right" aria-hidden="true"></div>
    <div class="corner-ornament bottom-left" aria-hidden="true"></div>
    <div class="corner-ornament bottom-right" aria-hidden="true"></div>
    <div class="quran-arabic">يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ</div>
    <div class="quran-ref">Qur'an 2:183</div>
    <div class="quran-trans">"O you who have believed, decreed upon you is fasting as it was decreed upon those before you so that you may become righteous (muttaqin)."</div>
  </div>

  <!-- ── RAMADAN STATUS / TRACKER ──────────────────────────── -->
  <div style="margin-top:2.5rem">
    <span class="eyebrow">Ramadan ${hijri.year} AH</span>
    <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:.75rem">
      ${inRamadan ? 'رمضان مبارك — Ramadan Mubarak!' : `${daysLeft} days until Ramadan`}
    </h2>

    <div class="card" style="background:var(--ink);color:#fff;margin-bottom:1.5rem;position:relative;overflow:hidden">
      ${geoPattern()}
      <div style="position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr 1fr;gap:1.5rem;flex-wrap:wrap">
        <div style="text-align:center">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.6px;color:rgba(255,255,255,.5);margin-bottom:6px">Current Hijri date</div>
          <div style="font-family:var(--serif);font-size:1.4rem;font-weight:600;color:#fff">${hijri.day} ${hijri.monthName}</div>
          <div style="font-size:13px;color:rgba(255,255,255,.5)">${hijri.year} AH</div>
        </div>
        <div style="text-align:center">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.6px;color:rgba(255,255,255,.5);margin-bottom:6px">${inRamadan ? 'Ramadan day' : 'Months remaining'}</div>
          <div style="font-family:var(--serif);font-size:2rem;font-weight:600;color:${inRamadan ? '#8BC4A8' : 'var(--gold)'}">
            ${inRamadan ? hijri.day : Math.max(0, 9 - hijri.month)}
          </div>
          <div style="font-size:13px;color:rgba(255,255,255,.5)">${inRamadan ? 'of 29–30 days' : 'until Ramaḍān'}</div>
        </div>
        <div style="text-align:center">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.6px;color:rgba(255,255,255,.5);margin-bottom:6px">Status</div>
          <div style="font-size:1.5rem">${inRamadan ? '🌙' : '⭐'}</div>
          <div style="font-size:13px;color:rgba(255,255,255,.5)">${inRamadan ? 'Ramadan is here' : 'Sha\'ban / waiting'}</div>
        </div>
      </div>
    </div>

    <!-- Suhoor / Iftar times -->
    <div class="card" style="margin-bottom:1.5rem">
      <h3 style="font-family:var(--serif);font-size:1rem;font-weight:600;margin-bottom:12px">Suhoor &amp; Iftar times today</h3>
      <p style="font-size:13.5px;color:var(--muted);margin-bottom:14px">Enter your coordinates to calculate today's Suhoor (before Fajr) and Iftar (at Maghrib) times.</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end">
        <div class="field" style="flex:1;min-width:130px"><label>Latitude</label><input type="number" class="input-field" id="f-lat" placeholder="51.5074" step="0.0001"></div>
        <div class="field" style="flex:1;min-width:130px"><label>Longitude</label><input type="number" class="input-field" id="f-lng" placeholder="-0.1278" step="0.0001"></div>
        <button class="btn btn-primary" id="f-calc">Calculate</button>
        <button class="btn btn-secondary" id="f-locate">📍 My location</button>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-top:1rem">
        <div style="background:var(--cream-dark);border-radius:var(--radius);padding:1rem;text-align:center">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);margin-bottom:6px">🌅 Suhoor ends (Fajr)</div>
          <div style="font-family:var(--serif);font-size:1.8rem;font-weight:600;color:var(--green)" id="suhoor-time">—:—</div>
          <div style="font-size:12px;color:var(--muted)">Last moment to eat</div>
        </div>
        <div style="background:var(--gold-light);border:1px solid #E0C87A;border-radius:var(--radius);padding:1rem;text-align:center">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:#7A5A10;margin-bottom:6px">🌇 Iftar (Maghrib)</div>
          <div style="font-family:var(--serif);font-size:1.8rem;font-weight:600;color:var(--gold)" id="iftar-time">—:—</div>
          <div style="font-size:12px;color:#7A5A10">Time to break fast</div>
        </div>
      </div>
      <div id="fast-status" style="margin-top:10px;font-size:13px;color:var(--muted)"></div>

      <!-- Fasting progress bar -->
      <div style="margin-top:14px;display:none" id="fast-progress-wrap">
        <div style="display:flex;justify-content:space-between;font-size:11.5px;color:var(--muted);margin-bottom:5px">
          <span>Fasting in progress</span>
          <span id="fast-pct">0%</span>
        </div>
        <div class="progress-bar"><div class="progress-fill" id="fast-fill" style="width:0%;background:var(--gold)"></div></div>
      </div>
    </div>
  </div>

  <div class="divider-kufic" aria-hidden="true"><div class="divider-kufic-icon"></div></div>

  <!-- Educational -->
  <span class="eyebrow">What is Sawm?</span>
  <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem)">The obligation of fasting</h2>
  <div class="prose">
    <p>Sawm (صَوْم, fasting) in Islamic law refers specifically to the obligatory fast of the month of Ramadan — the ninth month of the Islamic lunar calendar. It is one of the five pillars and is obligatory on every adult Muslim who is sane, healthy, resident (not travelling), and not experiencing menstruation or post-natal bleeding.</p>
    <p>The fast begins at the break of true dawn (Fajr) and ends at sunset (Maghrib). During this time, one must completely abstain from food, drink (including water), smoking, and sexual relations. It is also highly important to guard one's tongue, eyes, and behaviour — the Prophet ﷺ warned that a person who does not abandon false speech while fasting has no need to abandon food and drink (Sahih Bukhari 1903).</p>
  </div>

  <div class="hadith-block" style="margin-top:1.5rem">
    <div class="hadith-source">Sahih Bukhari 1904 · Sahih Muslim 1151</div>
    <div class="hadith-text">"Every deed of the son of Adam is for him except fasting — it is for Me and I shall reward it. Fasting is a shield." — Allah says (in a Qudsi hadith narrated by Abu Hurayrah RA)</div>
  </div>

  <div class="divider-kufic" aria-hidden="true"><div class="divider-kufic-icon"></div></div>

  <!-- Conditions and types -->
  <span class="eyebrow">Rulings</span>
  <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:1rem">Who must fast &amp; valid excuses</h2>

  <div class="card-grid card-grid-2">
    <div class="card card-green" style="border-color:#B0D8C4">
      <h3 style="font-family:var(--serif);font-size:1rem;font-weight:600;margin-bottom:.75rem;color:var(--green)">✓ Must fast</h3>
      ${['Muslim adult (baligh)', 'Sane (aqil)', 'Physically able (healthy)', 'Resident (not travelling)','Not menstruating or in nifas'].map(c=>`<div style="font-size:13.5px;color:var(--muted);padding:4px 0;border-bottom:1px solid #e5f5ee">· ${c}</div>`).join('')}
    </div>
    <div class="card card-warn" style="border-color:#F0B0A8">
      <h3 style="font-family:var(--serif);font-size:1rem;font-weight:600;margin-bottom:.75rem;color:var(--red)">✗ Valid excuses (make up later)</h3>
      ${['Illness — where fasting causes harm','Travel — at the distance of qasr','Pregnancy/breastfeeding (if harmful)','Menstruation / post-natal bleeding','Old age or chronic illness (fidya instead)'].map(c=>`<div style="font-size:13.5px;color:var(--muted);padding:4px 0;border-bottom:1px solid #fde9e7">· ${c}</div>`).join('')}
    </div>
  </div>

  <div style="margin-top:1.5rem">
    <h3 style="font-family:var(--serif);font-size:1.1rem;font-weight:600;margin-bottom:1rem">Invalidators of the fast (Muftirat)</h3>
    <div class="card-grid" style="grid-template-columns:repeat(auto-fill,minmax(220px,1fr))">
      ${[
        ['Eating or drinking','Anything consumed intentionally by mouth, nose, or throat during fasting hours'],
        ['Sexual intercourse','Requires both make-up (qada) and expiation (kaffarah) — freeing a slave, fasting 60 consecutive days, or feeding 60 poor people'],
        ['Deliberate vomiting','If one deliberately induces vomiting, the fast is broken'],
        ['Menstruation / Nifas','The fast is broken and must be made up — no kaffarah required'],
        ['Intention at night','Forgetting to make the intention (niyyah) for Ramadan fasting invalidates it per majority scholars'],
      ].map(([t,d])=>`
        <div class="card"><h4 style="font-family:var(--serif);font-size:.9rem;font-weight:600;margin-bottom:.35rem">${t}</h4><p style="font-size:12.5px;color:var(--muted);line-height:1.55">${d}</p></div>`).join('')}
    </div>
  </div>

  <div class="divider-kufic" aria-hidden="true"><div class="divider-kufic-icon"></div></div>

  <!-- Virtues of Ramadan -->
  <span class="eyebrow">Virtues of Ramadan</span>
  <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:1rem">The blessed month</h2>

  <div class="quran-block frame-calligraphy">
    <div class="corner-ornament top-left" aria-hidden="true"></div>
    <div class="corner-ornament top-right" aria-hidden="true"></div>
    <div class="corner-ornament bottom-left" aria-hidden="true"></div>
    <div class="corner-ornament bottom-right" aria-hidden="true"></div>
    <div class="quran-arabic">شَهْرُ رَمَضَانَ الَّذِي أُنزِلَ فِيهِ الْقُرْآنُ هُدًى لِّلنَّاسِ</div>
    <div class="quran-ref">Qur'an 2:185</div>
    <div class="quran-trans">"The month of Ramadan in which was revealed the Qur'an, a guidance for the people and clear proofs of guidance and criterion." — The Qur'an was first revealed in Ramadan, making it the most sacred month.</div>
  </div>

  <div class="timeline" style="margin-top:1.5rem">
    <div class="tl-item"><div class="tl-marker">🌙</div><div class="tl-content"><h4>Revelation of the Qur'an</h4><p>The Qur'an was first revealed to the Prophet ﷺ on Laylat al-Qadr (the Night of Power) during Ramadan — described as "better than a thousand months" (97:3).</p></div></div>
    <div class="tl-item"><div class="tl-marker">🔒</div><div class="tl-content"><h4>Shayateen are chained</h4><p>The Prophet ﷺ said: "When Ramadan begins, the gates of Paradise are opened, the gates of Hell are closed, and the devils are chained." (Sahih Bukhari 1899)</p></div></div>
    <div class="tl-item"><div class="tl-marker">🌟</div><div class="tl-content"><h4>Laylat al-Qadr</h4><p>The Night of Power, hidden in the last ten nights of Ramadan (most likely on an odd-numbered night), is better in reward than a thousand months of worship (Qur'an 97:3).</p></div></div>
    <div class="tl-item"><div class="tl-marker">🤲</div><div class="tl-content"><h4>Itikaf (Seclusion)</h4><p>The Prophet ﷺ used to spend the last ten days of Ramadan in the mosque in seclusion (itikaf), seeking Laylat al-Qadr through prayer and remembrance.</p></div></div>
  </div>

  <div class="divider-kufic" aria-hidden="true"><div class="divider-kufic-icon"></div></div>

  <div class="faq-list" id="faq-fasting">
    ${[
      ['Does using a miswak (toothbrush) break the fast?','No — using a miswak or dry toothbrush does not break the fast. Toothpaste should be avoided as it could be swallowed. Using mouthwash is makruh (disliked) according to many scholars as it risks swallowing.'],
      ['Do eye drops or injections break the fast?','Eye drops do not break the fast per the majority of scholars. Injections (IV, intramuscular) that are not nutritional do not break the fast. A nutritional IV drip does break the fast.'],
      ['What is fidya?','Fidya is a compensation for those who permanently cannot fast (the elderly, chronically ill) — feeding one poor person per missed day. It is not an option for those who are able to make up fasts.'],
      ['What is kaffarah?','Kaffarah is the severe expiation required for deliberately breaking the fast of Ramadan by sexual intercourse. The options in order: free a slave, fast 60 consecutive days, or feed 60 poor people. All schools require it; Hanafi also requires it for deliberate eating/drinking.'],
      ['Are voluntary (nafl) fasts rewarded?','Yes — Monday and Thursday fasts were practiced regularly by the Prophet ﷺ. The fast of Arafah (9th Dhul Hijjah) expiates two years of sins. The six days of Shawwal after Ramadan give the reward of fasting the entire year.'],
    ].map(([q,a])=>`
      <div class="faq-item">
        <button class="faq-q">${q} <span class="faq-chev">+</span></button>
        <div class="faq-a">${a}</div>
      </div>`).join('')}
  </div>

  <div class="cta-strip" style="margin-top:2.5rem">
    ${geoPattern()}
    <h2>Continue to the fifth pillar</h2>
    <p>Hajj — the pilgrimage to the sacred city of Makkah, obligatory once in a lifetime for those who are able.</p>
    <button class="btn btn-white btn-lg" data-route="#/hajj">Explore Hajj →</button>
  </div>

</div>`;
}

function initTracker() {
  const latEl   = document.getElementById('f-lat');
  const lngEl   = document.getElementById('f-lng');
  const calcBtn = document.getElementById('f-calc');
  const locBtn  = document.getElementById('f-locate');

  if (state.location) { latEl.value = state.location.lat; lngEl.value = state.location.lng; calculate(); }

  calcBtn.addEventListener('click', calculate);
  locBtn.addEventListener('click', async () => {
    const { requestLocation } = await import('../../js/state.js');
    try {
      const loc = await requestLocation();
      latEl.value = loc.lat.toFixed(4);
      lngEl.value = loc.lng.toFixed(4);
      calculate();
    } catch(e) {}
  });

  function calculate() {
    const lat = parseFloat(latEl.value), lng = parseFloat(lngEl.value);
    if (isNaN(lat) || isNaN(lng)) return;
    const tz    = getTimezoneOffset();
    const times = calcPrayerTimes(lat, lng, new Date(), tz, 'MWL');
    document.getElementById('suhoor-time').textContent = times.fajr;
    document.getElementById('iftar-time').textContent  = times.maghrib;

    // Progress
    const t2m = t => parseInt(t.split(':')[0])*60 + parseInt(t.split(':')[1]);
    const now = new Date().getHours()*60 + new Date().getMinutes();
    const fajrM = t2m(times.fajr), magM = t2m(times.maghrib);
    const progressWrap = document.getElementById('fast-progress-wrap');

    clearInterval(window._fastTimer);
    const update = () => {
      const cur = new Date().getHours()*60 + new Date().getMinutes();
      if (cur >= fajrM && cur < magM) {
        progressWrap.style.display = '';
        const pct = Math.round(((cur - fajrM) / (magM - fajrM)) * 100);
        const remaining = magM - cur;
        document.getElementById('fast-fill').style.width = pct + '%';
        document.getElementById('fast-pct').textContent = pct + '%';
        const h = Math.floor(remaining/60), m = remaining%60;
        document.getElementById('fast-status').textContent = `⏱ ${h}h ${m}m until Iftar`;
      } else if (cur >= magM) {
        progressWrap.style.display = '';
        document.getElementById('fast-fill').style.width = '100%';
        document.getElementById('fast-pct').textContent = '100%';
        document.getElementById('fast-status').textContent = '🌙 Iftar time — Ramadan Mubarak!';
      } else {
        progressWrap.style.display = 'none';
        const remaining = fajrM - cur;
        const h = Math.floor(remaining/60), m = remaining%60;
        document.getElementById('fast-status').textContent = `🌅 Suhoor in ${h}h ${m}m`;
      }
    };
    update();
    window._fastTimer = setInterval(update, 60000);
  }
}

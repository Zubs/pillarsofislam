// pages/pillar/Prayer.js
import { geoPattern, initFaqs } from '../../js/app.js';
import { state, requestLocation } from '../../js/state.js';
import { calcPrayerTimes, getCurrentPrayer, getNextPrayer, getTimezoneOffset, PRAYER_LABELS } from '../../js/utils/prayer.js';
import { calcQibla, bearingToLabel, distanceToMakkah } from '../../js/utils/qibla.js';
import { toHijri } from '../../js/utils/hijri.js';

export function render(outlet) {
  outlet.innerHTML = buildHTML();
  initFaqs(document.getElementById('faq-prayer'));
  initPrayerTool();
  return () => clearInterval(window._prayerTimer);
}

function buildHTML() {
  return `
<div class="page-header pillar-header-prayer">
  ${geoPattern()}
  <div class="page-header-inner">
    <div class="pillar-num-badge" style="background:var(--prayer-light);color:var(--prayer-color)">Pillar 2 of 5 &nbsp;·&nbsp; الصلاة</div>
    <h1>Salah — The Five Daily Prayers</h1>
    <p>The second pillar and the most repeated act of worship in Islam — five prayers daily, at prescribed times, facing the Ka'bah in Makkah.</p>
  </div>
</div>

<div class="content-narrow">

  <div class="quran-block">
    ${geoPattern()}
    <div class="quran-arabic">إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا</div>
    <div class="quran-ref">Qur'an 4:103</div>
    <div class="quran-trans">"Indeed, prayer has been decreed upon the believers a decree of specified times." — Prayer is not optional or approximate; it has specific times divinely ordained.</div>
  </div>

  <!-- ── PRAYER TIMES TOOL ───────────────────────────────────── -->
  <div style="margin-top:2.5rem">
    <span class="eyebrow">Prayer Times Tool</span>
    <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:.75rem">Today's prayer times</h2>
    <p class="prose" style="margin-bottom:1.5rem">Enter your location to get accurate prayer times calculated using your coordinates.</p>

    <!-- Location bar -->
    <div class="card" style="margin-bottom:1rem">
      <div style="display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap">
        <div class="field" style="flex:1;min-width:160px">
          <label>Latitude</label>
          <input type="number" class="input-field" id="pt-lat" placeholder="51.5074" step="0.0001">
        </div>
        <div class="field" style="flex:1;min-width:160px">
          <label>Longitude</label>
          <input type="number" class="input-field" id="pt-lng" placeholder="-0.1278" step="0.0001">
        </div>
        <div class="field" style="min-width:150px">
          <label>Method</label>
          <select class="select-field" id="pt-method">
            <option value="MWL">Muslim World League</option>
            <option value="ISNA">ISNA (N. America)</option>
            <option value="Egypt">Egyptian Authority</option>
            <option value="Makkah">Umm Al-Qura</option>
            <option value="Karachi">Karachi University</option>
          </select>
        </div>
        <button class="btn btn-secondary" id="pt-locate">📍 Use my location</button>
        <button class="btn btn-primary" id="pt-calc">Calculate</button>
      </div>
      <div id="pt-location-status" style="margin-top:8px;font-size:13px;color:var(--muted)"></div>
    </div>

    <!-- Next prayer countdown -->
    <div class="card card-green" style="border-color:#B0D8C4;margin-bottom:1rem;display:none" id="next-prayer-banner">
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
        <div>
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.6px;color:var(--green);margin-bottom:3px">Next Prayer</div>
          <div style="font-family:var(--serif);font-size:1.4rem;font-weight:600" id="next-prayer-name">—</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:11px;font-weight:600;color:var(--green);margin-bottom:3px">Time remaining</div>
          <div style="font-family:var(--serif);font-size:1.8rem;font-weight:600;color:var(--green)" id="next-prayer-countdown">—</div>
        </div>
      </div>
    </div>

    <!-- Prayer time cards -->
    <div class="prayer-grid" id="prayer-grid">
      ${['fajr','sunrise','dhuhr','asr','maghrib','isha'].map(p => `
        <div class="prayer-card" id="pc-${p}">
          <div class="prayer-name">${PRAYER_LABELS[p]}</div>
          <div class="prayer-time" id="pt-${p}">—:—</div>
          <div class="prayer-sub" id="ps-${p}">${p === 'sunrise' ? 'Not a prayer' : ''}</div>
        </div>`).join('')}
    </div>
  </div>

  <!-- ── QIBLA FINDER ────────────────────────────────────────── -->
  <div class="divider"></div>
  <span class="eyebrow">Qibla Finder</span>
  <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:.75rem">Direction of the Ka'bah</h2>
  <p class="prose" style="margin-bottom:1.5rem">The Qibla (قِبْلَة) is the direction of the Masjid al-Haram in Makkah, towards which all Muslims face when praying. Use the same coordinates entered above.</p>

  <div class="card" style="display:flex;gap:2rem;align-items:center;flex-wrap:wrap">
    <div class="qibla-wrap">
      <div class="compass-ring" id="compass">
        <span class="compass-n">N</span>
        <span class="compass-s">S</span>
        <span class="compass-e">E</span>
        <span class="compass-w">W</span>
        <div class="compass-needle" id="qibla-needle"></div>
        <div class="compass-kaaba">🕋</div>
      </div>
    </div>
    <div style="flex:1;min-width:200px">
      <div style="margin-bottom:16px">
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);margin-bottom:4px">Qibla bearing</div>
        <div style="font-family:var(--serif);font-size:2.2rem;font-weight:600;color:var(--green)" id="qibla-bearing">—°</div>
        <div style="font-size:14px;color:var(--muted)" id="qibla-dir">Enter coordinates above</div>
      </div>
      <div>
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);margin-bottom:4px">Distance to Makkah</div>
        <div style="font-family:var(--serif);font-size:1.4rem;font-weight:600" id="qibla-dist">—</div>
      </div>
    </div>
  </div>

  <div class="divider"></div>

  <!-- Educational -->
  <span class="eyebrow">Understanding Salah</span>
  <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem)">The five daily prayers</h2>

  <div class="card-grid" style="grid-template-columns:repeat(auto-fill,minmax(180px,1fr));margin-bottom:1.5rem">
    ${[
      ['Fajr', 'الفجر', 'Dawn', '2 rak\'ahs', 'Before sunrise to sunrise'],
      ['Dhuhr', 'الظهر', 'Midday', '4 rak\'ahs', 'After sun passes zenith'],
      ['Asr', 'العصر', 'Afternoon', '4 rak\'ahs', 'Mid-afternoon to sunset'],
      ['Maghrib', 'المغرب', 'Sunset', '3 rak\'ahs', 'Just after sunset'],
      ['Isha', 'العشاء', 'Night', '4 rak\'ahs', 'After twilight ends'],
    ].map(([en, ar, meaning, rakahs, time]) => `
      <div class="card" style="text-align:center">
        <div style="font-family:var(--serif);font-size:1.3rem;direction:rtl;color:var(--green);margin-bottom:4px">${ar}</div>
        <div style="font-family:var(--serif);font-size:.95rem;font-weight:600;margin-bottom:2px">${en}</div>
        <div style="font-size:11.5px;color:var(--muted);margin-bottom:6px">${meaning} · ${rakahs}</div>
        <div style="font-size:11px;background:var(--green-light);color:var(--green);padding:2px 8px;border-radius:10px;display:inline-block">${time}</div>
      </div>`).join('')}
  </div>

  <div class="hadith-block">
    <div class="hadith-source">Sahih Bukhari 8 · Sahih Muslim 16</div>
    <div class="hadith-text">"Islam is built on five [pillars]: testifying that there is no god but Allah and that Muhammad is the Messenger of Allah, establishing the prayer, paying the Zakat, making the pilgrimage to the House, and fasting in Ramadan."</div>
  </div>

  <div class="divider"></div>

  <!-- Conditions & pillars of prayer -->
  <span class="eyebrow">Conditions & Structure</span>
  <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:1rem">Prerequisites for a valid prayer</h2>
  <div class="card-grid card-grid-2">
    <div class="card">
      <h3 style="font-family:var(--serif);font-size:1rem;font-weight:600;margin-bottom:.75rem;color:var(--green)">Conditions (Shurut)</h3>
      ${['Ritual purity (Wudu or Ghusl)','Entering prayer time','Facing the Qibla','Covering the Awrah (private parts)','Intention (Niyyah) in the heart','Clean body, clothes, and place'].map(c => `<div style="font-size:13.5px;color:var(--muted);padding:4px 0;border-bottom:1px solid #f5f5f5">· ${c}</div>`).join('')}
    </div>
    <div class="card">
      <h3 style="font-family:var(--serif);font-size:1rem;font-weight:600;margin-bottom:.75rem;color:var(--green)">Pillars (Arkan)</h3>
      ${['Opening Takbir (Allahu Akbar)','Standing (Qiyam)','Reciting Surah Al-Fatiha','Bowing (Ruku)','Rising from Ruku','Prostration (Sujud) × 2','Sitting between prostrations','Final Tashahhud','Tasleem (Assalamu Alaykum)'].map(c => `<div style="font-size:13.5px;color:var(--muted);padding:4px 0;border-bottom:1px solid #f5f5f5">· ${c}</div>`).join('')}
    </div>
  </div>

  <div class="divider"></div>

  <div class="faq-list" id="faq-prayer">
    ${[
      ['What breaks Wudu?', 'Natural discharge (urine, stool, wind), deep sleep lying down, loss of consciousness, touching private parts directly (Hanafi: does not break; Shafi\'i/Hanbali: does break), bleeding profusely (Hanafi: breaks; others: does not). Sexual intercourse requires Ghusl (full bath).'],
      ['Can I pray in congregation at home?', 'Yes — congregation (jama\'ah) in the mosque is highly recommended (Sunnah mu\'akkadah) for men, especially for Fajr and Isha. Women may pray at home. The reward of congregation is 27 times that of praying alone (Sahih Bukhari 645).'],
      ['What if I miss a prayer?', 'A missed prayer (qada) must be made up as soon as remembered, in the same form as the original prayer. Deliberately missing a prayer is a major sin. The Prophet ﷺ said: "Whoever forgets a prayer, or sleeps through it, let him pray it when he remembers it." (Sahih Muslim 684)'],
      ['How is prayer time calculated?', 'Prayer times are derived from the sun\'s position relative to the observer. Fajr and Isha require the sun to be a specific number of degrees below the horizon (the angle varies by calculation method). Dhuhr is solar noon; Maghrib is sunset; Asr is based on shadow length.'],
    ].map(([q, a]) => `
      <div class="faq-item">
        <button class="faq-q">${q} <span class="faq-chev">+</span></button>
        <div class="faq-a">${a}</div>
      </div>`).join('')}
  </div>

  <div class="cta-strip" style="margin-top:2.5rem">
    ${geoPattern()}
    <h2>Continue to the third pillar</h2>
    <p>Zakat — the obligation of almsgiving, calculated on your wealth at 2.5% once the Nisab threshold is met.</p>
    <button class="btn btn-white btn-lg" data-route="#/zakat">Explore Zakat →</button>
  </div>
</div>
  `;
}

function initPrayerTool() {
  const latEl    = document.getElementById('pt-lat');
  const lngEl    = document.getElementById('pt-lng');
  const methEl   = document.getElementById('pt-method');
  const locateBtn= document.getElementById('pt-locate');
  const calcBtn  = document.getElementById('pt-calc');
  const statusEl = document.getElementById('pt-location-status');

  // Pre-fill from state
  if (state.location) { latEl.value = state.location.lat; lngEl.value = state.location.lng; calculate(); }

  locateBtn.addEventListener('click', async () => {
    statusEl.textContent = 'Requesting location…';
    try {
      const loc = await requestLocation();
      latEl.value = loc.lat.toFixed(4);
      lngEl.value = loc.lng.toFixed(4);
      statusEl.textContent = `📍 ${loc.name}`;
      calculate();
    } catch (e) {
      statusEl.textContent = state.locationError || 'Could not get location';
    }
  });

  calcBtn.addEventListener('click', calculate);

  function calculate() {
    const lat = parseFloat(latEl.value);
    const lng = parseFloat(lngEl.value);
    if (isNaN(lat) || isNaN(lng)) { statusEl.textContent = 'Please enter valid coordinates'; return; }

    const tz   = getTimezoneOffset();
    const times = calcPrayerTimes(lat, lng, new Date(), tz, methEl.value);
    const curr  = getCurrentPrayer(times);
    const next  = getNextPrayer(times);

    // Update prayer cards
    ['fajr','sunrise','dhuhr','asr','maghrib','isha'].forEach(p => {
      document.getElementById(`pt-${p}`).textContent = times[p];
      document.getElementById(`pc-${p}`).classList.toggle('current', p === curr);
    });

    // Next prayer banner
    const banner = document.getElementById('next-prayer-banner');
    banner.style.display = '';
    document.getElementById('next-prayer-name').textContent = next.label;

    // Countdown — update every second
    clearInterval(window._prayerTimer);
    function updateCountdown() {
      const h = Math.floor(next.minsRemaining / 60);
      const m = next.minsRemaining % 60;
      document.getElementById('next-prayer-countdown').textContent =
        h > 0 ? `${h}h ${m}m` : `${m} min`;
    }
    updateCountdown();
    window._prayerTimer = setInterval(updateCountdown, 60000);

    // Qibla
    const bearing = calcQibla(lat, lng);
    const dist    = distanceToMakkah(lat, lng);
    document.getElementById('qibla-bearing').textContent = `${bearing}°`;
    document.getElementById('qibla-dir').textContent = `${bearingToLabel(bearing)} from your location`;
    document.getElementById('qibla-dist').textContent = `${dist.toLocaleString()} km`;
    document.getElementById('qibla-needle').style.transform = `translateX(-50%) rotate(${bearing}deg)`;
  }
}

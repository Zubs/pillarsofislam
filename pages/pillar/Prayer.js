// pages/pillar/Prayer.js
import { geoPattern, initFaqs } from '../../js/app.js';
import { state, requestLocation } from '../../js/state.js';
import {
    calcPrayerTimes,
    getCurrentPrayer,
    getNextPrayer,
    getTimezoneOffset,
} from '../../js/utils/prayer.js';
import {
    calcQibla,
    bearingToLabel,
    distanceToMakkah
} from '../../js/utils/qibla.js';

// PRAYER_LABELS defined locally — avoids any export mismatch with prayer.js
const PRAYER_LABELS = {
    fajr: 'Fajr', sunrise: 'Sunrise', dhuhr: 'Dhuhr',
    asr: 'Asr', maghrib: 'Maghrib', isha: 'Isha',
};

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
  <div class="ornament-hanging left"  aria-hidden="true"></div>
  <div class="ornament-hanging right" aria-hidden="true"></div>
  <div class="page-header-inner">
    <div class="pillar-num-badge" style="background:var(--prayer-light);color:var(--prayer-color)">Pillar 2 of 5 &nbsp;·&nbsp; الصلاة</div>
    <h1>Salah — The Five Daily Prayers</h1>
    <p>The second pillar and the most repeated act of worship in Islam — five prayers daily, at prescribed times, facing the Ka'bah in Makkah.</p>
  </div>
</div>

<div class="content-narrow">

  <div class="quran-block frame-calligraphy anim-target">
    <div class="corner-ornament top-left"     aria-hidden="true"></div>
    <div class="corner-ornament top-right"    aria-hidden="true"></div>
    <div class="corner-ornament bottom-left"  aria-hidden="true"></div>
    <div class="corner-ornament bottom-right" aria-hidden="true"></div>
    <div class="quran-arabic">إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا</div>
    <div class="quran-ref">Qur'an 4:103</div>
    <div class="quran-trans">"Indeed, prayer has been decreed upon the believers a decree of specified times." — Prayer has specific, divinely-ordained times; it is not flexible or approximate.</div>
  </div>

  <!-- ── PRAYER TIMES TOOL ───────────────────────────────────── -->
  <div style="margin-top:2.5rem">
    <span class="eyebrow">Prayer Times Tool</span>
    <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:.75rem">Today's prayer times</h2>
    <p class="prose" style="margin-bottom:1.5rem">Enter your location to get accurate prayer times calculated using your coordinates and the selected method.</p>

    <!-- Location bar -->
    <div class="card" style="margin-bottom:1rem">
      <div style="display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap">
        <div class="field" style="flex:1;min-width:130px">
          <label>Latitude</label>
          <input type="number" class="input-field" id="pt-lat" placeholder="51.5074" step="0.0001">
        </div>
        <div class="field" style="flex:1;min-width:130px">
          <label>Longitude</label>
          <input type="number" class="input-field" id="pt-lng" placeholder="-0.1278" step="0.0001">
        </div>
        <div class="field" style="min-width:160px">
          <label>Calculation method</label>
          <select class="select-field" id="pt-method">
            <option value="MWL">Muslim World League</option>
            <option value="ISNA">ISNA (North America)</option>
            <option value="Egypt">Egyptian Authority</option>
            <option value="Makkah">Umm Al-Qura (Makkah)</option>
            <option value="Karachi">Karachi University</option>
          </select>
        </div>
        <button class="btn btn-secondary" id="pt-locate">📍 Use my location</button>
        <button class="btn btn-primary"   id="pt-calc">Calculate</button>
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
      ${['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'].map(p => `
        <div class="prayer-card" id="pc-${p}">
          <div class="prayer-name">${PRAYER_LABELS[p]}</div>
          <div class="prayer-time" id="pt-${p}">—:—</div>
          <div class="prayer-sub">${p === 'sunrise' ? 'Not a prayer' : ''}</div>
        </div>`).join('')}
    </div>
  </div>

  <!-- ── QIBLA FINDER ────────────────────────────────────────── -->
  <div class="divider-kufic" aria-hidden="true"><span class="divider-kufic-icon"></span></div>
  <span class="eyebrow">Qibla Finder</span>
  <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:.75rem">Direction of the Ka'bah</h2>
  <p class="prose" style="margin-bottom:1.5rem">The Qibla (قِبْلَة) is the direction of the Masjid al-Haram in Makkah, towards which all Muslims face when praying. Uses the same coordinates entered above.</p>

  <div class="card" style="display:flex;gap:2rem;align-items:center;flex-wrap:wrap">

    <!-- COMPASS — fixed pivot geometry -->
    <div class="qibla-wrap">
      <div class="compass-ring" id="compass">
        <span class="compass-n" aria-hidden="true">N</span>
        <span class="compass-s" aria-hidden="true">S</span>
        <span class="compass-e" aria-hidden="true">E</span>
        <span class="compass-w" aria-hidden="true">W</span>

        <!--
          Zero-size pivot placed exactly at the compass centre.
          The needle arm extends 100px UPWARD from bottom:0 of this
          zero-size element, so transform-origin:bottom center pivots
          at the ring centre — not 100px below it.
        -->
        <div id="qibla-pivot" style="
          position:absolute; top:50%; left:50%;
          width:0; height:0; overflow:visible;
        ">
          <!-- Needle (green tip, points toward Qibla) -->
          <div id="qibla-needle-arm" style="
            position:absolute;
            bottom:0; left:0;
            width:4px; height:100px;
            margin-left:-2px;
            background:linear-gradient(to top, rgba(27,92,66,.15) 0%, var(--green) 100%);
            border-radius:2px 2px 0 0;
            transform-origin:bottom center;
            transform:rotate(0deg);
            transition:transform 1s cubic-bezier(.4,0,.2,1);
          "></div>
          <!-- Tail (grey, opposite direction) -->
          <div id="qibla-tail" style="
            position:absolute;
            top:0; left:0;
            width:4px; height:40px;
            margin-left:-2px;
            background:linear-gradient(to bottom, rgba(160,160,160,.55) 0%, transparent 100%);
            border-radius:0 0 2px 2px;
            transform-origin:top center;
            transform:rotate(0deg);
            transition:transform 1s cubic-bezier(.4,0,.2,1);
          "></div>
        </div>

        <!-- Ka'bah icon — always centred, z-index above needle -->
        <div class="compass-kaaba" aria-label="Ka'bah">🕋</div>

        <!-- Centre pivot dot -->
        <div aria-hidden="true" style="
          position:absolute; top:50%; left:50%;
          width:10px; height:10px; margin:-5px 0 0 -5px;
          background:var(--green); border-radius:50%;
          border:2px solid #fff; z-index:3;
        "></div>
      </div>
    </div>

    <div style="flex:1;min-width:200px">
      <div style="margin-bottom:20px">
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);margin-bottom:5px">Qibla bearing</div>
        <div style="font-family:var(--serif);font-size:2.4rem;font-weight:600;color:var(--green);line-height:1" id="qibla-bearing">—°</div>
        <div style="font-size:14px;color:var(--muted);margin-top:4px" id="qibla-dir">Enter coordinates above and press Calculate</div>
      </div>
      <div style="margin-bottom:20px">
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);margin-bottom:5px">Distance to Makkah</div>
        <div style="font-family:var(--serif);font-size:1.5rem;font-weight:600;line-height:1" id="qibla-dist">—</div>
      </div>
      <div style="background:var(--green-light);border:1px solid #B0D8C4;border-radius:var(--radius-sm);padding:10px 12px;font-size:12.5px;color:var(--green);line-height:1.5">
        💡 Face the bearing shown above. The green end of the needle points toward Makkah — align your body to face it.
      </div>
    </div>
  </div>

  <div class="divider-kufic" aria-hidden="true"><span class="divider-kufic-icon"></span></div>

  <!-- Educational -->
  <span class="eyebrow">Understanding Salah</span>
  <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem)">The five daily prayers</h2>

  <div class="card-grid anim-target" style="grid-template-columns:repeat(auto-fill,minmax(160px,1fr));margin-bottom:1.5rem">
    ${[
        ['Fajr', 'الفجر', 'Dawn', "2 rak'ahs", 'Before sunrise'],
        ['Dhuhr', 'الظهر', 'Midday', "4 rak'ahs", 'After solar noon'],
        ['Asr', 'العصر', 'Afternoon', "4 rak'ahs", 'Mid-afternoon'],
        ['Maghrib', 'المغرب', 'Sunset', "3 rak'ahs", 'After sunset'],
        ['Isha', 'العشاء', 'Night', "4 rak'ahs", 'After twilight'],
    ].map(([en, ar, meaning, rakahs, time]) => `
      <div class="card" style="text-align:center">
        <div style="font-family:var(--arabic,var(--serif));font-size:1.3rem;direction:rtl;color:var(--green);margin-bottom:4px">${ar}</div>
        <div style="font-family:var(--serif);font-size:.95rem;font-weight:600;margin-bottom:2px">${en}</div>
        <div style="font-size:11.5px;color:var(--muted);margin-bottom:6px">${meaning} · ${rakahs}</div>
        <div style="font-size:11px;background:var(--green-light);color:var(--green);padding:2px 8px;border-radius:10px;display:inline-block">${time}</div>
      </div>`).join('')}
  </div>

  <div class="hadith-block anim-target">
    <div class="hadith-source">Sahih Bukhari 8 · Sahih Muslim 16</div>
    <div class="hadith-text">"Islam is built on five [pillars]: testifying that there is no god but Allah and that Muhammad is the Messenger of Allah, establishing the prayer, paying the Zakat, making the pilgrimage to the House, and fasting in Ramadan."</div>
  </div>

  <div class="divider-kufic" aria-hidden="true"><span class="divider-kufic-icon"></span></div>

  <span class="eyebrow">Conditions &amp; Structure</span>
  <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:1rem">Prerequisites for a valid prayer</h2>
  <div class="card-grid card-grid-2 anim-target">
    <div class="card">
      <h3 style="font-family:var(--serif);font-size:1rem;font-weight:600;margin-bottom:.75rem;color:var(--green)">Conditions (Shurut)</h3>
      ${['Ritual purity (Wudu or Ghusl)', 'Entering prayer time', 'Facing the Qibla', 'Covering the Awrah', 'Intention (Niyyah) in the heart', 'Clean body, clothes, and place'].map(c => `<div style="font-size:13.5px;color:var(--muted);padding:4px 0;border-bottom:1px solid #f5f5f5">· ${c}</div>`).join('')}
    </div>
    <div class="card">
      <h3 style="font-family:var(--serif);font-size:1rem;font-weight:600;margin-bottom:.75rem;color:var(--green)">Pillars (Arkan)</h3>
      ${["Opening Takbir (Allahu Akbar)", "Standing (Qiyam)", "Reciting Surah Al-Fatiha", "Bowing (Ruku)", "Rising from Ruku", "Prostration (Sujud) × 2", "Sitting between prostrations", "Final Tashahhud", "Tasleem (Assalamu Alaykum)"].map(c => `<div style="font-size:13.5px;color:var(--muted);padding:4px 0;border-bottom:1px solid #f5f5f5">· ${c}</div>`).join('')}
    </div>
  </div>

  <div class="divider-kufic" aria-hidden="true"><span class="divider-kufic-icon"></span></div>

  <div class="faq-list anim-target" id="faq-prayer">
    ${[
        ["What breaks Wudu?", "Natural discharge (urine, stool, wind), deep sleep lying down, loss of consciousness. Touching private parts directly: does not break Wudu per Hanafi; does break it per Shafi'i/Hanbali. Sexual intercourse requires Ghusl."],
        ["Can I pray in congregation at home?", "Yes — congregation (jama'ah) in the mosque is highly recommended (Sunnah mu'akkadah) for men, especially Fajr and Isha. Women may pray at home. The reward of congregation is 27 times that of praying alone (Sahih Bukhari 645)."],
        ["What if I miss a prayer?", "A missed prayer (qada) must be made up as soon as remembered. Deliberately missing a prayer is a major sin. The Prophet ﷺ said: \"Whoever forgets a prayer, or sleeps through it, let him pray it when he remembers it.\" (Sahih Muslim 684)"],
        ["How is prayer time calculated?", "Prayer times are derived from the sun's position relative to the observer. Fajr and Isha require the sun a specific number of degrees below the horizon (angle varies by method). Dhuhr is solar noon; Maghrib is sunset; Asr is based on shadow length."],
    ].map(([q, a]) => `
      <div class="faq-item">
        <button class="faq-q">${q} <span class="faq-chev">+</span></button>
        <div class="faq-a">${a}</div>
      </div>`).join('')}
  </div>

  <div class="cta-strip anim-target" style="margin-top:2.5rem">
    ${geoPattern()}
    <h2>Continue to the third pillar</h2>
    <p>Zakat — the obligation of almsgiving, calculated on your wealth at 2.5% once the Nisab threshold is met.</p>
    <button class="btn btn-white btn-lg" data-route="#/zakat">Explore Zakat →</button>
  </div>
</div>
  `;
}

function initPrayerTool() {
    const latEl = document.getElementById('pt-lat');
    const lngEl = document.getElementById('pt-lng');
    const methEl = document.getElementById('pt-method');
    const locateBtn = document.getElementById('pt-locate');
    const calcBtn = document.getElementById('pt-calc');
    const statusEl = document.getElementById('pt-location-status');

    // Restore from localStorage, falling back to shared state
    const STORAGE_KEY = 'ih_prayer_loc';
    const saved = (() => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch { return null; } })();
    if (saved) {
        latEl.value = saved.lat;
        lngEl.value = saved.lng;
        if (saved.method) methEl.value = saved.method;
        calculate();
    } else if (state.location) {
        latEl.value = state.location.lat;
        lngEl.value = state.location.lng;
        calculate();
    }

    locateBtn.addEventListener('click', async () => {
        statusEl.textContent = 'Requesting location…';
        locateBtn.disabled = true;
        try {
            const loc = await requestLocation();
            latEl.value = loc.lat.toFixed(4);
            lngEl.value = loc.lng.toFixed(4);
            statusEl.textContent = `📍 ${loc.name}`;
            calculate();
        } catch (e) {
            statusEl.textContent = state.locationError || 'Could not get location. Enter coordinates manually.';
        } finally {
            locateBtn.disabled = false;
        }
    });

    calcBtn.addEventListener('click', calculate);

    function calculate() {
        const lat = parseFloat(latEl.value);
        const lng = parseFloat(lngEl.value);
        if (isNaN(lat) || isNaN(lng)) {
            statusEl.textContent = 'Please enter valid coordinates (decimal degrees, e.g. 51.5074, -0.1278).';
            return;
        }

        // ── Prayer times ─────────────────────────────────────────────
        const tz = getTimezoneOffset();
        const times = calcPrayerTimes(lat, lng, new Date(), tz, methEl.value);
        const curr = getCurrentPrayer(times);

        ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'].forEach(p => {
            document.getElementById(`pt-${p}`).textContent = times[p];
            document.getElementById(`pc-${p}`).classList.toggle('current', p === curr);
        });

        // ── Next prayer countdown ────────────────────────────────────
        const banner = document.getElementById('next-prayer-banner');
        banner.style.display = '';

        clearInterval(window._prayerTimer);

        function updateCountdown() {
            // Re-derive every tick so the countdown is live and label updates
            const next = getNextPrayer(times);
            document.getElementById('next-prayer-name').textContent = next.label;
            const h = Math.floor(next.minsRemaining / 60);
            const m = next.minsRemaining % 60;
            document.getElementById('next-prayer-countdown').textContent =
                h > 0 ? `${h}h ${m}m` : `${m} min`;
        }

        updateCountdown();
        window._prayerTimer = setInterval(updateCountdown, 60000);

        // ── Qibla ─────────────────────────────────────────────────────
        const bearing = calcQibla(lat, lng);
        const dist = distanceToMakkah(lat, lng);

        document.getElementById('qibla-bearing').textContent = `${bearing}°`;
        document.getElementById('qibla-dir').textContent = `${bearingToLabel(bearing)} from your location`;
        document.getElementById('qibla-dist').textContent = `${dist.toLocaleString()} km`;

        // ── FIXED NEEDLE ROTATION ─────────────────────────────────────
        // The pivot div is zero-size at top:50% left:50% of the compass ring.
        // The needle arm extends 100px upward from bottom:0 of that zero-size el.
        // transform-origin:bottom center → pivots at the ring centre. ✓
        // We set only rotate() — no translateX needed.
        const arm = document.getElementById('qibla-needle-arm');
        const tail = document.getElementById('qibla-tail');
        if (arm) {
            arm.style.transform = `rotate(${bearing}deg)`;
        }
        // Tail rotates the same way (it shares the same pivot geometry via parent)
        if (tail) {
            tail.style.transform = `rotate(${bearing}deg)`;
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify({ lat, lng, method: methEl.value }));
    }
}

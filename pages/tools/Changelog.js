// pages/tools/Changelog.js
import { geoPattern } from '../../js/app.js';

export function render(outlet) {
  outlet.innerHTML = `
<div class="page-header" style="background:var(--ink)">
  ${geoPattern()}
  <div class="page-header-inner">
    <span class="page-eyebrow">What's changed</span>
    <h1>Changelog</h1>
    <p>A full record of every improvement, fix, and new feature added to IslamicHub — most recent first.</p>
  </div>
</div>

<div class="content-narrow">

  <!-- v1.1 -->
  <div style="margin-bottom:3.5rem">
    <div style="display:flex;align-items:baseline;gap:1rem;margin-bottom:1.75rem">
      <span style="font-family:var(--arabic);font-size:1.1rem;color:var(--green);font-weight:700">v 1.1</span>
      <span style="font-family:var(--serif);font-size:1.55rem;font-weight:600">Design & Content Polish</span>
      <span style="font-size:12px;color:var(--muted);background:var(--cream-dark);border:1px solid var(--border);border-radius:20px;padding:2px 10px;white-space:nowrap">April 2026</span>
    </div>

    <div style="display:flex;flex-direction:column;gap:1rem">

      ${entry('✦', 'gold', 'Calligraphy grid background',
        'Added a faint Islamic 8-pointed-star geometric grid (two overlapping squares, connected by cardinal lines) to the site background and the preloader screen. The pattern tiles at 100×100 px with very low opacity so it reads as texture rather than distraction — matching the spirit of Islamic architectural surface decoration.')}

      ${entry('↑', 'green', 'Larger page headers',
        'Increased padding on all pillar-page headers (64px top / 48px bottom, up from 48px / 32px). Heading font scaled from <em>clamp(2rem, 4vw, 3rem)</em> to <em>clamp(2.5rem, 5vw, 3.8rem)</em>. Sub-text bumped to 17.5 px. Pages now open with a noticeably grander entrance.')}

      ${entry('🔤', 'green', 'Font size increase across the site',
        'Base font size raised from 16 px to 17 px — scaling all <em>rem</em>-based typography proportionally. Additional explicit bumps: prose 17 px, section-sub 17.5 px, hadith text 16 px, Qur\'an translation 16 px, hero body 18 px.')}

      ${entry('✦', 'gold', 'Amiri Arabic calligraphy font',
        'Added <strong>Amiri</strong> — a high-quality Naskh-style Arabic typeface designed for Qur\'anic text — loaded from Google Fonts. Applied to all Arabic text across the site via a new <em>--arabic</em> CSS variable. Previously, Arabic glyphs fell back to the Latin-only Cormorant Garamond font.')}

      ${entry('🌟', 'green', 'Preloader redesign',
        'The loading screen was rebuilt around Islamic calligraphy: a full Bismillah (<span style="font-family:var(--arabic)">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</span>) in Amiri at 2.4 rem leads the screen, followed by a gold ornament divider, the geometric logo, and the app name in Amiri. All elements stagger in using <em>fadeUp</em> animations. A minimum display time of 2.8 s ensures the preloader is always seen.')}

      ${entry('↗', 'green', 'Scroll-triggered animations',
        'Added an <em>IntersectionObserver</em>-based scroll-reveal system. Quran blocks, hadith blocks, card grids, timelines, FAQ lists, and CTA strips all fade up with a 70 ms stagger as they enter the viewport. The page-header content also animates in on every navigation. Wired through a new <em>router.afterRender</em> hook so it re-runs on every route change.')}

      ${entry('✔', 'green', 'Quran translation legibility fix',
        'The <em>.quran-trans</em> class had <em>color: rgba(255,255,255,.62)</em> — near-invisible on both the dark quran-block background and the light frame-calligraphy background. Fixed with context-aware colour: <em>var(--muted)</em> on light backgrounds, <em>rgba(255,255,255,.88)</em> on dark-only blocks.')}

      ${entry('🕌', 'prayer', 'Prayer times — Asr calculation fixed',
        'A stray negative sign on <em>asrAngle</em> caused <em>cos(hourAngle) &lt; −1</em> for virtually every latitude, forcing <em>hourAngle()</em> to return its maximum of 12 hours and placing Asr at midnight (noon + 12 h). Removing the negation gives the correct positive solar altitude angle. Asr now calculates accurately — e.g. ~16:50 BST for London in April.')}

      ${entry('⏱', 'prayer', 'Prayer times — countdown was frozen',
        '<em>next.minsRemaining</em> was captured once at calculation time; every subsequent <em>setInterval</em> tick redisplayed the same stale value. Fixed by calling <em>getNextPrayer(times)</em> fresh on each tick so the banner counts down in real time and also updates the prayer label if the period rolls over.')}

      ${entry('📖', 'gold', 'Hadith reference corrections',
        `Three corrections made after cross-referencing standard hadith collections:
        <ul style="margin-top:.5rem;padding-left:1.25rem;font-size:14px;color:var(--muted);line-height:2">
          <li><strong>Sahih Muslim 29 → 26</strong> — Uthman ibn Affan RA: "Whoever dies knowing that there is no god but Allah will enter Paradise." The standard citation in Sahih Muslim is hadith 26.</li>
          <li><strong>Sahih Bukhari 5015 → 6267</strong> — Surah Al-Ikhlas equals one-third of the Qur'an. The correct Bukhari number is 6267 in the standard Arabic-edition numbering.</li>
          <li><strong>Hadith Qudsi attribution wording</strong> — The fasting hadith attribution was reworded from "Allah says (in a Qudsi hadith narrated by Abu Hurayrah RA)" to the cleaner "Hadith Qudsi, narrated by Abu Hurayrah RA".</li>
        </ul>`)}

    </div>
  </div>

  <div class="divider"></div>

  <!-- v1.0 -->
  <div style="margin-bottom:3.5rem;margin-top:2.5rem">
    <div style="display:flex;align-items:baseline;gap:1rem;margin-bottom:1.75rem">
      <span style="font-family:var(--arabic);font-size:1.1rem;color:var(--muted);font-weight:700">v 1.0</span>
      <span style="font-family:var(--serif);font-size:1.55rem;font-weight:600">Initial Launch</span>
      <span style="font-size:12px;color:var(--muted);background:var(--cream-dark);border:1px solid var(--border);border-radius:20px;padding:2px 10px;white-space:nowrap">2024</span>
    </div>

    <div style="display:flex;flex-direction:column;gap:1rem">

      ${entry('☪️', 'faith', 'Five Pillars educational pages',
        'Complete educational guides for all five pillars: Faith (Shahada), Prayer (Salah), Zakat, Fasting (Sawm), and Hajj. Each page includes Qur\'anic verse with Arabic, hadith blocks, scholarly conditions, structured content, and FAQ accordions.')}

      ${entry('✦', 'gold', 'Zakat calculator',
        'Full multi-asset Zakat calculator with live gold and silver prices. Supports cash, loans, metals, investments, and debt deductions. Dual Nisab methods (gold 85g / silver 595g), live FX-adjusted prices, and a breakdown sidebar.')}

      ${entry('🕌', 'prayer', 'Prayer times tool',
        'Astronomical prayer-times calculator supporting five calculation methods (MWL, ISNA, Egyptian, Umm al-Qura, Karachi). Uses browser Geolocation API. Displays all six times with a countdown to next prayer.')}

      ${entry('🧭', 'prayer', 'Qibla finder',
        'Great-circle bearing to Makkah with an animated compass and distance display. Calculated from the same coordinates used for prayer times.')}

      ${entry('🌙', 'fasting', 'Ramadan / fasting tracker',
        'Shows the current Hijri date, days until Ramadan, and — when coordinates are entered — today\'s Suhoor and Iftar times with a live fasting progress bar.')}

      ${entry('⚖️', 'gold', 'Islamic inheritance calculator',
        'Full Fara\'id calculator covering all 13 heir types with automatic blocking (hijab) rules, fractional shares, and a visual breakdown panel. Based on Qur\'an 4:11–12.')}

      ${entry('ℹ️', 'green', 'About & disclaimer',
        'About page documenting the platform mission, six guiding principles, all scholarly sources cited across the site, and a full platform feature overview.')}

    </div>
  </div>

</div>`;
  return null;
}

function entry(icon, colour, title, body) {
  const colours = {
    green:  { bg: 'var(--green-light)',  text: 'var(--green)' },
    gold:   { bg: 'var(--gold-light)',   text: 'var(--gold)' },
    faith:  { bg: 'var(--faith-light)',  text: 'var(--faith-color)' },
    prayer: { bg: 'var(--prayer-light)', text: 'var(--prayer-color)' },
    fasting:{ bg: 'var(--fasting-light)',text: 'var(--fasting-color)' },
  };
  const c = colours[colour] || colours.green;
  return `
    <div style="display:flex;gap:1rem;align-items:flex-start">
      <div style="width:36px;height:36px;border-radius:9px;background:${c.bg};color:${c.text};display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;margin-top:2px">${icon}</div>
      <div style="flex:1">
        <div style="font-family:var(--serif);font-size:1.05rem;font-weight:600;margin-bottom:.35rem">${title}</div>
        <div style="font-size:14px;color:var(--muted);line-height:1.7">${body}</div>
      </div>
    </div>`;
}

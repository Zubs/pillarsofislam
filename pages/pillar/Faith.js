// pages/pillar/Faith.js
import { geoPattern, initFaqs } from '../../js/app.js';

export function render(outlet) {
  outlet.innerHTML = `
<div class="page-header pillar-header-faith" style="position:relative">
  <div class="ornament-hanging left" aria-hidden="true" style="opacity:0.3"></div>
  <div class="ornament-hanging right" aria-hidden="true" style="opacity:0.3"></div>
  ${geoPattern()}
  <div class="page-header-inner">
    <div class="pillar-num-badge" style="background:var(--faith-light);color:var(--faith-color)">Pillar 1 of 5 &nbsp;·&nbsp; الشهادة</div>
    <h1>Shahada — The Declaration of Faith</h1>
    <p>The first and foundational pillar of Islam: the testimony that there is no god but Allah, and that Muhammad ﷺ is His messenger.</p>
  </div>
</div>

<div class="content-narrow">

  <!-- Shahada in Arabic -->
  <div class="quran-block frame-calligraphy" style="text-align:center;padding:2.5rem 2rem">
    <div class="corner-ornament top-left" aria-hidden="true"></div>
    <div class="corner-ornament top-right" aria-hidden="true"></div>
    <div class="corner-ornament bottom-left" aria-hidden="true"></div>
    <div class="corner-ornament bottom-right" aria-hidden="true"></div>
    <div class="quran-arabic" style="font-size:2.2rem;text-align:center;letter-spacing:2px">
      أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ
    </div>
    <div class="quran-ref" style="text-align:center;margin-top:.75rem">The Shahada</div>
    <div class="quran-trans" style="text-align:center;font-size:16px">"I bear witness that there is no god but Allah, and I bear witness that Muhammad is the Messenger of Allah."</div>
  </div>

  <!-- What is it -->
  <div style="margin-top:2.5rem">
    <span class="eyebrow">Foundation</span>
    <h2 class="section-title" style="font-size:clamp(1.6rem,3vw,2.1rem)">What is the Shahada?</h2>
    <div class="prose">
      <p>The Shahada (شَهَادَة, meaning "testimony" or "witness") is the Islamic declaration of faith and the first of the Five Pillars of Islam. It consists of two inseparable clauses — Tawhid (the oneness of God) and Risala (the prophethood of Muhammad ﷺ).</p>
      <p>Pronouncing the Shahada with sincere belief and understanding is the entry point into Islam. It is the foundation upon which all other acts of worship stand. A person who dies believing in the Shahada is promised admission to Paradise (Sahih Bukhari 128).</p>
    </div>
  </div>

  <div class="hadith-block" style="margin-top:1.5rem">
    <div class="hadith-source">Sahih Bukhari 128 · Sahih Muslim 26</div>
    <div class="hadith-text">"Whoever dies knowing that there is no god but Allah will enter Paradise." — The Prophet Muhammad ﷺ (narrated by Uthman ibn Affan RA)</div>
  </div>

  <div class="divider-kufic" aria-hidden="true"><div class="divider-kufic-icon"></div></div>

  <!-- Two parts -->
  <span class="eyebrow">The Two Clauses</span>
  <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:1.5rem">Understanding each part</h2>
  <div class="card-grid card-grid-2" style="gap:1rem">
    <div class="card card-green" style="border-color:#B0D8C4">
      <div style="font-family:var(--arabic);font-size:1.65rem;direction:rtl;text-align:right;margin-bottom:.75rem;color:var(--green)">لَا إِلَهَ إِلَّا اللَّهُ</div>
      <h3 style="font-family:var(--serif);margin-bottom:.5rem;color:var(--green)">Lā ilāha illallāh</h3>
      <p style="font-size:13.5px;color:var(--muted);line-height:1.65">There is no god but Allah. This is <strong>Tawhid</strong> — the absolute oneness and uniqueness of God. It negates all false deities and affirms that worship belongs to Allah alone. This concept is the central axis of Islamic theology.</p>
    </div>
    <div class="card card-gold" style="border-color:#E0C87A">
      <div style="font-family:var(--serif);font-size:1.6rem;direction:rtl;text-align:right;margin-bottom:.75rem;color:var(--gold)">مُحَمَّدٌ رَسُولُ اللَّهِ</div>
      <h3 style="font-family:var(--serif);margin-bottom:.5rem;color:var(--gold)">Muhammadun Rasūlullāh</h3>
      <p style="font-size:13.5px;color:var(--muted);line-height:1.65">Muhammad is the Messenger of Allah. This is <strong>Risala</strong> — the affirmation of prophethood. It means accepting the Qur'an as revelation, the Sunnah as guidance, and Muhammad ﷺ as the seal of all prophets.</p>
    </div>
  </div>

  <div class="divider-kufic" aria-hidden="true"><div class="divider-kufic-icon"></div></div>

  <!-- Conditions -->
  <span class="eyebrow">Conditions of Validity</span>
  <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:1rem">Seven conditions for the Shahada to be accepted</h2>
  <p class="prose" style="margin-bottom:1.5rem">Scholars have extracted seven conditions from the Qur'an and Sunnah that must be met for the Shahada to be valid — mere pronunciation without these is insufficient.</p>

  <div class="card-grid" style="grid-template-columns:repeat(auto-fill,minmax(200px,1fr))">
    ${[
      ['1. Knowledge', 'عِلْم', 'Knowing what the Shahada affirms and denies — understanding Tawhid.'],
      ['2. Certainty', 'يَقِين', 'Absolute conviction, free from doubt or wavering.'],
      ['3. Sincerity', 'إِخْلَاص', 'Pure intention for Allah alone, not for status or worldly gain.'],
      ['4. Truthfulness', 'صِدْق', 'The heart aligning with what the tongue declares.'],
      ['5. Love', 'مَحَبَّة', 'Loving Allah, His Messenger, and the obligations that come with the Shahada.'],
      ['6. Submission', 'اِنْقِيَاد', 'Outward compliance and submission to the implications of the declaration.'],
      ['7. Acceptance', 'قَبُول', 'Embracing everything the Shahada entails without rejection.'],
    ].map(([title, arabic, desc]) => `
      <div class="card">
        <div style="font-family:var(--arabic);font-size:1.35rem;color:var(--green);direction:rtl;margin-bottom:.4rem">${arabic}</div>
        <h4 style="font-family:var(--serif);font-size:.9rem;font-weight:600;margin-bottom:.4rem">${title}</h4>
        <p style="font-size:12.5px;color:var(--muted);line-height:1.5">${desc}</p>
      </div>`).join('')}
  </div>

  <div class="divider-kufic" aria-hidden="true"><div class="divider-kufic-icon"></div></div>

  <!-- Tawhid explained -->
  <span class="eyebrow">Tawhid — Divine Oneness</span>
  <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:1rem">The three dimensions of Tawhid</h2>

  <div class="quran-block frame-calligraphy">
    <div class="corner-ornament top-left" aria-hidden="true"></div>
    <div class="corner-ornament top-right" aria-hidden="true"></div>
    <div class="corner-ornament bottom-left" aria-hidden="true"></div>
    <div class="corner-ornament bottom-right" aria-hidden="true"></div>
    <div class="quran-arabic">قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ</div>
    <div class="quran-ref">Qur'an 112:1–2</div>
    <div class="quran-trans">"Say: He is Allah, [who is] One. Allah, the Eternal Refuge." — Surah Al-Ikhlas, described by the Prophet ﷺ as equal to one-third of the Qur'an in meaning (Sahih Bukhari 6267).</div>
  </div>

  <div class="timeline" style="margin-top:1.5rem">
    <div class="tl-item">
      <div class="tl-marker">1</div>
      <div class="tl-content">
        <h4>Tawhid al-Rububiyyah — Oneness of Lordship</h4>
        <p>The belief that Allah alone is the Creator, Sustainer, and Sovereign of all existence. No partner shares in His dominion or His actions in the universe.</p>
      </div>
    </div>
    <div class="tl-item">
      <div class="tl-marker">2</div>
      <div class="tl-content">
        <h4>Tawhid al-Uluhiyyah — Oneness of Worship</h4>
        <p>All acts of worship — prayer, supplication, sacrifice, hope, fear, love — belong exclusively to Allah. Directing any of these to other than Allah is shirk (associating partners).</p>
      </div>
    </div>
    <div class="tl-item">
      <div class="tl-marker">3</div>
      <div class="tl-content">
        <h4>Tawhid al-Asma' wa'l-Sifat — Oneness of Names &amp; Attributes</h4>
        <p>Allah's 99 names and attributes are affirmed as He described them in the Qur'an and Sunnah — without distortion (tahrif), negation (ta'til), asking how (takyif), or likening to creation (tamthil).</p>
      </div>
    </div>
  </div>

  <div class="divider-kufic" aria-hidden="true"><div class="divider-kufic-icon"></div></div>

  <!-- FAQ -->
  <span class="eyebrow">Common Questions</span>
  <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:0">FAQ</h2>
  <div class="faq-list" id="faq-faith">
    ${[
      ['Can non-Muslims say the Shahada?', 'Yes — saying the Shahada with sincere belief is what makes a person Muslim. There is no formal ceremony required, though it is recommended to do so in front of witnesses. Ghusl (ritual bath) is recommended after conversion.'],
      ['Does the Shahada need to be in Arabic?', 'The majority scholarly position is that understanding the meaning is essential, but the Arabic pronunciation is preferred as the authoritative form. Most scholars permit saying it in one\'s language initially, with learning the Arabic encouraged.'],
      ['What is shirk (association)?', 'Shirk is the act of associating partners with Allah in worship, lordship, or attributes — the opposite of Tawhid. The Qur\'an describes it as the only sin that is not forgiven if one dies upon it without repentance (4:48), making Tawhid the most critical belief in Islam.'],
      ['How many prophets were there?', 'The Qur\'an mentions 25 prophets by name. Hadith literature mentions 124,000 prophets were sent throughout history. Muhammad ﷺ is the last and final prophet — no prophet comes after him.'],
    ].map(([q, a]) => `
      <div class="faq-item">
        <button class="faq-q">${q} <span class="faq-chev">+</span></button>
        <div class="faq-a">${a}</div>
      </div>`).join('')}
  </div>

  <div class="cta-strip" style="margin-top:2.5rem">
    ${geoPattern()}
    <h2>Continue to the second pillar</h2>
    <p>Prayer (Salah) — five times daily, facing Makkah, the connection between servant and Creator.</p>
    <button class="btn btn-white btn-lg" data-route="#/prayer">Explore Salah →</button>
  </div>

</div>
  `;

  initFaqs(document.getElementById('faq-faith'));
  return null;
}

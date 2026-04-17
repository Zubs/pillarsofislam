// pages/pillar/Hajj.js
import { geoPattern, initFaqs } from '../../js/app.js';
import { toHijri } from '../../js/utils/hijri.js';

export function render(outlet) {
  outlet.innerHTML = buildHTML();
  initFaqs(document.getElementById('faq-hajj'));
  initRitesNav();
  return null;
}

function buildHTML() {
  const hijri = toHijri();
  const dhulHijjahDays = hijri.month === 12 ? `Day ${hijri.day} of Dhū al-Ḥijjah` : '';

  return `
<div class="page-header pillar-header-hajj" style="position:relative">
  <div class="ornament-hanging left" aria-hidden="true" style="opacity:0.3"></div>
  <div class="ornament-hanging right" aria-hidden="true" style="opacity:0.3"></div>
  ${geoPattern()}
  <div class="page-header-inner">
    <div class="pillar-num-badge" style="background:var(--hajj-light);color:var(--hajj-color)">Pillar 5 of 5 &nbsp;·&nbsp; الحج</div>
    <h1>Hajj — The Pilgrimage</h1>
    <p>The fifth and final pillar — the pilgrimage to Makkah, obligatory once in a lifetime for every Muslim who is physically and financially able. Over 2 million pilgrims gather annually in the largest human gathering on Earth.</p>
  </div>
</div>

<div class="content-narrow">

  <div class="quran-block frame-calligraphy">
    <div class="corner-ornament top-left" aria-hidden="true"></div>
    <div class="corner-ornament top-right" aria-hidden="true"></div>
    <div class="corner-ornament bottom-left" aria-hidden="true"></div>
    <div class="corner-ornament bottom-right" aria-hidden="true"></div>
    <div class="quran-arabic">وَلِلَّهِ عَلَى النَّاسِ حِجُّ الْبَيْتِ مَنِ اسْتَطَاعَ إِلَيْهِ سَبِيلًا</div>
    <div class="quran-ref">Qur'an 3:97</div>
    <div class="quran-trans">"And [due] to Allah from the people is a pilgrimage to the House — for whoever is able to find thereto a way."</div>
  </div>

  <!-- Who must go -->
  <div style="margin-top:2.5rem">
    <span class="eyebrow">The Obligation</span>
    <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:1rem">Conditions of obligation</h2>
    <p class="prose" style="margin-bottom:1.5rem">Hajj is obligatory once in a lifetime when all of the following conditions are met. "Istita'ah" (ability) is the key criterion.</p>

    <div class="card-grid" style="grid-template-columns:repeat(auto-fill,minmax(200px,1fr))">
      ${[
        ['Islam','Must be Muslim — Hajj performed by a non-Muslim is not valid'],
        ['Adulthood','Must be a baligh (pubescent) adult; children\'s Hajj is valid but does not fulfil the obligation'],
        ['Sanity','Must be of sound mind (aqil)'],
        ['Freedom','Historically: not enslaved. Today: applicable as personal autonomy'],
        ['Physical ability','Must be physically capable of completing the rites'],
        ['Financial ability','Must be able to finance the journey with expenses for dependants covered'],
        ['Safety of route','The journey must be reasonably safe'],
        ['Mahram (for women)','Majority view: women must have a mahram (husband or unmarriageable male relative). Hanafi: required at all times. Others: optional if safe group travel.'],
      ].map(([t,d])=>`
        <div class="card"><h4 style="font-family:var(--serif);font-size:.9rem;font-weight:600;margin-bottom:.35rem;color:var(--hajj-color)">${t}</h4><p style="font-size:12.5px;color:var(--muted);line-height:1.55">${d}</p></div>`).join('')}
    </div>
  </div>

  <div class="divider-kufic" aria-hidden="true"><div class="divider-kufic-icon"></div></div>

  <!-- Types of Hajj -->
  <span class="eyebrow">Types of Hajj</span>
  <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:1rem">Three valid ways to perform Hajj</h2>
  <div class="card-grid card-grid-3">
    <div class="card card-green" style="border-color:#B0D8C4">
      <h3 style="font-family:var(--serif);font-size:1.05rem;font-weight:600;margin-bottom:.5rem;color:var(--green)">Tamattu' (متمتع)</h3>
      <div style="font-size:11px;background:var(--green-light);color:var(--green);padding:2px 8px;border-radius:10px;display:inline-block;margin-bottom:.75rem;font-weight:600">Recommended for non-Makkans</div>
      <p style="font-size:13.5px;color:var(--muted);line-height:1.6">Perform Umrah first, exit ihram, then re-enter ihram for Hajj on the 8th of Dhul Hijjah. Requires slaughtering a hadiyah (sacrificial animal).</p>
    </div>
    <div class="card card-gold" style="border-color:#E0C87A">
      <h3 style="font-family:var(--serif);font-size:1.05rem;font-weight:600;margin-bottom:.5rem;color:var(--gold)">Qiran (قارن)</h3>
      <div style="font-size:11px;background:var(--gold-light);color:#7A5A10;padding:2px 8px;border-radius:10px;display:inline-block;margin-bottom:.75rem;font-weight:600">Combined Hajj & Umrah</div>
      <p style="font-size:13.5px;color:var(--muted);line-height:1.6">Enter ihram for both Hajj and Umrah simultaneously at the Miqat. Do not exit ihram between the two. Also requires a hadiyah.</p>
    </div>
    <div class="card" style="border-color:var(--border)">
      <h3 style="font-family:var(--serif);font-size:1.05rem;font-weight:600;margin-bottom:.5rem">Ifrad (مفرد)</h3>
      <div style="font-size:11px;background:var(--cream-dark);color:var(--muted);padding:2px 8px;border-radius:10px;display:inline-block;margin-bottom:.75rem;font-weight:600">Hajj only</div>
      <p style="font-size:13.5px;color:var(--muted);line-height:1.6">Enter ihram for Hajj only. No Umrah is performed alongside it. No hadiyah required (though recommended).</p>
    </div>
  </div>

  <div class="divider-kufic" aria-hidden="true"><div class="divider-kufic-icon"></div></div>

  <!-- The Rites of Hajj — step by step -->
  <span class="eyebrow">The Rites</span>
  <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:.75rem">Step-by-step guide to the rites</h2>
  <p class="prose" style="margin-bottom:1.5rem">Hajj spans five days — from the 8th to the 13th of Dhū al-Ḥijjah. Each rite corresponds to an action of the Prophet Ibrahim ﷺ or Muhammad ﷺ.</p>

  <!-- Day tabs -->
  <div class="btn-group" style="margin-bottom:1.5rem" id="day-tabs">
    ${['Day 8','Day 9','Day 10','Day 11-13'].map((d,i)=>
      `<button class="pill-btn${i===0?' active':''}" data-day="${i}" onclick="window.showDay(${i})">${d}</button>`
    ).join('')}
  </div>

  <div id="day-panels">
    ${[
      { day:'Day 8 — Yawm al-Tarwiyah (8 Dhul Hijjah)', rites:[
        ['Ihram','Enter the state of ritual consecration at the Miqat (designated boundary). Men wear two white unstitched cloths. Women wear modest everyday clothing. Make the intention and recite the Talbiyah: "Labbayk Allahumma labbayk..."'],
        ['Travel to Mina','Proceed to the valley of Mina, approximately 8km from Masjid al-Haram. Spend the night in Mina — this is Sunnah, not obligatory.'],
        ['Prayers in Mina','Pray Dhuhr, Asr, Maghrib, Isha, and Fajr in Mina (shortened but not combined, per majority scholars).'],
      ]},
      { day:'Day 9 — Yawm Arafah (9 Dhul Hijjah) — THE HEART OF HAJJ', rites:[
        ['Standing at Arafah (Wuquf)','The single most important rite of Hajj. The Prophet ﷺ said: "Hajj is Arafah" (Ibn Majah). Must be present in the plain of Arafah at any time between Dhuhr and Maghrib. Spend time in dua, dhikr, and tawbah (repentance).'],
        ['Combined Dhuhr & Asr prayers','Pray Dhuhr and Asr combined and shortened at Masjid Namirah (the mosque at Arafah), following the Sunnah of the Prophet ﷺ.'],
        ['Muzdalifah','After sunset, travel to Muzdalifah. Pray combined Maghrib and Isha. Collect 49–70 pebbles for the stoning. Spend the night under the open sky.'],
      ]},
      { day:'Day 10 — Yawm al-Nahr (Eid al-Adha)', rites:[
        ['Stoning the Large Jamarat','Cast 7 pebbles at the largest pillar (Jamarat al-Aqabah) while saying "Allahu Akbar" with each throw. This symbolises the rejection of Shaytan.'],
        ['Animal sacrifice (Nusuk)','Slaughter a sacrificial animal (or arrange for one to be slaughtered). This commemorates Ibrahim\'s ﷺ willingness to sacrifice his son.'],
        ['Shaving or cutting hair (Halq/Taqsir)','Men shave their head or cut hair. Women cut a finger-length from their hair. This marks partial exit from ihram.'],
        ['Tawaf al-Ifadah','Perform 7 circuits of the Ka\'bah (tawaf) — this is an obligatory pillar (rukn) of Hajj.'],
        ['Sa\'i','Walk 7 times between Safa and Marwah, commemorating Hajar\'s search for water for her son Ismail ﷺ.'],
      ]},
      { day:'Days 11–13 — Ayyam al-Tashreeq (Staying in Mina)', rites:[
        ['Stoning all three Jamaraat','On each of the 11th, 12th, and (optionally) 13th, stone all three pillars with 7 pebbles each (21 pebbles per day), after Dhuhr.'],
        ['Leaving early (Nafr Awwal)','Those who wish may depart Mina on the 12th after stoning, before sunset. Those who remain must stone on the 13th as well.'],
        ['Tawaf al-Wida (Farewell Tawaf)','The final rite before leaving Makkah — a farewell tawaf of 7 circuits. This is obligatory per majority scholars (Hanafi, Shafi\'i, Hanbali); Maliki considers it Sunnah.'],
      ]},
    ].map((panel, i) => `
      <div id="day-panel-${i}" style="${i>0?'display:none':''}">
        <div class="timeline">
          ${panel.rites.map(([name, desc]) => `
            <div class="tl-item">
              <div class="tl-marker" style="background:var(--hajj-light);color:var(--hajj-color)">🕋</div>
              <div class="tl-content">
                <h4>${name}</h4>
                <p>${desc}</p>
              </div>
            </div>`).join('')}
        </div>
        <div style="font-size:13px;font-weight:600;color:var(--hajj-color);margin-top:8px">${panel.day}</div>
      </div>`).join('')}
  </div>

  <div class="divider-kufic" aria-hidden="true"><div class="divider-kufic-icon"></div></div>

  <!-- Umrah -->
  <span class="eyebrow">Lesser Pilgrimage</span>
  <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:1rem">Umrah — العمرة</h2>
  <p class="prose" style="margin-bottom:1.5rem">Umrah is the lesser pilgrimage that can be performed at any time of year. It consists of four rites and is highly recommended (Sunnah mu'akkadah), though scholars differ on whether it is obligatory (Shafi'i and Hanbali: obligatory once; Hanafi and Maliki: Sunnah).</p>

  <div class="card-grid card-grid-4">
    ${[['1','Ihram','Enter ihram at the Miqat boundary with intention for Umrah'],['2','Tawaf','Seven circuits of the Ka\'bah counter-clockwise'],['3','Sa\'i','Seven walks between Safa and Marwah'],['4','Halq/Taqsir','Shave or cut hair to exit ihram']].map(([n,t,d])=>`
      <div class="card" style="text-align:center">
        <div style="width:36px;height:36px;background:var(--hajj-light);color:var(--hajj-color);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--serif);font-size:1.1rem;font-weight:600;margin:0 auto var(--space-3)">${n}</div>
        <div style="font-family:var(--serif);font-size:1rem;font-weight:600;margin-bottom:.3rem">${t}</div>
        <div style="font-size:12.5px;color:var(--muted);line-height:1.5">${d}</div>
      </div>`).join('')}
  </div>

  <div class="divider-kufic" aria-hidden="true"><div class="divider-kufic-icon"></div></div>

  <div class="faq-list" id="faq-hajj">
    ${[
      ['What happens if someone cannot perform Hajj?','If a person meets the conditions of ability but genuinely cannot go due to illness or other circumstances, they may send someone (a proxy/badal) to perform Hajj on their behalf. If they later recover, they must still perform Hajj themselves if they are able.'],
      ['Is Hajj valid if I committed sins before?','Yes. The Prophet ﷺ said: "Whoever performs Hajj without engaging in sexual relations or sinning, returns [home pure] as on the day his mother gave birth to him." (Sahih Bukhari 1521) Hajj is a comprehensive spiritual purification.'],
      ['What is Miqat?','Miqat (مِيقَات) refers to the five geographical boundaries designated by the Prophet ﷺ, within which pilgrims must enter ihram before proceeding to Makkah. Flying pilgrims should enter ihram at or before the point above the Miqat.'],
      ['Can Hajj be performed on behalf of a deceased person?','Yes — proxy Hajj (hajj al-badal) is valid for a deceased person who met the conditions of obligation but died before performing Hajj. Ibn Abbas RA reported a woman asking the Prophet ﷺ about this and he permitted it (Sahih Bukhari 1513).'],
    ].map(([q,a])=>`
      <div class="faq-item">
        <button class="faq-q">${q} <span class="faq-chev">+</span></button>
        <div class="faq-a">${a}</div>
      </div>`).join('')}
  </div>

  <div class="cta-strip" style="margin-top:2.5rem">
    ${geoPattern()}
    <h2>Explore Islamic tools</h2>
    <p>Calculate your Zakat, check prayer times, find the Qibla, or plan your inheritance — all in one place.</p>
    <div class="btn-group" style="justify-content:center">
      <button class="btn btn-white btn-lg" data-route="#/zakat">Zakat Calculator</button>
      <button class="btn btn-secondary btn-lg" style="color:#fff;border-color:rgba(255,255,255,.3)" data-route="#/inheritance">Inheritance</button>
    </div>
  </div>

</div>`;
}

function initRitesNav() {
  window.showDay = (i) => {
    document.querySelectorAll('#day-panels > div').forEach((p,j) => {
      p.style.display = j === i ? '' : 'none';
    });
    document.querySelectorAll('#day-tabs .pill-btn').forEach((b,j) => {
      b.classList.toggle('active', j === i);
    });
  };
}

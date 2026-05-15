# Changelog

All notable changes to IslamicHub are documented here.

---

## v1.1 — Design & Content Polish *(April 2026)*

### Added
- **Calligraphy grid background** — Faint Islamic 8-pointed star geometric pattern (two overlapping squares at 45°, connected by cardinal lines, with a gold diamond at each centre) tiled at 100×100 px on the site body and preloader. Uses `background-attachment: fixed` so it behaves as a fixed wallpaper behind scrolling content.
- **Amiri Arabic font** — Added the *Amiri* Naskh-style typeface (Google Fonts) for all Arabic text via a new `--arabic` CSS variable. Previously, Arabic characters fell back to the Latin-only Cormorant Garamond font with no Arabic-specific rendering.
- **Scroll-triggered animations** — `IntersectionObserver`-based fade-up reveal on all major content blocks (Qur'an blocks, hadith blocks, card grids, timelines, FAQ lists, CTA strips). 70 ms stagger between elements. Wired via a new `router.afterRender` hook so animations re-run on every page navigation.
- **Page header entrance animation** — `.page-header-inner` fades up on every route load.
- **Changelog page** — New route `#/changelog` documenting every change, accessible from the footer and mobile menu.

### Changed
- **Page headers taller** — Padding increased from `48px/32px` to `64px/48px`. Heading font scaled from `clamp(2rem,4vw,3rem)` to `clamp(2.5rem,5vw,3.8rem)`. Sub-text bumped to 17.5 px.
- **Global font size** — Base raised from 16 px to 17 px, scaling all `rem` units. Additional explicit bumps: prose 17 px, section-sub 17.5 px, hadith text 16 px, Qur'an translation 16 px, hero body 18 px.
- **Preloader redesigned** — Bismillah (`بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم`) in Amiri at 2.4 rem leads the screen. Gold ornament divider, geometric logo, and app name in Amiri below. All elements stagger in via `fadeUp` keyframe animation. Minimum display time enforced at 2.8 s.
- **Qur'an translation legibility** — `.quran-trans` was `rgba(255,255,255,.62)` — near-invisible on both dark and light backgrounds. Now context-aware: `var(--muted)` (dark grey) on light `.frame-calligraphy` blocks; `rgba(255,255,255,.88)` on dark-only `.quran-block` elements.
- **Quran block Arabic font** — `.quran-arabic` and `.frame-calligraphy > .quran-arabic` now use `var(--arabic)` (Amiri) instead of `var(--serif)` (Cormorant Garamond).

### Fixed
- **Prayer times — Asr calculation broken** *(Prayer page)* — A stray negative sign on `asrAngle` caused `cos(hourAngle) < -1` for virtually all latitudes, forcing `hourAngle()` to return its maximum of 12 hours and placing Asr at midnight (`noon + 12 h`). Removed the negation so the solar altitude angle is correctly positive. Asr now calculates correctly (e.g. ~16:50 BST for London in April).
- **Prayer times — countdown frozen** *(Prayer page)* — `next.minsRemaining` was captured once at calculation time; every subsequent `setInterval` tick redisplayed the same value. Fixed by calling `getNextPrayer(times)` fresh inside each tick, so the banner counts down in real time and also updates the prayer label if the period changes.
- **Sahih Muslim 29 → 26** *(Faith page)* — Hadith of Uthman ibn Affan RA: *"Whoever dies knowing that there is no god but Allah will enter Paradise."* Correct citation in Sahih Muslim is hadith **26**.
- **Sahih Bukhari 5015 → 6267** *(Faith page)* — Hadith that Surah Al-Ikhlas equals one-third of the Qur'an. Correct Bukhari number in the standard Arabic-edition numbering is **6267**.
- **Hadith Qudsi attribution** *(Fasting page)* — Attribution reworded from *"Allah says (in a Qudsi hadith narrated by Abu Hurayrah RA)"* to the cleaner *"Hadith Qudsi, narrated by Abu Hurayrah RA"*.
- **Inheritance calculator UI** *(Inheritance page)* — Rebuilt page layout to match the visual language of the pillar pages: page header uses `position:relative` with hanging ornament divs; Qur'anic verse block converted from dark `.quran-block` to light `.frame-calligraphy` with four corner accents; group labels upgraded to `.eyebrow` class; plain `.divider` replaced with `.divider-kufic`; "Important note" sidebar uses `.card-gold` with consistent type sizing; "Quick reference" eyebrow label added above the fixed shares table.

---

## v1.0 — Initial Launch *(2024)*

### Added
- **Five Pillars pages** — Full educational guides for Faith (Shahada), Prayer (Salah), Zakat, Fasting (Sawm), and Hajj. Each includes Qur'anic verse with Arabic text, hadith blocks, scholarly conditions, structured prose, and FAQ accordions.
- **Zakat calculator** — Multi-asset calculator with live gold/silver prices via metals.live. Supports cash, loans, metals, investments, and debt deductions. Dual Nisab methods (gold 85 g / silver 595 g) with live FX rates.
- **Prayer times tool** — Astronomical calculator supporting five calculation methods (MWL, ISNA, Egyptian, Umm al-Qura, Karachi) with browser Geolocation and a countdown to the next prayer.
- **Qibla finder** — Great-circle bearing to Makkah with animated compass and distance display.
- **Fasting / Ramadan tracker** — Current Hijri date, days until Ramadan, Suhoor/Iftar times, and a live fasting-progress bar.
- **Islamic inheritance calculator** — Full Fara'id calculator covering all 13 heir types with automatic blocking (hijab) rules, fractional shares, and a visual results panel. Based on Qur'an 4:11–12.
- **About page** — Platform mission, six guiding principles, complete scholarly-source list, and feature overview.
- **Hash-based router** — Single-page app with `#/` routing, page transition fade, and per-page cleanup callbacks.
- **Cormorant Garamond + DM Sans typography** — Serif for headings and Qur'anic display; sans-serif for UI.
- **Islamic ornament system** — Hanging ornaments, Kufic dividers, calligraphy frame (`.frame-calligraphy`), corner accents, and geometric background grid (`.bg-kufic-grid`).

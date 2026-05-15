# Contributing to IslamicHub

بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم

Thank you for wanting to contribute to IslamicHub. This project exists to make authentic Islamic education and tools
accessible to the Muslim community — and every contribution, however small, helps fulfil that mission.

---

## Table of contents

1. [Code of conduct](#code-of-conduct)
2. [Ways to contribute](#ways-to-contribute)
3. [Getting started (local setup)](#getting-started)
4. [Project structure](#project-structure)
5. [Submitting changes](#submitting-changes)
6. [Scholarly accuracy](#scholarly-accuracy)
7. [Style guide](#style-guide)
8. [Reporting bugs](#reporting-bugs)

---

## Code of conduct

This project follows Islamic principles of respect, sincerity, and brotherhood. Contributions must be made in good
faith. Please be kind and constructive in all discussions. Harassment, dishonesty, or bad-faith edits will result in
removal from the project.

---

## Ways to contribute

You don't need to write code to contribute. Here's how anyone can help:

| Type                 | Examples                                                                        |
|----------------------|---------------------------------------------------------------------------------|
| **💻 Code**          | Fix bugs, add features, improve performance, write tests                        |
| **📖 Content**       | Write or improve educational articles on the Five Pillars                       |
| **🕌 Scholarship**   | Correct or add Qur'anic / Hadith references, flag inaccurate rulings            |
| **🌍 Translations**  | Translate pages to Arabic, Urdu, Turkish, Indonesian, French, etc.              |
| **🎨 Design**        | UI improvements, icons, accessibility enhancements                              |
| **🧪 Testing**       | Test across browsers, devices, and screen sizes                                 |
| **📣 Sharing**       | Share IslamicHub with your community — a simple recommendation helps enormously |
| **⭐ Star on GitHub** | Helps others discover the project                                               |

---

## Getting started

IslamicHub requires no build step — it runs as a plain HTML/CSS/JS site using native ES modules.

### Prerequisites

- Any modern browser (Chrome 90+, Firefox 88+, Safari 14+)
- A local static file server (to avoid ES module CORS restrictions)

### Running locally

```bash
# Clone the repository
git clone https://github.com/Zubs/pillarsofislam.git
cd pillarsofislam

# Serve with any static server — pick whichever you have:
npx serve .
# or
python3 -m http.server 8080
# or
npx http-server .

# Open in browser
open http://localhost:3000
```

> **Why a server?** Native ES modules (`type="module"`) cannot load from `file://` due to browser security restrictions.
> You must serve from `http://localhost`.

---

## Project structure

```
islamichub/
├── index.html                  ← App entry point, loading screen, bootstrap
├── css/
│   ├── tokens.css              ← Design tokens (colours, spacing, fonts)
│   ├── base.css                ← Reset, typography, shared layout
│   ├── components.css          ← Nav, footer, pillar cards, tool styles
│   └── ornament.css            ← Islamic geometric design system
├── js/
│   ├── app.js                  ← Nav/footer builder, route registration
│   ├── router.js               ← Hash-based SPA router
│   ├── seo.js                  ← Per-route meta, JSON-LD, canonical
│   ├── state.js                ← Shared reactive state (prices, currency)
│   └── utils/
│       ├── prayer.js           ← Astronomical prayer time algorithm
│       ├── qibla.js            ← Qibla bearing & distance calculation
│       ├── hijri.js            ← Gregorian ↔ Hijri calendar conversion
│       └── inheritance.js      ← Islamic Fara'id calculation engine
└── pages/
    ├── Home.js                 ← Landing page
    ├── pillar/
    │   ├── Faith.js            ← Shahada page
    │   ├── Prayer.js           ← Prayer times + Qibla page
    │   ├── Zakat.js            ← Zakat calculator page
    │   ├── Fasting.js          ← Fasting + Ramadan tracker page
    │   └── Hajj.js             ← Hajj rites guide page
    └── tools/
        ├── Inheritance.js      ← Fara'id calculator page
        ├── About.js            ← About page
        └── Changelog.js        ← Changelog page
```

### How pages work

Each page file exports a single `render(outlet)` function that injects HTML into the `<main id="app">` element. Pages
return a cleanup function (or `null`) that the router calls before navigating away.

```js
// pages/pillar/MyPage.js
export function render(outlet) {
    outlet.innerHTML = `<div>...</div>`;

    // Set up any event listeners or intervals
    const timer = setInterval(...);

    // Return cleanup function
    return () => clearInterval(timer);
}
```

---

## Submitting changes

### For small fixes (typos, scholarly corrections, CSS tweaks)

1. Fork the repository on GitHub
2. Make your change directly on GitHub's web editor, or clone and edit locally
3. Open a pull request with a clear description of what you changed and why

### For larger features

1. **Open an issue first** — describe what you want to add or change. This avoids duplicated effort and lets maintainers
   give early feedback.
2. Fork and clone the repo
3. Create a branch: `git checkout -b feature/my-feature`
4. Make your changes following the [style guide](#style-guide)
5. Test in at least two browsers
6. Open a pull request referencing your issue

### Pull request checklist

- [ ] Tested in Chrome and Firefox
- [ ] Tested on mobile (or browser devtools mobile emulation)
- [ ] No console errors
- [ ] Scholarly claims include a source (Qur'an verse, Hadith number, or named scholar)
- [ ] New educational content reviewed for accuracy before PR
- [ ] Description explains what changed and why

---

## Scholarly accuracy

This is the most important section for content contributors.

**All scholarly claims must be sourced.** Every Qur'anic verse, Hadith citation, and ruling should include:

- Qur'an: surah and ayah number (e.g. *Qur'an 9:103*)
- Hadith: collection and number in the standard Arabic-edition numbering (e.g. *Sahih Bukhari 1454*)
- Scholarly opinion: the scholar's name and school (e.g. *Imam al-Nawawi (Shafi'i), Al-Majmu'*)

**If you are unsure whether a ruling is correct**, open an issue rather than making the change. We would rather discuss
it than publish something inaccurate.

**Hadith numbering:** Use the standard Arabic-edition numbers. The English Muhsin Khan translations use a different
numbering system — please verify against the Arabic-edition number.

**Schools of thought:** Where scholars disagree, present both positions. IslamicHub aims to inform, not to impose a
single madhab.

---

## Style guide

### JavaScript

- Native ES modules — no bundler, no TypeScript, no JSX
- Functions over classes for page modules
- Keep page `render()` functions self-contained — import what you need at the top
- Use `const` and `let`; no `var`
- Template literals for HTML strings
- Comment any non-obvious logic

### CSS

- Use CSS custom properties from `css/tokens.css` — never hardcode colours or spacing values
- Follow BEM-ish naming already in the codebase (`.card`, `.card-green`, `.prayer-grid`)
- Add new component styles to `css/components.css`; new Islamic ornament styles to `css/ornament.css`
- Mobile-first is not strictly enforced, but test mobile before submitting

### HTML (in template literals)

- Use semantic elements (`<article>`, `<section>`, `<nav>`, `<h2>`, etc.)
- All interactive elements must be keyboard accessible
- Decorative elements get `aria-hidden="true"`
- Images need descriptive `alt` attributes

---

## Reporting bugs

Open a [GitHub issue](https://github.com/Zubs/pillarsofislam/issues) with:

1. **What you expected** to happen
2. **What actually happened** (include any console errors)
3. **Steps to reproduce** (be specific — which page, which browser, which action)
4. **Browser and OS** (e.g. Chrome 124 on macOS 14)
5. **Screenshots** if the issue is visual

For **scholarly errors** (wrong Hadith number, inaccurate ruling, misattributed quote), please include the correct
source.

---

## Questions?

Open a [GitHub Discussion](https://github.com/Zubs/pillarsofislam/discussions) or tag `@Zubs` in an issue.

جَزَاكُمُ اللَّهُ خَيْرًا — May Allah reward you with good.

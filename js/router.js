// js/router.js — hash-based client-side router with SEO meta updates

// Per-route meta: [title, description]
const ROUTE_META = {
        '#/': [
            'IslamicHub — Learn & Live the Five Pillars of Islam',
            "IslamicHub is a free Islamic education platform covering all Five Pillars — with prayer times, Qibla finder, Zakat calculator, inheritance (Fara'id) calculator, and scholarly guides grounded in Qur'an and Hadith.",
        ],
        '#/faith': [
            'Shahada — Declaration of Faith | IslamicHub',
            "Learn about the Shahada, the first pillar of Islam — Tawhid (divine oneness), the seven conditions of the testimony, and the concept of Risala (prophethood). Grounded in Qur'an and authenticated Hadith.",
        ],
        '#/prayer': [
            'Salah — Prayer Times, Qibla Finder & Guide | IslamicHub',
            "Get accurate Islamic prayer times (Fajr, Dhuhr, Asr, Maghrib, Isha) for your location with five calculation methods. Find the Qibla direction to Makkah with an animated compass. Learn the second pillar of Islam.",
        ],
        '#/zakat': [
            'Zakat Calculator with Live Gold & Silver Prices | IslamicHub',
            "Calculate your annual Zakat obligation with live gold and silver prices. Supports cash, investments, gold, silver (by weight and purity), business assets, debts, and dual Nisab methods (85g gold / 595g silver).",
        ],
        '#/fasting': [
            'Sawm — Fasting, Ramadan Tracker & Guide | IslamicHub',
            "Learn about Islamic fasting (Sawm), the fourth pillar of Islam. Get Suhoor and Iftar times for your location, track your fast progress, and read a comprehensive guide to Ramadan rulings and virtues.",
        ],
        '#/hajj': [
            'Hajj — Complete Rites Guide | IslamicHub',
            'Comprehensive guide to Hajj, the fifth pillar of Islam — day-by-day rites for all five days, the three types of Hajj (Tamattu, Qiran, Ifrad), Umrah guide, conditions of obligation, and scholarly rulings.',
        ],
        '#/inheritance': [
            "Islamic Inheritance Calculator (Fara'id) | IslamicHub",
            "Calculate Qur'anic inheritance shares (Fara'id) for all 13 heir types based on Qur'an 4:11–12 and 4:176. Automatic blocking (hijab) rules, awl (proportional reduction), and visual results breakdown.",
        ],
        '#/about': [
            'About IslamicHub — Mission, Methodology & Sources',
            `Learn about IslamicHub: our mission to make authentic Islamic education accessible, our methodology (Qur'an - first, all four Sunni schools), and the full list of classical and contemporary scholarly sources.`,
        ],
        '#/changelog':
            [
                'Changelog — IslamicHub Updates & Fixes',
                'Full changelog for IslamicHub: version history, new features, bug fixes, and improvements to the prayer times calculator, Zakat calculator, and design system.',
            ],
    }
;

const BASE_URL = 'https://islamichub.xyz';

function updateMeta(hash) {
    const [title, description] = ROUTE_META[hash] || ROUTE_META['#/'];

    // <title>
    document.title = title;

    // <meta name="description">
    let desc = document.querySelector('meta[name="description"]');
    if (desc) {
        desc.setAttribute('content', description);
    }

    // Open Graph
    const setOG = (prop, val) => {
        let el = document.querySelector(`meta[property="${prop}"]`);
        if (el) {
            el.setAttribute('content', val);
        }
    };

    setOG('og:title', title);
    setOG('og:description', description);
    setOG('og:url', `${BASE_URL}/${hash === '#/' ? '' : hash}`);

    // Twitter
    const setTW = (name, val) => {
        let el = document.querySelector(`meta[name="${name}"]`);
        if (el) {
            el.setAttribute('content', val);
        }
    };

    setTW('twitter:title', title);
    setTW('twitter:description', description);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
        canonical.setAttribute('href', `${BASE_URL}/${hash === '#/' ? '' : hash}`);
    }
}

export class Router {
    constructor(routes, outlet) {
        this.routes = routes;   // { '#/path': () => import('./pages/X.js') }
        this.outlet = outlet;   // HTMLElement to render pages into
        this.current = null;
        this._cleanup = null;
        this.afterRender = null;  // optional hook called after each render

        window.addEventListener('hashchange', () => this._route());
        window.addEventListener('load', () => this._route());
    }

    navigate(hash) {
        if (window.location.hash !== hash) {
            window.location.hash = hash;
        } else {
            this._route();
        }
    }

    async _route() {
        const hash = window.location.hash || '#/';
        let match = this.routes[hash];

        // Prefix match for nested routes
        if (!match) {
            for (const [pattern, loader] of Object.entries(this.routes)) {
                if (hash.startsWith(pattern) && pattern !== '#/') {
                    match = loader;
                    break;
                }
            }
        }

        if (!match) {
            match = this.routes['#/'];
        }

        // Update meta for SEO (and for social sharing of live links)
        updateMeta(hash);

        // Cleanup previous page
        if (this._cleanup) {
            this._cleanup();
            this._cleanup = null;
        }

        // Fade out
        this.outlet.style.opacity = '0';
        this.outlet.style.transition = 'opacity .15s ease';
        await new Promise(r => setTimeout(r, 120));

        // Render new page
        const mod = await match();
        this._cleanup = mod.render(this.outlet);

        // Fade in
        this.outlet.style.opacity = '1';
        this.current = hash;

        // Update active nav state
        document.querySelectorAll('[data-route]').forEach(el => {
            const r = el.dataset.route;
            el.classList.toggle(
                'active',
                hash === r || (r !== '#/' && hash.startsWith(r))
            );
        });

        // Scroll to top
        window.scrollTo({top: 0, behavior: 'instant'});

        // Fire post-render hook (e.g. scroll animations)
        if (typeof this.afterRender === 'function') {
            this.afterRender(hash);
        }
    }
}

// js/seo.js — centralised SEO management
// Targets all 20 keyword opportunities identified in the Veesigro audit:
// accurate zakat calculator online, islamic inheritance calculator free,
// best prayer times app with qibla, find qibla direction from my location,
// quranic inheritance shares breakdown tool, islamic learning platform five pillars,
// ramadan fasting tracker, hadith based islamic guidance, free islamic education tools,
// zakat calculator with gold and silver prices, calculate fara'id online, etc.

const BASE = 'https://islamichub.xyz';

// ── Per-route configuration ──────────────────────────────────────────────────
export const ROUTE_SEO = {
    '#/': {
        title: 'IslamicHub — Islamic Education, Prayer Times, Zakat Calculator & Five Pillars Guide',
        description: 'Free Islamic learning platform covering all Five Pillars of Islam. Accurate prayer times and Qibla direction for your city, Zakat calculator with live gold prices, Islamic inheritance (Fara\'id) calculator, and Hadith-based scholarly guides. No account needed.',
        keywords: 'islamic learning platform five pillars, free islamic education tools and resources, digital islamic learning practice guide, islamic practice companion, hadith based islamic guidance online, understand five pillars of islam guide',
        canonical: `${BASE}/`,
        og: {
            type: 'website',
            image: `${BASE}/og-image.png`,
        },
    },

    '#/faith': {
        title: 'Shahada — Declaration of Faith, Tawhid & First Pillar of Islam | IslamicHub',
        description: 'Learn about the Shahada, the first pillar of Islam. Covers Tawhid (divine oneness), the seven conditions of the declaration, Risala (prophethood), and all three dimensions of divine oneness — with Qur\'anic verses and authenticated Hadith.',
        keywords: 'shahada declaration of faith islam, what is tawhid in islam, first pillar of islam explained, islamic monotheism guide, conditions of shahada, risala prophethood islam',
        canonical: `${BASE}/#/faith`,
    },

    '#/prayer': {
        title: 'Prayer Times for My City, Qibla Direction & Salah Guide | IslamicHub',
        description: 'Get accurate Islamic prayer times (Fajr, Dhuhr, Asr, Maghrib, Isha) for your location using 5 calculation methods. Find the Qibla direction to Makkah with a live compass. Learn the second pillar of Islam with Hadith references and scholarly rulings.',
        keywords: 'best prayer times app with qibla, reliable islamic prayer times for my city, find qibla direction from my location, accurate salah times calculator, prayer times fajr dhuhr asr maghrib isha, qibla compass direction makkah, five daily prayers guide',
        canonical: `${BASE}/#/prayer`,
    },

    '#/zakat': {
        title: 'Accurate Zakat Calculator Online — Live Gold & Silver Prices | IslamicHub',
        description: 'Calculate your annual Zakat obligation accurately with live gold and silver prices. Supports all assets: cash, savings, gold and silver by weight and purity, shares, ISAs, pensions, business inventory, receivables and debts. Dual Nisab methods (85g gold / 595g silver). Free, private, no account needed.',
        keywords: 'accurate zakat calculator online, zakat calculator with gold and silver prices, how to calculate zakat on assets, zakat nisab threshold 2026, zakat on gold jewellery, zakat on savings and investments, online tool for islamic obligations, free islamic zakat calculator',
        canonical: `${BASE}/#/zakat`,
    },

    '#/fasting': {
        title: 'Ramadan Fasting Tracker, Suhoor & Iftar Times | IslamicHub',
        description: 'Track your Ramadan fast with live Suhoor (pre-dawn) and Iftar (sunset) times for your location. Includes a fasting progress bar, Ramadan countdown, Hijri calendar, and a comprehensive Hadith-based guide to Sawm rulings — invalidators, exemptions, and the virtues of Ramadan.',
        keywords: 'ramadan fasting tracker app, suhoor and iftar times today, sawm fasting guide islam, ramadan prayer times calculator, how to fast in ramadan guide, fasting rules islam hadith, fourth pillar of islam fasting',
        canonical: `${BASE}/#/fasting`,
    },

    '#/hajj': {
        title: 'Hajj Rites Guide — Complete Step-by-Step Pilgrimage to Makkah | IslamicHub',
        description: 'Complete guide to Hajj, the fifth pillar of Islam. Day-by-day rites for all five days (Mina, Arafah, Muzdalifah, Jamarat, Tawaf), three types of Hajj (Tamattu, Qiran, Ifrad), full Umrah guide, conditions of obligation, and rulings from all four schools.',
        keywords: 'pilgrimage to makkah rites guide online, hajj step by step guide, how to perform hajj five pillars, hajj rites day by day, umrah guide for beginners, tawaf and sai guide, conditions of hajj islam, what happens at arafah hajj',
        canonical: `${BASE}/#/hajj`,
    },

    '#/inheritance': {
        title: "Islamic Inheritance Calculator (Fara'id) — Qur'anic Shares | IslamicHub",
        description: "Calculate Islamic inheritance shares (Fara'id) for all heirs based on Qur'an 4:11–12 and 4:176. Covers husband, wife, sons, daughters, parents, grandparents, brothers, sisters, and more. Automatic hijab (blocking) rules, awl (proportional reduction), and clear visual breakdown.",
        keywords: "islamic inheritance calculator free, calculate fara'id online, quranic inheritance shares breakdown tool, islamic inheritance law calculator, faraid calculation husband wife children, how to divide inheritance in islam, quranic shares parents children, zakat on inheritance",
        canonical: `${BASE}/#/inheritance`,
    },

    '#/about': {
        title: "About IslamicHub — Open Source Islamic Education Platform",
        description: "IslamicHub is an open-source Islamic education platform built by Zubair Idris Aweda and Saifur-Rahman Yusuf. Learn about our mission, methodology, scholarly sources (Qur'an, Hadith, all four madhabs), and how to contribute to the project on GitHub.",
        keywords: 'about islamichub, open source islamic platform, scholarly islamic platform four madhabs, islamic education methodology, free islamic tools no tracking',
        canonical: `${BASE}/#/about`,
    },
};

// ── Structured data schemas ──────────────────────────────────────────────────

function websiteSchema() {
    return {
        '@type': 'WebSite',
        '@id': `${BASE}/#website`,
        'url': `${BASE}/`,
        'name': 'IslamicHub',
        'description': 'Free Islamic education and tools platform covering the Five Pillars of Islam.',
        'inLanguage': 'en-GB',
        'potentialAction': {
            '@type': 'SearchAction',
            'target': `${BASE}/#/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
        },
        'publisher': {
            '@type': 'Organization',
            'name': 'IslamicHub',
            'url': `${BASE}/`,
            'logo': {'@type': 'ImageObject', 'url': `${BASE}/og-image.png`},
            'sameAs': [
                'https://github.com/Zubs/pillarsofislam',
            ],
        },
    };
}

function appSchema() {
    return {
        '@type': 'WebApplication',
        '@id': `${BASE}/#app`,
        'name': 'IslamicHub',
        'url': `${BASE}/`,
        'applicationCategory': 'EducationApplication',
        'operatingSystem': 'Any',
        'browserRequirements': 'Requires JavaScript',
        'offers': {'@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP'},
        'featureList': [
            'Accurate prayer times calculator (Fajr, Dhuhr, Asr, Maghrib, Isha)',
            'Qibla direction finder with compass',
            'Zakat calculator with live gold and silver prices',
            'Islamic inheritance (Fara\'id) calculator',
            'Ramadan fasting tracker with Suhoor and Iftar times',
            'Five Pillars of Islam educational guides with Qur\'an and Hadith references',
            'Hijri calendar conversion',
            'Multi-currency support (GBP, USD, EUR, SAR)',
        ],
        'author': [
            {'@type': 'Person', 'name': 'Zubair Idris Aweda', 'url': 'https://github.com/Zubs'},
            {'@type': 'Person', 'name': 'Saifur-Rahman Yusuf', 'url': 'https://github.com/yusuf-saif'},
        ],
    };
}

function faqSchema() {
    return {
        '@type': 'FAQPage',
        '@id': `${BASE}/#faq`,
        'mainEntity': [
            {
                '@type': 'Question',
                'name': 'What is Zakat and who must pay it?',
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': 'Zakat is the third pillar of Islam — an obligatory annual payment of 2.5% on wealth that has exceeded the Nisab threshold for a full lunar year (hawl). It is due on every Muslim adult who is sane, free, and whose net zakatable assets remain above Nisab for an entire year.'
                },
            },
            {
                '@type': 'Question',
                'name': 'How do I calculate Zakat on gold and silver?',
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': 'Enter the weight in grams and purity of your gold (9ct, 18ct, 22ct, or 24ct) or silver into the Zakat calculator. IslamicHub fetches live spot prices and calculates the current market value automatically. Zakat is 2.5% of the value if your total net zakatable wealth exceeds the Nisab threshold.'
                },
            },
            {
                '@type': 'Question',
                'name': 'How do I find the Qibla direction from my location?',
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': 'Go to the Prayer page on IslamicHub and tap "Use my location", or enter your latitude and longitude manually, then press Calculate. The compass will rotate to show the precise bearing toward the Ka\'bah in Makkah, along with the distance in kilometres.'
                },
            },
            {
                '@type': 'Question',
                'name': 'What is the Nisab threshold for Zakat in 2026?',
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': 'The Nisab is set at either 85 grams of 24ct gold or 595 grams of silver. IslamicHub fetches live gold and silver prices to calculate the current Nisab value in your chosen currency (GBP, USD, EUR, or SAR) automatically.'
                },
            },
            {
                '@type': 'Question',
                'name': "How does the Islamic inheritance (Fara'id) calculator work?",
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': "Select the heirs present in the estate and enter the total estate value. IslamicHub calculates the Qur'anic shares (Fara'id) for each heir based on Qur'an 4:11–12 and 4:176, applying automatic blocking (hijab) rules and proportional reduction (awl) where the shares exceed the estate."
                },
            },
            {
                '@type': 'Question',
                'name': 'What are the Five Pillars of Islam?',
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': 'The Five Pillars of Islam are: (1) Shahada — the declaration of faith that there is no god but Allah and Muhammad is His messenger; (2) Salah — five daily prayers at prescribed times; (3) Zakat — obligatory annual almsgiving of 2.5% on eligible wealth; (4) Sawm — fasting during the month of Ramadan; (5) Hajj — pilgrimage to Makkah, obligatory once in a lifetime for those who are able.'
                },
            },
        ],
    };
}

function breadcrumbSchema(hash) {
    const items = [{'@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': BASE}];
    const labels = {
        '#/faith': 'Faith (Shahada)',
        '#/prayer': 'Prayer (Salah)',
        '#/zakat': 'Zakat Calculator',
        '#/fasting': 'Fasting (Sawm)',
        '#/hajj': 'Hajj',
        '#/inheritance': "Inheritance (Fara'id)",
        '#/about': 'About',
    };

    if (hash !== '#/' && labels[hash]) {
        items.push({'@type': 'ListItem', 'position': 2, 'name': labels[hash], 'item': `${BASE}/${hash}`});
    }

    return {'@type': 'BreadcrumbList', 'itemListElement': items};
}

// ── Main update function — called by router on every route change ─────────────
export function updateSEO(hash) {
    const cfg = ROUTE_SEO[hash] || ROUTE_SEO['#/'];

    // <title>
    document.title = cfg.title;

    // Helper: set/create a meta tag
    const setMeta = (selector, attr, val) => {
        let el = document.querySelector(selector);
        if (!el) {
            el = document.createElement('meta');
            document.head.appendChild(el);
        }

        el.setAttribute(attr, val);
    };

    // Primary meta
    setMeta('meta[name="description"]', 'content', cfg.description);
    setMeta('meta[name="keywords"]', 'content', cfg.keywords || '');

    // Open Graph
    setMeta('meta[property="og:title"]', 'content', cfg.title);
    setMeta('meta[property="og:description"]', 'content', cfg.description);
    setMeta('meta[property="og:url"]', 'content', cfg.canonical);
    if (cfg.og?.image) {
        setMeta('meta[property="og:image"]', 'content', cfg.og.image);
    }

    // Twitter / X
    setMeta('meta[name="twitter:title"]', 'content', cfg.title);
    setMeta('meta[name="twitter:description"]', 'content', cfg.description);

    // Canonical
    let canon = document.querySelector('link[rel="canonical"]');
    if (!canon) {
        canon = document.createElement('link');
        canon.rel = 'canonical';
        document.head.appendChild(canon);
    }

    canon.href = cfg.canonical;

    // JSON-LD — replace the entire block on each navigation
    let ldEl = document.getElementById('ld-json-dynamic');
    if (!ldEl) {
        ldEl = document.createElement('script');
        ldEl.type = 'application/ld+json';
        ldEl.id = 'ld-json-dynamic';
        document.head.appendChild(ldEl);
    }

    const graph = [websiteSchema(), appSchema(), faqSchema(), breadcrumbSchema(hash)];
    ldEl.textContent = JSON.stringify({'@context': 'https://schema.org', '@graph': graph});
}

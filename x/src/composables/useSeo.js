// Called inside each view's setup() to set per-page <title> and <meta>
import { useHead } from '@unhead/vue'

const BASE = 'https://islamichub.xyz'
const ROUTE_META = {
  home: {
    title: 'IslamicHub — Islamic Education, Prayer Times, Zakat Calculator & Five Pillars Guide',
    description: "Free Islamic learning platform covering all Five Pillars of Islam. Accurate prayer times and Qibla direction, Zakat calculator with live gold prices, Islamic inheritance (Fara'id) calculator, and Hadith-based scholarly guides.",
  },
  faith: {
    title: 'Shahada — Declaration of Faith, Tawhid & First Pillar of Islam | IslamicHub',
    description: 'Learn about the Shahada, the first pillar of Islam — Tawhid, the seven conditions, Risala, and all three dimensions of divine oneness, with Qur\'anic verses and Hadith.',
  },
  prayer: {
    title: 'Prayer Times, Qibla Direction & Salah Guide | IslamicHub',
    description: 'Get accurate Islamic prayer times for your location with 5 calculation methods. Find the Qibla direction with a live compass. Learn the second pillar of Islam with Hadith references.',
  },
  zakat: {
    title: 'Accurate Zakat Calculator Online — Live Gold & Silver Prices | IslamicHub',
    description: 'Calculate your annual Zakat with live gold and silver prices. Supports cash, gold/silver by weight, shares, ISAs, pensions, business inventory, and debt deductions. Dual Nisab methods. Free and private.',
  },
  fasting: {
    title: 'Ramadan Fasting Tracker, Suhoor & Iftar Times | IslamicHub',
    description: 'Live Suhoor and Iftar times for your location, fasting progress bar, Ramadan countdown, and a comprehensive Hadith-based guide to Sawm rulings.',
  },
  hajj: {
    title: 'Hajj Rites Guide — Complete Step-by-Step Pilgrimage | IslamicHub',
    description: 'Day-by-day Hajj rites for all five days, three types of Hajj (Tamattu, Qiran, Ifrad), full Umrah guide, conditions of obligation, and rulings from all four schools.',
  },
  inheritance: {
    title: "Islamic Inheritance Calculator (Fara'id) | IslamicHub",
    description: "Calculate Qur'anic inheritance shares for all 13 heir types based on Qur'an 4:11–12. Automatic blocking rules, awl reduction, and visual breakdown.",
  },
  about: {
    title: 'About IslamicHub — Open Source Islamic Education Platform',
    description: "Open-source Islamic education platform built by Zubair Idris Aweda and Yusuf Saif. Learn our mission, methodology, scholarly sources, and how to contribute on GitHub.",
  },
  changelog: {
    title: 'Changelog — IslamicHub Updates',
    description: 'Full changelog for IslamicHub: version history, new features, bug fixes, and improvements.',
  },
}

export function useSeo(routeName) {
  const meta = ROUTE_META[routeName] || ROUTE_META.home
  useHead({
    title: meta.title,
    meta: [
      { name: 'description', content: meta.description },
      { property: 'og:title', content: meta.title },
      { property: 'og:description', content: meta.description },
      { property: 'og:url', content: `${BASE}/${routeName === 'home' ? '' : routeName}` },
      { name: 'twitter:title', content: meta.title },
      { name: 'twitter:description', content: meta.description },
    ],
    link: [
      { rel: 'canonical', href: `${BASE}/${routeName === 'home' ? '' : routeName}` },
    ],
  })
}

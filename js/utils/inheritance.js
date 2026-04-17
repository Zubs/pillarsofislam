// js/utils/inheritance.js — Islamic Inheritance (Fara'id) Calculator
// Based on Qur'an 4:11–12, 4:176 and Hanafi fiqh

/**
 * Heir definitions with their Qur'anic shares (fixed fractions)
 * share: null = residuary (asaba), gets remainder after fixed shares
 * blocked_by: list of heirs that block this heir entirely
 */
export const HEIR_DEFS = [
  {
    key: 'husband',
    label: 'Husband',
    group: 'Spouse',
    quran: '4:12',
    getShare(heirs) {
      // 1/4 if deceased has children, else 1/2
      const hasChildren = heirs.son || heirs.daughter || heirs.grandson || heirs.granddaughter;
      return hasChildren ? { num: 1, den: 4 } : { num: 1, den: 2 };
    }
  },
  {
    key: 'wife',
    label: 'Wife / Wives',
    group: 'Spouse',
    quran: '4:12',
    getShare(heirs, count) {
      // 1/8 with children, else 1/4; divided among all wives
      const hasChildren = heirs.son || heirs.daughter || heirs.grandson || heirs.granddaughter;
      return hasChildren ? { num: 1, den: 8 } : { num: 1, den: 4 };
    }
  },
  {
    key: 'father',
    label: 'Father',
    group: 'Parents',
    quran: '4:11',
    getShare(heirs) {
      if (heirs.son || heirs.grandson) return { num: 1, den: 6 }; // fixed
      return null; // residuary
    }
  },
  {
    key: 'mother',
    label: 'Mother',
    group: 'Parents',
    quran: '4:11',
    getShare(heirs) {
      const hasBrothers = (heirs.brother || 0) + (heirs.sister || 0) >= 2;
      if (heirs.son || heirs.grandson || hasBrothers) return { num: 1, den: 6 };
      return { num: 1, den: 3 };
    }
  },
  {
    key: 'son',
    label: 'Son(s)',
    group: 'Children',
    quran: '4:11',
    blockedBy: [],
    getShare() { return null; } // residuary — males get double daughters
  },
  {
    key: 'daughter',
    label: 'Daughter(s)',
    group: 'Children',
    quran: '4:11',
    getShare(heirs) {
      if (heirs.son) return null; // with son = residuary (asaba)
      const count = heirs.daughter || 1;
      if (count === 1) return { num: 1, den: 2 };
      return { num: 2, den: 3 }; // 2+ daughters = 2/3 shared
    }
  },
  {
    key: 'grandson',
    label: 'Grandson (son\'s son)',
    group: 'Children',
    quran: '4:11',
    blockedBy: ['son'],
    getShare(heirs) { return null; } // residuary if no son
  },
  {
    key: 'granddaughter',
    label: 'Granddaughter (son\'s daughter)',
    group: 'Children',
    quran: '4:11',
    blockedBy: ['son', 'daughter'], // blocked if 2+ daughters
    getShare(heirs) {
      if (heirs.son || heirs.grandson) return null; // asaba
      if (heirs.daughter) {
        if ((heirs.daughter || 0) >= 2) return null; // blocked (2/3 already taken)
        return { num: 1, den: 6 }; // supplement to make 2/3
      }
      return { num: 1, den: 2 };
    }
  },
  {
    key: 'brother',
    label: 'Full Brother(s)',
    group: 'Siblings',
    quran: '4:176',
    blockedBy: ['son','grandson','father'],
    getShare() { return null; } // residuary
  },
  {
    key: 'sister',
    label: 'Full Sister(s)',
    group: 'Siblings',
    quran: '4:176',
    blockedBy: ['son','grandson','father','brother'],
    getShare(heirs) {
      if (heirs.brother) return null; // asaba with brother (gets half)
      if ((heirs.sister || 1) === 1) return { num: 1, den: 2 };
      return { num: 2, den: 3 };
    }
  },
  {
    key: 'paternal_grandfather',
    label: 'Paternal Grandfather',
    group: 'Extended',
    quran: '4:11',
    blockedBy: ['father'],
    getShare(heirs) {
      if (heirs.son || heirs.grandson) return { num: 1, den: 6 };
      return null;
    }
  },
  {
    key: 'paternal_grandmother',
    label: 'Paternal Grandmother',
    group: 'Extended',
    quran: 'Hadith',
    blockedBy: ['father','mother'],
    getShare() { return { num: 1, den: 6 }; }
  },
  {
    key: 'maternal_grandmother',
    label: 'Maternal Grandmother',
    group: 'Extended',
    quran: 'Hadith',
    blockedBy: ['mother'],
    getShare() { return { num: 1, den: 6 }; }
  },
];

/**
 * Calculate inheritance shares
 * @param {Object} activeHeirs - e.g. { son: 2, daughter: 1, wife: 1 }
 * @param {number} estate - total estate value
 * @returns Array of { key, label, count, shareFraction, sharePercent, shareAmount }
 */
export function calcInheritance(activeHeirs, estate = 100) {
  const results = [];
  let fixedTotal = 0; // sum of all fixed fractions (as decimals)
  let residuaryHeirs = [];

  // 1. Determine fixed shares and collect residuaries
  for (const def of HEIR_DEFS) {
    const count = activeHeirs[def.key];
    if (!count) continue;

    // Check if blocked
    const isBlocked = (def.blockedBy || []).some(b => activeHeirs[b] > 0);
    if (isBlocked) continue;

    const share = def.getShare(activeHeirs, count);

    if (share) {
      const fraction = share.num / share.den;
      fixedTotal += fraction;
      results.push({
        key: def.key,
        label: def.label,
        count,
        fraction,
        shareStr: `${share.num}/${share.den}`,
        percent: 0, // calculated after
        amount: 0,
      });
    } else {
      residuaryHeirs.push({ def, count });
    }
  }

  // 2. Residuary (asaba) gets remainder — awl (proportional reduction) if over 1
  const remainder = Math.max(0, 1 - fixedTotal);
  const scale = fixedTotal > 1 ? 1 / fixedTotal : 1; // awl reduction

  // Scale fixed shares if sum > 1
  for (const r of results) {
    r.fraction *= scale;
  }

  // Distribute residue among asaba
  if (remainder > 0 && residuaryHeirs.length > 0) {
    // Sons get 2x daughters (if mixed); otherwise equal among same-sex
    const hasSon  = residuaryHeirs.find(h => h.def.key === 'son');
    const hasDau  = residuaryHeirs.find(h => h.def.key === 'daughter' && activeHeirs.son > 0);

    if (hasSon && activeHeirs.son > 0 && activeHeirs.daughter > 0) {
      // Mixed: son gets 2 shares per son, daughter 1 per daughter
      const sonShares = activeHeirs.son * 2;
      const dauShares = activeHeirs.daughter;
      const totalShares = sonShares + dauShares;
      residuaryHeirs.forEach(h => {
        const shares = (h.def.key === 'son' ? 2 : 1) * h.count;
        results.push({ key: h.def.key, label: h.def.label, count: h.count, fraction: remainder * shares / totalShares, shareStr: 'Residue', percent: 0, amount: 0 });
      });
    } else {
      // Equal split among residuaries
      const totalCount = residuaryHeirs.reduce((a, h) => a + h.count, 0);
      residuaryHeirs.forEach(h => {
        results.push({ key: h.def.key, label: h.def.label, count: h.count, fraction: remainder * (h.count / totalCount), shareStr: 'Residue', percent: 0, amount: 0 });
      });
    }
  }

  // 3. Calculate amounts
  const grandTotal = results.reduce((a, r) => a + r.fraction, 0) || 1;
  for (const r of results) {
    r.percent = (r.fraction / grandTotal * 100).toFixed(1);
    r.amount = (r.fraction / grandTotal * estate).toFixed(2);
  }

  return results;
}

export function gcd(a, b) { return b ? gcd(b, a % b) : a; }

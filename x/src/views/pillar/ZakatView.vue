<template>
  <div>
    <div class="page-header pillar-header-zakat">
      <GeoPattern/>
      <div class="page-header-inner">
        <div class="pillar-num-badge"
             style="background:var(--zakat-light);color:var(--zakat-color)">
          Pillar 3 of 5 &nbsp;·&nbsp; الزكاة
        </div>
        <h1>Zakat — Obligatory Almsgiving</h1>
        <p>The third pillar — an annual 2.5% levy on zakatable wealth above the Nisab threshold.</p>
      </div>
    </div>

    <div class="content-wrap" style="max-width:1100px">

      <!-- Nisab / Currency controls -->
      <div class="card" style="margin-bottom:1rem">
        <div
          style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:12px">
          <div>
            <div class="ctrl-label">Currency</div>
            <div class="btn-group">
              <button v-for="c in currencies" :key="c.code"
                      class="pill-btn" :class="{ active: store.currency === c.code }"
                      @click="store.setCurrency(c.code, c.sym)">
                {{ c.sym }} {{ c.code }}
              </button>
            </div>
          </div>
          <div>
            <div class="ctrl-label" style="text-align:right">Nisab method</div>
            <div class="btn-group">
              <button class="pill-btn" :class="{ active: store.nisabMethod === 'gold' }"
                      @click="store.setNisabMethod('gold')">Gold (85g)
              </button>
              <button class="pill-btn" :class="{ active: store.nisabMethod === 'silver' }"
                      @click="store.setNisabMethod('silver')">Silver (595g)
              </button>
            </div>
          </div>
        </div>
        <div
          style="display:flex;justify-content:space-between;border-top:1px solid var(--border);padding-top:12px">
          <div>
            <div class="ctrl-label">Nisab threshold</div>
            <span
              style="font-family:var(--serif);font-size:1.6rem;font-weight:600;color:var(--green)">
              {{ store.fmt(store.nisabValue) }}
            </span>
            <span style="font-size:12px;color:var(--muted);margin-left:6px">
              {{
                store.nisabMethod === 'gold'
                  ? `85g × ${store.sym}${store.goldLocal.toFixed(2)}/g`
                  : `595g × ${store.sym}${store.silverLocal.toFixed(2)}/g`
              }}
            </span>
          </div>
          <div style="text-align:right">
            <div class="ctrl-label">Gold price</div>
            <span>{{ store.sym }}{{ store.goldLocal.toFixed(2) }}/g</span>
            <span class="badge" :class="store.pricesLive ? 'badge-green' : 'badge-gold'"
                  style="margin-left:6px">
              {{ store.pricesLive ? 'live' : 'reference' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Calculator layout -->
      <div class="calc-layout">
        <div>
          <!-- Cash & savings accordion -->
          <ZakatAccordion title="Cash & Bank Savings" sub="All liquid money you hold" icon="💵"
                          icon-class="ai-teal"
                          :total="store.fmt(cashTotal)">
            <template #reference>
              <strong>Qur'an 9:103 · Sahih Bukhari 1454</strong>
              Cash and bank balances held above Nisab for a full lunar year are zakatable at 2.5%.
            </template>
            <div class="field-grid">
              <div class="field"><label>Cash at home</label>
                <div class="pfx-wrap"><span class="pfx">{{ store.sym }}</span>
                  <input type="number" class="input-field" v-model.number="fields.cashHome" min="0"
                         placeholder="0.00">
                </div>
              </div>
              <div class="field"><label>Current accounts</label>
                <div class="pfx-wrap"><span class="pfx">{{ store.sym }}</span>
                  <input type="number" class="input-field" v-model.number="fields.cashCurrent"
                         min="0"
                         placeholder="0.00">
                </div>
              </div>
              <div class="field"><label>Savings accounts</label>
                <div class="pfx-wrap"><span class="pfx">{{ store.sym }}</span>
                  <input type="number" class="input-field" v-model.number="fields.cashSavings"
                         min="0"
                         placeholder="0.00">
                </div>
              </div>
              <div class="field"><label>Foreign currency (converted)</label>
                <div class="pfx-wrap"><span class="pfx">{{ store.sym }}</span>
                  <input type="number" class="input-field" v-model.number="fields.cashForeign"
                         min="0"
                         placeholder="0.00">
                </div>
              </div>
            </div>
          </ZakatAccordion>

          <!-- … other accordions follow the same pattern … -->
        </div>

        <!-- Sidebar results -->
        <div class="calc-sidebar">
          <div class="results-card">
            <div class="rc-header">
              <span class="rc-title">Your Zakat</span>
              <span class="rc-rate">2.5% · 1/40th</span>
            </div>
            <div class="rc-body">
              <div class="hawl-warn">
                ⚠ <strong>Hawl:</strong> Zakat is only due after your wealth has exceeded
                Nisab for one complete lunar year (~354 days).
              </div>
              <div class="result-box" :class="obligated ? 'result-due' : 'result-none'">
                <div class="rb-label">
                  {{
                    obligated
                      ? 'Zakat is due — 2.5% of net zakatable wealth:'
                      : net > 0 ? 'Below Nisab — no obligation this year' : 'Enter your assets to begin'
                  }}
                </div>
                <div :class="obligated ? 'rb-amount' : 'rb-empty'">
                  {{ obligated ? store.fmt(zakatDue) : net > 0 ? 'Below threshold' : '—' }}
                </div>
              </div>
              <div class="progress-bar" style="margin:10px 0 3px">
                <div class="progress-fill" :style="{ width: progressPct + '%' }"></div>
              </div>
              <div
                style="display:flex;justify-content:space-between;font-size:10.5px;color:#bbb;margin-bottom:12px">
                <span>{{ store.fmt(0) }}</span>
                <span>{{ store.fmt(store.nisabValue / 2) }}</span>
                <span>{{ store.fmt(store.nisabValue) }} (Nisab)</span>
              </div>
              <!-- Breakdown rows -->
              <div v-for="row in breakdown" :key="row.label"
                   class="brow" :class="{ bd: row.deduct, bt: row.bold, bh: row.highlight }">
                <span class="bl">{{ row.label }}</span>
                <span class="bv">{{
                    row.value > 0 ? (row.deduct ? '−' : '') + store.fmt(row.value) : '—'
                  }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useZakatStore } from '@/stores/zakat.js'
import { useSeo } from '@/composables/useSeo.js'
import GeoPattern from '@/components/GeoPattern.vue'
import ZakatAccordion from '@/components/ZakatAccordion.vue'

useSeo('zakat')

const store = useZakatStore()
const currencies = [
  { code: 'GBP', sym: '£' },
  { code: 'USD', sym: '$' },
  { code: 'EUR', sym: '€' },
  { code: 'SAR', sym:  '﷼'},
]

const fields = reactive({
  cashHome: 0,
  cashCurrent: 0,
  cashSavings: 0,
  cashForeign: 0,
  loansGiven: 0,
  unpaidIncome: 0,
  otherOwed: 0,
  goldGrams: 0,
  goldPurity: 0.9167,
  silverGrams: 0,
  metalsDirect: 0,
  shares: 0,
  isas: 0,
  inventory: 0,
  pension: 0,
  loansDue: 0,
  creditCards: 0,
  bills: 0,
  otherDebts: 0,
})

const cashTotal = computed(() => fields.cashHome + fields.cashCurrent + fields.cashSavings + fields.cashForeign)
const owedTotal = computed(() => fields.loansGiven + fields.unpaidIncome + fields.otherOwed)
const metalsTotal = computed(() => fields.goldGrams * store.goldLocal * fields.goldPurity + fields.silverGrams * store.silverLocal + fields.metalsDirect)
const investTotal = computed(() => fields.shares + fields.isas + fields.inventory + fields.pension)
const debtsTotal = computed(() => fields.loansDue + fields.creditCards + fields.bills + fields.otherDebts)
const gross = computed(() => cashTotal.value + owedTotal.value + metalsTotal.value + investTotal.value)
const net = computed(() => Math.max(0, gross.value - debtsTotal.value))
const zakatDue = computed(() => net.value >= store.nisabValue ? net.value * 0.025 : 0)
const obligated = computed(() => net.value >= store.nisabValue)
const progressPct = computed(() => store.nisabValue > 0 ? Math.min(100, (net.value / store.nisabValue) * 100) : 0)
const breakdown = computed(() => [
  {
    label: 'Cash & savings',
    value: cashTotal.value,
    deduct: false,
    bold: false,
    highlight: false
  },
  {
    label: 'Money owed',
    value: owedTotal.value,
    deduct: false,
    bold: false,
    highlight: false
  },
  {
    label: 'Gold & silver',
    value: metalsTotal.value,
    deduct: false,
    bold: false,
    highlight: false
  },
  {
    label: 'Investments',
    value: investTotal.value,
    deduct: false,
    bold: false,
    highlight: false
  },
  {
    label: 'Gross zakatable',
    value: gross.value,
    deduct: false,
    bold: true,
    highlight: false
  },
  {
    label: 'Less: debts',
    value: debtsTotal.value,
    deduct: true,
    bold: true,
    highlight: false
  },
  {
    label: 'Net zakatable',
    value: net.value,
    deduct: false,
    bold: true,
    highlight: false
  },
  {
    label: 'Zakat due (2.5%)',
    value: zakatDue.value,
    deduct: false,
    bold: true,
    highlight: true
  },
])
</script>

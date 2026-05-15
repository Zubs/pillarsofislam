import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue'
import { useZakatStore } from './stores/zakat.js'

import App from './App.vue'
import router from './router/index.js'

// Global CSS — imported once here, available everywhere
import './assets/css/tokens.css'
import './assets/css/base.css'
import './assets/css/components.css'
import './assets/css/ornament.css'

const app = createApp(App)
const pinia = createPinia()
const head = createHead()

app.use(pinia)
app.use(router)
app.use(head)
app.mount('#app')

const store = useZakatStore()
store.fetchPrices()

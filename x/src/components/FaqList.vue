<template>
  <div class="faq-list">
    <div v-for="(faq, i) in faqs" :key="i" class="faq-item">
      <button class="faq-q" @click="toggle(i)">
        {{ faq.q }}
        <span class="faq-chev" :class="{ open: openIndex === i }">+</span>
      </button>
      <div class="faq-a" :class="{ open: openIndex === i }">{{ faq.a }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({ faqs: { type: Array, required: true }})
const openIndex = ref(null)

function toggle(i) {
  openIndex.value = openIndex.value === i ? null : i
}
</script>

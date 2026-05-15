<template>
  <div class="quran-block" :class="{ 'frame-calligraphy': framed, 'anim-target': animate }">
    <template v-if="framed">
      <div class="corner-ornament top-left" aria-hidden="true"></div>
      <div class="corner-ornament top-right" aria-hidden="true"></div>
      <div class="corner-ornament bottom-left" aria-hidden="true"></div>
      <div class="corner-ornament bottom-right" aria-hidden="true"></div>
    </template>
    <GeoPattern v-else/>
    <div class="quran-arabic" lang="ar">{{ arabic }}</div>
    <div class="quran-ref">{{ reference }}</div>
    <div class="quran-trans">"{{ translation }}"
      <template v-if="note"> — {{ note }}</template>
    </div>
  </div>
</template>

<script setup>
import GeoPattern from './GeoPattern.vue'

defineProps({
  arabic: { type: String, required: true },
  reference: { type: String, required: true },
  translation: { type: String, required: true },
  note: { type: String, default: '' },
  framed: { type: Boolean, default: false },
  animate: { type: Boolean, default: true },
})
</script>

<template>
  <header class="p-1 mb-4">
    <toxicpie-row :row="1"></toxicpie-row>
  </header>
  <main class="grow">
    <palette class="h-full"></palette>
  </main>
  <footer class="p-1 mt-4">
    <toxicpie-row :row="1"></toxicpie-row>
  </footer>
</template>

<script setup lang="ts">
import Palette from '@/components/Palette.vue'
import ToxicpieRow from '@/components/ToxicpieRow.vue'
</script>

<style lang="scss">
@import "@/assets/scss/main";

html,
body {
  @apply h-full bg-zinc-100;
}

#app {
  @apply flex flex-col;

  // https://medium.com/@littleDog/mobile-view-height%E7%9A%84%E9%80%9A%E9%80%8F%E4%B8%96%E7%95%8C-b896ac234ba9
  height: 100%;
  height: -moz-available;
  height: -webkit-fill-available;
  height: stretch;
}
</style>

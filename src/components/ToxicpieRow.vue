<template>
  <div>
    <div class="grid grid-cols-[repeat(12,minmax(0,1fr))] lg:grid-cols-[repeat(20,minmax(0,1fr))] xl:grid-cols-[repeat(28,minmax(0,1fr))]">
      <div v-for="_ in 12 * row" class="p-[4%]">
        <toxicpie></toxicpie>
      </div>
      <div v-for="_ in 8 * row" class="p-[4%] hidden lg:block">
        <toxicpie></toxicpie>
      </div>
      <div v-for="_ in 8 * row" class="p-[4%] hidden xl:block">
        <toxicpie></toxicpie>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Toxicpie from '@/components/Toxicpie.vue'

const props = defineProps({
  row: {
    type: Number,
    default: 1
  }
})
</script>

<style lang="scss">
</style>

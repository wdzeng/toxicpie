<template>
  <div class="flex flex-col lg:flex-row container mx-auto px-4">
    <!-- preview -->
    <div class="p-8 rounded shadow-xl flex justify-center items-center lg:h-full aspect-[4/3] lg:aspect-[3/4]">
      <toxicpie class="h-[160px] sm:h-[210px] md:h-[260px] lg:h-[310px] xl:h-[360px]"></toxicpie>
    </div>
    <!-- palette -->
    <div class="mt-[2rem] lg:mt-0 lg:ml-12 lg:grow">
      <h1 class="text-3xl font-black mb-4 text-center">Toxicpie Generator</h1>
      <!-- target selection -->
      <div class="text-center mb-4">
        <span class="ml-2 mr-2">
          <input type="radio" name="target" value="skin" checked class="mr-1" />
          <label>skin</label>
        </span>
        <span class="mr-2">
          <input type="radio" name="target" value="outline" class="mr-1" />
          <label>outline</label>
        </span>
        <span class="mr-2">
          <input type="radio" name="target" value="skin" class="mr-1" />
          <label>background</label>
        </span>
      </div>
      <!-- color picker -->
      <palette @change="onColorPicked"></palette>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Palette from '@/components/Palette.vue'
import Toxicpie from '@/components/Toxicpie.vue'

function onColorPicked(col: string) {
}
</script>

<style lang="scss">
</style>

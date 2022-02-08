<template>
  <div class="flex flex-col lg:flex-row container mx-auto px-4">
    <!-- preview -->
    <div class="p-8 rounded shadow-xl flex justify-center items-center lg:h-full aspect-[4/3] lg:aspect-[3/4]" :style="{ background: bgColor }">
      <toxicpie class="h-[160px] sm:h-[210px] md:h-[260px] lg:h-[310px] xl:h-[360px]" :skin="skinColor" :outline="outlineColor"></toxicpie>
    </div>
    <!-- palette -->
    <div class="mt-[2rem] lg:mt-0 lg:ml-12 lg:grow">
      <h1 class="text-3xl font-black mb-4 text-center">Toxicpie Generator</h1>
      <!-- target selection -->
      <div class="text-center mb-4">
        <span class="ml-2 mr-2">
          <input type="radio" name="target" value="skin" checked class="mr-1" v-model="target" />
          <label>skin</label>
        </span>
        <span class="mr-2">
          <input type="radio" name="target" value="outline" class="mr-1" v-model="target" />
          <label>outline</label>
        </span>
        <span class="mr-2">
          <input type="radio" name="target" value="background" class="mr-1" v-model="target" />
          <label>background</label>
        </span>
      </div>
      <!-- color picker -->
      <palette id="skin-picker" @change="onColorPicked" :class="{ hidden: target != 'skin' }" :color="toxicBlue"></palette>
      <palette id="outline-picker" @change="onColorPicked" :class="{ hidden: target != 'outline' }" color="#000000"></palette>
      <palette id="background-picker" @change="onColorPicked" :class="{ hidden: target != 'background' }" color="#ffffff"></palette>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Palette from '@/components/Palette.vue'
import Toxicpie from '@/components/Toxicpie.vue'
import { toxicBlue } from '@/utils/color';

const target = ref('skin' as 'skin' | 'outline' | 'background')
const skinColor = ref(toxicBlue)
const outlineColor = ref('#000000')
const bgColor = ref('#ffffff')

function onColorPicked(source: EventTarget, col: string) {
  switch ((source as HTMLElement).id) {
    case 'skin-picker': skinColor.value = col; break;
    case 'outline-picker': outlineColor.value = col; break;
    default: bgColor.value = col; break;
  }
}
</script>

<style lang="scss">
</style>

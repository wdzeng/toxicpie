<template>
  <div class="flex flex-col lg:flex-row container mx-auto px-4">
    <!-- preview -->
    <div class="p-8 rounded shadow-xl flex justify-center items-center lg:h-full :aspect-[22/9] lg:aspect-[3/4] xl:aspect-[1/1]" :style="{ background: bgColor }">
      <toxicpie class="h-[160px] sm:h-[210px] lg:h-[310px] xl:h-[360px]" :skin="skinColor" :outline="outlineColor"></toxicpie>
    </div>
    <!-- control -->
    <div class="mt-[2rem] lg:mt-0 lg:ml-12 grow flex flex-col">
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
      <div class="grow mb-4">
        <palette class="h-full" id="skin-picker" @change="onColorPicked" :class="{ hidden: target != 'skin' }" :color="toxicBlue"></palette>
        <palette class="h-full" id="outline-picker" @change="onColorPicked" :class="{ hidden: target != 'outline' }" color="#000000"></palette>
        <palette class="h-full" id="background-picker" @change="onColorPicked" :class="{ hidden: target != 'background' }" color="#ffffff"></palette>
      </div>
      <!-- button bar -->
      <div class="text-center text-sm md:text-base">
        <button class="btn-download" @click="download(1)">Download Toxicpie</button>
        <button v-if="false" class="btn-download" @click="download(2)">Download 4/3</button>
        <button v-if="false" class="btn-download" @click="download(3)">Download 16/9</button>
      </div>
    </div>

    <!-- download preview -->
    <div :class="{ hidden: !maskOpen }" class="flex items-center justify-center fixed left-0 right-0 bottom-0 top-0 bg-[rgba(0,0,0,0.77)] p-8 lg:p-16" @click="maskOpen = 0">
      <div class="w-full p-4 text-white">
        <h2 class="text-center text-xl font-black mb-4">Right click to download the toxicpie :)</h2>
        <div class="flex items-center justify-center mb-4">
          <div class="w-[256px] h-[256px] flex items-center justify-center" id="canvas-dest" @click.stop></div>
        </div>
        <p class="text-center">Click anywhere to close the popup.</p>
      </div>
    </div>

    <div class="fixed left-[-256px]">
      <div class="p-[32px] w-[256px] h-[256px] flex justify-center items-center" :style="{ background: bgColor }" id="toxicpie-model">
        <toxicpie :skin="skinColor" :outline="outlineColor"></toxicpie>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import html2canvas from 'html2canvas'
import Palette from '@/components/Palette.vue'
import Toxicpie from '@/components/Toxicpie.vue'
import { toxicBlue } from '@/utils/color'

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

const maskOpen = ref(0)
async function download(option: number) {
  maskOpen.value = option
  const wrapper = document.getElementById('canvas-dest') as HTMLDivElement
  wrapper.innerHTML = '<p>Rendering...</p>'
  await new Promise(res => setTimeout(res, 0))

  const m = document.getElementById('toxicpie-model') as HTMLDivElement
  const canvas = await html2canvas(m!, {
    scale: 2,
    width: 256,
    height: 256
  })
  wrapper.innerHTML = '' // remove all child
  wrapper.appendChild(canvas)
}
</script>

<style lang="scss">
.btn-download {
  @apply border rounded px-2 md:px-6 py-2 text-white;
  background: #52a8dd; // toxic blue

  &:hover {
    @apply bg-blue-500;
  }

  &:not(:last-child) {
    @apply mr-1 md:mr-2;
  }
}

.mask {
  @apply fixed top-0 right-0 bottom-0 left-0;
  background: rgba(0, 0, 0, 0.6);
}
</style>

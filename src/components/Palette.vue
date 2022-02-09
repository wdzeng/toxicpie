<template>
  <div ref="root" class="flex flex-col">
    <div class="grow mb-2 flex">
      <color-board class="color-board h-full grow" v-model="boardVal"></color-board>
      <div class="w-1/3 ml-2 grid grid-cols-4 color-blocks">
        <div class="bg-red-300" @click="onBlockClicked"></div>
        <div class="bg-red-400" @click="onBlockClicked"></div>
        <div class="bg-red-500" @click="onBlockClicked"></div>
        <div class="bg-red-600" @click="onBlockClicked"></div>
        <div class="bg-orange-300" @click="onBlockClicked"></div>
        <div class="bg-orange-400" @click="onBlockClicked"></div>
        <div class="bg-orange-500" @click="onBlockClicked"></div>
        <div class="bg-orange-600" @click="onBlockClicked"></div>
        <div class="bg-yellow-300" @click="onBlockClicked"></div>
        <div class="bg-yellow-400" @click="onBlockClicked"></div>
        <div class="bg-yellow-500" @click="onBlockClicked"></div>
        <div class="bg-yellow-600" @click="onBlockClicked"></div>
        <div class="bg-green-300" @click="onBlockClicked"></div>
        <div class="bg-green-400" @click="onBlockClicked"></div>
        <div class="bg-green-500" @click="onBlockClicked"></div>
        <div class="bg-green-600" @click="onBlockClicked"></div>
        <div class="bg-cyan-300" @click="onBlockClicked"></div>
        <div class="bg-cyan-400" @click="onBlockClicked"></div>
        <div class="bg-cyan-500" @click="onBlockClicked"></div>
        <div class="bg-cyan-600" @click="onBlockClicked"></div>
        <div class="bg-blue-300" @click="onBlockClicked"></div>
        <div class="bg-blue-400" @click="onBlockClicked"></div>
        <div class="bg-blue-500" @click="onBlockClicked"></div>
        <div class="bg-blue-600" @click="onBlockClicked"></div>
        <div class="bg-purple-300" @click="onBlockClicked"></div>
        <div class="bg-purple-400" @click="onBlockClicked"></div>
        <div class="bg-purple-500" @click="onBlockClicked"></div>
        <div class="bg-purple-600" @click="onBlockClicked"></div>
        <div class="bg-pink-300" @click="onBlockClicked"></div>
        <div class="bg-pink-400" @click="onBlockClicked"></div>
        <div class="bg-pink-500" @click="onBlockClicked"></div>
        <div class="bg-pink-600" @click="onBlockClicked"></div>
        <div class="bg-white" @click="onBlockClicked"></div>
        <div class="bg-neutral-300" @click="onBlockClicked"></div>
        <div class="bg-neutral-400" @click="onBlockClicked"></div>
        <div class="bg-neutral-500" @click="onBlockClicked"></div>
        <div class="bg-neutral-600" @click="onBlockClicked"></div>
        <div class="bg-neutral-700" @click="onBlockClicked"></div>
        <div class="bg-neutral-800" @click="onBlockClicked"></div>
        <div class="bg-black" @click="onBlockClicked"></div>

        <div v-for="(col, i) in customColors" :id="'block-custom-' + i" :style="{ background: col.value }" @click="onBlockClicked" :blockname="col.name"></div>
      </div>
    </div>
    <div class="flex">
      <color-bar v-model="barVal" class="grow"></color-bar>
      <div class="w-1/3 ml-2 text-center font-mono items-center justify-center flex">{{ colorName }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, toRef, watch, computed } from 'vue'
import ColorBoard from '@/components/ColorBoard.vue'
import ColorBar from '@/components/ColorBar.vue'
import { getSourceValue, getDestColor, getColorBarColor } from '@/utils/palette'
import { getRgb, toRgb, toxicBlue } from '@/utils/color'

const customColors = [
  { name: '克崴藍', value: toxicBlue },
  { name: '小凡藍', value: '#89d5fe' },
  { name: '培勳灰', value: '#707070' },
  { name: '白羊白', value: '#f7f5f6' }
]

const props = defineProps({
  color: {
    type: String,
    default: toxicBlue
  }
})
const emit = defineEmits<{
  (eventName: 'change', source: EventTarget, value: string): any
}>()

const root = ref(null as any as HTMLElement)
const barVal = ref(0)
const boardVal = ref(255)
function updateBoardBasicColor(bar: number = barVal.value) {
  const colorStr = toRgb(getColorBarColor(bar))
  const elBoard = root.value.querySelector('.color-board') as HTMLElement
  elBoard.style.background = `linear-gradient(transparent, black), linear-gradient(90deg, white, ${colorStr})`
}

function updateColor(value: string = props.color) {
  const res = getSourceValue(value)
  barVal.value = res.bar
  boardVal.value = res.board
}

let blockHold = 0
let lastClickedBlock: undefined | HTMLElement = undefined

watch(toRef(props, 'color'), (x) => {
  updateColor(x)
})
watch(barVal, value => {
  updateBoardBasicColor(value)
  const col = toRgb(getDestColor(value, boardVal.value))

  if (blockHold > 0) {
    blockHold--
  }
  else {
    if (lastClickedBlock) {
      lastClickedBlock.style.borderColor = 'transparent'
      lastClickedBlock = undefined
    }
    colorName.value = col
  }

  emit('change', root.value, toRgb(getDestColor(value, boardVal.value)))
})
watch(boardVal, value => {
  const col = toRgb(getDestColor(barVal.value, value))

  if (blockHold > 0) {
    blockHold--
  }
  else {
    if (lastClickedBlock) {
      lastClickedBlock.style.borderColor = 'transparent'
      lastClickedBlock = undefined
    }
    colorName.value = col
  }

  emit('change', root.value, col)
})

function onBlockClicked(e: MouseEvent) {
  const el = e.target as HTMLDivElement
  if (el === lastClickedBlock) return

  const bg = toRgb(getRgb(getComputedStyle(el).backgroundColor))
  el.style.borderColor = 'black'
  if (lastClickedBlock) {
    lastClickedBlock.style.borderColor = 'transparent'
  }
  lastClickedBlock = el
  blockHold = 2

  const res = getSourceValue(bg)
  barVal.value = res.bar
  boardVal.value = res.board
  colorName.value = el.getAttribute('blockname') || bg
  emit('change', root.value, bg)
}

onMounted(() => {
  document.getElementById('block-custom-0')!.click()
  updateColor()
})

const colorName = ref(props.color)
</script>

<style lang="scss">
.color-blocks {
  & > div {
    @apply border-transparent border-2;
  }
}
</style>

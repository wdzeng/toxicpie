<template>
  <div ref="root">
    <color-board v-model="boardVal" class="h-24 mb-2"></color-board>
    <color-bar v-model="barVal"></color-bar>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, toRef, watch } from 'vue'
import ColorBoard from '@/components/ColorBoard.vue'
import ColorBar from '@/components/ColorBar.vue'
import { getSourceValue, getDestColor, getColorBarColor } from '@/utils/palette'
import { toRgb, toxicBlue } from '@/utils/color'

const props = defineProps({
  color: {
    type: String,
    default: toxicBlue
  }
})
const emit = defineEmits(['change'])
const barVal = ref(180)
const boardVal = ref(255)

const root = ref(null as any as HTMLElement)
function updateBoardBasicColor(bar: number = barVal.value) {
  const colorStr = toRgb(getColorBarColor(bar))
  const elBoard = root.value.firstChild as HTMLElement
  elBoard.style.background = `linear-gradient(transparent, black), linear-gradient(90deg, white, ${colorStr})`
}

function updateColor(value: string = props.color) {
  const res = getSourceValue(value)
  barVal.value = res.bar
  boardVal.value = res.board
}

watch(toRef(props, 'color'), updateColor)
watch(barVal, value => {
  updateBoardBasicColor(value)
  emit('change', toRgb(getDestColor(value, boardVal.value)))
})
watch(boardVal, value => {
  emit('change', toRgb(getDestColor(barVal.value, value)))
})

onMounted(() => updateColor())
</script>

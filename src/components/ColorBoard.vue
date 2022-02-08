<template>
  <div class="p-[6px]">
    <div ref="root" class="color-board h-full" @mousedown="trackFlag = true" @click="update">
      <div class="point" :style="{ right: briStyle, bottom: satStyle }"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { getColorBoardColor } from '@/utils/palette'
import { getRgb, toRgb } from '@/utils/color'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 255
  }
})
const emit = defineEmits(['update:modelValue'])

const bri = computed(() => Math.max(0, Math.min(1, (props.modelValue >> 8) / 0xff)))
const sat = computed(() => Math.max(0, Math.min(1, (props.modelValue & 0xff) / 0xff)))
const briStyle = computed(() => {
  return `calc(${(bri.value * 100).toFixed(2)}% - 6px)`
})
const satStyle = computed(() => {
  return `calc(${(sat.value * 100).toFixed(2)}% - 6px)`
})
const root = ref(null as any as HTMLDivElement)

const trackFlag = ref(false)
function update(e: MouseEvent) {
  const rect = root.value.getBoundingClientRect();
  const x = e.clientX - rect.left; // x position within the element.
  const y = e.clientY - rect.top;  // y position within the element.
  const b = Math.max(0, Math.min(255, Math.round(255 * (rect.width - x) / rect.width)))
  const s = Math.max(0, Math.min(255, Math.round(255 * (rect.height - y) / rect.height)))
  emit('update:modelValue', b << 8 | s)
}
function onDrag(e: MouseEvent) {
  trackFlag.value && update(e)
}
function onDocMouseup() {
  trackFlag.value = false
}
onMounted(() => {
  document.addEventListener('mouseup', onDocMouseup)
  document.addEventListener('mousemove', onDrag)
})
onUnmounted(() => {
  document.removeEventListener('mouseup', onDocMouseup)
  document.removeEventListener('mousemove', onDrag)
})
</script>

<style lang="scss">
.color-board {
  @apply relative;

  background: linear-gradient(transparent, black),
    linear-gradient(90deg, white, currentColor);

  .point {
    @apply absolute h-[12px] w-[12px] rounded-full border-white border;
  }
}
</style>

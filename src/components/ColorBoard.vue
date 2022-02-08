<template>
  <div ref="root" class="relative" @mousedown="trackFlag = true" @click="update">
    <div class="absolute h-[12px] w-[12px] rounded-full border-white border" :style="{ right: briStyle, bottom: satStyle }"></div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { round } from '@/utils/color'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 255
  }
})
const emit = defineEmits(['update:modelValue'])

const bri = computed(() => round(props.modelValue >> 8) / 0xff)
const sat = computed(() => round(props.modelValue & 0xff) / 0xff)
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
  const b = round(255 * (rect.width - x) / rect.width)
  const s = round(255 * (rect.height - y) / rect.height)
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

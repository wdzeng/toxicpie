<template>
  <div class="color-bar">
    <input ref="input" type="range" min="0" max="1535" :value="modelValue" @change="onChange" @input="onInput" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { toRgb } from '@/utils/color'
import { getColorBarColor } from '@/utils/palette'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update:modelValue'])
const input = ref(null as any as HTMLInputElement)

function updateThumbColor(inputVal: number) {
  input.value.style.color = toRgb(getColorBarColor(inputVal))
}

function onChange(e: Event) {
  const input = e.target as HTMLInputElement
  const inputVal = +input.value
  emit('update:modelValue', inputVal)
}

function onInput(e: Event) {
  const input = e.target as HTMLInputElement
  const inputVal = +input.value
  updateThumbColor(inputVal)
}

onMounted(() => updateThumbColor(props.modelValue))
</script>

<style lang="scss">
.color-bar {
  padding-top: 14px;
  padding-bottom: 14px;

  input {
    display: block;
    position: relative;
    width: 100%;
    height: 4px;
    background-color: rgba(0, 0, 0, 0.1);
    appearance: none;
    outline: none;
    transition: color 0.05s linear;
    background: linear-gradient(
      to right,
      rgb(255, 0, 0),
      rgb(255, 255, 0),
      rgb(0, 255, 0),
      rgb(0, 255, 255),
      rgb(0, 0, 255),
      rgb(255, 0, 255),
      rgb(255, 0, 0)
    );

    &:focus {
      outline: none;
    }

    &:active,
    &:hover:active {
      cursor: grabbing;
      cursor: -webkit-grabbing;
    }

    &::-moz-range-track,
    &::-ms-track {
      appearance: none;
      opacity: 0;
      outline: none !important;
    }

    &::-webkit-slider-thumb {
      height: 32px;
      width: 15px;
      // border-radius: 2em;
      appearance: none;
      background: currentColor;
      cursor: pointer;
      cursor: move;
      cursor: grab;
      cursor: -webkit-grab;
      // border: 2px solid currentColor;
      transition: border 0.1s ease-in-out, box-shadow 0.2s ease-in-out,
        transform 0.1s ease-in-out;
      box-shadow: 0 0.4em 1em rgba(0, 0, 0, 0.15);

      &:active,
      &:hover:active {
        cursor: grabbing;
        cursor: -webkit-grabbing;
      }
    }

    &::-moz-range-thumb {
      height: 32px;
      width: 15px;
      appearance: none;
      background: currentColor;
      cursor: pointer;
      cursor: move;
      cursor: grab;
      cursor: -webkit-grab;
      transition: box-shadow 0.2s ease-in-out, transform 0.1s ease-in-out;
      box-shadow: 0 1px 11px rgba(0, 0, 0, 0);

      &:active,
      &:hover:active {
        cursor: grabbing;
        cursor: -webkit-grabbing;
      }
    }
  }
}
</style>

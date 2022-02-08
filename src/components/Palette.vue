<template>
  <div class="flex flex-col lg:flex-row container mx-auto px-4">
    <!-- preview -->
    <div class="lg:grow">
      <div class="p-10 rounded shadow-xl flex justify-center items-center lg:h-full">
        <toxicpie class="h-[160px] sm:h-[210px] md:h-[260px] lg:h-[310px] xl:h-[360px]"></toxicpie>
      </div>
    </div>
    <!-- palette -->
    <div class="px-4 lg:w-[40%] mt-[2rem] lg:mt-0">
      <h1 class="text-3xl font-black text-center">Toxicpie Generator</h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Toxicpie from '@/components/Toxicpie.vue'
</script>

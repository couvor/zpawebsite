<template>
  <Motion
    :initial="{ opacity: 0, y: 20 }"
    :in-view="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.75, delay, easing: [0.22, 1, 0.36, 1] }"
    class="w-full"
  >
    <slot />
  </Motion>
</template>

<script setup>
import { Motion } from '@motionone/vue'

defineProps({
  delay: {
    type: Number,
    default: 0
  }
})
</script>

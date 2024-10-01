<script setup>
import ThreeRenderer from './ThreeRenderer.vue'
import ThreeEffects from './ThreeEffects.vue'
import ThreeCirclesGroup from './ThreeCirclesGroup.vue'
import ThreeSparks from './ThreeSparks.vue'
import { ref, watch } from 'vue'

const renderer = ref(null)
const effects = ref(null)
</script>

<template>
  <div :style="{ opacity: 1 }" class="three-canvas">
    <ThreeRenderer ref="renderer" />
    <ThreeEffects ref="effects" :renderer="renderer" :addTo="renderer?.scene" />
    <ThreeCirclesGroup :addTo="effects?.scene" />
    <ThreeSparks :renderer="renderer" :index="0" :addTo="effects?.scene" />
    <ThreeSparks :renderer="renderer" :index="1" :addTo="effects?.scene" />
    <ThreeSparks :renderer="renderer" :index="2" :addTo="effects?.scene" />
  </div>
</template>

<style lang="scss" scoped>
.three-canvas {
  opacity: 0;
  transition: opacity 4s linear;
  transition-delay: 5s;
}
</style>

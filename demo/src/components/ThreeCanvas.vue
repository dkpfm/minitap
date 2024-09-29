<script setup>
import ThreeRenderer from './ThreeRenderer.vue'
import ThreeEffects from './ThreeEffects.vue'
import ThreeCirclesGroup from './ThreeCirclesGroup.vue'
import { ref, watch } from 'vue'

const renderer = ref(null)
const effects = ref(null)
</script>

<template>
  <div class="three-canvas">
    <ThreeRenderer ref="renderer" />
    <ThreeEffects ref="effects" :renderer="renderer" :addTo="renderer?.scene" />
    <ThreeCirclesGroup :addTo="effects?.scene" />
  </div>
</template>

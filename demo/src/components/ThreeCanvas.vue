<script setup>
import ThreeRenderer from './ThreeRenderer.vue'
import ThreeEffects from './ThreeEffects.vue'
import ThreeCirclesGroup from './ThreeCirclesGroup.vue'
import { ref, watch } from 'vue'

const renderer = ref(null)
const effects = ref(null)
</script>

<template>
  <ThreeRenderer ref="renderer" />
  <ThreeEffects ref="effects" :renderer="renderer" :addTo="renderer?.scene" />
  <ThreeCirclesGroup :addTo="effects?.scene" />
</template>

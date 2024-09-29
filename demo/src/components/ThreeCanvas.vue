<script setup>
import ThreeRenderer from './ThreeRenderer.vue'
import ThreeCirclesGroup from './ThreeCirclesGroup.vue'
import { ref, watch } from 'vue'

const renderer = ref(null)
</script>

<template>
  <ThreeRenderer ref="renderer" />
  <ThreeCirclesGroup :addTo="renderer?.scene" />
</template>

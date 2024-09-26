<script setup>
import _ from 'underscore'
import gsap from 'gsap'
import { ref, computed, onMounted } from 'vue'
import { Color } from 'three'

const color = new Color()
const hsl = [_.sample([0.6]), 0.4, 0.6]
const colorHex = ref('#' + color.getHexString())

onMounted(() => {
  gsap.to(hsl, {
    1: 0,
    2: 0.7,
    duration: 0.7,
    ease: 'sine.out',
    onUpdate: () => {
      color.setHSL(hsl[0], hsl[1], hsl[2])
      colorHex.value = '#' + color.getHexString()
    }
  })
})
</script>

<template>
  <TresMesh>
    <TresCircleGeometry :args="[1, 32 * 2]" />
    <TresMeshBasicMaterial :color="colorHex" :toneMapped="false" />
  </TresMesh>
</template>

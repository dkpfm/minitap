<script setup>
import { onMounted, inject } from 'vue'
import ThreeCanvas from './components/ThreeCanvas.vue'

const physics = inject('physics')

onMounted(() => {
  window.addEventListener('message', ({ data }) => {
    if (data.name === 'mt-channel0-on') {
      // hsl = [0.2, 0.6, 0]
      // gsap.to(hsl, {
      //   1: 0,
      //   2: 0.6,
      //   duration: 1.5,
      //   ease: 'power2.out',
      //   onUpdate: () => {
      //     color.setHSL(hsl[0], hsl[1], hsl[2])
      //     colorHex.value = '#' + color.getHexString()
      //   }
      // })
    }
    if (data.name === 'mt-channel1-on') {
      physics.spawn({ remove: true })
      physics.spawn({ remove: true })
      physics.spawn({ remove: true })
    }
  })
})
</script>

<template>
  <ThreeCanvas />
</template>

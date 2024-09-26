<script setup>
import _ from 'underscore'
import { TresCanvas } from '@tresjs/core'
import CirclesGroup from './components/CirclesGroup.vue'

import gsap from 'gsap'
import { inject, ref } from 'vue'
import { Color } from 'three'

const physics = inject('physics')

const color = new Color()
let hsl = [0, 0, 0]
const colorHex = ref('#' + color.getHexString())

window.addEventListener('message', ({ data }) => {
  if (data.name === 'mt-channel0-on') {
    hsl = [0.2, 0.6, 0]
    gsap.to(hsl, {
      1: 0,
      2: 0.6,
      duration: 1.5,
      ease: 'power2.out',
      onUpdate: () => {
        color.setHSL(hsl[0], hsl[1], hsl[2])
        colorHex.value = '#' + color.getHexString()
      }
    })
  }
})
</script>

<template>
  <TresCanvas :clear-color="colorHex" window-size>
    <TresOrthographicCamera :position="[0, 0, 3]" :look-at="[0, 0, 0]" />
    <CirclesGroup :physics="physics" />
  </TresCanvas>
</template>

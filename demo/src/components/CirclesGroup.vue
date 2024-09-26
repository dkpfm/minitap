<script setup>
import { ref, inject, defineProps } from 'vue'
import { useLoop } from '@tresjs/core'

import Circle from './Circle.vue'

const props = defineProps(['physics'])
console.log(props.physics)

const rotation = ref(0)
const { onBeforeRender } = useLoop()
onBeforeRender(() => {
  rotation.value += 0.002
})
// console.log(useLoop)
// const physics = inject('physics')
</script>

<template>
  <TresGroup :scale="0.75" :rotation="[0, 0, rotation]">
    <Circle
      :position="[circle.pos.x, circle.pos.y, 0]"
      :scale="[circle.scale, circle.scale, circle.scale]"
      :key="circle.id"
      v-for="circle in props.physics.circlesState.value"
    />
  </TresGroup>
</template>

<script setup>
import _ from 'underscore'
import { ref, inject } from 'vue'
import { TresCanvas } from '@tresjs/core'

const width = 2000
const height = 800
const cols = 10
const rows = 5

const physics = inject('physics')
// const circles = ref(
//   _.flatten(
//     _.range(cols).map((x) =>
//       _.range(rows).map((y) => {
//         return {
//           pos: {
//             x: -width / 2 + (width / (cols - 1)) * x,
//             y: -height / 2 + (height / (rows - 1)) * y
//           },
//           scale: 100
//         }
//       })
//     )
//   )
// )
// console.log(physics.circlesState.value)
</script>

<template>
  <TresCanvas clear-color="#ECECF0" window-size>
    <TresOrthographicCamera :position="[0, 0, 3]" :look-at="[0, 0, 0]" />
    <TresGroup :scale="0.75">
      <TresMesh
        :position="[circle.pos.x, circle.pos.y, 0]"
        :scale="[circle.scale, circle.scale, circle.scale]"
        :key="circle.id"
        v-for="circle in physics.circlesState.value"
      >
        <TresCircleGeometry :args="[1, 32 * 2]" />
        <TresMeshBasicMaterial color="#D6D6D9" />
      </TresMesh>
    </TresGroup>
  </TresCanvas>
</template>

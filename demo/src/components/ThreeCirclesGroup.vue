<script setup>
import * as THREE from 'three'
import { ref, watch, defineProps, inject, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { useRafFn } from '@vueuse/core'

const props = defineProps(['addTo'])

const physics = inject('physics')

const group = new THREE.Group()
group.name = 'Circles'
watch(
  () => props.addTo,
  (addTo) => {
    if (addTo) {
      addTo.add(group)
    }
  },
  { immediate: true }
)

let circlesPool = []
const baseGray = new THREE.Color('#E0E0E4')
const yellow = new THREE.Color('#D9FF64')

function allocCircle() {
  const free = circlesPool.find((c) => c.userData.free)
  if (free) {
    free.userData.free = false
    group.add(free)
    return free
  } else {
    const c = new THREE.Mesh(
      new THREE.CircleGeometry(1, 64),
      new THREE.MeshBasicMaterial({ transparent: true, color: baseGray })
    )
    group.add(c)
    circlesPool.push(c)
    return c
  }
}
function freeCircle(c) {
  c.userData.free = true
  group.remove(c)
}

watch(physics.circlesState, (circlesState) => {
  circlesState.forEach((data) => {
    let c = group.children.find((c) => c.userData.id === data.id)
    if (!c) {
      c = allocCircle()
      c.userData.id = data.id
      c.userData.flash = data.highlight ? 1 : 0
      c.userData.opacity = data.highlight ? 1 : 0
      if (c.userData.flash > 0) {
        gsap.to(c.userData, {
          flash: 0,
          ease: 'sine.out',
          onUpdate: () => {
            c.material.color.copy(baseGray).lerp(yellow, c.userData.flash)
          }
        })
      }
      if (c.userData.opacity < 1) {
        gsap.to(c.userData, {
          opacity: 1,
          ease: 'sine.out',
          duration: 2,
          onUpdate: () => {
            c.material.opacity = c.userData.opacity
          }
        })
      }
    }
    c.position.x = data.pos.x
    c.position.y = data.pos.y
    c.scale.setScalar(data.scale)
  })
  const removed = []
  group.children.find((obj) => {
    const data = circlesState.find((d) => d.id === obj?.userData.id)
    if (!data) removed.push(obj)
  })
  removed.forEach(freeCircle)
})

const audio = inject('audio')

let rotationVel = 1
let fwdOn = false
let bwdOn = false
function onMessage({ data }) {
  if (data.name === 'mt-channel2-on') {
    fwdOn = true
    audio.triggerFwdSound()
  }
  if (data.name === 'mt-channel2-off') {
    fwdOn = false
    audio.stopFwdSound()
  }

  if (data.name === 'mt-channel3-on') {
    bwdOn = true
    audio.triggerBwdSound()
  }
  if (data.name === 'mt-channel3-off') {
    bwdOn = false
    audio.stopBwdSound()
  }
}
onMounted(() => {
  window.addEventListener('message', onMessage)
})
onUnmounted(() => {
  window.removeEventListener('message', onMessage)
})

useRafFn(({ delta }) => {
  let rotationTarget = fwdOn ? 25 : 1
  rotationTarget += bwdOn ? -25 : 0
  rotationVel += (rotationTarget - rotationVel) * 0.01 * delta
  group.rotation.z += 0.0001 * rotationVel * delta
})
onUnmounted(() => {
  group.parent.remove(group)
  circlesPool = []
})
</script>

<template></template>

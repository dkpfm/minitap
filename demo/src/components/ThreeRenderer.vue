<script setup>
import * as THREE from 'three'
import { watch, ref, shallowRef, onMounted, defineExpose } from 'vue'
import { useWindowSize, useRafFn } from '@vueuse/core'

const canvasElement = ref(null)
const instance = shallowRef(null)

onMounted(() => {
  instance.value = new THREE.WebGLRenderer({
    canvas: canvasElement.value,
    powerPreference: 'high-performance',
    antialias: false,
    stencil: false,
    depth: false
  })
  // instance.autoClear = false
  instance.value.setClearColor(0xececf0, 1)
  instance.value.outputColorSpace = THREE.SRGBColorSpace
})

const scene = new THREE.Scene()
const camera = new THREE.OrthographicCamera()
const pixelRatio = ref(2)

camera.position.set(0, 0, 200)
camera.lookAt(0, 0, 0)

const { width, height } = useWindowSize()

watch(
  () => [instance.value, width.value, height.value, pixelRatio.value],
  ([instance, width, height, pixelRatio]) => {
    if (!instance) return
    instance.setSize(width, height)
    instance.setPixelRatio(pixelRatio)
    camera.left = -width / 2
    camera.right = width / 2
    camera.top = height / 2
    camera.bottom = -height / 2
    camera.updateProjectionMatrix()
  },
  { immediate: true }
)

const tick = useRafFn(() => {
  instance.value.clear()
  instance.value.render(scene, camera)
})

defineExpose({ instance, scene, camera })
</script>

<template>
  <canvas ref="canvasElement" />
</template>

<style lang="scss" scoped>
canvas {
  position: fixed;
  top: 0;
  left: 0;
}
</style>

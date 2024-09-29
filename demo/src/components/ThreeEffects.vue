<script setup>
import * as THREE from 'three'
import ThreeRenderer from './ThreeRenderer.vue'
import ThreeCirclesGroup from './ThreeCirclesGroup.vue'
import { ref, watch, defineExpose, onMounted, onUnmounted } from 'vue'
import { useWindowSize } from '@vueuse/core'

const props = defineProps(['renderer', 'addTo'])

const target = new THREE.WebGLRenderTarget(1, 1)
const scene = new THREE.Scene()
const camera = new THREE.OrthographicCamera()
const mesh = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1),
  new THREE.ShaderMaterial({
    uniforms: {
      map: { value: target.texture },
      pixelAmount: { value: 0 },
      resolution: { value: new THREE.Vector2() },
      flash: { value: 0 }
    },
    vertexShader: /*glsl */ `
      #include <common>
      varying vec2 vUv;

      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        vUv = uv;
      }
    `,
    fragmentShader: /*glsl */ `
      uniform sampler2D map;
      uniform float pixelAmount;
      uniform vec2 resolution;
      uniform float flash;
      varying vec2 vUv;

      void main() {
        vec2 uv = vUv;
        if (pixelAmount > 0.001) {
          float aspect = resolution.x / resolution.y;
          vec2 pUv = vUv;
          pUv -= 0.5;
          pUv = round(pUv / vec2(pixelAmount / aspect, pixelAmount)) *  vec2(pixelAmount / aspect, pixelAmount);
          pUv += 0.5;
          uv = pUv;
        }
        vec4 color = texture2D(map, uv);
        color.rgb = mix(color.rgb, vec3(1.0), flash);
        gl_FragColor = color;
        #include <colorspace_fragment>
      }

    `
  })
)

camera.position.set(0, 0, 200)
camera.lookAt(0, 0, 0)

const { width, height } = useWindowSize()

watch(
  () => [width.value, height.value, props.renderer?.pixelRatio],
  ([width, height, pixelRatio]) => {
    target.setSize(width * pixelRatio, height * pixelRatio)
    camera.left = -width / 2
    camera.right = width / 2
    camera.top = height / 2
    camera.bottom = -height / 2
    camera.updateProjectionMatrix()
    mesh.scale.set(width, height, 1)
    mesh.material.uniforms.resolution.value.set(width, height)
    // mesh.scale.set(100, 100, 100)
  },
  { immediate: true }
)

watch(
  () => props.addTo,
  (addTo) => {
    if (addTo) {
      addTo.add(mesh)
    }
  },
  { immediate: true }
)

let pixelAmount = 0
let pixelOn = false
let pixelXLOn = false
let flashAmount = 0
onMounted(() => {
  window.addEventListener('message', ({ data }) => {
    if (data.name === 'mt-channel0-on') {
      flashAmount = 1
    }
    if (data.name === 'mt-channel4-on') {
      pixelOn = true
    }
    if (data.name === 'mt-channel4-off') {
      pixelOn = false
    }
    if (data.name === 'mt-channel5-on') {
      pixelXLOn = true
    }
    if (data.name === 'mt-channel5-off') {
      pixelXLOn = false
    }
  })
})

function tick({ delta }) {
  let pixelTarget = pixelOn ? 0.02 : 0
  pixelTarget = pixelXLOn ? 0.1 : pixelTarget
  pixelAmount += (pixelTarget - pixelAmount) * 0.02 * delta
  mesh.material.uniforms.pixelAmount.value = pixelAmount
  //
  flashAmount -= flashAmount * 0.005 * delta
  mesh.material.uniforms.flash.value = flashAmount
  //
  props.renderer.instance.setRenderTarget(target)
  props.renderer.instance.render(scene, camera)
  props.renderer.instance.setRenderTarget(null)
}
watch(
  () => props.renderer,
  (renderer) => {
    props.renderer?.offBeforeRender(tick)
    props.renderer?.onBeforeRender(tick)
  },
  { immediate: true }
)

onUnmounted(() => {
  props.renderer?.offBeforeRender(tick)
})

defineExpose({
  scene
})
</script>

<template></template>

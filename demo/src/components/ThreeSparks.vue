<script setup>
import _ from 'underscore'
import * as THREE from 'three'
import { ref, watch, defineProps, onMounted, onUnmounted, inject } from 'vue'

const props = defineProps(['renderer', 'addTo', 'index'])

let active = false
const colors = [
  '#0100FE',
  '#3E3F3E',
  '#FA026C',
  '#0285FA',
  '#FD0105',
  '#270000',
  '#43007A',
  '#017C02',
  '#FD708E',
  '#FDFF8D',
  '#F8CB05'
]

const group = new THREE.Group()
group.name = 'Sparks'
watch(
  () => props.addTo,
  (addTo) => {
    if (addTo) {
      addTo.add(group)
    }
  },
  { immediate: true }
)

const helper = new THREE.Mesh(
  new THREE.CircleGeometry(10),
  new THREE.MeshBasicMaterial({ color: 'blue', visible: false })
)
helper.renderOrder = 3
group.add(helper)

// Sparks
let colorIndex
function setRandomColorIndex() {
  colorIndex = Math.round(Math.random() * colors.length)
}
setRandomColorIndex()

const matrix = new THREE.Matrix4()
const color = new THREE.Color('blue')
const white = new THREE.Color().setHex(0xffffff)
const sparksData = _.range(1000).map((i) => {
  return {
    id: i,
    visible: false,
    color: 'blue',
    scale: 1 + Math.random() * 0.5,
    x: (Math.random() - 0.5) * 1000,
    y: (Math.random() - 0.5) * 1000,
    colorIndex
  }
})

const sparks = new THREE.InstancedMesh(
  new THREE.PlaneGeometry(5, 5),
  new THREE.MeshBasicMaterial({ depthTest: false }),
  sparksData.length
)
sparks.renderOrder = 2
sparks.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
group.add(sparks)

function updateSparks() {
  sparksData.forEach((data, i) => {
    matrix.identity()
    const s = data.visible ? data.scale : 0
    matrix.makeScale(s, s, s)
    matrix.setPosition(data.x, data.y, 0)
    sparks.setMatrixAt(i, matrix)
    sparks.setColorAt(i, color.set(colors[data.colorIndex]))
    sparks.instanceMatrix.needsUpdate = true
    sparks.instanceColor.needsUpdate = true
  })
}

updateSparks()

// Loop

const dir = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, 0)
dir.normalize()
const v = new THREE.Vector3()
let t = 0
function tick({ delta }) {
  t += delta

  // update helper position
  // v.copy(dir).multiplyScalar(delta)
  // helper.position.add(v)
  // const { width, height } = props.renderer.instance.domElement
  // if (Math.abs(helper.position.x) > width / 4) {
  //   dir.x *= -1
  // }
  // if (Math.abs(helper.position.y) > height / 4) {
  //   dir.y *= -1
  // }

  const pathA =
    t * (0.0012 + props.index * 0.00001) * Math.sign((props.index % 2) - 0.5)
  const pathR = 200 + 200 * Math.cos(t * 0.001 * props.index - t * 0.000002)
  helper.position.x =
    2 * (pathR + props.index * 100) * Math.sin(pathA + props.index * 2.436)
  helper.position.y =
    (pathR + props.index * 100) * Math.cos(pathA + props.index * 2.436)

  // sparks
  const frees = []
  let i = 0
  const r = 0.02 * (200 + 150 * Math.cos(t * 0.0001 + props.index))
  while (active && frees.length < Math.round(2 * r) && i < sparksData.length) {
    if (!sparksData[i].visible) {
      sparksData[i].visible = true
      frees.push(sparksData[i])
    }
    i++
  }

  frees.forEach((data) => {
    const a = Math.random() * Math.PI * 2
    const rr = r * Math.random()
    data.x = helper.position.x + rr * Math.cos(a)
    data.y = helper.position.y + rr * Math.sin(a)
    data.colorIndex = colorIndex
    setTimeout(
      () => {
        data.visible = false
      },
      200 + Math.random() * 200
    )
  })
  updateSparks()
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

const audio = inject('audio')
let to
function onMessage({ data }) {
  if (data.name === 'mt-channel7-on') {
    t += Math.random() * 3743.3483
    setRandomColorIndex()
    active = true
    clearTimeout(to)
    audio.triggerBleep()
    to = setTimeout(() => (active = false), 400)
  }
}
onMounted(() => {
  window.addEventListener('message', onMessage)
})
onUnmounted(() => {
  window.removeEventListener('message', onMessage)
})
</script>

<template></template>

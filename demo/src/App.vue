<script setup>
import { onMounted, onUnmounted, inject } from 'vue'
import ThreeCanvas from './components/ThreeCanvas.vue'

const physics = inject('physics')
const audio = inject('audio')

function onMessage({ data }) {
  if (data.name === 'mt-channel1-on') {
    physics.spawn({ remove: true })
    physics.spawn({ remove: true })
    physics.spawn({ remove: true })
    audio.triggerBubble()
  }
}
onMounted(() => {
  window.addEventListener('message', onMessage)
})
onUnmounted(() => {
  window.removeEventListener('message', onMessage)
})
</script>

<template>
  <ThreeCanvas />
</template>

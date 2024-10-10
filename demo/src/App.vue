<script setup>
import { onMounted, onUnmounted, inject, defineProps } from 'vue'
import ThreeCanvas from './components/ThreeCanvas.vue'

const props = defineProps({ active: { default: true } })

const physics = inject('physics')
const audio = inject('audio')

function onMessage({ data }) {
  if (data.name === 'mt-channel1-on') {
    physics.spawn({ remove: true, highlight: true })
    physics.spawn({ remove: true, highlight: true })
    physics.spawn({ remove: true, highlight: true })
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
  <ThreeCanvas :active="props.active" />
</template>

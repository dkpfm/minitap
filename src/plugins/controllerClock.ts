import { ref } from 'vue'

const bpm = ref(120)
const currentBeat = ref(0)
const isPlaying = ref(false)
const stepsPerBar = ref(4)
let lastTimestamp = 0
let animationFrameId = null

const start = () => {
  const tick = (timestamp) => {
    const deltaTime = timestamp - lastTimestamp
    const beatInterval = (60 / bpm.value) * 1000

    if (deltaTime >= beatInterval) {
      update()
      lastTimestamp = timestamp
    }

    if (isPlaying.value) {
      animationFrameId = requestAnimationFrame(tick)
    }
  }

  lastTimestamp = performance.now()
  animationFrameId = requestAnimationFrame(tick)
}

const stop = () => {
  cancelAnimationFrame(animationFrameId)
}

const update = () => {
  window.parent.postMessage({ name: 'mt-beat' }, '*')
  currentBeat.value = currentBeat.value + 1
}

const toggle = () => {
  if (isPlaying.value) {
    stop()
  } else {
    start()
  }
  isPlaying.value = !isPlaying.value
}

// onMounted(() => {
//   startClock()
// })

// onUnmounted(() => {
//   stopClock()
// })

const controllerClockPlugin = {
  install(app) {
    app.provide('controllerClock', {
      start,
      stop,
      toggle,
      bpm,
      currentBeat,
      stepsPerBar,
      barBeat: computed(() => currentBeat.value % stepsPerBar.value),
      isPlaying
    }) // provide is used on the whole application
  }
}

export default controllerClockPlugin

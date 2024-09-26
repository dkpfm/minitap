import { ref } from 'vue'

const bpm = ref(120)
const currentBeat = ref(0)
const currentQuaver = ref(0)
const isPlaying = ref(false)
const stepsPerBar = ref(4)
let lastTimestamp = 0
let startTime = 0
let lastBeat = 0
let animationFrameId = null
let onBeatListeners = []
let onTickListeners = []

const start = () => {
  const tick = () => {
    const timestamp = performance.now()
    const beatInterval = (60 / (bpm.value * 2)) * 1000
    const beat = Math.floor((timestamp - startTime) / beatInterval)
    if (beat !== lastBeat) {
      onBeat()
      lastBeat = beat
    }

    if (isPlaying.value) {
      animationFrameId = requestAnimationFrame(tick)
    }

    onTickListeners.forEach((cb) => cb())
  }

  lastTimestamp = performance.now()
  startTime = performance.now()
  currentQuaver.value = 0
  currentBeat.value = 0
  tick()
  onBeatListeners.forEach((cb) =>
    cb({ currentBeat: currentBeat.value, currentQuaver: currentQuaver.value })
  )
}

const stop = () => {
  cancelAnimationFrame(animationFrameId)
}

const onBeat = () => {
  currentQuaver.value = currentQuaver.value + 1
  currentBeat.value = currentQuaver.value
  // currentBeat.value = Math.floor(currentQuaver.value / 2)
  onBeatListeners.forEach((cb) =>
    cb({ currentBeat: currentBeat.value, currentQuaver: currentQuaver.value })
  )
}

// const onBeat = () => {
//   currentBeat.value = currentBeat.value + 1
//   onBeatListeners.forEach((cb) => cb({ currentBeat: currentBeat.value }))
// }

const toggle = () => {
  isPlaying.value = !isPlaying.value
  if (isPlaying.value) {
    start()
  } else {
    stop()
  }
}

const controllerClockPlugin = {
  install(app) {
    const controllerClock = {
      start,
      stop,
      toggle,
      bpm,
      currentBeat,
      currentQuaver,
      stepsPerBar,
      barBeat: computed(() => currentBeat.value % stepsPerBar.value),
      isPlaying,
      listenOnBeat(cb) {
        onBeatListeners.push(cb)
      },
      removeOnBeat(cb) {
        onBeatListeners = onBeatListeners.filter((_cb) => _cb !== cb)
      },
      listenOnTick(cb) {
        onTickListeners.push(cb)
      },
      removeOnTick(cb) {
        onTickListeners = onTickListeners.filter((_cb) => _cb !== cb)
      }
    }
    app.provide('controllerClock', controllerClock)
    app.config.globalProperties.controllerClock = controllerClock
  }
}

export default controllerClockPlugin

import { ref, inject } from 'vue'

const bpm = ref(120)
const currentBeat = ref(0)
const isPlaying = ref(false)
const stepsPerBar = ref(4)
let lastTimestamp = 0
let animationFrameId = null
let controllerState = null
let onBeatListeners = []
let onTickListeners = []

const start = () => {
  const tick = (timestamp) => {
    const deltaTime = timestamp - lastTimestamp
    const beatInterval = (60 / bpm.value) * 1000

    if (deltaTime >= beatInterval) {
      onBeat()
      lastTimestamp = timestamp
    }

    if (isPlaying.value) {
      animationFrameId = requestAnimationFrame(tick)
    }

    onTickListeners.forEach((cb) => cb())
  }

  lastTimestamp = performance.now()
  animationFrameId = requestAnimationFrame(tick)
}

const stop = () => {
  cancelAnimationFrame(animationFrameId)
}

const onBeat = () => {
  currentBeat.value = currentBeat.value + 1
  onBeatListeners.forEach((cb) => cb({ currentBeat: currentBeat.value }))
}

const toggle = () => {
  if (isPlaying.value) {
    stop()
  } else {
    currentBeat.value = 0
    start()
  }
  isPlaying.value = !isPlaying.value
}

const controllerClockPlugin = {
  install(app) {
    controllerState = app.config.globalProperties.controllerState
    const controllerClock = {
      start,
      stop,
      toggle,
      bpm,
      currentBeat,
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

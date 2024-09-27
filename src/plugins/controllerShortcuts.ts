import BpmGuesser from '~/utils/bpmGuesser'
const chanelModeKeys = 'qweruiop'.split('')
const chanelTriggerKeys = 'asdfhjkl'.split('')
let shiftDown = false

export default {
  install(app) {
    const controllerState = app.config.globalProperties.controllerState
    const controllerClock = app.config.globalProperties.controllerClock
    const controllerOutput = app.config.globalProperties.controllerOutput

    function handleKeyDown(key, shiftKey) {
      shiftDown = shiftKey
      if (key === 'Shift') {
        shiftDown = true
      } else if (key === 'ArrowUp') {
        controllerClock.bpm.value += 0.05
      } else if (key === 'ArrowDown') {
        controllerClock.bpm.value -= 0.05
      } else if (key === 'ArrowLeft') {
        controllerClock.offsetTime(25)
      } else if (key === 'ArrowRight') {
        controllerClock.offsetTime(-25)
      } else if (chanelTriggerKeys.includes(key.toLowerCase())) {
        const index = chanelTriggerKeys.indexOf(key.toLowerCase())
        if (controllerState.channels[index].mode === 0) {
          // TRIGGER KEYS
        } else if (controllerState.channels[index].mode === 1) {
          // Tap mode
          controllerState.channels[index].tapDown = true
        } else if (controllerState.channels[index].mode === 2) {
          // Random mode
          if (shiftDown) {
            controllerState.channels[index].random.amount = Math.max(
              0,
              controllerState.channels[index].random.amount - 1
            )
          } else {
            controllerState.channels[index].random.amount = Math.min(
              24,
              controllerState.channels[index].random.amount + 1
            )
          }
        }
      }
    }

    function handleKeyUp(key) {
      if (key === 'Shift') {
        shiftDown = false
      } else if (key === ' ') {
        controllerClock.toggle()
      } else if (key === 'Enter') {
        const bpm = BpmGuesser.guess()
        if (bpm) controllerClock.bpm.value = bpm
      } else if (chanelModeKeys.includes(key.toLowerCase())) {
        // Change mode
        const index = chanelModeKeys.indexOf(key.toLowerCase())
        controllerState.channels[index].mode =
          (controllerState.channels[index].mode + 1) % 4
        //
      } else if (chanelTriggerKeys.includes(key.toLowerCase())) {
        // TRIGGER KEYS
        const index = chanelTriggerKeys.indexOf(key.toLowerCase())
        if (controllerState.channels[index].mode === 0) {
          // Sequencer mode
          if (shiftDown) {
            controllerState.channels[index].sequencer.forEach((val, i) => {
              controllerState.channels[index].sequencer[i] = 0
            })
          } else {
            // tap
            if (controllerClock.isPlaying.value) {
              const quav = Math.floor(
                (controllerClock.currentTime.value % 16) - 0.1
              )
              const newVal = !controllerState.channels[index].sequencer[quav]
              controllerState.channels[index].sequencer[quav] = newVal
              if (newVal) controllerOutput.triggerNote(index)
            }
          }
        } else if (controllerState.channels[index].mode === 1) {
          // Tap mode
          controllerState.channels[index].tapDown = false
        } else if (controllerState.channels[index].mode === 2) {
          // Random mode
        }
      }
    }

    window.addEventListener('message', ({ data }) => {
      if (data.name === 'mt-key-down') {
        handleKeyDown(data.key, data.shiftKey)
      }
      if (data.name === 'mt-key-up') {
        handleKeyUp(data.key, data.shiftKey)
      }
    })
    window.addEventListener('keydown', (event) =>
      handleKeyDown(event.key, event.shiftKey)
    )
    window.addEventListener('keyup', (event) =>
      handleKeyUp(event.key, event.shiftKey)
    )
  }
}

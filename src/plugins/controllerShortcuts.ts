import BpmGuesser from '~/utils/bpmGuesser'
const chanelModeKeys = 'qweruiop'.split('')

export default {
  install(app) {
    const controllerState = app.config.globalProperties.controllerState
    const controllerClock = app.config.globalProperties.controllerClock

    function handleKeyDown(key) {}

    function handleKeyUp(key) {
      if (key === ' ') {
        controllerClock.toggle()
      } else if (key === 'Enter') {
        const bpm = BpmGuesser.guess()
        // console.log(bpm)
        if (bpm) controllerClock.bpm.value = bpm
      } else if (chanelModeKeys.includes(key.toLowerCase())) {
        const index = chanelModeKeys.indexOf(key.toLowerCase())
        controllerState.channels[index].mode =
          (controllerState.channels[index].mode + 1) % 4
        //
      }
    }

    window.addEventListener('message', ({ data }) => {
      if (data.name === 'mt-key-down') {
        handleKeyDown(data.key)
      }
      if (data.name === 'mt-key-up') {
        handleKeyUp(data.key)
      }
    })
    window.addEventListener('keydown', (event) => handleKeyDown(event.key))
    window.addEventListener('keyup', (event) => handleKeyUp(event.key))
  }
}

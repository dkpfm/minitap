import { watch, computed } from 'vue'
import createRandomSequence from '~/utils/createRandomSequence'

export default {
  install(app) {
    const controllerState = app.config.globalProperties.controllerState
    const controllerClock = app.config.globalProperties.controllerClock

    function triggerNote(channelIndex) {
      window.parent.postMessage(
        { name: 'mt-channel-on', channel: channelIndex },
        '*'
      )
      window.parent.postMessage(
        { name: `mt-channel${channelIndex}-on`, channel: channelIndex },
        '*'
      )
      setTimeout(() => {
        window.parent.postMessage(
          { name: 'mt-channel-off', channel: channelIndex },
          '*'
        )
        window.parent.postMessage(
          {
            name: `mt-channel${channelIndex}-off`,
            channel: channelIndex
          },
          '*'
        )
      }, 100)
    }

    // STUFF THAT HAPPENS AT THE BEGINNING OF EACH SEQUENCE
    let randomsState = []
    controllerClock.listenOnSequence(() => {
      window.parent.postMessage({ name: 'mt-sequence' }, '*')
      randomsState = []
      controllerState.channels.forEach((channelData, channelIndex) => {
        if (channelData.mode === 2) {
          randomsState[channelIndex] = createRandomSequence({
            amount: channelData.random.amount,
            seed: channelData.random.seed
          })
        }
      })
      console.log(randomsState)
    })

    // STUFF THAT HAPPENS ON BEAT
    controllerClock.listenOnBeat(({ currentBeat, currentQuaver }) => {
      window.parent.postMessage({ name: 'mt-beat', currentBeat }, '*')
      controllerState.channels.forEach((channelData, channelIndex) => {
        if (channelData.mode === 0) {
          // SEQUENCER
          const beatIndex = currentQuaver % 16
          if (channelData.sequencer[beatIndex]) {
            triggerNote(channelIndex)
          }
        }
      })
    })

    // TAPS
    const tapDowns = computed(() =>
      controllerState.channels.map((c) => c.tapDown)
    )
    watch(tapDowns, (channels) => {
      channels.forEach((isDown, channelIndex) => {
        if (isDown) {
          window.parent.postMessage(
            { name: 'mt-channel-on', channel: channelIndex },
            '*'
          )
          window.parent.postMessage(
            { name: `mt-channel${channelIndex}-on`, channel: channelIndex },
            '*'
          )
        } else {
          window.parent.postMessage(
            { name: 'mt-channel-off', channel: channelIndex },
            '*'
          )
          window.parent.postMessage(
            { name: `mt-channel${channelIndex}-off`, channel: channelIndex },
            '*'
          )
        }
      })
    })

    const controllerOutput = {
      triggerNote
    }

    app.provide('controllerOutput', controllerOutput)
    app.config.globalProperties.controllerOutput = controllerOutput
  }
}

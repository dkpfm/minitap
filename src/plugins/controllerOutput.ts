import { watch, computed } from 'vue'
import createRandomSequence from './../utils/createRandomSequence'

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
    let randomsState = null
    function updateRandomState() {
      randomsState = []

      controllerState.channels.forEach((channelData, channelIndex) => {
        randomsState[channelIndex] = createRandomSequence({
          amount: channelData.random.amount,
          seed: channelData.random.seed
        }).map((v) => ({
          time: v,
          done: false /* this should take into account current time */
        }))
      })
    }
    controllerClock.listenOnSequence(() => {
      window.parent.postMessage({ name: 'mt-sequence' }, '*')
      updateRandomState()
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

    // STUFF THAT HAPPENS ON EACH FRAME
    controllerClock.listenOnTick(({ currentTime }) => {
      controllerState.channels.forEach((channelData, channelIndex) => {
        // Update randoms
        if (randomsState) {
          randomsState[channelIndex].forEach((rand, index) => {
            if (rand.time <= currentTime % 16 && !rand.done) {
              rand.done = true
              if (channelData.mode === 2) {
                triggerNote(channelIndex)
                window.postMessage(
                  {
                    name: 'mt-internal-rand-trigger',
                    channel: channelIndex,
                    randIndex: index
                  },
                  '*'
                )
              }
            }
          })
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

    const randoms = computed(() =>
      controllerState.channels.map((c) => c.random)
    )
    watch(
      randoms,
      () => {
        // could update only the changed channel for better perf
        updateRandomState()
      },
      { immediate: true }
    )

    const controllerOutput = {
      triggerNote
    }

    app.provide('controllerOutput', controllerOutput)
    app.config.globalProperties.controllerOutput = controllerOutput
  }
}

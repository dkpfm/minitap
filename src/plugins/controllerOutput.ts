export default {
  install(app) {
    const controllerState = app.config.globalProperties.controllerState
    const controllerClock = app.config.globalProperties.controllerClock
    controllerClock.listenOnBeat(({ currentBeat }) => {
      window.parent.postMessage({ name: 'mt-beat' }, '*')
      controllerState.channels.forEach((channelData, channelIndex) => {
        if (channelData.mode === 0) {
          // SEQUENCER
          const beatIndex = currentBeat % 8
          if (channelData.sequencer[beatIndex]) {
            window.parent.postMessage(
              { name: 'mt-channel-on', channel: channelIndex },
              '*'
            )
            setTimeout(() => {
              window.parent.postMessage(
                { name: 'mt-channel-off', channel: channelIndex },
                '*'
              )
            }, 100)
          }
        }
      })
    })
  }
}

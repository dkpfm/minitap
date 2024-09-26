export default {
  install(app) {
    const controllerState = app.config.globalProperties.controllerState
    const controllerClock = app.config.globalProperties.controllerClock
    controllerClock.listenOnBeat(({ currentBeat, currentQuaver }) => {
      window.parent.postMessage({ name: 'mt-beat', currentBeat }, '*')
      controllerState.channels.forEach((channelData, channelIndex) => {
        if (channelData.mode === 0) {
          // SEQUENCER
          const beatIndex = currentQuaver % 16
          if (channelData.sequencer[beatIndex]) {
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
        }
      })
    })
  }
}

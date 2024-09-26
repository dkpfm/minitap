const state = {
  channels: reactive([
    {
      name: 'Kick',
      mode: 0,
      sequencer: [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      tapDown: false
    },
    {
      name: 'Clap',
      mode: 0,
      sequencer: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      tapDown: false
    },
    {
      name: 'Ehh!',
      mode: 1,
      sequencer: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      tapDown: false
    },
    {
      name: '',
      mode: 1,
      sequencer: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      tapDown: false
    },
    {
      name: '',
      mode: 0,
      sequencer: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      tapDown: false
    },
    {
      name: '',
      mode: 1,
      sequencer: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      tapDown: false
    },
    {
      name: '',
      mode: 1,
      sequencer: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      tapDown: false
    },
    {
      name: '',
      mode: 0,
      sequencer: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      tapDown: false
    }
  ])
}
const controllerStatePlugin = {
  install(app) {
    app.provide('controllerState', state) // provide is used on the whole application
    app.config.globalProperties.controllerState = state
  }
}

export default controllerStatePlugin

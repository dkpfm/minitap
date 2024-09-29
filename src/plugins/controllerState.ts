const state = {
  channels: reactive([
    {
      name: 'Kick',
      mode: 0,
      sequencer: [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      tapDown: false,
      random: {
        amount: 8,
        seed: 0
      }
    },
    {
      name: 'Clap',
      mode: 0,
      sequencer: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      tapDown: false,
      random: {
        amount: 8,
        seed: 2
      }
    },
    {
      name: 'Fwd',
      mode: 1,
      sequencer: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      tapDown: false,
      random: {
        amount: 4,
        seed: 2
      }
    },
    {
      name: 'Bkd',
      mode: 1,
      sequencer: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      tapDown: false,
      random: {
        amount: 0,
        seed: 0
      }
    },
    {
      name: '',
      mode: 0,
      sequencer: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      tapDown: false,
      random: {
        amount: 0,
        seed: 0
      }
    },
    {
      name: '',
      mode: 1,
      sequencer: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      tapDown: false,
      random: {
        amount: 0,
        seed: 0
      }
    },
    {
      name: '',
      mode: 1,
      sequencer: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      tapDown: false,
      random: {
        amount: 0,
        seed: 0
      }
    },
    {
      name: 'Rand',
      mode: 2,
      sequencer: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      tapDown: false,
      random: {
        amount: 8,
        seed: 0
      }
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

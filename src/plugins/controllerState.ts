const state = {
  channels: reactive([
    {
      name: 'Flash',
      mode: 0,
      sequencer: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      tapDown: false,
      random: {
        amount: 8,
        seed: 0
      }
    },
    {
      name: 'Spawn',
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
      name: 'Bwd',
      mode: 1,
      sequencer: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      tapDown: false,
      random: {
        amount: 0,
        seed: 0
      }
    },
    {
      name: 'Pixel',
      mode: 0,
      sequencer: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      tapDown: false,
      random: {
        amount: 0,
        seed: 0
      }
    },
    {
      name: 'PixelXL',
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
      name: 'Trails',
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

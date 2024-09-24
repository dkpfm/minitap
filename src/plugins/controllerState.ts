const state = {
  channels: reactive([
    { name: 'Kick', mode: 0, sequencer: [1, 0, 0, 0, 1, 0, 0, 0] },
    { name: 'Clap', mode: 0, sequencer: [0, 0, 1, 0, 0, 0, 1, 0] },
    { name: 'Ehh!', mode: 1, sequencer: [0, 0, 0, 0, 0, 0, 0, 0] },
    { name: '', mode: 1, sequencer: [0, 0, 0, 0, 0, 0, 0, 0] },
    { name: '', mode: 0, sequencer: [0, 0, 0, 0, 0, 0, 0, 1] },
    { name: '', mode: 1, sequencer: [0, 0, 0, 0, 0, 0, 0, 0] },
    { name: '', mode: 1, sequencer: [0, 0, 0, 0, 0, 0, 0, 0] },
    { name: '', mode: 0, sequencer: [0, 0, 0, 0, 1, 0, 0, 0] }
  ])
}
const controllerStatePlugin = {
  install(app, options) {
    app.provide('controllerState', state) // provide is used on the whole application
  }
}

export default controllerStatePlugin

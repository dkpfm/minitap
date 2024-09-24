const state = {
  channels: reactive([
    { name: '', mode: 0 },
    { name: '', mode: 1 },
    { name: '', mode: 0 },
    { name: '', mode: 2 },
    { name: '', mode: 1 },
    { name: '', mode: 1 },
    { name: '', mode: 1 },
    { name: '', mode: 1 }
  ])
}
const controllerStatePlugin = {
  install(app, options) {
    // app.config.globalProperties.$controllerState = (key) => {
    //   return state[key]
    // }
    app.provide('controllerState', state) // provide is used on the whole application
  }
}

export default controllerStatePlugin

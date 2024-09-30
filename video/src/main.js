import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import controllerState from './../../src/plugins/controllerState'
import controllerClock from './../../src/plugins/controllerClock'
import controllerShortcuts from './../../src/plugins/controllerShortcuts'
import controllerOutput from './../../src/plugins/controllerOutput'

createApp(App)
  .use(controllerState)
  .use(controllerClock)
  .use(controllerOutput)
  .use(controllerShortcuts)
  .mount('#app')

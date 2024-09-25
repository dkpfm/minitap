import 'vue-global-api'
import { createApp } from 'vue'
import App from '~/components/Controller.vue'
import controllerState from '~/plugins/controllerState'
import controllerClock from '~/plugins/controllerClock'
import controllerShortcuts from '~/plugins/controllerShortcuts'
import controllerOutput from '~/plugins/controllerOutput'
import '../styles'

const app = createApp(App)
app
  .use(controllerState)
  .use(controllerClock)
  .use(controllerShortcuts)
  .use(controllerOutput)
  .mount('#controller-app')

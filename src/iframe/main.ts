import 'vue-global-api'
import { createApp } from 'vue'
import App from '~/components/Controller.vue'
import controllerState from '~/plugins/controllerState'
import controllerClock from '~/plugins/controllerClock'
import '../styles'

const app = createApp(App)
app.use(controllerState).use(controllerClock).mount('#controller-app')

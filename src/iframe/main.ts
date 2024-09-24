import 'vue-global-api'
import { createApp } from 'vue'
import App from '~/components/Controller.vue'
import controllerState from '~/plugins/controllerState'
import '../styles'

const app = createApp(App)
app.use(controllerState).mount('#controller-app')

import 'vue-global-api'
import { createApp } from 'vue'
import App from '~/components/Controller.vue'
import '../styles'

const app = createApp(App)
app.mount('#controller-app')

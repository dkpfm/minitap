import 'vue-global-api'
import { createApp } from 'vue'
import App from './Options.vue'
import i18n from '~/plugins/i18n'
import '../styles'

const app = createApp(App)
app
  .use(i18n)
  .mount('#app')

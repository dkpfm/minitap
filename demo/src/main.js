import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import physics from './physics'
import audio from './audio'

createApp(App)
  .use({
    install(app) {
      app.provide('physics', physics())
    }
  })
  .use({
    install(app) {
      app.provide('audio', audio())
    }
  })
  .mount('#app')

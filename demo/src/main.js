import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import physics from './physics'

createApp(App)
  .use({
    install(app) {
      app.provide('physics', physics)
    }
  })
  .mount('#app')

// window.addEventListener('message', ({ data }) => {
//   if (data.name === 'mt-channel1-on') {
//     physics.spawn({ remove: true })
//     physics.spawn({ remove: true })
//     physics.spawn({ remove: true })
//   }
// })

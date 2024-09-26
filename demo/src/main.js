import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import physics from './physics'

createApp(App)
  .use({
    install(app) {
      console.log('HELLO')
      app.provide('physics', physics)
    }
  })
  .mount('#app')

window.addEventListener('message', ({ data }) => {
  if (data.name === 'mt-channel1-on') {
    physics.spawn({ remove: true })
    physics.spawn({ remove: true })
    physics.spawn({ remove: true })
    // document.body.style.background = beat % 2 === 0 ? '#bbb' : '#fff'
    // beat++
  }
  // if (data.name === 'mt-channel-on') {
  //   console.log('ON', data.channel)
  // }
  // if (data.name === 'mt-channel-off') {
  //   console.log('OFF', data.channel)
  // }
})

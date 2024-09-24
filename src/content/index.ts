import { onMessage } from 'webext-bridge/content-script'

let controllerIsOn = false
onMessage('REQUEST_CONTROLLER_STATUS', async function ({ data }) {
  return {
    isOn: controllerIsOn
  }
})
// const ControllerApp = await import('~/Controller.vue')
// const { createApp } = await import('vue')

// import { createApp } from 'vue'
// import Controller from './../components/Controller.vue'
// console.log(Controller)
let iframeRef = undefined

onMessage('SWITCH_CONTROLLER', async function ({ data }) {
  if (!controllerIsOn) {
    const src = chrome.runtime.getURL('/iframe/index.html')

    if (iframeRef) iframeRef.remove()
    iframeRef = new DOMParser().parseFromString(
      `<iframe class="crx-iframe" allowtransparency="true" src="${src}" style="filter: drop-shadow(0px 1px 4px rgba(0,0,0,0.1)); border-radius: 20px; color-scheme: auto; position: fixed; left:calc(50vw - 1200px/2); top :calc(50vh - 150px/2); border:0; width:1200px; height: 150px; background: transparent;"></iframe>`,
      'text/html'
    ).body.firstElementChild
    if (iframeRef) {
      document.body?.append(iframeRef)
    }
    controllerIsOn = true
  } else {
    iframeRef.remove()
    controllerIsOn = false
  }
  // Do whatever processing you need here.

  return {
    status: 'success',
    isOn: controllerIsOn
  }
})

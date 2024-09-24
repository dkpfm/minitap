import { onMessage } from 'webext-bridge/content-script'

let controllerIsOn = false
let wrapperEl = onMessage(
  'REQUEST_CONTROLLER_STATUS',
  async function ({ data }) {
    return {
      isOn: controllerIsOn
    }
  }
)
// const ControllerApp = await import('~/Controller.vue')
// const { createApp } = await import('vue')

// import { createApp } from 'vue'
// import Controller from './../components/Controller.vue'
// console.log(Controller)

onMessage('SWITCH_CONTROLLER', async function ({ data }) {
  if (!controllerIsOn) {
    const src = chrome.runtime.getURL('/iframe/index.html')

    const iframe = new DOMParser().parseFromString(
      `<iframe class="crx-iframe" src="${src}" style="position: fixed; left:0; border:0; width:200px; height: 150px;"></iframe>`,
      'text/html'
    ).body.firstElementChild
    if (iframe) {
      document.body?.append(iframe)
    }
    controllerIsOn = true
  } else {
    wrapperEl.remove()
    controllerIsOn = false
  }
  // Do whatever processing you need here.

  return {
    status: 'success',
    isOn: controllerIsOn
  }
})

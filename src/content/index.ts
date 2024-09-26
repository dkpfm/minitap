import { onMessage } from 'webext-bridge/content-script'
import './style.css'

let controllerIsOn = false
onMessage('REQUEST_CONTROLLER_STATUS', async function ({ data }) {
  return {
    isOn: controllerIsOn
  }
})

let iframeRef = undefined
let actualIframeRef = undefined
let styleLink = undefined
let handles = null

let xTarget = 0
let x = 0
let yTarget = 0
let y = 0

let xOrigin = 0
let yOrigin = 0
let xMouseStart = 0
let yMouseStart = 0

function dragStart(event) {
  xMouseStart = event.pageX
  yMouseStart = event.pageY
  xOrigin = x
  yOrigin = y
  iframeRef.style.pointerEvents = 'none'
  window.addEventListener('mousemove', dragMove)
  window.addEventListener('mouseup', dragEnd)
}

function dragMove(event) {
  const diffX = xMouseStart - event.pageX
  const diffY = yMouseStart - event.pageY
  xTarget = xOrigin - diffX
  yTarget = yOrigin - diffY
}

function dragEnd() {
  iframeRef.style.pointerEvents = ''
  window.removeEventListener('mousemove', dragMove)
  window.removeEventListener('mouseup', dragEnd)
}

function handleKeyDown({ key, shiftKey }) {
  actualIframeRef.contentWindow.postMessage(
    { name: 'mt-key-down', key, shiftKey },
    '*'
  )
}

function handleKeyUp({ key, shiftKey }) {
  actualIframeRef.contentWindow.postMessage(
    { name: 'mt-key-up', key, shiftKey },
    '*'
  )
}

onMessage('SWITCH_CONTROLLER', async function ({ data }) {
  if (!controllerIsOn) {
    const src = chrome.runtime.getURL('/iframe/index.html')

    if (iframeRef) iframeRef.remove()
    iframeRef = new DOMParser().parseFromString(
      `<div class="mt-controller">
      <div class="mt-controller-grab left"></div>
      <iframe class="mt-controller-iframe" allowtransparency="true" src="${src}" style="filter: drop-shadow(0px 1px 4px rgba(0,0,0,0.1)); border-radius: 20px; color-scheme: auto; border:0; width: 1200px; height: 150px; background: transparent;"></iframe>
      <div class="mt-controller-grab right"></div>
      </div>`,
      'text/html'
    ).body.firstElementChild

    if (iframeRef) {
      document.body?.append(iframeRef)
    }

    actualIframeRef = iframeRef?.querySelector('iframe')

    handles = iframeRef?.querySelectorAll('.mt-controller-grab')
    x = (innerWidth - 1200) / 2
    xTarget = x
    y = innerHeight / 2
    yTarget = innerHeight / 2 - 150

    function tick() {
      x += (xTarget - x) * 0.3
      y += (yTarget - y) * 0.3
      iframeRef.style.transform = `translate(${x}px, ${y}px)`
      requestAnimationFrame(tick)
    }
    tick()

    const styleSrc = chrome.runtime.getURL('/content/style.css')
    styleLink = document.createElement('link')
    styleLink.href = styleSrc
    styleLink.type = 'text/css'
    styleLink.rel = 'stylesheet'
    document.body?.append(styleLink)

    controllerIsOn = true

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
  } else {
    iframeRef.remove()
    controllerIsOn = false
    window.removeEventListener('keydown', handleKeyDown)
    window.removeEventListener('keyup', handleKeyUp)
  }

  handles.forEach((h) => h.addEventListener('mousedown', dragStart))

  return {
    status: 'success',
    isOn: controllerIsOn
  }
})

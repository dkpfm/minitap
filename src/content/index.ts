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

let controllerWidth = 1200
let controllerHeight = 150
let xTarget = 0
let x = 0
let yTarget = 0
let y = 0

let xOrigin = 0
let yOrigin = 0
let xMouseStart = 0
let yMouseStart = 0
let dragging = false

function dragStart(event) {
  dragging = true
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
  dragging = false
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
      <div class="mt-controller-grab left">
      <svg width="8px" height="17px" viewBox="0 0 8 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="Page-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="0.5">
              <g id="Artboard-Copy-120" transform="translate(-161, -783.6448)" fill="#646468">
                  <g id="Group-47" transform="translate(161, 679)">
                      <g id="Group-6" transform="translate(0, 104.6448)">
                          <path d="M6.4,17 C7.2836556,17 8,16.3080764 8,15.4545455 C8,14.6010145 7.2836556,13.9090909 6.4,13.9090909 C5.5163444,13.9090909 4.8,14.6010145 4.8,15.4545455 C4.8,16.3080764 5.5163444,17 6.4,17 Z M1.6,17 C2.4836556,17 3.2,16.3080764 3.2,15.4545455 C3.2,14.6010145 2.4836556,13.9090909 1.6,13.9090909 C0.7163444,13.9090909 0,14.6010145 0,15.4545455 C0,16.3080764 0.7163444,17 1.6,17 Z M6.4,12.3636364 C7.2836556,12.3636364 8,11.6717128 8,10.8181818 C8,9.96465084 7.2836556,9.27272727 6.4,9.27272727 C5.5163444,9.27272727 4.8,9.96465084 4.8,10.8181818 C4.8,11.6717128 5.5163444,12.3636364 6.4,12.3636364 Z M1.6,12.3636364 C2.4836556,12.3636364 3.2,11.6717128 3.2,10.8181818 C3.2,9.96465084 2.4836556,9.27272727 1.6,9.27272727 C0.7163444,9.27272727 0,9.96465084 0,10.8181818 C0,11.6717128 0.7163444,12.3636364 1.6,12.3636364 Z M6.4,7.72727273 C7.2836556,7.72727273 8,7.03534916 8,6.18181818 C8,5.3282872 7.2836556,4.63636364 6.4,4.63636364 C5.5163444,4.63636364 4.8,5.3282872 4.8,6.18181818 C4.8,7.03534916 5.5163444,7.72727273 6.4,7.72727273 Z M1.6,7.72727273 C2.4836556,7.72727273 3.2,7.03534916 3.2,6.18181818 C3.2,5.3282872 2.4836556,4.63636364 1.6,4.63636364 C0.7163444,4.63636364 0,5.3282872 0,6.18181818 C0,7.03534916 0.7163444,7.72727273 1.6,7.72727273 Z M6.4,3.09090909 C7.2836556,3.09090909 8,2.39898552 8,1.54545455 C8,0.691923568 7.2836556,0 6.4,0 C5.5163444,0 4.8,0.691923568 4.8,1.54545455 C4.8,2.39898552 5.5163444,3.09090909 6.4,3.09090909 Z M1.6,3.09090909 C2.4836556,3.09090909 3.2,2.39898552 3.2,1.54545455 C3.2,0.691923568 2.4836556,0 1.6,0 C0.7163444,0 0,0.691923568 0,1.54545455 C0,2.39898552 0.7163444,3.09090909 1.6,3.09090909 Z" id="Combined-Shape"></path>
                      </g>
                  </g>
              </g>
          </g>
      </svg></div>
      <iframe class="mt-controller-iframe" allowtransparency="true" src="${src}" style="filter: drop-shadow(0px 1px 4px rgba(0,0,0,0.1)); border-radius: 20px; color-scheme: auto; border:0; width: 1200px; height: 150px; background: transparent;"></iframe>
      <div class="mt-controller-grab right">
      <svg width="8px" height="17px" viewBox="0 0 8 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="Page-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="0.5">
              <g id="Artboard-Copy-120" transform="translate(-161, -783.6448)" fill="#646468">
                  <g id="Group-47" transform="translate(161, 679)">
                      <g id="Group-6" transform="translate(0, 104.6448)">
                          <path d="M6.4,17 C7.2836556,17 8,16.3080764 8,15.4545455 C8,14.6010145 7.2836556,13.9090909 6.4,13.9090909 C5.5163444,13.9090909 4.8,14.6010145 4.8,15.4545455 C4.8,16.3080764 5.5163444,17 6.4,17 Z M1.6,17 C2.4836556,17 3.2,16.3080764 3.2,15.4545455 C3.2,14.6010145 2.4836556,13.9090909 1.6,13.9090909 C0.7163444,13.9090909 0,14.6010145 0,15.4545455 C0,16.3080764 0.7163444,17 1.6,17 Z M6.4,12.3636364 C7.2836556,12.3636364 8,11.6717128 8,10.8181818 C8,9.96465084 7.2836556,9.27272727 6.4,9.27272727 C5.5163444,9.27272727 4.8,9.96465084 4.8,10.8181818 C4.8,11.6717128 5.5163444,12.3636364 6.4,12.3636364 Z M1.6,12.3636364 C2.4836556,12.3636364 3.2,11.6717128 3.2,10.8181818 C3.2,9.96465084 2.4836556,9.27272727 1.6,9.27272727 C0.7163444,9.27272727 0,9.96465084 0,10.8181818 C0,11.6717128 0.7163444,12.3636364 1.6,12.3636364 Z M6.4,7.72727273 C7.2836556,7.72727273 8,7.03534916 8,6.18181818 C8,5.3282872 7.2836556,4.63636364 6.4,4.63636364 C5.5163444,4.63636364 4.8,5.3282872 4.8,6.18181818 C4.8,7.03534916 5.5163444,7.72727273 6.4,7.72727273 Z M1.6,7.72727273 C2.4836556,7.72727273 3.2,7.03534916 3.2,6.18181818 C3.2,5.3282872 2.4836556,4.63636364 1.6,4.63636364 C0.7163444,4.63636364 0,5.3282872 0,6.18181818 C0,7.03534916 0.7163444,7.72727273 1.6,7.72727273 Z M6.4,3.09090909 C7.2836556,3.09090909 8,2.39898552 8,1.54545455 C8,0.691923568 7.2836556,0 6.4,0 C5.5163444,0 4.8,0.691923568 4.8,1.54545455 C4.8,2.39898552 5.5163444,3.09090909 6.4,3.09090909 Z M1.6,3.09090909 C2.4836556,3.09090909 3.2,2.39898552 3.2,1.54545455 C3.2,0.691923568 2.4836556,0 1.6,0 C0.7163444,0 0,0.691923568 0,1.54545455 C0,2.39898552 0.7163444,3.09090909 1.6,3.09090909 Z" id="Combined-Shape"></path>
                      </g>
                  </g>
              </g>
          </g>
      </svg></div>
      </div>`,
      'text/html'
    ).body.firstElementChild

    if (iframeRef) {
      document.body?.append(iframeRef)
    }

    actualIframeRef = iframeRef?.querySelector('iframe')

    const safetyPadding = 20

    handles = iframeRef?.querySelectorAll('.mt-controller-grab')
    x = innerWidth / 2 - controllerWidth / 2
    if (innerWidth < controllerWidth) x = safetyPadding
    xTarget = x
    y = innerHeight / 2 - safetyPadding - controllerHeight
    yTarget = y

    function tick() {
      if (!dragging) {
        if (xTarget + controllerWidth < 0) {
          xTarget = -controllerWidth + safetyPadding
        }
        if (xTarget - innerWidth > 0) {
          xTarget = innerWidth - safetyPadding
        }
        if (yTarget > innerHeight / 2 - safetyPadding - controllerHeight) {
          yTarget = innerHeight / 2 - safetyPadding - controllerHeight
        }
        if (yTarget < -innerHeight / 2 + safetyPadding) {
          yTarget = -innerHeight / 2 + safetyPadding
        }
      }
      x += (xTarget - x) * 0.2
      y += (yTarget - y) * 0.2
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

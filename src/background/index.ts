import { onMessage, sendMessage } from 'webext-bridge/background'

let openTabs = <any>[]
// function getAllTabs() {
//   chrome.tabs.query({}, function (tabs) {
//     tabs.forEach(function (tab) {
//       // console.log(tab.id)
//     })
//   })
// }
// getAllTabs()

chrome.tabs.onRemoved.addListener((_tabId) => {
  openTabs = openTabs.filter(({ tabId }) => tabId !== _tabId)
})

onMessage('REQUEST_CONTROLLER_STATUS', async function runAction({ data }) {
  // console.log(openTabs)
  const tabInfo = openTabs.find(({ tabId }) => tabId === data.tabId)
  return {
    isOn: !!tabInfo,
    ...tabInfo
  }
})

onMessage('SET_CONTROLLER_POSITION', async function runAction({ data }) {
  // console.log(openTabs)
  const tabInfo = openTabs.find(({ tabId }) => tabId === data.tabId)
  tabInfo.position = data.position
})

onMessage('SWITCH_CONTROLLER', async function runAction({ data }) {
  const isOpen = !!openTabs.find(({ tabId }) => tabId === data.tabId)
  // console.log('SWITCH_CONTROLLER', data.tabId, openTabs)
  let isOn = false
  if (!isOpen) {
    openTabs.push({ tabId: data.tabId })
    isOn = true
  } else {
    openTabs = openTabs.filter(({ tabId }) => tabId !== data.tabId)
    isOn = false
  }
  chrome.tabs.sendMessage(
    data.tabId,
    { message: 'SWITCH_CONTROLLER', isOn },
    function (response) {
      // console.log('Response from content script:', response)
    }
  )
  return {}
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'getTabId') {
    sendResponse({ tabId: sender.tab.id })
  }
})

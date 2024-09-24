/* eslint-disable no-console */
import { onMessage } from 'webext-bridge'

console.info('[chrome-ext-mv3-starter] Hello world from content script')

// communication example: send previous tab title from background page
onMessage('tab-prev', ({ data }) => {
  console.log(`[chrome-ext-mv3-starter] Navigate from page "${data.title}"`)
})

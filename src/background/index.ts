import { onMessage } from 'webext-bridge/background'

onMessage('ACTION', async function runAction({ data }) {
  // process data

  // return data
  return {}
})

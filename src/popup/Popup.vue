<template>
  <main class="popup">
    <img src="/assets/logo.svg" class="logo" />
    <button class="switch" @click="handleSwitchClick">
      <div class="icon">
        <IconPower />
      </div>
      <div class="label">{{ isOn ? 'Stop' : 'Start' }}</div>
    </button>

    <!-- <button class="btn mt-2" @click="openOptionsPage">
      {{ $t('popup.open_options') }}
    </button> -->

    <!-- <div class="mt-2">
      <span class="opacity-50">{{ $t('popup.storage') }}:</span>
      {{ storageDemo }}
    </div> -->
  </main>
</template>

<script setup lang="ts">
import IconPower from '~/components/icon/Power.vue'
// import { storageDemo } from '~/logic/storage'

import browser from 'webextension-polyfill'
import { sendMessage } from 'webext-bridge/popup'

const isOn = ref(false)

onMounted(async () => {
  let tabs = await browser.tabs.query({
    active: true,
    currentWindow: true
  })
  const data = await sendMessage(
    'REQUEST_CONTROLLER_STATUS',
    {},
    'content-script@' + tabs[0].id
  )
  isOn.value = data.isOn
})

async function handleSwitchClick() {
  let tabs = await browser.tabs.query({
    active: true,
    currentWindow: true
  })

  const data = await sendMessage(
    'SWITCH_CONTROLLER',
    {},
    'content-script@' + tabs[0].id
  )
  // console.log(data)
  isOn.value = data.isOn
  window.close()
}

// function openOptionsPage() {
//   chrome.runtime.openOptionsPage()
// }
</script>

<style lang="scss" scoped>
.popup {
  background: black;
  width: 300px;
  margin: 0;
  padding: 10px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
.logo {
  width: calc(100% - 80px);
  margin: 10px auto 0;
}
.switch {
  margin: 10px auto 20px;
  height: 48px;
  width: 110px;
  border: 1.5px solid rgba(white, 0.2);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.07s linear;

  > .icon {
    width: 36px;
    height: 36px;
    background: rgba(#3b84e3, 0.2);
    border-radius: 50%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 6px;
    transition: background 0.07s linear;

    &:after {
      content: '';
      position: absolute;
      width: 22px;
      height: 22px;
      background: rgba(#3b84e3, 1);
      border-radius: 50%;
      top: calc(36px / 2 - 22px / 2);
      left: calc(36px / 2 - 22px / 2);
    }
    svg {
      position: relative;
      z-index: 2;
      zoom: 0.6;
    }
  }
  > .label {
    color: white;
    text-transform: uppercase;
    flex: 1;
    text-align: left;
  }
  &:hover {
    border-color: rgba(white, 0.4);
    > .icon {
      background: rgba(#3b84e3, 0.4);
    }
  }
}
</style>

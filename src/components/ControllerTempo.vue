<template>
  <div class="controller-tempo">
    <div class="metronome">
      <IconMetronome
        :style="`transform: scaleX(${controllerClock.currentBeat.value % 2 === 0 ? -1 : 1})`"
      />
    </div>
    <div class="bpm">
      {{ Math.round(controllerClock.bpm.value) }}<small>BPM</small>
    </div>
    <div class="flex-fill"></div>
    <div class="beat">{{ controllerClock.barBeat.value + 1 }}/4</div>
    <button class="circle-button">
      <div class="circle">TAP</div>
    </button>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue'

import IconMetronome from './icon/Metronome.vue'

const controllerClock = inject('controllerClock')
</script>

<style lang="scss" scoped>
.controller-tempo {
  width: 48px;
  height: 100%;
  background: #141415;
  border-radius: calc(48px / 2);
  border: 1px solid #303031;
  display: flex;
  flex-direction: column;
  padding: 8px 0;
  align-items: center;
  justify-content: center;
  color: white;
}
.metronome {
  --icon-color: #ffffff55;
  padding-top: 6px;
}
.bpm {
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  font-weight: bold;
  text-align: center;
  font-size: 12px;
  > small {
    font-size: 8px;
    letter-spacing: -0.5px;
    color: #ffffff55;
  }
}
.beat {
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  font-weight: bold;
  text-align: center;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
}
.circle-button {
  --accent: #27c94c;
  --accent-faded: #27c94c22;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--accent-faded);
  padding: 4px;

  > .circle {
    --icon-color: white;
    width: 24px;
    height: 24px;
    border-radius: 12px;
    background: var(--accent);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 8px;
    letter-spacing: -0.5px;
  }
}
</style>

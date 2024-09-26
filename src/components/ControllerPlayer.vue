<template>
  <div class="controller-player">
    <button class="pill" @click="handlePlayClick()">
      <div class="circle">
        <IconPlay v-if="!controllerClock.isPlaying.value" /><IconPause
          v-if="controllerClock.isPlaying.value"
        />
      </div>
      <div class="label">
        {{ controllerClock.isPlaying.value ? 'Stop' : 'Play' }}
      </div>
    </button>
    <div class="flex-fill"></div>
    <ControllerPlayerTimeline />
    <ControllerPlayerCD />
  </div>
</template>

<script setup>
import IconPlay from './icon/Play.vue'
import IconPause from './icon/Pause.vue'
import ControllerPlayerCD from './ControllerPlayerCD.vue'
import ControllerPlayerTimeline from './ControllerPlayerTimeline.vue'

const controllerClock = inject('controllerClock')
function handlePlayClick() {
  controllerClock.toggle()
}
</script>

<style lang="scss" scoped>
.controller-player {
  width: 48px;
  height: 100%;
  background: white;
  border-radius: calc(48px / 2);
  border: 1px solid #b8b8bd;
  display: flex;
  flex-direction: column;
  padding: 8px 0 4px;
  align-items: center;
  justify-content: center;
  gap: 5px;
}
.pill {
  --accent: #3b84e3;
  --accent-faded: #3b84e322;
  width: 32px;
  height: 54px;
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
  }
  > .label {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 8px;
    letter-spacing: -0.5px;
    color: var(--accent);
    flex: 1;
    display: flex;
    align-items: center;
  }
}
</style>

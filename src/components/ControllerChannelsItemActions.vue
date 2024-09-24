<template>
  <div class="channel-actions">
    <button :class="{ active: mode === 0 }">
      <div class="icon"><IconMetronome /></div>
    </button>
    <button :class="{ active: mode === 1 }">
      <div class="icon"><IconTap /></div>
    </button>
    <button :class="{ active: mode === 2 }">
      <div class="icon"><IconWave /></div>
    </button>
  </div>
</template>

<script setup>
import { inject, defineProps } from 'vue'
import IconMetronome from './icon/Metronome.vue'
import IconTap from './icon/Tap.vue'
import IconWave from './icon/Wave.vue'

const props = defineProps(['channelIndex'])

const controllerState = inject('controllerState')
const mode = computed(() => controllerState.channels[props.channelIndex].mode)
</script>

<style lang="scss" scoped>
.channel-actions {
  display: flex;
  gap: 2px;
}
button {
  width: 18px;
  height: 18px;
  /* background: red; */
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: #ffffff22;
  }
  > .icon {
    zoom: 0.6;
    opacity: 0.4;
    --icon-color: white;
  }
  &.active .icon {
    opacity: 1;
    --icon-color: var(--accent);
  }
}
</style>

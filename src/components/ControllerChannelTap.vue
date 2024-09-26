<template>
  <div class="channel-tap">
    <div :class="{ key: true, down: isDown }">
      <div class="key-top">{{ props.letter }}</div>
      <div class="fx">
        <TapFx />
      </div>
    </div>
  </div>
</template>

<script setup>
import TapFx from './icon/TapFx.vue'

// import _ from 'underscore'
// import { defineProps } from 'vue'

const props = defineProps(['letter', 'channelIndex'])

const controllerState = inject('controllerState')
const isDown = computed(
  () => controllerState.channels[props.channelIndex].tapDown
)

// // const beats = ref([1, 0, 0, 0, 0, 0, 0, 0])
// const rows = computed(() => _.chunk(props.beats, 4))
</script>

<style lang="scss" scoped>
.channel-tap {
  display: flex;
  justify-content: end;
}
.key {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  border: 1.5px solid rgba(white, 0.1);
  position: relative;

  .key-top {
    width: 35px;
    height: 30px;
    border-radius: 9px;
    background-color: #ffffff22;
    margin: 1px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #141415;
    font-weight: bold;
  }
  .fx {
    overflow: visible;
    position: absolute;
    top: -10px;
    visibility: hidden;
    --icon-color: var(--accent);
    transform: scale(0.6);
    transition: transform 0.04s ease-out;
  }

  &.down {
    .fx {
      visibility: visible;
      transform: scale(1);
    }
  }
}
</style>

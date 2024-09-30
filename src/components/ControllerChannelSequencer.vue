<template>
  <div class="channel-sequencer">
    <div class="bar" v-for="(row, rowIndex) in rows">
      <button
        tabindex="-1"
        :class="{
          beat: true,
          active: !!beat,
          highlight:
            controllerClock.isPlaying.value &&
            activeBeat === rowIndex * 8 + beatIndex
        }"
        v-for="(beat, beatIndex) in row"
        @click="handleClick({ rowIndex, beatIndex })"
      ></button>
    </div>
  </div>
</template>

<script setup>
import _ from 'underscore'
import { defineProps, inject, computed } from 'vue'

const props = defineProps(['channelIndex'])

const controllerState = inject('controllerState')
const beats = computed(
  () => controllerState.channels[props.channelIndex].sequencer
)
const rows = computed(() => _.chunk(beats.value, 8))

function handleClick({ rowIndex, beatIndex }) {
  controllerState.channels[props.channelIndex].sequencer[
    rowIndex * 8 + beatIndex
  ] =
    !controllerState.channels[props.channelIndex].sequencer[
      rowIndex * 8 + beatIndex
    ]
}

const controllerClock = inject('controllerClock')
const activeBeat = computed(() => controllerClock.currentQuaver.value % 16)
</script>

<style lang="scss" scoped>
.channel-sequencer {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.bar {
  display: flex;
  gap: 3px;
}
.beat {
  height: 8px;
  border-radius: 4px;
  border: 1.5px solid rgba(white, 0.1);
  flex: 1;
  &.highlight {
    border-color: rgba(white, 0.5);
  }
  &.active {
    background: var(--accent);
    border-color: var(--accent);
    &.highlight {
      border-color: white;
      background: white;
    }
  }
}
</style>

<template>
  <div
    class="channel"
    :style="{
      ['--accent']: props.options.color,
      ['--accent-faded']: props.options.color + '22'
    }"
  >
    <header>
      <div class="pill">
        <div class="circle">
          {{ props.index + 1 }}
        </div>
        <div class="label">
          {{ props.options.key }}
        </div>
      </div>
      <Actions :channelIndex="props.index" />
    </header>
    <div class="name">
      <input
        tabindex="-1"
        type="text"
        :value="channelData.name"
        placeholder="Name"
        @keydown.stop=""
      />
    </div>
    <div class="flex-fill"></div>
    <main>
      <Sequencer v-if="channelData.mode === 0" :channelIndex="props.index" />
      <Tap
        v-if="channelData.mode === 1"
        :channelIndex="props.index"
        :letter="props.options.key"
      />
      <Random v-if="channelData.mode === 2" :channelIndex="props.index" />
    </main>
  </div>
</template>

<script setup>
import { defineProps, inject } from 'vue'
import Actions from './ControllerChannelsItemActions.vue'
import Sequencer from './ControllerChannelSequencer.vue'
import Tap from './ControllerChannelTap.vue'
import Random from './ControllerChannelRandom.vue'

const props = defineProps(['options', 'index', 'state'])

const controllerState = inject('controllerState')
const channelData = computed(() => controllerState.channels[props.index])
</script>

<style lang="scss" scoped>
.channel {
  /* width: 48px; */
  flex: 1;
  height: 100%;
  background: #141415;
  border-radius: calc(48px / 2 - 5px);
  border: 1px solid #303031;
  color: white;
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
  --accent: #27c94c;
  --accent-faded: #27c94c22;
  > header {
    display: flex;
    justify-content: space-between;
  }
  > main {
    flex-grow: 0;
  }
}
.pill {
  height: 18px;
  width: 34px;
  border-radius: 9px;
  background: var(--accent-faded);
  display: flex;
  align-items: center;
  /* justify-content: center; */
  padding: calc(18px / 2 - 12px / 2);
  gap: 5px;
  font-size: 8px;
  .circle {
    background: var(--accent);
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 7px;
    font-weight: 800;
    padding-bottom: 1px;
  }
  .label {
    flex: 1;
    text-align: center;
    padding-right: 4px;
  }
}
.name {
  margin: 5px 0;
  > input {
    background: transparent;
    width: 100%;
    font-size: 22px;
    outline: none;
    &::placeholder {
      opacity: 0.2;
    }
  }
}
</style>

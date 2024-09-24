<template>
  <div class="controller-channels">
    <Item
      v-for="(channel, index) in channels"
      :index="index"
      :options="channel"
    />
  </div>
</template>

<script setup>
import Item from './ControllerChannelsItem.vue'

const channels = [
  {
    key: 'A',
    color: '#27c94c'
  },
  {
    key: 'S',
    color: '#27c94c'
  },
  {
    key: 'D',
    color: '#FF6400'
  },
  {
    key: 'F',
    color: '#FF6400'
  },
  {
    key: 'H',
    color: '#3B84E3'
  },
  {
    key: 'J',
    color: '#3B84E3'
  },
  {
    key: 'K',
    color: '#FF4B69'
  },
  {
    key: 'L',
    color: '#FF4B69'
  }
]
</script>

<style lang="scss" scoped>
.controller-channels {
  /* width: 48px; */
  flex: 1;
  height: 100%;
  background: #141415;
  border-radius: calc(48px / 2);
  border: 1px solid #303031;
  gap: 5px;
  padding: 8px;
  display: flex;
}
</style>

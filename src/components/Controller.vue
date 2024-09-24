<template>
  <div class="controller">
    <ControllerPlayer />
    <ControllerTempo />
    <ControllerChannels />
  </div>
</template>

<script setup>
import ControllerPlayer from './ControllerPlayer.vue'
import ControllerTempo from './ControllerTempo.vue'
import ControllerChannels from './ControllerChannels.vue'
</script>

<style lang="scss" scoped>
.controller {
  min-width: 100%;
  height: 150px;
  /* background: #141415; */
  border-radius: 20px;
  display: flex;
  gap: 5px;
}
</style>

<template>
  <div class="controller-player-visuals">
    <ControllerPlayerTimeline />
    <ControllerPlayerCD />
  </div>
</template>

<script setup>
import ControllerPlayerCD from './ControllerPlayerCD.vue'
import ControllerPlayerTimeline from './ControllerPlayerTimeline.vue'
</script>

<style lang="scss" scoped>
.controller-player-visuals {
  background: black;
  border-radius: 20px;
  padding-top: 10px;
}
</style>

<template>
  <div class="controller-player-visuals">
    <ControllerPlayerCD />
    <ControllerPlayerTimeline />
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
  padding-bottom: 10px;
}
</style>

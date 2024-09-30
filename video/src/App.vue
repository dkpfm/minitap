<script setup>
import TitleSlide from './components/TitleSlide.vue'
import ControllerSlide from './components/ControllerSlide.vue'
import KeyboardSlide from './components/KeyboardSlide.vue'
import KeyboardTempoSlide from './components/KeyboardTempoSlide.vue'
</script>

<template>
  <div class="viewport">
    <!-- <TitleSlide /> -->
    <!-- <ControllerSlide /> -->
    <KeyboardSlide />
    <!-- <KeyboardTempoSlide /> -->
  </div>
</template>

<style lang="scss" scoped>
.viewport {
  width: 1100px;
  height: 660px;
  background: white;
  overflow: hidden;
}
</style>

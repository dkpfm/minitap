<script setup>
import TitleSlide from './components/TitleSlide.vue'
import ControllerSlide from './components/ControllerSlide.vue'
import KeyboardSlide from './components/KeyboardSlide.vue'
import KeyboardTempoSlide from './components/KeyboardTempoSlide.vue'

import SqPills from './components/SqPills.vue'
import SqChannel from './components/SqChannel.vue'
</script>

<template>
  <div class="viewport" v-if="false">
    <!-- <TitleSlide /> -->
    <!-- <ControllerSlide /> -->
    <!-- <KeyboardSlide /> -->
    <!-- <KeyboardTempoSlide /> -->
  </div>
  <div class="viewport-sq" v-if="true">
    <!-- <SqPills /> -->
    <SqChannel />
  </div>
</template>

<style lang="scss" scoped>
.viewport {
  width: 1100px;
  height: 660px;
  background: white;
  overflow: hidden;
}
.viewport-sq {
  width: 800px;
  height: 800px;
  background: white;
  overflow: hidden;
}
</style>

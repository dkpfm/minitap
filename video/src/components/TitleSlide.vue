<script setup>
import gsap from 'gsap'
import { ref, onMounted, watch } from 'vue'
import Logo from './Logo.vue'
import Controller from './../../../src/components/Controller.vue'

const controllerEl = ref(null)
const keyboardEl = ref(null)
const logo = ref(null)

watch(
  () => [controllerEl.value],
  (els) => {
    if (els.findIndex((v) => !v) > -1) return

    // INITIAL STATE
    gsap.set(controllerEl.value, {
      y: -330,
      scale: 1.25
    })
    gsap.set(keyboardEl.value, {
      y: 280,
      scale: 1
    })

    // TIMELINE
    const tl = gsap.timeline().pause()
    tl.to(
      controllerEl.value,
      {
        y: -500,
        duration: 0.5,
        ease: 'power2.out'
      },
      0
    )
    tl.to(
      keyboardEl.value,
      {
        y: 600,
        duration: 0.5,
        ease: 'power2.out'
      },
      0
    )

    tl.call(
      () => {
        logo.value.tl.play()
      },
      null,
      0.15
    )

    window.addEventListener('click', () => tl.play())
  },
  { immediate: true }
)
</script>

<template>
  <div class="wrapper">
    <div class="center">
      <div ref="controllerEl" class="controller"><Controller /></div>
    </div>
    <div class="center">
      <div ref="keyboardEl" class="keyboard"><img src="/keyboard.png" /></div>
    </div>
    <div class="center">
      <Logo ref="logo" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 1100px;
  height: 660px;
  background: white;
  position: relative;
}
.controller {
  width: 1200px;
  height: 150px;
  filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.3));
}
.keyboard {
  width: 960px;
  height: 335px;
  background: #eeee;
  border-radius: 20px;
  filter: drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.2));
  position: relative;
}
</style>

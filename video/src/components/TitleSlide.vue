<script setup>
import gsap from 'gsap'
import { ref, onMounted, watch } from 'vue'
import Logo from './Logo.vue'

const controllerEl = ref(null)
const keyboardEl = ref(null)
const logo = ref(null)

watch(
  () => [controllerEl.value],
  (els) => {
    if (els.findIndex((v) => !v) > -1) return

    // INITIAL STATE
    gsap.set(controllerEl.value, {
      y: -300,
      scale: 1.5
    })
    gsap.set(keyboardEl.value, {
      y: 300,
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
      <div ref="controllerEl" class="controller"></div>
    </div>
    <div class="center">
      <div ref="keyboardEl" class="keyboard"></div>
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
  background: #000;
  border-radius: 50px;
}
.keyboard {
  width: 960px;
  height: 335px;
  background: #eeee;
  border-radius: 20px;
}
</style>

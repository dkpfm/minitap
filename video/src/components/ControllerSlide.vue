<script setup>
import gsap from 'gsap'
import { ref, onMounted, watch } from 'vue'

const controllerTopEl = ref(null)
const controllerTopWrapperEl = ref(null)
const controllerBottomEl = ref(null)
const controllerBottomWrapperEl = ref(null)

watch(
  () => [controllerTopEl.value],
  (els) => {
    if (els.findIndex((v) => !v) > -1) return

    // INITIAL STATE
    gsap.set(controllerTopEl.value, {
      y: -133,
      x: 1500,
      scale: 1.5
    })
    gsap.set(controllerBottomEl.value, {
      y: 133,
      x: -1500,
      scale: 1.5
    })

    // TIMELINE
    const tl = gsap.timeline().pause()

    tl.to(
      controllerTopEl.value,
      {
        x: 600,
        ease: 'expo.out',
        duration: 1
      },
      0
    )
    tl.to(
      controllerBottomEl.value,
      {
        x: -600,
        ease: 'expo.out',
        duration: 1
      },
      0
    )
    tl.to(
      controllerTopWrapperEl.value,
      {
        x: -300,
        ease: 'linear',
        duration: 8
      },
      0
    )
    tl.to(
      controllerBottomWrapperEl.value,
      {
        x: 300,
        ease: 'linear',
        duration: 8
      },
      0
    )

    tl.to(
      controllerTopEl.value,
      {
        x: -400,
        ease: 'expo.inOut',
        duration: 1
      },
      2
    )
    tl.to(
      controllerBottomEl.value,
      {
        x: 400,
        ease: 'expo.inOut',
        duration: 1
      },
      2
    )

    tl.to(
      controllerTopEl.value,
      {
        x: -1300,
        ease: 'expo.inOut',
        duration: 1
      },
      5
    )
    tl.to(
      controllerBottomEl.value,
      {
        x: 1300,
        ease: 'expo.inOut',
        duration: 1
      },
      5
    )

    window.addEventListener('click', () => tl.play())
  },
  { immediate: true }
)
</script>

<template>
  <div class="wrapper">
    <div class="center">
      <div ref="controllerTopWrapperEl">
        <div ref="controllerTopEl" class="controller-top"></div>
      </div>
    </div>
    <div class="center">
      <div ref="controllerBottomWrapperEl">
        <div ref="controllerBottomEl" class="controller-bottom"></div>
      </div>
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
.controller-top,
.controller-bottom {
  width: 1200px;
  height: 150px;
  background: #000;
  border-radius: 20px;
}
</style>

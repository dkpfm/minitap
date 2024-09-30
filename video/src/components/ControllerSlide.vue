<script setup>
import gsap from 'gsap'
import { ref, onMounted, watch, inject } from 'vue'
import Controller from './../../../src/components/Controller.vue'

const controllerTopEl = ref(null)
const controllerTopWrapperEl = ref(null)
const controllerBottomEl = ref(null)
const controllerBottomWrapperEl = ref(null)

const controllerClock = inject('controllerClock')

watch(
  () => [controllerTopEl.value],
  (els) => {
    if (els.findIndex((v) => !v) > -1) return

    // INITIAL STATE
    gsap.set(controllerTopEl.value, {
      y: -133,
      x: 1500,
      scale: 1.5,
      opacity: 0
    })
    gsap.set(controllerBottomEl.value, {
      y: 133,
      x: -1500,
      scale: 1.5,
      opacity: 0
    })

    // TIMELINE
    const tl = gsap.timeline().pause()

    tl.to(
      controllerTopEl.value,
      {
        x: 600,
        opacity: 1,
        ease: 'expo.out',
        duration: 1
      },
      0
    )
    tl.to(
      controllerBottomEl.value,
      {
        x: -600,
        opacity: 1,
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

    window.addEventListener('click', () => {
      tl.play()
      controllerClock.toggle()
    })
  },
  { immediate: true }
)
</script>

<template>
  <div class="wrapper">
    <div class="center">
      <div ref="controllerTopWrapperEl">
        <div ref="controllerTopEl" class="controller-top"><Controller /></div>
      </div>
    </div>
    <div class="center">
      <div ref="controllerBottomWrapperEl">
        <div ref="controllerBottomEl" class="controller-bottom">
          <Controller />
        </div>
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
  /* background: #000; */
  /* border-radius: 20px; */
  filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.3));
}
</style>

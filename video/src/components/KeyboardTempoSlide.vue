<script setup>
import gsap from 'gsap'
import { ref, onMounted, watch, inject } from 'vue'
import ControllerPlayer from './../../../src/components/ControllerPlayer.vue'
import ControllerTempo from './../../../src/components/ControllerTempo.vue'

const wrapperEl = ref(null)
const kayboardEl = ref(null)
const uiEl = ref(null)

const controllerClock = inject('controllerClock')

watch(
  () => [kayboardEl.value],
  (els) => {
    if (els.findIndex((v) => !v) > -1) return

    // INITIAL STATE
    gsap.set(wrapperEl.value, {
      z: 1.1,
      opacity: 0,
      scale: 1.5,
      rotation: 90
    })
    gsap.set(kayboardEl.value, {
      y: 800,
      x: -900,
      scale: 1.75
    })
    gsap.set(uiEl.value, {
      y: -800,
      x: 275,
      scale: 2.5
    })

    // TIMELINE
    const tl = gsap.timeline().pause()
    tl.to(
      wrapperEl.value,
      {
        opacity: 1,
        rotation: 0,
        scale: 1,
        ease: 'expo.out',
        duration: 1.5
      },
      0
    )
    tl.to(
      uiEl.value,
      {
        y: 0,
        ease: 'expo.out',
        duration: 1.3
      },
      0
    )

    tl.to(
      kayboardEl.value,
      {
        y: 200,
        ease: 'expo.out',
        duration: 1.5
      },
      0
    )

    tl.to(
      wrapperEl.value,
      {
        opacity: 0,
        rotation: -90,
        scale: 1.5,
        ease: 'expo.in',
        duration: 1
      },
      1.5
    )

    tl.to(
      uiEl.value,
      {
        y: 120 * 10,
        ease: 'expo.in',
        duration: 1
      },
      1.5
    )

    tl.to(
      kayboardEl.value,
      {
        y: -220 * 7,
        ease: 'expo.in',
        duration: 1
      },
      1.5
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
  <div ref="wrapperEl" class="wrapper">
    <div class="center">
      <div ref="uiEl" class="ui">
        <ControllerPlayer />
        <ControllerTempo />
      </div>
    </div>
    <div class="center">
      <div ref="kayboardEl" class="keyboard">
        <img src="/keyboard.png" />
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
  overflow: visible;
}
.ui {
  width: 100px;
  height: 300px;
  height: 150px;
  display: flex;
  gap: 10px;
  /* background: red; */
  filter: drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.4));

  .pill {
    background: #000;
    height: 100%;
    border-radius: 50px;
    width: 100px;
  }
}
.keyboard {
  width: 960px;
  height: 335px;
  background: #eeee;
  border-radius: 20px;
  filter: drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.2));
}
</style>

<script setup>
import gsap from 'gsap'
import { ref, onMounted, watch } from 'vue'

const wrapperEl = ref(null)
const kayboardEl = ref(null)
const uiEl = ref(null)

watch(
  () => [kayboardEl.value],
  (els) => {
    if (els.findIndex((v) => !v) > -1) return

    // INITIAL STATE
    gsap.set(wrapperEl.value, {
      z: 1.1,
      scale: 1,
      rotation: 0
    })
    gsap.set(kayboardEl.value, {
      x: -800,
      scale: 1.75
    })
    gsap.set(uiEl.value, {
      x: 325,
      scale: 1.2
    })

    // TIMELINE
    const tl = gsap.timeline().pause()
    tl.to(
      wrapperEl.value,
      {
        z: 1.1,
        opacity: 0,
        scale: 1.5,
        rotation: -90,
        ease: 'expo.in',
        duration: 1.5
      },
      0
    )

    tl.to(
      kayboardEl.value,
      {
        y: 700,
        ease: 'expo.in',
        duration: 1.5
      },
      0
    )
    tl.to(
      uiEl.value,
      {
        y: -500,
        ease: 'expo.in',
        duration: 1.5
      },
      0
    )

    window.addEventListener('click', () => tl.play())
  },
  { immediate: true }
)
</script>

<template>
  <div ref="wrapperEl" class="wrapper">
    <div class="center">
      <div ref="uiEl" class="ui">
        <div class="pill"></div>
        <div class="pill"></div>
      </div>
    </div>
    <div class="center">
      <div ref="kayboardEl" class="keyboard"></div>
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
  width: 280px;
  height: 300px;
  display: flex;
  gap: 10px;
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
}
</style>

<script setup>
import gsap from 'gsap'
import { ref, onMounted, watch } from 'vue'
import ControllerChannelsItem from './../../../src/components/ControllerChannelsItem.vue'

const wrapperEl = ref(null)
const kayboardEl = ref(null)
const channelEl = ref(null)

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
    gsap.set(channelEl.value, {
      y: -120 * 4,
      scale: 2
    })

    gsap.set(kayboardEl.value, {
      y: 220 * 3
    })

    // TIMELINE
    const tl = gsap.timeline().pause()

    tl.to(wrapperEl.value, {
      opacity: 1,
      rotation: 0,
      scale: 1,
      ease: 'expo.out',
      duration: 1.5
    })

    tl.to(
      channelEl.value,
      {
        y: -120,
        ease: 'expo.out',
        duration: 1.3
      },
      0
    )

    tl.to(
      kayboardEl.value,
      {
        y: 220,
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
      channelEl.value,
      {
        y: -120 * 5,
        x: 200,
        ease: 'expo.in',
        duration: 1
      },
      1.5
    )

    tl.to(
      kayboardEl.value,
      {
        y: 220 * 3,
        x: -200,
        ease: 'expo.in',
        duration: 1
      },
      1.5
    )

    window.addEventListener('click', () => tl.play())
  },
  { immediate: true }
)
</script>

<template>
  <div ref="wrapperEl" class="wrapper">
    <div class="center">
      <div ref="channelEl" class="channel">
        <ControllerChannelsItem
          :options="{ key: 'L', color: '#FF4B69' }"
          :index="7"
          :color="red"
        />
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
.channel {
  width: 130px;
  height: 130px;
  /* background: #000; */
  /* border-radius: 20px; */
  filter: drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.2));
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

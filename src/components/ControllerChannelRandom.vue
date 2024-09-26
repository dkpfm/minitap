<template>
  <div class="channel-random">
    <div class="slider">
      <input type="range" />
    </div>
    <div class="radar">
      <RadarBg />
      <div class="radar-points">
        <div
          class="point"
          v-for="point in points"
          :style="`transform: translate(${point.x}px, ${point.y}px)`"
        ></div>
      </div>
      <div class="radar-cursor" :style="`transform: rotate(${rotation}deg)`">
        <div class="radar-cursor-line"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import RadarBg from './ControllerChannelRandomRadarBg.vue'
import createRandomSequence from '~/utils/createRandomSequence'

const points = createRandomSequence({ amount: 10 }).map((p, index) => {
  const r = 8 + 10 * (Math.sin(index * 2323.32982) + 1)
  const a = p / 2
  return { x: r * Math.cos(a), y: r * Math.sin(a) }
})

const controllerClock = inject('controllerClock')
const rotation = computed(() => (controllerClock.currentTime.value / 16) * 360)
</script>

<style lang="scss" scoped>
.channel-random {
  display: flex;
  /* flex-direction: column; */
  gap: 3px;
  /* background: rgba(red, 0.5); */
  height: fit-content;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  pointer-events: none;
  justify-content: space-between;
  text-align: center;
  padding: 10px;

  .radar-cursor {
    width: 86px;
    height: 86px;
    position: absolute;
    /* background: red; */
    top: 0;
    right: 0;
    .radar-cursor-line {
      position: absolute;
      width: 2px;
      border-radius: 1px;
      background: white;
      height: 30px;
      left: calc(50% - 1px);
      top: calc(86px / 4 - 30px / 4);
    }
  }

  .radar-points {
    width: 86px;
    height: 86px;
    position: absolute;
    top: 0;
    right: 0;
    > .point {
      width: 3px;
      height: 3px;
      margin-left: -1.5px;
      margin-top: -1.5px;
      border-radius: 50%;
      background: var(--accent);
      position: absolute;
      left: 50%;
      top: 50%;
    }
  }

  .slider {
    display: flex;
    justify-content: center;
    pointer-events: all;
    margin-top: 47px;
    input[type='range'] {
      display: block;
      -webkit-appearance: none;
      -moz-appearance: none;
      background: #323232;
      border-radius: 5px;
      width: 100%;
      height: 4px;
      outline: 0;
    }
    input[type='range']::-webkit-slider-thumb {
      -webkit-appearance: none;
      background-color: #fff;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      outline: 1px solid #141415;
      /* cursor: pointer; */
      transition: 0.3s ease-in-out;
    }
  }
}
</style>

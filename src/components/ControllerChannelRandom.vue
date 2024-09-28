<template>
  <div class="channel-random">
    <div class="slider">
      <div class="label" :style="`transform: translateX(${labelX}px)`">
        {{ controllerState.channels[channelIndex].random.amount }}
      </div>
      <input
        type="range"
        min="0"
        max="24"
        v-model="controllerState.channels[channelIndex].random.amount"
      />
    </div>
    <div class="radar">
      <RadarBg />
      <div class="radar-points">
        <div
          :class="{ point: true, active: pointsState[index] }"
          v-for="(point, index) in points"
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
import createRandomSequence from './../utils/createRandomSequence'

const props = defineProps(['channelIndex'])

const pointsState = ref([])

onMounted(() => {
  window.addEventListener('message', ({ data }) => {
    if (
      data.name === 'mt-internal-rand-trigger' &&
      data.channel === props.channelIndex
    ) {
      pointsState.value[data.randIndex] = true
      setTimeout(() => {
        pointsState.value[data.randIndex] = false
      }, 300)
    }
  })
})
const controllerState = inject('controllerState')
const points = computed(() => {
  const randData = controllerState.channels[props.channelIndex].random
  return createRandomSequence({
    amount: randData.amount,
    seed: randData.seed
  }).map((p, index) => {
    const r =
      8 + 10 * (Math.sin(index * 2323.32982 + randData.seed * 2.132) + 1)
    // const r = 16
    const a = (p / 16) * (Math.PI * 2) - Math.PI / 2
    return {
      x: Math.round((r * Math.cos(a) * 100) / 100),
      y: Math.round(r * Math.sin(a) * 100) / 100
    }
  })
})

watch(
  () => controllerState.channels[props.channelIndex].random.amount,
  () => {
    controllerState.channels[props.channelIndex].random.seed = Math.round(
      Math.random() * 64
    )
  }
)

const labelX = computed(
  () => (controllerState.channels[props.channelIndex].random.amount / 24) * 28
)

const controllerClock = inject('controllerClock')
const rotation = computed(() => (controllerClock.currentTime.value / 16) * 360)
</script>

<style lang="scss" scoped>
.channel-random {
  display: flex;
  gap: 3px;
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
      &.active {
        background: white;
      }
    }
  }

  .slider {
    display: flex;
    justify-content: center;
    pointer-events: all;
    flex-direction: column;
    justify-content: center;
    gap: 3px;

    .label {
      display: flex;
      font-size: 8px;
      font-weight: bold;
    }

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

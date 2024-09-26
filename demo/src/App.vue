<script setup>
import _ from 'underscore'
import { TresCanvas } from '@tresjs/core'
import CirclesGroup from './components/CirclesGroup.vue'

import { inject } from 'vue'

const physics = inject('physics')
</script>

<template>
  <TresCanvas clear-color="#ECECF0" window-size>
    <TresOrthographicCamera :position="[0, 0, 3]" :look-at="[0, 0, 0]" />
    <CirclesGroup :physics="physics" />
  </TresCanvas>
</template>

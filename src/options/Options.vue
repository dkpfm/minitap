<template>
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <carbon-settings class="icon-btn mx-2 text-2xl" />
    <div>Options</div>
    <p class="my-2 opacity-50">
      {{ $t('options.desc') }}
    </p>

    <input
      id="input"
      v-model="storageDemo"
      :placeholder="$t('options.sync_storage')"
      :aria-label="$t('options.sync_storage')"
      type="text"
      autocomplete="false"
      p="x-4 y-2"
      w="250px"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
    >

    <Footer />

    <div class="mt-4">
      {{ $t('options.powered_by_vite') }} <pixelarticons-zap class="align-middle" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { storageDemo } from '~/logic/storage'
</script>

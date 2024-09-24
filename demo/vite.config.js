import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig(({ command }) => {
  return {
    plugins: [Vue()]
  }
})

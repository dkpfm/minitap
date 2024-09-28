import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) =>
            tag.startsWith('Tres') && tag !== 'TresCanvas'
        }
      }
    })
  ],
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/svg', href: '/icon-512.svg' }]
    }
  }
})

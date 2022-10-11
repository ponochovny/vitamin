import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // esbuild: {
  //   drop: ['console', 'debugger'],
  // },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/utils/_variables.scss";`,
      },
    },
  },
})

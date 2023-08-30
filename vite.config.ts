import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: 'http://127.0.0.1:4173',
  server: {
    open: true,
    port: 4173
  },
  build: {
    sourcemap: 'inline',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        code: resolve(__dirname, 'src/figmaCode/code.ts')
      },
      output: {
        entryFileNames: '[name].js'
      }
    }
  }
})

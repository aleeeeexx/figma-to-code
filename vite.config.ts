import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import mkcert from 'vite-plugin-mkcert'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), viteSingleFile()],
  // base: 'http://10.39.68.40:4173/',
  // server: {
  //   open: true,
  //   port: 4173,
  //   https: false
  // },
  build: {
    // sourcemap: 'inline',
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,
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

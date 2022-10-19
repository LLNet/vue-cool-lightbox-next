import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
  },
  build: {
    lib: {
        entry: path.resolve(__dirname, 'src/components/index.js'),
        name: 'CoolLightBoxNext',
        fileName: (format) => `vue-cool-lightbox-next.${format}.js`,
    },
    rollupOptions: {
        external: ['vue'],
        output: {
            globals: {
                vue: 'Vue',
            }
        }
    }
  }
})

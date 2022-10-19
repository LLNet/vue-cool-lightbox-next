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
        entry: path.resolve(__dirname, 'src/index.js'),
        name: 'CoolLightBox',
        fileName: (format) => `CoolLightBox.${format}.js`,
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

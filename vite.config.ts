import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import tsconfigPaths from 'vite-tsconfig-paths'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.config'

export default defineConfig({
  plugins: [solidPlugin(), tsconfigPaths({ root: './' }), crx({ manifest })],
  build: {
    rollupOptions: {
      logLevel: 'silent',
    },
  },
})

import { defineConfig } from "vite"
import solid from "vite-plugin-solid"
import tsconfigPaths from "vite-tsconfig-paths"
import { crx } from "@crxjs/vite-plugin"
import manifest from "./manifest.config"

export default defineConfig({
  plugins: [solid(), tsconfigPaths({ root: "./" }), crx({ manifest })],
  build: {
    // minify: false,
    // terserOptions: {
    //   compress: false,
    //   mangle: false,
    // },
    rollupOptions: {
      logLevel: "silent",
      output: {
        manualChunks: {
          ui: ["@ark-ui/solid"],
          icons: ["lucide-solid"],
          styles: ["@pandacss/dev", "@park-ui/panda-preset"],
          framework: ["solid-js"],
        },
      },
    },
  },
})

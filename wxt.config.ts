import { defineConfig } from "wxt"
import solid from "vite-plugin-solid"
import { resolve } from "path"

export default defineConfig({
  imports: false,
  modules: ["@wxt-dev/module-solid"],
  srcDir: "./src",
  alias: { "styled-system": resolve("./styled-system") },
  zip: { artifactTemplate: "extension-{{browser}}.zip", compressionLevel: 9 },
  vite: () => ({ plugins: [solid()], build: { chunkSizeWarningLimit: 1000 } }),
  webExt: { disabled: true },
  manifest: {
    name: "Nice Speed Dials",
    description: "Nice and Simple Speed dials Extension for Chrome",
    version: "5",
    version_name: "boron (v5)",
    permissions: ["bookmarks", "favicon", "contextMenus", "storage"],
    icons: {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png",
    },
  },
})

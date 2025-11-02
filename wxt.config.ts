import { defineConfig } from "wxt"
import solid from "vite-plugin-solid"
import { resolve } from "path"

export default defineConfig({
  imports: false,
  modules: ["@wxt-dev/module-solid"],
  srcDir: "./src",
  alias: { "styled-system": resolve("./styled-system") },
  zip: { artifactTemplate: "extension-{{browser}}.zip", compressionLevel: 9 },
  vite: () => ({ plugins: [solid()] }),
  webExt: { disabled: true },
  manifest: {
    name: "Nice Speed Dials",
    description: "Nice and Simple Speed dials Extension for Chrome",
    version: "4",
    version_name: "beryllium (v4)",
    manifest_version: 3,
    permissions: ["bookmarks", "favicon", "contextMenus", "storage"],
    // chrome_url_overrides: { newtab: "index.html" },
    // background: { service_worker: "src/background.ts" },
    icons: {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png",
    },
  },
})

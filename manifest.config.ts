import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest(() => ({
  name: 'Nice Speed Dials',
  description: 'Nice and Simple Speed dials Extension for Chrome',
  version: '4.0.0',
  version_name: 'beryllium (v4)',
  manifest_version: 3,
  permissions: ['bookmarks', 'favicon', 'contextMenus'],
  chrome_url_overrides: {
    newtab: 'index.html',
  },
  background: {
    service_worker: 'src/background.ts',
  },
  icons: {
    '16': 'icons/icon16.png',
    '48': 'icons/icon48.png',
    '128': 'icons/icon128.png',
  },
}))

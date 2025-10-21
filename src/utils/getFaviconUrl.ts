import { browser } from "wxt/browser"

export const getFaviconUrl = (url?: string) => {
  if (!url) return ""
  try {
    return `chrome-extension://${
      browser.runtime.id
    }/_favicon/?pageUrl=${encodeURIComponent(url)}&size=64`
  } catch (e) {
    return `https://api.faviconkit.com/${new URL(url).host}/144`
  }
}

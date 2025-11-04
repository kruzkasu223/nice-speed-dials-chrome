import { browser } from "wxt/browser"

export const getFaviconUrl = (url?: string) => {
  if (!url) return ""
  if (import.meta.env.BROWSER === "firefox") return getFaviconUrlExternal(url)
  try {
    return `chrome-extension://${
      browser.runtime.id
    }/_favicon/?pageUrl=${encodeURIComponent(url)}&size=64`
  } catch {
    return getFaviconUrlExternal(url)
  }
}

// TODO: add support for other browsers without external API
const getFaviconUrlExternal = (url: string) => {
  return `https://ico.faviconkit.net/favicon/${new URL(url).host}`
}

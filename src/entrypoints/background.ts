import { defineBackground } from "wxt/utils/define-background"
import { storage } from "wxt/utils/storage"
import { browser, type Browser } from "wxt/browser"
import { addNewSpeedDial } from "@/stores"

const toggleSettingsDrawer = storage.defineItem<boolean>(
  "local:toggleSettingsDrawer",
  { fallback: false }
)

export default defineBackground(() => {
  const contextMenuHandler = async (
    info: Browser.contextMenus.OnClickData,
    tab?: Browser.tabs.Tab
  ) => {
    if (info.menuItemId === "toggleSettings") {
      const currentValue = await toggleSettingsDrawer.getValue()
      await toggleSettingsDrawer.setValue(!currentValue)
    }

    if (info.menuItemId === "addToSpeedDials") {
      if (!tab?.url) return
      console.log("info", info)
      await addNewSpeedDial({
        title: tab?.title ?? new URL(tab.url).hostname,
        url: tab.url,
      })
    }
  }

  browser.contextMenus.onClicked.addListener(contextMenuHandler)

  browser.contextMenus.create({
    title: "Toggle Settings",
    id: "toggleSettings",
    // @ts-expect-error - getURL is not typed
    documentUrlPatterns: [browser.runtime.getURL("/newtab.html")],
  })

  browser.contextMenus.create({
    title: "Add to Speed Dials",
    id: "addToSpeedDials",
    documentUrlPatterns: ["<all_urls>"],
  })
})

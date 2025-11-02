import { defineBackground } from "wxt/utils/define-background"
import { storage } from "wxt/utils/storage"
import { browser, type Browser } from "wxt/browser"

const toggleSettingsDrawer = storage.defineItem<boolean>(
  "local:toggleSettingsDrawer",
  { fallback: false }
)

export default defineBackground(() => {
  const contextMenuHandler = async (info: Browser.contextMenus.OnClickData) => {
    if (info.menuItemId === "toggleSettings") {
      const currentValue = await toggleSettingsDrawer.getValue()
      await toggleSettingsDrawer.setValue(!currentValue)
    }
  }

  browser.contextMenus.onClicked.addListener(contextMenuHandler)

  browser.contextMenus.create({
    title: "Toggle Settings",
    id: "toggleSettings",
  })
})

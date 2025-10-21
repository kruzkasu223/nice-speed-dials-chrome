import { defineBackground } from "wxt/utils/define-background"

export default defineBackground(() => {
  // import { addNewSpeedDial } from './stores'

  // const contextMenuHandler = (
  //   info: chrome.contextMenus.OnClickData,
  //   tab?: chrome.tabs.Tab
  // ) => {
  //   console.log('on click', info, tab)
  //   if (info.menuItemId === 'toggleAddNew') {
  //   }
  //   if (info.menuItemId === 'toggleSettings') {
  //   }
  //   if (info.menuItemId === 'addToSpeedDials' && tab) {
  //     addNewSpeedDial({
  //       title: tab?.title,
  //       url: tab?.url,
  //     })
  //   }
  // }
  console.log("hi from background")
  // chrome.contextMenus.onClicked.addListener(contextMenuHandler)

  // chrome.contextMenus.create({
  //   title: 'Show/Hide Add New Button',
  //   documentUrlPatterns: [`chrome-extension://${chrome.runtime.id}/index.html`],
  //   id: 'toggleAddNew',
  // })

  // chrome.contextMenus.create({
  //   title: 'Show/Hide Settings Button',
  //   documentUrlPatterns: [`chrome-extension://${chrome.runtime.id}/index.html`],
  //   id: 'toggleSettings',
  // })

  // chrome.contextMenus.create({
  //   title: 'Add To Speed Dials',
  //   documentUrlPatterns: [`<all_urls>`],
  //   id: 'addToSpeedDials',
  // })
})

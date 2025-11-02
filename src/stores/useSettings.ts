import { createSignal } from "solid-js"
import { storage } from "wxt/utils/storage"

// Default values for reset functionality
export const DEFAULT_VALUES = {
  gridColumns: undefined,
  dialSize: 112,
  dialRadius: "sm",
  showAddNewButton: true,
  showSettingsButton: true,
  showHelpButton: true,
  openLinksInNewTab: false,
  disableDragAndDrop: false,
  darkMode: true,
  mainBackgroundColor: "#2c2124",
  mainBackgroundImage: undefined,
}

// Define storage items for all settings
export const gridColumns = storage.defineItem<number | undefined>(
  "local:gridColumns",
  { fallback: DEFAULT_VALUES.gridColumns, defaultValue: undefined }
)

export const dialSize = storage.defineItem<number>("local:dialSize", {
  fallback: DEFAULT_VALUES.dialSize,
})

export const dialRadius = storage.defineItem<string>("local:dialRadius", {
  fallback: DEFAULT_VALUES.dialRadius,
})

export const showAddNewButton = storage.defineItem<boolean>(
  "local:showAddNewButton",
  { fallback: DEFAULT_VALUES.showAddNewButton }
)

export const showSettingsButton = storage.defineItem<boolean>(
  "local:showSettingsButton",
  { fallback: DEFAULT_VALUES.showSettingsButton }
)

export const showHelpButton = storage.defineItem<boolean>(
  "local:showHelpButton",
  { fallback: DEFAULT_VALUES.showHelpButton }
)

export const openLinksInNewTab = storage.defineItem<boolean>(
  "local:openLinksInNewTab",
  { fallback: DEFAULT_VALUES.openLinksInNewTab }
)

export const disableDragAndDrop = storage.defineItem<boolean>(
  "local:disableDragAndDrop",
  { fallback: DEFAULT_VALUES.disableDragAndDrop }
)

export const darkMode = storage.defineItem<boolean>("local:darkMode", {
  fallback: DEFAULT_VALUES.darkMode,
})

export const mainBackgroundColor = storage.defineItem<string>(
  "local:mainBackgroundColor",
  { fallback: DEFAULT_VALUES.mainBackgroundColor }
)

export const mainBackgroundImage = storage.defineItem<string | undefined>(
  "local:mainBackgroundImage",
  { fallback: DEFAULT_VALUES.mainBackgroundImage, defaultValue: undefined }
)

export const toggleSettingsDrawer = storage.defineItem<boolean>(
  "local:toggleSettingsDrawer",
  { fallback: false }
)

// Reset all settings to defaults
export const resetAllSettings = async () => {
  await Promise.all([
    gridColumns.setValue(DEFAULT_VALUES.gridColumns),
    dialSize.setValue(DEFAULT_VALUES.dialSize),
    dialRadius.setValue(DEFAULT_VALUES.dialRadius),
    showAddNewButton.setValue(DEFAULT_VALUES.showAddNewButton),
    showSettingsButton.setValue(DEFAULT_VALUES.showSettingsButton),
    showHelpButton.setValue(DEFAULT_VALUES.showHelpButton),
    openLinksInNewTab.setValue(DEFAULT_VALUES.openLinksInNewTab),
    disableDragAndDrop.setValue(DEFAULT_VALUES.disableDragAndDrop),
    darkMode.setValue(DEFAULT_VALUES.darkMode),
    mainBackgroundColor.setValue(DEFAULT_VALUES.mainBackgroundColor),
    mainBackgroundImage.setValue(DEFAULT_VALUES.mainBackgroundImage),
  ])
}

// Reset individual setting
export const resetSetting = async (
  settingName: keyof typeof DEFAULT_VALUES
) => {
  const defaultValue = DEFAULT_VALUES[settingName]
  switch (settingName) {
    case "gridColumns":
      await gridColumns.setValue(defaultValue as number)
      break
    case "dialSize":
      await dialSize.setValue(defaultValue as number)
      break
    case "dialRadius":
      await dialRadius.setValue(defaultValue as string)
      break
    case "showAddNewButton":
      await showAddNewButton.setValue(defaultValue as boolean)
      break
    case "showSettingsButton":
      await showSettingsButton.setValue(defaultValue as boolean)
      break
    case "showHelpButton":
      await showHelpButton.setValue(defaultValue as boolean)
      break
    case "openLinksInNewTab":
      await openLinksInNewTab.setValue(defaultValue as boolean)
      break
    case "disableDragAndDrop":
      await disableDragAndDrop.setValue(defaultValue as boolean)
      break
    case "darkMode":
      await darkMode.setValue(defaultValue as boolean)
      break
    case "mainBackgroundColor":
      await mainBackgroundColor.setValue(defaultValue as string)
      break
    case "mainBackgroundImage":
      await mainBackgroundImage.setValue(defaultValue as string)
      break
  }
}

const [isSettingDrawerOpen, setIsSettingDrawerOpen] = createSignal(false)

export { isSettingDrawerOpen, setIsSettingDrawerOpen }

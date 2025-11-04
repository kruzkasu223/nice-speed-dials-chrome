import { InfoIcon, RotateCcwIcon, Undo2Icon, XIcon } from "lucide-solid"
import { Button } from "~/components/ui/button"
import { Drawer } from "~/components/ui/drawer"
import { IconButton } from "~/components/ui/icon-button"
import { Text } from "~/components/ui/text"
import {
  isSettingDrawerOpen,
  setIsSettingDrawerOpen,
  gridColumns,
  dialSize,
  dialRadius,
  showAddNewButton,
  showSettingsButton,
  showHelpButton,
  openLinksInNewTab,
  disableDragAndDrop,
  darkMode,
  mainBackgroundColor,
  mainBackgroundImage,
  resetAllSettings,
  resetSetting,
  toggleSettingsDrawer,
  DEFAULT_VALUES,
  speedDials,
} from "~/stores"
import { ColorPicker, Divider, FileUpload } from "."
import { NumberInput } from "~/components/ui/number-input"
import { Switch } from "~/components/ui/switch"
import { Box, Flex } from "styled-system/jsx"
import { Show, createSignal, onMount, createMemo } from "solid-js"
import { Slider } from "~/components/ui/slider"
import { radii } from "@park-ui/panda-preset"
import { parseColor } from "@ark-ui/solid"
import { getGridDimensions } from "@/utils"
import { CustomTooltip } from "./CustomTooltip"

export const SettingsDrawer = () => {
  // Reactive signals for settings
  const [currentGridColumns, setCurrentGridColumns] = createSignal<
    number | undefined
  >(DEFAULT_VALUES.gridColumns)
  const [currentDialSize, setCurrentDialSize] = createSignal(
    DEFAULT_VALUES.dialSize
  )
  const [currentDialRadius, setCurrentDialRadius] = createSignal(
    DEFAULT_VALUES.dialRadius
  )
  const [currentShowAddNew, setCurrentShowAddNew] = createSignal(
    DEFAULT_VALUES.showAddNewButton
  )
  const [currentShowSettings, setCurrentShowSettings] = createSignal(
    DEFAULT_VALUES.showSettingsButton
  )
  const [currentShowHelp, setCurrentShowHelp] = createSignal(
    DEFAULT_VALUES.showHelpButton
  )
  const [currentOpenLinksNewTab, setCurrentOpenLinksNewTab] = createSignal(
    DEFAULT_VALUES.openLinksInNewTab
  )
  const [currentDisableDragDrop, setCurrentDisableDragDrop] = createSignal(
    DEFAULT_VALUES.disableDragAndDrop
  )
  const [currentDarkMode, setCurrentDarkMode] = createSignal(
    DEFAULT_VALUES.darkMode
  )
  const [currentBgColor, setCurrentBgColor] = createSignal(
    DEFAULT_VALUES.mainBackgroundColor
  )
  const [currentBgImage, setCurrentBgImage] = createSignal<string | undefined>(
    DEFAULT_VALUES.mainBackgroundImage
  )

  // Load settings on mount
  onMount(async () => {
    setCurrentGridColumns(await gridColumns.getValue())
    setCurrentDialSize(await dialSize.getValue())
    setCurrentDialRadius(await dialRadius.getValue())
    setCurrentShowAddNew(await showAddNewButton.getValue())
    setCurrentShowSettings(await showSettingsButton.getValue())
    setCurrentShowHelp(await showHelpButton.getValue())
    setCurrentOpenLinksNewTab(await openLinksInNewTab.getValue())
    setCurrentDisableDragDrop(await disableDragAndDrop.getValue())
    setCurrentDarkMode(await darkMode.getValue())
    setCurrentBgColor(await mainBackgroundColor.getValue())
    setCurrentBgImage(await mainBackgroundImage.getValue())

    // Watch for changes
    gridColumns.watch(setCurrentGridColumns)
    dialSize.watch(setCurrentDialSize)
    dialRadius.watch(setCurrentDialRadius)
    showAddNewButton.watch(setCurrentShowAddNew)
    showSettingsButton.watch(setCurrentShowSettings)
    showHelpButton.watch(setCurrentShowHelp)
    openLinksInNewTab.watch(setCurrentOpenLinksNewTab)
    disableDragAndDrop.watch(setCurrentDisableDragDrop)
    darkMode.watch(setCurrentDarkMode)
    mainBackgroundColor.watch(setCurrentBgColor)
    mainBackgroundImage.watch(setCurrentBgImage)

    // Watch for toggle settings drawer
    toggleSettingsDrawer.watch(async (value) => {
      if (value) {
        setIsSettingDrawerOpen(!isSettingDrawerOpen())
        await toggleSettingsDrawer.setValue(false)
      }
    })
  })

  // Calculate default columns when no custom value is set
  const defaultColumns = createMemo(() => {
    return getGridDimensions(speedDials.length).gridWidth
  })

  const handleResetAll = async () => {
    await resetAllSettings()
  }

  return (
    <Drawer.Root
      open={isSettingDrawerOpen()}
      onOpenChange={(e) => setIsSettingDrawerOpen(e.open)}
    >
      <Drawer.Backdrop />
      <Drawer.Positioner w="md">
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Settings</Drawer.Title>
            <Drawer.Description>Look and feel for this page</Drawer.Description>
            {/* <Drawer.CloseTrigger asChild position="absolute" top="3" right="4"> */}
            <Drawer.CloseTrigger position="absolute" top="3" right="4">
              <IconButton variant="ghost">
                <XIcon />
              </IconButton>
            </Drawer.CloseTrigger>
          </Drawer.Header>

          <Drawer.Body>
            <div>
              <SettingItemTitle
                title="Main background"
                subTitle="Image will be used if uploaded, else default/selected color will be used"
                showReset
                onReset={() => {
                  resetSetting("mainBackgroundColor")
                  resetSetting("mainBackgroundImage")
                }}
              />
              <ColorPicker
                mt="4"
                value={parseColor(currentBgColor())}
                onValueChange={(e) => {
                  mainBackgroundColor.setValue(
                    e.value.toString("hex") ||
                      DEFAULT_VALUES.mainBackgroundColor
                  )
                }}
              />

              <Box display="flex" alignItems="center" gap="2">
                <Divider />
                <Text my="2" fontWeight="bold">
                  OR
                </Text>
                <Divider />
              </Box>

              <FileUpload
                currentImage={currentBgImage()}
                accept="image/*"
                onFilesChange={async (files) => {
                  if (files.length > 0) {
                    const file = files[0]
                    const reader = new FileReader()
                    reader.onloadend = async () => {
                      const base64String = reader.result as string
                      await mainBackgroundImage.setValue(
                        base64String || undefined
                      )
                    }
                    reader.readAsDataURL(file)
                  } else {
                    await mainBackgroundImage.setValue(undefined)
                  }
                }}
                onRemove={async () => {
                  await mainBackgroundImage.setValue(undefined)
                }}
              />
              {/* TODO: input field for gradients, or add a tabs for all the options [color, image, gradient, etc] */}
            </div>

            <Divider />

            <div>
              <Flex justify="space-between" align="center" gap="2">
                <SettingItemTitle title="Dark mode" />
                <Switch
                  checked={currentDarkMode()}
                  onCheckedChange={(e) => darkMode.setValue(e.checked)}
                />
              </Flex>
            </div>

            <Divider />

            <div>
              <SettingItemTitle
                title="Grid"
                subTitle="Adjust number of columns (number of rows will be adjusted
                accordingly depending on number of columns and dials)"
                showReset
                onReset={() => resetSetting("gridColumns")}
              />
              <NumberInput
                mt="4"
                value={
                  currentGridColumns()?.toString() ||
                  defaultColumns()?.toString()
                }
                onValueChange={(e) => {
                  const value = Number.parseInt(e.value || "0")
                  if (value >= 1 && value <= 40) gridColumns.setValue(value)
                }}
                min={1}
                max={40}
                step={1}
              >
                Columns
              </NumberInput>
            </div>

            <Divider />

            <div>
              <SettingItemTitle
                title="Dial size"
                subTitle="Adjust the size of dial"
                showReset
                onReset={() => resetSetting("dialSize")}
              />
              <Slider
                mt="4"
                mb="6"
                min={40}
                max={200}
                value={[currentDialSize()]}
                onValueChange={(e) => {
                  const val = e.value[0]
                  if (val !== undefined) {
                    dialSize.setValue(val)
                  }
                }}
                marks={[
                  { value: 40, label: "xs" },
                  { value: 60, label: "sm" },
                  { value: 80, label: "md" },
                  { value: 100, label: "lg" },
                  // { value: 112, label: "lg" },
                  { value: 120, label: "xl" },
                  { value: 140, label: "2xl" },
                  { value: 160, label: "3xl" },
                  { value: 180, label: "3xl" },
                  { value: 200, label: "4xl" },
                ]}
              />
            </div>

            <Divider />

            <div>
              <SettingItemTitle
                title="Dial radius"
                showReset
                onReset={() => resetSetting("dialRadius")}
              />
              <Slider
                mt="4"
                mb="6"
                min={0}
                max={radii.length - 1}
                value={[
                  Math.max(
                    0,
                    Math.min(
                      radii.length - 1,
                      radii.indexOf(
                        currentDialRadius() as
                          | "xs"
                          | "sm"
                          | "md"
                          | "lg"
                          | "xl"
                          | "2xl"
                          | "none"
                      ) || 0
                    )
                  ),
                ]}
                onValueChange={(e) => {
                  const val = e.value[0]
                  if (val !== undefined && radii[val]) {
                    dialRadius.setValue(radii[val] as string)
                  }
                }}
                marks={radii.map((borderRadius, index) => ({
                  value: index,
                  label: borderRadius,
                }))}
              />
            </div>

            <Divider />

            <div>
              <Flex justify="space-between" align="center" gap="2">
                <SettingItemTitle title="Show 'Add New' button" />
                <Switch
                  checked={currentShowAddNew()}
                  onCheckedChange={(e) => showAddNewButton.setValue(e.checked)}
                />
              </Flex>
            </div>

            <Divider />

            <div>
              <Flex justify="space-between" align="center" gap="2">
                <SettingItemTitle
                  title="Show 'Settings' button"
                  info="You will be able to access the toogle settings via context menu (or right clicking) on this page"
                  showReset
                  onReset={() => {
                    showSettingsButton.setValue(false)
                  }}
                />
                <Switch
                  checked={currentShowSettings()}
                  onCheckedChange={(e) =>
                    showSettingsButton.setValue(e.checked)
                  }
                />
              </Flex>
            </div>

            <Divider />

            {/* <div>
              <Flex justify="space-between" align="center">
                <SettingItemTitle title="Show 'Help' button" />
                <Switch
                  checked={currentShowHelp()}
                  onCheckedChange={(e) => showHelpButton.setValue(e.checked)}
                />
              </Flex>
            </div>

            <Divider /> */}

            <div>
              <Flex justify="space-between" align="center" gap="2">
                <SettingItemTitle title="Open links in new tab by default" />
                <Switch
                  checked={currentOpenLinksNewTab()}
                  onCheckedChange={(e) => openLinksInNewTab.setValue(e.checked)}
                />
              </Flex>
            </div>

            <Divider />

            <div>
              <Flex justify="space-between" align="center" gap="2">
                <SettingItemTitle title="Disable drag and drop" />
                <Switch
                  checked={currentDisableDragDrop()}
                  onCheckedChange={(e) =>
                    disableDragAndDrop.setValue(e.checked)
                  }
                />
              </Flex>
            </div>

            {/* <Divider />
            <Divider />

            <div>
              <Flex justify="space-between" align="center">
                <SettingItemTitle title="Sync the settings across all devices" />

                <Switch></Switch>
              </Flex>
            </div> */}

            {/* <Divider />

            <div>
              <SettingItemTitle
                title="Like Using Nice Speed Dials?"
                subTitle="Give us a rating "
              />

              <div>
                <Button mt="4">Rate</Button>
              </div>
            </div>

            <Divider />

            <div>
              <SettingItemTitle
                title="Like Using Nice Speed Dials?"
                subTitle="Donate a cup of coffee or a tea to help support the development
                of this extension"
              />

              <div>
                <Button mt="4">Donate button here</Button>
              </div>
            </div> */}
          </Drawer.Body>
          <Drawer.Footer gap="3">
            {/* <Drawer.CloseTrigger asChild> */}
            <Drawer.CloseTrigger>
              <Button variant="outline">Close</Button>
            </Drawer.CloseTrigger>

            <Button variant="outline" onClick={handleResetAll}>
              <Undo2Icon /> Reset all to Default
            </Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  )
}

const SettingItemTitle = (props: {
  title: string
  subTitle?: string
  showReset?: boolean
  info?: string
  onReset?: () => void
}) => {
  return (
    <>
      <Flex align="center" gap="2">
        <Text size="lg" fontWeight="bold">
          {props.title}
        </Text>

        <Show when={props.info}>
          <CustomTooltip
            content={props.info ?? ""}
            openDelay={0}
            positioning={{ placement: "top" }}
          >
            <IconButton variant="ghost" size="xs">
              <InfoIcon />
            </IconButton>
          </CustomTooltip>
        </Show>

        <Show when={props.showReset}>
          <CustomTooltip
            content="Reset to Default"
            openDelay={0}
            positioning={{ placement: "top" }}
          >
            <IconButton
              variant="ghost"
              size="xs"
              onClick={(e) => {
                e.preventDefault()
                props.onReset?.()
              }}
            >
              <RotateCcwIcon />
            </IconButton>
          </CustomTooltip>
        </Show>
      </Flex>

      <Show when={props.subTitle}>
        <Text size="sm">{props.subTitle}</Text>
      </Show>
    </>
  )
}

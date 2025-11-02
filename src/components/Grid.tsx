import { PlusIcon, SettingsIcon } from "lucide-solid"
// @ts-expect-error ts(2307)
import { dndzone } from "solid-dnd-directive"
import { For, createSignal, createEffect, onMount, Show } from "solid-js"
import {
  BookmarkDataType,
  duplicateSpeedDial,
  moveSpeedDial,
  openModal,
  setSpeedDials,
  speedDials,
  setIsSettingDrawerOpen,
  gridColumns,
  dialSize,
  dialRadius,
  showAddNewButton,
  showSettingsButton,
  showHelpButton,
  disableDragAndDrop,
  DEFAULT_VALUES,
} from "~/stores"
import classes from "~/styles/Grid.module.scss"
import { GridItem, InputModal, SettingsDrawer } from "./"
import { getGridDimensions } from "~/utils"
import { token } from "styled-system/tokens"
import { HStack } from "styled-system/jsx"
import { IconButton } from "./ui/icon-button"
import { CustomTooltip } from "./CustomTooltip"

export const Grid = () => {
  dndzone

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
  const [currentDisableDragDrop, setCurrentDisableDragDrop] = createSignal(
    DEFAULT_VALUES.disableDragAndDrop
  )

  // Load settings on mount
  onMount(async () => {
    setCurrentGridColumns((await gridColumns.getValue()) || undefined)
    setCurrentDialSize(await dialSize.getValue())
    setCurrentDialRadius(await dialRadius.getValue())
    setCurrentShowAddNew(await showAddNewButton.getValue())
    setCurrentShowSettings(await showSettingsButton.getValue())
    setCurrentShowHelp(await showHelpButton.getValue())
    setCurrentDisableDragDrop(await disableDragAndDrop.getValue())

    // Watch for changes
    gridColumns.watch(setCurrentGridColumns)
    dialSize.watch(setCurrentDialSize)
    dialRadius.watch(setCurrentDialRadius)
    showAddNewButton.watch(setCurrentShowAddNew)
    showSettingsButton.watch(setCurrentShowSettings)
    showHelpButton.watch(setCurrentShowHelp)
    disableDragAndDrop.watch(setCurrentDisableDragDrop)
  })

  // Calculate grid dimensions with custom columns
  const gridDimensions = () => {
    const { gridHeight: height, gridWidth: width } = getGridDimensions(
      speedDials.length,
      currentGridColumns() || undefined
    )
    return { height, width }
  }

  // Apply dial size and radius to CSS variables
  createEffect(() => {
    const size = currentDialSize()
    const radius = currentDialRadius()
    const radiusToken = token.var(`radii.${radius}` as any)

    document.documentElement.style.setProperty("--dial-size", `${size}px`)
    document.documentElement.style.setProperty("--dial-radius", radiusToken)
  })

  const onDrag = (e: any, isFinalize = false) => {
    if (isFinalize) {
      const newItems = (e.detail.items as BookmarkDataType[]).filter(
        (item) => item.id !== "ADD" && item.id !== "SETTINGS"
      )
      setSpeedDials(newItems)
      return
    }
    const newItems = e.detail.items as BookmarkDataType[]
    setSpeedDials(newItems)
  }

  const onDragConsider = (e: any) => {
    onDrag(e)
  }

  const onDragFinalize = (e: any) => {
    onDrag(e, true)

    if (e.detail.info.id === "ADD" || e.detail.info.id === "SETTINGS") return

    const itemId = e.detail.info.id
    const item = speedDials.find((item) => item.id === itemId)
    const itemNewIndex = speedDials.findIndex((item) => item.id === itemId)

    if (item && String(itemNewIndex) && item.index !== itemNewIndex)
      moveSpeedDial(
        item,
        itemNewIndex > (item.index ?? itemNewIndex)
          ? itemNewIndex + 1
          : itemNewIndex
      )
  }

  return (
    <>
      <InputModal />
      <SettingsDrawer />

      <HStack
        alignItems="flex-start"
        justifyContent="flex-end"
        alignSelf="flex-start"
        gap={2}
        width="100%"
      >
        <Show when={currentShowAddNew()}>
          <CustomTooltip content="Add New">
            <IconButton variant="outline" onClick={() => openModal("ADD")}>
              <PlusIcon size={20} />
            </IconButton>
          </CustomTooltip>
        </Show>

        <Show when={currentShowSettings()}>
          <CustomTooltip content="Settings">
            <IconButton
              variant="outline"
              onClick={() => setIsSettingDrawerOpen(true)}
            >
              <SettingsIcon size={20} />
            </IconButton>
          </CustomTooltip>
        </Show>

        {/* <Show when={currentShowHelp()}>
          <CustomTooltip content="Help">
            <Button
              variant="outline"
              // open help link
            >
              <CircleQuestionMarkIcon size={20} />
              Help
            </Button>
          </CustomTooltip>
        </Show> */}
      </HStack>

      <div
        class={classes.grid}
        style={{
          "--grid-width": gridDimensions().width.toString(),
          "--grid-height": gridDimensions().height.toString(),
        }}
        // @ts-expect-error ts(2322)
        use:dndzone={{
          items: () => speedDials,
          flipDurationMs: 150,
          dragDisabled: currentDisableDragDrop,
          centreDraggedOnCursor: true,
          dropTargetStyle: {
            outline: "2px dashed var(--colors-gray-a6)",
            borderRadius: "4px",
          },
        }}
        on:consider={onDragConsider}
        on:finalize={onDragFinalize}
      >
        <For each={speedDials}>
          {(item) => (
            <GridItem
              item={item}
              openModal={openModal}
              duplicateSpeedDial={duplicateSpeedDial}
            />
          )}
        </For>
      </div>
    </>
  )
}

import { PlusIcon, SettingsIcon } from 'lucide-solid'
import { dndzone } from 'solid-dnd-directive'
import { For } from 'solid-js'
import {
  DEFAULT_SPEED_DIALS_ITEM,
  BookmarkDataType,
  duplicateSpeedDial,
  moveSpeedDial,
  openModal,
  setSpeedDials,
  speedDials,
  speedDialsGrid,
  setIsSettingDrawerOpen,
} from '~/stores'
import classes from '~/styles/Grid.module.scss'
import { GridItem, InputModal, SettingsDrawer } from './'

const IconMapper = {
  ADD: <PlusIcon class={classes.gridItemImg} />,
  SETTINGS: <SettingsIcon class={classes.gridItemImg} />,
}

export const Grid = () => {
  dndzone

  const onDrag = (e: any, isFinalize = false) => {
    if (isFinalize) {
      const newItems = (e.detail.items as BookmarkDataType[]).filter(
        (item) => item.id !== 'ADD'
      )
      setSpeedDials(newItems.concat([...DEFAULT_SPEED_DIALS_ITEM]))
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

    if (e.detail.info.id === 'ADD') return

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
      <div
        class={classes.grid}
        style={{
          '--grid-width': speedDialsGrid().width,
          '--grid-height': speedDialsGrid().height,
        }}
        // @ts-expect-error ts(2322)
        use:dndzone={{
          items: () => speedDials,
          // some glitches in animations, hence disabling for now
          flipDurationMs: 0,
        }}
        on:consider={onDragConsider}
        on:finalize={onDragFinalize}
      >
        <For each={speedDials}>
          {(item) =>
            item.id === 'ADD' || item.id === 'SETTINGS' ? (
              <div
                class={classes.gridItem}
                onClick={() =>
                  item.id === 'ADD'
                    ? openModal('ADD')
                    : setIsSettingDrawerOpen(true)
                }
              >
                <div class={classes.gridItemContent}>
                  <div
                    classList={{
                      [classes.gridItemImgDiv]: true,
                      [classes.gridItemAddIcon]: true,
                    }}
                  >
                    {IconMapper[item.id]}
                  </div>
                  <p class={classes.gridItemText}>{item.title}</p>
                </div>
              </div>
            ) : (
              <GridItem
                item={item}
                openModal={openModal}
                duplicateSpeedDial={duplicateSpeedDial}
              />
            )
          }
        </For>
      </div>
    </>
  )
}

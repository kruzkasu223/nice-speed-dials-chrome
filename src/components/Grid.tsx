import { PlusIcon } from 'lucide-solid'
import { dndzone } from 'solid-dnd-directive'
import { For } from 'solid-js'
import { Button } from '~/lib/ui/button'
import {
  ADD_NEW_SPEED_DIALS_ITEM,
  BookmarkDataType,
  duplicateSpeedDial,
  moveSpeedDial,
  openModal,
  setSpeedDials,
  speedDials,
  speedDialsGrid,
} from '~/stores'
import classes from '~/styles/Grid.module.scss'
import { GridItem, InputModal } from './'

export const Grid = () => {
  dndzone

  const onDrag = (e: any, isFinalize = false) => {
    if (isFinalize) {
      const newItems = (e.detail.items as BookmarkDataType[]).filter(
        (item) => item.id !== 'ADD'
      )
      newItems.push(ADD_NEW_SPEED_DIALS_ITEM)
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
            item.id === 'ADD' ? (
              <Button
                variant="outline"
                class={classes.gridItem}
                onClick={() => openModal('ADD')}
              >
                <div class={classes.gridItemContent}>
                  <div
                    classList={{
                      [classes.gridItemImgDiv]: true,
                      [classes.gridItemAddIcon]: true,
                    }}
                  >
                    <PlusIcon class={classes.gridItemImg} />
                  </div>
                  <p class={classes.gridItemText}>{item.title}</p>
                </div>
              </Button>
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

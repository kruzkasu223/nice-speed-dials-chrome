import { clsx } from 'clsx'
import { PlusIcon } from 'lucide-solid'
import { dndzone } from 'solid-dnd-directive'
import { Component, createEffect, For, onCleanup } from 'solid-js'
import { HopeProvider } from '@hope-ui/solid'
import {
  ADD_NEW_SPEED_DIALS_ITEM,
  BookmarkDataType,
  createModal,
  createSpeedDials,
} from '../stores'
import {
  gridItem,
  gridItemA,
  gridItemAddIcon,
  gridItemImg,
  gridItemImgDiv,
  gridItemText,
  mainGrid,
} from '../styles'
import { InputModal } from './'
import { GridItem } from './GridItem'

export const Grid: Component = () => {
  dndzone
  const {
    speedDials,
    getSpeedDials,
    setSpeedDials,
    moveSpeedDial,
    speedDialsGrid,
    duplicateSpeedDial,
    chromeBookmarkEventListeners,
    removeChromeBookmarkEventListeners,
  } = createSpeedDials()
  const { openModal } = createModal()

  createEffect(() => {
    getSpeedDials()
    chromeBookmarkEventListeners()
    onCleanup(removeChromeBookmarkEventListeners)
  })

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
        class={mainGrid}
        style={{
          '--grid-width': speedDialsGrid().width,
          '--grid-height': speedDialsGrid().height,
        }}
        // @ts-expect-error
        use:dndzone={{
          items: () => speedDials,
          // some glitches in animations, hence disabling for now
          flipDurationMs: 0,
        }}
        on:consider={onDragConsider}
        on:finalize={onDragFinalize}
      >
        {/* refactor this (HopeProvider) out once menu is available in hope-ui v1 */}
        <HopeProvider>
          <For each={speedDials}>
            {(item) =>
              item.id === 'ADD' ? (
                <button class={gridItemA} onClick={() => openModal('ADD')}>
                  <div class={gridItem}>
                    <div class={clsx(gridItemImgDiv, gridItemAddIcon)}>
                      <PlusIcon
                        class={gridItemImg}
                        color="var(--hope-colors-whiteAlpha-800)"
                      />
                    </div>
                    <p class={gridItemText}>{item.title}</p>
                  </div>
                </button>
              ) : (
                <GridItem
                  item={item}
                  openModal={openModal}
                  duplicateSpeedDial={duplicateSpeedDial}
                />
              )
            }
          </For>
        </HopeProvider>
      </div>
    </>
  )
}

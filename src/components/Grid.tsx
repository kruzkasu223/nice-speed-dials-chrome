import { Component, createEffect, For, onCleanup } from 'solid-js'
import { createModal, createSpeedDials } from '../stores'
import {
  gridItem,
  gridItemA,
  gridItemAddIcon,
  gridItemImg,
  gridItemImgDiv,
  gridItemText,
  mainGrid,
} from '../styles'
import { GridItem } from './GridItem'
import { clsx } from 'clsx'
import { Icon } from '../icons'
import { InputModal } from './'
import { HopeProvider } from '@hope-ui/solid'

export const Grid: Component = () => {
  const {
    speedDials,
    speedDialsGrid,
    getSpeedDials,
    chromeBookmarkEventListeners,
    removeChromeBookmarkEventListeners,
  } = createSpeedDials()
  const { openModal } = createModal()

  createEffect(() => {
    getSpeedDials()
    chromeBookmarkEventListeners()
    onCleanup(removeChromeBookmarkEventListeners)
  })

  return (
    <>
      <InputModal />
      <div
        class={mainGrid}
        style={{
          '--grid-width': speedDialsGrid().width,
          '--grid-height': speedDialsGrid().height,
        }}
      >
        {/* refactor this out once menu is available in hope-ui v1 */}
        <HopeProvider>
          <For each={speedDials}>
            {(item) => <GridItem item={item} openModal={openModal} />}
          </For>
        </HopeProvider>

        <button class={gridItemA} onClick={() => openModal('ADD')}>
          <div class={gridItem}>
            <div class={clsx(gridItemImgDiv, gridItemAddIcon)}>
              <Icon.Plus
                className={gridItemImg}
                colour="var(--hope-colors-whiteAlpha-800)"
              />
            </div>
            <p class={gridItemText}>Add New</p>
          </div>
        </button>
      </div>
    </>
  )
}

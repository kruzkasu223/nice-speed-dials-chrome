import { Component, For } from 'solid-js'
import { createModal } from '../stores'
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

export const Grid: Component = () => {
  const { openModal } = createModal()

  return (
    <>
      <InputModal />
      <div
        class={mainGrid}
        style={{
          '--grid-width': 1,
          '--grid-height': 1,
        }}
      >
        <For each={[]}>{(item) => <GridItem item={item} />}</For>

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

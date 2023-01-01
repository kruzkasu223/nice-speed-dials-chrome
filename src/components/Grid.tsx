import { Component, For } from 'solid-js'
import { createSpeedDials } from '../stores'
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

export const Grid: Component = () => {
  const { speedDials, speedDialsGrid } = createSpeedDials()

  const handleAddNew = () => {
    // setIsOpen(true)
  }

  return (
    <div
      class={mainGrid}
      style={{
        '--grid-width': speedDialsGrid.width,
        '--grid-height': speedDialsGrid.height,
      }}
    >
      <For each={speedDials}>{(item) => <GridItem item={item} />}</For>

      <button class={gridItemA} onClick={handleAddNew}>
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
  )
}

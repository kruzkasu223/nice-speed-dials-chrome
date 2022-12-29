import { Component, For } from 'solid-js'
import { createSpeedDials } from '../store'
import { gridItem, gridItemAdd, gridItemAddIcon, mainGrid } from '../styles'
import { GridItem } from './GridItem'

export const Grid: Component = () => {
  const { speedDials, speedDialsGridHeight, speedDialsGridWidth } =
    createSpeedDials()

  return (
    <div
      class={mainGrid}
      style={{
        '--grid-width': speedDialsGridWidth,
        '--grid-height': speedDialsGridHeight,
      }}
    >
      <For each={speedDials}>{(item) => <GridItem item={item} />}</For>
      <button class={gridItemAdd}>
        <div class={gridItemAddIcon}>+</div>
      </button>
    </div>
  )
}

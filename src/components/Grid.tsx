import { Component, For } from 'solid-js'
import { createSpeedDials } from '../store'
import { gridItemAdd, gridItemAddIcon, gridItemText, mainGrid } from '../styles'
import { GridItem } from './GridItem'

export const Grid: Component = () => {
  const { speedDials, speedDialsGrid } = createSpeedDials()

  return (
    <div
      class={mainGrid}
      style={{
        '--grid-width': speedDialsGrid.width,
        '--grid-height': speedDialsGrid.height,
      }}
    >
      <For each={speedDials}>{(item) => <GridItem item={item} />}</For>
      <button class={gridItemAdd}>
        <div class={gridItemAddIcon}>
          <svg
            fill="currentColor"
            stroke-width="0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
            style="overflow: visible;"
          >
            <path
              fill-rule="evenodd"
              d="M8 2a.5.5 0 01.5.5v5h5a.5.5 0 010 1h-5v5a.5.5 0 01-1 0v-5h-5a.5.5 0 010-1h5v-5A.5.5 0 018 2z"
            ></path>
          </svg>
        </div>
        <p class={gridItemText}>Add New</p>
      </button>
    </div>
  )
}

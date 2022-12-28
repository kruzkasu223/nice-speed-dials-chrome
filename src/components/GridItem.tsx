import type { Component } from 'solid-js'
import { gridItem, gridItemA, gridItemImg } from '../styles'

export const GridItem: Component = () => {
  return (
    <a class={gridItemA} href="https://kruz.me">
      <div class={gridItem}>
        <img
          class={gridItemImg}
          src="https://kruz.me/images/kruz.webp"
          alt="Kruz"
        />
        <p>Kruz</p>
      </div>
    </a>
  )
}

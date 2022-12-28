import type { Component } from 'solid-js'
import { mainGrid } from '../styles/grid.css'
import { GridItem } from './GridItem'

export const Grid: Component = () => {
  return (
    <div class={mainGrid}>
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
    </div>
  )
}

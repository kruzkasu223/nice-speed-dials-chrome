import { type Component } from 'solid-js'
import { gridItem, gridItemA, gridItemImg, gridItemText } from '../styles'

interface P {
  item: {
    id: number
    name: string
    url: string
    icon: string
  }
}

export const GridItem: Component<P> = ({ item }) => {
  return (
    <a class={gridItemA} href={item.url}>
      <div class={gridItem}>
        <img class={gridItemImg} src={item.icon} alt={item.name} />
        <p class={gridItemText}>{item.name}</p>
      </div>
    </a>
  )
}

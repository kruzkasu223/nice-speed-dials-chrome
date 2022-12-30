import { type Component } from 'solid-js'
import {
  gridItem,
  gridItemA,
  gridItemImg,
  gridItemImgDiv,
  gridItemText,
} from '../styles'
import { getFaviconUrl } from '../utils'

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
        <div class={gridItemImgDiv}>
          <img
            class={gridItemImg}
            src={getFaviconUrl(item.url)}
            alt={item.name}
          />
        </div>
        <p class={gridItemText}>{item.name}</p>
      </div>
    </a>
  )
}

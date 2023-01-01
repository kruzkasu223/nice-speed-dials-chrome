import { Button } from '@hope-ui/core'
import { type Component } from 'solid-js'
import { Icon } from '../icons'
import {
  gridItem,
  gridItemA,
  gridItemImg,
  gridItemImgDiv,
  gridItemText,
  gridMenuIcon,
  menuIcon,
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
  const handleOpenMenu = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <a class={gridItemA} href={item.url}>
      <div class={gridItem}>
        <button class={gridMenuIcon} onClick={handleOpenMenu}>
          <Icon.ThreeDotsVertical
            className={menuIcon}
            colour="var(--hope-colors-whiteAlpha-800)"
          />
        </button>
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

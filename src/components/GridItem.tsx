import { Popover, Text } from '@hope-ui/core'
import { type Component } from 'solid-js'
import { Icon } from '../icons'
import { Folder } from '../icons/Folder.icon'
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
  item: chrome.bookmarks.BookmarkTreeNode
}

export const GridItem: Component<P> = (props) => {
  const handleOpenMenu = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <a class={gridItemA} href={props.item?.url}>
      <div class={gridItem}>
        <button class={gridMenuIcon} onClick={handleOpenMenu}>
          <Icon.ThreeDotsVertical
            className={menuIcon}
            colour="var(--hope-colors-whiteAlpha-800)"
          />
        </button>
        <div class={gridItemImgDiv}>
          {props.item?.url ? (
            <img
              class={gridItemImg}
              src={getFaviconUrl(props.item?.url)}
              alt={props.item.title}
            />
          ) : (
            <Folder
              className={gridItemImg}
              colour="var(--hope-colors-whiteAlpha-800)"
            />
          )}
        </div>
        <Popover triggerMode="hover">
          <Popover.Trigger as={Text} class={gridItemText}>
            {props.item.title}
          </Popover.Trigger>
          <Popover.Content w="max-content" p={2}>
            <p>{props.item.title}</p>
          </Popover.Content>
        </Popover>
      </div>
    </a>
  )
}

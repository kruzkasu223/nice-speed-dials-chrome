import { Popover, Text } from '@hope-ui/core'
import { HopeProvider } from '@hope-ui/solid'
import { type Component } from 'solid-js'
import { Folder } from '../icons/Folder.icon'
import { BookmarkDataType, ModalTypes } from '../stores'
import {
  gridItem,
  gridItemA,
  gridItemImg,
  gridItemImgDiv,
  gridItemText,
} from '../styles'
import { getFaviconUrl } from '../utils'
import { ContextMenu } from './ContextMenu'

interface P {
  item: BookmarkDataType
  openModal: (type: ModalTypes, item?: BookmarkDataType) => void
}

export const GridItem: Component<P> = (props) => {
  return (
    <a class={gridItemA} href={props.item?.url}>
      <div class={gridItem}>
        {/* refactor this out once menu is available in hope-ui v1 */}
        <HopeProvider>
          <ContextMenu item={props.item} openModal={props.openModal} />
        </HopeProvider>

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
        {/* change this popover to a tooltip once available in hope-ui v1 */}
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

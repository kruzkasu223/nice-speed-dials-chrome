import { FolderIcon } from 'lucide-solid'
import { Popover, Text } from '@hope-ui/core'
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
  duplicateSpeedDial: (item: Partial<BookmarkDataType>) => void
}

export const GridItem = (props: P) => {
  return (
    <a class={gridItemA} href={props.item?.url}>
      <div class={gridItem}>
        <ContextMenu
          item={props.item}
          openModal={props.openModal}
          duplicateSpeedDial={props.duplicateSpeedDial}
        />

        <div class={gridItemImgDiv}>
          {props.item?.url ? (
            <img
              class={gridItemImg}
              src={getFaviconUrl(props.item?.url)}
              alt={props.item.title}
            />
          ) : (
            <FolderIcon
              class={gridItemImg}
              color="var(--hope-colors-whiteAlpha-800)"
            />
          )}
        </div>

        {/* change this popover to a tooltip once available in hope-ui v1 */}
        <Popover triggerMode="hover">
          <Popover.Trigger as={Text} class={gridItemText}>
            {props.item.title}
          </Popover.Trigger>
          <Popover.Content w="max-content" maxW="3xl" textAlign="center" p={2}>
            <p>{props.item.title}</p>
            <p>{props.item.url}</p>
          </Popover.Content>
        </Popover>
      </div>
    </a>
  )
}

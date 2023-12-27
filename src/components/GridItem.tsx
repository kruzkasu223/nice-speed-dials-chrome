import { FolderIcon } from 'lucide-solid'
import { Popover, Text } from '@hope-ui/core'
import { BookmarkDataType, ModalTypes } from '../stores'
import classes from '../styles/Grid.module.scss'
import { getFaviconUrl } from '../utils'
import { ContextMenu } from './ContextMenu'

interface P {
  item: BookmarkDataType
  openModal: (type: ModalTypes, item?: BookmarkDataType) => void
  duplicateSpeedDial: (item: Partial<BookmarkDataType>) => void
}

export const GridItem = (props: P) => {
  return (
    <a class={classes.gridItem} href={props.item?.url}>
      <div class={classes.gridItemContent}>
        <ContextMenu
          item={props.item}
          openModal={props.openModal}
          duplicateSpeedDial={props.duplicateSpeedDial}
        />

        <div class={classes.gridItemImgDiv}>
          {props.item?.url ? (
            <img
              class={classes.gridItemImg}
              src={getFaviconUrl(props.item?.url)}
              alt={props.item.title}
            />
          ) : (
            <FolderIcon
              class={classes.gridItemImg}
              color="var(--hope-colors-whiteAlpha-800)"
            />
          )}
        </div>

        {/* change this popover to a tooltip once available in hope-ui v1 */}
        <Popover triggerMode="hover">
          <Popover.Trigger as={Text} class={classes.gridItemText}>
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

import { FolderIcon } from "lucide-solid"
import { Portal } from "solid-js/web"
import { Text } from "~/components/ui/text"
import { Tooltip } from "~/components/ui/tooltip"
import { BookmarkDataType, ModalTypes } from "~/stores"
import classes from "~/styles/Grid.module.scss"
import { getFaviconUrl } from "~/utils"
import { ContextMenu } from "./"

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
            <FolderIcon class={classes.gridItemImg} />
          )}
        </div>

        <Tooltip.Root
          lazyMount
          unmountOnExit
          closeDelay={0}
          openDelay={100}
          positioning={{ placement: "bottom" }}
          closeOnPointerDown={false}
        >
          <Tooltip.Trigger width="full">
            <Text fontSize="xs" class={classes.gridItemText}>
              {props.item.title}
            </Text>
          </Tooltip.Trigger>

          <Portal>
            <Tooltip.Positioner>
              <Tooltip.Arrow>
                <Tooltip.ArrowTip />
              </Tooltip.Arrow>
              <Tooltip.Content w="max-content" maxW="3xl" textAlign="center">
                <Text>{props.item.title}</Text>
                <Text>{props.item.url}</Text>
              </Tooltip.Content>
            </Tooltip.Positioner>
          </Portal>
        </Tooltip.Root>
      </div>
    </a>
  )
}

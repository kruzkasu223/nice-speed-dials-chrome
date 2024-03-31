import {
  CopyPlusIcon,
  FileStackIcon,
  MoreVerticalIcon,
  PencilIcon,
  Trash2Icon,
} from 'lucide-solid'
import { Portal } from 'solid-js/web'
import { HStack } from 'styled-system/jsx'
import * as Menu from '~/lib/ui/menu'
import { BookmarkDataType, ModalTypes } from '~/stores'
import classes from '~/styles/Grid.module.scss'

type P = {
  item: BookmarkDataType
  openModal: (type: ModalTypes, item?: BookmarkDataType) => void
  duplicateSpeedDial: (item: Partial<BookmarkDataType>) => void
}

export const ContextMenu = (props: P) => {
  const handleOpenMenu = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <Menu.Root lazyMount unmountOnExit>
      <Menu.Trigger onClick={handleOpenMenu}>
        <MoreVerticalIcon size={14} class={classes.menuIcon} />
      </Menu.Trigger>

      <Portal>
        <Menu.Positioner>
          <Menu.Content border="1px solid var(--colors-gray-a6)">
            {!props.item?.url && (
              <Menu.Item
                id="open_in_new_tab"
                onClick={() => {
                  chrome.bookmarks
                    .getChildren(props.item.id)
                    .then((children) => {
                      children?.forEach((child) => {
                        child?.url &&
                          chrome.tabs.create({
                            url: child.url,
                            active: false,
                          })
                      })
                    })
                }}
              >
                <HStack>
                  <FileStackIcon size={16} />
                  Open all in new tab
                </HStack>
              </Menu.Item>
            )}

            <Menu.Item
              id="edit"
              onClick={() => props.openModal('EDIT', props.item)}
            >
              <HStack>
                <PencilIcon size={16} />
                Edit
              </HStack>
            </Menu.Item>

            <Menu.Item
              id="delete"
              onClick={() => props.openModal('DELETE', props.item)}
            >
              <HStack>
                <Trash2Icon size={16} />
                Delete
              </HStack>
            </Menu.Item>

            <Menu.Item
              id="duplicate"
              onClick={() => props.duplicateSpeedDial(props.item)}
            >
              <HStack>
                <CopyPlusIcon size={16} />
                Duplicate
              </HStack>
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

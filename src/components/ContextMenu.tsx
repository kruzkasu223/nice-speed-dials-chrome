import { type Component } from 'solid-js'
import {
  IconButton,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
} from '@hope-ui/solid'
import { gridMenuIcon, menuIcon } from '../styles'
import type { BookmarkDataType, ModalTypes } from '../stores'
import {
  CopyPlusIcon,
  MoreVerticalIcon,
  PencilIcon,
  Trash2Icon,
} from 'lucide-solid'

type P = {
  item: BookmarkDataType
  openModal: (type: ModalTypes, item?: BookmarkDataType) => void
  duplicateSpeedDial: (item: Partial<BookmarkDataType>) => void
}

export const ContextMenu: Component<P> = (props) => {
  const handleOpenMenu = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <Menu>
      <MenuTrigger
        onClick={handleOpenMenu}
        as={IconButton}
        variant="outline"
        colorScheme="neutral"
        class={gridMenuIcon}
        icon={
          <MoreVerticalIcon
            class={menuIcon}
            color="var(--hope-colors-whiteAlpha-800)"
          />
        }
      />
      <MenuContent minW={'max-content'}>
        <MenuItem
          icon={<PencilIcon size={16} color="var(--hope-colors-primary-200)" />}
          onSelect={() => props.openModal('EDIT', props.item)}
        >
          Edit
        </MenuItem>
        <MenuItem
          icon={<Trash2Icon size={16} color="var(--hope-colors-primary-200)" />}
          onSelect={() => props.openModal('DELETE', props.item)}
        >
          Delete
        </MenuItem>
        <MenuItem
          icon={
            <CopyPlusIcon size={16} color="var(--hope-colors-primary-200)" />
          }
          onSelect={() => props.duplicateSpeedDial(props.item)}
        >
          Duplicate
        </MenuItem>
      </MenuContent>
    </Menu>
  )
}

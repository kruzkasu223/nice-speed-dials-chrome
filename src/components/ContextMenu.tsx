import { type Component } from 'solid-js'
import {
  IconButton,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
} from '@hope-ui/solid'
import { Icon } from '../icons'
import { gridMenuIcon, menuIcon } from '../styles'
import type { BookmarkDataType, ModalTypes } from '../stores'

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
          <Icon.ThreeDotsVertical
            className={menuIcon}
            colour="var(--hope-colors-whiteAlpha-800)"
          />
        }
      />
      <MenuContent minW={'max-content'}>
        <MenuItem
          icon={<Icon.Edit colour="var(--hope-colors-primary-200)" />}
          onSelect={() => props.openModal('EDIT', props.item)}
        >
          Edit
        </MenuItem>
        <MenuItem
          icon={<Icon.Delete colour="var(--hope-colors-primary-200)" />}
          onSelect={() => props.openModal('DELETE', props.item)}
        >
          Delete
        </MenuItem>
        <MenuItem
          icon={<Icon.Duplicate colour="var(--hope-colors-primary-200)" />}
          onSelect={() => props.duplicateSpeedDial(props.item)}
        >
          Duplicate
        </MenuItem>
      </MenuContent>
    </Menu>
  )
}

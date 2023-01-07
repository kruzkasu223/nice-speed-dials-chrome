import {
  IconButton,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
} from '@hope-ui/solid'
import { Component } from 'solid-js'
import { Icon } from '../icons'
import { type BookmarkDataType, ModalTypes } from '../stores'
import { gridMenuIcon, menuIcon } from '../styles'

type P = {
  item: BookmarkDataType
  openModal: (type: ModalTypes, item?: BookmarkDataType) => void
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
        <MenuItem onSelect={() => props.openModal('EDIT', props.item)}>
          Edit
        </MenuItem>
        <MenuItem onSelect={() => props.openModal('DELETE', props.item)}>
          Delete
        </MenuItem>
      </MenuContent>
    </Menu>
  )
}

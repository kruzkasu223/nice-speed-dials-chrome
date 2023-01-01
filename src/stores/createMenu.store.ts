import { createSignal } from 'solid-js'

const [isMenuOpen, setIsMenuOpen] = createSignal(false)
const toggleMenu = () => setIsMenuOpen((s) => !s)
const [menuData, setMenuData] = createSignal({})

export const createMenu = () => {
  console.log('createMenu')

  const openMenu = () => {
    console.log('openMenu')
    setIsMenuOpen(true)
  }

  const closeMenu = () => {
    console.log('closeMenu')
    setIsMenuOpen(false)
    setMenuData({})
  }

  return {
    isMenuOpen,
    setIsMenuOpen,
    toggleMenu,
    menuData,
    setMenuData,
    openMenu,
    closeMenu,
  }
}

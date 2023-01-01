import { globalStyle, style } from '@vanilla-extract/css'

export const gridItemA = style({
  position: 'relative',
  width: '100%',
  height: '100%',
  borderRadius: '4px',
  textDecoration: 'none',
  color: 'var(--hope-colors-whiteAlpha-800)',
  padding: '8px',
  border: '1px solid var(--hope-colors-whiteAlpha-200)',
  backgroundColor: 'var(--hope-colors-whiteAlpha-50)',
  cursor: 'pointer',
  transition: 'all 0.25s ease-in-out',

  ':hover': {
    backgroundColor: 'var(--hope-colors-whiteAlpha-200)',
  },
})

export const gridMenuIcon = style({
  position: 'absolute',
  top: '8px',
  right: '8px',
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  padding: '4px 2px',
  borderRadius: '2px',
  opacity: '0',
  transition:
    'opacity 0.25s ease-in-out 0s, background-color 0.25s ease-in-out 0s',

  ':hover': {
    backgroundColor: 'var(--hope-colors-whiteAlpha-200)',
  },
  ':focus': {
    opacity: '1',
  },
})

globalStyle(`.${gridItemA}:hover .${gridMenuIcon}`, {
  opacity: '1',
  transition:
    'opacity 0.25s ease-in-out 0.4s, background-color 0.25s ease-in-out 0s',
})

export const menuIcon = style({
  width: '14px',
  height: '14px',
  objectFit: 'contain',
})

export const gridItem = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  flexDirection: 'column',
})

export const gridItemImgDiv = style({
  width: '50%',
  height: '50%',
  padding: '8px',
  borderRadius: '4px',
})

export const gridItemImg = style({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
})

export const gridItemText = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  width: '100%',
  textAlign: 'center',
})

export const gridItemAddIcon = style({
  border: '1px solid var(--hope-colors-whiteAlpha-400)',
})

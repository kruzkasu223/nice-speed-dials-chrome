import { style } from '@vanilla-extract/css'

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
  position: 'absolute !important' as 'absolute',
  top: '8px',
  right: '8px',
  width: 'max-content !important' as 'max-content',
  height: 'max-content !important' as 'max-content',
  cursor: 'pointer',
  background: 'none !important' as 'none',
  border: 'none !important' as 'none',
  padding: '4px 4px !important',
  paddingInlineEnd: '2 !important',
  paddingInlineStart: '2 !important',
  borderRadius: '2px',
  opacity: '0',
  transition:
    'opacity 0.25s ease-in-out 0s, background-color 0.25s ease-in-out 0s',

  ':hover': {
    backgroundColor: 'var(--hope-colors-whiteAlpha-200) !important',
  },
  ':focus': {
    opacity: '1',
  },

  selectors: {
    [`.${gridItemA}:hover &`]: {
      opacity: '1',
      transition:
        'opacity 0.25s ease-in-out 0.4s, background-color 0.25s ease-in-out 0s',
    },
  },
})

export const menuIcon = style({
  width: '14px',
  height: '14px',
  objectFit: 'contain',
  margin: '0',
  padding: '0',
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

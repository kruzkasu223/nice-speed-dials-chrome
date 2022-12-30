import { style } from '@vanilla-extract/css'

export const gridItemA = style({
  width: '100%',
  height: '100%',
  borderRadius: '4px',
  textDecoration: 'none',
  color: 'white',
  padding: '8px',

  ':hover': {
    backdropFilter: 'brightness(1.3)',
  },
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
  backgroundColor: '#423136',
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

export const gridItemAdd = style({
  background: 'inherit',
  border: 'none',
  width: '100%',
  height: '100%',
  borderRadius: '4px',
  textDecoration: 'none',
  color: 'white',
  padding: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  flexDirection: 'column',
  cursor: 'pointer',

  ':hover': {
    backdropFilter: 'brightness(1.3)',
  },
})

export const gridItemAddIcon = style({
  width: '50%',
  height: '50%',
  borderRadius: '4px',
  border: '1px solid white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.5rem',
  overflow: 'hidden',
})

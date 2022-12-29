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

export const gridItemImg = style({
  width: '40%',
  height: '40%',
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
  all: 'unset',
  boxSizing: 'border-box',
  margin: 0,
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
  width: '40%',
  height: '40%',
  borderRadius: '4px',
  border: '1px solid white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '2rem',
  overflow: 'hidden',
})

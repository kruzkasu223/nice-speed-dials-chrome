import { style } from '@vanilla-extract/css'

export const gridItemA = style({
  width: '100%',
  height: '100%',
  borderRadius: '4px',
  textDecoration: 'none',

  ':hover': {
    backgroundColor: '#de316322',
  },
})

export const gridItem = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  flexDirection: 'column',
  color: 'white',
})

export const gridItemImg = style({
  width: '50%',
  height: '50%',
  objectFit: 'cover',
  borderRadius: '4px',
})

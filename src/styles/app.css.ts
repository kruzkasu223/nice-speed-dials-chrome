import { style } from '@vanilla-extract/css'
import { globalStyle } from '@vanilla-extract/css'

globalStyle('*', {
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
})

globalStyle('body', {
  width: '100vw',
  height: '100vh',
  backgroundColor: '#2c2124',
})

globalStyle('#root', {
  width: '100%',
  height: '100%',
  backgroundColor: '#2c2124',
})

export const app = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

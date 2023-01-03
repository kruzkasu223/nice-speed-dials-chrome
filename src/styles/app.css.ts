import { style } from '@vanilla-extract/css'
import { globalStyle } from '@vanilla-extract/css'

globalStyle('*', {
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
  userSelect: 'none',
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
})

globalStyle('body', {
  width: '100vw',
  height: '100vh',
  backgroundColor: '#2c2124',
  fontFamily: 'Roboto, sans-serif',
})

globalStyle('#root', {
  width: '100%',
  height: '100%',
  backgroundColor: '#2c2124',
})

globalStyle(':root', {
  '--hope-colors-neutral-700': '#2c2124 !important',
  '--hope-colors-neutral-600': '#594a4e !important',
} as Record<string, string>)

export const app = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

import { style } from '@vanilla-extract/css'

export const mainGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 96px)',
  gridTemplateRows: 'repeat(2, 96px)',
  gap: '8px',
})

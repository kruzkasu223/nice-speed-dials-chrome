import { style } from '@vanilla-extract/css'

export const mainGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(var(--grid-width, 3), 112px)',
  gridTemplateRows: 'repeat(var(--grid-height, 3), 112px)',
  gap: '8px',
})

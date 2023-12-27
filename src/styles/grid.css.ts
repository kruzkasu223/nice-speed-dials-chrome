import { keyframes, style } from '@vanilla-extract/css'

const fadeIn = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

export const mainGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(var(--grid-width, 3), 112px)',
  gridTemplateRows: 'repeat(var(--grid-height, 3), 112px)',
  gap: '8px',
  animation: `${fadeIn} 0.5s ease-in-out`,
})

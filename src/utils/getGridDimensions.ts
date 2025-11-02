export const getGridDimensions = (
  listLength: number,
  customColumns?: number
) => {
  const grid: any[] = [[]]

  let gridWidth: number
  let gridHeight: number

  if (customColumns !== undefined) {
    gridWidth = customColumns
    gridHeight = Math.ceil(listLength / gridWidth)
  } else {
    gridWidth = Math.ceil(Math.sqrt(listLength))
    gridHeight = Math.ceil(listLength / gridWidth)
  }

  for (let i = 0; i < gridHeight; i++) {
    grid.push([])
    for (let j = 0; j < gridWidth; j++) {
      grid[i].push(null)
    }
  }

  return { grid, gridWidth, gridHeight }
}

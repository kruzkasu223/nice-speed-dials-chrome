export const getGridDimensions = (listLength: number) => {
  const grid: any[] = [[]]

  const gridWidth = Math.ceil(Math.sqrt(listLength))
  const gridHeight = Math.ceil(listLength / gridWidth)

  for (let i = 0; i < gridHeight; i++) {
    grid.push([])
    for (let j = 0; j < gridWidth; j++) {
      grid[i].push(null)
    }
  }

  return {
    grid,
    gridWidth,
    gridHeight,
  }
}

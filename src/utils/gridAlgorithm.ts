export const gridAlgorithm = (listLength: number) => {
  const grid: any[] = [[]]

  // const gridLength = Math.ceil(Math.sqrt(listLength))
  // for (let i = 0; i < gridLength; i++) {
  //   grid.push([])
  //   for (let j = 0; j < gridLength; j++) {
  //     grid[i].push(null)
  //   }
  // }

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

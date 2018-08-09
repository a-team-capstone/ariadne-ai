import floodFill from './floodFill'

const tileMaker = (pixelX, pixelY) => {
  return {
    keyName: 'cell_' + pixelX + '_' + pixelY,
    axialCoordinates: {
      x: 10,
      y: 10
    },
    pixelCoordinates: {x: pixelX, y: pixelY},
    isSelected: false,
    isReachable: false
  }
}

// default is 0, blocked is -1, reachable is 1

const dummyGrid = (width, height, tileSize) => {
  let grid = []
  for(let i = 0; i < height; i++) {
    let row = []
    for(let j = 0; j < width; j++) {
      row.push(tileMaker(j*tileSize, i*tileSize))
    }
    grid.push(row)
  }
  grid[0][0].isReachable = true
  grid[1][0].isSelected = true
  grid[1][1].isSelected = true
  grid[1][2].isSelected = true
  // grid[1][3].isSelected = true
  grid[1][4].isSelected = true
  return floodGrid(grid)
}

const simplifyGrid = grid => {
  return grid.map(row => {
    return row.map(elem => elem.isSelected ? -1 : 0)
  })
}

// passed into floodFill, returns a simplified, flooded grid (first Arg)

const updateGrid = (flooded, grid) => {
  return grid.map((row, i) => {
    return row.map((elem, j) => {
      return ({
        ...elem,
        isReachable: flooded[i][j] ? true : false
        // barriers will be set to isReachable: true
      })
    })
  })
}

const floodGrid = grid => {
  const simplified = simplifyGrid(grid)
  console.log('simplified', simplified)
  console.log('finished calling simplified')
  const flooded = floodFill(0, 0, simplified, 1, -1)
  console.log('flooded', flooded)
  const updated = updateGrid(flooded, grid)
  console.log('updated grid', updated)
  return updated
}

export default dummyGrid

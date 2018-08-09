const floodFill = function(row, col, array, numPixels, blockedVal){
  const up = [row-numPixels, col],
    down = [row+numPixels, col],
    left = [row, col-numPixels],
    right = [row, col+numPixels]

  const neighbors = [right, down, left, up]
  neighbors.forEach(
    neighbor => {
      const neighborRow = neighbor[0]
      const neighborCol = neighbor[1]

      if (neighborRow >= 0
        && neighborRow < array.length
        && neighborCol >= 0
        && neighborCol < array[neighborRow].length ) {

        const neighborStatus = array[neighborRow][neighborCol] 
        if (neighborStatus !== blockedVal && neighborStatus !== 1) { //is the neighbor clear 
                array[neighborRow][neighborCol] = 1
                // array[row][col]
                floodFill(neighborRow, neighborCol, array, numPixels, blockedVal)
        }
      }
    }
  )
  return array
}

export default floodFill


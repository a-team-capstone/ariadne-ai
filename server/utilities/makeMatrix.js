const makeMatrix = (binStr, matrix = []) => {
	const numberOfTiles = 25
  if (!binStr.length) {
    return matrix
  } else {
    let row = binStr.slice(0, numberOfTiles).split('').map(Number)
    matrix.push(row)
    return makeMatrix(binStr.slice(numberOfTiles), matrix)
  }
}

module.exports = makeMatrix

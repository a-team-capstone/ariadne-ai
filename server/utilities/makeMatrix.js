const makeMatrix = (binStr, matrix = []) => {
  if (!binStr.length) {
    return matrix
  } else {
    let row = binStr.slice(0, 100).split('').map(Number)
    matrix.push(row)
    return makeMatrix(binStr.slice(100), matrix)
  }
}

module.exports = makeMatrix

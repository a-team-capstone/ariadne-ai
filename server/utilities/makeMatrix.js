const makeMatrix = (binStr, matrix = []) => {
  if (!binStr.length) {
    return matrix
  } else {
    let row = binStr.slice(0, 50).split('').map(Number)
    matrix.push(row)
    return makeMatrix(binStr.slice(50), matrix)
  }
}

export default makeMatrix

const floodFill = function(row, col, array, numPixels, blockedVal) {
	const up = [row - 1, col],
		down = [row + 1, col],
		left = [row, col - 1],
		right = [row, col + 1]

	const neighbors = [right, down, left, up]
	neighbors.forEach(neighbor => {
		const neighborRow = neighbor[0]
		const neighborCol = neighbor[1]

		if (
			neighborRow >= 0 &&
			neighborRow < array.length &&
			neighborCol >= 0 &&
			neighborCol < array[neighborRow].length
		) {
			const neighborStatus = array[neighborRow][neighborCol]
			console.log('neighbor', neighborStatus)
			if (neighborStatus === 0) {
				//is the neighbor clear
				array[neighborRow][neighborCol] = -1
				// array[row][col]

				floodFill(neighborRow, neighborCol, array, numPixels, blockedVal)
			}
		}
	})
	return array
}

export default floodFill

import floodFill from './floodFill'
// import * as MAZES from '../mazeGrids/10px_tiles';

const tileMaker = (pixelX, pixelY) => {
	return {
		keyName: 'cell_' + pixelX + '_' + pixelY,
		axialCoordinates: {
			x: 0,
			y: 0
		},
		pixelCoordinates: { x: pixelX, y: pixelY },
		isSelected: false,
		isReachable: false
	}
}
// NEW: default is 0, reachable is -1, blocked is 1

const createGrid = (width, height, tileSize, mazeData) => {
	let grid = []
	for (let i = 0; i < height; i++) {
		let row = []
		for (let j = 0; j < width; j++) {
			row.push(tileMaker(j * tileSize, i * tileSize))
		}
		grid.push(row)
	}

	grid = updateSelected(mazeData, grid)
	const floodGridObj = floodGrid(
		grid,
		0,
		0,
		grid.length - 1,
		grid[0].length - 1
	)
	console.log('solvable?', floodGridObj.solvable)
	return floodGridObj.updatedGrid
}

const simplifyGrid = grid => {
	return grid.map(row => {
		return row.map(elem => (elem.isSelected ? 1 : 0))
	})
}

const updateGrid = (flooded, grid) => {
	return grid.map((row, i) => {
		return row.map((elem, j) => {
			return {
				...elem,
				isReachable: flooded[i][j] ? true : false
				// barriers will be set to isReachable: true
			}
		})
	})
}

const updateSelected = (selected, grid) => {
	return grid.map((row, i) => {
		return row.map((elem, j) => {
			return {
				...elem,
				isSelected: selected[i][j] ? true : false
			}
		})
	})
}

const floodGrid = (grid, startRow, startCol, endRow, endCol) => {
	const simplified = simplifyGrid(grid)
	const flooded = floodFill(startRow, startCol, simplified, 1, 1)
	const updated = updateGrid(flooded, grid)
	console.log('flooded end point', flooded[endRow][endCol])
	console.log('flooded', flooded)
	return {
		updatedGrid: updated,
		solvable: flooded[endRow][endCol] === -1
	}
}

export default createGrid

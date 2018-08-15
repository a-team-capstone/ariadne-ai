import * as PIXI from 'pixi.js'

const showFloodFill = (img, maze, tileSize) => {
	// console.log('running game logic')
	// console.log('tileSize', tileSize)

	// var gameHeight = maze.length * tileSize + 500
	// var gameWidth = maze[0].length * tileSize + 100
	var gameHeight = maze.length * tileSize
	var gameWidth = maze[0].length * tileSize
	console.log('gameHeight, gameWidth', gameHeight, gameWidth)
	var app = new PIXI.Application(gameWidth, gameHeight, {
		antialias: true,
		backgroundColor: 0x001099bb,
	})

	var background = PIXI.Sprite.fromImage(img)
	background.anchor.x = 0
	background.anchor.y = 0
	background.position.x = 0
	background.position.y = 0
	background.height = maze.length*tileSize
	background.width = maze[0].length*tileSize

	var mazeGrid = maze

	var clearColor = 0xf7f8f9
	var blockedColor = 0x101010
	var floodColor = 0x0262fc

	var board = new PIXI.Graphics()
	board.addChild(background)

	// Add board tiles. Currently set to transparent
	var tiles = new PIXI.Graphics()
	tiles.alpha = .7

	for (var row = 0; row < maze[0].length; row++) {
		for (var col = 0; col < maze.length; col++) {
			// console.log('row, col', row, col)
			// draw a rectangle
			// var fillColor = clearColor
			if (mazeGrid[col][row] === 1) {
				tiles.beginFill(blockedColor)
				tiles.drawRect(row * tileSize, col * tileSize, tileSize, tileSize)
			}
			if (mazeGrid[col][row] === -1) {
				tiles.beginFill(floodColor)
				tiles.drawRect(row * tileSize, col * tileSize, tileSize, tileSize)

			}
		}
	}
	board.addChild(tiles)

	board.x = 0
	board.y = 0
	app.stage.addChild(board)

	return app
}

export default showFloodFill

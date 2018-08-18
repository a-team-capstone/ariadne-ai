import * as PIXI from 'pixi.js'

const showFloodFill = (img, maze, tileSize, startPoint, endPoint) => {

	var gameHeight = maze.length * tileSize
	var gameWidth = maze[0].length * tileSize
	console.log('gameHeight, gameWidth', gameHeight, gameWidth)
	var app = new PIXI.Application(gameWidth, gameHeight, {
		antialias: true,
		backgroundColor: 0x001099bb,
	})

	var startY = startPoint[0] - (startPoint[0]%tileSize)
	var startX = startPoint[1] - (startPoint[1]%tileSize)
	var endY = endPoint[0] - (endPoint[0]%tileSize)
	var endX = endPoint[1] - (endPoint[1]%tileSize)
	var mazeTarget = {row: endY/tileSize, col: endX/tileSize}


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

	var startCircle = new PIXI.Graphics()
	startCircle.beginFill(0x00ff00)
	startCircle.drawCircle(startX, startY, tileSize*1.25)
	board.addChild(startCircle)

	var endCircle = new PIXI.Graphics()
	endCircle.beginFill(0xed9b0e)
	endCircle.drawCircle(endX, endY, tileSize*1.25)
	board.addChild(endCircle)

	// Add board tiles. Currently set to transparent
	var tiles = new PIXI.Graphics()
	tiles.alpha = .7

	for (var row = 0; row < maze[0].length; row++) {
		for (var col = 0; col < maze.length; col++) {

			// if (mazeGrid[col][row] === 1) {
			// 	tiles.beginFill(blockedColor)
			// 	tiles.drawCircle(row * tileSize, col * tileSize, tileSize/3)
			// }
			if (mazeGrid[col][row] === -1) {
				tiles.beginFill(floodColor)
				tiles.drawCircle(row * tileSize + .5 * tileSize, col * tileSize + .5 * tileSize, tileSize/3)

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

import * as PIXI from 'pixi.js'
import { createSprite } from './PixiObjects'

const showFloodFill = (img, maze, tileSize, startPoint, endPoint) => {
	let gameHeight = maze.length * tileSize
	let gameWidth = maze[0].length * tileSize
	let app = new PIXI.Application(gameWidth, gameHeight, {
		antialias: true,
		backgroundColor: 0x001099bb,
	})

	let startY = startPoint[0] - (startPoint[0]%tileSize)
	let startX = startPoint[1] - (startPoint[1]%tileSize)
	let endY = endPoint[0] - (endPoint[0]%tileSize)
	let endX = endPoint[1] - (endPoint[1]%tileSize)

	let background = PIXI.Sprite.fromImage(img)
	background.anchor.x = 0
	background.anchor.y = 0
	background.position.x = 0
	background.position.y = 0
	background.height = maze.length*tileSize
	background.width = maze[0].length*tileSize

	let mazeGrid = maze

	let floodColor = 0x0262fc

	let board = new PIXI.Graphics()
	board.addChild(background)

	// Add board tiles, currently set to transparent
	let tiles = new PIXI.Graphics()
	tiles.alpha = .7

	for (let row = 0; row < maze[0].length; row++) {
		for (let col = 0; col < maze.length; col++) {
				if (mazeGrid[col][row] === -1) {
					tiles.beginFill(floodColor)
					tiles.drawCircle(row * tileSize + .5 * tileSize, col * tileSize + .5 * tileSize, tileSize/3)
				}
			}
		}
		board.addChild(tiles)

		let player = createSprite('shield.png', startX, startY, .2)
    board.addChild(player);
    
		let endIcon = createSprite('star.png', endX, endY, .17)
		board.addChild(endIcon)

		board.x = 0
		board.y = 0
		app.stage.addChild(board)

		return app
}

export default showFloodFill

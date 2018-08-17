import * as PIXI from 'pixi.js'
import keyboardTracker from './keyboardTracker'
import { greedyBot } from './BotLogic'
import * as move from './MoveLogic'

const createBoard = (img, maze, tileSize, startPoint, endPoint) => {
	console.log('running game logic')
	console.log('tileSize', tileSize)

	var startX = startPoint[0] - (startPoint[0] % tileSize)
	var startY = startPoint[1] - (startPoint[1] % tileSize)
	var endX = endPoint[0] - (endPoint[0] % tileSize)
	var endY = endPoint[1] - (endPoint[1] % tileSize)
	var mazeTarget = { row: endY / tileSize, col: endX / tileSize }

	console.log('ending at', mazeTarget)
	var gameHeight = maze.length * tileSize + 200
	var gameWidth = maze[0].length * tileSize

	console.log('game height and width', gameHeight, gameWidth)
	var app = new PIXI.Application(gameWidth, gameHeight, {
		antialias: true,
		backgroundColor: 0x001099bb
	})

	var background = PIXI.Sprite.fromImage(img)
	background.anchor.x = 0
	background.anchor.y = 0
	background.position.x = 0
	background.position.y = 0
	background.height = maze.length * tileSize
	background.width = maze[0].length * tileSize

	var mazeGrid = maze

	var clearColor = 0xf7f8f9
	var blockedColor = 0x494845

	var board = new PIXI.Graphics()
	board.addChild(background)
	// var bot = greedyBot(app, board, mazeGrid, tileSize)

	var startCircle = new PIXI.Graphics()
	startCircle.beginFill(0x00ff00)
	startCircle.drawCircle(startX, startY, tileSize * 1.25)
	board.addChild(startCircle)

	var endCircle = new PIXI.Graphics()
	endCircle.beginFill(0xed9b0e)
	endCircle.drawCircle(endX, endY, tileSize * 1.25)
	board.addChild(endCircle)

	// set state and track which state to run
	var state = setup
	app.ticker.add(function() {
		state()
	})

	function setup() {
		bunny.x = startX
		bunny.y = startY
		// bot.x=0
		// bot.y=0
		board.visible = true
		basicText.visible = true
		nav.visible = true
		winScreen.visible = false
		state = play
	}

	function play() {
		board.visible = true
		basicText.visible = true
		nav.visible = true
		winScreen.visible = false
	}

	function end() {
		board.visible = false
		basicText.visible = false
		nav.visible = false
		winScreen.visible = true
	}

	// completion screen
	var winScreen = new PIXI.Graphics()
	winScreen.lineStyle(2, 0xf0ead6, 1)
	winScreen.beginFill(0xf7a409)
	winScreen.drawRoundedRect(0, 0, gameWidth, gameHeight, 10)
	var basicText = new PIXI.Text(
		"You've completed the maze!\nClick below to replay.",
		{ fill: 0xf9f9f7, fontSize: '50px' }
	)
	basicText.x = 10
	basicText.y = 150
	winScreen.addChild(basicText)
	var replayButton = new PIXI.Graphics()
	replayButton.beginFill(0x494845)
	replayButton.drawRoundedRect(350, 400, 100, 50, 10)
	replayButton.interactive = true
	replayButton.buttonMode = true
	replayButton.on('pointerdown', () => {
		state = setup
		console.log(state)
	})
	winScreen.addChild(replayButton)

	app.stage.addChild(winScreen)

	// Add board tiles. Currently set to transparent
	var tiles = new PIXI.Graphics()
	tiles.alpha = 0

	for (var row = 0; row < maze[0].length; row++) {
		for (var col = 0; col < maze.length; col++) {
			// draw a rectangle
			tiles.beginFill(mazeGrid[col][row] ? blockedColor : clearColor)
			tiles.drawRoundedRect(
				row * tileSize,
				col * tileSize,
				tileSize,
				tileSize,
				10
			)
		}
	}
	board.addChild(tiles)

	board.x = 0
	board.y = 0
	app.stage.addChild(board)

	// Keyboard navigation

	//Capture the keyboard arrow keys
	let leftKey = keyboardTracker(37),
		upKey = keyboardTracker(38),
		rightKey = keyboardTracker(39),
		downKey = keyboardTracker(40)

	app.ticker.add(() => {
		if (leftKey.isDown) move.left(bunny, mazeGrid, tileSize)
		if (rightKey.isDown) move.right(bunny, mazeGrid, tileSize)
		if (upKey.isDown) move.up(bunny, mazeGrid, tileSize)
		if (downKey.isDown) move.down(bunny, mazeGrid, tileSize)
	})

	leftKey.press = () => {
		move.left(bunny, mazeGrid, tileSize)
	}

	rightKey.press = () => {
		move.right(bunny, mazeGrid, tileSize)
	}

	upKey.press = () => {
		move.up(bunny, mazeGrid, tileSize)
	}

	downKey.press = () => {
		move.down(bunny, mazeGrid, tileSize)
	}

	// navigation buttons
	var nav = new PIXI.Container()

	// draw a rectangle for right button
	var right = new PIXI.Graphics()
	right.lineStyle(2, 0xf0ead6, 1)
	right.beginFill(0x494845)
	right.drawRoundedRect(180, 45, 90, 90, 10)
	// Opt-in to interactivity, show hand curser normalize touch and mouse
	right.interactive = true
	right.buttonMode = true
	right.on('pointerdown', () => (currentBunnyDirection = move.right))
	right.on('pointerup', () => (currentBunnyDirection = null))
	// add button to nav container
	nav.addChild(right)

	// draw a rectangle for left button
	var left = new PIXI.Graphics()
	left.lineStyle(2, 0xf0ead6, 1)
	left.beginFill(0x494845)
	left.drawRoundedRect(0, 45, 90, 90, 10)
	// Opt-in to interactivity, show hand curser normalize touch and mouse
	left.interactive = true
	left.buttonMode = true
	left.on('pointerdown', () => (currentBunnyDirection = move.left))
	left.on('pointerup', () => (currentBunnyDirection = null)) // add button to nav container
	nav.addChild(left)

	// draw a rectangle for up button
	var up = new PIXI.Graphics()
	up.lineStyle(2, 0xf0ead6, 1)
	up.beginFill(0x494845)
	up.drawRoundedRect(90, 0, 90, 90, 10)

	// Opt-in to interactivity, show hand curser normalize touch and mouse
	up.interactive = true
	up.buttonMode = true
	up.on('pointerdown', () => (currentBunnyDirection = move.up))
	up.on('pointerup', () => (currentBunnyDirection = null)) // add button to nav container
	nav.addChild(up)

	// draw a rectangle for down button
	var down = new PIXI.Graphics()
	down.beginFill(0x494845)
	down.lineStyle(2, 0xf0ead6, 1)
	down.drawRoundedRect(90, 90, 90, 90, 10)
	// Opt-in to interactivity, show hand curser normalize touch and mouse
	down.interactive = true
	down.buttonMode = true
	down.on('pointerdown', () => (currentBunnyDirection = move.down))
	down.on('pointerup', () => (currentBunnyDirection = null))
	// add button to nav container
	nav.addChild(down)

	nav.x = 150
	nav.y = 805
	app.stage.addChild(nav)

	// create a new Sprite from an image path
	var bunny = PIXI.Sprite.fromImage('shield.png')

	// center the sprite's anchor point
	bunny.anchor.set(0.5)

	// move the sprite to the start of the maE
	bunny.x = startX
	bunny.y = startY

	// make bunny bigger
	bunny.scale.x = 0.2
	bunny.scale.y = 0.2

	board.addChild(bunny)

	let currentBunnyDirection = 0
	app.ticker.add(() => {
		if (currentBunnyDirection) currentBunnyDirection(bunny, mazeGrid, tileSize)
	})

	// record bunny.x and bunny.y
	var basicText = new PIXI.Text('X: ' + bunny.x + '\nY: ' + bunny.y, {
		fill: 0xf9f9f7
	})
	basicText.x = 10
	basicText.y = 810
	app.stage.addChild(basicText)

	app.ticker.add(function() {
		basicText.text = 'X: ' + bunny.x + '\nY: ' + bunny.y
		reachedTarget(bunny, mazeTarget)
	})

	// check if bunny has reached the target
	function reachedTarget(sprite, target) {
		const targetY = target.row * tileSize // - tileSize
		const targetX = target.col * tileSize // - tileSize
		const reached = sprite.x === targetX && sprite.y === targetY
		if (reached) state = end
		return reached
	}

	return app
}

export default createBoard

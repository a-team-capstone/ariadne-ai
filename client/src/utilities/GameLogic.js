import * as PIXI from 'pixi.js'
import keyboardTracker from './keyboardTracker'
import { wallFollowerBot } from './BotLogic'
import { addPowerUp } from './PowerUpsLogic'
import { createSprite } from './PixiObjects'
import * as move from './MoveLogic'

const createBoard = (img, maze, tileSize, startPoint, endPoint) => {
	let startY = startPoint[0] - (startPoint[0] % tileSize)
	let startX = startPoint[1] - (startPoint[1] % tileSize)
	let endY = endPoint[0] - (endPoint[0] % tileSize)
	let endX = endPoint[1] - (endPoint[1] % tileSize)
	let mazeTarget = { row: endY / tileSize, col: endX / tileSize }
	let gameHeight = maze.length * tileSize + 200
	let gameWidth = maze[0].length * tileSize

	let timeAllowed = 60 // hard coded for now
	let extraTimeX = startX + 100 // hard coded for now
	let extraTimeY = startY // hard coded for now
	let weaponX = startX + 200 // hard coded for now
	let weaponY = startY // hard coded for now
	let slowDownX = startX + 300 // hard coded for now
	let slowDownY = startY // hard coded for now
	let bombX = startX + 400 // hard coded for now
	let bombY = startY // hard coded for now
	let teleX = endX - 400 // hard coded for now
	let teleY = endY // hard coded for now
	let portX = endX - 100 // hard coded for now
	let portY = endY // hard coded for now
	let freezeX = startX + 500 // hard coded for now
	let freezeY = startY // hard coded for now

	let timeRemaining = timeAllowed

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

	var extraTime = addPowerUp(
		'hourGlassYellow.png',
		board,
		extraTimeX,
		extraTimeY,
		tileSize,
		0.25
	)

	var slowDown = addPowerUp(
		'slowDown.png',
		board,
		slowDownX,
		slowDownY,
		tileSize,
		0.15
	)

	var bomb = addPowerUp('bomb.png', board, bombX, bombY, tileSize, 0.3)

	var tele = addPowerUp('tele.png', board, teleX, teleY, tileSize, 0.5)

	var port = addPowerUp('port.png', board, portX, portY, tileSize, 0.5)

	var freeze = addPowerUp('freeze.png', board, freezeX, freezeY, tileSize, 0.25)

	var startCircle = new PIXI.Graphics()
	startCircle.beginFill(0x00ff00)
	startCircle.drawCircle(startX, startY, tileSize * 1.5)
	board.addChild(startCircle)

	// create player
	let player = createSprite('shield.png', startX, startY, 0.2)
	board.addChild(player)
	let currentPlayerDirection = 0

	var weapon = addPowerUp('sword.png', board, weaponX, weaponY, tileSize, 0.15)

	var bot = wallFollowerBot(app, board, mazeGrid, tileSize, startX, startY)

	// var endCircle = new PIXI.Graphics()
	// endCircle.beginFill(0x008BFE)
	// endCircle.drawCircle(endX, endY, tileSize*1.5)
	// board.addChild(endCircle)

	var endIcon = createSprite('star.png', endX, endY, 0.15)
	board.addChild(endIcon)

	// set state and track which state to run
	var state = play
	app.ticker.add(function() {
		state()
	})

	function setup() {
		timeRemaining = timeAllowed
		player.x = startX
		player.y = startY
		board.visible = true
		coordsText.visible = true
		nav.visible = true
		winScreen.visible = false
		botWonScreen.visible = false
		timeText.visible = true
		freezeOverlay.visible = false

		//reset bot
		bot = wallFollowerBot(app, board, mazeGrid, tileSize, startX, startY, 2)

		// reset powerups
		if (extraTime) extraTime.destroy()
		extraTime = addPowerUp(
			'hourGlassYellow.png',
			board,
			extraTimeX,
			extraTimeY,
			tileSize,
			0.25
		)

		if (weapon) weapon.destroy()
		weapon = addPowerUp('sword.png', board, weaponX, weaponY, tileSize, 0.15)
		weaponGrabbed = false

		if (slowDown) slowDown.destroy()
		slowDown = addPowerUp(
			'slowDown.png',
			board,
			slowDownX,
			slowDownY,
			tileSize,
			0.15
		)

		if (bomb) bomb.destroy()
		bomb = addPowerUp('bomb.png', board, bombX, bombY, tileSize, 0.3)

		freezeCount = 300
		freezeOn = false
		freeze = addPowerUp('freeze.png', board, freezeX, freezeY, tileSize, 0.25)

		state = play
	}

	function play() {
		board.visible = true
		bot.visible = true
		player.visible = true
		coordsText.visible = true
		nav.visible = true
		winScreen.visible = false
		botWonScreen.visible = false
		timeText.visible = true
	}

	function win() {
		winScreen.visible = true
		board.visible = false
		bot.visible = false
		player.visible = false
		coordsText.visible = false
		nav.visible = false
		botWonScreen.visible = false
		outOfTimeScreen.visible = false
		timeText.visible = false
	}

	function botWon() {
		board.visible = false
		bot.visible = false
		player.visible = false
		coordsText.visible = false
		nav.visible = false
		winScreen.visible = false
		botWonScreen.visible = true
		outOfTimeScreen.visible = false
		timeText.visible = false
	}

	function outOfTime() {
		outOfTimeScreen.visible = true
		board.visible = false
		bot.visible = false
		player.visible = false
		nav.visible = false
		timeText.visible = false
		coordsText.visible = false
	}

	// completion screen
	var winScreen = new PIXI.Graphics()
	winScreen.lineStyle(2, 0xf0ead6, 1)
	winScreen.beginFill(0xf7a409)
	winScreen.drawRoundedRect(0, 0, gameWidth, gameHeight, 10)
	var winText = new PIXI.Text('Maze complete!\nClick below to replay.', {
		fill: 0xf9f9f7,
		fontSize: '40px'
	})
	winText.x = 10
	winText.y = 150
	winScreen.addChild(winText)
	var replayButton = new PIXI.Graphics()
	replayButton.beginFill(0x494845)
	replayButton.drawRoundedRect(100, 400, 100, 50, 10)
	replayButton.interactive = true
	replayButton.buttonMode = true
	replayButton.on('pointerdown', () => {
		state = setup
	})
	winScreen.addChild(replayButton)

	// out of time screen
	var outOfTimeScreen = new PIXI.Graphics()
	outOfTimeScreen.lineStyle(2, 0xf0ead6, 1)
	outOfTimeScreen.beginFill(0x808080)
	outOfTimeScreen.drawRoundedRect(0, 0, gameWidth, gameHeight, 10)
	var outOfTimeText = new PIXI.Text('Out of time!\nClick below to replay.', {
		fill: 0xf9f9f7,
		fontSize: '40px'
	})
	outOfTimeText.x = 10
	outOfTimeText.y = 150
	outOfTimeScreen.addChild(outOfTimeText)
	var tryAgainButton = new PIXI.Graphics()
	tryAgainButton.beginFill(0x494845)
	tryAgainButton.drawRoundedRect(100, 400, 100, 50, 10)
	tryAgainButton.interactive = true
	tryAgainButton.buttonMode = true
	tryAgainButton.on('pointerdown', () => {
		state = setup
	})
	outOfTimeScreen.addChild(tryAgainButton)

	// out of time screen
	var botWonScreen = new PIXI.Graphics()
	botWonScreen.lineStyle(2, 0xf0ead6, 1)
	botWonScreen.beginFill(0x003366)
	botWonScreen.drawRoundedRect(0, 0, gameWidth, gameHeight, 10)
	var botWonText = new PIXI.Text('The bot beat you!\nClick below to replay.', {
		fill: 0xf9f9f7,
		fontSize: '40px'
	})
	botWonText.x = 10
	botWonText.y = 150
	botWonScreen.addChild(botWonText)
	var botWonButton = new PIXI.Graphics()
	botWonButton.beginFill(0xf7a409)
	botWonButton.drawRoundedRect(100, 400, 100, 50, 10)
	botWonButton.interactive = true
	botWonButton.buttonMode = true
	botWonButton.on('pointerdown', () => {
		state = setup
	})
	botWonScreen.addChild(botWonButton)

	app.ticker.add(() => {
		if (timeRemaining > 0) {
			timeRemaining -= 1 / 60
			timeText.text = 'Time Remaining: ' + Math.round(timeRemaining)
		} else {
			state = outOfTime
		}
	})

	app.stage.addChild(winScreen)
	app.stage.addChild(outOfTimeScreen)
	app.stage.addChild(botWonScreen)

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

	// arrow key movement
	let frames = 0
	app.ticker.add(() => {
		frames++
		if (frames % 4 === 0) {
			if (leftKey.isDown) move.left(player, mazeGrid, tileSize)
			if (rightKey.isDown) move.right(player, mazeGrid, tileSize)
			if (upKey.isDown) move.up(player, mazeGrid, tileSize)
			if (downKey.isDown) move.down(player, mazeGrid, tileSize)
		}
	})
	// nav button movement
	app.ticker.add(() => {
		if (currentPlayerDirection && frames % 4 === 0)
			currentPlayerDirection(player, mazeGrid, tileSize)
	})

	leftKey.press = () => {
		move.left(player, mazeGrid, tileSize)
	}

	rightKey.press = () => {
		move.right(player, mazeGrid, tileSize)
	}

	upKey.press = () => {
		move.up(player, mazeGrid, tileSize)
	}

	downKey.press = () => {
		move.down(player, mazeGrid, tileSize)
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
	right.on('pointerdown', () => (currentPlayerDirection = move.right))
	right.on('pointerup', () => (currentPlayerDirection = null))
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
	left.on('pointerdown', () => (currentPlayerDirection = move.left))
	left.on('pointerup', () => (currentPlayerDirection = null)) // add button to nav container
	nav.addChild(left)

	// draw a rectangle for up button
	var up = new PIXI.Graphics()
	up.lineStyle(2, 0xf0ead6, 1)
	up.beginFill(0x494845)
	up.drawRoundedRect(90, 0, 90, 90, 10)

	// Opt-in to interactivity, show hand curser normalize touch and mouse
	up.interactive = true
	up.buttonMode = true
	up.on('pointerdown', () => (currentPlayerDirection = move.up))
	up.on('pointerup', () => (currentPlayerDirection = null)) // add button to nav container
	nav.addChild(up)

	// draw a rectangle for down button
	var down = new PIXI.Graphics()
	down.beginFill(0x494845)
	down.lineStyle(2, 0xf0ead6, 1)
	down.drawRoundedRect(90, 90, 90, 90, 10)
	// Opt-in to interactivity, show hand curser normalize touch and mouse
	down.interactive = true
	down.buttonMode = true
	down.on('pointerdown', () => (currentPlayerDirection = move.down))
	down.on('pointerup', () => (currentPlayerDirection = null))
	// add button to nav container
	nav.addChild(down)

	nav.x = 150
	nav.y = 805
	app.stage.addChild(nav)

	// record player.x and player.y
	var coordsText = new PIXI.Text('X: ' + player.x + '\nY: ' + player.y, {
		fill: 0xf9f9f7
	})
	coordsText.x = 10
	coordsText.y = 810
	app.stage.addChild(coordsText)

	// record time remaining
	var timeText = new PIXI.Text('Time remaining: ' + Math.round(timeRemaining), {
		fill: 0x000000
	})
	timeText.x = 350
	timeText.y = 810
	app.stage.addChild(timeText)

	// update coordinates and check if reached target
	app.ticker.add(function() {
		coordsText.text = 'X: ' + player.x + '\nY: ' + player.y
		// check if player reached target
		if (overlapping(player, mazeTarget)) {
			state = win
		}

		// check if bot reached target
		if (overlapping(bot, mazeTarget)) {
			state = botWon
		}
	})

	// check if extra time should be activated
	app.ticker.add(function() {
		if (extraTime && overlapping(player, extraTime)) {
			timeRemaining += 10
			extraTime.destroy()
			extraTime = null
		}
	})

	// check if bomb should be activated
	app.ticker.add(function() {
		if (bomb && overlapping(player, bomb)) {
			{
				player.x = startX
				player.y = startY
				bomb.destroy()
				bomb = null
			}
		}
		if (bomb && overlapping(bot, bomb)) {
			{
				bot.x = startX
				bot.y = startY
				bomb.destroy()
				bomb = null
			}
		}
	})

	// check if teleport should be activated
	app.ticker.add(function() {
		if (tele && port && overlapping(player, tele, 1)) {
			{
				player.x = portX
				player.y = portY
			}
		}
		// if ( tele && port && overlapping(player, port, 1)) {
		// 	{
		// 		player.x = teleX
		// 		player.y = teleY
		// 	}
		// }
		if (tele && port && overlapping(bot, tele, 1)) {
			{
				bot.x = portX
				bot.y = portY
			}
		}
		// if ( tele && port && overlapping(bot, port, 1)) {
		// 	{
		// 		bot.x = teleX
		// 		bot.y = teleY
		// 	}
		// }
	})

	// prepare freeze overlay
	var freezeOverlay = new PIXI.Graphics()
	freezeOverlay.alpha = 0.4
	freezeOverlay.lineStyle(2, 0xf0ead6, 1)
	freezeOverlay.beginFill(0x00ccfe)
	freezeOverlay.drawRoundedRect(0, 0, gameWidth, gameHeight, 10)
	freezeOverlay.visible = false
	var freezeText = new PIXI.Text(5, { fill: 0xf9f9f7, fontSize: '300px' })
	freezeText.x = 200
	freezeText.y = 250
	freezeOverlay.addChild(freezeText)
	app.stage.addChild(freezeOverlay)

	// check if freeze should be activated
	var freezeCount = 300
	var freezeOn = false
	app.ticker.add(function() {
		if (freeze && overlapping(player, freeze)) {
			freezeOn = true
			freeze.destroy()
			freeze = null
		}
		if (freezeOn && freezeCount) {
			freezeOverlay.visible = true
			freezeCount--
			freezeText.text = Math.round(freezeCount / 60)
			timeRemaining += 1 / 60
			// console.log('FREEZE BOT')
			const currentFreezeBotX = bot.x
			const currentFreezeBotY = bot.y
			const oldFreezeBot = bot
			bot = wallFollowerBot(
				app,
				board,
				mazeGrid,
				tileSize,
				currentFreezeBotX,
				currentFreezeBotY,
				9999
			)
			oldFreezeBot.x = -999
			oldFreezeBot.y = -999
		}
		if (freezeOn && !freezeCount) {
			freezeOn = false
			freezeOverlay.visible = false
			// console.log('UNFREEZE BOT')
			const currentUnFreezeBotX = bot.x
			const currentUnFreezeBotY = bot.y
			const oldUnFreezeBot = bot
			bot = wallFollowerBot(
				app,
				board,
				mazeGrid,
				tileSize,
				currentUnFreezeBotX,
				currentUnFreezeBotY,
				2
			)
			oldUnFreezeBot.x = -999
			oldUnFreezeBot.y = -999
		}
	})

	// check if weapon should be activated
	let weaponGrabbed = false
	app.ticker.add(function() {
		if (!weaponGrabbed) {
			if (weapon && overlapping(player, weapon)) {
				weaponGrabbed = true
			}
		} else {
			weapon.x = player.x + tileSize * 1.5
			weapon.y = player.y
			if (overlapping(player, bot)) {
				bot.x = startX
				bot.y = startY
				weaponGrabbed = false
				weapon.destroy()
				weapon = null
			}
		}
	})

	// check if slowDown should be activated
	app.ticker.add(function() {
		if (slowDown && overlapping(bot, slowDown)) {
			console.log('SLOW BOT DOWN')
			const currentBotX = bot.x
			const currentBotY = bot.y
			const oldBot = bot
			bot = wallFollowerBot(
				app,
				board,
				mazeGrid,
				tileSize,
				currentBotX,
				currentBotY,
				1
			)
			oldBot.x = -999
			oldBot.y = -999
			slowDown.destroy()
			slowDown = null
		}
	})

	// check if a sprite has reached a certain target
	function overlapping(sprite, target, closeness = 2) {
		let targetX, targetY
		if (target.row && target.col) {
			targetY = target.row * tileSize // - tileSize
			targetX = target.col * tileSize // - tileSize
		} else {
			targetY = target.y
			targetX = target.x
		}
		const proximityX = Math.abs(sprite.x - targetX)
		const proximityY = Math.abs(sprite.y - targetY)
		const proximityRequirement = tileSize * closeness

		const areOverlapping =
			proximityX <= proximityRequirement && proximityY <= proximityRequirement

		return areOverlapping
	}

	return app
}

export default createBoard

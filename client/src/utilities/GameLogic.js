import * as PIXI from 'pixi.js'
import keyboardTracker from './keyboardTracker'
import {wallFollowerBot} from './BotLogic'
import {addPowerUp, activateTeleport} from './PowerUpsLogic'
import {createSprite} from './PixiObjects'
import * as move from './MoveLogic'
import {overlapping} from './MoveLogic'
import {createGameScreen, createButton} from './GameScreens'

const createBoard = (img, mazeObj, tileSize, startPoint, endPoint) => {

	let maze = mazeObj.data

	let {WP, FZ, XT, BM, TEL, SD, PRT} = mazeObj


	let startY = startPoint[0] - (startPoint[0]%tileSize)
	let startX = startPoint[1] - (startPoint[1]%tileSize)
	let endY = endPoint[0] - (endPoint[0]%tileSize)
	let endX = endPoint[1] - (endPoint[1]%tileSize)
	let mazeTarget = {row: endY/tileSize, col: endX/tileSize}
	let gameHeight = maze.length * tileSize + 200
	let gameWidth = maze[0].length * tileSize
	let mazeHeight = maze.length * tileSize
	let mazeWidth = maze[0].length * tileSize

	console.log('game height and width', gameHeight, gameWidth)

	console.log('weapon', WP)

	let timeAllowed = 60
	let extraTimeX = XT? XT[1] : -999
	let extraTimeY = XT? XT[0] : -999
	let weaponX = WP? WP[1] : -999
	let weaponY = WP? WP[0] : -999
	let slowDownX = SD? SD[1] : -999
	let slowDownY = SD? SD[0] : -999
	let bombX = BM? BM[1] : -999
	let bombY = BM? BM[0] : -999
	let teleX = TEL? TEL[1] : -999
	let teleY = TEL? TEL[0] : -999
	let portX = PRT? PRT[1] : -999
	let portY = PRT? PRT[0] : -999
	let freezeX = FZ? FZ[1] : -999
	let freezeY = FZ? FZ[0] : -999


	let timeRemaining = timeAllowed

	let app = new PIXI.Application(gameWidth, gameHeight, { antialias: true, backgroundColor: 0x001099bb })

	let background = PIXI.Sprite.fromImage(img)
	background.anchor.x = 0
	background.anchor.y = 0
	background.position.x = 0
	background.position.y = 0
	background.height = maze.length*tileSize
	background.width = maze[0].length*tileSize

	let mazeGrid = maze

	let clearColor = 0xf7f8f9
	let blockedColor = 0x494845

	let board = new PIXI.Graphics()
	board.addChild(background)

	let extraTime = addPowerUp('hourGlassYellow.png', board, extraTimeX, extraTimeY, tileSize, .25)


	let bomb = addPowerUp('bomb.png', board, bombX, bombY, tileSize, .3)

	let tele = addPowerUp('tele.png', board, teleX, teleY, tileSize, .5)

	let port = addPowerUp('port.png', board, portX, portY, tileSize, .5)

	let freeze = addPowerUp('freeze.png', board, freezeX, freezeY, tileSize, .15)

	let startCircle = new PIXI.Graphics()
	startCircle.beginFill(0x00ff00)
	startCircle.drawCircle(startX, startY, tileSize*1.5)
	board.addChild(startCircle)

	// create player
	let player = createSprite('shield.png', startX, startY, .2)
	board.addChild(player);
	let currentPlayerDirection = 0


	let endIcon = createSprite('star.png', endX, endY, .15)
	board.addChild(endIcon)

	let botLevelUnlocked = false
	let useBot = false
	// set all bot related things out of sight
	let bot = wallFollowerBot(app, board, mazeGrid, tileSize, -111, -111) // bot setup
	let weapon = addPowerUp('sword.png', board, -999, -999, tileSize, .2) // bot setup
	let slowDown = addPowerUp('slowDown.png', board, -999, -999, tileSize, .15) // bot setup


	// set state and track which state to run
	let state = play
	app.ticker.add(function() {
			state()
	});

	function setup() {
		timeRemaining = timeAllowed
		player.x=startX
		player.y=startY
		board.visible = true;
		coordsText.visible = true;
		nav.visible = true;
		winScreen.visible = false;
		botWonScreen.visible = false;
		timeText.visible = true;
		freezeOverlay.visible = false;

		// set all bot related things out of sight
		// if (bot) bot.destroy()
		bot = wallFollowerBot(app, board, mazeGrid, tileSize, -111, -111)
		if (weapon) weapon.destroy()
		weapon = addPowerUp('sword.png', board, -999, -999, tileSize, .2)
		if (slowDown) slowDown.destroy()
		slowDown = addPowerUp('slowDown.png', board, -999, -999, tileSize, .15)

		// reset powerups
		if (extraTime) extraTime.destroy()
		extraTime = addPowerUp('hourGlassYellow.png', board, extraTimeX, extraTimeY, tileSize, .25)


		if (bomb) bomb.destroy()
		bomb = addPowerUp('bomb.png', board, bombX, bombY, tileSize, .3)

		freezeCount = 300
		freezeOn = false
		if (freeze) freeze.destroy()
		freeze = addPowerUp('freeze.png', board, freezeX, freezeY, tileSize, .15)

		state = useBot? setupBot : play;
	}

	function setupBot() {
		console.log('in setup bot')
		//reset bot
		// if (bot) bot.destroy()
		bot = wallFollowerBot(app, board, mazeGrid, tileSize, startX, startY, 2)

		// reset powerups
		if (slowDown) slowDown.destroy()
		slowDown = addPowerUp('slowDown.png', board, slowDownX, slowDownY, tileSize, .15)

		if (weapon) weapon.destroy()
		weapon = addPowerUp('sword.png', board, weaponX, weaponY, tileSize, .2)
		weaponGrabbed = false

		state = play
	}

	function play() {
		board.visible = true;
		bot.visible = true;
		player.visible = true;
		coordsText.visible = true;
		nav.visible = true;
		winScreen.visible = false;
		botWonScreen.visible = false;
		timeText.visible = true;
	}

	function win() {
		botScreen.visible = botLevelUnlocked? false : true;
		winScreen.visible = botLevelUnlocked? true : false;
		board.visible = false;
		bot.visible = false;
		player.visible = false;
		coordsText.visible = false;
		nav.visible = false;
		botWonScreen.visible = false;
		outOfTimeScreen.visible = false;
		timeText.visible = false;
	}

	function botWon() {
		board.visible = false;
		bot.visible = false;
		player.visible = false;
		coordsText.visible = false;
		nav.visible = false;
		winScreen.visible = false;
		botWonScreen.visible = true;
		outOfTimeScreen.visible = false;
		timeText.visible = false;
	}

	function outOfTime() {
		outOfTimeScreen.visible = true;
		board.visible = false;
		bot.visible = false;
		player.visible = false;
		nav.visible = false;
		timeText.visible = false;
		coordsText.visible = false;
	}



	// completion screen
	let winScreen = createGameScreen(app, gameHeight, gameWidth, 'Maze complete!')
	let replaySoloFromWinScreen = createButton(gameWidth/2, 775, 'replaySolo.png', ()=>{
		useBot = false
		state = setup
	})
	let replayBotFromWinScreen = createButton(gameWidth/2, 875, 'replayBot.png', ()=>{
		useBot = true
		state = setup
	})
	winScreen.addChild(replaySoloFromWinScreen)
	winScreen.addChild(replayBotFromWinScreen)




	// unlocked bot screen
	let botScreen = new PIXI.Graphics();
	botScreen.lineStyle(2, 0xf0ead6, 1);
	botScreen.beginFill(0x00a5ff);
	botScreen.drawRoundedRect(0,0, gameWidth, gameHeight, 10);
	let botText = new PIXI.Text(
		"Unlocked: Human v. Bot Mode\nRace the bot to the finish!",
		{fill:0xf9f9f7, fontSize: '40px'}
	);
	botText.x = 10;
	botText.y = 400;
	botScreen.addChild(botText)
	let secondaryText = new PIXI.Text(
		"Click below to start.",
		{fill:0xf9f9f7, fontSize: '35px'}
	);
	secondaryText.x = 80;
	secondaryText.y = 520;
	botScreen.addChild(secondaryText)

	let botLevelButton = new PIXI.Graphics();
	botLevelButton.beginFill(0x494845)
	botLevelButton.drawRoundedRect(80, 600, 300, 100, 10);
	botLevelButton.interactive = true;
	botLevelButton.buttonMode = true;
	botLevelButton.on('pointerdown', ()=>{
		botLevelUnlocked = true
		state=setup
	})
	botScreen.addChild(botLevelButton)

	// out of time screen
	let outOfTimeScreen = new PIXI.Graphics();
	outOfTimeScreen.lineStyle(2, 0xf0ead6, 1);
	outOfTimeScreen.beginFill(0x808080);
	outOfTimeScreen.drawRoundedRect(0,0, gameWidth, gameHeight, 10);
	let outOfTimeText = new PIXI.Text(
		"Out of time!\nClick below to replay.",
		{fill:0xf9f9f7, fontSize: '40px'}
	);
	outOfTimeText.x = 80;
	outOfTimeText.y = 500;
	outOfTimeScreen.addChild(outOfTimeText)
	let tryAgainButton = new PIXI.Graphics();
	tryAgainButton.beginFill(0x494845)
	tryAgainButton.drawRoundedRect(80, 600, 300, 100, 10);
	tryAgainButton.interactive = true;
	tryAgainButton.buttonMode = true;
	tryAgainButton.on('pointerdown', ()=>{
		state=setup
	})
	outOfTimeScreen.addChild(tryAgainButton)


		// out of time screen
		let botWonScreen = new PIXI.Graphics();
		botWonScreen.lineStyle(2, 0xf0ead6, 1);
		botWonScreen.beginFill(0x003366);
		botWonScreen.drawRoundedRect(0,0, gameWidth, gameHeight, 10);
		let botWonText = new PIXI.Text(
			"The bot beat you!\nClick below to replay.",
			{fill:0xf9f9f7, fontSize: '40px'}
		);
		botWonText.x = 80;
		botWonText.y = 500;
		botWonScreen.addChild(botWonText)
		let botWonButton = new PIXI.Graphics();
	botWonButton.beginFill(0xf7a409)
	botWonButton.drawRoundedRect(80, 600, 300, 100, 10);
	botWonButton.interactive = true;
	botWonButton.buttonMode = true;
	botWonButton.on('pointerdown', ()=>{
			state=setup
		})
		botWonScreen.addChild(botWonButton)




	app.ticker.add(()=>{
		if (timeRemaining > 0) {
		timeRemaining -= 1/60
		timeText.text = 'Time left: '+Math.round(timeRemaining)
		}
		else {
			state = outOfTime
		}
	})

	app.stage.addChild(winScreen)
	app.stage.addChild(botScreen)
	app.stage.addChild(outOfTimeScreen)
	app.stage.addChild(botWonScreen)


	// Add board tiles. Currently set to transparent
	let tiles = new PIXI.Graphics()
	tiles.alpha = 0

	for (let row = 0; row < maze[0].length; row++){
		for (let col = 0; col < maze.length; col++){
		// draw a rectangle
			tiles.beginFill(mazeGrid[col][row] ? blockedColor : clearColor);
		tiles.drawRoundedRect(row*tileSize, col*tileSize, tileSize, tileSize, 10);
		}
	}
	board.addChild(tiles)

	board.x = 0
	board.y = 0
	app.stage.addChild(board);

	// Keyboard navigation

	//Capture the keyboard arrow keys
	let leftKey = keyboardTracker(37),
			upKey = keyboardTracker(38),
			rightKey = keyboardTracker(39),
			downKey = keyboardTracker(40)

	// arrow key movement
	let frames = 0
	app.ticker.add(()=>{
		frames++
		if (frames%4 ===0){
			if (leftKey.isDown) move.left(player, mazeGrid, tileSize)
			if (rightKey.isDown) move.right(player, mazeGrid, tileSize)
			if (upKey.isDown) move.up(player,mazeGrid, tileSize)
			if (downKey.isDown) move.down(player, mazeGrid, tileSize)
		}
	})
		// nav button movement
		app.ticker.add(()=>{
			if (currentPlayerDirection && (frames%4 === 0)) currentPlayerDirection(player, mazeGrid, tileSize)
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
	let nav = new PIXI.Container();


	// draw a rectangle for right button
	let right = new PIXI.Graphics();
	right.lineStyle(2, 0xf0ead6, 1);
	right.beginFill(0x494845);
	right.drawRoundedRect(180,45,90,90,10);
	// Opt-in to interactivity, show hand curser normalize touch and mouse
	right.interactive = true;
	right.buttonMode = true;
	right.on('pointerdown', () => currentPlayerDirection = move.right);
	right.on('pointerup', () => currentPlayerDirection = null);
	// add button to nav container
	nav.addChild(right)


	// draw a rectangle for left button
	let left = new PIXI.Graphics();
	left.lineStyle(2, 0xf0ead6, 1);
	left.beginFill(0x494845);
	left.drawRoundedRect(0,45,90,90, 10);
	// Opt-in to interactivity, show hand curser normalize touch and mouse
	left.interactive = true;
	left.buttonMode = true;
	left.on('pointerdown', () => currentPlayerDirection = move.left);
	left.on('pointerup', () => currentPlayerDirection = null);	// add button to nav container
	nav.addChild(left)


	// draw a rectangle for up button
	let up = new PIXI.Graphics();
	up.lineStyle(2, 0xf0ead6, 1);
	up.beginFill(0x494845);
	up.drawRoundedRect(90,0,90,90, 10);

	// Opt-in to interactivity, show hand curser normalize touch and mouse
	up.interactive = true;
	up.buttonMode = true;
	up.on('pointerdown', () => currentPlayerDirection = move.up);
	up.on('pointerup', () => currentPlayerDirection = null);	// add button to nav container
	nav.addChild(up)

	// draw a rectangle for down button
	let down = new PIXI.Graphics();
	down.beginFill(0x494845);
	down.lineStyle(2, 0xf0ead6, 1);
	down.drawRoundedRect(90,90,90,90,10);
	// Opt-in to interactivity, show hand curser normalize touch and mouse
	down.interactive = true;
	down.buttonMode = true;
	down.on('pointerdown', () => currentPlayerDirection = move.down);
	down.on('pointerup', () => currentPlayerDirection = null);
	// add button to nav container
	nav.addChild(down)


	nav.x = 150
	nav.y = 805
	app.stage.addChild(nav);



	// record player.x and player.y
	let coordsText = new PIXI.Text(
		'X: '+player.x+'\nY: '+player.y,
		{fill:0xf9f9f7}
	);
	coordsText.x = 10;
	coordsText.y = 810;
	app.stage.addChild(coordsText);

	// record time remaining
		let timeText = new PIXI.Text(
			'Time left: '+Math.round(timeRemaining),
			{fill:0xf9f9f7, fontSize: '30px'}
		);
		timeText.x = 350;
		timeText.y = 810;
		app.stage.addChild(timeText);

	// update coordinates and check if reached target
	app.ticker.add(function() {
		coordsText.text = 'X: '+player.x+'\nY: '+player.y
		// check if player reached target
		if (overlapping(player, mazeTarget, tileSize)) {
				state = win
		}

		// check if bot reached target
		else if (overlapping(bot, mazeTarget, tileSize)) {
			bot.x = startX
			bot.y = startY
			state = botWon
		}

	})

	// check if extra time should be activated
	app.ticker.add(function() {
		if (extraTime && overlapping(player, extraTime, tileSize))
		{
			timeRemaining += 10
			extraTime.destroy()
			extraTime = null
		}
	})

		// check if bomb should be activated
		app.ticker.add(function() {
			if ( bomb && overlapping(player, bomb, tileSize)) {
				{
					player.x = startX
					player.y = startY
					bomb.destroy()
					bomb = null
				}
			}
			if ( bomb && overlapping(bot, bomb, tileSize)) {
				{
					bot.x = startX
					bot.y = startY
					bomb.destroy()
					bomb = null
				}
			}

		})


	// prepare freeze overlay
	let freezeOverlay = new PIXI.Graphics();
	freezeOverlay.alpha = .4
	freezeOverlay.lineStyle(2, 0xf0ead6, 1);
	freezeOverlay.beginFill(0x00CCFE);
	freezeOverlay.drawRoundedRect(0,0, gameWidth, gameHeight, 10);
	freezeOverlay.visible = false
	let freezeText = new PIXI.Text(
		5,
		{fill:0xf9f9f7, fontSize: '300px'}
	);
	freezeText.x = 200;
	freezeText.y = 250;
	freezeOverlay.addChild(freezeText)
	app.stage.addChild(freezeOverlay)

	// check if freeze should be activated
	let freezeCount = 300
	let freezeOn = false
	app.ticker.add(function() {
		if (freeze && overlapping(player, freeze, tileSize))
		{
			freezeOn = true
			freeze.destroy()
			freeze = null
		}
		if (freezeOn && freezeCount) {
			freezeOverlay.visible = true
			freezeCount --
			freezeText.text = Math.round(freezeCount/60)
			timeRemaining += 1/60
			// console.log('FREEZE BOT')
			const currentFreezeBotX = bot.x
			const currentFreezeBotY = bot.y
			const oldFreezeBot = bot
			bot = wallFollowerBot(app, board, mazeGrid, tileSize, currentFreezeBotX, currentFreezeBotY, 9999)
			oldFreezeBot.x = -111
			oldFreezeBot.y = -111

		}
		if (freezeOn && !freezeCount) {
			freezeOn = false
			freezeOverlay.visible = false
			// console.log('UNFREEZE BOT')
			const currentUnFreezeBotX = bot.x
			const currentUnFreezeBotY = bot.y
			const oldUnFreezeBot = bot
			bot = wallFollowerBot(app, board, mazeGrid, tileSize, currentUnFreezeBotX, currentUnFreezeBotY, 2)
			oldUnFreezeBot.x = -111
			oldUnFreezeBot.y = -111
		}
	})

	// check if weapon should be activated
	let weaponGrabbed = false
	app.ticker.add(function() {
		if (!weaponGrabbed) {
			if (weapon && overlapping(player, weapon, tileSize))
				{
					weaponGrabbed = true
				}
			} else {
				weapon.x = player.x+tileSize*1.5
				weapon.y = player.y
				if (overlapping(player, bot, tileSize)){
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
			if (slowDown && overlapping(bot, slowDown, tileSize))
			{
				console.log('SLOW BOT DOWN')
				const currentBotX = bot.x
				const currentBotY = bot.y
				const oldBot = bot
				bot = wallFollowerBot(app, board, mazeGrid, tileSize, currentBotX, currentBotY, 1)
				oldBot.x = -111
				oldBot.y = -111
				slowDown.destroy()
				slowDown = null
			}
		})

	// check if teleport should be used
	if (tele.x >= 0 && tele.y >= 0 && port.x >= 0 && port.y >= 0){
		activateTeleport(app, player, tele, port, tileSize, mazeWidth, mazeHeight, mazeGrid) // activate for player
		activateTeleport(app, bot, tele, port, tileSize, mazeWidth, mazeHeight, mazeGrid) // activate for bot
	}





	return app
}

export default createBoard

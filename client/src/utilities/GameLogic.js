import * as PIXI from 'pixi.js'
import keyboardTracker from './keyboardTracker'

const createBoard = (img, maze, tileSize) => {

	console.log('running game logic')
	console.log('tileSize', tileSize)

	var gameHeight = maze.length * tileSize + 200
	var gameWidth = maze[0].length * tileSize

	console.log('game height and width', gameHeight, gameWidth)
	var app = new PIXI.Application(gameWidth, gameHeight, { antialias: true, backgroundColor: 0x001099bb })

	var background = PIXI.Sprite.fromImage(img)
	background.anchor.x = 0
	background.anchor.y = 0
	background.position.x = 0
	background.position.y = 0
	background.height = maze.length*tileSize
	background.width = maze[0].length*tileSize

	var mazeGrid = maze

	var clearColor = 0xf7f8f9
	var blockedColor = 0x494845

	var board = new PIXI.Graphics()
	board.addChild(background)

	// set state and track which state to run
	var state = setup
	app.ticker.add(function() {
			state()
	});

	function setup() {
		bunny.x=0
		bunny.y=0
		bot.x=0
		bot.y=0
		board.visible = true;
		basicText.visible = true;
		nav.visible = true;
		winScreen.visible = false;
		state=play
	}

	function play() {
		board.visible = true;
		basicText.visible = true;
		nav.visible = true;
		winScreen.visible = false;
	}

	function end() {
		board.visible = false;
		basicText.visible = false;
		nav.visible = false;
		winScreen.visible = true;
	}

	// completion screen
	var winScreen = new PIXI.Graphics();
	winScreen.lineStyle(5, 0xf7a409, 1);
	winScreen.beginFill(0xf7a409);
	winScreen.drawRect(0,0, gameWidth, gameHeight);
	var basicText = new PIXI.Text(
		"You've completed the maze!\nClick below to replay.",
		{fill:0xf9f9f7, fontSize: '50px'}
	);
	basicText.x = 10;
	basicText.y = 810;
	winScreen.addChild(basicText)
	var replayButton = new PIXI.Graphics();
	replayButton.beginFill(0x494845)
	replayButton.drawRect(350, 400, 100, 50);
	replayButton.interactive = true;
	replayButton.buttonMode = true;
	replayButton.on('pointerdown', ()=>{
		state=setup
		console.log(state)
	})
	winScreen.addChild(replayButton)



	app.stage.addChild(winScreen)


	// Add board tiles. Currently set to transparent
	var tiles = new PIXI.Graphics()
	tiles.alpha = 0

	console.log(maze.length, maze[0].length)
	for (var row = 0; row < maze[0].length; row++){
		for (var col = 0; col < maze.length; col++){
		// draw a rectangle
			tiles.beginFill(mazeGrid[col][row] ? blockedColor : clearColor);
		tiles.drawRect(row*tileSize, col*tileSize, tileSize, tileSize);
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

	app.ticker.add(()=>{
		if (leftKey.isDown) moveLeft(bunny)
		if (rightKey.isDown) moveRight(bunny)
		if (upKey.isDown) moveUp(bunny)
		if (downKey.isDown) moveDown(bunny)
	})

	leftKey.press = () => {
		moveLeft(bunny)
	}

	rightKey.press = () => {
		moveRight(bunny)
	}

	upKey.press = () => {
		moveUp(bunny)
	}

	downKey.press = () => {
		moveDown(bunny)
	}


	// navigation buttons
	var nav = new PIXI.Container();


	// draw a rectangle for right button
	var right = new PIXI.Graphics();
	right.lineStyle(5, 0x494845, 1);
	right.beginFill(0xffd900);
	right.drawRect(100,20,50,50);
	// Opt-in to interactivity, show hand curser normalize touch and mouse
	right.interactive = true;
	right.buttonMode = true;
	right.on('pointerdown', () => moveRight(bunny));
	// add button to nav container
	nav.addChild(right)


	// draw a rectangle for left button
	var left = new PIXI.Graphics();
	left.lineStyle(5, 0x494845, 1);
	left.beginFill(0xffd900);
	left.drawRect(0,20,50,50);
	// Opt-in to interactivity, show hand curser normalize touch and mouse
	left.interactive = true;
	left.buttonMode = true;
	left.on('pointerdown', () => moveLeft(bunny));
	// add button to nav container
	nav.addChild(left)


	// draw a rectangle for up button
	var up = new PIXI.Graphics();
	up.lineStyle(5, 0x494845, 1);
	up.beginFill(0xffd900);
	up.drawRect(50,0,50,50);

	// Opt-in to interactivity, show hand curser normalize touch and mouse
	up.interactive = true;
	up.buttonMode = true;
	up.on('pointerdown', () => moveUp(bunny));
	// add button to nav container
	nav.addChild(up)

	// draw a rectangle for down button
	var down = new PIXI.Graphics();
	down.beginFill(0xffd900);
	down.lineStyle(5, 0x494845, 1);
	down.drawRect(50,50,50,50);
	// Opt-in to interactivity, show hand curser normalize touch and mouse
	down.interactive = true;
	down.buttonMode = true;
	down.on('pointerdown', () => moveDown(bunny));
	// add button to nav container
	nav.addChild(down)


	nav.x = 210
	nav.y = 810
	app.stage.addChild(nav);


	// create a new Sprite from an image path
	var bunny = PIXI.Sprite.fromImage('shield.png')

	// center the sprite's anchor point
	bunny.anchor.set(0.5);

	// move the sprite to the start of the maE
	bunny.x = 0;
	bunny.y = 0;

	// make bunny bigger
	bunny.scale.x = 0.1
	bunny.scale.y = 0.1

	board.addChild(bunny);

	// function to check if a move is blocked
	function moveBlocked(x,y, sprite){

		var underZero = x < 0 || y < 0
		var overGridLength = (
			x > (mazeGrid[0].length*tileSize)-1 || y > (mazeGrid.length*tileSize)-1
		)
		if (!underZero && !overGridLength){
			var isBlocked = mazeGrid[(y/tileSize)][(x/tileSize)]
		}
		return underZero || overGridLength || isBlocked

	}

	// create movement functions activated by click
	var desiredX = bunny.x
	var desiredY = bunny.y

	function moveRight(sprite) {
		desiredX = sprite.x+tileSize
		desiredY = sprite.y
		if (!moveBlocked(desiredX, desiredY, sprite)) sprite.x+=tileSize
		return !moveBlocked(desiredX, desiredY, sprite)
	}
	function moveLeft(sprite) {
		desiredX = sprite.x-tileSize
		desiredY = sprite.y
		if (!moveBlocked(desiredX, desiredY, sprite)) sprite.x-=tileSize
		return !moveBlocked(desiredX, desiredY, sprite)

	}
	function moveUp(sprite) {
		desiredX = sprite.x
		desiredY = sprite.y-tileSize
		if (!moveBlocked(desiredX, desiredY, sprite)) sprite.y-=tileSize
		return !moveBlocked(desiredX, desiredY, sprite)

	}
	function moveDown(sprite) {
		desiredX = sprite.x
		desiredY = sprite.y+tileSize
		if (!moveBlocked(desiredX, desiredY, sprite)) sprite.y+=tileSize
		return !moveBlocked(desiredX, desiredY, sprite)

	}

	// record bunny.x and bunny.y
	var basicText = new PIXI.Text(
		'X: '+bunny.x+'\nY: '+bunny.y,
		{fill:0xf9f9f7}
	);
	basicText.x = 170;
	basicText.y = 120;
	app.stage.addChild(basicText);

	app.ticker.add(function() {
		basicText.text = 'X: '+bunny.x+'\nY: '+bunny.y
		reachedTarget(bunny, mazeTarget)

	})

	// check if bunny has reached the target
	var mazeTarget = {row: maze.length, col: maze[0].length}

	function reachedTarget(sprite, target){
		const targetY = target.row * tileSize - tileSize
		const targetX = target.col * tileSize - tileSize
		const reached = sprite.x === targetX && sprite.y === targetY
		if (reached) state = end
		return reached
	}

	// create a new Sprite from an image path
	var bot = PIXI.Sprite.fromImage('shield.png')

	// center the sprite's anchor point
	bot.anchor.set(0.5);

	// move the sprite to the start of the maE
	bot.x = 0;
	bot.y = 0;

	// make bunny bigger
	bot.scale.x = 0.08
	bot.scale.y = 0.08

	board.addChild(bot);

	let possibleDirections = {
		0:moveRight,
		1:moveDown,
		2:moveLeft,
		3:moveDown,
		4:moveRight,
		5:moveUp
	}

	let currentBotDirection = 0
	app.ticker.add(()=>{
		if (possibleDirections[currentBotDirection](bot)) possibleDirections[currentBotDirection](bot)
		else {
			currentBotDirection = (currentBotDirection+1)%6
		}
	})



	return app
}


export default createBoard

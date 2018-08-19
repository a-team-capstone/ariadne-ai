import * as PIXI from 'pixi.js'
import {down, up, left, right} from './MoveLogic'

export const wallFollowerBot = (app, board, mazeGrid, moveSize, startX, startY, speed=2) => {

	// create a new sprite from an image path
	var bot = PIXI.Sprite.fromImage('botShield.png')

	// move the sprite to the start of the maze
	bot.x = startX;
	bot.y = startY;

	// make bot bigger
	bot.scale.x = 0.05
	bot.scale.y = 0.05

	// set the sprite's anchor point
	bot.anchor.set(0.5);

	board.addChild(bot);

	//moving down, try to go left, do not ever go up
	//moving left, try to go up, do not ever go right
	//moving up, try to go right, do not ever go down
	//moving right, try to go down, do not ever go right
	let possibleDirections = {
		'down':{
			move: down,
			alwaysTry: 'left',
			ifBlocked: 'right'
		},
		'left':{
			move: left,
			alwaysTry: 'up',
			ifBlocked: 'down'
		},
		'up':{
			move: up,
			alwaysTry: 'right',
			ifBlocked: 'left'
		},
		'right': {
			move: right,
			alwaysTry: 'down',
			ifBlocked: 'up'
		},
	}

	let currentBotDirection = 'down'
	let botMoveCount = 0
	app.ticker.add(()=>{
		botMoveCount++
		if (!bot.visible) currentBotDirection = 'down'
		else if (botMoveCount%(12/speed) === 0) {

			// if blocked, switch to ifBlocked direction
			if (!possibleDirections[currentBotDirection].move(bot, mazeGrid, moveSize)) {
				const ifBlocked = possibleDirections[currentBotDirection].ifBlocked
				currentBotDirection = ifBlocked
				// move
				possibleDirections[currentBotDirection].move(bot, mazeGrid, moveSize)
			} else {
				// try the alwaysTry direction
				const alwaysTry = possibleDirections[currentBotDirection].alwaysTry
				if (possibleDirections[alwaysTry].move(bot, mazeGrid, moveSize)) {
					currentBotDirection = alwaysTry
					// move
					possibleDirections[currentBotDirection].move(bot, mazeGrid, moveSize)
				}
			}



		}
	})

	return bot

}

export const greedyBot = (app, board, mazeGrid, moveSize, startX, startY) => {

	// create a new Sprite from an image path
	var bot = PIXI.Sprite.fromImage('botShield.png')

	// move the sprite to the start of the maze
	bot.x = startX;
	bot.y = startY;

	// make bot bigger
	bot.scale.x = 0.03
	bot.scale.y = 0.03

	// set the sprite's anchor point
	bot.anchor.set(0.5);

	board.addChild(bot);

	let possibleDirections = {
		0:right,
		1:down,
		2:left,
		3:down,
		4:right,
		5:up
	}

	let currentBotDirection = 0
	app.ticker.add(()=>{
		if (possibleDirections[currentBotDirection](bot, mazeGrid, moveSize)) possibleDirections[currentBotDirection](bot, mazeGrid, moveSize)
		else {
			currentBotDirection = (currentBotDirection+1)%6
		}
	})

	return bot

}

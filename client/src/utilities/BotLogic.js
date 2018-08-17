import * as PIXI from 'pixi.js'
import * as move from './MoveLogic'

export const wallFollowerBot = (app, board, mazeGrid, moveSize, startX, startY) => {

	// create a new Sprite from an image path
	var bot = PIXI.Sprite.fromImage('shield.png')

	// move the sprite to the start of the maze
	bot.x = startX;
	bot.y = startY;

	// make bot bigger
	bot.scale.x = 0.15
	bot.scale.y = 0.15

	// set the sprite's anchor point
	bot.anchor.set(0.5);

	board.addChild(bot);

	let possibleDirections = {
		0:move.right,
		1:move.down,
		2:move.left,
		3:move.down,
		4:move.right,
		5:move.up
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

export const greedyBot = (app, board, mazeGrid, moveSize, startX, startY) => {

	// create a new Sprite from an image path
	var bot = PIXI.Sprite.fromImage('shield.png')

	// move the sprite to the start of the maze
	bot.x = startX;
	bot.y = startY;

	// make bot bigger
	bot.scale.x = 0.15
	bot.scale.y = 0.15

	// set the sprite's anchor point
	bot.anchor.set(0.5);

	board.addChild(bot);

	let possibleDirections = {
		0:move.right,
		1:move.down,
		2:move.left,
		3:move.down,
		4:move.right,
		5:move.up
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

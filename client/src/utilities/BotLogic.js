import * as PIXI from 'pixi.js'
import {down, up, left, right} from './MoveLogic'

export const wallFollowerBot = (app, board, mazeGrid, moveSize, startX, startY, endX, endY, speed=2) => {

	// create a new sprite from an image path
	let bot = PIXI.Sprite.fromImage('botShield.png')

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

	let currentBotDirection = 'up'
	let finalDirection = null
	let botMoveCount = 0
	app.ticker.add(()=>{
		botMoveCount++
		// if (!bot.visible) currentBotDirection = 'up'

		if (finalDirection && (botMoveCount%(12/speed) === 0)){
			possibleDirections[finalDirection].move(bot, mazeGrid, moveSize)
		} else
      if (botMoveCount < 5) {
        finalDirection = null
        possibleDirections[currentBotDirection].move(bot, mazeGrid, moveSize)
		} else
      if (botMoveCount < 10) {
        currentBotDirection = 'left'
        possibleDirections[currentBotDirection].move(bot, mazeGrid, moveSize)
		} else if (botMoveCount%(12/speed) === 0) {

			// if unblocked straight horizontal line to finish, leave wall

			// check if aligned horizontally
			if (Math.round(bot.y/moveSize) === Math.round(endY/moveSize)  ) {
				//console.log('aligned horizontally', mazeGrid[Math.round(bot.y/moveSize)].slice(Math.round(bot.x/moveSize), Math.round(endX/moveSize)))
				let horizontalPath = mazeGrid[Math.round(bot.y/moveSize)].slice(Math.round(bot.x/moveSize), Math.round(endX/moveSize))

				// check if horizontal path is clear
				if (horizontalPath.reduce((a,b) => a + b, 0) === 0) {
					//console.log('CLEAR HORIZONTAL PATH!!')
					finalDirection = (bot.x < endX)? 'right' : 'left'
					//console.log('final direction:', finalDirection)
				}
			}

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
	let bot = PIXI.Sprite.fromImage('botShield.png')

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

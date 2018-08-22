import * as PIXI from 'pixi.js'
import {overlapping} from './MoveLogic'
import {playSound} from './sounds'

export const addPowerUp = (imagePath, board, x, y, tileSize, scale, anchor = .5) => {
		// create a new Sprite from an image path
		const powerUp = PIXI.Sprite.fromImage(imagePath)
		const adjustedX = x - (x%tileSize)
		const adjustedY = y - (y%tileSize)


		// set sprite's location
		powerUp.x = adjustedX;
		powerUp.y = adjustedY;

		// set sprite's size
		powerUp.scale.x = scale
		powerUp.scale.y = scale

		// set the sprite's anchor point
		powerUp.anchor.set(anchor);

		// add sprite to board
		board.addChild(powerUp);

		// return sprite
		return powerUp
}

export const oneDirectionTeleport = (app, sprite, portal, tileSize, mazeWidth, mazeHeight, mazeGrid) =>  {

			if ( (portal.x+tileSize <= (mazeWidth-tileSize)) && (portal.y <= (mazeHeight-tileSize)) && mazeGrid[Math.round(portal.y/tileSize)][Math.round((portal.x+tileSize)/tileSize)] === 0) {
					// transporting to one right of portal
					sprite.x = portal.x+2*tileSize
					sprite.y = portal.y
			}  else
			if ( (portal.y-tileSize > 0) && (portal.y <= (mazeHeight-tileSize)) && (portal.x <= (mazeWidth-tileSize)) && (mazeGrid[Math.round((portal.y-tileSize)/tileSize)][Math.round(portal.x/tileSize)] === 0)){
					// transporting to one above portal
					sprite.x = portal.x
					sprite.y = portal.y-2*tileSize
			} else
			if ( (portal.x-tileSize > 0) && (portal.x <= mazeWidth-tileSize) && (portal.y <= (mazeHeight-tileSize)) && (mazeGrid[Math.round(portal.y/tileSize)][Math.round((portal.x-tileSize)/tileSize)] === 0)){
					// transporting to one left of portal
					sprite.x = (portal.x-2*tileSize)
					sprite.y = portal.y
			}

		return {x: sprite.x, y: sprite.y}
	}

	export const activateTeleport = (app, sprite, TELE, PORT, tileSize, mazeWidth, mazeHeight, mazeGrid) => {
		app.ticker.add(()=>{
			let newLocation
			if ( TELE && PORT && overlapping(sprite, TELE, tileSize, 1))
			{
				newLocation = oneDirectionTeleport(app, sprite, PORT, tileSize, mazeWidth, mazeHeight, mazeGrid)
				sprite.x = newLocation.x
				sprite.y = newLocation.y
				// playSound('tele')
			} else
			if ( TELE && PORT && overlapping(sprite, PORT, tileSize, 1)) {
				newLocation = oneDirectionTeleport(app, sprite, TELE, tileSize, mazeWidth, mazeHeight, mazeGrid)
				sprite.x = newLocation.x
				sprite.y = newLocation.y
				// playSound('port')
			}
		})
	}

	export const randomPlacement = (mazeGrid, tileSize) => {
		let numRows = mazeGrid.length - 2
		let numCols = mazeGrid[0].length - 2
		let row = Math.round(Math.random() * numRows)
		let col = Math.round(Math.random() * numCols)

		while (mazeGrid[row][col] === 1){
			row = Math.round(Math.random() * numRows)
			col = Math.round(Math.random() * numCols)
		}

		let placementX = Math.round(col * tileSize)
		let placementY = Math.round(row * tileSize)

		return {x: placementX, y: placementY}
	}

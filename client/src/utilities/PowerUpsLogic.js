import * as PIXI from 'pixi.js'

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

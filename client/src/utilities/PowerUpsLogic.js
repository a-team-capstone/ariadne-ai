import * as PIXI from 'pixi.js'

export const extraTimePowerUp = (board) => {
		// create a new Sprite from an image path
		var powerUp = PIXI.Sprite.fromImage('hourGlassYellow.png')

		// set sprite's location
		powerUp.x = 200;
		powerUp.y = 200;

		// set sprite's size
		powerUp.scale.x = 0.25
		powerUp.scale.y = 0.25

		// set the sprite's anchor point
		powerUp.anchor.set(0.5);

		// add sprite to board
		board.addChild(powerUp);

		// return sprite
		return powerUp
}

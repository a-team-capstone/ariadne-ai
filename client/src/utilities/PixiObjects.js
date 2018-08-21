import * as PIXI from 'pixi.js'

export const createSprite = (imagePath, x, y, scale=1, anchor=.5) => {

	// create a new sprite from an image path
	let spr = PIXI.Sprite.fromImage(imagePath)

	// move the sprite to the start of the maze
	spr.x = x
	spr.y = y;

	// make sprite bigger
	spr.scale.x = scale
	spr.scale.y = scale

	// set the sprite's anchor point
	spr.anchor.set(anchor);

	return spr

}

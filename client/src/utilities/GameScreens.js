import * as PIXI from 'pixi.js'

export const createGameScreen = (gameHeight, gameWidth, stateVar, newState, primaryText='', secondaryText='', color='', botModeButton = true, soloModeButton = true) => {
	// completion screen
	let screen = new PIXI.Graphics();
	screen.lineStyle(2, 0xf0ead6, 1);
	screen.beginFill(0xf7a409);
	screen.drawRoundedRect(0,0, gameWidth, gameHeight, 10);
	let bigText = new PIXI.Text(
		"Maze complete!\nClick below to replay.",
		{fill:0xf9f9f7, fontSize: '40px'}
	);
	bigText.x = 80;
	bigText.y = 500;
	screen.addChild(bigText)
	return screen
}

export const createButton = (buttonX, buttonY, buttonText, clickHandler) => {

	let replaySoloButton = new PIXI.Graphics();
	replaySoloButton.beginFill(0x494845)
	replaySoloButton.drawRoundedRect(buttonX, buttonY, 400, 100, 10);
	replaySoloButton.interactive = true;
	replaySoloButton.buttonMode = true;
	replaySoloButton.on('pointerdown', clickHandler)
	let textObject = new PIXI.Text(
		buttonText,
		{fill:0xf9f9f7, fontSize: '50px'}
	);
	textObject.x = buttonX + 15;
	textObject.y = buttonY + 20;
	replaySoloButton.addChild(textObject)

	return replaySoloButton
}

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
	// let replaySoloButton = new PIXI.Graphics();
	// replaySoloButton.beginFill(0x494845)
	// replaySoloButton.drawRoundedRect(80, 600, 300, 100, 10);
	// replaySoloButton.interactive = true;
	// replaySoloButton.buttonMode = true;
	// replaySoloButton.on('pointerdown', ()=>{
	// 	stateVar = newState
	// })
	// let replaySoloText = new PIXI.Text(
	// 	"Replay Solo",
	// 	{fill:0xf9f9f7, fontSize: '50px'}
	// );
	// replaySoloText.x = 95;
	// replaySoloText.y = 620;
	// replaySoloButton.addChild(replaySoloText)
	// screen.addChild(replaySoloButton)

	return screen
}

export const createButton = (clickHandler) => {

	let replaySoloButton = new PIXI.Graphics();
	replaySoloButton.beginFill(0x494845)
	replaySoloButton.drawRoundedRect(80, 600, 300, 100, 10);
	replaySoloButton.interactive = true;
	replaySoloButton.buttonMode = true;
	replaySoloButton.on('pointerdown', clickHandler)
	let replaySoloText = new PIXI.Text(
		"Replay Solo",
		{fill:0xf9f9f7, fontSize: '50px'}
	);
	replaySoloText.x = 95;
	replaySoloText.y = 620;
	replaySoloButton.addChild(replaySoloText)

	return replaySoloButton
}

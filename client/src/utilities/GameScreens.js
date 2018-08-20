import * as PIXI from 'pixi.js'

export const createGameScreen = (app, gameHeight, gameWidth, primaryText='primary text here', color=0xf7a409, imagePath = 'star.png', scale = 1) => {
	let screen = new PIXI.Graphics();
	screen.lineStyle(2, 0xf0ead6, 1);
	screen.beginFill(color);
	screen.drawRoundedRect(0,0, gameWidth, gameHeight, 10);
	let bigText = new PIXI.Text(
		primaryText,
		{fill:0xf9f9f7, fontSize: '70px', align: "center", fontWeight: "bold","dropShadow": true,
    "dropShadowAlpha": 0.5,
    "dropShadowColor": "#4b4b4b",
		"dropShadowDistance": 1,
	}
	);
	bigText.x = gameWidth/2;
	bigText.y = gameHeight*(2/3);
	bigText.anchor.set(.5, .5)
	let avatar = PIXI.Sprite.fromImage(imagePath)
	avatar.anchor.set(.5, .5)
	avatar.scale.x = scale
	avatar.scale.y = scale
	avatar.x = gameWidth/2;
	avatar.y = gameHeight/3;
	screen.addChild(avatar)
	screen.addChild(bigText)

	let grow = true
	app.ticker.add(function() {
		if (avatar.scale.x >= (scale * 1.05)) grow = false
		if (avatar.scale.x <= (scale)) grow = true

		if (grow) {
			avatar.scale.x += 0.001
			avatar.scale.y += 0.001
		}
		else {
			avatar.scale.x -= 0.001
			avatar.scale.y -= 0.001
		}

})
	return screen
}

export const createButton = (buttonX, buttonY, imagePath, clickHandler) => {

	let button = PIXI.Sprite.fromImage(imagePath)
	button.interactive = true;
	button.buttonMode = true;
	button.on('pointerdown', clickHandler)
	button.x = buttonX
	button.y = buttonY
	button.anchor.set(.5, .5)
	button.scale.x = .5
	button.scale.y = .5
	return button
}

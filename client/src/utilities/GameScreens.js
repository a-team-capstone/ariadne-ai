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
			avatar.scale.x += scale/1000
			avatar.scale.y += scale/1000
		}
		else {
			avatar.scale.x -= scale/1000
			avatar.scale.y -= scale/1000
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


export const createPowerUpsScreen= (app, gameHeight, gameWidth, primaryText='primary text here', color=0xf7a409, imagePath = 'star.png', scale = 1, subtitle1 = 'subtitle1 here', imagePath2 = 'star.png', scale2 = 1, subtitle2 = 'subtitle2 here') => {
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
	bigText.y = gameHeight*(1/8);
	bigText.anchor.set(.5, .5)

	let smallText1 = new PIXI.Text(
		primaryText,
		{fill:0xf9f9f7, fontSize: '40px', align: "center", fontWeight: "bold","dropShadow": true,
    "dropShadowAlpha": 0.5,
    "dropShadowColor": "#4b4b4b",
		"dropShadowDistance": 1,
	}
	);
	smallText1.x = gameWidth/2;
	smallText1.y = gameHeight*(4/8);
	smallText1.anchor.set(.5, .5)

	let smallText2 = new PIXI.Text(
		primaryText,
		{fill:0xf9f9f7, fontSize: '40px', align: "center", fontWeight: "bold","dropShadow": true,
    "dropShadowAlpha": 0.5,
    "dropShadowColor": "#4b4b4b",
		"dropShadowDistance": 1,
	}
	);
	smallText2.x = gameWidth/2;
	smallText2.y = gameHeight*(7/8) - 25;
	smallText2.anchor.set(.5, .5)


	let avatar = PIXI.Sprite.fromImage(imagePath)
	avatar.anchor.set(.5, .5)
	avatar.scale.x = scale
	avatar.scale.y = scale
	avatar.x = gameWidth/2;
	avatar.y = gameHeight*(3/8);
	screen.addChild(avatar)
	screen.addChild(bigText)
	screen.addChild(smallText1)
	screen.addChild(smallText2)

	let grow2 = true
	app.ticker.add(function() {
		if (avatar.scale.x >= (scale * 1.05)) grow2 = false
		if (avatar.scale.x <= (scale)) grow2 = true

		if (grow2) {
			avatar.scale.x += scale/1000
			avatar.scale.y += scale/1000
		}
		else {
			avatar.scale.x -= scale/1000
			avatar.scale.y -= scale/1000
		}
	})

		let avatar2 = PIXI.Sprite.fromImage(imagePath2)
		avatar2.anchor.set(.5, .5)
		avatar2.scale.x = scale2
		avatar2.scale.y = scale2
		avatar2.x = gameWidth/2;
		avatar2.y = gameHeight*(5/8);
		screen.addChild(avatar2)

		let grow = true
		app.ticker.add(function() {
			if (avatar2.scale.x >= (scale2 * 1.05)) grow = false
			if (avatar2.scale.x <= (scale2)) grow = true

			if (grow) {
				avatar2.scale.x += scale2/1000
				avatar2.scale.y += scale2/1000
			}
			else {
				avatar.scale.x -= scale2/1000
				avatar.scale.y -= scale2/1000
			}
})
	return screen
}


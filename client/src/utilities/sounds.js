let soundsDict = {
	'win': {
		file: 'winSound.mp3',
		on: true
	},
	'freeze': {
		file: 'freezeSound.mp3',
		on: true
	},
	'bomb': {
		file: 'bombSound.mp3',
		on: true
	},
	'tele': {
		file: 'teleSound.mp3',
		on: true
	},
	'port': {
		file: 'portSound.mp3',
		on: true
	},
	'extraTime': {
		file: 'extraTimeSound.mp3', // need to find a sound
		on: true
	},
	'weapon': {
		file: 'weaponSound.mp3',
		on: true
	},
	'slowDown': {
		file: 'extraTimeSound.mp3', // need to find a sound
		on: true
	},
	'startMaze': {
		file: 'extraTimeSound.mp3',
		on: true
	},
	'botWon': {
		file: 'extraTimeSound.mp3', // need to find a sound
		on: true
	},
	'outOfTime': {
		file: 'extraTimeSound.mp3', // need to find a sound
		on: true
	},
	'countdown': {
		file: 'extraTimeSound.mp3', // need to find a sound
		on: true
	},
	'exitMaze': {
		file: 'extraTimeSound.mp3', // need to find a sound
		on: true
	},
	'shareMaze': {
		file: 'extraTimeSound.mp3', // need to find a sound
		on: true
	},
}

export const playOnce= (sound) => {
	if (soundsDict[sound].on) {
		let soundEffect = new Audio(soundsDict[sound].file)
		if (soundsDict[sound].on) {
			console.log('playing once: ', sound)
			soundEffect.play()
			soundsDict[sound].on = false
		}
	}
}

export const playSound= (sound) => {
	if (soundsDict[sound].on) {
		let soundEffect = new Audio(soundsDict[sound].file)
		console.log('playing sound: ', sound)
		soundEffect.play()
	}
}

export const resetSounds = () => {
	for (let sound in soundsDict) {
		soundsDict[sound].on = true
	}
}

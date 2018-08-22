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
			try {
			console.log('playing once: ', sound)
			soundEffect.play()
			soundsDict[sound].on = false
			} catch (error) {
				console.log('could not play sound', sound)
				soundsDict[sound].on = true
			}
		}
	}
}

export const playSound= (sound) => {
	if (soundsDict[sound].on) {
		let soundEffect = new Audio(soundsDict[sound].file)
		try {
			console.log('playing sound: ', sound)
			soundEffect.play()
		} catch (error) {
			console.log('could not play sound', sound)
			soundsDict[sound].on = true
		}
	}
}

export const resetSounds = () => {
	for (let sound in soundsDict) {
		soundsDict[sound].on = true
	}
}

export const playOnceQueue = (queue) => {
	queue.forEach(
		playOnce(queue.shift())
	)
}

export const playSoundQueue = (queue) => {
	while (queue.length) {
			let sound = queue.shift()
			console.log('playing from sound queue', sound)
			playSound(sound)
	}
}

export const playSoundOnceQueue = (queue) => {
	while (queue.length) {
			let sound = queue.shift()
			console.log('playing from once queue', sound)
			playOnce(sound)
	}
}

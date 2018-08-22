// let soundsDict = {
// 	// 'winSound': {
// 	// 	file: 'winSound.mp3',
// 	// 	on: true
// 	// },
// 	winSound: {
// 		on: true
// 	},
// 	'freezeSound': {
// 		file: 'freezeSound.mp3',
// 		on: true
// 	},
// 	'bombSound': {
// 		file: 'bombSound.mp3',
// 		on: true
// 	},
// 	'teleSound': {
// 		file: 'teleSound.mp3',
// 		on: true
// 	},
// 	'portSound': {
// 		file: 'portSound.mp3',
// 		on: true
// 	},
// 	'extraTimeSound': {
// 		file: 'extraTimeSound.mp3', // need to find a sound
// 		on: true
// 	},
// 	'weaponSound': {
// 		file: 'weaponSound.mp3',
// 		on: true
// 	},
// 	'slowDownSound': {
// 		file: 'extraTimeSound.mp3', // need to find a sound
// 		on: true
// 	},
// 	'startMazeSound': {
// 		file: 'extraTimeSound.mp3',
// 		on: true
// 	},
// 	'botWonSound': {
// 		file: 'extraTimeSound.mp3', // need to find a sound
// 		on: true
// 	},
// 	'outOfTimeSound': {
// 		file: 'extraTimeSound.mp3', // need to find a sound
// 		on: true
// 	},
// 	'countdownSound': {
// 		file: 'extraTimeSound.mp3', // need to find a sound
// 		on: true
// 	},
// 	'exitMazeSound': {
// 		file: 'extraTimeSound.mp3', // need to find a sound
// 		on: true
// 	},
// 	'shareMazeSound': {
// 		file: 'extraTimeSound.mp3', // need to find a sound
// 		on: true
// 	},
// }

export const playOnce= (sound, soundsDict) => {
	if (soundsDict[sound]) {
		// let soundEffect = new Audio(soundsDict[sound].file)
		if (soundsDict[sound].on) {
			try {
			console.log('playing once: ', sound)
			soundsDict[sound].sound.play()
			soundsDict[sound].on = false
			} catch (error) {
				console.log('could not play sound', sound)
				soundsDict[sound].on = true
			}
		}
	}
}

export const playSound= (sound, soundsDict) => {
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

export const resetSounds = (soundsDict) => {
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

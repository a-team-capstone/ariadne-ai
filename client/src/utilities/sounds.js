let soundsDict = {
	'win': {
		file: 'winSound.mp3',
		on: true
	},
	'freeze': {
		file: 'freezeSound.mp3',
		on: true
	},
}

export const playSound = (sound) => {
	if (soundsDict[sound].on) {
		let soundEffect = new Audio(soundsDict[sound].file)
		soundEffect.play()
		soundsDict[sound].on = false
	}
}

export const resetSounds = () => {
	for (let sound in soundsDict) {
		soundsDict[sound].on = true
	}
}

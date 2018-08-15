// scrapeImageData(imageFile):
// takes an image file name and calls the getImageData ctx method on it to get the ugly array,
// returns that array
export const scrapeImageData = (canvas, image) => {
	console.log('Image', image)

	let ctx = canvas.getContext('2d')
	image.crossOrigin = "Anonymous"
	ctx.drawImage(image, 0, 0)
	const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
	console.log('imgData', imgData)
	return imgData
}

// organizeImageData(imageData)
// takse an ugly imageData array
// converts it to a nice array of arrays
// where each item is NOT [r, g, b, a] but rather
// 0 if the average of r, g, and b is under 20 (or something) and otherwise 1
// return the nice array of arrays of 1's and 0's
export const organizeImageData = (imageData, height, width) => {
	console.log('height and width parameters', height, width)
	let pixelGrid = []
	let pixelRow = []

	for (let i = 0; i < imageData.data.length; i += 4) {
		let zeroOrOne = 0
		// for each of the pixel colors, check if any is under 200 (aka does it have any vividness of color)
		for (let pixel = 0; pixel < 3; pixel++) {
			if (imageData.data[i + pixel] < 100) zeroOrOne = 1
		}

		pixelRow.push(zeroOrOne)

		if (pixelRow.length === width) {
			pixelGrid.push(pixelRow)
			pixelRow = []
		}
	}
	console.log('pixelGrid', pixelGrid)
	console.log('pixelGrid height, width', pixelGrid.length, pixelGrid[0].length)
	return pixelGrid
}

// tileImageData(organizedImageData, tileSize)
// takes the nice array (of arrays of 1's and 0's) and tile size (in pixels)
// for each numPixels x numPixels block, if it's below 20 set the block's value to 1, otherwise 0
// return a smaller array (of arrays of 1's and 0's)

export const tileImageData = (organizedImageData, tileSize) => {
	let tileColorsGrid = []

	const originalHeight = organizedImageData.length
	const originalWidth = organizedImageData[0].length

	const {trimHeight, trimWidth, targetHeight, targetWidth} = trimAmounts(originalHeight, originalWidth, tileSize)
	console.log('trim data:', targetHeight, targetWidth, trimHeight, trimWidth)

	for (let row = 0; row < targetHeight; row += tileSize) {
		let tileColorsRow = []
		for (let col = 0; col < targetWidth   ; col += tileSize) {
			let isBlocked = 0
			for (let pixelRow = 0; pixelRow < tileSize; pixelRow++) {
				// console.log(row + pixelRow)
				for (let pixelCol = 0; pixelCol < tileSize; pixelCol++) {
					if (organizedImageData[row + pixelRow][col + pixelCol] === 1)
						isBlocked = 1
				}
			}
			tileColorsRow.push(isBlocked)
		}
		tileColorsGrid.push(tileColorsRow)
	}
	console.log('maze height, width', tileColorsGrid.length, tileColorsGrid[0].length)
	return tileColorsGrid
}

//------------------------------------------------
// calls all of the above functions on an image
export const getMazeFromImage = (canvas, image, tileSize) => {
	// const ctx = canvas.getContext("2d");
	const scraped = scrapeImageData(canvas, image)
	const height = image.naturalHeight //Math.max(image.naturalHeight, image.naturalWidth)
	const width = image.naturalWidth // Math.min(image.naturalHeight, image.naturalWidth)
	const tidyGrid = organizeImageData(
		scraped,
		height,
		width
	)
	console.log('tidyGrid:', tidyGrid)
	const tileColors = tileImageData(tidyGrid, tileSize)

	return tileColors
}

export const trimAmounts = (height, width, tileSize) => {
		const trimHeight = height%tileSize
		const targetHeight = height - trimHeight
		const trimWidth = width%tileSize
		const targetWidth = width - trimWidth

		return {
			trimHeight,
			trimWidth,
			targetHeight,
			targetWidth
		}

}

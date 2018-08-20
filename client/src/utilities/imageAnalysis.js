// scrapeImageData(imageFile):
// takes an image file name and calls the getImageData ctx method on it to get the ugly array,
// returns that array
import axios from 'axios'

export const scrapeImageData = (canvas, image) => {
	let ctx = canvas.getContext('2d')
	image.crossOrigin = 'Anonymous'
	ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
	return imgData
}

//finds min and max x and y for the bounding poly
//checks if given pixel coordinate (point) is within the bounding poly
const isWithin = (point, box, height, width) => {
  const minY = Math.min(box.TL[0], box.BL[0])/(width/600)
  const maxY = Math.max(box.TR[0], box.BR[0])/(width/600)
  const minX = Math.min(box.BL[1], box.BR[1])/(height/800)
  const maxX = Math.max(box.TL[1], box.TR[1])/(height/800)
  if (point[0] >= minX && point[0] <= maxX && point[1] <= maxY && point[1] >= minY) {
    return true
  }
  return false
}

//iterate through all the bounding polys and call isWithin on each one with the given pixel coordinate
const checkBoxes = (textData, point, height, width) => {
  const texts = Object.keys(textData).filter(key => key!=='time')
  return texts.map(text => isWithin(point, textData[text], height, width))
}

//iterate through pixelGrid (matrix of 0s and 1s)
//call checkBoxes on each pixel coordinate
//if any return true (point is within one of the bounding poly's) change value to 0 (not a boundary)
const clearObstacles = (pixelGrid, textData, height, width) => {
  for (let i = 0; i < pixelGrid.length; i++) {
    let currentRow = pixelGrid[i]
    for (let j = 0; j < currentRow.length; j++) {
      let currentPoint = [i, j]
      if (checkBoxes(textData, currentPoint, height, width).some(el => el === true)) {
        pixelGrid[i][j] = 0
      }
    }
  }
  // console.log('clearedGrid', pixelGrid)
  return pixelGrid
}


// organizeImageData(imageData)
// takse an ugly imageData array
// converts it to a nice array of arrays
// where each item is NOT [r, g, b, a] but rather
// 0 if the average of r, g, and b is under 20 (or something) and otherwise 1
// return the nice array of arrays of 1's and 0's
export const organizeImageData = (imageData, height, width) => {
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

	const { trimHeight, trimWidth, targetHeight, targetWidth } = trimAmounts(
		originalHeight,
		originalWidth,
		tileSize
	)

	for (let row = 0; row < targetHeight; row += tileSize) {
		let tileColorsRow = []
		for (let col = 0; col < targetWidth; col += tileSize) {
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
	return tileColorsGrid
}

const getObstacleAvgs = (textData, height, width) => {
  const labels = Object.keys(textData)
  return labels.reduce((avgs, curr) => {
    if (curr !== "time") {
      const x = Math.round(((textData[curr].TL[1] + textData[curr].BL[1] + textData[curr].BR[1] + textData[curr].TR[1])/4)/(height/800))
      const y = Math.round(((textData[curr].TL[0] + textData[curr].BL[0] + textData[curr].BR[0] + textData[curr].TR[0])/4)/(width/600))
      avgs[curr] = [x, y]
    }
    else avgs[curr] = textData[curr]
    return avgs
  }, {})
}

//------------------------------------------------
// calls all of the above functions on an image
export const getMazeFromImage = async (canvas, image, tileSize, imageUrl) => {
  const { data } = await axios.post('api/mazes/analyze', {"image": imageUrl})
	const scraped = scrapeImageData(canvas, image)
  console.log('google data', data)
	const height = canvas.height
	const width = canvas.width

	const tidyGrid = organizeImageData(scraped, height, width)
  const clearedGrid = clearObstacles(tidyGrid, data, image.naturalHeight, image.naturalWidth)
  const obstacleAvgs = getObstacleAvgs(data, image.naturalHeight, image.naturalWidth)
  console.log('obstacleAvgs', obstacleAvgs)
	const mazeGrid = tileImageData(clearedGrid, tileSize)

	return { mazeGrid, obstacleAvgs }
}

export const trimAmounts = (height, width, tileSize) => {
	const trimHeight = height % tileSize
	const targetHeight = height - trimHeight
	const trimWidth = width % tileSize
	const targetWidth = width - trimWidth
	return {
		trimHeight,
		trimWidth,
		targetHeight,
		targetWidth
	}
}

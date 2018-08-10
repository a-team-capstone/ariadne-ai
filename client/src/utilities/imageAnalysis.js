 // scrapeImageData(imageFile):
  // takes an image file name and calls the getImageData ctx method on it to get the ugly array,
  // returns that array
export const scrapeImageData = (canvas, image) => {

    let ctx = canvas.getContext("2d");
    console.log('ctx',ctx)
    console.log('image',image)

    ctx.drawImage(image, 0, 0)
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    return imgData
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
          if (imageData.data[i+pixel] < 200) zeroOrOne = 1
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

      for (let row=0; row < organizedImageData.length; row+=tileSize){
        let tileColorsRow = []
        for (let col=0; col < organizedImageData[0].length; col+=tileSize){
          let isBlocked = 0
          for (let pixelRow = 0; pixelRow < tileSize; pixelRow++) {
            for (let pixelCol = 0; pixelCol < tileSize; pixelCol++) {
              if (organizedImageData[row+pixelRow][col+pixelCol] === 1) isBlocked = 1
            }
          }
          tileColorsRow.push(isBlocked)
        }
        tileColorsGrid.push(tileColorsRow)
      }
      return tileColorsGrid
    }

//------------------------------------------------
// calls all of the above functions on an image
export const getMazeFromImage = document => {
      const canvas = document.getElementById("mazeImageCanvas")
      const image = document.getElementById("mazeImage")
      const ctx = canvas.getContext("2d");

      const scraped = scrapeImageData(canvas, image)
      const tidyGrid = organizeImageData(scraped, image.naturalHeight, image.naturalWidth)
      const tileColors = tileImageData(tidyGrid, 25)

      console.log(tileColors)
}

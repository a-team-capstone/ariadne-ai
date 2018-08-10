
// scrapeImageData(imageFile):
// takes an image file name and calls the getImageData ctx method on it to get the ugly array,
// returns that array
export const scrapeImageData = (canvas, image) => {

    // const c = document.getElementById("mazeImageCanvas");
    const ctx = canvas.getContext("2d");
    console.log('ctx',ctx)
    console.log('image',image)
    // const img = document.getElementById(imageId);

    ctx.drawImage(image, 0, 500)
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    return imgData
}

// organizeImageData(imageData)
// takse an ugly imageData array
// converts it to a nice array of arrays
// where each item is NOT [r, g, b, a] but rather
// 0 if the average of r, g, and b is over 20 (or something) and otherwise 1
// return the nice array of arrays of 1's and 0's

// tileImageData(organizedImageData)
// takes the nice array (of arrays of 1's and 0's) and tile size (in pixels)
// for each numPixels x numPixels block, if it's below 20 set the block's value to 1, otherwise 0
// return a smaller array (of arrays of 1's and 0's)


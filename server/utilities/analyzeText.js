const axios = require('axios')

const getPoly = (text, data, label, index) => {
  if (!data.responses[0].textAnnotations) return null
  const annts = data.responses[0].textAnnotations.slice(1)
  let vertices = index < 7 ? annts.filter(entry => entry.description.toUpperCase().includes(label) || 
    (entry.description.toUpperCase().includes(label[0]) && entry.description.toUpperCase().includes(label[1]))) 
    : annts.filter(entry => entry.description.search(label) >= 0)
  if (!vertices.length) return null
  if (index === 9) return vertices[0].description
  vertices = vertices[0].boundingPoly.vertices
      vertices = vertices.reduce( (acc, curr, index) => {
        switch (index) {
          case 0:
            acc.TL = [curr.x, curr.y]
          case 1:
            acc.BL = [curr.x, curr.y]
          case 2:
            acc.BR = [curr.x, curr.y]
          case 3:
            acc.TR = [curr.x, curr.y]
        }
        return acc
      }, {})
      return vertices
}

async function analyzeText(imageUri) {
    console.log('imageuri', imageUri)
    const text = {}
    const time = /[0-9]+/
    const labels = ['ST', 'END', 'XT', 'BM', 'FZ', 'TEL', 'PRT', 'SD', 'WP', time]
    const request = {
    "requests":[
      {
        "image":{
          "source":{
            "imageUri": `${imageUri}`            
          }
        },
        "features":[
          {
            "type": "TEXT_DETECTION",
            "maxResults":10
          }
        ],
        "imageContext": {
          "languageHints": ["en-t-i0-handwrit"]
        }
      }]}
      const { data } =  await axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_API_KEY}`, request)
      labels.forEach( (label, index) => {
        const poly = getPoly(text, data, label, index)
        if (poly !== null) {
          index === 9 ? text.time = +poly : text[label] = poly
        }
      })
      return text
}


module.exports = analyzeText

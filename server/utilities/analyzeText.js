const axios = require('axios')

const getPoly = (text, data, label) => {
  let vertices = data.responses[0].textAnnotations.filter(entry => entry.description.toUpperCase()===label)
  if (!vertices.length) return null
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
    const text = {}
    const labels = ['ST', 'END', 'XT', 'BM', 'NL', 'FZ', 'TEL', 'PRT']
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
        ]
      }]}
      const { data } =  await axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_API_KEY}`, request)
      labels.forEach(label => {
        const poly = getPoly(text, data, label)
        if (poly !== null) {
          text[label] = poly
        }
      })
      return text
}


module.exports = analyzeText

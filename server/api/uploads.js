const router = require('express').Router()
const AWS = require('aws-sdk')
const fs = require('fs')
const fileType = require('file-type')
const bluebird = require('bluebird')
const multiparty = require('multiparty')
module.exports = router

// configure the keys for accessing AWS
AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird)

// create S3 instance
const s3 = new AWS.S3()

// abstracts function to upload a file returning a promise
const uploadFile = (buffer, name, type) => {
	const params = {
		ACL: 'public-read',
		Body: buffer,
		Bucket: process.env.IMAGE_S3_BUCKET,
		ContentType: type.mime,
		Key: `${name}.${type.ext}`
	}
	return s3.upload(params).promise()
}

const uploadCrop = (body, fileName) => {
  let buf = Buffer.from(body.imageBinary.replace(/^data:image\/\w+;base64,/, ''), 'base64')
  var data = {
    ACL: 'public-read',
    Bucket: process.env.IMAGE_S3_BUCKET,
    Body: buf,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg',
    Key: `${fileName}.jpg`
  }
  return s3.upload(data).promise()
}

// Define POST route
// POST /api/uploads/image-upload
router.post('/image-upload', (request, response) => {
  console.log("request in route", request.headers)
  try {
    const form = new multiparty.Form()
    form.parse(request, async (fields, files) => {
      try {
        let data;
          const timestamp = Date.now().toString()
          const fileName = `bucketFolder/${timestamp}-lg`
        if (request.body.imageBinary) {
          data = await uploadCrop(request.body, fileName)
        } else {
          const path = files.file[0].path
          const buffer = fs.readFileSync(path)
          const type = fileType(buffer)
          data = await uploadFile(buffer, fileName, type)
        }
        return response.status(200).send(data)
      } catch (err) {
        return response.status(400).send(err)
      }
    })
  } catch (err) {
    console.log(err)
  }
})

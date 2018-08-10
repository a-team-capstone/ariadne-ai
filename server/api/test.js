const router = require('express').Router();

const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');

module.exports = router;

router.get('/', (req, res, next) => {
  res.status(200).json({ message: 'Success' });
});

// configure the keys for accessing AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();

// abstracts function to upload a file returning a promise
const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: process.env.IMAGE_S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`,
  };
  return s3.upload(params).promise();
};

// Define POST route
// POST /api/uploads/image
router.post('/image', (request, response) => {
  console.log("I'm here");
  // const form = new multiparty.Form();
  // form.parse(request, async (error, fields, files) => {
  //   if (error) throw new Error(error);
  //   try {
  //     const path = files.file[0].path;
  //     const buffer = fs.readFileSync(path);
  //     const type = fileType(buffer);
  //     const timestamp = Date.now().toString();
  //     const fileName = `bucketFolder/${timestamp}-lg`;
  //     const data = await uploadFile(buffer, fileName, type);
  //     return response.status(200).send(data);
  //   } catch (err) {
  //     return response.status(400).send(err);
  //   }
  // });
});

const express = require('express');
const uploads = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');

const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, '')
    }
});

const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb(new Error('Invalid file type. Only JPEG files are allowed.'), false)
    }
}



const upload = multer({ storage: storage, fileFilter: filefilter });

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

uploads.post('/', upload.single('image'), (req, res) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.file.originalname,
        Body: req.file.buffer,
        ACL: "public-read-write",
        ContentType: "image/jpeg"
    };

    s3.upload(params, (error, data) => {
        if (error) {
            res.status(500).json({ 'error': 'Failed to upload to S3', 'err': error });
        } else {
            res.status(200).json({ message: 'Successfully uploaded to S3', 'location': data.Location, 'data': data });
        }
    });
});


module.exports = { uploads };
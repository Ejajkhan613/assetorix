const express = require('express');
const uploads = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');

uploads.use(express.json());

const { tokenVerify } = require('../middlewares/token');
const { PropertyModel } = require("../models/propertyModel");
const { indianTime } = require('../services/indianTime');

const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, '')
    }
});

const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(new Error('Invalid file type. Only JPEG files are allowed.'), false)
    }
}



const upload = multer({ storage: storage, fileFilter: filefilter });

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_KEY
});


function generateRandomCode() {
    let code = '';
    const digits = '0123456789';

    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        code += digits.charAt(randomIndex);
    }

    return code;
}


// GET route to retrieve a list of all images in the S3 bucket
// uploads.get('/', (req, res) => {
//     const params = {
//         Bucket: process.env.AWS_BUCKET_NAME,
//     };

//     s3.listObjects(params, (error, data) => {
//         if (error) {
//             res.status(500).send({ 'error': 'Failed to list objects in S3', 'err': error });
//         } else {
//             const imageUrls = data.Contents.map((object) => {
//                 // Generate a public URL for each object in the bucket
//                 return s3.getSignedUrl('getObject', {
//                     Bucket: process.env.AWS_BUCKET_NAME,
//                     Key: object.Key,
//                 });
//             });

//             res.status(200).send({ images: imageUrls });
//         }
//     });
// });


uploads.post('/:id', tokenVerify, upload.array('image', 15), async (req, res) => {
    let propertyID = req.params.id;
    try {
        if (!propertyID) {
            return res.status(400).send({ "msg": "Please Provide Property ID" });
        }

        let property = await PropertyModel.findOne({ "_id": propertyID });

        if (!property) {
            return res.status(400).send({ "msg": "No Property Found" });
        }

        if (property.userID != req.headers.id) {
            return res.status(400).send({ "msg": "Access Denied, Not Your Property" });
        }

        if (property.images.length + req.files.length > 15) {
            return res.status(400).send({ "msg": "You can upload upto 15 Images Only" });
        }

        if (!req.files.length) {
            return res.status(400).send({ "msg": "No Images Provided" });
        }

        const uploadPromises = req.files.map(async (file) => {
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `${Date.now()}-${generateRandomCode()}-` + file.originalname,
                Body: file.buffer,
                ACL: 'public-read-write',
                ContentType: 'image/jpeg',
            };

            return new Promise((resolve, reject) => {
                s3.upload(params, (error, data) => {
                    if (error) {
                        console.log(error);
                        reject();
                    } else {
                        console.log(data)
                        resolve({ 'URL': data.Location, 'KEY': data.Key, "rawKey": data.Location.split(".com/")[1] });
                    }
                })
            });
        });

        const results = await Promise.all(uploadPromises);

        // Filtering out any undefined/null values
        const filteredResults = results.filter(result => result !== undefined && result !== null);

        // Check if 'Images' array exists in the property
        property.lastUpdated = indianTime();
        property.verificationState = "Pending"
        property.images = [...property.images, ...filteredResults];

        // Save the updated property document
        await property.save();

        res.status(201).send({ "msg": "Images Uploaded Successfully", "images": property.images });
    } catch (error) {
        res.status(500).send({ "msg": "Server error while uploading Images", "error": error });
    }
});


uploads.delete('/:id', tokenVerify, async (req, res) => {
    let awsKey = req.body.key;
    try {
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: awsKey,
        };

        if (!awsKey) {
            return res.status(400).send({ 'msg': 'Missing Image Key' });
        }

        // Find the property based on the image key
        const property = await PropertyModel.findOne({ '_id': req.params.id });

        if (!property) {
            return res.status(400).send({ 'msg': 'Property not found for the given image' });
        }
        if (property.userID != req.userDetail._id) {
            return res.status(400).send({ 'msg': 'Not Your Property' });
        }

        // First, attempt to delete the image from S3
        s3.deleteObject(params, async (error, data) => {
            if (error) {
                res.status(500).send({ 'error': 'Failed to delete from S3', 'err': error });
            } else {
                // Image successfully deleted from S3, now update the database
                try {
                    // Remove the deleted image from the property's images array
                    property.images = property.images.filter(img => img.KEY !== awsKey);

                    // Save the updated property document
                    await property.save();

                    res.status(200).send({ message: 'Image Deleted', "images": property.images });
                } catch (dbError) {
                    res.status(500).send({ 'error': 'Failed to update the database', 'dbErr': dbError });
                }
            }
        });
    } catch (error) {
        res.status(500).send({ 'error': 'Server error while deleting image from S3', 'err': error });
    }
});


module.exports = { uploads };
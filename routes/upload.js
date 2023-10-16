const express = require('express');
const uploads = express.Router();
uploads.use(express.json());
const multer = require('multer');
const AWS = require('aws-sdk');


const { tokenVerify } = require('../middlewares/token');
const { PropertyModel } = require("../models/propertyModel");

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
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
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
uploads.get('/', (req, res) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
    };

    s3.listObjects(params, (error, data) => {
        if (error) {
            res.status(500).json({ 'error': 'Failed to list objects in S3', 'err': error });
        } else {
            const imageUrls = data.Contents.map((object) => {
                // Generate a public URL for each object in the bucket
                return s3.getSignedUrl('getObject', {
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: object.Key,
                });
            });

            res.status(200).json({ images: imageUrls });
        }
    });
});


// uploads.post('/', upload.single('image'), (req, res) => {
//     const params = {
//         Bucket: process.env.AWS_BUCKET_NAME,
//         Key: req.file.originalname,
//         Body: req.file.buffer,
//         ACL: "public-read-write",
//         ContentType: "image/jpeg"
//     };

//     s3.upload(params, (error, data) => {
//         if (error) {
//             res.status(500).json({ 'error': 'Failed to upload to S3', 'err': error });
//         } else {
//             res.status(200).json({ message: 'Successfully uploaded to S3', 'location': data.Location, 'data': data });
//         }
//     });
// });



// uploads.post('/:id', tokenVerify, upload.array('image', 15), async (req, res) => {
//     let propertyID = req.params.id;
//     try {
//         if (!propertyID) {
//             return res.status(400).send({ "msg": "Please Provide Property ID" });
//         }
//         const property = await PropertyModel.findById(propertyID);
//         if (!property) {
//             return res.status(400).send({ "msg": "No Property Found" });
//         }
//         if (property.userID != req.headers.id) {
//             return res.status(400).send({ "msg": "Access Denied, Not Your Property" });
//         }
//         const uploadPromises = req.files.map(async (file) => {
//             const params = {
//                 Bucket: process.env.AWS_BUCKET_NAME,
//                 Key: `${Date.now()}-${generateRandomCode()}-` + file.originalname,
//                 Body: file.buffer,
//                 ACL: 'public-read-write',
//                 ContentType: 'image/jpeg',
//             };

//             return new Promise((resolve, reject) => {
//                 s3.upload(params, (error, data) => {
//                     if (error) {
//                         reject();
//                     } else {
//                         resolve({ 'URL': data.Location, 'KEY': data.Key });
//                     }
//                 })
//             })
//         });

//         const results = await Promise.all(uploadPromises);

//         // Filtering out any undefined/null values
//         const filteredResults = results.filter(result => result !== undefined && result !== null);

//         const updateResult = await PropertyModel.findByIdAndUpdate(
//             propertyID,
//             { $push: { images: filteredResults } },
//             { new: true }
//         );

//         res.status(201).json({ "msg": "Images Uploaded Successfully", filteredResults, "data": updateResult });
//     } catch (error) {
//         res.status(500).json({ "msg": "Server error while uploading Images", "error": error });
//     }
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
        property.images = [...property.images, ...filteredResults];

        // Save the updated property document
        await property.save();

        res.status(201).json({ "msg": "Images Uploaded Successfully" });
    } catch (error) {
        res.status(500).json({ "msg": "Server error while uploading Images", "error": error });
    }
});



// DELETE route for deleting an image from S3
uploads.delete('/:key', (req, res) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.params.key,
    };

    s3.deleteObject(params, (error, data) => {
        if (error) {
            res.status(500).json({ 'error': 'Failed to delete from S3', 'err': error });
        } else {
            res.status(200).json({ message: 'Successfully deleted from S3' });
        }
    });
});


module.exports = { uploads };
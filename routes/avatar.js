const express = require('express');
const avatar = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');

avatar.use(express.json());

const { tokenVerify } = require('../middlewares/token');
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



// Add Avatar
avatar.post('/', tokenVerify, upload.array("avatarimg", 1), async (req, res) => {
    try {
        let userDetail = req.userDetail;

        if (userDetail.avatar) {
            return res.status(400).send({ "msg": "Avatar is already present. Delete it first." });
        }

        if (!req.files.length) {
            return res.status(400).send({ "msg": "No image provided for avatar." });
        }

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `avatar-${userDetail._id}-${Date.now()}-${generateRandomCode()}`,
            Body: req.files[0].buffer,
            ACL: 'public-read-write',
            ContentType: 'image/jpeg',
        };

        s3.upload(params, async (error, data) => {
            if (error) {
                return res.status(500).send({ 'error': 'Failed to add avatar image', 'err': error });
            } else {
                userDetail.avatar = data.Location;
                userDetail.avatarKey = data.Key;
                userDetail.lastUpdated = indianTime();

                await userDetail.save();

                res.status(201).send({ "msg": "Avatar added successfully", "avatar": data.Location });
            }
        });

    } catch (error) {
        res.status(500).send({ "msg": "Server error while adding avatar image", "error": error });
    }
});



// Delete Avatar
avatar.delete('/', tokenVerify, async (req, res) => {
    try {
        const userDetail = req.userDetail;
        if (!userDetail.avatar || !userDetail.avatarKey) {
            return res.status(400).send({ "msg": "No Avatar to delete" });
        }

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: userDetail.avatarKey
        };

        // Deleting the image from AWS S3
        s3.deleteObject(params, async (error, data) => {
            if (error) {
                return res.status(500).send({ 'msg': 'Failed to delete Avatar Image', 'error': error });
            } else {
                userDetail.avatar = "";
                userDetail.avatarKey = "";
                userDetail.lastUpdated = indianTime();

                await userDetail.save();
                return res.status(200).send({ "msg": "Avatar Deleted Successfully" });
            }
        });
    } catch (error) {
        res.status(500).send({ "msg": "Server error while deleting Avatar Image", "error": error });
    }
});


module.exports = { avatar };
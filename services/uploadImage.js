// Dependencies
const express = require("express");
const dotenv = require("dotenv");
const AWS = require("aws-sdk");
const multer = require("multer");



// dotenv config
dotenv.config();



// Creating Route Variable
const imageUploadRoute = express.Router();



// Middlewares
imageUploadRoute.use(express.json());
imageUploadRoute.use(express.urlencoded({ extended: true }));


// Get Time in String
function formattedDate() {
    let time = Date.now();
    // Convert the timestamp to a Date object
    const currentDate = new Date(time);

    // Extract date components
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Months are 0-indexed
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";

    // Convert 24-hour format to 12-hour format
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");

    // Create the formatted date string
    return `${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year}-${formattedHours}:${formattedMinutes}:${period}`;
}



function generateUniqueRandomString() {
    let length = 10;
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        randomString += charset[randomIndex];
    }

    return randomString;
}



// AWS Config
const AWSConfig = {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
}


const S3 = new AWS.S3(AWSConfig);




// Multer Config
let upload = multer({
    limits: 1024 * 1024 * 10, // 10 MB of Image
    fileFilter: function (req, file, done) {
        if (file.mimetype === "image/jpeg", file.mimetype === "image/png", file.mimetype === "image/jpg") {
            done(null, true);
        } else {
            done("Multer Error  -  File type is not supported", false);
        }
    }
});


// Upload to Amazon S3 Bucket
const uploadToS3 = (fileData) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: process.env.BUCKET,
            Key: `${formattedDate}/image/${generateUniqueRandomString()}`,
            Body: fileData
        }

        S3.upload(params, (err, data) => {
            if (err) {
                console.log(err);
                reject(err);
            }

            console.log(data);
            return resolve(data);
        })

    })
}



// Single Image Upload Route
imageUploadRoute.post("/uploadSingle", upload.single("image"), (req, res) => {
    try {
        if (req.file) {
            uploadToS3(req.file.buffer).then((result) => {
                return res.status(201).json({
                    msg: "Uploaded Successfully",
                    imageURL: result.Location,
                    "Details": result
                })
            }).catch((err) => {
                res.status(400).send({ "msg": "Error: Uploading Failed", "error": err })
            })
        }
    } catch (error) {
        res.status(500).send({ "msg": "Server Error While Uploading Image" });
    }
});




module.exports = { imageUploadRoute };
// const path = require("path");
// const multer = require("multer");
// const multerS3 = require("multer-s3");
// const { S3Client } = require("@aws-sdk/client-s3");


// const s3 = new S3Client({
//     credentials: {
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//     },
//     region: "ap-south-1"
// });

// const s3Storage = multerS3({
//     s3: s3, // s3 instance
//     bucket: "assetorix",
//     acl: "public-read",
//     metadata: (req, file, cb) => {
//         cb(null, { fieldname: file.fieldname });
//     },
//     key: (req, file, cb) => {
//         const fileName =
//             Date.now() + "_" + file.fieldname + "_" + file.originalname;
//         cb(null, fileName);
//     },
// });
// function sanitizeFile(file, cb) {
//     // Define the allowed extension
//     const fileExts = [".png", ".jpg", ".jpeg", ".gif"];

//     // Check allowed extensions
//     const isAllowedExt = fileExts.includes(
//         path.extname(file.originalname.toLowerCase())
//     );

//     // Mime type must be an image
//     const isAllowedMimeType = file.mimetype.startsWith("image/");

//     if (isAllowedExt && isAllowedMimeType) {
//         return cb(null, true); // no errors
//     } else {
//         // pass error msg to callback, which can be displaye in frontend
//         cb("Error: File type not allowed!");
//     }
// }

// // our middleware
// const uploadImage = multer({
//     storage: s3Storage,
//     ContentType: "image/jpeg" || "image/png" || "image/jpg",
//     acl: "public-read",
//     fileFilter: (req, file, callback) => {
//         sanitizeFile(file, callback);
//     },
//     limits: {
//         fileSize: 1024 * 1024 * 10, // 10mb file size
//     },
// });

// module.exports = { uploadImage };



const express = require("express");
const router = express.Router();
const { S3 } = require("@aws-sdk/client-s3");

// Import your multer setup and other dependencies here

// Define your S3 client
const s3 = new S3({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: "ap-south-1",
});

// Define your bucket name
const bucketName = "assetorix";

// Route to upload a single image
router.post("/upload/single", uploadImage.single("image"), (req, res) => {
    // Multer middleware handles the file upload to S3
    res.status(200).json({ message: "Image uploaded successfully", "url": req.file.location });
});

// Route to upload multiple images
router.post("/upload/multiple", uploadImage.array("images", 5), (req, res) => {
    // Multer middleware handles the file uploads to S3
    res.status(200).json({ message: "Images uploaded successfully" });
});

// Route to get a single image by its key
router.get("/images/:key", (req, res) => {
    const key = req.params.key;

    const params = {
        Bucket: bucketName,
        Key: key,
    };

    // Retrieve the image from S3
    s3.getObject(params)
        .then((data) => {
            res.setHeader("Content-Type", data.ContentType);
            res.send(data.Body);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Error retrieving image" });
        });
});

// Route to get all images
router.get("/images", (req, res) => {
    const params = {
        Bucket: bucketName,
    };

    // List objects in the S3 bucket (assuming all images are in the root of the bucket)
    s3.listObjectsV2(params)
        .then((data) => {
            const images = data.Contents.map((item) => {
                return {
                    key: item.Key,
                    url: `https://${bucketName}.s3.amazonaws.com/${item.Key}`,
                };
            });

            res.status(200).json(images);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Error listing images" });
        });
});

module.exports = router;

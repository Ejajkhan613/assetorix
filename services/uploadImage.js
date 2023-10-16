const path = require("path");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");


function generateRandomCode() {
    let code = '';
    const digits = '0123456789';

    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        code += digits.charAt(randomIndex);
    }

    return code;
}


// create s3 instance using S3Client
const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    region: "ap-south-1"
});


const s3Storage = multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: "public-read",
    metadata: (req, file, cb) => {
        cb(null, { fieldname: file.fieldname });
    },
    key: (req, file, cb) => {
        const fileName =
            Date.now() + "_" + generateRandomCode() + "_" + file.originalname;
        cb(null, fileName);
    },
});

function sanitizeFile(file, cb) {
    // Define the allowed extension
    const fileExts = [".png", ".jpg", ".jpeg", ".gif"];

    // Check allowed extensions
    const isAllowedExt = fileExts.includes(
        path.extname(file.originalname.toLowerCase())
    );

    // Mime type must be an image
    const isAllowedMimeType = file.mimetype.startsWith("image/");

    if (isAllowedExt && isAllowedMimeType) {
        return cb(null, true); // no errors
    } else {
        // pass error msg to callback, which can be displaye in frontend
        cb("Error: Image type not allowed!");
    }
}

// our middleware
const uploadImage = multer({
    storage: s3Storage,
    ContentType: "image/jpeg" || "image/png" || "image/jpg",
    acl: "public-read",
    fileFilter: (req, file, callback) => {
        sanitizeFile(file, callback);
    },
    limits: {
        fileSize: 1024 * 1024 * 10,
    },
});

module.exports = uploadImage;

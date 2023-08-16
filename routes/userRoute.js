// Dependencies
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const xss = require('xss');



// Custom Modules
const { UserModel } = require("../models/userModel");
const { userMobileDuplicateVerification } = require("../duplicateVerification/mobile");
const { userEmailDuplicateVerification } = require("../duplicateVerification/email");
const { tokenVerify } = require("../middlewares/token");
const { otpService } = require("../services/otp");
const { OtpModel } = require("../models/otpModel");
const { PropertyModel } = require("../models/propertyModel");



// SaltRounds
const saltRounds = 10;



// Secret Key
const secretKey = process.env.secretKey;



// Creating Route Variable
const userRoute = express.Router();



// JSON Parsing
userRoute.use(express.json());



// Function to check if required fields exist and have non-empty values in the object
const checkRequiredFields = (object, requiredFields) => {
    const missingFields = [];
    requiredFields.forEach((field) => {
        if (!(field in object) || object[field] === "") {
            missingFields.push(field);
        }
    });
    return missingFields;
};



// Get User Details
userRoute.get("/", tokenVerify, async (req, res) => {
    let id = req.headers.id;
    let roles = ["customer", "agent", "broker", "employee", "admin", "super_admin"];
    try {
        if (!id) {
            res.status(400).send({ "msg": "Bad Request: ID is not Provided" });
            return;
        }
        const role = res.getHeader("role");
        if (!roles.includes(role)) {
            res.status(400).send({ "msg": "Bad Request: Not Authorized to access this resource" });
            return;
        }
        let data = await UserModel.findOne({ "_id": id }).select({ name: 1, mobile: 1, email: 1 });
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ "msg": "Server Error While Getting User Data" });
    }
});



// Send OTP Route
userRoute.post("/otp", async (req, res) => {
    let { mobile } = req.body;

    if (!mobile) {
        res.status(400).send({ "msg": "Please Provide mobile number to Continue" });
        return;
    }

    if (mobile == "") {
        res.status(400).send({ "msg": "Please Provide mobile number to Continue" });
        return;
    }


    let otp = otpService.generateOTP();

    try {
        let sending = otpService.sendOTP(mobile, otp);
        if (!sending) {
            res.status(400).send({ 'msg': "Otp Sending Failed" });
            return;
        }

        let saveOtpinDB = new OtpModel({ mobile, otp, expirationTime: new Date(Date.now() + 5 * 60 * 1000) });
        await saveOtpinDB.save((err) => {
            if (err) {
                res.status(400).send({ 'msg': "Otp Sending Failed" });
            } else {
                res.status(201).send({ 'msg': "Otp Sent" });
            }
        });
    } catch (error) {
        res.status(500).send({ "msg": "Server Error While Sending OTP" });
    }
});





// User Registration Route
userRoute.post("/register", userMobileDuplicateVerification, async (req, res) => {
    let { name, mobile, password } = req.body;

    // Define the required fields
    const requiredFields = ["name", "mobile", "password"];

    // Check if required fields exist and have non-empty values in the request body
    const missingFields = checkRequiredFields(req.body, requiredFields);
    if (missingFields.length > 0) {
        const errorMsg = `Following Fields are Missing: ${missingFields.join(", ")}`;
        res.status(400).send({ "msg": xss(errorMsg) });
        return;
    }

    try {
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
                res.status(500).send({ "msg": "Error Found while Securing your Password", "err": xss(err) });
                return;
            }

            const token = jwt.sign({ mobile }, secretKey);

            // Saving Data in Database
            let savingData = new UserModel({ name: xss(name), mobile: xss(mobile), "password": hash });
            await savingData.save();

            // Sending Response
            res.status(201).send({ "msg": "Successfully Registered", "token": token, "name": xss(name), "id": savingData._id });
        });
    } catch (error) {
        res.status(500).send({ "msg": "Server Error While Registration" });
    }
});





// User Login Route
userRoute.post("/login", async (req, res) => {
    let { mobile, password } = req.body;

    // Validate and sanitize input
    if (!mobile || !password) {
        res.status(400).send({ "msg": "Please provide valid credentials" });
        return;
    }

    try {
        // Sanitize input before querying the database
        mobile = xss(mobile);

        // Matching input from Database
        let finding = await UserModel.find({ mobile });

        if (finding.length === 1) {
            bcrypt.compare(password, finding[0].password, async (err, result) => {
                if (result) {
                    // Generating Token
                    const token = jwt.sign({ "mobile": finding[0].mobile }, secretKey);

                    // Sanitize and escape output before sending response
                    const sanitizedResponse = {
                        msg: "Login Successful",
                        token: token,
                        name: xss(finding[0].name),
                        id: xss(finding[0]._id)
                    };

                    // Sending Response
                    res.status(200).send(sanitizedResponse);
                } else {
                    res.status(400).send({ "msg": "Not Found: Wrong Credentials" });
                    return;
                }
            });
        } else {
            res.status(400).send({ "msg": "Not Found: Wrong Credentials" });
        }
    } catch (error) {
        res.status(500).send({ "msg": "Internal Server Error: Something Went Wrong while Login" });
    }
});





// Update User Detail
userRoute.patch("/update", tokenVerify, async (req, res) => {

    // accepted roles
    let roles = ["customer", "agent", "broker", "employee", "admin", "super_admin"];

    let id = req.headers.id;
    let { name, email, mobile } = req.body;
    let obj = {};

    // Sanitize and validate input data
    if (name) {
        obj.name = xss(name);
    }
    if (email) {
        obj.email = xss(email);
    }
    if (mobile) {
        obj.mobile = xss(mobile);
    }

    try {
        const role = res.getHeader("role");
        if (!roles.includes(role)) {
            res.status(400).send({ "msg": "Bad Request: Not Authorized to access this resource" });
            return;
        }

        const updatedUser = await UserModel.findByIdAndUpdate({ "_id": id }, obj);
        if (!updatedUser) {
            res.status(404).send({ "msg": "Not Found: User not found with the provided ID" });
            return;
        }

        let data = await UserModel.findOne({ "_id": id }).select({ name: 1, mobile: 1, email: 1 });
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ "msg": "Internal Server Error: Something Went Wrong while Updating" });
    }
});






// User Properties
userRoute.get("/listings", tokenVerify, async (req, res) => {
    let roles = ["customer", "agent", "broker", "employee", "admin", "super_admin"];
    let id = req.headers.id;
    try {
        const role = res.getHeader("role");
        if (!roles.includes(role)) {
            res.status(400).send({ "msg": "Bad Request: Not Authorized to access this resource" });
            return;
        }
        let listings = await PropertyModel.find({ "userID": id });
        res.status(201).send(listings);
    } catch (error) {
        res.status(500).send([{ "msg": "Internal Server Error: Something Went Wrong while Getting Listings" }]);
    }
});


// User Wishlist
userRoute.get("/wishlist", tokenVerify, async (req, res) => {
    let id = req.headers.id;
    let roles = ["customer", "agent", "broker", "employee", "admin", "super_admin"];
    try {
        const role = res.getHeader("role");
        if (!roles.includes(role)) {
            res.status(400).send({ "msg": "Bad Request: Not Authorized to access this resource" });
            return;
        }
        let listings = await PropertyModel.find({ "userID": id }).select({ "wishlist": 1 });
        let array = [];
        for (let a = 0; a < listings.length; a++) {
            let data = {};
            let finding = await PropertyModel.findOne({ "_id": listings[a] });
            array.push(finding);
        }
        res.status(200).send(array);
    } catch (error) {
        res.status(500).send([{ "msg": "Internal Server Error: Something Went Wrong while Getting Listings" }]);
    }
});



// Exporting Route Module
module.exports = { userRoute, checkRequiredFields };
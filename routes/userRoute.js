// Dependencies
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Custom Modules
const { UserModel } = require("../models/userModel");
const { userMobileDuplicateVerification } = require("../duplicateVerification/mobile");
const { userEmailDuplicateVerification } = require("../duplicateVerification/email");
const { otpService } = require("../services/otp");
const { OtpModel } = require("../models/otpModel");



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
userRoute.post("/register", userEmailDuplicateVerification, userMobileDuplicateVerification, async (req, res) => {
    let { avatar, name, mobile, password } = req.body;

    // Define the required fields
    const requiredFields = ["name", "mobile", "password"];

    // Check if required fields exist and have non-empty values in the request body
    const missingFields = checkRequiredFields(req.body, requiredFields);
    if (missingFields.length > 0) {
        const errorMsg = `Following Fields are Missing: ${missingFields.join(", ")}`;
        res.status(400).send({ "msg": errorMsg });
        return;
    }

    try {
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
                res.status(500).send({ "msg": "Error Found while Securing your Password", "err": err });
                return;
            }

            const token = jwt.sign({ mobile }, secretKey);

            // Saving Data in Database
            let savingData = new UserModel({ avatar, name, mobile, "password": hash });
            await savingData.save();

            // Sending Response
            res.status(201).send({ "msg": "Successfully Registered", "token": token, "name": name });
        });
    } catch (error) {
        res.status(500).send({ "msg": "Server Error While Registration" });
    }
});




// User Login Route
userRoute.post("/login", async (req, res) => {
    let { mobile, password } = req.body;
    if (mobile == "") {
        res.status(400).send({ "msg": "Please Provide Your Mobile" });
        return;
    } else if (password == "") {
        res.status(400).send({ "msg": "Please Provide Your Password" });
        return;
    }

    try {
        // Matching input from Database
        let finding = await UserModel.find({ mobile });


        if (finding.length == 1) {

            // Generating Token
            const token = jwt.sign({ "mobile": finding[0].mobile }, secretKey);


            // Sending Response
            res.status(201).send({ "msg": "Login Successful", "token": token, "name": finding[0].name });
        } else {
            res.status(400).send({ "msg": "Wrong Credentials" });
        }
    } catch (error) {
        res.status(500).send({ "msg": "Server Error While Login" });
    }
});



// Exporting Route Module
module.exports = { userRoute };
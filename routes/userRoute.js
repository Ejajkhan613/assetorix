// Dependencies
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



// Custom Modules
const { UserModel } = require("../models/userModel");
const { userMobileDuplicateVerification } = require("../duplicateVerification/mobile");
const { userEmailDuplicateVerification } = require("../duplicateVerification/email");



// SaltRounds
const saltRounds = 10;



// Secret Key
const secretKey = process.env.secretKey;



// Creating Route Variable
const userRoute = express.Router();



// JSON Parsing
userRoute.use(express.json());



// User Registration Route
// userRoute.post("/register", userEmailDuplicateVerification, userMobileDuplicateVerification, async (req, res) => {
//     let { avatar, name, mobile, email, password } = req.body;
//     if (name == "") {
//         res.status(400).send({ "msg": "Please Provide Your Full Name" });
//         return;
//     } else if (mobile == "") {
//         res.status(400).send({ "msg": "Please Provide Your Mobile Number" });
//         return;
//     } else if (email == "") {
//         res.status(400).send({ "msg": "Please Provide Your Email" });
//         return;
//     } else if (password == "") {
//         res.status(400).send({ "msg": "Please Provide Your Password" });
//         return;
//     }
//     try {
//         bcrypt.hash(password, saltRounds, async (err, hash) => {
//             if (err) {
//                 res.status(500).send({ "msg": "Error Found while Securing your Password", "err": err });
//                 return;
//             }

//             const token = jwt.sign({ mobile }, secretKey);

//             // Saving Data in Database
//             let savingData = new UserModel({ avatar, name, mobile, email, "password": hash });
//             await savingData.save();

//             // Sending Response
//             res.status(201).send({ "msg": "Successfully Registered", "token": token, "name": name });
//         });
//     } catch (error) {
//         res.status(500).send({ "msg": "Server Error While Registration" });
//     }
// });



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

// User Registration Route
userRoute.post("/register", userEmailDuplicateVerification, userMobileDuplicateVerification, async (req, res) => {
    let { avatar, name, mobile, email, password } = req.body;

    // Define the required fields
    const requiredFields = ["name", "mobile", "email", "password"];

    // Check if required fields exist and have non-empty values in the request body
    const missingFields = checkRequiredFields(req.body, requiredFields);
    if (missingFields.length > 0) {
        const errorMsg = `Please Provide the Following Fields with Non-Empty Values: ${missingFields.join(", ")}`;
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
            let savingData = new UserModel({ avatar, name, mobile, email, "password": hash });
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
    let { id, password } = req.body;
    if (id == "") {
        res.send({ "msg": "Please Provide Your Email/Mobile" });
        return;
    } else if (password == "") {
        res.send({ "msg": "Please Provide Your Password" });
        return;
    }

    try {
        // Matching input from Database
        let finding = await UserModel.find({ $or: [{ "mobile": id }, { "email": id }] });


        if (finding.length == 1) {

            // Generating Token
            const token = jwt.sign({ "mobile": finding[0].mobile }, secretKey);


            // Sending Response
            res.send({ "msg": "Login Successful", "token": token, "name": finding[0].name });
        } else {
            res.send({ "msg": "Wrong Credentials" });
        }
    } catch (error) {
        res.send({ "msg": "Server Error While Login" });
    }
});



// Exporting Route Module
module.exports = { userRoute };
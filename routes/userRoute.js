// Dependencies
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// Custom Modules
const { UserModel } = require("../models/userModel");



// SaltRounds
const saltRounds = 10;



// Secret Key
const secretKey = process.env.secretKey;


// Creating Route Variable
const userRoute = express.Router();


// JSON Parsing
userRoute.use(express.json());



// User Registration Route
userRoute.post("/register", async (req, res) => {
    let { avatar, name, mobile, email, password } = req.body;
    if (name == "") {
        res.send({ "msg": "Please Provide Your Full Name" });
        return;
    } else if (mobile == "") {
        res.send({ "msg": "Please Provide Your Mobile Number" });
        return;
    } else if (email == "") {
        res.send({ "msg": "Please Provide Your Email" });
        return;
    } else if (password == "") {
        res.send({ "msg": "Please Provide Your Password" });
        return;
    }
    try {
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (hash) {
                const token = jwt.sign({ mobile }, secretKey);

                // Saving Data in Database
                let savingData = new UserModel({ avatar, name, mobile, email, "password": hash });
                await savingData.save();

                // Sending Response
                res.send({ "msg": "Successfully Registered", "token": token, "name": name });
            } else {
                res.send({ "msg": "Error Found", "err": err });
            }
        });
    } catch (error) {

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
        res.send({ "msg": "Error Found", "err": error });
    }
});



// Exporting Route Module
module.exports = { userRoute };
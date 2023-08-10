// Dependencies
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



// Custom Modules
const { UserModel } = require("../models/userModel");
const { checkRequiredFields } = require("../routes/userRoute");
const { userMobileDuplicateVerification } = require("../duplicateVerification/mobile");
const { tokenVerify } = require("../middlewares/token");



// SaltRounds
const saltRounds = 10;


// Secret Key
const secretKey = process.env.secretKey;



// Creating Route Variable
const adminRoute = express.Router();



// JSON Parsing
adminRoute.use(express.json());











// User Registration Route
adminRoute.post("/register", userMobileDuplicateVerification, async (req, res) => {
    let { name, mobile, password, role } = req.body;

    // Define the required fields
    const requiredFields = ["name", "mobile", "password", "role"];

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
            let savingData = new UserModel({ name, mobile, "password": hash, role });
            await savingData.save();

            // Sending Response
            res.status(201).send({ "msg": "Successfully Registered", "token": token, "name": name, "id": savingData._id });
        });
    } catch (error) {
        res.status(500).send({ "msg": "Server Error While Registration" });
    }
});




// User Login Route
adminRoute.post("/login", async (req, res) => {
    let { mobile, password } = req.body;
    if (mobile == "") {
        res.status(400).send({ "msg": "Please Provide Your Mobile" });
        return;
    }
    if (password == "") {
        res.status(400).send({ "msg": "Please Provide Your Password" });
        return;
    }

    try {
        // Matching input from Database
        let finding = await UserModel.find({ mobile });

        if (finding.length == 1 && (finding[0].role == "admin" || finding[0].role == "super_admin")) {

            bcrypt.compare(password, finding[0].password, async (err, result) => {
                if (result) {
                    // Generating Token
                    const token = jwt.sign({ "mobile": finding[0].mobile }, secretKey);


                    // Sending Response
                    res.status(201).send({ "msg": "Login Successful", "token": token, "name": finding[0].name, "id": finding[0]._id });
                }
            });

        } else {
            res.status(400).send({ "msg": "Wrong Credentials" });
        }
    } catch (error) {
        res.status(500).send({ "msg": "Server Error While Login" });
    }
});




// Update User Detail
adminRoute.patch("/employee/update", tokenVerify, async (req, res) => {
    let roles = ["employee", "admin", "super_admin"];
    let id = req.headers.id;
    let { name, email, mobile } = req.body;
    let obj = {};
    if (name) {
        obj.name = name;
    }
    if (email) {
        obj.email = email;
    }
    if (mobile) {
        obj.mobile = mobile;
    }
    try {
        const role = res.getHeader("role");
        if (!roles.includes(role)) {
            res.status(400).send({ "msg": "Bad Request: Not Authorized to access this resource" });
            return;
        }
        const updatedUser = await UserModel.findByIdAndUpdate({ "_id": id }, obj);
        if (!updatedUser) {
            res.status(404).send({ "msg": "Not Found: Details not found with the provided ID" });
            return;
        }
        res.status(200).send({ "msg": "Updated successfully" });
    } catch (error) {
        res.status(500).send({ "msg": "Internal Server Error: Something Went Wrong while Updating" });
    }
});



// Update User Detail
adminRoute.patch("/update", tokenVerify, async (req, res) => {
    let roles = ["admin", "super_admin"];
    let id = req.headers.id;
    let { name, email, mobile, role, isBlocked, isVerified } = req.body;
    let obj = {};
    if (name) {
        obj.name = name;
    }
    if (email) {
        obj.email = email;
    }
    if (mobile) {
        obj.mobile = mobile;
    }
    if (role) {
        obj.role = role;
    }
    if (isBlocked) {
        obj.isBlocked = isBlocked;
    }
    if (isVerified) {
        obj.isVerified = isVerified;
    }
    try {
        const role = res.getHeader("role");
        if (!roles.includes(role)) {
            res.status(400).send({ "msg": "Bad Request: Not Authorized to access this resource" });
            return;
        }
        const updatedUser = await UserModel.findByIdAndUpdate({ "_id": id }, obj);
        if (!updatedUser) {
            res.status(404).send({ "msg": "Not Found: Details not found with the provided ID" });
            return;
        }
        res.status(200).send({ "msg": "Updated successfully" });
    } catch (error) {
        res.status(500).send({ "msg": "Internal Server Error: Something Went Wrong while Updating" });
    }
});



// get all details except password
adminRoute.get("/all", tokenVerify, async (req, res) => {
    let roles = ["admin", "super_admin"];
    let allRoles = ["customer", "agent", "broker", "employee", "admin", "super_admin"];
    let roleQuery = req.query.role;
    try {
        const role = res.getHeader("role");
        if (!roles.includes(role)) {
            res.status(400).send({ "msg": "Bad Request: Not Authorized to access this resource" });
            return;
        }
        // Validate and sanitize roleQuery parameter
        const roleQuery = req.query.role;
        if (!roleQuery || typeof roleQuery !== 'string' || !allRoles.includes(roleQuery)) {
            res.status(400).send({ "msg": "Bad Request: Invalid role parameter" });
            return;
        }
        let allData = await UserModel.find({ "role": roleQuery }).select('-password');
        res.status(200).send(allData);
    } catch (error) {
        res.status(500).send({ "msg": "Internal Server Error: Something Went Wrong while Fetching all Data" });
    }
});


// route to block or unblock access
adminRoute.post("/block", tokenVerify, async (req, res) => {
    let roles = ["admin", "super_admin"];
    let { id, status } = req.body;

    try {
        const role = res.getHeader("role");
        if (!roles.includes(role)) {
            res.status(400).send({ "msg": "Bad Request: Not Authorized to modify Access Control" });
            return;
        }

        let Data = await UserModel.findById({ "_id": id });
        let dataRole = Data.role;

        if (role == "admin" && dataRole == "super_admin") {
            res.status(400).send({ "msg": "Bad Request: Not Authorized to block/unblock Super Admin" });
        } else {
            await UserModel.findByIdAndUpdate({ "_id": id }, { "isBlocked": status });
            res.status(200).send({ "msg": "Updated Successfully" });
        }
    } catch (error) {
        res.status(500).send({ "msg": "Internal Server Error: Something Went Wrong while Access Control" });
    }
});



module.exports = { adminRoute };
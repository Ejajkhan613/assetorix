// Dependencies
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const xss = require('xss');


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





// Admin Registration Route
adminRoute.post("/register", userMobileDuplicateVerification, async (req, res) => {
    let { name, mobile, password, role } = req.body;

    // Define the required fields
    const requiredFields = ["name", "mobile", "password", "role"];

    // Sanitize and validate user inputs
    name = xss(name);
    mobile = xss(mobile);
    role = xss(role);

    // Check if required fields exist and have non-empty values in the request body
    const missingFields = checkRequiredFields({ name, mobile, password, role }, requiredFields);
    if (missingFields.length > 0) {
        const errorMsg = `Following Fields are Missing: ${missingFields.join(", ")}`;
        res.status(400).send({ "msg": xss(errorMsg) });
        return;
    }

    try {
        const hash = await bcrypt.hash(password, saltRounds);

        const token = jwt.sign({ mobile }, secretKey);

        const savingData = new UserModel({ name, mobile, role, "password": hash });
        await savingData.save();

        // Sanitize output before sending response
        const sanitizedResponse = {
            msg: "Registration Successful",
            token,
            name,
            id: xss(savingData._id)
        };

        // Adding a cookie to the response
        res.cookie('authorization', token, {
            maxAge: 20 * 24 * 60 * 60 * 1000, // 20 days of expiration
            httpOnly: true,
            secure: true
            // sameSite: 'strict'
        });

        res.cookie('id', sanitizedResponse.id, {
            maxAge: 20 * 24 * 60 * 60 * 1000, // 20 days of expiration
            httpOnly: true,
            secure: true
            // sameSite: 'strict'
        });

        return res.status(201).send(sanitizedResponse);
    } catch (error) {
        res.status(500).send({ "msg": "Server Error While Registration" });
    }
});




// User Login Route
adminRoute.post("/login", async (req, res) => {
    let { mobile, password } = req.body;

    // Sanitize and validate user inputs
    mobile = xss(mobile);

    try {
        if (!mobile) {
            res.status(400).send({ "msg": "Please Provide Your Mobile" });
            return;
        }
        if (!password) {
            res.status(400).send({ "msg": "Please Provide Your Password" });
            return;
        }
        // Matching input from Database
        const user = await UserModel.findOne({ "mobile": mobile });
        if (!user) {
            res.status(400).send({ "msg": "Invalid credentials." });
            return;
        }

        // Compare the hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch && (user.role === "admin" || user.role === "super_admin")) {
            // Generate JWT token
            const token = jwt.sign({ mobile: user.mobile }, secretKey);

            // Sanitize output before sending response
            const sanitizedResponse = {
                msg: "Login Successful",
                token,
                name: xss(user.name),
                id: xss(user._id)
            };

            // Adding a cookie to the response
            res.cookie('authorization', token, {
                maxAge: 20 * 24 * 60 * 60 * 1000, // 20 days of expiration
                httpOnly: true,
                secure: true
                // sameSite: 'strict'
            });

            res.cookie('id', sanitizedResponse.id, {
                maxAge: 20 * 24 * 60 * 60 * 1000, // 20 days of expiration
                httpOnly: true,
                secure: true
                // sameSite: 'strict'
            });

            return res.status(200).json(sanitizedResponse);
        } else {
            return res.status(400).json({ "msg": "Invalid credentials." });
        }
    } catch (error) {
        res.status(500).send({ "msg": "Server Error While Login" });
    }
});




// // Update employee Detail
// adminRoute.patch("/employee/update", tokenVerify, async (req, res) => {
//     let roles = ["employee", "admin", "super_admin"];
//     let id = req.headers.id;
//     let { name, email, mobile } = req.body;
//     let obj = {};

//     // Sanitize and validate user inputs
//     if (name) {
//         obj.name = xss(name);
//     }
//     if (email) {
//         obj.email = xss(email);
//     }
//     if (mobile) {
//         obj.mobile = xss(mobile);
//     }

//     try {
//         const role = res.getHeader("role");
//         if (!roles.includes(role)) {
//             res.status(400).send({ "msg": "Bad Request: Not Authorized to access this resource" });
//             return;
//         }
//         res.removeHeader("role");
//         const updatedUser = await UserModel.findByIdAndUpdate({ "_id": id }, obj);
//         if (!updatedUser) {
//             res.status(404).send({ "msg": "Not Found: Details not found with the provided ID" });
//             return;
//         }
//         res.status(200).send({ "msg": "Updated successfully" });
//     } catch (error) {
//         res.status(500).send({ "msg": "Internal Server Error: Something Went Wrong while Updating" });
//     }
// });




// Update admin/super admin Detail
adminRoute.patch("/update", tokenVerify, async (req, res) => {
    let roles = ["employee", "admin", "super_admin"];
    let id = req.headers.id;
    let { name, email, mobile, role, isBlocked, isVerified } = req.body;
    let obj = {};
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
            res.status(404).send({ "msg": "Not Found: Details not found with the provided ID" });
            return;
        }
        res.status(200).send({ "msg": "Updated successfully" });
    } catch (error) {
        res.status(500).send({ "msg": "Internal Server Error: Something Went Wrong while Updating" });
    }
});




// Update admin/super admin Detail
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


// exporting module
module.exports = { adminRoute };
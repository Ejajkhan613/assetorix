// Dependencies
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const xss = require('xss');



// Custom Modules
const { UserModel } = require("../models/userModel");
const { userMobileDuplicateVerification } = require("../duplicateVerification/mobile");
const { tokenVerify } = require("../middlewares/token");
const { isValidName } = require("../services/nameValidation");



// SaltRounds
const saltRounds = 10;



// Secret Key
const secretKey = process.env.secretKey;


// Secret Key
const adminSecretKey = process.env.adminSecretKey;



// Creating Route Variable
const adminRoute = express.Router();



// JSON Parsing
adminRoute.use(express.json());




// Get Admin Details
adminRoute.get("/", tokenVerify, async (req, res) => {
    try {
        let obj = {};
        obj.name = req.userDetail.name || "";
        obj.email = req.userDetail.email || "";
        obj.mobile = req.userDetail.mobile || "";
        obj.wishlist = req.userDetail.wishlist.length;
        obj.avatar = req.userDetail.avatar;

        obj.listings = req.userDetail.listings;

        res.status(200).send(obj);
    } catch (error) {
        res.status(500).send({ "msg": "Server Error While Getting Data", "error": error });
    }
});


// Admin Registration Route
adminRoute.post("/register", userMobileDuplicateVerification, async (req, res) => {
    let { name, mobile, password, role, key } = req.body;
    let roles = ["employee", "admin", "super_admin"];

    name = xss(name);
    mobile = xss(mobile);
    role = xss(role);

    if (!name) {
        return res.status(400).send({ "msg": "Name is Missing" });
    }
    if (!isValidName(name)) {
        return res.status(400).send({ "msg": "Name can't contain number or symbols" });
    }

    if (!mobile) {
        return res.status(400).send({ "msg": "Mobile Number is Missing" });
    }
    if (mobile.length != 10) {
        return res.status(400).send({ "msg": "Wrong Mobile Number, Check length" });
    }

    if (!password) {
        return res.status(400).send({ "msg": "Password is Missing" });
    }

    if (!role) {
        return res.status(400).send({ "msg": "Role is Missing" })
    }

    if (!roles.includes(role)) {
        return res.status(400).send({ "msg": "Wrong Role Type" });
    }

    if (!key) {
        return res.status(400).send({ "msg": "Admin Access Key is Missing" })
    }

    if (key != adminSecretKey) {
        return res.status(400).send({ "msg": "Access Denied, Wrong Admin Key" });
    }

    try {
        let hashedPassword = bcrypt.hashSync(password, saltRounds);

        // Saving Data in Database
        let savingData = new UserModel({ name, mobile, "password": hashedPassword, role });
        await savingData.save();

        const token = jwt.sign({ "userID": savingData._id }, secretKey);

        // Sending Response
        res.status(201).send({ "msg": "Successfully Registered", "token": token, "name": name, "id": savingData._id, role });
    } catch (error) {
        res.status(500).send({ "msg": "Server Error While Registration" });
    }
});



// User Login Route
adminRoute.post("/login", async (req, res) => {
    let { mobile, password } = req.body;
    let roles = ["employee", "admin", "super_admin"];

    mobile = xss(mobile);

    if (!mobile) {
        return res.status(400).send({ "msg": "Mobile Number is Missing" });
    }
    if (mobile.length != 10) {
        return res.status(400).send({ "msg": "Wrong Mobile Number, Check length" });
    }

    if (!password) {
        return res.status(400).send({ "msg": "Password is Missing" });
    }

    try {

        // Matching input from Database
        let finding = await UserModel.findOne({ mobile });

        if (!finding) {
            return res.status(400).send({ "msg": "Wrong Credentials" });
        }
        if (!roles.includes(finding.role)) {
            return res.status(400).send({ "msg": "Access Denied, Role Not Allowed" });
        }

        let isPasswordMatching = bcrypt.compareSync(password, finding.password);

        if (!isPasswordMatching) {
            return res.status(400).send({ "msg": "Wrong Credentials" });
        }

        const token = jwt.sign({ "userID": finding._id }, secretKey);

        // Sending Response
        res.status(200).send({ "msg": "Login Successful", token, "name": finding.name, "id": finding._id, "role": finding.role });
    } catch (error) {
        res.status(500).send({ "msg": "Server Error While Login" });
    }
});



// Update employee Detail
adminRoute.patch("/update", tokenVerify, async (req, res) => {

    let roles = ["employee", "admin", "super_admin"];

    let id = req.headers.id;

    let { name, email, mobile } = req.body;

    let obj = {};

    // Sanitize and validate user inputs
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
        res.removeHeader("role");

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




// Items Per Page
const ITEMS_PER_PAGE = 10;

// get all details except password
adminRoute.get("/all", tokenVerify, async (req, res) => {
    let roles = ["admin", "super_admin"];
    let allRoles = ["customer", "agent", "employee", "admin", "super_admin"];

    try {
        const role = res.getHeader("role");
        if (!roles.includes(role)) {
            res.status(400).send({ "msg": "Bad Request: Not Authorized to access this resource" });
            return;
        }
        res.removeHeader("role");

        // Get query parameters from frontend
        const roleQuery = req.query.role; // Grouped by role
        const searchQuery = req.query.search; // Searching by name, number, or email
        const page = req.query.page; // Pagination page

        // Build query conditions based on roleQuery and searchQuery
        let queryConditions = {};

        if (searchQuery) {
            queryConditions.$or = [
                { name: { $regex: searchQuery, $options: "i" } }, // Case-insensitive name search
                { number: searchQuery },
                { email: { $regex: searchQuery, $options: "i" } } // Case-insensitive email search
            ];
        }

        // Validate and sanitize roleQuery parameter
        if (roleQuery && (typeof roleQuery !== 'string' || !allRoles.includes(roleQuery))) {
            res.status(400).send({ "msg": `Bad Request: Invalid role ${roleQuery}` });
            return;
        }

        if (roleQuery) {
            queryConditions.role = roleQuery;
        }

        const currentPage = parseInt(page) || 1;

        const totalCount = await UserModel.countDocuments(queryConditions);

        if (totalCount === 0) {
            // Handle the case where there are no users with the provided role
            res.status(201).send([]);
            return;
        }

        const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

        const skipItems = (currentPage - 1) * ITEMS_PER_PAGE;
        let data = await UserModel.find(queryConditions)
            .select('-password')
            .skip(skipItems)
            .limit(ITEMS_PER_PAGE);

        // Adjust the data if it's the last page and there's not enough data for a full page
        if (data.length === 0 && currentPage > 1) {
            const lastPageSkipItems = (totalPages - 1) * ITEMS_PER_PAGE;
            data = await UserModel.find(queryConditions)
                .select('-password')
                .skip(lastPageSkipItems)
                .limit(totalCount % ITEMS_PER_PAGE);
        }

        res.status(200).send({
            data,
            currentPage: data.length === 0 ? totalPages : currentPage,
            totalPages,
            totalCount,
        });
    } catch (error) {
        res.status(500).send({ "msg": "Internal Server Error: Error Fetching all Data" });
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
        res.removeHeader("role");

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
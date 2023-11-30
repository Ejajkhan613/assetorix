// Dependencies
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const xss = require('xss');



// Custom Modules
const { UserModel } = require("../models/userModel");
const { PropertyModel } = require("../models/propertyModel");
const { userMobileDuplicateVerification } = require("../duplicateVerification/mobile");
const { tokenVerify } = require("../middlewares/token");
const { isValidName } = require("../services/nameValidation");
const { userEmailDuplicateVerification } = require("../duplicateVerification/email");
const { email_OTP_sending } = require("../mail/emailOTP");
const { EmailOTPModel } = require("../models/emailOTPModel");
const { LogsModel } = require("../models/logs");
const { indianTime } = require("../services/indianTime");


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
        obj.role = req.userDetail.role;
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
    let { name, mobile, password, key } = req.body;

    name = xss(name);
    mobile = xss(mobile);

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

    if (!key) {
        return res.status(400).send({ "msg": "Admin Access Key is Missing" })
    }

    if (key != adminSecretKey) {
        return res.status(400).send({ "msg": "Access Denied, Wrong Admin Key" });
    }

    try {
        let hashedPassword = bcrypt.hashSync(password, saltRounds);

        // Saving Data in Database
        let savingData = new UserModel({ name, mobile, "password": hashedPassword, "role": "employee" });
        await savingData.save();

        const token = jwt.sign({ "userID": savingData._id }, secretKey);

        // Sending Response
        res.status(201).send({ "msg": "Successfully Registered", "token": token, "name": name, "id": savingData._id, "role": savingData.role });
    } catch (error) {
        res.status(500).send({ "msg": "Server Error While Registration", error });
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



adminRoute.get("/search/", async (req, res) => {
    try {
        const { lookingFor, propertyGroup, search, page } = req.query;
        const currentPage = parseInt(page) || 1;

        let filter = { "$and": [{ "lookingFor": lookingFor || "Sell" }, { "propertyGroup": propertyGroup || "Residential" }] };

        if (search) {
            const regexSearch = new RegExp(search, "i");
            filter["$and"].push({
                $or: [
                    { "address.pincode": regexSearch },
                    { "address.city": regexSearch },
                    { "address.state": regexSearch },
                    { "address.country": regexSearch },
                    { "address.houseNumber": regexSearch },
                    { "address.apartmentName": regexSearch },
                    { "address.zoneType": regexSearch },
                    { "address.locatedInside": regexSearch },
                    { "address.type": regexSearch }
                ]
            });
        }

        const totalCount = await PropertyModel.countDocuments(filter);
        const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

        const options = {
            skip: (currentPage - 1) * ITEMS_PER_PAGE,
            limit: ITEMS_PER_PAGE,
        };

        const data = await PropertyModel.find(filter, null, options);

        res.status(200).send({
            data,
            currentPage,
            totalPages,
            totalCount,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ "msg": "Server Error While getting Properties", "error": error });
    }
});


// Filter Route
adminRoute.get("/property/", tokenVerify, async (req, res) => {
    try {
        let { lookingFor, propertyGroup, page, ...queryParams } = req.query;
        const currentPage = parseInt(page) || 1;

        let filter = { "lookingFor": lookingFor };

        if (propertyGroup) {
            filter["propertyGroup"] = propertyGroup;
        }

        for (const [key, value] of Object.entries(queryParams)) {
            if (value) {
                filter["$and"] = filter["$and"] || [];
                filter["$and"].push(Array.isArray(value)
                    ? { [key]: { $in: value } }
                    : { [key]: value }
                );
            }
        }

        const totalCount = await PropertyModel.countDocuments(filter);
        const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

        const options = {
            skip: (currentPage - 1) * ITEMS_PER_PAGE,
            limit: ITEMS_PER_PAGE,
        };

        if (!totalCount) {
            const relatedData = await PropertyModel.find({ "lookingFor": lookingFor }, null, options);
            if (relatedData.length) {
                return res.status(200).send({ "msg": "Exact Match Not Found", "data": relatedData, currentPage, totalPages, totalCount });
            } else {
                const relatedData = await PropertyModel.find({}, null, options);
                const totalCount = await PropertyModel.countDocuments({});
                const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
                return res.status(200).send({ "msg": "Exact Match Not Found", relatedData, currentPage, totalPages, totalCount })
            }
        }

        const data = await PropertyModel.find(filter, null, options);

        res.status(200).send({
            data,
            currentPage,
            totalPages,
            totalCount,
        });
    } catch (error) {
        res.status(500).send({ "msg": "Server Error While getting Properties", "error": error });
    }
});



// Sending OTP to Email and Saving in DB
adminRoute.post("/emailOTP", tokenVerify, async (req, res) => {
    try {
        const email = req.body.email;
        let roles = ["employee", "admin", "super_admin"];

        if (!roles.includes(req.userDetail.role)) {
            return res.status(400).send({ "msg": "Access Denied, Role Not Allowed" });
        }

        if (!email) {
            return res.status(400).send({ "msg": "Please Provide Valid Email" });
        }

        if (req.userDetail.email == email) {
            return res.status(400).send({ "msg": "Email Already Registered, Provide Another" });
        }

        if (await userEmailDuplicateVerification(email)) {
            return res.status(400).send({ "msg": "Email Already Registered, Provide Another" });
        }

        const sending = await email_OTP_sending(email);

        if (!sending.status) {
            return res.status(400).send({ "msg": "Error: Could not send OTP, Try Again Later", "error": sending.msg });
        }


        const filter = { email };
        const update = { "otp": sending.otp, "createdAt": Date.now() };

        const result = await EmailOTPModel.findOneAndUpdate(filter, update, {
            upsert: true,
            new: true
        });

        if (result) {
            let userDetail = req.userDetail;
            let logs = new LogsModel({ "id": userDetail._id, "title": "Email_OTP_Sending", "old": userDetail.email, "new": email });
            await logs.save();
            return res.status(200).json({ "msg": "OTP Sent Successfully" });
        } else {
            return res.status(500).json({ "error": "Failed to update new OTP" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ "msg": "Internal Server Error: While Sending OTP", "error": error });
    }
});



// Verifying OTP and Updating Email
adminRoute.post("/emailVerify", tokenVerify, async (req, res) => {
    try {
        let { email, otp } = req.body;
        let roles = ["employee", "admin", "super_admin"];

        if (!roles.includes(req.userDetail.role)) {
            return res.status(400).send({ "msg": "Access Denied, Role Not Allowed" });
        }

        if (!email) {
            return res.status(400).send({ "msg": "Email Not Provided" });
        }

        if (!otp) {
            return res.status(400).send({ "msg": "OTP Not Provided" });
        }

        let findInDB = await EmailOTPModel.findOne({ "email": email });

        if (!findInDB.email) {
            return res.status(400).send({ "msg": "Invalid OTP" });
        }

        if (findInDB.otp != otp) {
            return res.status(400).send({ "msg": "Invalid OTP" });
        }

        await EmailOTPModel.findByIdAndDelete({ "_id": findInDB._id });

        let user = req.userDetail;
        let logs = new LogsModel({ "id": user._id, "title": "Email_OTP_Verification", "old": user.email || "", "new": email });
        await logs.save();

        user.email = email;
        user.lastUpdated = indianTime();

        await user.save();

        res.status(201).send({ "msg": "Email Updated" });
    } catch (error) {
        res.status(500).send({ "msg": "Internal Server Error While Verifying OTP", "error": error });
    }
})




// Update User Detail
adminRoute.patch("/update", tokenVerify, async (req, res) => {
    try {

        let roles = ["employee", "admin", "super_admin"];

        if (!roles.includes(req.userDetail.role)) {
            return res.status(400).send({ "msg": "Access Denied, Role Not Allowed" });
        }

        let user = req.userDetail;

        let { name, mobile } = req.body;

        if (name) {
            if (!isValidName(name)) {
                return res.status(400).send({ "msg": "Name can't contain number or symbols" });
            } else {
                let logs = new LogsModel({ "id": user._id, "title": "Name_Update", "old": user.name, "new": name });
                await logs.save();
                user.name = name;
            }
        }

        if (mobile) {
            if (mobile.length != 10) {
                return res.status(400).send({ "msg": "Wrong Mobile Number, Check length" });
            } else {
                let logs = new LogsModel({ "id": user._id, "title": "Mobile_Update", "old": user.mobile, "new": mobile });
                await logs.save();
                user.mobile = mobile;
            }
        }

        await user.save();

        res.status(200).send({ "msg": "Profile Updated" });
    } catch (error) {
        res.status(500).send({ "msg": "Internal Server Error while Updating", "error": error });
    }
});




// Items Per Page
const ITEMS_PER_PAGE = 20;

// get all details except password
adminRoute.get("/all", tokenVerify, async (req, res) => {
    try {

        let roles = ["admin", "super_admin"];
        let allRoles = ["customer", "agent", "employee", "admin", "super_admin"];

        if (!roles.includes(req.userDetail.role)) {
            return res.status(400).send({ "msg": "Access Denied, Role Not Allowed" });
        }

        // Get query parameters from frontend
        const roleQuery = req.query.role; // Grouped by role
        const searchQuery = req.query.search; // Searching by name, number, or email
        const page = req.query.page; // Pagination page

        // Build query conditions based on roleQuery and searchQuery
        let queryConditions = {};

        if (searchQuery) {
            queryConditions.$or = [
                { name: { $regex: searchQuery, $options: "i" } }, // Case-insensitive $options: "i"
                { mobile: searchQuery },
                { email: { $regex: searchQuery, $options: "i" } }
            ];
        }

        // Validate and sanitize roleQuery parameter
        if (roleQuery && (typeof roleQuery !== 'string' || !allRoles.includes(roleQuery))) {
            return res.status(400).send({ "msg": `Bad Request: Invalid role ${roleQuery}` });
        }

        if (roleQuery) {
            queryConditions.role = roleQuery;
        }

        const currentPage = parseInt(page) || 1;

        const totalCount = await UserModel.countDocuments(queryConditions);

        if (totalCount === 0) {
            // Handle the case where there are no users with the provided role
            return res.status(201).send({
                data: [],
                currentPage: 1,
                totalPages: 0,
                totalCount,
            });
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



// Route to Change Role
adminRoute.post("/role", tokenVerify, async (req, res) => {
    let { id, status } = req.body;
    let validTypes = ["customer", "agent", "employee", "admin", "super_admin"];

    try {
        let roles = ["super_admin"];

        if (!roles.includes(req.userDetail.role)) {
            return res.status(400).send({ "msg": "Access Denied, Role Not Allowed" });
        }
        if (!id) {
            return res.status(400).send({ "msg": "Missing Target Account ID" });
        }

        if (!status) {
            return res.status(400).send({ "msg": "Missing Role Value" });
        }

        if (!validTypes.includes(status)) {
            return res.status(400).send({ "msg": `Role Value is Wrong- ${status}` });
        }

        await UserModel.findOneAndUpdate({ "_id": id }, { "role": status });

        res.status(200).send({ "msg": `Role Successfully Updated to ${status}` });


    } catch (error) {
        res.status(500).send({ "msg": "Internal Server Error: Something Went Wrong while Access Control" });
    }
});



// route to block or unblock access
adminRoute.post("/block", tokenVerify, async (req, res) => {
    let { id, status } = req.body;
    let validTypes = [true, false, "true", "false"];

    try {
        let roles = ["admin", "super_admin"];

        if (!roles.includes(req.userDetail.role)) {
            return res.status(400).send({ "msg": "Access Denied, Role Not Allowed" });
        }
        if (!id) {
            return res.status(400).send({ "msg": "Missing Target Account ID" });
        }

        if (validTypes.includes(status)) {
            let user = req.userDetail;

            let targetAccount = await UserModel.findById({ "_id": id });

            if (user.role == "super_admin") {
                targetAccount.isBlocked = status;
                targetAccount.save();
            } else if (user.role == "admin") {
                let allowedRolesToBlock = ["customer", "agent", "employee"];

                if (!allowedRolesToBlock.includes(targetAccount.role)) {
                    return res.status(400).send({ "msg": "Not Allowed to Block/Unblock" });
                }

                targetAccount.isBlocked = status;
                targetAccount.save();
            }
            res.status(200).send({ "msg": "Updated Successfully" });
        } else {
            return res.status(400).send({ "msg": `Missing/Wrong Status Value- ${status}` });
        }
    } catch (error) {
        res.status(500).send({ "msg": "Internal Server Error: Something Went Wrong while User Block/Unblock" });
    }
});


// Verify User
adminRoute.post("/verifyUser", tokenVerify, async (req, res) => {
    let { id, status } = req.body;

    let validTypes = [true, false, "true", "false"];

    try {
        let roles = ["admin", "super_admin"];

        if (!roles.includes(req.userDetail.role)) {
            return res.status(400).send({ "msg": "Access Denied, Role Not Allowed" });
        }

        if (!id) {
            return res.status(400).send({ "msg": "Missing Target Account ID" });
        }

        let targetAccount = await UserModel.findById({ "_id": id });

        if (!validTypes.includes(status)) {
            return res.status(400).send({ "msg": `Missing/Wrong Verification Status Type - ${status}` });
        }

        targetAccount.isVerified = status;
        targetAccount.save();

        res.status(200).send({ "msg": "Updated Successfully" });
    } catch (error) {
        res.status(500).send({ "msg": "Internal Server Error: Something Went Wrong while User Status" });
    }
});



// route to verify Property and Approve/reject/pending/sold
adminRoute.post("/verificationState", tokenVerify, async (req, res) => {
    let { id, status } = req.body;

    let validTypes = ["Pending", "Approved", "Rejected", "Blocked", "Sold"];

    try {
        let roles = ["admin", "super_admin"];

        if (!roles.includes(req.userDetail.role)) {
            return res.status(400).send({ "msg": "Access Denied, Role Not Allowed" });
        }

        if (!id) {
            return res.status(400).send({ "msg": "Missing Target Account ID" });
        }

        if (!status) {
            return res.status(400).send({ "msg": "Missing Status Value" });
        }

        let targetProperty = await PropertyModel.findById({ "_id": id });

        if (!validTypes.includes(status)) {
            return res.status(400).send({ "msg": `Wrong Verification Status Type - ${status}` });
        }

        targetProperty.verificationState = status;
        targetProperty.save();

        res.status(200).send({ "msg": "Updated Successfully" });
    } catch (error) {
        res.status(500).send({ "msg": "Internal Server Error: Something Went Wrong while Changing Status" });
    }
});


// Get Verification List
adminRoute.get("/verificationStateList", tokenVerify, async (req, res) => {
    const verificationStateList = ["Pending", "Approved", "Rejected", "Blocked", "Sold"];
    const propertyStateList = ["Private", "Public", "Sold"];
    const roles = ["admin", "super_admin"];

    const adminVerificationStatus = req.query.adminState;
    const userPropertyStatus = req.query.userState;
    // const search = req.query.search;
    const page = parseInt(req.query.page) || 1;
    const perPage = 20;

    try {
        if (!roles.includes(req.userDetail.role)) {
            return res.status(400).send({ "msg": "Access Denied, Role Not Allowed" });
        }

        const query = {};

        if (adminVerificationStatus && verificationStateList.includes(adminVerificationStatus)) {
            query.$and = [{ verificationState: adminVerificationStatus }];
        }

        if (userPropertyStatus && propertyStateList.includes(userPropertyStatus)) {
            if (query.$and) {
                query.$and.push({ propertyState: userPropertyStatus });
            } else {
                query.$and = [{ propertyState: userPropertyStatus }];
            }
        }

        const totalProperties = await PropertyModel.countDocuments(query);
        const totalPages = Math.ceil(totalProperties / perPage);

        const targetProperties = await PropertyModel
            .find(query)
            .skip((page - 1) * perPage)
            .limit(perPage);

        const data = targetProperties;
        const currentPage = data.length === 0 ? totalPages : page;
        const totalCount = totalProperties;

        res.status(200).send({
            data,
            currentPage,
            totalPages,
            totalCount,
        });
    } catch (error) {
        res.status(500).send({ "msg": "Internal Server Error: Something Went Wrong while Getting List" });
    }
});



// exporting module
module.exports = { adminRoute };
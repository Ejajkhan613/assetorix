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
const { checkRequiredFields } = require("../services/requiredFields");
const { otpService } = require("../services/otp");
const { OtpModel } = require("../models/otpModel");
const { PropertyModel } = require("../models/propertyModel");
const { indianTime } = require("../services/indianTime");
const { isValidName } = require("../services/nameValidation");
const { isValidEmail } = require("../services/emailValidation");
const { EmailOTPModel } = require("../models/emailOTPModel");
const { email_OTP_sending } = require("../mail/emailOTP");



// SaltRounds
const saltRounds = 10;



// Secret Key
const secretKey = process.env.secretKey;



// Creating Route Variable
const userRoute = express.Router();



// JSON Parsing
userRoute.use(express.json());




// Get User Details
userRoute.get("/", tokenVerify, async (req, res) => {
    let id = req.headers.id;
    let roles = ["customer", "agent", "employee", "admin", "super_admin"];
    try {
        if (!id) {
            res.status(400).send({ "msg": "Bad Request: ID is not Provided" });
            return;
        }
        const role = res.getHeader("role");
        if (!roles.includes(role)) {
            res.status(400).send({ "msg": "Bad Request: Role Access Denied" });
            return;
        }
        res.removeHeader("role");
        let data = await UserModel.findById({ "_id": id }, { name: 1, mobile: 1, email: 1, _id: 0 });
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
                res.status(500).send({ "msg": "Error in Password Hashing", "err": xss(err) });
                return;
            }
            let userData = {};

            // Sanitize and validate input data
            if (name) {
                if (isValidName(xss(name))) {
                    userData.name = xss(name);
                } else {
                    res.status(400).send({ "msg": "Bad Request: Name should not contain symbols or numbers" });
                    return;
                }
            }
            if (mobile) {
                if (xss(mobile).length == 10) {
                    userData.mobile = xss(mobile);
                } else {
                    res.status(400).send({ "msg": "Bad Request: mobile number does not have the correct length" });
                    return;
                }
            }


            // Saving Data in Database
            let savingData = new UserModel({ name: userData.name, mobile: userData.mobile, "password": hash });
            await savingData.save();

            const token = jwt.sign({ "userID": savingData._id }, secretKey);

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
                    const token = jwt.sign({ "userID": finding[0]._id }, secretKey);

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



// Sending OTP to Email and Saving in DB
userRoute.post("/emailOTP", tokenVerify, async (req, res) => {
    try {
        const email = xss(req.body.email);
        if (await userEmailDuplicateVerification(email)) {
            return res.status(400).send({ "msg": "Email Already Registered" });
        }
        const sending = await email_OTP_sending(email);

        if (!sending.status) {
            return res.status(400).send({ "msg": "Error: Could not send OTP", "error": sending.msg });
        }

        const otp = sending.otp;
        const existingOTP = await EmailOTPModel.findOne({ "email": email });

        if (existingOTP) {
            existingOTP.otp = otp;
            await existingOTP.save();
        } else {
            const newOTP = new EmailOTPModel({ "email": email, "otp": otp });
            await newOTP.save();
        }

        res.status(201).send({ "msg": "OTP Sent Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ "msg": "Internal Server Error: While Sending OTP" });
    }
});



// Verifying OTP and Updating Email
userRoute.post("/emailVerify", tokenVerify, async (req, res) => {
    try {
        let email = xss(req.body.email);
        let otp = xss(req.body.otp);
        let id = xss(req.headers.id);

        let matching = await EmailOTPModel.findOne({ "email": email });
        if (matching && matching.otp == otp) {
            await UserModel.findByIdAndUpdate({ "_id": id }, { "email": matching.email });
            await EmailOTPModel.findByIdAndDelete({ "_id": matching._id })
            res.status(201).send({ "msg": "Email Updated" });
        } else {
            res.status(400).send({ "msg": "OTP is wrong or Expired" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ "msg": "Internal Server Error:  Something Went Wrong While Verifying OTP" });
    }
})



// Update User Detail
userRoute.patch("/update", tokenVerify, async (req, res) => {

    let id = req.headers.id;
    let { name, mobile } = req.body;
    let obj = {};

    try {

        // Sanitize and validate input data
        if (name) {
            if (isValidName(xss(name))) {
                obj.name = xss(name);
            } else {
                res.status(400).send({ "msg": "Bad Request: Name should not contain symbols or numbers" });
                return;
            }
        }

        if (mobile) {
            if (xss(mobile).length == 10) {
                obj.mobile = xss(mobile);
            } else {
                res.status(400).send({ "msg": "Bad Request: mobile number does not have the correct length" });
                return;
            }
        }
        obj.lastUpdated = indianTime();


        const updatedUser = await UserModel.findByIdAndUpdate({ "_id": id }, obj);
        if (!updatedUser) {
            res.status(404).send({ "msg": "Not Found: User not found with the provided ID" });
            return;
        }

        res.status(201).send({ "msg": "Updated Successfully" });
    } catch (error) {
        res.status(500).send({ "msg": "Internal Server Error: Something Went Wrong while Updating" });
    }
});




// Items Per Page
const ITEMS_PER_PAGE = 10;



// User Properties
userRoute.get("/listings", tokenVerify, async (req, res) => {
    let roles = ["customer", "agent", "employee", "admin", "super_admin"];
    let id = xss(req.headers.id);

    const { page } = req.query;

    try {
        const currentPage = parseInt(page) || 1;

        const role = res.getHeader("role");
        if (!roles.includes(role)) {
            res.status(400).send({ "msg": "Bad Request: Role Access Denied" });
            return;
        }


        let totalCount = await PropertyModel.countDocuments({ "userID": id });
        const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

        const skipItems = (currentPage - 1) * ITEMS_PER_PAGE;
        let data = await PropertyModel.find({ "userID": id })
            .skip(skipItems)
            .limit(ITEMS_PER_PAGE);


        // // Adjust the data if it's the last page and there's not enough data for a full page
        if (data.length === 0 && currentPage > 1) {
            const lastPageSkipItems = (totalPages - 1) * ITEMS_PER_PAGE;
            data = await PropertyModel.find({ "userID": id })
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
        res.status(500).send({ "msg": "Internal Server Error: Something Went Wrong while Getting Listings", "error": error });
    }
});





// User Wishlist
userRoute.get("/wishlist", tokenVerify, async (req, res) => {
    const id = xss(req.headers.id);
    let roles = ["customer", "agent", "employee", "admin", "super_admin"];

    try {
        const role = res.getHeader("role");
        if (!roles.includes(role)) {
            res.status(400).send({ "msg": "Bad Request: Role Access Denied" });
            return;
        }
        res.removeHeader("role");

        const propertyIds = await UserModel.findById(id, { "wishlist": 1, "_id": 0 });


        // Use the $in operator to fetch all properties by their IDs
        const userWishlist = await PropertyModel.find({ "_id": { $in: propertyIds.wishlist } });

        res.status(200).send(userWishlist);
    } catch (error) {
        res.status(500).send({ "msg": "Internal Server Error: Error while Getting your Wishlist", "error": error });
    }
});




// Add Property In Wishlist
userRoute.patch("/wishlist/:propertyID", tokenVerify, async (req, res) => {
    const id = xss(req.headers.id);
    const propertyID = xss(req.params.propertyID);
    let roles = ["customer", "agent", "employee", "admin", "super_admin"];

    try {
        const role = res.getHeader("role");
        if (!roles.includes(role)) {
            res.status(400).send({ "msg": "Bad Request: Role Access Denied" });
            return;
        }
        res.removeHeader("role");

        // Find the user by their ID
        const user = await UserModel.findById(id);

        if (!user) {
            res.status(404).send({ "msg": 'User not found' });
            return;
        }

        // Check if the item is already in the wishlist
        const itemExists = user.wishlist.includes(propertyID);

        if (itemExists) {
            return res.status(400).send({ "msg": 'Item already in wishlist' });
        }

        // Add the item to the wishlist

        user.wishlist.push(propertyID);
        await user.save();

        res.status(200).send({ "msg": 'Item added to wishlist' });

    } catch (error) {
        res.status(500).send({ "msg": "Internal Server Error: Error while Adding to Wishlist", "error": error });
    }
})




// Delete Property From Wishlist
userRoute.delete("/wishlist/:propertyID", tokenVerify, async (req, res) => {
    const id = xss(req.headers.id);
    const propertyID = xss(req.params.propertyID);
    let roles = ["customer", "agent", "employee", "admin", "super_admin"];

    try {
        const role = res.getHeader("role");
        if (!roles.includes(role)) {
            res.status(400).send({ "msg": "Bad Request: Role Access Denied" });
            return;
        }
        res.removeHeader("role");

        // Find the user by their ID
        const user = await UserModel.findById(id);

        if (!user) {
            res.status(404).send({ "msg": 'User not found' });
            return;
        }

        // Check if the item exists in the wishlist
        const itemIndex = user.wishlist.indexOf(propertyID);

        if (itemIndex === -1) {
            return res.status(400).send({ "msg": 'Item not found in wishlist' });
        }

        // Remove the item from the wishlist
        user.wishlist.splice(itemIndex, 1);
        await user.save();

        res.status(200).send({ "msg": 'Item removed from wishlist' });

    } catch (error) {
        res.status(500).send({ "msg": "Internal Server Error: Error while Removing from Wishlist", "error": error });
    }
});






// Exporting Route Module
module.exports = { userRoute };
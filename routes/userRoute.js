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
        res.status(500).send({ "msg": "Server Error While Getting User Data", "error": error });
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
        res.status(500).send({ "msg": "Server Error While Sending OTP", "error": error });
    }
});





// User Registration Route
userRoute.post("/register", userMobileDuplicateVerification, async (req, res) => {
    let { name, mobile, password } = req.body;

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

    try {

        let hashedPassword = bcrypt.hashSync(password, saltRounds);

        // Saving Data in Database
        let savingData = new UserModel({ name, mobile, "password": hashedPassword });
        await savingData.save();

        const token = jwt.sign({ "userID": savingData._id }, secretKey);

        // Sending Response
        res.status(201).send({ "msg": "Successfully Registered", token, name, "id": savingData._id });

    } catch (error) {
        res.status(500).send({ "msg": "Internal Server Error while Registration", "error": error });
    }
});





// User Login Route
userRoute.post("/login", async (req, res) => {
    let { mobile, password } = req.body;
    
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
            return res.status(400).send({ "msg": "Not Found: Wrong Credentials" });
        }
        
        let isPasswordMatching = bcrypt.compareSync(password, finding.password);
        
        if (!isPasswordMatching) {
            return res.status(400).send({ "msg": "Not Found: Wrong Credentials" });
        }
        
        const token = jwt.sign({ "userID": finding._id }, secretKey);
        
        finding.lastLogin = indianTime();
        await finding.save();
        
        // Sending Response
        res.status(201).send({ "msg": "Login Successful", token, "name": finding.name, "id": finding._id, "avatar": finding.avatar || "", "avatarKey": finding.avatarKey || "" });
    } catch (error) {
        res.status(500).send({ "msg": "Internal Server Error while Login", "error": error });
    }
});





// Sending OTP to Email and Saving in DB
userRoute.post("/emailOTP", tokenVerify, async (req, res) => {
    try {
        const email = req.body.email;

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
userRoute.post("/emailVerify", tokenVerify, async (req, res) => {
    try {
        let { email, otp } = req.body;

        if (!email) {
            return res.status(400).send({ "msg": "Email Not Provided" });

        }

        if (!otp) {
            return res.status(400).send({ "msg": "OTP Not Provided" });

        }

        let findInDB = await EmailOTPModel.findOne({ "email": email });

        if (!findInDB) {
            return res.status(400).send({ "msg": "Invalid OTP" });

        }
        if (findInDB.otp != otp) {
            return res.status(400).send({ "msg": "Invalid OTP" });

        }
        await EmailOTPModel.findByIdAndDelete({ "_id": findInDB._id });

        let user = req.userDetail;
        user.email = email;
        user.lastUpdated = indianTime();
        await user.save();

        res.status(201).send({ "msg": "Email Updated" });
    } catch (error) {
        res.status(500).send({ "msg": "Internal Server Error While Verifying OTP", "error": error });
    }
})



// Update User Detail
userRoute.patch("/update", tokenVerify, async (req, res) => {
    try {

        let user = req.userDetail;

        let { name, mobile } = req.body;

        if (name) {
            if (!isValidName(name)) {
                return res.status(400).send({ "msg": "Name can't contain number or symbols" });
            } else {
                user.name = name;
            }
        }

        if (mobile) {
            if (mobile.length != 10) {
                return res.status(400).send({ "msg": "Wrong Mobile Number, Check length" });
            } else {
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
// const ITEMS_PER_PAGE = 10;



// User Properties
userRoute.get("/listings", tokenVerify, async (req, res) => {
    try {
        const id = req.headers.id;

        // const { page } = req.query;

        // const currentPage = parseInt(page) || 1;

        let data = await PropertyModel.find({ "userID": id });
        res.status(200).send({ data });

        // let totalCount = await PropertyModel.countDocuments({ "userID": id });

        // const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

        // const skipItems = (currentPage - 1) * ITEMS_PER_PAGE;
        // let data = await PropertyModel.find({ "userID": id })
        //     .skip(skipItems)
        //     .limit(ITEMS_PER_PAGE);


        // // // Adjust the data if it's the last page and there's not enough data for a full page
        // if (data.length === 0 && currentPage > 1) {
        //     const lastPageSkipItems = (totalPages - 1) * ITEMS_PER_PAGE;
        //     data = await PropertyModel.find({ "userID": id })
        //         .skip(lastPageSkipItems)
        //         .limit(totalCount % ITEMS_PER_PAGE);
        // }

        // res.status(200).send({
        //     data,
        //     currentPage: data.length === 0 ? totalPages : currentPage,
        //     totalPages,
        //     totalCount,
        // });

    } catch (error) {
        res.status(500).send({ "msg": "Internal Server Error while Getting Listings", "error": error });
    }
});





// User Wishlist
userRoute.get("/wishlist", tokenVerify, async (req, res) => {
    try {
        const propertyIds = req.userDetail.wishlist;
        if (!propertyIds.length) {
            return res.status(400).send({ "msg": "Wishlist is Empty" });
        }

        // Using the $in operator to fetch all properties by their IDs
        const userWishlist = await PropertyModel.find({ "_id": { $in: propertyIds } });

        res.status(200).send(userWishlist);
    } catch (error) {
        res.status(500).send({ "msg": "Internal Server Error while Getting your Wishlist", "error": error });
    }
});



// User Wishlist
userRoute.get("/wishlistIDs", tokenVerify, async (req, res) => {
    try {
        const propertyIds = req.userDetail.wishlist;
        res.status(200).send(propertyIds);
    } catch (error) {
        res.status(500).send({ "msg": "Internal Server Error while Getting your Wishlist", "error": error });
    }
});




// Add Property In Wishlist
userRoute.patch("/wishlist/:propertyID", tokenVerify, async (req, res) => {
    const propertyID = req.params.propertyID;

    try {
        let user = req.userDetail;

        // Checking if the item is already in the wishlist
        const itemExists = user.wishlist.includes(propertyID);

        if (itemExists) {
            return res.status(400).send({ "msg": 'Item already in wishlist' });
        }

        user.wishlist.push(propertyID);
        await user.save();

        res.status(200).send({ "msg": 'Item added to wishlist', "wishlistIDs": user.wishlist });
    } catch (error) {
        res.status(500).send({ "msg": "Internal Server Error while Adding to Wishlist", "error": error });
    }
})




// Delete Property From Wishlist
userRoute.delete("/wishlist/:propertyID", tokenVerify, async (req, res) => {
    const propertyID = xss(req.params.propertyID);

    try {
        let user = req.userDetail;

        // Checking if the item exists in the wishlist
        const itemIndex = user.wishlist.indexOf(propertyID);

        if (itemIndex === -1) {
            return res.status(400).send({ "msg": 'Item not found in wishlist' });
        }

        user.wishlist.splice(itemIndex, 1);
        await user.save();

        // Using the $in operator to fetch all properties by their IDs
        const userWishlist = await PropertyModel.find({ "_id": { $in: user.wishlist } });

        res.status(200).send({ "msg": 'Item removed from wishlist', "wishlistIDs": userWishlist });

    } catch (error) {
        res.status(500).send({ "msg": "Internal Server Error: Error while Removing from Wishlist", "error": error });
    }
});






// Exporting Route Module
module.exports = { userRoute };
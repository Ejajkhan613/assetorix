// Dependencies
const express = require("express");
const xss = require('xss');



// Custom Modules
const { UserModel } = require("../models/userModel");
const { LeadFormModel } = require("../models/leadForm");
const { tokenVerify } = require("../middlewares/token");


// Creating Route Variable
const leadFormRoute = express.Router();



// JSON Parsing
leadFormRoute.use(express.json());


// Get Admin Details
leadFormRoute.get("/", tokenVerify, async (req, res) => {
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


leadFormRoute.post("/", tokenVerify, async (req, res) => {
    let payload = req.body;
    try {
        let data = {};

        if (!payload.userID) {
            return res.status(400).send({ "msg": "UserID is Missing" });
        }
        data.userID = xss(payload.userID);


        if (!payload.name) {
            return res.status(400).send({ "msg": "Name is Missing" });
        }
        data.name = xss(payload.name);


        if (!payload.mobile) {
            return res.status(400).send({ "msg": "Mobile is Missing" });
        }
        data.mobile = xss(payload.mobile);


        if (!payload.email) {
            return res.status(400).send({ "msg": "Email is Missing" });
        }
        data.email = xss(payload.email);


        if (!payload.formType) {
            return res.status(400).send({ "msg": "Form Type is Missing" });
        }
        let validFormType = ["Buy", "Rent", "Sell"];
        if (!validFormType.includes(payload.formType)) {
            return res.status(400).send({ "msg": `Form Type is Wrong - ${payload.formType}` })
        }
        data.formType = xss(payload.formType);


        if (payload.formType == "Rent" || payload.formType == "Sell") {
            if (!payload.propertyType) {
                return res.status(400).send({ "msg": "Property Type is Missing" });
            }

            let validPropertyType = ["Residential", "Commercial"];
            if (!validPropertyType.includes(payload.propertyType)) {
                return res.status(400).send({ "msg": `Form Type is Wrong - ${payload.propertyType}` })
            }
            data.propertyType = xss(payload.propertyType);
        } else {
            data.propertyType = "None";
        }


        if (!payload.description) {
            return res.status(400).send({ "msg": "Description is Missing" });
        }
        data.description = xss(payload.description);


        let findingUser = await UserModel.findById(payload.userID);

        if (!findingUser._id) {
            return res.status(400).send({ "msg": "User Details not Found" });
        }

        let newForm = new LeadFormModel(data);
        await newForm.save();

        res.status(201).send({ "msg": "Form Submitted Successfully" });
    } catch (error) {
        res.status(500).send({ "msg": "Server Error While Saving Form Data", "error": error });
    }
})





// exporting module
module.exports = { leadFormRoute };
// Dependencies
const express = require("express");
const xss = require("xss");


// Custom Modules
const { tokenVerify } = require("../middlewares/token");
const { PincodeModel } = require("../models/pincodeModel");



// Creating Route Variable
const pincodeRoute = express.Router();



// JSON Parsing
pincodeRoute.use(express.json());



// to get pincode details
pincodeRoute.get("/", async (req, res) => {
    let { pincode, locality, city, state, country } = req.query;

    let filterData = {};

    if (pincode) {
        filterData.pincode = xss(pincode);
    }

    if (locality) {
        filterData.locality = { $regex: xss(locality), $options: 'i' };
    }

    if (city) {
        filterData.city = { $regex: xss(city), $options: 'i' };
    }

    if (state) {
        filterData.state = { $regex: xss(state), $options: 'i' };
    }

    if (country) {
        filterData.country = { $regex: xss(country), $options: 'i' };
    }

    try {
        const data = await PincodeModel.find(filterData).limit(100);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send("An error occurred.");
    }
});



// pincodeRoute.post("/", tokenVerify, async (req, res) => {
//     let data = req.body;
//     try {
//         let adding = new PincodeModel.insertMany(data);
//         await adding.save();
//         res.send("saved");
//     } catch (error) {
//         res.send({ "Error": error });
//     }
// });



// pincodeRoute.patch("/", tokenVerify, async (req, res) => {
//     try {
//         const result = await PincodeModel.updateMany({}, { $rename: { "district": "city" } });
//         res.status(200).send({ "msg": "Done", "result": result });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ "error": "An error occurred while processing the request." });
//     }
// });


// pincodeRoute.patch("/", tokenVerify, async (req, res) => {
//     try {
//         const result = await PincodeModel.updateMany({}, { $rename: { "city": "locality" } });
//         res.status(200).send({ "msg": "Done", "result": result });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ "error": "An error occurred while processing the request." });
//     }
// });



// Exporting Route Module
module.exports = { pincodeRoute };

// Dependencies
const express = require("express");
const xss = require("xss");



// Custom Modules
const { PropertyModel } = require("../models/propertyModel");
const { tokenVerify } = require("../middlewares/token");



// Creating Route Variable
const propertyRoute = express.Router();



// JSON Parsing
propertyRoute.use(express.json());


// all Property
propertyRoute.get("/", async (req, res) => {
    try {
        const { locality, city, state, country, looking_for } = req.query;

        let addressFilters = {};

        if (locality) {
            addressFilters["address.locality"] = { $regex: new RegExp(locality, "i") };
        }

        if (city) {
            addressFilters["address.city"] = { $regex: new RegExp(city, "i") };
        }

        if (state) {
            addressFilters["address.state"] = { $regex: new RegExp(state, "i") };
        }

        if (country) {
            addressFilters["address.country"] = { $regex: new RegExp(country, "i") };
        }

        if (looking_for) {
            addressFilters.looking_for = { $regex: new RegExp(looking_for, "i") };
        }

        let data = await PropertyModel.find(addressFilters);

        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ "msg": "Server Error While getting Properties" });
    }
});





// Post Property
propertyRoute.post("/", tokenVerify, async (req, res) => {
    let obj = req.body;
    obj.userID = req.headers.id;
    try {
        let newData = new PropertyModel(obj);
        await newData.save();
        res.status(201).send({ "msg": "Property Posted Successfully" });
    } catch (error) {
        res.status(500).send({ "msg": "Server Error While Posting Property" });
    }
});



// Update Property
propertyRoute.patch("/:id", tokenVerify, async (req, res) => {
    const userID = req.headers.id;
    const propertyID = req.params.id;

    try {
        const property = await PropertyModel.findById(propertyID);

        if (!property) {
            return res.status(404).send({ "msg": "Property Not Found" });
        }

        if (property.userID !== userID) {
            return res.status(400).send({ "msg": "Not Your Property" });
        }

        const updateData = {
            ...req.body,
            userID: property.userID, // Ensuring the userID remains unchanged
        };

        const updatedProperty = await PropertyModel.findByIdAndUpdate(propertyID, updateData);

        if (updatedProperty) {
            res.status(201).send({ "msg": "Property Updated Successfully" });
        } else {
            res.status(400).send({ "msg": "Failed to Update Property" });
        }
    } catch (error) {
        res.status(500).send({ "msg": "Server Error While Editing Property" });
    }
});



// Delete Property
propertyRoute.delete("/:id", tokenVerify, async (req, res) => {
    const userID = req.headers.id;
    const propertyID = req.params.id;

    try {
        const property = await PropertyModel.findById(propertyID);

        if (!property) {
            return res.status(404).send({ "msg": "Property Not Found" });
        }

        if (property.userID !== userID) {
            return res.status(400).send({ "msg": "Not Your Property" });
        }

        const deletedProperty = await PropertyModel.findByIdAndDelete(propertyID);

        if (deletedProperty) {
            res.status(201).send({ "msg": "Property Deleted Successfully" });
        } else {
            res.status(400).send({ "msg": "Failed to Delete Property" });
        }
    } catch (error) {
        res.status(500).send({ "msg": "Server Error While Deleting Property" });
    }
});



// Exporting Module
module.exports = { propertyRoute };
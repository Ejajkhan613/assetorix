// Dependencies
const express = require("express");
const xss = require("xss");



// Custom Modules
const { PropertyModel } = require("../models/propertyModel");
const { tokenVerify } = require("../middlewares/token");
const { flat_apartment } = require("../propertyValidation/flat_apartment");


// Creating Route Variable
const propertyRoute = express.Router();



// JSON Parsing
propertyRoute.use(express.json());



// Items Per Page
const ITEMS_PER_PAGE = 10;



// get Property Details
propertyRoute.get("/", async (req, res) => {
    try {
        const { locality, pincode, city, state, country, page } = req.query;

        const currentPage = parseInt(page) || 1;

        const sanitizedLocality = xss(locality);
        const sanitizedCity = xss(city);
        const sanitizedState = xss(state);
        const sanitizedCountry = xss(country);

        let addressFilters = {};

        if (sanitizedLocality) {
            addressFilters["address.locality"] = { $regex: new RegExp(sanitizedLocality, "i") };
        }

        if (pincode) {
            addressFilters["address.pincode"] = xss(pincode);
        }

        if (sanitizedCity) {
            addressFilters["address.city"] = { $regex: new RegExp(sanitizedCity, "i") };
        }

        if (sanitizedState) {
            addressFilters["address.state"] = { $regex: new RegExp(sanitizedState, "i") };
        }

        if (sanitizedCountry) {
            addressFilters["address.country"] = { $regex: new RegExp(sanitizedCountry, "i") };
        }

        console.log(addressFilters)

        const totalCount = await PropertyModel.countDocuments(addressFilters);
        const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

        const skipItems = (currentPage - 1) * ITEMS_PER_PAGE;
        let data = await PropertyModel.find(addressFilters)
            .skip(skipItems)
            .limit(ITEMS_PER_PAGE);

        // Adjust the data if it's the last page and there's not enough data for a full page
        if (data.length === 0 && currentPage > 1) {
            const lastPageSkipItems = (totalPages - 1) * ITEMS_PER_PAGE;
            data = await PropertyModel.find(addressFilters)
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
        res.status(500).send({ "msg": "Server Error While getting Properties" });
    }
});





// Post Property
propertyRoute.post("/", tokenVerify, async (req, res) => {
    try {
        let data = req.body;

        if (data.propertyType == "Flat / Apartment") {
            let obj = flat_apartment(data);
            if (obj.msg == "SUCCESS") {
                obj.data.userID = xss(req.headers.id);
                let newData = new PropertyModel(obj.data);
                await newData.save();
                res.status(201).send({ "msg": "Property Posted Successfully" });
            } else {
                res.status(401).send({ "msg": obj.error });
            }
            // let newData = new PropertyModel(data);
            // await newData.save();
            // res.status(201).send({ "msg": "Property Posted Successfully", obj });
        } else {
            res.status(201).send({ "msg": "Different Property Type", "data": data });
        }
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
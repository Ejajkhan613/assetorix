// Dependencies
const express = require("express");
const xss = require("xss");



// Custom Modules
const { PropertyModel } = require("../models/propertyModel");
const { UserModel } = require("../models/userModel");
const { tokenVerify } = require("../middlewares/token");
const { spreader } = require("../propertyValidation/spreader");
const { indianTime } = require("../services/indianTime");
const { propertyPosted } = require("../mail/propertyPosting");
const { propertyDeletion } = require("../mail/propertyDelete");

// Creating Route Variable
const propertyRoute = express.Router();



// JSON Parsing
propertyRoute.use(express.json());



// Items Per Page
const ITEMS_PER_PAGE = 10;


propertyRoute.get("/single/:id", async (req, res) => {
    try {
        let id = xss(req.params.id);
        let property = await PropertyModel.findById(id);
        if (property) {
            res.send({ "msg": "Successful", "data": property });
        } else {
            res.status(404).send({ "msg": "Property Not Found" })
        }
    } catch (error) {
        res.status(500).send({ "msg": "Error", "error": error })
    }
})



// get Property Details
propertyRoute.get("/", async (req, res) => {
    try {
        let { minPrice, maxPrice, furnished, propertyType, propertyGroup, bedroom, locality, pincode, city, state, country, page } = req.query;

        const currentPage = parseInt(page) || 1;

        bedroom = xss(bedroom);
        furnished = xss(furnished);
        propertyType = xss(propertyType);
        propertyGroup = xss(propertyGroup);

        locality = xss(locality);
        pincode = xss(pincode);
        city = xss(city);
        state = xss(state);
        country = xss(country);

        minPrice = xss(minPrice);
        maxPrice = xss(maxPrice);


        let filter = { $or: [] };
        let checker = {};

        if (bedroom) {
            filter.$or.push({ "roomDetails.bedroom": bedroom });
            checker.bedroom = bedroom;
        }

        if (furnished) {
            filter.$or.push({ "furnished": furnished });
            checker.furnished = furnished;
        }

        if (propertyType) {
            filter.$or.push({ "propertyType": propertyType });
            checker.propertyType = propertyType;
        }

        if (propertyGroup) {
            filter.$or.push({ "propertyGroup": propertyGroup });
            checker.propertyGroup = propertyGroup;
        }

        if (locality) {
            filter.$or.push({ "address.locality": { $regex: new RegExp(locality, "i") } });
            checker.locality = locality;
        }

        if (pincode) {
            filter.$or.push({ "address.pincode": pincode });
            checker.pincode = pincode;
        }

        if (city) {
            filter.$or.push({ "address.city": { $regex: new RegExp(city, "i") } });
            checker.city = city;
        }

        if (state) {
            filter.$or.push({ "address.state": { $regex: new RegExp(state, "i") } });
            checker.state = state;
        }

        if (country) {
            filter.$or.push({ "address.country": { $regex: new RegExp(country, "i") } });
            checker.country = country;
        }

        if (minPrice || maxPrice) {
            filter.$or.push({
                price: {}
            });
            if (minPrice) {
                filter.$or[filter.$or.length - 1].price.$gte = parseFloat(minPrice);
                checker.minPrice = minPrice;
            }
            if (maxPrice) {
                filter.$or[filter.$or.length - 1].price.$lte = parseFloat(maxPrice);
                checker.maxPrice = maxPrice;
            }
        }

        let totalCount;
        if (Object.keys(checker).length) {
            totalCount = await PropertyModel.countDocuments(filter);
        } else {
            totalCount = await PropertyModel.countDocuments();
        }



        if (!totalCount) {
            return res.status(200).send({
                data: [],
                currentPage,
                totalPages: 0,
                totalCount: 0
            });
        }

        const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

        const skipItems = (currentPage - 1) * ITEMS_PER_PAGE;
        let data;
        if (Object.keys(checker).length) {
            data = await PropertyModel.find(filter)
                .skip(skipItems)
                .limit(ITEMS_PER_PAGE);
        } else {
            data = await PropertyModel.find()
                .skip(skipItems)
                .limit(ITEMS_PER_PAGE);
        }


        // Adjust the data if it's the last page and there's not enough data for a full page
        if (data.length === 0 && currentPage > 1) {
            const lastPageSkipItems = (totalPages - 1) * ITEMS_PER_PAGE;
            if (Object.keys(checker).length) {
                data = await PropertyModel.find(filter)
                    .skip(lastPageSkipItems)
                    .limit(totalCount % ITEMS_PER_PAGE);
            } else {
                data = await PropertyModel.find()
                    .skip(lastPageSkipItems)
                    .limit(totalCount % ITEMS_PER_PAGE);
            }

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
    let payload = req.body;
    try {
        let obj = spreader(payload);

        if (obj.msg == "SUCCESS") {
            obj.data.userID = xss(req.headers.id);
            let newProperty = new PropertyModel(obj.data);
            await newProperty.save();

            // let user = await UserModel.findById(xss(req.headers.id));

            // let emailResponse = await propertyPosted(newProperty, user);
            let emailResponse = "Closed";

            res.status(201).send({ "msg": `${payload.propertyType} Posted Successfully`, "emailStatus": emailResponse });
        } else {
            res.status(401).send({ "msg": obj.error });
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

        if (property.userID != userID) {
            return res.status(400).send({ "msg": "Not Your Property" });
        }

        let obj = spreader(req.body);

        if (obj.msg == "SUCCESS") {
            obj.data.userID = xss(req.headers.id);
            obj.data.lastUpdated = indianTime();

            const updatedProperty = await PropertyModel.findByIdAndUpdate(propertyID, obj.data);

            if (updatedProperty) {
                res.status(201).send({ "msg": `${obj.data.propertyType} Updated Successfully` });
            } else {
                res.status(400).send({ "msg": "Failed to Update Property" });
            }
        } else {
            res.status(401).send({ "msg": obj.error });
        }
    } catch (error) {
        res.status(500).send({ "msg": "Server Error While Updating Property" });
    }
});



// Delete Property
propertyRoute.delete("/:id", tokenVerify, async (req, res) => {
    const userID = req.headers.id;
    const propertyID = req.params.id;

    try {
        const property = await PropertyModel.findById(propertyID);

        if (!property) {
            return res.status(404).send({ "msg": "Property Not Found or Already Deleted" });
        }

        if (property.userID !== userID) {
            return res.status(400).send({ "msg": "Not Your Property" });
        }

        // let user = await UserModel.findById(xss(req.headers.id));

        // let emailResponse = await propertyPosted(newProperty, user);
        let emailResponse = "Closed";

        const deletedProperty = await PropertyModel.findByIdAndDelete(propertyID);

        if (deletedProperty) {
            res.status(201).send({ "msg": "Property Deleted Successfully", "emailStatus": emailResponse });
        } else {
            res.status(400).send({ "msg": "Property does not exist or failed to delete" });
        }
    } catch (error) {
        res.status(500).send({ "msg": "Server Error While Deleting Property" });
    }
});



// Exporting Module
module.exports = { propertyRoute };
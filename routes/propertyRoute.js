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
const { contactOwner } = require("../mail/contactOwner");
const uploadImage = require("../services/uploadImage");
const { convertToDataSize } = require("../services/datasize");

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
        let { minPrice, maxPrice, furnished, propertyType, lookingFor, propertyGroup, bedroom, locality, pincode, city, state, country, page } = req.query;

        const currentPage = parseInt(page) || 1;

        bedroom = parseInt(xss(bedroom));
        furnished = xss(furnished);
        propertyType = xss(propertyType);
        propertyGroup = xss(propertyGroup);

        locality = xss(locality);
        pincode = xss(pincode);
        city = xss(city);
        state = xss(state);
        country = xss(country);
        lookingFor = xss(lookingFor)

        minPrice = xss(minPrice);
        maxPrice = xss(maxPrice);

        // Decoding URL-encoded query parameters
        // minPrice = decodeURIComponent(minPrice);
        // maxPrice = decodeURIComponent(maxPrice);
        // furnished = decodeURIComponent(furnished);
        // propertyType = decodeURIComponent(propertyType);
        // lookingFor = decodeURIComponent(lookingFor);
        // propertyGroup = decodeURIComponent(propertyGroup);
        // bedroom = parseInt(decodeURIComponent(bedroom));
        // locality = decodeURIComponent(locality);
        // pincode = decodeURIComponent(pincode);
        // city = decodeURIComponent(city);
        // state = decodeURIComponent(state);
        // country = decodeURIComponent(country);


        let filter = { $or: [] };
        let checker = {};

        if (bedroom) {
            filter.$or.push({ 'roomDetails.bedroom': bedroom });
            checker.bedroom = bedroom;
        }

        if (furnished) {
            filter.$or.push({ "furnished": furnished });
            checker.furnished = furnished;
        }

        if (lookingFor) {
            filter.$or.push({ "lookingFor": lookingFor });
            checker.lookingFor = lookingFor;
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
        res.status(500).send({ "msg": "Server Error While getting Properties", "error": error });
    }
});


// // Search based on address
// propertyRoute.get("/search/", async (req, res) => {
//     try {
//         const { search, page } = req.query;
//         const currentPage = parseInt(page) || 1;

//         let filter = {};

//         if (search) {
//             const regexSearch = new RegExp(search, "i");
//             filter = {
//                 $or: [
//                     { "address.pincode": regexSearch },
//                     { "address.city": regexSearch },
//                     { "address.state": regexSearch },
//                     { "address.country": regexSearch },
//                     { "address.houseNumber": regexSearch },
//                     { "address.apartmentName": regexSearch },
//                     { "address.zoneType": regexSearch },
//                     { "address.locatedInside": regexSearch },
//                     { "address.type": regexSearch }
//                 ]
//             };
//         }

//         const options = {
//             skip: (currentPage - 1) * ITEMS_PER_PAGE,
//             limit: ITEMS_PER_PAGE,
//         };

//         const data = await PropertyModel.find(filter)
//             .skip(options.skip)
//             .limit(options.limit);

//         res.status(200).send(data);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ "msg": "Server Error While getting Properties" });
//     }
// });

// Search based on address
propertyRoute.get("/search/", async (req, res) => {
    try {
        const { search, page } = req.query;
        const currentPage = parseInt(page) || 1;

        let filter = {};

        if (search) {
            const regexSearch = new RegExp(search, "i");
            filter = {
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
            };
        }

        const totalCount = await PropertyModel.countDocuments(filter);
        const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

        const options = {
            skip: (currentPage - 1) * ITEMS_PER_PAGE,
            limit: ITEMS_PER_PAGE,
        };

        const data = await PropertyModel.find(filter)
            .skip(options.skip)
            .limit(options.limit);

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





// // Rent
// propertyRoute.get("/rent", async (req, res) => {
//     try {
//         let { bedroom, propertyType, furnished, minPrice, maxPrice, amenities, page } = req.query;
//         const currentPage = parseInt(page) || 1;

//         let filter = { "lookingFor": "Rent" };
//         if (propertyType || bedroom || furnished || minPrice || maxPrice || amenities) {
//             filter["$or"] = [];
//         }


//         if (propertyType) {
//             filter["$or"].push(
//                 Array.isArray(propertyType)
//                     ? { "propertyType": { $in: propertyType } }
//                     : { "propertyType": propertyType }
//             );
//         }

//         if (bedroom) {
//             filter["$or"].push(
//                 Array.isArray(bedroom)
//                     ? { "roomDetails.bedroom": { $in: bedroom.map(item => Number(item)) } }
//                     : { "roomDetails.bedroom": Number(bedroom) }
//             );
//         }


//         if (furnished) {
//             filter["$or"].push(
//                 Array.isArray(furnished)
//                     ? { "furnished": { $in: furnished } }
//                     : { "furnished": furnished }
//             );
//         }

//         if (minPrice) {
//             filter["$or"].push(
//                 { "price": { "$gte": parseFloat(minPrice) } }
//             );
//         }

//         if (maxPrice) {
//             filter["$or"].push(
//                 { "price": { "$lte": parseFloat(maxPrice) } }
//             );
//         }

//         if (amenities) {
//             filter["$or"].push(
//                 Array.isArray(amenities)
//                     ? { "amenities": { $in: amenities } }
//                     : { "amenities": amenities }
//             );
//         }
//         console.log(filter)



//         const options = {
//             skip: (currentPage - 1) * ITEMS_PER_PAGE,
//             limit: ITEMS_PER_PAGE, // Define ITEMS_PER_PAGE as the number of items to return per page
//         };

//         const data = await PropertyModel.find(filter, null, options);

//         if (!data.length) {
//             const relatedData = await PropertyModel.find({ "lookingFor": "Rent" }, null, options);
//             res.status(200).send({ "msg": "Exact Match Not Found", "data": relatedData });
//         }

//         res.status(200).send(data);
//     } catch (error) {
//         res.status(500).send({ "msg": "Server Error While getting Properties" });
//     }
// });

// Rent
propertyRoute.get("/rent", async (req, res) => {
    try {
        let { bedroom, propertyType, furnished, minPrice, maxPrice, amenities, page } = req.query;
        const currentPage = parseInt(page) || 1;

        let filter = { "lookingFor": "Rent" };
        if (propertyType || bedroom || furnished || minPrice || maxPrice || amenities) {
            filter["$or"] = [];
        }

        if (propertyType) {
            filter["$or"].push(
                Array.isArray(propertyType)
                    ? { "propertyType": { $in: propertyType } }
                    : { "propertyType": propertyType }
            );
        }

        if (bedroom) {
            filter["$or"].push(
                Array.isArray(bedroom)
                    ? { "roomDetails.bedroom": { $in: bedroom.map(item => Number(item)) } }
                    : { "roomDetails.bedroom": Number(bedroom) }
            );
        }

        if (furnished) {
            filter["$or"].push(
                Array.isArray(furnished)
                    ? { "furnished": { $in: furnished } }
                    : { "furnished": furnished }
            );
        }

        if (minPrice) {
            filter["$or"].push(
                { "price": { "$gte": parseFloat(minPrice) } }
            );
        }

        if (maxPrice) {
            filter["$or"].push(
                { "price": { "$lte": parseFloat(maxPrice) } }
            );
        }

        if (amenities) {
            filter["$or"].push(
                Array.isArray(amenities)
                    ? { "amenities": { $in: amenities } }
                    : { "amenities": amenities }
            );
        }

        const totalCount = await PropertyModel.countDocuments(filter);
        const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
        const options = {
            sort: { "price": 1 },
            skip: (currentPage - 1) * ITEMS_PER_PAGE,
            limit: ITEMS_PER_PAGE,
        };

        if (!totalCount) {
            const relatedData = await PropertyModel.find({ "lookingFor": "Rent" }, null, options);
            return res.status(200).send({ "msg": "Exact Match Not Found", "data": relatedData, currentPage, totalPages, totalCount });
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



// // Sell
// propertyRoute.get("/buy", async (req, res) => {
//     try {
//         let filter = { "lookingFor": "Sell" };
//         let { bedroom, propertyType, constructionStatus, furnished, minPrice, maxPrice, amenities, page } = req.query;
//         const currentPage = parseInt(page) || 1;

//         if (propertyType || bedroom || furnished || constructionStatus || minPrice || maxPrice || amenities) {
//             filter["$or"] = [];
//         }

//         if (constructionStatus) {
//             filter["$or"].push(
//                 Array.isArray(constructionStatus)
//                     ? { "availabilityStatus": { $in: constructionStatus.map(item => item) } }
//                     : { "availabilityStatus": constructionStatus }
//             );
//         }

//         if (propertyType) {
//             filter["$or"].push(
//                 Array.isArray(propertyType)
//                     ? { "propertyType": { $in: propertyType } }
//                     : { "propertyType": propertyType }
//             );
//         }

//         if (bedroom) {
//             filter["$or"].push(
//                 Array.isArray(bedroom)
//                     ? { "roomDetails.bedroom": { $in: bedroom.map(item => Number(item)) } }
//                     : { "roomDetails.bedroom": Number(bedroom) }
//             );
//         }

//         if (furnished) {
//             filter["$or"].push(
//                 Array.isArray(furnished)
//                     ? { "furnished": { $in: furnished } }
//                     : { "furnished": furnished }
//             );
//         }

//         if (minPrice) {
//             filter["$or"].push(
//                 { "price": { "$gte": parseFloat(minPrice) } }
//             );
//         }

//         if (maxPrice) {
//             filter["$or"].push(
//                 { "price": { "$lte": parseFloat(maxPrice) } }
//             );
//         }

//         if (amenities) {
//             filter["$or"].push(
//                 Array.isArray(amenities)
//                     ? { "amenities": { $in: amenities } }
//                     : { "amenities": amenities }
//             );
//         }



//         const options = {
//             skip: (currentPage - 1) * ITEMS_PER_PAGE,
//             limit: ITEMS_PER_PAGE, // Define ITEMS_PER_PAGE as the number of items to return per page
//         };

//         const data = await PropertyModel.find(filter, null, options);

//         if (!data.length) {
//             const relatedData = await PropertyModel.find({ "lookingFor": "Sell" }, null, options);
//             res.status(200).send({ "msg": "Exact Match Not Found", "data": relatedData });
//         }

//         res.status(200).send(data);
//     } catch (error) {
//         res.status(500).send({ "msg": "Server Error While getting Properties" });
//     }
// });

// Sell
propertyRoute.get("/buy", async (req, res) => {
    try {
        let filter = { "lookingFor": "Sell" };
        let { bedroom, propertyType, constructionStatus, furnished, minPrice, maxPrice, amenities, page } = req.query;
        const currentPage = parseInt(page) || 1;

        if (propertyType || bedroom || furnished || constructionStatus || minPrice || maxPrice || amenities) {
            filter["$or"] = [];
        }

        if (constructionStatus) {
            filter["$or"].push(
                Array.isArray(constructionStatus)
                    ? { "availabilityStatus": { $in: constructionStatus.map(item => item) } }
                    : { "availabilityStatus": constructionStatus }
            );
        }

        if (propertyType) {
            filter["$or"].push(
                Array.isArray(propertyType)
                    ? { "propertyType": { $in: propertyType } }
                    : { "propertyType": propertyType }
            );
        }

        if (bedroom) {
            filter["$or"].push(
                Array.isArray(bedroom)
                    ? { "roomDetails.bedroom": { $in: bedroom.map(item => Number(item)) } }
                    : { "roomDetails.bedroom": Number(bedroom) }
            );
        }

        if (furnished) {
            filter["$or"].push(
                Array.isArray(furnished)
                    ? { "furnished": { $in: furnished } }
                    : { "furnished": furnished }
            );
        }

        if (minPrice) {
            filter["$or"].push(
                { "price": { "$gte": parseFloat(minPrice) } }
            );
        }

        if (maxPrice) {
            filter["$or"].push(
                { "price": { "$lte": parseFloat(maxPrice) } }
            );
        }

        if (amenities) {
            filter["$or"].push(
                Array.isArray(amenities)
                    ? { "amenities": { $in: amenities } }
                    : { "amenities": amenities }
            );
        }

        const totalCount = await PropertyModel.countDocuments(filter);
        const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

        const options = {
            sort: {},
            skip: (currentPage - 1) * ITEMS_PER_PAGE,
            limit: ITEMS_PER_PAGE,
        };

        if (!totalCount) {
            const relatedData = await PropertyModel.find({ "lookingFor": "Sell" }, null, options);
            return res.status(200).send({ "msg": "Exact Match Not Found", "data": relatedData, currentPage, totalPages, totalCount });
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



// // Rent Residential
// propertyRoute.get("/rent/residential", async (req, res) => {
//     try {
//         let { bedroom, propertyType, furnished, minPrice, maxPrice, amenities, page } = req.query;
//         const currentPage = parseInt(page) || 1;
//         let filter = { $and: [{ "lookingFor": "Rent" }, { "propertyGroup": "Residential" }] };

//         if (propertyType || bedroom || furnished || minPrice || maxPrice || amenities) {
//             filter["$or"] = [];
//         }

//         if (propertyType) {
//             filter["$or"].push(
//                 Array.isArray(propertyType)
//                     ? { "propertyType": { $in: propertyType } }
//                     : { "propertyType": propertyType }
//             );
//         }

//         if (bedroom) {
//             filter["$or"].push(
//                 Array.isArray(bedroom)
//                     ? { "roomDetails.bedroom": { $in: bedroom.map(item => Number(item)) } }
//                     : { "roomDetails.bedroom": Number(bedroom) }
//             );
//         }

//         if (furnished) {
//             filter["$or"].push(
//                 Array.isArray(furnished)
//                     ? { "furnished": { $in: furnished } }
//                     : { "furnished": furnished }
//             );
//         }

//         if (minPrice) {
//             filter["$or"].push(
//                 { "price": { "$gte": parseFloat(minPrice) } }
//             );
//         }

//         if (maxPrice) {
//             filter["$or"].push(
//                 { "price": { "$lte": parseFloat(maxPrice) } }
//             );
//         }

//         if (amenities) {
//             filter["$or"].push(
//                 Array.isArray(amenities)
//                     ? { "amenities": { $in: amenities } }
//                     : { "amenities": amenities }
//             );
//         }



//         const options = {
//             skip: (currentPage - 1) * ITEMS_PER_PAGE,
//             limit: ITEMS_PER_PAGE, // Define ITEMS_PER_PAGE as the number of items to return per page
//         };

//         const data = await PropertyModel.find(filter, null, options);

//         if (!data.length) {
//             const relatedData = await PropertyModel.find({ $and: [{ "lookingFor": "Rent" }, { "propertyGroup": "Residential" }] }, null, options);
//             res.status(200).send({ "msg": "Exact Match Not Found", "data": relatedData });
//         }

//         res.status(200).send(data);
//     } catch (error) {
//         res.status(500).send({ "msg": "Server Error While getting Properties" });
//     }
// });

// Rent Residential
propertyRoute.get("/rent/residential", async (req, res) => {
    try {
        let { bedroom, propertyType, furnished, minPrice, maxPrice, amenities, page } = req.query;
        const currentPage = parseInt(page) || 1;
        let filter = { $and: [{ "lookingFor": "Rent" }, { "propertyGroup": "Residential" }] };

        if (propertyType || bedroom || furnished || minPrice || maxPrice || amenities) {
            filter["$or"] = [];
        }

        if (propertyType) {
            filter["$or"].push(
                Array.isArray(propertyType)
                    ? { "propertyType": { $in: propertyType } }
                    : { "propertyType": propertyType }
            );
        }

        if (bedroom) {
            filter["$or"].push(
                Array.isArray(bedroom)
                    ? { "roomDetails.bedroom": { $in: bedroom.map(item => Number(item)) } }
                    : { "roomDetails.bedroom": Number(bedroom) }
            );
        }

        if (furnished) {
            filter["$or"].push(
                Array.isArray(furnished)
                    ? { "furnished": { $in: furnished } }
                    : { "furnished": furnished }
            );
        }

        if (minPrice) {
            filter["$or"].push(
                { "price": { "$gte": parseFloat(minPrice) } }
            );
        }

        if (maxPrice) {
            filter["$or"].push(
                { "price": { "$lte": parseFloat(maxPrice) } }
            );
        }

        if (amenities) {
            filter["$or"].push(
                Array.isArray(amenities)
                    ? { "amenities": { $in: amenities } }
                    : { "amenities": amenities }
            );
        }

        const totalCount = await PropertyModel.countDocuments(filter);
        const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
        const options = {
            skip: (currentPage - 1) * ITEMS_PER_PAGE,
            limit: ITEMS_PER_PAGE,
        };

        if (!totalCount) {
            const relatedData = await PropertyModel.find({ $and: [{ "lookingFor": "Rent" }, { "propertyGroup": "Residential" }] }, null, options);
            return res.status(200).send({ "msg": "Exact Match Not Found", "data": relatedData, currentPage, totalPages, totalCount });
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



// // Rent Commercial
// propertyRoute.get("/rent/commercial", async (req, res) => {
//     try {
//         let { bedroom, propertyType, furnished, minPrice, maxPrice, amenities, page } = req.query;
//         const currentPage = parseInt(page) || 1;

//         let filter = { $and: [{ "lookingFor": "Rent" }, { "propertyGroup": "Commercial" }] };
//         if (propertyType || bedroom || furnished || minPrice || maxPrice || amenities) {
//             filter["$or"] = [];
//         }

//         if (propertyType) {
//             filter["$or"].push(
//                 Array.isArray(propertyType)
//                     ? { "propertyType": { $in: propertyType } }
//                     : { "propertyType": propertyType }
//             );
//         }

//         if (bedroom) {
//             filter["$or"].push(
//                 Array.isArray(bedroom)
//                     ? { "roomDetails.bedroom": { $in: bedroom.map(item => Number(item)) } }
//                     : { "roomDetails.bedroom": Number(bedroom) }
//             );
//         }

//         if (furnished) {
//             filter["$or"].push(
//                 Array.isArray(furnished)
//                     ? { "furnished": { $in: furnished } }
//                     : { "furnished": furnished }
//             );
//         }

//         if (minPrice) {
//             filter["$or"].push(
//                 { "price": { "$gte": parseFloat(minPrice) } }
//             );
//         }

//         if (maxPrice) {
//             filter["$or"].push(
//                 { "price": { "$lte": parseFloat(maxPrice) } }
//             );
//         }

//         if (amenities) {
//             filter["$or"].push(
//                 Array.isArray(amenities)
//                     ? { "amenities": { $in: amenities } }
//                     : { "amenities": amenities }
//             );
//         }



//         const options = {
//             skip: (currentPage - 1) * ITEMS_PER_PAGE,
//             limit: ITEMS_PER_PAGE, // Define ITEMS_PER_PAGE as the number of items to return per page
//         };

//         const data = await PropertyModel.find(filter, null, options);

//         if (!data.length) {
//             const relatedData = await PropertyModel.find({ $and: [{ "lookingFor": "Rent" }, { "propertyGroup": "Commercial" }] }, null, options);
//             res.status(200).send({ "msg": "Exact Match Not Found", "data": relatedData });
//         }

//         res.status(200).send(data);
//     } catch (error) {
//         res.status(500).send({ "msg": "Server Error While getting Properties" });
//     }
// });

// Rent Commercial
propertyRoute.get("/rent/commercial", async (req, res) => {
    try {
        let { bedroom, propertyType, furnished, minPrice, maxPrice, amenities, page } = req.query;
        const currentPage = parseInt(page) || 1;

        let filter = { $and: [{ "lookingFor": "Rent" }, { "propertyGroup": "Commercial" }] };
        if (propertyType || bedroom || furnished || minPrice || maxPrice || amenities) {
            filter["$or"] = [];
        }

        if (propertyType) {
            filter["$or"].push(
                Array.isArray(propertyType)
                    ? { "propertyType": { $in: propertyType } }
                    : { "propertyType": propertyType }
            );
        }

        if (bedroom) {
            filter["$or"].push(
                Array.isArray(bedroom)
                    ? { "roomDetails.bedroom": { $in: bedroom.map(item => Number(item)) } }
                    : { "roomDetails.bedroom": Number(bedroom) }
            );
        }

        if (furnished) {
            filter["$or"].push(
                Array.isArray(furnished)
                    ? { "furnished": { $in: furnished } }
                    : { "furnished": furnished }
            );
        }

        if (minPrice) {
            filter["$or"].push(
                { "price": { "$gte": parseFloat(minPrice) } }
            );
        }

        if (maxPrice) {
            filter["$or"].push(
                { "price": { "$lte": parseFloat(maxPrice) } }
            );
        }

        if (amenities) {
            filter["$or"].push(
                Array.isArray(amenities)
                    ? { "amenities": { $in: amenities } }
                    : { "amenities": amenities }
            );
        }

        const totalCount = await PropertyModel.countDocuments(filter);
        const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
        const options = {
            skip: (currentPage - 1) * ITEMS_PER_PAGE,
            limit: ITEMS_PER_PAGE,
        };

        if (!totalCount) {
            const relatedData = await PropertyModel.find({ $and: [{ "lookingFor": "Rent" }, { "propertyGroup": "Commercial" }] }, null, options);
            return res.status(200).send({ "msg": "Exact Match Not Found", "data": relatedData, currentPage, totalPages, totalCount });
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



// // Sell Residential
// propertyRoute.get("/buy/residential", async (req, res) => {
//     try {
//         let filter = { $and: [{ "lookingFor": "Sell" }, { "propertyGroup": "Residential" }] };
//         let { bedroom, propertyType, constructionStatus, furnished, minPrice, maxPrice, amenities, page } = req.query;
//         const currentPage = parseInt(page) || 1;

//         if (propertyType || bedroom || furnished || constructionStatus || minPrice || maxPrice || amenities) {
//             filter["$or"] = [];
//         }

//         if (constructionStatus) {
//             filter["$or"].push(
//                 Array.isArray(constructionStatus)
//                     ? { "availabilityStatus": { $in: constructionStatus.map(item => item) } }
//                     : { "availabilityStatus": constructionStatus }
//             );
//         }

//         if (propertyType) {
//             filter["$or"].push(
//                 Array.isArray(propertyType)
//                     ? { "propertyType": { $in: propertyType } }
//                     : { "propertyType": propertyType }
//             );
//         }

//         if (bedroom) {
//             filter["$or"].push(
//                 Array.isArray(bedroom)
//                     ? { "roomDetails.bedroom": { $in: bedroom.map(item => Number(item)) } }
//                     : { "roomDetails.bedroom": Number(bedroom) }
//             );
//         }

//         if (furnished) {
//             filter["$or"].push(
//                 Array.isArray(furnished)
//                     ? { "furnished": { $in: furnished } }
//                     : { "furnished": furnished }
//             );
//         }

//         if (minPrice) {
//             filter["$or"].push(
//                 { "price": { "$gte": parseFloat(minPrice) } }
//             );
//         }

//         if (maxPrice) {
//             filter["$or"].push(
//                 { "price": { "$lte": parseFloat(maxPrice) } }
//             );
//         }

//         if (amenities) {
//             filter["$or"].push(
//                 Array.isArray(amenities)
//                     ? { "amenities": { $in: amenities } }
//                     : { "amenities": amenities }
//             );
//         }



//         const options = {
//             skip: (currentPage - 1) * ITEMS_PER_PAGE,
//             limit: ITEMS_PER_PAGE, // Define ITEMS_PER_PAGE as the number of items to return per page
//         };

//         const data = await PropertyModel.find(filter, null, options);

//         if (!data.length) {
//             const relatedData = await PropertyModel.find({ $and: [{ "lookingFor": "Sell" }, { "propertyGroup": "Residential" }] }, null, options);
//             res.status(200).send({ "msg": "Exact Match Not Found", "data": relatedData });
//         }

//         res.status(200).send(data);
//     } catch (error) {
//         res.status(500).send({ "msg": "Server Error While getting Properties" });
//     }
// });

// Sell Residential
propertyRoute.get("/buy/residential", async (req, res) => {
    try {
        let filter = { $and: [{ "lookingFor": "Sell" }, { "propertyGroup": "Residential" }] };
        let { bedroom, propertyType, constructionStatus, furnished, minPrice, maxPrice, amenities, page } = req.query;
        const currentPage = parseInt(page) || 1;

        if (propertyType || bedroom || furnished || constructionStatus || minPrice || maxPrice || amenities) {
            filter["$or"] = [];
        }

        if (constructionStatus) {
            filter["$or"].push(
                Array.isArray(constructionStatus)
                    ? { "availabilityStatus": { $in: constructionStatus.map(item => item) } }
                    : { "availabilityStatus": constructionStatus }
            );
        }

        if (propertyType) {
            filter["$or"].push(
                Array.isArray(propertyType)
                    ? { "propertyType": { $in: propertyType } }
                    : { "propertyType": propertyType }
            );
        }

        if (bedroom) {
            filter["$or"].push(
                Array.isArray(bedroom)
                    ? { "roomDetails.bedroom": { $in: bedroom.map(item => Number(item)) } }
                    : { "roomDetails.bedroom": Number(bedroom) }
            );
        }

        if (furnished) {
            filter["$or"].push(
                Array.isArray(furnished)
                    ? { "furnished": { $in: furnished } }
                    : { "furnished": furnished }
            );
        }

        if (minPrice) {
            filter["$or"].push(
                { "price": { "$gte": parseFloat(minPrice) } }
            );
        }

        if (maxPrice) {
            filter["$or"].push(
                { "price": { "$lte": parseFloat(maxPrice) } }
            );
        }

        if (amenities) {
            filter["$or"].push(
                Array.isArray(amenities)
                    ? { "amenities": { $in: amenities } }
                    : { "amenities": amenities }
            );
        }

        const totalCount = await PropertyModel.countDocuments(filter);
        const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
        const options = {
            skip: (currentPage - 1) * ITEMS_PER_PAGE,
            limit: ITEMS_PER_PAGE,
        };

        if (!totalCount) {
            const relatedData = await PropertyModel.find({ $and: [{ "lookingFor": "Sell" }, { "propertyGroup": "Residential" }] }, null, options);
            return res.status(200).send({ "msg": "Exact Match Not Found", "data": relatedData, currentPage, totalPages, totalCount });
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






// // Sell Commercial
// propertyRoute.get("/buy/commercial", async (req, res) => {
//     try {
//         let filter = { $and: [{ "lookingFor": "Sell" }, { "propertyGroup": "Commercial" }] };
//         let { bedroom, propertyType, constructionStatus, furnished, minPrice, maxPrice, amenities, page } = req.query;
//         const currentPage = parseInt(page) || 1;

//         if (propertyType || bedroom || furnished || constructionStatus || minPrice || maxPrice || amenities) {
//             filter["$or"] = [];
//         }

//         if (constructionStatus) {
//             filter["$or"].push(
//                 Array.isArray(constructionStatus)
//                     ? { "availabilityStatus": { $in: constructionStatus.map(item => item) } }
//                     : { "availabilityStatus": constructionStatus }
//             );
//         }

//         if (propertyType) {
//             filter["$or"].push(
//                 Array.isArray(propertyType)
//                     ? { "propertyType": { $in: propertyType } }
//                     : { "propertyType": propertyType }
//             );
//         }

//         if (bedroom) {
//             filter["$or"].push(
//                 Array.isArray(bedroom)
//                     ? { "roomDetails.bedroom": { $in: bedroom.map(item => Number(item)) } }
//                     : { "roomDetails.bedroom": Number(bedroom) }
//             );
//         }

//         if (furnished) {
//             filter["$or"].push(
//                 Array.isArray(furnished)
//                     ? { "furnished": { $in: furnished } }
//                     : { "furnished": furnished }
//             );
//         }

//         if (minPrice) {
//             filter["$or"].push(
//                 { "price": { "$gte": parseFloat(minPrice) } }
//             );
//         }

//         if (maxPrice) {
//             filter["$or"].push(
//                 { "price": { "$lte": parseFloat(maxPrice) } }
//             );
//         }

//         if (amenities) {
//             filter["$or"].push(
//                 Array.isArray(amenities)
//                     ? { "amenities": { $in: amenities } }
//                     : { "amenities": amenities }
//             );
//         }



//         const options = {
//             skip: (currentPage - 1) * ITEMS_PER_PAGE,
//             limit: ITEMS_PER_PAGE, // Define ITEMS_PER_PAGE as the number of items to return per page
//         };

//         const data = await PropertyModel.find(filter, null, options);

//         if (!data.length) {
//             const relatedData = await PropertyModel.find({ $and: [{ "lookingFor": "Sell" }, { "propertyGroup": "Commercial" }] }, null, options);
//             res.status(200).send({ "msg": "Exact Match Not Found", "data": relatedData });
//         }

//         res.status(200).send(data);
//     } catch (error) {
//         res.status(500).send({ "msg": "Server Error While getting Properties" });
//     }
// })

// Sell Commercial
propertyRoute.get("/buy/commercial", async (req, res) => {
    try {
        let filter = { $and: [{ "lookingFor": "Sell" }, { "propertyGroup": "Commercial" }] };
        let { bedroom, propertyType, constructionStatus, furnished, minPrice, maxPrice, amenities, page } = req.query;
        const currentPage = parseInt(page) || 1;

        if (propertyType || bedroom || furnished || constructionStatus || minPrice || maxPrice || amenities) {
            filter["$or"] = [];
        }

        if (constructionStatus) {
            filter["$or"].push(
                Array.isArray(constructionStatus)
                    ? { "availabilityStatus": { $in: constructionStatus.map(item => item) } }
                    : { "availabilityStatus": constructionStatus }
            );
        }

        if (propertyType) {
            filter["$or"].push(
                Array.isArray(propertyType)
                    ? { "propertyType": { $in: propertyType } }
                    : { "propertyType": propertyType }
            );
        }

        if (bedroom) {
            filter["$or"].push(
                Array.isArray(bedroom)
                    ? { "roomDetails.bedroom": { $in: bedroom.map(item => Number(item)) } }
                    : { "roomDetails.bedroom": Number(bedroom) }
            );
        }

        if (furnished) {
            filter["$or"].push(
                Array.isArray(furnished)
                    ? { "furnished": { $in: furnished } }
                    : { "furnished": furnished }
            );
        }

        if (minPrice) {
            filter["$or"].push(
                { "price": { "$gte": parseFloat(minPrice) } }
            );
        }

        if (maxPrice) {
            filter["$or"].push(
                { "price": { "$lte": parseFloat(maxPrice) } }
            );
        }

        if (amenities) {
            filter["$or"].push(
                Array.isArray(amenities)
                    ? { "amenities": { $in: amenities } }
                    : { "amenities": amenities }
            );
        }

        const totalCount = await PropertyModel.countDocuments(filter);
        const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
        const options = {
            skip: (currentPage - 1) * ITEMS_PER_PAGE,
            limit: ITEMS_PER_PAGE,
        };

        if (!totalCount) {
            const relatedData = await PropertyModel.find({ $and: [{ "lookingFor": "Sell" }, { "propertyGroup": "Commercial" }] }, null, options);
            return res.status(200).send({ "msg": "Exact Match Not Found", "data": relatedData, currentPage, totalPages, totalCount });
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




// Post Property
propertyRoute.post("/", tokenVerify, async (req, res) => {
    let payload = req.body;
    try {
        let obj = spreader(payload);

        if (obj.msg == "SUCCESS") {
            obj.data.userID = xss(req.headers.id);
            let newProperty = new PropertyModel(obj.data);

            await newProperty.save();

            // let emailResponse = await propertyPosted(newProperty, userDetail);

            let emailResponse = "Closed";

            res.status(201).send({ "msg": `${payload.propertyType} Posted Successfully`, "id": newProperty._id, "emailStatus": emailResponse });
        } else {
            res.status(401).send({ "msg": obj.error });
        }
    } catch (error) {
        res.status(500).send({ "msg": "Server Error While Posting Property", "error": error });
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
        res.status(500).send({ "msg": "Server Error While Updating Property", "error": error });
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
        res.status(500).send({ "msg": "Server Error While Deleting Property", "error": error });
    }
});



// Enquiry Email
propertyRoute.post("/inquiry", async (req, res) => {
    try {
        let id = xss(req.body.propertyID);
        let buyer = req.body;

        let property = await PropertyModel.findById(id);
        if (!property) {
            return res.status(400).send({ "msg": "Property does not exist" });
        }

        let user = await UserModel.findById({ "_id": property.userID });

        if (user.email) {
            let emailSending = await contactOwner(user.email, property, buyer);
            if (emailSending.status) {
                res.status(200).send({ "msg": "Email Sent Successfully" });
            } else {
                res.status(400).send({ "msg": "Email Sending Error", "error": emailSending.msg });
            }
        } else {
            let emailSending = await contactOwner("ejajkhan613@gmail.com", property, buyer);
            // let emailSending = await contactOwner("gks@ametheus.com", property, buyer);
            if (emailSending.status) {
                res.status(200).send({ "msg": "Email Sent Successfully" });
            } else {
                res.status(400).send({ "msg": "Email Sending Error", "error": emailSending.msg });
            }
        }
    } catch (error) {
        res.status(500).send({ "msg": "Server Error While Sending Enquiry Email", "error": error });
    }
});




// Get Property List
propertyRoute.post("/array-list", async (req, res) => {
    try {
        let list = req.body.list;

        // Using the $in operator to fetch all properties by their IDs
        const propertyList = await PropertyModel.find({ "_id": { $in: list } });

        res.status(200).send(propertyList);
    } catch (error) {
        res.status(500).send({ "msg": "Server Error While Sending List of Properties", "error": error });
    }
})



// Exporting Module
module.exports = { propertyRoute };
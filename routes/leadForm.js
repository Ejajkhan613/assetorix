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



// Get Lead List Details
leadFormRoute.get("/", tokenVerify, async (req, res) => {
    try {
        let id = req.userDetail._id;

        let list = await LeadFormModel.find({ "userID": id }).sort({ "createdOn": -1 });
        res.status(200).send(list);
    } catch (error) {
        res.status(500).send({ "msg": "Server Error While Getting Data", "error": error });
    }
});



// // Retrieve Single Lead Form Data with User Names in Replies
leadFormRoute.get("/single/:id", async (req, res) => {
    try {
        const leadFormID = req.params.id;
        const response = await LeadFormModel.findById(leadFormID);

        if (!response) {
            return res.status(404).send({ msg: "Lead Form Data Not Found" });
        }
        
        const userAvatar = await UserModel.findById(response.userID);

        const data = {
            _id: response._id,
            userID: response.userID,
            avatar: userAvatar.avatar,
            name: response.name,
            email: response.email,
            formType: response.formType,
            propertyType: response.propertyType,
            description: response.description,
            replies: [],
            createdOn: response.createdOn
        };


        if (response.isMobileVisible) {
            data.mobile = response.mobile;
        }

        // Fetch user names for each reply
        for (const reply of response.replies) {
            const user = await UserModel.findById(reply.userID);
            const userName = user ? user.name : "Unknown User";
            let formattedReply = {
                _id: reply._id,
                userID: reply.userID,
                name: userName,
                avatar: user.avatar,
                message: reply.message,
                createdOn: reply.createdOn
            };
            data.replies.push(formattedReply);
        }
        console.log(data);

        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ msg: "Server Error While Getting Lead Form", error });
    }
});




// // get Lead Form Lists
// leadFormRoute.get("/all/", async (req, res) => {
//     const ITEMS_PER_PAGE = 20;
//     try {
//         let { page, ...queryParams } = req.query;
//         const currentPage = parseInt(page) || 1;

//         let filter = { "$and": [{ "verificationState": "Approved" }, { "leadFormState": "Public" }] };
//         for (const [key, value] of Object.entries(queryParams)) {
//             if (value && key !== "verificationState" && key !== "leadFormState") {
//                 filter["$and"] = filter["$and"] || [];
//                 filter["$and"].push({ [key]: { $regex: new RegExp(value, "i") } });
//             }
//         }

//         const totalCount = await LeadFormModel.countDocuments(filter);
//         const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

//         const options = {
//             skip: (currentPage - 1) * ITEMS_PER_PAGE,
//             limit: ITEMS_PER_PAGE,
//         };

//         const data = await LeadFormModel.find(filter, null, options);
//         console.log(data);

//         const processedData = data.map(item => {
//             const { expiryTime, leadFormState, verificationState, isMobileVisible, mobile, ...rest } = item.toObject();

//             if (item.isMobileVisible) {
//                 return {
//                     ...rest,
//                     mobile: item.mobile // Including mobile field
//                 };
//             } else {
//                 const { expiryTime, leadFormState, verificationState, isMobileVisible, mobile, ...rest } = item.toObject();
//                 return rest;
//             }
//         });


//         res.status(200).send({
//             data: processedData,
//             currentPage,
//             totalPages,
//             totalCount,
//         });
//     } catch (error) {
//         res.status(500).send({ "msg": "Server Error While getting RFQ's", "error": error });
//     }
// });



// get Lead Form Lists All
leadFormRoute.get("/all/", async (req, res) => {
    const ITEMS_PER_PAGE = 20;
    try {
        let { page, ...queryParams } = req.query;
        const currentPage = parseInt(page) || 1;

        let pipeline = [
            {
                $match: {
                    $and: [{ verificationState: "Approved" }, { leadFormState: "Public" }],
                },
            },
        ];

        for (const [key, value] of Object.entries(queryParams)) {
            if (value && key !== "verificationState" && key !== "leadFormState") {
                pipeline.push({
                    $match: {
                        $and: pipeline[0].$match.$and.concat({
                            [key]: { $regex: new RegExp(value, "i") },
                        }),
                    },
                });
            }
        }

        pipeline = pipeline.concat([
            {
                $project: {
                    userID: 1,
                    name: 1,
                    email: 1,
                    formType: 1,
                    propertyType: 1,
                    description: 1,
                    createdOn: 1,
                    mobile: {
                        $cond: {
                            if: "$isMobileVisible",
                            then: "$mobile",
                            else: "$REMOVE", // "$REMOVE" is used to exclude the mobile field
                        }
                    }
                },
            },
            {
                $skip: (currentPage - 1) * ITEMS_PER_PAGE,
            },
            {
                $limit: ITEMS_PER_PAGE,
            },
        ]);

        const data = await LeadFormModel.aggregate(pipeline);

        const totalCount = data.length;
        const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

        res.status(200).send({
            data,
            currentPage,
            totalPages,
            totalCount,
        });
    } catch (error) {
        res.status(500).send({ msg: "Server Error While getting RFQ's", error });
    }
});



leadFormRoute.post("/", tokenVerify, async (req, res) => {
    let payload = req.body;
    try {
        let data = {};


        data.userID = xss(req.userDetail._id);


        if (!payload.name) {
            return res.status(400).send({ "msg": "Name is Missing" });
        }
        data.name = xss(payload.name);


        if (!payload.mobile) {
            return res.status(400).send({ "msg": "Mobile is Missing" });
        }
        data.mobile = xss(payload.mobile);


        if (!payload.isMobileVisible) {
            data.isMobileVisible = false;
        } else {
            data.isMobileVisible = xss(payload.isMobileVisible);
        }


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
                return res.status(400).send({ "msg": `Property Type is Wrong - ${payload.propertyType}` })
            }
            data.propertyType = xss(payload.propertyType);
        } else {
            data.propertyType = "None";
        }


        if (!payload.description) {
            return res.status(400).send({ "msg": "Description is Missing" });
        }
        data.description = xss(payload.description);

        data.userID = req.userDetail._id;

        let newForm = new LeadFormModel(data);
        await newForm.save();

        res.status(201).send({ "msg": "Form Submitted Successfully" });
    } catch (error) {
        res.status(500).send({ "msg": "Server Error While Saving Form Data", "error": error });
    }
});



leadFormRoute.patch("/:id", tokenVerify, async (req, res) => {
    let payload = req.body;
    let leadFormID = req.params.id;
    try {
        let data = {};

        data.userID = xss(req.userDetail._id);


        if (!payload.name) {
            return res.status(400).send({ "msg": "Name is Missing" });
        }
        data.name = xss(payload.name);


        if (!payload.mobile) {
            return res.status(400).send({ "msg": "Mobile is Missing" });
        }
        data.mobile = xss(payload.mobile);


        if (!payload.isMobileVisible) {
            data.isMobileVisible = false;
        } else {
            data.isMobileVisible = xss(payload.isMobileVisible);
        }


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

        if (!leadFormID) {
            res.status(400).send({ "msg": "Missing Lead Form ID to Update" });
        }


        data.userID = req.userDetail._id;
        data.verificationState = "Pending";

        await LeadFormModel.findByIdAndUpdate({ "_id": leadFormID }, data);

        res.status(201).send({ "msg": "Form Updated Successfully" });
    } catch (error) {
        res.status(500).send({ "msg": "Server Error While Saving Form Data", "error": error });
    }
});


// Delete Lead Form Data
leadFormRoute.delete("/:id", tokenVerify, async (req, res) => {
    let leadFormID = req.params.id;

    let foundData = await LeadFormModel.findById(leadFormID);
    if (!foundData) {
        res.status(404).send({ "msg": "No Lead Form Found with this ID" });
    }

    if (foundData.userID != req.userDetail._id) {
        res.status(400).send({ "msg": "Looks like this Lead Form is not associated with your account" });
    }

    await LeadFormModel.findByIdAndDelete(leadFormID);

    res.status(200).send({ "msg": "Deleted Successfully" });
});


// Reply
leadFormRoute.post("/:id/replies", tokenVerify, async (req, res) => {
    try {
        const leadFormID = req.params.id;
        const { message } = req.body;
        const userID = req.userDetail._id;

        if (!leadFormID) {
            return res.status(400).send({ msg: "Lead Form ID Not Provided" });
        }

        if (!message) {
            return res.status(400).send({ msg: "Reply message is missing" });
        }

        const reply = {
            userID,
            message: xss(message)
        };

        await LeadFormModel.findByIdAndUpdate(
            { _id: leadFormID },
            { $push: { replies: reply } }
        );

        res.status(201).send({ msg: "Reply added successfully" });
    } catch (error) {
        res.status(500).send({ msg: "Server Error While Adding Reply", error });
    }
});





// exporting module
module.exports = { leadFormRoute };
// Dependencies
const mongoose = require("mongoose");
const { indianTime } = require("../services/indianTime");


// Schema
const leadFormSchema = mongoose.Schema({
    userID: {
        type: String,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: String,
        required: true,
        trim: true
    },
    isMobileVisible: {
        type: Boolean
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    formType: {
        type: String,
        enum: ["Buy", "Rent", "Sell"],
        default: "Buy",
        trim: true
    },
    propertyType: {
        type: String,
        enum: ["None", "Residential", "Commercial"],
        default: "None",
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    verificationState: {
        type: String,
        enum: ["Pending", "Approved", "Rejected", "Fulfilled"],
        default: "Pending",
        trim: true
    },
    leadFormState: {
        type: String,
        enum: ["Private", "Public"],
        default: "Public",
        trim: true
    },
    createdOn: {
        type: String,
        default: indianTime
    },
    expiryTime: {
        type: Date,
        default: Date.now,
        index: { expires: 60 * 24 * 60 * 60 } // 60 days in seconds
    }
});



// Model
const LeadFormModel = mongoose.model("leadform", leadFormSchema);



// Exporting Modules
module.exports = { LeadFormModel };

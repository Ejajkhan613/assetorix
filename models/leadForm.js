// Dependencies
const mongoose = require("mongoose");
const { indianTime } = require("../services/indianTime");


// Schema
const leadFormSchema = mongoose.Schema({
    userID: {
        type: String
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
        lowercase: true
    },
    formType: {
        type: String,
        enum: ["Buy", "Rent", "Sell"],
        default: "Buy"
    },
    propertyType: {
        type: String,
        enum: ["None", "Residential", "Commercial"],
        default: "None"
    },
    description: {
        type: String
    },
    verificationState: {
        type: String,
        enum: ["Pending", "Approved", "Rejected", "Fulfilled"],
        default: "Pending"
    },
    leadFormState: {
        type: String,
        enum: ["Private", "Public"],
        default: "Public"
    },
    createdOn: {
        type: String,
        default: indianTime
    },
    expiryTime: {
        type: Date,
        default: Date.now,
        index: { expires: 90 * 24 * 60 * 60 } // 90 days in seconds
    }
});



// Model
const LeadFormModel = mongoose.model("leadform", leadFormSchema);



// Exporting Modules
module.exports = { LeadFormModel };

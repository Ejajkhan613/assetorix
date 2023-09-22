// Dependencies
const mongoose = require("mongoose");
const { indianTime } = require("../services/indianTime");


// Schema
const propertySchema = mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    managedBy: {
        type: String
    },
    propertyGroup: {
        type: String,
        enum: ["Residential", "Commercial"]
    },
    propertyType: {
        type: String,
        enum: ["Flat / Apartment", "Independent House / Villa", "Independent / Builder Floor", "Serviced Apartment", "1RK / Studio Apartment", "Farmhouse", "Plot / Land", "Office", "Storage", "Industry", "Hospitality", "Retail"]
    },
    lookingFor: {
        type: String,
        enum: ["Sell", "Rent", "PG"]
    },
    address: {
        locality: String,
        pincode: String,
        city: String,
        state: String,
        country: String
    },
    isActive: {
        type: Boolean,
        default: false
    },
    createdOn: {
        type: String,
        default: indianTime
    },
    lastUpdated: {
        type: String,
        default: indianTime
    }
}, { "strict": false });



// Model
const PropertyModel = mongoose.model("property", propertySchema);



// Exporting Modules
module.exports = { PropertyModel };
// Dependencies
const mongoose = require("mongoose");



// Schema
const propertySchema = mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
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
        enum: ["Flat / Apartment", "Independent House / villa", "Independent / Builder Floor"]
    },
    lookingFor: {
        type: String,
        enum: ["Sell", "Rent", "PG"]
    },
    address: {
        locality: String,
        pincode: Number,
        city: String,
        state: String,
        country: String
    },
    isActive: {
        type: Boolean,
        default: false
    }
}, { "strict": false });



// Model
const PropertyModel = mongoose.model("property", propertySchema);



// Exporting Modules
module.exports = { PropertyModel };
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
    propertyName: {
        type: String,
        required: true
    },
    propertyType: {
        type: String,
        enum: ["Apartment", "House", "Condo", "Villa", "Other"]
    },
    address: {
        street: String,
        city: String,
        state: String,
        zip: String
    },
    bedrooms: {
        type: Number
    },
    bathrooms: {
        type: Number
    },
    amenities: {
        type: [String]
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

// Model
const PropertyModel = mongoose.model("property", propertySchema);

// Exporting Modules
module.exports = { PropertyModel };

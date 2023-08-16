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
    propertyType: {
        type: String
    },
    looking_for: {
        type: String,
        enum: ["sell", "rent", "pg"]
    },
    address: {
        house: String,
        city: String,
        state: String,
        country: String,
        zip: Number
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

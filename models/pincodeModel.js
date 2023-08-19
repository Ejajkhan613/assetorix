// Dependencies
const mongoose = require("mongoose");



// Schema
const pincodeSchema = mongoose.Schema({
    locality: {
        type: String,
    },
    pincode: {
        type: Number
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    }
}, { "strict": false });



// Model
const PincodeModel = mongoose.model("pincode", pincodeSchema);



// Exporting Modules
module.exports = { PincodeModel };

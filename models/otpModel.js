// Dependencies
const mongoose = require("mongoose");



// Schema
const otpSchema = mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: '300s' }
    }
});



// Model
const OtpModel = mongoose.model("otp", otpSchema);



// Exporting Modules
module.exports = { OtpModel };
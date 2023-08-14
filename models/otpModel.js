const mongoose = require("mongoose");



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


const OtpModel = mongoose.model("otp", otpSchema);


module.exports = { OtpModel };
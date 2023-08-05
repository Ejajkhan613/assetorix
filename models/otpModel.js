const mongoose = require("mongoose");



const otpSchema = mongoose.Schema({
    mobile: { type: String, required: true },
    otp: { type: String, required: true },
    expirationTime: { type: Date, required: true },
});


const OtpModel = mongoose.model("otp", otpSchema);


module.exports = { OtpModel };
const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {
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


let EmailOTPModel = mongoose.model('emailotp', otpSchema);

module.exports = { EmailOTPModel };

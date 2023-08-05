// Dependencies
const mongoose = require("mongoose");



// Schema
const userSchema = mongoose.Schema({
    "avatar": { type: String },
    "name": { type: String, required: true },
    "email": { type: String, required: true, unique: true },
    "mobile": { type: String, required: true, unique: true },
    "password": { type: String, required: true },
    "active": { type: Boolean, default: true },
    "verificationOtp": { type: String }
});


// Model
const UserModel = mongoose.model("user", userSchema);



// Exporting Modules
module.exports = { UserModel };
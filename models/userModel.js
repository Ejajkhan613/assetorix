// Dependencies
const mongoose = require("mongoose");



// Schema
const userSchema = mongoose.Schema({
    "avatar": { type: String },
    "name": { type: String, required: true },
    "email": { type: String, unique: true },
    "role": {
        type: String,
        enum: ["customer", "agent", "broker", "admin", "super_admin"]
    },
    "mobile": { type: String, required: true, unique: true },
    "password": { type: String, required: true },
    "isBlocked": { type: Boolean, default: false },
    "isVerified": { type: Boolean, default: false }
});


// Model
const UserModel = mongoose.model("user", userSchema);



// Exporting Modules
module.exports = { UserModel };
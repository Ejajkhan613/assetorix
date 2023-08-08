// Dependencies
const mongoose = require("mongoose");



// Schema
const userSchema = mongoose.Schema({
    "name": { type: String, required: true },
    "role": {
        type: String,
        default: "customer",
        enum: ["customer", "agent", "broker", "admin", "super_admin"]
    },
    "mobile": { type: String, required: true },
    "password": { type: String, required: true },
    "isBlocked": { type: Boolean, default: false },
    "isVerified": {
        type: Boolean,
        default: false,
    }
});


// Model
const UserModel = mongoose.model("user", userSchema);



// Exporting Modules
module.exports = { UserModel };
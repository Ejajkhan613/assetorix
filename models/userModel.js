// Dependencies
const mongoose = require("mongoose");



// Schema
const userSchema = mongoose.Schema({
    "avatar": { type: String, default: "" },
    "name": { type: String, required: true },
    "email": { type: String, default: "" },
    "role": {
        type: String,
        default: "customer",
        enum: ["customer", "agent", "broker", "admin", "super_admin"]
    },
    "mobile": { type: String, required: true, unique: true },
    "password": { type: String, required: true },
    "isBlocked": { type: Boolean, default: false },
    "isVerified": {
        type: String,
        default: "pending",
        enum: ["pending", "approved"]
    }
});


// Model
const UserModel = mongoose.model("user", userSchema);



// Exporting Modules
module.exports = { UserModel };
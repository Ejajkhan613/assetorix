// Dependencies
const mongoose = require("mongoose");

// Schema
const userSchema = mongoose.Schema({
    avatar: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "customer",
        enum: ["customer", "agent", "broker", "employee", "admin", "super_admin"]
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
        lowercase: true
    },
    wishlist: {
        type: Array
    }
    ,
    password: {
        type: String,
        required: true
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

// Model
const UserModel = mongoose.model("user", userSchema);

// Exporting Modules
module.exports = { UserModel };

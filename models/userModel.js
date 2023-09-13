// Dependencies
const mongoose = require("mongoose");
const { indianTime } = require("../services/indianTime");


// Schema
const userSchema = mongoose.Schema({
    avatar: {
        type: String
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        default: "customer",
        enum: ["customer", "agent", "employee", "admin", "super_admin"]
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
    },
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
        type: String,
        default: indianTime
    },
    lastUpdated: {
        type: String,
        default: indianTime
    }
});



// Model
const UserModel = mongoose.model("user", userSchema);



// Exporting Modules
module.exports = { UserModel };

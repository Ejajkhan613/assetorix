// Dependencies
const mongoose = require("mongoose");



// Schema
const userSchema = mongoose.Schema({
    "avatar": String,
    "name": String,
    "mobile": String,
    "email": String,
    "password": String
})



// Model
const UserModel = mongoose.model("user", userSchema);



// Exporting Modules
module.exports = { UserModel };
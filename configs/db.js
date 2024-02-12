// Dependencies
const mongoose = require("mongoose");
require('dotenv').config();



// Connection with Mongoose
const connection = mongoose.connect(process.env.MONGO_DB);



// Exporting Module
module.exports = { connection };
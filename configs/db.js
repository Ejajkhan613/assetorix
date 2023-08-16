// Dependencies
const mongoose = require("mongoose");
require('dotenv').config();



// Connection with Mongoose
const connection = mongoose.connect(process.env.mongoDB);



// Exporting Module
module.exports = { connection };
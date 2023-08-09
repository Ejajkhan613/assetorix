// Dependencies
const mongoose = require("mongoose");



// Schema
const propertySchema = mongoose.Schema({

});


// Model
const PropertyModel = mongoose.model("property", propertySchema);



// Exporting Modules
module.exports = { PropertyModel };
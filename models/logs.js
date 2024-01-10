// Dependencies
const mongoose = require("mongoose");
const { indianTime } = require("../services/indianTime");


// Schema
const logsSchema = mongoose.Schema({
    method: String,
    url: String,
    headers: Object,
    body: Object,
    query: Object,
    responseHeaders: Object,
    responseBody: Object,
    "indianTime": {
        type: String,
        default: indianTime
    },
    timestamp: { type: Date, default: Date.now }
});



// Model
const LogsModel = mongoose.model("log", logsSchema);



// Exporting Modules
module.exports = { LogsModel };

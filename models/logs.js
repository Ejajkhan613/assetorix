// Dependencies
const mongoose = require("mongoose");
const { indianTime } = require("../services/indianTime");


// Schema
const logsSchema = mongoose.Schema({
    id: {
        type: String
    },
    title: {
        type: String,
        enum: ["Email_OTP_Sending", "Email_OTP_Verification", "Mobile_Update", "Name_Update", "Property_Added_To_Wishlist", "Property_Removed_From_Wishlist"],
        default: ""
    },
    old: {
        type: String,
        default: ""
    },
    new: {
        type: String,
        default: ""
    },
    time: {
        type: String,
        default: indianTime
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: 15768000 } // 6 months in seconds
    }
}, { "strict": false });



// Model
const LogsModel = mongoose.model("log", logsSchema);



// Exporting Modules
module.exports = { LogsModel };

const mongoose = require('mongoose');
const { indianTime } = require("../services/indianTime");



// Schema
const agencySchema = new mongoose.Schema({
    image: {
        type: String,
        default: ""
    },
    imageKey: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: "",
        trim: true
    },
    email: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
        lowercase: true,
        required: true
    },
    language: {
        type: Array,
        default: [],
        enum: ["English", "Assamese", "Bengali", "Bodo", "Dogri", "Gujarati", "Hindi", "Kannada", "Kashmiri", "Konkani", "Maithili", "Malayalam", "Manipuri", "Marathi", "Nepali", "Odia", "Punjabi", "Sanskrit", "Santali", "Sindhi", "Tamil", "Telugu", "Urdu"]
    },
    faxNumber: {
        type: String,
        trim: true
    },
    taxNumber: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    websiteurl: {
        type: String,
        trim: true
    },
    socialMedia: {
        type: {
            facebook: String,
            youtube: String,
            twitter: String,
            instagram: String,
            pinterest: String
        }
    },
    createdOn: {
        type: String,
        default: indianTime
    },
    lastUpdated: {
        type: String,
        default: indianTime
    },
    normalDate: {
        type: Date,
        default: Date.now
    }
});



// Model
let AgencyModel = mongoose.model('agency', agencySchema);

module.exports = { AgencyModel };

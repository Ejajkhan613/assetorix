const xss = require("xss");



const { flat_apartment } = require("../propertyValidation/flat_apartment");
const { independentHouse_villa } = require("../propertyValidation/independentHouse_villa");



function spreader(payload) {
    if (payload.lookingFor == "Sell") {
        if (payload.propertyType == "Flat / Apartment") {
            return flat_apartment(payload);
        } else if (payload.propertyType == "Independent House / villa") {
            return independentHouse_villa(payload);
        } else {
            return { "msg": "ERROR", "error": `Data Validation Not Implemented for ${payload.propertyType}` }
        }
    } else if (payload.lookingFor == "Rent") {
        return { "msg": "ERROR", "error": `Data Validation Not Implemented for ${payload.lookingFor}` }
    } else if (payload.lookingFor == "PG") {
        return { "msg": "ERROR", "error": `Data Validation Not Implemented for ${payload.lookingFor}` }
    } else {
        return { "msg": "ERROR", "error": "Wrong Looking For Type" };
    }
}


module.exports = { spreader };



const xss = require("xss");



const { flat_apartment } = require("../propertyValidation/flat_apartment");
const { independentHouse_villa } = require("../propertyValidation/independentHouse_villa");
const { independent_builderFloor } = require("../propertyValidation/independent_builderFloor");
const { servicedApartment } = require("../propertyValidation/servicedApartment");
const { rk_studio } = require("../propertyValidation/rk_studio");
const { farmhouse } = require("../propertyValidation/farmhouse");



function spreader(payload) {
    if (payload.lookingFor == "Sell") {
        if (payload.propertyType == "Flat / Apartment") {
            return flat_apartment(payload);
        } else if (payload.propertyType == "Independent House / Villa") {
            return independentHouse_villa(payload);
        } else if (payload.propertyType == "Independent / Builder Floor") {
            return independent_builderFloor(payload);
        } else if (payload.propertyType == "Serviced Apartment") {
            return servicedApartment(payload);
        } else if (payload.propertyType == "1RK / Studio Apartment") {
            return rk_studio(payload);
        } else if (payload.propertyType == "Farmhouse") {
            return farmhouse(payload);
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



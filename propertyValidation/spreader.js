// Custom Modules
const { flat_apartment } = require("./Sell_Residential/flat_apartment");
const { independentHouse_villa } = require("./Sell_Residential/independentHouse_villa");
const { independent_builderFloor } = require("./Sell_Residential/independent_builderFloor");
const { servicedApartment } = require("./Sell_Residential/servicedApartment");
const { rk_studio } = require("./Sell_Residential/rk_studio");
const { farmhouse } = require("./Sell_Residential/farmhouse");
const { plot_land } = require("./Sell_Residential/plot_land");

const { readyToMoveSpace } = require("./Sell_Commercial/Office/readyToMoveSpace");
const { bareShellOfficeSpace } = require("./Sell_Commercial/Office/bareShellOfficeSpace");
const { coworkingOfficeSpace } = require("./Sell_Commercial/Office/coworkingOfficeSpace");


// Function to send payload to dedicated property validators
function spreader(payload) {
    if (payload.lookingFor == "Sell") {
        if (payload.propertyGroup == "Residential") {
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
            } else if (payload.propertyType == "Plot / Land") {
                return plot_land(payload);
            } else {
                return { "msg": "ERROR", "error": `${payload.propertyType} is Wrong Property Type` }
            }
        } else if (payload.propertyGroup == "Commercial") {
            if (payload.propertyType == "Office") {
                if (payload.officeType == "Ready to move office space") {
                    return readyToMoveSpace(payload);
                } else if (payload.officeType == "Bare shell office space") {
                    return bareShellOfficeSpace(payload);
                } else if (payload.officeType == "Co-working office space") {
                    return coworkingOfficeSpace(payload);
                } else {
                    return { "msg": "ERROR", "error": `${payload.officeType} is Wrong Office Type` }
                }
            } else {
                return { "msg": "ERROR", "error": `Data Validation Not Implemented for ${payload.officeType}` }
            }
        } else {
            return { "msg": "ERROR", "error": `${payload.propertyGroup} is Wrong Property Group` }
        }
    } else if (payload.lookingFor == "Rent") {
        return { "msg": "ERROR", "error": `Data Validation Not Implemented for ${payload.lookingFor}` }
    } else if (payload.lookingFor == "PG") {
        return { "msg": "ERROR", "error": `Data Validation Not Implemented for ${payload.lookingFor}` }
    } else {
        return { "msg": "ERROR", "error": "Wrong Looking For Type" };
    }
}


// Exporting Module
module.exports = { spreader };



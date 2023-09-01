// Custom Modules

// Sell Residential
const { flat_apartment } = require("./Sell_Residential/flat_apartment");
const { independentHouse_villa } = require("./Sell_Residential/independentHouse_villa");
const { independent_builderFloor } = require("./Sell_Residential/independent_builderFloor");
const { servicedApartment } = require("./Sell_Residential/servicedApartment");
const { rk_studio } = require("./Sell_Residential/rk_studio");
const { farmhouse } = require("./Sell_Residential/farmhouse");
const { plot_land } = require("./Sell_Residential/plot_land");


// Sell Commercial
// Office
const { readyToMoveSpace } = require("./Sell_Commercial/Office/readyToMoveSpace");
const { bareShellOfficeSpace } = require("./Sell_Commercial/Office/bareShellOfficeSpace");
const { coworkingOfficeSpace } = require("./Sell_Commercial/Office/coworkingOfficeSpace");

// Land / Plot
const { commercial_InstitutionalLand } = require("./Sell_Commercial/Plot_Land/commercial_InstitutionalLand");
const { agricultural_farmLand } = require("./Sell_Commercial/Plot_Land/agricultural_farmLand");
const { industrialLands_Plots } = require("./Sell_Commercial/Plot_Land/industrialLands_Plots");

// Storage
const { wareHouse } = require("./Sell_Commercial/Storage/wareHouse");
const { coldStorage } = require("./Sell_Commercial/Storage/coldStorage");

// Industry
const { factory } = require("./Sell_Commercial/Industry/factory");
const { manufacturing } = require("./Sell_Commercial/Industry/manufacturing");

// Hospitality
const { hotel_Resorts } = require("./Sell_Commercial/Hospital/hotel_Resorts");
const { guestHouse_BanquetHall } = require("./Sell_Commercial/Hospital/guestHouse_BanquetHall");


// Retail
const { commercialShops } = require("./Sell_Commercial/Retail/commercialShops");
const { commercialShowrooms } = require("./Sell_Commercial/Retail/commercialShowrooms");


// Rent
// Residential
const { flat_apartment_Sell } = require("./Rent_Residential/flat_apartment");
const { independentHouse_villa_Rent } = require("./Rent_Residential/independentHouse_Villa");
const { independent_Builder_Sell } = require("./Rent_Residential/independent_Builder_Sell");
const { servicedApartment_Rent } = require("./Rent_Residential/servicedApartment_Sell");
const { RK_Studio_Apartment_Sell } = require("./Rent_Residential/1RK_Studio_Apartment");
const { farmHouse_Rent } = require("./Rent_Residential/farmHouse");

// Commercial
// Office
const { readyToMoveSpace_Rent } = require("./Rent_Commercial/Office/readyToMoveSpace");
const { bareShellOfficeSpace_Rent } = require("./Rent_Commercial/Office/bareShellOfficeSpace");
const { coworkingOfficeSpace_Rent } = require("./Rent_Commercial/Office/coworkingOfficeSpace");

// Plot / Land
const { commercial_InstitutionalLand_Rent } = require("./Rent_Commercial/Plot_Land/commercial_InstitutionalLand");
const { agricultural_farmLand_Rent } = require("./Rent_Commercial/Plot_Land/agricultural_farmLand");
const { industrialLands_Plots_Rent } = require("./Rent_Commercial/Plot_Land/industrialLands_Plots");

// Storage
const { coldStorage_Rent } = require("./Rent_Commercial/Storage/coldStorage");
const { wareHouse_Rent } = require("./Rent_Commercial/Storage/wareHouse");

// Factories
const { factory_Rent } = require("./Rent_Commercial/Industry/factory");
const { manufacturing_Rent } = require("./Rent_Commercial/Industry/manufacturing");

// Hospitality
const { hotel_Resorts_Rent } = require("./Rent_Commercial/Hospital/hotel_Resorts");
const { guestHouse_BanquetHall_Rent } = require("./Rent_Commercial/Hospital/guestHouse_BanquetHall");

// Retail
const { commercialShops_Rent } = require("./Rent_Commercial/Retail/commercialShops");
const { commercialShowrooms_Rent } = require("./Rent_Commercial/Retail/commercialShowrooms");


// PG
// Flat / Apartment
const { flat_apartment_PG } = require("./PG_Residential/flat_apartment");
const { independentHouse_villa_PG } = require("./PG_Residential/independentHouse_villa");
const { independent_builderFloor_PG } = require("./PG_Residential/independent_builderFloor");
const { rk_studio_PG } = require("./PG_Residential/rk_studio");
const { servicedApartment_PG } = require("./PG_Residential/servicedApartment");


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
            } else if (payload.propertyType == "Plot / Land") {
                if (payload.plotLandType == "Commercial Land / Institutional Land") {
                    return commercial_InstitutionalLand(payload);
                } else if (payload.plotLandType == "Agricultural Land / Farm Land") {
                    return agricultural_farmLand(payload);
                } else if (payload.plotLandType == "Industrial Lands / Plots") {
                    return industrialLands_Plots(payload);
                } else {
                    return { "msg": "ERROR", "error": `${payload.plotLandType} is Wrong Land Type` }
                }
            } else if (payload.propertyType == "Storage") {
                if (payload.storageType == "Ware House") {
                    return wareHouse(payload);
                } else if (payload.storageType == "Cold Storage") {
                    return coldStorage(payload);
                } else {
                    return { "msg": "ERROR", error: `${payload.storageType} is Wrong Storage Type` };
                }
            } else if (payload.propertyType == "Industry") {
                if (payload.industryType == "Factory") {
                    return factory(payload);
                } else if (payload.industryType == "Manufacturing") {
                    return manufacturing(payload);
                } else {
                    return { "msg": "ERROR", "error": `${payload.industryType} is Wrong Industry Type` }
                }
            } else if (payload.propertyType == "Hospitality") {
                if (payload.hospitalityType == "Hotel / Resorts") {
                    return hotel_Resorts(payload);
                } else if (payload.hospitalityType == "Guest-House / Banquet-Hall") {
                    return guestHouse_BanquetHall(payload);
                } else {
                    return { "msg": "ERROR", "error": `${payload.hospitalityType} is Wrong Hospitality Type` }
                }
            } else if (payload.propertyType == "Retail") {
                if (payload.retailSpaceType == "Commercial Shops") {
                    return commercialShops(payload);
                } else if (payload.retailSpaceType == "Commercial Showrooms") {
                    return commercialShowrooms(payload);
                } else {
                    return { "msg": "ERROR", "error": `${payload.retailSpaceType} is Wrong Retail Space Type` }
                }
            } else {
                return { "msg": "ERROR", "error": `${payload.propertyType} is Wrong Property Type` }
            }
        } else {
            return { "msg": "ERROR", "error": `${payload.propertyGroup} is Wrong Property Group` }
        }
    } else if (payload.lookingFor == "Rent") {
        if (payload.propertyGroup == "Residential") {
            if (payload.propertyType == "Flat / Apartment") {
                return flat_apartment_Sell(payload);
            } else if (payload.propertyType == "Independent House / Villa") {
                return independentHouse_villa_Rent(payload);
            } else if (payload.propertyType == "Independent / Builder Floor") {
                return independent_Builder_Sell(payload);
            } else if (payload.propertyType == "Serviced Apartment") {
                return servicedApartment_Rent(payload);
            } else if (payload.propertyType == "1RK / Studio Apartment") {
                return RK_Studio_Apartment_Sell(payload);
            } else if (payload.propertyType == "Farmhouse") {
                return farmHouse_Rent(payload);
            } else {
                return { "msg": "ERROR", "error": `${payload.propertyType} is Wrong Property Type` }
            }
        } else if (payload.propertyGroup == "Commercial") {
            if (payload.propertyType == "Office") {
                if (payload.officeType == "Ready to move office space") {
                    return readyToMoveSpace_Rent(payload);
                } else if (payload.officeType == "Bare shell office space") {
                    return bareShellOfficeSpace_Rent(payload);
                } else if (payload.officeType == "Co-working office space") {
                    return coworkingOfficeSpace_Rent(payload);
                } else {
                    return { "msg": "ERROR", "error": `${payload.officeType} is Wrong Office Type` }
                }
            } else if (payload.propertyType == "Plot / Land") {
                if (payload.plotLandType == "Commercial Land / Institutional Land") {
                    return commercial_InstitutionalLand_Rent(payload);
                } else if (payload.plotLandType == "Agricultural Land / Farm Land") {
                    return agricultural_farmLand_Rent(payload);
                } else if (payload.plotLandType == "Industrial Lands / Plots") {
                    return industrialLands_Plots_Rent(payload);
                } else {
                    return { "msg": "ERROR", "error": `${payload.plotLandType} is Wrong Land Type` }
                }
            } else if (payload.propertyType == "Storage") {
                if (payload.storageType == "Ware House") {
                    return wareHouse_Rent(payload);
                } else if (payload.storageType == "Cold Storage") {
                    return coldStorage_Rent(payload);
                } else {
                    return { "msg": "ERROR", error: `${payload.storageType} is Wrong Storage Type` };
                }
            } else if (payload.propertyType == "Industry") {
                if (payload.industryType == "Factory") {
                    return factory_Rent(payload);
                } else if (payload.industryType == "Manufacturing") {
                    return manufacturing_Rent(payload);
                } else {
                    return { "msg": "ERROR", "error": `${payload.industryType} is Wrong Industry Type` }
                }
            } else if (payload.propertyType == "Hospitality") {
                if (payload.hospitalityType == "Hotel / Resorts") {
                    return hotel_Resorts_Rent(payload);
                } else if (payload.hospitalityType == "Guest-House / Banquet-Hall") {
                    return guestHouse_BanquetHall_Rent(payload);
                } else {
                    return { "msg": "ERROR", "error": `${payload.hospitalityType} is Wrong Hospitality Type` }
                }
            } else if (payload.propertyType == "Retail") {
                if (payload.retailSpaceType == "Commercial Shops") {
                    return commercialShops_Rent(payload);
                } else if (payload.retailSpaceType == "Commercial Showrooms") {
                    return commercialShowrooms_Rent(payload);
                } else {
                    return { "msg": "ERROR", "error": `${payload.retailSpaceType} is Wrong Retail Space Type` }
                }
            } else {
                return { "msg": "ERROR", "error": `${payload.propertyType} is Wrong Property Type` }
            }
        } else {
            return { "msg": "ERROR", "error": `${payload.propertyGroup} is Wrong Property Group` }
        }
    } else if (payload.lookingFor == "PG") {
        if (payload.propertyType == "Flat / Apartment") {
            return flat_apartment_PG(payload);
        } else if (payload.propertyType == "Independent House / Villa") {
            return independentHouse_villa_PG(payload);
        } else if (payload.propertyType == "Independent / Builder Floor") {
            return independent_builderFloor_PG(payload);
        } else if (payload.propertyType == "1RK / Studio Apartment") {
            return rk_studio_PG(payload);
        } else if (payload.propertyType == "Serviced Apartment") {
            return servicedApartment_PG(payload);
        } else {
            return { "msg": "ERROR", "error": `${payload.propertyType} is Wrong Property Type` }
        }
    } else {
        return { "msg": "ERROR", "error": "Wrong Looking For Type" };
    }
};


// Exporting Module
module.exports = { spreader };



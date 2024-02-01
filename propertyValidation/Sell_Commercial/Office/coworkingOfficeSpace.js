const component = require("../../components");


// Function
function coworkingOfficeSpace(data) {

    // Main Object that will be saved in DB
    let obj = {};



    // Looking For
    let lookingFor = component.lookingFor(data.lookingFor);
    if (lookingFor.msg == "SUCCESS") {
        obj.lookingFor = lookingFor.data;
    } else {
        return lookingFor;
    }


    // Property Group
    let propertyGroup = component.propertyGroup(data.propertyGroup);
    if (propertyGroup.msg == "SUCCESS") {
        obj.propertyGroup = propertyGroup.data;
    } else {
        return propertyGroup;
    }


    // Property Type
    let propertyType = component.propertyType(data.propertyType, data.propertyGroup);
    if (propertyType.msg == "SUCCESS") {
        obj.propertyType = propertyType.data;
    } else {
        return propertyType;
    }


    // Office Type
    let officeType = component.officeType(data.officeType);
    if (officeType.msg == "SUCCESS") {
        obj.officeType = officeType.data;
    } else {
        return officeType;
    }




    // --------------------------------- ADDRESS STARTING ---------------------------------

    // Checking Address
    if (!data.address) {
        return { "msg": "ERROR", "error": "Missing Address Detail Object" };
    }

    // Adding Address Data
    let address = {};


    // Located Inside Type
    let locatedInside = component.locatedInside(data.address.locatedInside);
    if (locatedInside.msg == "SUCCESS") {
        address.locatedInside = locatedInside.data;
    } else {
        return locatedInside;
    }


    // Zone Type
    let zoneType = component.zoneType(data.address.zoneType);
    if (zoneType.msg == "SUCCESS") {
        address.zoneType = zoneType.data;
    } else {
        return zoneType;
    }


    // Pincode
    let pincode = component.pincode(data.address.pincode);
    if (pincode.msg == "SUCCESS") {
        address.pincode = pincode.data;
    } else {
        return pincode;
    }


    // Locality
    let locality = component.locality(data.address.locality);
    if (locality.msg == "SUCCESS") {
        address.locality = locality.data;
    } else {
        return locality;
    }


    // City
    let city = component.city(data.address.city);
    if (city.msg == "SUCCESS") {
        address.city = city.data;
    } else {
        return city;
    }


    // State
    let state = component.state(data.address.state);
    if (state.msg == "SUCCESS") {
        address.state = state.data;
    } else {
        return state;
    }


    // Country
    let country = component.country(data.address.country);
    if (country.msg == "SUCCESS") {
        address.country = country.data;
    } else {
        return country;
    }

    obj.address = address;

    // --------------------------------- ADDRESS ENDING ---------------------------------

    // Washrooms
    let washrooms = component.washrooms(data.washrooms);
    if (washrooms.msg == "SUCCESS") {
        roomDetails.washrooms = washrooms.data;
    } else {
        return washrooms;
    }

    // ------------------ Area Details and Unit Details STARTING -----------------------------


    // Carpet Area
    let carpetArea = component.carpetArea(data.carpetArea);
    if (carpetArea.msg == "SUCCESS") {
        obj.carpetArea = carpetArea.data;
    } else {
        return carpetArea;
    }



    // Carpet Area Unit
    let carpetAreaUnit = component.carpetAreaUnit(data.carpetAreaUnit);
    if (carpetAreaUnit.msg == "SUCCESS") {
        obj.carpetAreaUnit = carpetAreaUnit.data;
    } else {
        return carpetAreaUnit;
    }



    // Super Builtup Area
    if (data.superBuiltupArea && data.superBuiltupAreaUnit) {
        let superBuiltupArea = component.superBuiltupArea(data.superBuiltupArea);
        if (superBuiltupArea.msg == "SUCCESS") {
            obj.superBuiltupArea = superBuiltupArea.data;
        } else {
            return superBuiltupArea;
        }
    }

    // Super Builtup Area Unit
    if (data.superBuiltupArea && data.superBuiltupAreaUnit) {
        let superBuiltupAreaUnit = component.superBuiltupAreaUnit(data.superBuiltupAreaUnit);
        if (superBuiltupAreaUnit.msg == "SUCCESS") {
            obj.superBuiltupAreaUnit = superBuiltupAreaUnit.data;
        } else {
            return superBuiltupAreaUnit;
        }
    }

    // ------------------ Area Details and Unit Details ENDING -----------------------------


    // Availability Status
    let availabilityData = { "type": data.availabilityStatus, "value": data.propertyStatus || data.expectedByYear };

    let validateAvailabilityStatusResult = component.availabilityStatus(availabilityData);

    if (validateAvailabilityStatusResult.msg == "SUCCESS") {
        obj.availabilityStatus = validateAvailabilityStatusResult.availabilityStatus;

        if (validateAvailabilityStatusResult.propertyStatus) {
            obj.propertyStatus = validateAvailabilityStatusResult.propertyStatus;
        } else if (validateAvailabilityStatusResult.expectedByYear) {
            obj.expectedByYear = validateAvailabilityStatusResult.expectedByYear;
        }
    } else {
        return validateAvailabilityStatusResult;
    }


    // Ownership Type
    let ownership = component.ownership(data.ownership);
    if (ownership.msg == "SUCCESS") {
        obj.ownership = ownership.data;
    } else {
        return ownership;
    }


    // Price
    let price = component.price(data.price);
    if (price.msg == "SUCCESS") {
        obj.price = price.data;
    } else {
        return price;
    }



    // Price Per Unit
    let priceUnit = component.priceUnit(data.price, data.plotArea);
    if (priceUnit.msg == "SUCCESS") {
        obj.priceUnit = priceUnit.data;
    } else {
        return priceUnit;
    }


    // Inclusive Prices
    let inclusivePrices = component.inclusivePrices(data.inclusivePrices);
    if (inclusivePrices.msg == "SUCCESS") {
        obj.inclusivePrices = inclusivePrices.data;
    } else {
        return inclusivePrices;
    }


    // Additional Pricing Details
    let additionalPricingDetails = component.additionalPricingDetails(data.additionalPricingDetails);
    if (additionalPricingDetails.msg == "SUCCESS") {
        obj.additionalPricingDetails = additionalPricingDetails.data;
    } else {
        return additionalPricingDetails;
    }

    // Pre Leased / Pre Rented
    let preLeasedRentedDetails = component.preLeasedRentedDetails(data.preLeasedRentedDetails);
    if (preLeasedRentedDetails.msg == "SUCCESS") {
        obj.preLeasedRentedDetails = preLeasedRentedDetails.data;
    } else {
        return preLeasedRentedDetails;
    }


    // Expected Annual Returns
    let expectedAnnualReturns = component.expectedAnnualReturns(data.expectedAnnualReturns);
    if (expectedAnnualReturns.msg == "SUCCESS") {
        obj.expectedAnnualReturns = expectedAnnualReturns.data;
    } else {
        return expectedAnnualReturns;
    }


    // Country Currency
    let countryCurrency = component.countryCurrency(data.countryCurrency);
    if (countryCurrency.msg == "SUCCESS") {
        obj.countryCurrency = countryCurrency.data;
    } else {
        return countryCurrency;
    }



    // Description
    let description = component.description(data.description);
    if (description.msg == "SUCCESS") {
        obj.description = description.data;
    } else {
        return description;
    }


    // Amenities
    if (data.amenities) {
        const list = ["Maintenance Staff", "Water Storage", "Waste Disposal", "AMT", "Visitor Parking", "Shopping Centre", "WheelChair Accessibility", "Cafeteria / Food Court", "DG Availability", "CCTV Surveillance", "Grocery Shop", "Power Back-up", "Feng Shui / Vaastu Compliant", "Security Personnel", "Intercom Facility", "Lift"];
        let amenities = component.amenities({ "data": data.amenities, list })
        if (amenities.msg == "SUCCESS") {
            obj.amenities = amenities.data;
        } else {
            return amenities;
        }
    }


    // Property Features ( Optional )
    if (data.propertyFeatures) {
        const list = ["High Ceiling Height", "False Ceiling Lighting", "Piped-gas", "Internet / wi-fi connectivity", "Centrally Air Conditioned", "Water Purifier", "Recently Renovated", "Private Garden / Terrace", "Natural Light", "Airy Roooms", "Spacious Interiors"];
        let propertyFeatures = component.propertyFeatures({ "data": data.propertyFeatures, list })
        if (propertyFeatures.msg == "SUCCESS") {
            obj.propertyFeatures = propertyFeatures.data;
        } else {
            return propertyFeatures;
        }
    }


    // Society / Building Features ( Optional )
    if (data.society_buildingFeatures) {
        const list = ["Water softening plant", "Shopping Centre", "Fitness Centre / GYM", "Swimming Pool", "Club house / Community Center", "Security Personnel"];
        let society_buildingFeatures = component.society_buildingFeatures({ "data": data.society_buildingFeatures, list })
        if (society_buildingFeatures.msg == "SUCCESS") {
            obj.society_buildingFeatures = society_buildingFeatures.data;
        } else {
            return society_buildingFeatures;
        }
    }


    // Additional Features ( Optional )
    if (data.additionalFeatures) {
        const list = ["Separate entry for servant room", "Waste Disposal", "No open drainage around", "Rain Water Harvesting", "Bank Attached Property", "Low Density Society"];
        let additionalFeatures = component.additionalFeatures({ "data": data.additionalFeatures, list })
        if (additionalFeatures.msg == "SUCCESS") {
            obj.additionalFeatures = additionalFeatures.data;
        } else {
            return additionalFeatures;
        }
    }


    // Other Features ( Optional )
    if (data.otherFeatures) {
        let list = ["In a gated society", "Corner Property", "Pet Friendly", "Wheelchair friendly"];
        let otherFeatures = component.otherFeatures({ "data": data.otherFeatures, list })
        if (otherFeatures.msg == "SUCCESS") {
            obj.otherFeatures = otherFeatures.data;
        } else {
            return otherFeatures;
        }
    }


    // Property Location Advantages ( Optional )
    let locationAdv = component.locationAdv(data.locationAdv)
    if (locationAdv.msg == "SUCCESS") {
        obj.locationAdv = locationAdv.data;
    } else {
        return locationAdv;
    }


    return { "msg": "SUCCESS", "data": obj };
}



// Exporting Module
module.exports = { coworkingOfficeSpace };



















// ::::::::::::::::::::::: OLD METHOD :::::::::::::::::::::::::::

// const xss = require("xss");


// function coworkingOfficeSpace(data) {

//     // --------------------------------- MAIN OBJECT ---------------------------------

//     // Main Object that will be saved in DB
//     let obj = {};



//     // Checking Looking For
//     if (!data.lookingFor) {
//         return { "msg": "ERROR", "error": "Missing Looking For" };
//     }
//     // Adding Looking For
//     obj.lookingFor = xss(data.lookingFor);


//     // Checking Property Group
//     if (!data.propertyGroup) {
//         return { "msg": "ERROR", "error": "Missing Property Group" };
//     }
//     // Adding Property Group
//     obj.propertyGroup = xss(data.propertyGroup);


//     // Checking Property Type
//     if (!data.propertyType) {
//         return { "msg": "ERROR", "error": "Missing Property Type" };
//     }
//     // Adding Property Type
//     obj.propertyType = xss(data.propertyType);



//     // Office Type
//     if (!data.officeType) {
//         return { "msg": "ERROR", "error": "Missing Office Type" };
//     }
//     // Adding Office Type
//     obj.officeType = xss(data.officeType);


//     // --------------------------------- ADDRESS STARTING ---------------------------------

//     // Checking if address object is present in the input from frontend
//     if (!data.address) {
//         return { "msg": "ERROR", "error": "Address Details not Present" };
//     }

//     // if present then creating a new address object that will be added in Main Object
//     let address = {};


//     // Checking Pincode
//     if (!data.address.pincode) {
//         return { "msg": "ERROR", "error": "Missing Pincode" };
//     }
//     // Adding Pincode
//     address.pincode = xss(data.address.pincode);


//     // Checking Locality
//     if (!data.address.locality) {
//         return { "msg": "ERROR", "error": "Missing Locality" };
//     }
//     // Adding Locality
//     address.locality = xss(data.address.locality);


//     // Checking City
//     if (!data.address.city) {
//         return { "msg": "ERROR", "error": "Missing City" };
//     }
//     // Adding City
//     address.city = xss(data.address.city);


//     // Checking State
//     if (!data.address.state) {
//         return { "msg": "ERROR", "error": "Missing State" };
//     }
//     // Adding State
//     address.state = xss(data.address.state);


//     // Checking Country
//     if (!data.address.country) {
//         return { "msg": "ERROR", "error": "Missing Country" };
//     }
//     // Adding Country
//     address.country = xss(data.address.country);


//     // Adding Address Object in Main Object
//     obj.address = address;

//     // --------------------------------- ADDRESS ENDING ---------------------------------


//     if (!data.washrooms) {
//         return { "msg": "ERROR", "error": "Missing Washrooms" };
//     }

//     obj.washrooms = xss(data.washrooms);

//     // Checking Carpet Area
//     if (data.carpetArea) {
//         return { "msg": "ERROR", "error": "Missing Carpet Area" };
//     }
//     // Adding Carpet Area
//     obj.carpetArea = Number(xss(data.carpetArea));

//     // Checking Carpet Area Unit
//     if (data.carpetAreaUnit) {
//         return { "msg": "ERROR", "error": "Missing Carpet Area Unit" };
//     }
//     // Adding Carpet Area Unit
//     obj.carpetAreaUnit = xss(data.carpetAreaUnit);


//     // Checking Plot Area
//     if (!data.plotArea) {
//         return { "msg": "ERROR", "error": "Missing Plot Area" };
//     }
//     // Adding Plot Area
//     obj.plotArea = Number(xss(data.plotArea));

//     // Checking Plot Area Unit
//     if (!data.plotAreaUnit) {
//         return { "msg": "ERROR", "error": "Missing Plot Area Unit" };
//     }
//     // Adding Plot Area Unit
//     obj.plotAreaUnit = xss(data.plotAreaUnit);


//     // Checking Builtup Area
//     if (data.builtupArea) {
//         obj.builtupArea = Number(xss(data.builtupArea));
//     }

//     // Checking Builtup Area Unit
//     if (data.builtupAreaUnit) {
//         obj.builtupAreaUnit = xss(data.builtupAreaUnit);
//     }



//     // Checking availabilityStatus
//     if (!data.availabilityStatus) {
//         return { "msg": "ERROR", "error": "Missing Availability Status" };
//     }
//     // Adding availabilityStatus
//     obj.availabilityStatus = xss(data.availabilityStatus);

//     if (data.availabilityStatus == "Ready to move") {
//         if (data.propertyStatus) {
//             obj.propertyStatus = xss(data.propertyStatus);
//         } else {
//             return { "msg": "ERROR", "error": "Missing Property Year Status" };
//         }
//     }

//     if (data.availabilityStatus == "Under construction") {
//         if (data.expectedByYear) {
//             obj.expectedByYear = xss(data.expectedByYear);
//         } else {
//             return { "msg": "ERROR", "error": "Missing Expected by Year" };
//         }
//     }





//     // Checking OwnerShip Type
//     if (!data.ownership) {
//         return { "msg": "ERROR", "error": "Missing Ownership" };
//     }
//     // Adding OwnerShip Type
//     obj.ownership = xss(data.ownership);


//     // Checking Property Price
//     if (!data.price) {
//         return { "msg": "ERROR", "error": "Missing Price" };
//     }
//     // Adding Property Price
//     obj.price = Number(xss(data.price));


//     // Checking Price Per Unit
//     if (!data.priceUnit) {
//         return { "msg": "ERROR", "error": "Missing Price Per Unit" };
//     }
//     // Adding Price Per Unit
//     obj.priceUnit = Number(xss(data.priceUnit));


//     if (data.additionalPricingDetails) {
//         let additionalPricingDetails = {};

//         additionalPricingDetails.maintenancePrice = Number(xss(data.additionalPricingDetails.maintenancePrice));
//         additionalPricingDetails.maintenanceTimePeriod = xss(data.additionalPricingDetails.maintenanceTimePeriod);
//         additionalPricingDetails.bookingAmount = Number(xss(data.additionalPricingDetails.bookingAmount));
//         additionalPricingDetails.annualDuesPayable = Number(xss(data.additionalPricingDetails.annualDuesPayable));

//         obj.additionalPricingDetails = additionalPricingDetails;
//     }

//     if (!data.preLeased_Rented) {
//         return { "msg": "ERROR", "error": "Missing Pre Leased / Pre Rented" };
//     }
//     obj.preLeased_Rented = xss(data.preLeased_Rented);


//     if (data.preLeased_Rented == "Yes") {
//         let preLeased_RentedDetails = {};

//         preLeased_RentedDetails.currentRentPerMonth = Number(xss(data.preLeased_RentedDetails.currentRentPerMonth));
//         preLeased_RentedDetails.leaseTenureInYear = Number(xss(data.preLeased_RentedDetails.leaseTenureInYear));
//         preLeased_RentedDetails.annualRentIncrease = Number(xss(data.preLeased_RentedDetails.annualRentIncrease));
//         preLeased_RentedDetails.businessType = xss(data.preLeased_RentedDetails.businessType);

//         obj.preLeased_RentedDetails = preLeased_RentedDetails;
//     } else {
//         obj.preLeased_RentedDetails = {};
//     }




//     // --------------------------------- INCLUSIVE PRICE ARRAY STARTING ---------------------------------


//     let inclusivePrices = [];

//     if (data.inclusivePrices.length) {
//         for (let a = 0; a < data.inclusivePrices.length; a++) {
//             inclusivePrices.push(xss(data.inclusivePrices[a]));
//         }
//     }

//     obj.inclusivePrices = inclusivePrices;


//     // --------------------------------- INCLUSIVE PRICE ARRAY ENDING ---------------------------------




//     // Checking Country Currency Code
//     if (!data.countryCurrency) {
//         return { "msg": "ERROR", "error": "Missing Country Currency Code" };
//     }
//     // Adding Country Currency Code
//     obj.countryCurrency = xss(data.countryCurrency);


//     // Checking Description
//     if (!data.description) {
//         return { "msg": "ERROR", "error": "Missing Description" };
//     }
//     // Adding Description
//     obj.description = xss(data.description);




//     // --------------------------------- AMENITIES ARRAY STARTING ---------------------------------


//     let amenities = [];

//     if (data.amenities.length) {
//         for (let a = 0; a < data.amenities.length; a++) {
//             amenities.push(xss(data.amenities[a]));
//         }
//     }

//     obj.amenities = amenities;


//     // --------------------------------- AMENITIES ARRAY ENDING ---------------------------------



//     // --------------------------------- PROPERTY FEATURES ARRAY STARTING ---------------------------------


//     let propertyFeatures = [];

//     if (data.propertyFeatures.length) {
//         for (let a = 0; a < data.propertyFeatures.length; a++) {
//             propertyFeatures.push(xss(data.propertyFeatures[a]));
//         }
//     }

//     obj.propertyFeatures = propertyFeatures;


//     // --------------------------------- PROPERTY FEATURES ARRAY ENDING ---------------------------------



//     // --------------------------------- SOCIETY / BUILDING FEATURES ARRAY STARTING ---------------------------------


//     let society_buildingFeatures = [];

//     if (data.society_buildingFeatures.length) {
//         for (let a = 0; a < data.society_buildingFeatures.length; a++) {
//             society_buildingFeatures.push(xss(data.society_buildingFeatures[a]));
//         }
//     }

//     obj.society_buildingFeatures = society_buildingFeatures;


//     // --------------------------------- SOCIETY / BUILDING FEATURES ARRAY ENDING ---------------------------------



//     // --------------------------------- ADDITIONAL FEATURES ARRAY STARTING ---------------------------------


//     let additionalFeatures = [];

//     if (data.additionalFeatures.length) {
//         for (let a = 0; a < data.additionalFeatures.length; a++) {
//             additionalFeatures.push(xss(data.additionalFeatures[a]));
//         }
//     }

//     obj.additionalFeatures = additionalFeatures;


//     // --------------------------------- ADDITIONAL FEATURES ARRAY ENDING ---------------------------------



//     // --------------------------------- OTHER FEATURES ARRAY STARTING ---------------------------------


//     let otherFeatures = [];

//     if (data.otherFeatures.length) {
//         for (let a = 0; a < data.otherFeatures.length; a++) {
//             otherFeatures.push(xss(data.otherFeatures[a]));
//         }
//     }

//     obj.otherFeatures = otherFeatures;


//     // --------------------------------- OTHER FEATURES ARRAY ENDING ---------------------------------




//     // --------------------------------- LOCATION ADVANTAGES ARRAY STARTING ---------------------------------


//     let locationAdv = [];

//     if (data.locationAdv.length) {
//         for (let a = 0; a < data.locationAdv.length; a++) {
//             locationAdv.push(xss(data.locationAdv[a]));
//         }
//     }

//     obj.locationAdv = locationAdv;


//     // --------------------------------- LOCATION ADVANTAGES ARRAY ENDING ---------------------------------






//     return { "msg": "SUCCESS", "data": obj };
// }


// module.exports = { coworkingOfficeSpace };
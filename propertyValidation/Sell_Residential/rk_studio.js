const component = require("../components");


function rk_studio(data) {

    // Main Object
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



    // --------------------------------- ADDRESS STARTING ---------------------------------

    // Checking Address
    if (!data.address) {
        return { "msg": "ERROR", "error": "Missing Address Detail Object" };
    }



    // Adding Address Data
    let address = {};



    // House Number ( Optional )
    let houseNumber = component.houseNumber(data.address.houseNumber);
    if (houseNumber.msg == "SUCCESS") {
        address.houseNumber = houseNumber.data;
    } else {
        return houseNumber;
    }



    // // Apartment Name ( Optional )
    let apartmentName = component.apartmentName(data.address.apartmentName);
    if (apartmentName.msg == "SUCCESS") {
        address.apartmentName = apartmentName.data;
    } else {
        return apartmentName;
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



    // --------------------------------- ROOM DETAILS STARTING ---------------------------------


    // Checking Room Details
    if (!data.roomDetails) {
        return { "msg": "ERROR", "error": "Room Details Data is not Present" }
    }



    // Adding Room Details
    let roomDetails = {};



    // Bedroom
    let bedroom = component.bedroom(data.roomDetails.bedroom);
    if (bedroom.msg == "SUCCESS") {
        roomDetails.bedroom = bedroom.data;
    } else {
        return bedroom;
    }



    // Bathroom
    let bathroom = component.bathroom(data.roomDetails.bathroom);
    if (bathroom.msg == "SUCCESS") {
        roomDetails.bathroom = bathroom.data;
    } else {
        return bathroom;
    }



    // Balcony
    let balcony = component.balcony(data.roomDetails.balcony);
    if (balcony.msg == "SUCCESS") {
        roomDetails.balcony = balcony.data;
    } else {
        return balcony;
    }

    obj.roomDetails = roomDetails;

    // --------------------------------- ROOM DETAILS ENDING ---------------------------------


    // ------------------ Area Details and Unit Details STARTING -----------------------------

    // Plot Area
    let plotArea = component.plotArea(data.plotArea);
    if (plotArea.msg == "SUCCESS") {
        obj.plotArea = plotArea.data;
    } else {
        return plotArea;
    }



    // Plot Area Unit
    let plotAreaUnit = component.plotAreaUnit(data.plotAreaUnit);
    if (plotAreaUnit.msg == "SUCCESS") {
        obj.plotAreaUnit = plotAreaUnit.data;
    } else {
        return plotAreaUnit;
    }



    // Carpet Area ( Optional )
    if (data.carpetArea && data.carpetAreaUnit) {
        let carpetArea = component.carpetArea(data.carpetArea);
        if (carpetArea.msg == "SUCCESS") {
            obj.carpetArea = carpetArea.data;
        } else {
            return carpetArea;
        }
    }



    // Carpet Area Unit ( Optional )
    if (data.carpetArea && data.carpetAreaUnit) {
        let carpetAreaUnit = component.carpetAreaUnit(data.carpetAreaUnit);
        if (carpetAreaUnit.msg == "SUCCESS") {
            obj.carpetAreaUnit = carpetAreaUnit.data;
        } else {
            return carpetAreaUnit;
        }
    }



    // Builtup Area ( Optional )
    if (data.builtupArea && data.builtupAreaUnit) {
        let builtupArea = component.builtupArea(data.builtupArea);
        if (builtupArea.msg == "SUCCESS") {
            obj.builtupArea = builtupArea.data;
        } else {
            return builtupArea;
        }
    }



    // Builtup Area Unit ( Optional )
    if (data.builtupArea && data.builtupAreaUnit) {
        let builtupAreaUnit = component.builtupAreaUnit(data.builtupAreaUnit);
        if (builtupAreaUnit.msg == "SUCCESS") {
            obj.builtupAreaUnit = builtupAreaUnit.data;
        } else {
            return builtupAreaUnit;
        }
    }



    // Super Builtup Area ( Optional )
    if (data.superBuiltupArea && data.superBuiltupAreaUnit) {
        let superBuiltupArea = component.superBuiltupArea(data.superBuiltupArea);
        if (superBuiltupArea.msg == "SUCCESS") {
            obj.superBuiltupArea = superBuiltupArea.data;
        } else {
            return superBuiltupArea;
        }
    }



    // Super Builtup Area Unit ( Optional )
    if (data.superBuiltupArea && data.superBuiltupAreaUnit) {
        let superBuiltupAreaUnit = component.superBuiltupAreaUnit(data.superBuiltupAreaUnit);
        if (superBuiltupAreaUnit.msg == "SUCCESS") {
            obj.superBuiltupAreaUnit = superBuiltupAreaUnit.data;
        } else {
            return superBuiltupAreaUnit;
        }
    }

    // ------------------ Area Details and Unit Details ENDING -----------------------------


    // Other Room ( Optional )
    let otherRoom = component.otherRoom(data.otherRoom || []);
    if (otherRoom.msg == "SUCCESS") {
        obj.otherRoom = otherRoom.data;
    } else {
        return otherRoom;
    }


    // Furnished
    let furnished = component.furnished({ "type": data.furnished, "list": data.furnishedList, "obj": data.furnishedObj });
    if (furnished.msg == "SUCCESS") {
        obj.furnished = furnished.furnished;
        obj.furnishedList = furnished.furnishedList;
        obj.furnishedObj = furnished.furnishedObj;
    } else {
        return furnished;
    }


    // Parking
    let parking = component.parking(data.parking);
    if (parking.msg == "SUCCESS") {
        obj.parking = parking.parking;
    } else {
        return parking;
    }


    // Total Floors
    let totalFloors = component.totalFloors(data.totalFloors);
    if (totalFloors.msg == "SUCCESS") {
        obj.totalFloors = totalFloors.data;
    } else {
        return totalFloors;
    }


    // Floor Number
    let floorOn = component.floorOn(data.floorOn, data.totalFloors);
    if (floorOn.msg == "SUCCESS") {
        obj.floorOn = floorOn.data;
    } else {
        return floorOn;
    }



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



    // Country Currency
    let countryCurrency = component.countryCurrency(data.countryCurrency);
    if (countryCurrency.msg == "SUCCESS") {
        obj.countryCurrency = countryCurrency.data;
    } else {
        return countryCurrency;
    }



    // Inclusive Prices ( Optional )
    let inclusivePrices = component.inclusivePrices(data.inclusivePrices);
    if (inclusivePrices.msg == "SUCCESS") {
        obj.inclusivePrices = inclusivePrices.data;
    } else {
        return inclusivePrices;
    }



    // Additional Pricing Details ( Optional )
    let additionalPricingDetails = component.additionalPricingDetails(data.additionalPricingDetails);
    if (additionalPricingDetails.msg == "SUCCESS") {
        obj.additionalPricingDetails = additionalPricingDetails.data;
    } else {
        return additionalPricingDetails;
    }


    // Description
    let description = component.description(data.description);
    if (description.msg == "SUCCESS") {
        obj.description = description.data;
    } else {
        return description;
    }


    // Amenities ( Optional )
    if (data.amenities) {
        const list = ["Maintenance Staff", "Water Storage", "Security / Fire Alarm", "Security Personnel", "Visitor Parking", "Park", "Feng Shui / Vaastu Compliant", "Lift"];
        let amenities = component.amenities({ "data": data.amenities, list })
        if (amenities.msg == "SUCCESS") {
            obj.amenities = amenities.data;
        } else {
            return amenities;
        }
    }


    // Property Features ( Optional )
    if (data.propertyFeatures) {
        const list = ["High Ceiling Height", "False Ceiling Lighting", "Piped-gas", "Water purifier", "Internet / wi-fi connectivity", "Intercom Facility", "Centrally Air Conditioned", "Recently Renovated", "Private Garden / Terrace", "Natural Light", "Airy Roooms", "Spacious Interiors"];
        let propertyFeatures = component.propertyFeatures({ "data": data.propertyFeatures, list })
        if (propertyFeatures.msg == "SUCCESS") {
            obj.propertyFeatures = propertyFeatures.data;
        } else {
            return propertyFeatures;
        }
    }


    // Society / Building Features ( Optional )
    if (data.society_buildingFeatures) {
        const list = ["Water softening plant", "Fitness Centre / GYM", "Swimming Pool", "Club house / Community Center", "Shopping Centre"];
        let society_buildingFeatures = component.society_buildingFeatures({ "data": data.society_buildingFeatures, list })
        if (society_buildingFeatures.msg == "SUCCESS") {
            obj.society_buildingFeatures = society_buildingFeatures.data;
        } else {
            return society_buildingFeatures;
        }
    }


    // Additional Features ( Optional )
    if (data.additionalFeatures) {
        const list = ["Separate entry for servant room", "Waste Disposal", "Rain Water Harvesting", "No open drainage around", "Bank Attached Property", "Low Density Society"];
        let additionalFeatures = component.additionalFeatures({ "data": data.additionalFeatures, list })
        if (additionalFeatures.msg == "SUCCESS") {
            obj.additionalFeatures = additionalFeatures.data;
        } else {
            return additionalFeatures;
        }
    }


    // Water Sources ( Optional )
    if (data.waterSources) {
        let waterSources = component.waterSources(data.waterSources)
        if (waterSources.msg == "SUCCESS") {
            obj.waterSources = waterSources.data;
        } else {
            return waterSources;
        }
    }


    // Overlookings ( Optional )
    if (data.overLookings) {
        let list = ["Pool", "Park / Garden", "Club", "Main Road", "Other"];
        let overLookings = component.overLookings({ "data": data.overLookings, list })
        if (overLookings.msg == "SUCCESS") {
            obj.overLookings = overLookings.data;
        } else {
            return overLookings;
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


    // Power Backup
    let powerBackup = component.powerBackup(data.powerBackup)
    if (powerBackup.msg == "SUCCESS") {
        obj.powerBackup = powerBackup.data;
    } else {
        return powerBackup;
    }


    // Property Facing
    let propertyFacing = component.propertyFacing(data.propertyFacing)
    if (propertyFacing.msg == "SUCCESS") {
        obj.propertyFacing = propertyFacing.data;
    } else {
        return propertyFacing;
    }


    // Property Flooring Type
    let flooring = component.flooring(data.flooring)
    if (flooring.msg == "SUCCESS") {
        obj.flooring = flooring.data;
    } else {
        return flooring;
    }



    // Road Facing Width
    let roadFacingWidth = component.roadFacingWidth(data.roadFacingWidth)
    if (roadFacingWidth.msg == "SUCCESS") {
        obj.roadFacingWidth = roadFacingWidth.data;
    } else {
        return roadFacingWidth;
    }



    // Road Facing Width Type
    let roadFacingWidthType = component.roadFacingWidthType(data.roadFacingWidthType)
    if (roadFacingWidthType.msg == "SUCCESS") {
        obj.roadFacingWidthType = roadFacingWidthType.data;
    } else {
        return roadFacingWidthType;
    }



    // Property Location Advantages ( Optional )
    let locationAdv = component.locationAdv(data.locationAdv)
    if (locationAdv.msg == "SUCCESS") {
        obj.locationAdv = locationAdv.data;
    } else {
        return locationAdv;
    }


    return { "msg": "SUCCESS", "data": obj };
};



// Exporting Module
module.exports = { rk_studio };



















// ::::::::::::::::::::::: OLD METHOD :::::::::::::::::::::::::::


// const xss = require("xss");


// function rk_studio(data) {

//     // --------------------------------- MAIN OBJECT ---------------------------------

//     // Main Object that will be saved in DB
//     let obj = {};



//     // --------------------------------- ADDRESS STARTING ---------------------------------

//     // Checking if address object is present in the input from frontend
//     if (!data.address) {
//         return { "msg": "ERROR", "error": "Address Details not Present" };
//     }

//     // if present then creating a new address object that will be added in Main Object
//     let address = {};



//     // Checking House Number
//     if (data.address.houseNumber) {
//         // Adding House Number
//         address.houseNumber = xss(data.address.houseNumber);
//     }


//     // Checking Apartment Name
//     if (data.address.apartmentName) {
//         // Adding Apartment Name
//         address.apartmentName = xss(data.address.apartmentName);
//     }


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




//     // --------------------------------- ROOM DETAILS STARTING ---------------------------------


//     // Checking if roomDetails Object is not present
//     if (!data.roomDetails) {
//         return { "msg": "ERROR", "error": "Room Details Data is not Present" }
//     }

//     // if present then creating a new roomDetails object that will be added in Main Object
//     let roomDetails = {};


//     // Checking Bedroom Counts
//     if (!data.roomDetails.bedroom) {
//         return { "msg": "ERROR", "error": "Missing Bedrooms Quantity" };
//     }
//     // Adding Bedroom Counts
//     roomDetails.bedroom = Number(xss(data.roomDetails.bedroom));


//     // Checking Bathroom Counts
//     if (!data.roomDetails.bathroom) {
//         return { "msg": "ERROR", "error": "Missing Bathrooms Quantity" };
//     }
//     // Adding Bathroom Counts
//     roomDetails.bathroom = Number(xss(data.roomDetails.bathroom));


//     // Checking Balcony Counts
//     if (!data.roomDetails.balcony) {
//         return { "msg": "ERROR", "error": "Missing Balconies Quantity" };
//     }
//     // Adding Balcony Counts
//     roomDetails.balcony = Number(xss(data.roomDetails.balcony));

//     obj.roomDetails = roomDetails;

//     // --------------------------------- ROOM DETAILS ENDING ---------------------------------




//     // Checking Looking For
//     if (!data.lookingFor) {
//         return { "msg": "ERROR", "error": "Missing looking For" };
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



//     // --------------------------------- INCLUSIVE PRICE ARRAY STARTING ---------------------------------


//     let inclusivePrices = [];

//     if (data.inclusivePrices.length) {
//         for (let a = 0; a < data.inclusivePrices.length; a++) {
//             inclusivePrices.push(xss(data.inclusivePrices[a]));
//         }
//     }

//     obj.inclusivePrices = inclusivePrices;


//     // --------------------------------- INCLUSIVE PRICE ARRAY ENDING ---------------------------------



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






//     // --------------------------------- WATER SOURCES ARRAY STARTING ---------------------------------


//     let waterSources = [];

//     if (data.waterSources.length) {
//         for (let a = 0; a < data.waterSources.length; a++) {
//             waterSources.push(xss(data.waterSources[a]));
//         }
//     }

//     obj.waterSources = waterSources;


//     // --------------------------------- WATER SOURCES ARRAY ENDING ---------------------------------





//     // --------------------------------- OTHER FEATURES ARRAY STARTING ---------------------------------


//     let otherFeatures = [];

//     if (data.otherFeatures.length) {
//         for (let a = 0; a < data.otherFeatures.length; a++) {
//             otherFeatures.push(xss(data.otherFeatures[a]));
//         }
//     }

//     obj.otherFeatures = otherFeatures;


//     // --------------------------------- OTHER FEATURES ARRAY ENDING ---------------------------------





//     // --------------------------------- OVER LOOKINGS ARRAY STARTING ---------------------------------


//     let overLookings = [];

//     if (data.overLookings.length) {
//         for (let a = 0; a < data.overLookings.length; a++) {
//             overLookings.push(xss(data.overLookings[a]));
//         }
//     }

//     obj.overLookings = overLookings;


//     // --------------------------------- OVER LOOKINGS ARRAY ENDING ---------------------------------



//     // --------------------------------- LOCATION ADVANTAGES ARRAY STARTING ---------------------------------


//     let locationAdv = [];

//     if (data.locationAdv.length) {
//         for (let a = 0; a < data.locationAdv.length; a++) {
//             locationAdv.push(xss(data.locationAdv[a]));
//         }
//     }

//     obj.locationAdv = locationAdv;


//     // --------------------------------- LOCATION ADVANTAGES ARRAY ENDING ---------------------------------



//     // --------------------------------- FURNISHED LIST ARRAY STARTING ---------------------------------

//     if (data.furnished) {
//         obj.furnished = xss(data.furnished);


//         if (obj.furnished == "Furnished" || obj.furnished == "Semi-Furnished") {

//             let furnishedList = [];

//             if (data.furnishedList.length) {
//                 for (let a = 0; a < data.furnishedList.length; a++) {
//                     furnishedList.push(xss(data.furnishedList[a]));
//                 }
//             }

//             obj.furnishedList = furnishedList;

//             let furnishedObj = {};

//             furnishedObj.light = Number(xss(data.furnishedObj.light));
//             furnishedObj.fans = Number(xss(data.furnishedObj.fans));
//             furnishedObj.ac = Number(xss(data.furnishedObj.ac));
//             furnishedObj.tv = Number(xss(data.furnishedObj.tv));
//             furnishedObj.beds = Number(xss(data.furnishedObj.beds));
//             furnishedObj.wardrobe = Number(xss(data.furnishedObj.wardrobe));
//             furnishedObj.geyser = Number(xss(data.furnishedObj.geyser));

//             obj.furnishedObj = furnishedObj;
//         } else {
//             obj.furnishedList = [];
//             obj.furnishedObj = {};
//         }
//     }



//     // --------------------------------- FURNISHED LIST ARRAY ENDING ---------------------------------



//     // --------------------------------- OTHER ROOMS ARRAY STARTING ---------------------------------


//     let otherRoom = [];

//     if (data.otherRoom.length) {
//         for (let a = 0; a < data.otherRoom.length; a++) {
//             otherRoom.push(xss(data.otherRoom[a]));
//         }
//     }

//     obj.otherRoom = otherRoom;


//     // --------------------------------- OTHER ROOMS ARRAY ENDING ---------------------------------



//     // --------------------------------- PARKING OBJECT STARTING ---------------------------------


//     // Checking if parking object is present in the input from frontend
//     if (!data.parking) {
//         return { "msg": "ERROR", "error": "Missing Parking Details" };
//     }

//     // if present then creating a new parking object that will be added in Main Object
//     let parking = {};


//     // Checking Open Parking
//     if (data.parking.openParking) {
//         parking.openParking = Number(xss(data.parking.openParking));
//     }



//     // Checking Close Parking
//     if (data.parking.closeParking) {
//         parking.closeParking = Number(xss(data.parking.closeParking));
//     }

//     obj.parking = parking;



//     // --------------------------------- PARKING OBJECT ENDING ---------------------------------







//     // Checking Power Backup
//     if (!data.powerBackup) {
//         return { "msg": "ERROR", "error": "Missing Power Backup Details" };
//     }
//     // Adding Power Backup
//     obj.powerBackup = xss(data.powerBackup);


//     // Checking Property Facing (Direction of Property)
//     if (!data.propertyFacing) {
//         return { "msg": "ERROR", "error": "Missing Property Facing Direction" };
//     }
//     // Adding Property Facing
//     obj.propertyFacing = xss(data.propertyFacing);


//     // Checking Property Flooring Type
//     if (!data.flooring) {
//         return { "msg": "ERROR", "error": "Missing Property Flooring Type" };
//     }
//     // Adding Property Flooring Type
//     obj.flooring = xss(data.flooring);



//     // Checking Main Road Width
//     if (!data.roadFacingWidth) {
//         return { "msg": "ERROR", "error": "Missing Main Road Width" };
//     }
//     // Adding Main Road Width
//     obj.roadFacingWidth = Number(Number(xss(data.roadFacingWidth)));


//     // Checking Main Road Width Type
//     if (!data.roadFacingWidthType) {
//         return { "msg": "ERROR", "error": "Missing Main Road Width Type" };
//     }
//     // Adding Main Road Width Type
//     obj.roadFacingWidthType = xss(data.roadFacingWidthType);


//     // Checking Missing Total Floors
//     if (!data.totalFloors) {
//         return { "msg": "ERROR", "error": "Missing Total Floors" };
//     }
//     // Adding Missing Total Floors
//     obj.totalFloors = Number(xss(data.totalFloors));


//     // Checking which Floor Number is Going to sell
//     if (!data.floorOn) {
//         return { "msg": "ERROR", "error": "Missing Property Floor Number" };
//     }
//     // Adding Floor Number
//     obj.floorOn = xss(data.floorOn);


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


//     // Adding Builtup Area
//     if (data.builtupArea) {
//         obj.builtupArea = Number(xss(data.builtupArea));
//     }

//     // Adding Builtup Area Unit
//     if (data.builtupAreaUnit) {
//         obj.builtupAreaUnit = xss(data.builtupAreaUnit);
//     }


//     // Adding Super Builtup Area
//     if (data.superBuiltupArea) {
//         obj.superBuiltupArea = Number(xss(data.superBuiltupArea));
//     }

//     // Adding Super Builtup Area Unit
//     if (data.superBuiltupAreaUnit) {
//         obj.superBuiltupAreaUnit = xss(data.superBuiltupAreaUnit);
//     }


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

//     if (data.additionalPricingDetails) {
//         let additionalPricingDetails = {};

//         additionalPricingDetails.maintenancePrice = Number(xss(data.additionalPricingDetails.maintenancePrice));
//         additionalPricingDetails.maintenanceTimePeriod = xss(data.additionalPricingDetails.maintenanceTimePeriod);
//         additionalPricingDetails.bookingAmount = Number(xss(data.additionalPricingDetails.bookingAmount));
//         additionalPricingDetails.annualDuesPayable = Number(xss(data.additionalPricingDetails.annualDuesPayable));
//         additionalPricingDetails.membershipCharge = Number(xss(data.additionalPricingDetails.membershipCharge));

//         obj.additionalPricingDetails = additionalPricingDetails;
//     }

//     return { "msg": "SUCCESS", "data": obj };
// }


// module.exports = { rk_studio };
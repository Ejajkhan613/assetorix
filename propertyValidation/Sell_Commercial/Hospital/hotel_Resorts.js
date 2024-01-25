const component = require("../components");


function hotel_Resorts(data) {

    // --------------------------------- MAIN OBJECT ---------------------------------

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



    // Hospitality Type
    let hospitalityType = component.hospitalityType(data.hospitalityType);
    if (hospitalityType.msg == "SUCCESS") {
        obj.hospitalityType = hospitalityType.data;
    } else {
        return hospitalityType;
    }



    // --------------------------------- ADDRESS STARTING ---------------------------------

    // Checking Address
    if (!data.address) {
        return { "msg": "ERROR", "error": "Missing Address Detail Object" };
    }

    // Adding Address Data
    let address = {};

    // Address ( Optional )
    let propertyAddress = component.address(data.address.address);
    if (propertyAddress.msg == "SUCCESS") {
        address.address = propertyAddress.data;
    } else {
        return propertyAddress;
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


    // Rooms
    let totalRooms = component.rooms(data.roomDetails.rooms);
    if (totalRooms.msg == "SUCCESS") {
        roomDetails.rooms = totalRooms.data;
    } else {
        return totalRooms;
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


    // Washrooms
    let washrooms = component.washrooms(data.roomDetails.washrooms);
    if (washrooms.msg == "SUCCESS") {
        roomDetails.washrooms = washrooms.data;
    } else {
        return washrooms;
    }



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



    // Carpet Area
    if (data.carpetArea && data.carpetAreaUnit) {
        let carpetArea = component.carpetArea(data.carpetArea);
        if (carpetArea.msg == "SUCCESS") {
            obj.carpetArea = carpetArea.data;
        } else {
            return carpetArea;
        }
    }



    // Carpet Area Unit
    if (data.carpetArea && data.carpetAreaUnit) {
        let carpetAreaUnit = component.carpetAreaUnit(data.carpetAreaUnit);
        if (carpetAreaUnit.msg == "SUCCESS") {
            obj.carpetAreaUnit = carpetAreaUnit.data;
        } else {
            return carpetAreaUnit;
        }
    }



    // Builtup Area
    if (data.builtupArea && data.builtupAreaUnit) {
        let builtupArea = component.builtupArea(data.builtupArea);
        if (builtupArea.msg == "SUCCESS") {
            obj.builtupArea = builtupArea.data;
        } else {
            return builtupArea;
        }
    }



    // Builtup Area Unit
    if (data.builtupArea && data.builtupAreaUnit) {
        let builtupAreaUnit = component.builtupAreaUnit(data.builtupAreaUnit);
        if (builtupAreaUnit.msg == "SUCCESS") {
            obj.builtupAreaUnit = builtupAreaUnit.data;
        } else {
            return builtupAreaUnit;
        }
    }


    // ------------------ Area Details and Unit Details ENDING -----------------------------



    // Other Room
    let otherRoom = component.otherRoom(data.otherRoom || []);
    if (otherRoom.msg == "SUCCESS") {
        obj.otherRoom = otherRoom.data;
    } else {
        return otherRoom;
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


    // Quality Rating Type
    let qualityRating = component.qualityRating(data.qualityRating);
    if (qualityRating.msg == "SUCCESS") {
        obj.qualityRating = qualityRating.data;
    } else {
        return qualityRating;
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

    // Furnished
    let furnished = component.furnished({ "type": data.furnished, "list": data.furnishedList, "obj": data.furnishedObj });
    if (furnished.msg == "SUCCESS") {
        obj.furnished = furnished.furnished;
        obj.furnishedList = furnished.furnishedList;
        obj.furnishedObj = furnished.furnishedObj;
    } else {
        return furnished;
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
        const list = ["Access to High Speed Internet", "Waste Disposal", "Water Storage", "Security / Fire Alarm", "Bar / Lounge", "Conference room", "Club house / Community Center", "Intercom Facility", "Lift"];
        let amenities = component.amenities({ "data": data.amenities, list })
        if (amenities.msg == "SUCCESS") {
            obj.amenities = amenities.data;
        } else {
            return amenities;
        }
    }



    // Property Features
    if (data.propertyFeatures) {
        const list = ["Centrally Air Conditioned", "Near Bank", "Power Back-up", "Reserved Parking", "Feng Shui / Vaastu Compliant"];
        let propertyFeatures = component.propertyFeatures({ "data": data.propertyFeatures, list })
        if (propertyFeatures.msg == "SUCCESS") {
            obj.propertyFeatures = propertyFeatures.data;
        } else {
            return propertyFeatures;
        }
    }




    // Society / Building Features
    if (data.society_buildingFeatures) {
        const list = ["Maintenance Staff", "Shopping Centre", "Fitness Centre / GYM", "WheelChair Accessibilitiy", "DG Availability", "CCTV surveillance", "Grade A Building", "Grocery Shop", "Visitor Parking", "Swimming Pool", "Security Personnel"];
        let society_buildingFeatures = component.society_buildingFeatures({ "data": data.society_buildingFeatures, list })
        if (society_buildingFeatures.msg == "SUCCESS") {
            obj.society_buildingFeatures = society_buildingFeatures.data;
        } else {
            return society_buildingFeatures;
        }
    }


    // Additional Features
    if (data.additionalFeatures) {
        const list = ["Rain Water Harvesting", "Bank Attached Property"];
        let additionalFeatures = component.additionalFeatures({ "data": data.additionalFeatures, list })
        if (additionalFeatures.msg == "SUCCESS") {
            obj.additionalFeatures = additionalFeatures.data;
        } else {
            return additionalFeatures;
        }
    }


    // Other Features
    if (data.otherFeatures) {
        let list = ["Wheelchair friendly"];
        let otherFeatures = component.otherFeatures({ "data": data.otherFeatures, list })
        if (otherFeatures.msg == "SUCCESS") {
            obj.otherFeatures = otherFeatures.data;
        } else {
            return otherFeatures;
        }
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




    // Property Location Advantages
    let locationAdv = component.locationAdv(data.locationAdv)
    if (locationAdv.msg == "SUCCESS") {
        obj.locationAdv = locationAdv.data;
    } else {
        return locationAdv;
    }

    return { "msg": "SUCCESS", "data": obj };
}


module.exports = { hotel_Resorts };












// const xss = require("xss");


// function hotel_Resorts(data) {
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


//     // Hospitality Type
//     if (!data.hospitalityType) {
//         return { "msg": "ERROR", "error": "Missing Hospitality Type" };
//     }
//     // Adding Hospitality Type
//     obj.hospitalityType = xss(data.hospitalityType);




//     // --------------------------------- ADDRESS STARTING ---------------------------------

//     // Checking if address object is present in the input from frontend
//     if (!data.address) {
//         return { "msg": "ERROR", "error": "Address Details not Present" };
//     }

//     // if present then creating a new address object that will be added in Main Object
//     let address = {};

//     // Checking address
//     if (data.address.address) {
//         address.address = xss(data.address.address);
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



//     // Checking Bathroom Counts
//     if (!data.roomDetails.rooms) {
//         return { "msg": "ERROR", "error": "Missing Rooms Quantity" };
//     }
//     // Adding Bathroom Counts
//     roomDetails.rooms = Number(xss(data.roomDetails.rooms));


//     // Checking Balcony Counts
//     if (!data.roomDetails.balcony) {
//         return { "msg": "ERROR", "error": "Missing Balconies Quantity" };
//     }
//     // Adding Balcony Counts
//     roomDetails.balcony = Number(xss(data.roomDetails.balcony));

//     obj.roomDetails = roomDetails;

//     // --------------------------------- ROOM DETAILS ENDING ---------------------------------



//     if (!data.washrooms) {
//         return { "msg": "ERROR", "error": "Missing Washroom Detail" };
//     }

//     obj.washrooms = xss(data.washrooms);



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



//     // Checking Carpet Area
//     if (data.carpetArea) {
//         obj.carpetArea = Number(xss(data.carpetArea));
//     }

//     // Checking Carpet Area Unit
//     if (data.carpetAreaUnit) {
//         obj.carpetAreaUnit = xss(data.carpetAreaUnit);
//     }


//     // Checking Builtup Area
//     if (data.builtupArea) {
//         obj.builtupArea = Number(xss(data.builtupArea));
//     }

//     // Checking Builtup Area Unit
//     if (data.builtupAreaUnit) {
//         obj.builtupAreaUnit = xss(data.builtupAreaUnit);
//     }




//     // --------------------------------- OTHER ROOMS ARRAY STARTING ---------------------------------


//     let otherRoom = [];

//     if (data.otherRoom.length) {
//         for (let a = 0; a < data.otherRoom.length; a++) {
//             otherRoom.push(xss(data.otherRoom[a]));
//         }
//     }

//     obj.otherRoom = otherRoom;


//     // --------------------------------- OTHER ROOMS ARRAY ENDING ---------------------------------


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


//     // Checking quality Rating
//     if (!data.qualityRating) {
//         return { "msg": "ERROR", "error": "Missing Quality Rating" };
//     }
//     // Adding quality Rating
//     obj.qualityRating = xss(data.qualityRating);




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






//     // --------------------------------- INCLUSIVE PRICE ARRAY STARTING ---------------------------------


//     let inclusivePrices = [];

//     if (data.inclusivePrices.length) {
//         for (let a = 0; a < data.inclusivePrices.length; a++) {
//             inclusivePrices.push(xss(data.inclusivePrices[a]));
//         }
//     }

//     obj.inclusivePrices = inclusivePrices;


//     // --------------------------------- INCLUSIVE PRICE ARRAY ENDING ---------------------------------



//     if (data.additionalPricingDetails) {
//         let additionalPricingDetails = {};

//         additionalPricingDetails.maintenancePrice = Number(xss(data.additionalPricingDetails.maintenancePrice));
//         additionalPricingDetails.maintenanceTimePeriod = xss(data.additionalPricingDetails.maintenanceTimePeriod);
//         additionalPricingDetails.expectedRental = Number(xss(data.additionalPricingDetails.expectedRental));
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


// module.exports = { hotel_Resorts };
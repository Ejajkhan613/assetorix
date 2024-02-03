const component = require("../../components");


// Function
function bareShellOfficeSpace(data) {

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



    // Construction Status Of Walls
    let constructionStatusOfWalls = component.constructionStatusOfWalls(data.wallStatus);
    if (constructionStatusOfWalls.msg == "SUCCESS") {
        obj.wallStatus = constructionStatusOfWalls.data;
    } else {
        return constructionStatusOfWalls;
    }



    // Are Doors Constructed
    let areDoorsConstructed = component.areDoorsConstructed(data.doorStatus);
    if (areDoorsConstructed.msg == "SUCCESS") {
        obj.doorStatus = areDoorsConstructed.data;
    } else {
        return areDoorsConstructed;
    }



    // Washroom details with private and shared washrooms
    let washroomDetails = component.washroomDetails({"washrooms":data.washrooms, "washroomDetails": data.washroomDetails});
    if (washroomDetails.msg == "SUCCESS") {
        obj.washrooms = washroomDetails.data;
        if (washroomDetails.washroomDetails) {
            obj.washroomDetails = washroomDetails.washroomDetails;
        }
    } else {
        return washroomDetails;
    }



    // Pantry Type
    let pantryType = component.pantryType(data.pantryType, data.pantrySize || "", data.pantrySizeUnit || "");
    if (pantryType.msg == "SUCCESS") {
        obj.pantryType = pantryType.pantryType;
        if (pantryType.pantrySize) {
            obj.pantrySize = pantryType.pantrySize;
        }
        if (pantryType.pantrySizeUnit) {
            obj.pantrySizeUnit = pantryType.pantrySizeUnit;
        }
    } else {
        return pantryType;
    }



    // Property Flooring Type
    let flooring = component.flooring(data.flooring)
    if (flooring.msg == "SUCCESS") {
        obj.flooring = flooring.data;
    } else {
        return flooring;
    }



    // Facility Available
    let facilityAvailable = component.facilityAvailable(data.facilityAvailable)
    if (facilityAvailable.msg == "SUCCESS") {
        obj.facilityAvailable = facilityAvailable.data;
    } else {
        return facilityAvailable;
    }



    // Fire Safety
    let fireSafety = component.fireSafety(data.fireSafety);
    if (fireSafety.msg == "SUCCESS") {
        obj.fireSafety = fireSafety.data;
    } else {
        return fireSafety;
    }



    // Total Floors
    let totalFloors = component.totalFloors(data.totalFloors);
    if (totalFloors.msg == "SUCCESS") {
        obj.totalFloors = totalFloors.data;
    } else {
        return totalFloors;
    }



    // Floor On
    let multiFloorOn = component.multiFloorOn(data.floorOn, data.totalFloors);
    if (multiFloorOn.msg == "SUCCESS") {
        obj.floorOn = multiFloorOn.data;
    } else {
        return multiFloorOn;
    }



    // Number of Staircases (Optional)
    let staircases = component.staircases(data.staircases);
    if (staircases.msg == "SUCCESS") {
        obj.staircases = staircases.data;
    } else {
        return staircases;
    }



    // Lift with passenger, Service and Modern Lifts Detail
    let liftWithPassengerServiceModern = component.liftWithPassengerServiceModern(data.lift, data.liftDetails || {});
    if (liftWithPassengerServiceModern.msg == "SUCCESS") {
        obj.lift = liftWithPassengerServiceModern.lift;

        if (liftWithPassengerServiceModern.liftDetails) {
            obj.liftDetails = liftWithPassengerServiceModern.liftDetails;
        }
        // Missing Modern Lifts Here (Add it at the time of testing)
    }



    // Parking with Private parking in Basement, Private parking outside, Public parking
    let parkingWithPrivatePublic = component.parkingWithPrivatePublic(data.parking, data.parkingDetailsList || [], data.parkingCount || 0);
    if (parkingWithPrivatePublic.msg == "SUCCESS") {
        obj.parking = parkingWithPrivatePublic.data;

        if (parkingWithPrivatePublic.parkingDetailsList) {
            obj.parkingDetailsList = parkingWithPrivatePublic.parkingDetailsList;
        }

        if (parkingWithPrivatePublic.parkingCount) {
            obj.parkingCount = parkingWithPrivatePublic.parkingCount;
        }
    } else {
        return parkingWithPrivatePublic;
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



    // Is your office fire NOC Certified
    let NOC = component.NOC(data.noc);
    if (NOC.msg == "SUCCESS") {
        obj.noc = NOC.data;
    } else {
        return NOC;
    }



    // Occupancy Certificate
    let occupancy = component.occupancy(data.occupancy);
    if (occupancy.msg == "SUCCESS") {
        obj.occupancy = occupancy.data;
    } else {
        return occupancy;
    }



    // Your office was previously used for (Optional)
    let previouslyUsedList = component.previouslyUsedList(data.previouslyUsedList);
    if (previouslyUsedList.msg == "SUCCESS") {
        obj.previouslyUsedList = previouslyUsedList.data;
    } else {
        return previouslyUsedList;
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



    // Property Location Advantages
    let locationAdv = component.locationAdv(data.locationAdv)
    if (locationAdv.msg == "SUCCESS") {
        obj.locationAdv = locationAdv.data;
    } else {
        return locationAdv;
    }


    return { "msg": "SUCCESS", "data": obj };
}



// Exporting Module
module.exports = { bareShellOfficeSpace };



















// ::::::::::::::::::::::: OLD METHOD :::::::::::::::::::::::::::

// const xss = require("xss");


// function bareShellOfficeSpace(data) {

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



//     // Checking Carpet Area
//     if (!data.carpetArea) {
//         return { "msg": "ERROR", "error": "Missing Carpet Area" };
//     }
//     // Adding Carpet Area
//     obj.carpetArea = Number(xss(data.carpetArea));

//     // Checking Carpet Area Unit
//     if (!data.carpetAreaUnit) {
//         return { "msg": "ERROR", "error": "Missing Carpet Area Unit" };
//     }
//     // Adding Carpet Area Unit
//     obj.carpetAreaUnit = xss(data.carpetAreaUnit);


//     // Checking Super Builtup Area
//     if (data.superBuiltupArea) {
//         obj.superBuiltupArea = Number(xss(data.superBuiltupArea));
//     }

//     // Checking Super Builtup Area Unit
//     if (data.superBuiltupAreaUnit) {
//         obj.superBuiltupAreaUnit = xss(data.superBuiltupAreaUnit);
//     }


//     // Checking Construction Status of Walls
//     if (!data.wallStatus) {
//         return { "msg": "ERROR", "error": "Missing Status of Walls" };
//     }
//     // Adding Construction Status of Walls
//     obj.wallStatus = xss(data.wallStatus);


//     // Checking Doors Status
//     if (!data.doorStatus) {
//         return { "msg": "ERROR", "error": "Missing Construction of Doors" };
//     }
//     // Adding Doors Status
//     obj.doorStatus = xss(data.doorStatus);



//     // --------------------------------- WASHROOM DETAILS STARTING ---------------------------------

//     if (!data.washrooms) {
//         return { "msg": "ERROR", "error": "Missing Washrooms" };
//     }

//     obj.washrooms = xss(data.washrooms);


//     if (data.washrooms == "Available") {
//         let washroomDetails = {};

//         if (!data.washroomDetails.privateWashrooms) {
//             return { "msg": "ERROR", "error": "Missing Number of Private Washrooms" };
//         }
//         washroomDetails.privateWashrooms = Number(xss(data.washroomDetails.privateWashrooms));

//         if (!data.washroomDetails.sharedWashrooms) {
//             return { "msg": "ERROR", "error": "Missing Number of Shared Washrooms" };
//         }
//         washroomDetails.sharedWashrooms = Number(xss(data.washroomDetails.sharedWashrooms));
//         obj.washroomDetails = washroomDetails;
//     }

//     // --------------------------------- WASHROOM DETAILS ENDING ---------------------------------



//     // Pantry Type
//     if (!data.pantryType) {
//         return { "msg": "ERROR", "error": "Missing Pantry Type Detail" };
//     }
//     obj.pantryType = xss(data.pantryType);

//     if (data.pantryType == "Shared Pantry") {

//         if (data.pantrySize) {
//             obj.pantrySize = xss(data.pantrySize);
//         }

//         if (data.pantrySizeUnit) {
//             obj.pantrySizeUnit = xss(data.pantrySizeUnit);
//         }
//     }



//     // Checking Property Flooring Type
//     if (!data.flooring) {
//         return { "msg": "ERROR", "error": "Missing Property Flooring Type" };
//     }
//     // Adding Property Flooring Type
//     obj.flooring = xss(data.flooring);




//     // Facility Available
//     if (!data.facilityAvailable) {
//         return { "msg": "ERROR", "error": "Missing Facility Available Detail" };
//     }

//     let facilityAvailable = {};

//     if (!data.facilityAvailable.centralAirConditioning) {
//         return { "msg": "ERROR", "error": "Missing Central Air Conditioning Detail" };
//     }
//     facilityAvailable.centralAirConditioning = xss(data.facilityAvailable.centralAirConditioning);


//     if (!data.facilityAvailable.oxygenDuct) {
//         return { "msg": "ERROR", "error": "Missing Oxygen Duct Detail" };
//     }
//     facilityAvailable.oxygenDuct = xss(data.facilityAvailable.oxygenDuct);


//     obj.facilityAvailable = facilityAvailable;

//     // --------------------------------- FIRE SAFETY ARRAY STARTING ---------------------------------


//     if (data.fireSafety) {
//         let fireSafety = [];


//         if (data.fireSafety.length) {
//             for (let a = 0; a < data.fireSafety.length; a++) {
//                 fireSafety.push(xss(data.fireSafety[a]));
//             }
//         }

//         obj.fireSafety = fireSafety;
//     }



//     // --------------------------------- FIRE SAFETY ARRAY ENDING ---------------------------------





//     // Checking Missing Total Floors
//     if (!data.totalFloors) {
//         return { "msg": "ERROR", "error": "Missing Total Floors" };
//     }
//     // Adding Missing Total Floors
//     obj.totalFloors = Number(xss(data.totalFloors));


//     // Checking which Floor Number is Going to sell
//     if (data.floorOn) {
//         let floorOn = [];


//         for (let a = 0; a < data.floorOn.length; a++) {
//             floorOn.push(xss(data.floorOn[a]));
//         }

//         obj.floorOn = floorOn;
//     }




//     // Checking Missing Total Floors
//     if (data.staircases) {
//         obj.staircases = Number(xss(data.staircases));
//     }




//     // Checking Lift Details
//     if (!data.lift) {
//         return { "msg": "ERROR", "error": "Missing Lift Details" };
//     }
//     obj.lift = xss(data.lift);

//     if (data.lift == "Available") {
//         let liftDetails = {};


//         liftDetails.passenger = Number(xss(data.liftDetails.passenger));
//         liftDetails.service = Number(xss(data.liftDetails.service));
//         obj.liftDetails = liftDetails;
//     }



//     // Checking Lift Details
//     if (!data.parking) {
//         return { "msg": "ERROR", "error": "Missing parking Details" };
//     }
//     obj.parking = xss(data.parking);

//     if (data.parking == "Available") {

//         let parkingDetailsList = [];

//         for (let a = 0; a < data.parkingDetailsList.length; a++) {
//             parkingDetailsList.push(xss(data.parkingDetailsList[a]));
//         }

//         obj.parkingDetailsList = parkingDetailsList;

//         if (data.parkingCount) {
//             obj.parkingCount = Number(xss(data.parkingCount));
//         }
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






//     // --------------------------------- ADDRESS STARTING ---------------------------------

//     // Checking if address object is present in the input from frontend
//     if (!data.address) {
//         return { "msg": "ERROR", "error": "Address Details not Present" };
//     }

//     // if present then creating a new address object that will be added in Main Object
//     let address = {};


//     // Checking Zone Type
//     if (!data.address.zoneType) {
//         return { "msg": "ERROR", "error": "Missing Zone Type" };
//     }
//     // Adding Zone Type
//     address.zoneType = xss(data.address.zoneType);


//     // Checking Located Inside
//     if (!data.address.locatedInside) {
//         return { "msg": "ERROR", "error": "Missing Located Inside" };
//     }
//     // Adding Located Inside
//     address.locatedInside = xss(data.address.locatedInside);


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


//     if (!data.noc) {
//         return { "msg": "ERROR", "error": "Missing NOC Certified" };
//     }
//     obj.noc = xss(data.noc);


//     if (!data.occupancy) {
//         return { "msg": "ERROR", "error": "Missing Occupancy Certified" };
//     }
//     obj.occupancy = xss(data.occupancy);





//     // --------------------------------- AMENITIES ARRAY STARTING ---------------------------------

//     if (data.previouslyUsedList) {
//         let previouslyUsedList = [];

//         if (data.previouslyUsedList.length) {
//             for (let a = 0; a < data.previouslyUsedList.length; a++) {
//                 previouslyUsedList.push(xss(data.previouslyUsedList[a]));
//             }
//         }

//         obj.previouslyUsedList = previouslyUsedList;
//     }



//     // --------------------------------- AMENITIES ARRAY ENDING ---------------------------------








//     // --------------------------------- AMENITIES ARRAY STARTING ---------------------------------


//     let amenities = [];

//     if (data.amenities.length) {
//         for (let a = 0; a < data.amenities.length; a++) {
//             amenities.push(xss(data.amenities[a]));
//         }
//     }

//     obj.amenities = amenities;


//     // --------------------------------- AMENITIES ARRAY ENDING ---------------------------------




//     // --------------------------------- LOCATION ADVANTAGES ARRAY STARTING ---------------------------------


//     let locationAdv = [];

//     if (data.locationAdv.length) {
//         for (let a = 0; a < data.locationAdv.length; a++) {
//             locationAdv.push(xss(data.locationAdv[a]));
//         }
//     }

//     obj.locationAdv = locationAdv;


//     // --------------------------------- LOCATION ADVANTAGES ARRAY ENDING ---------------------------------





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



//     if (data.additionalPricingDetails) {
//         let additionalPricingDetails = {};

//         additionalPricingDetails.maintenancePrice = Number(xss(data.additionalPricingDetails.maintenancePrice));
//         additionalPricingDetails.maintenanceTimePeriod = xss(data.additionalPricingDetails.maintenanceTimePeriod);

//         obj.additionalPricingDetails = additionalPricingDetails;
//     }

//     return { "msg": "SUCCESS", "data": obj };
// }


// module.exports = { bareShellOfficeSpace };
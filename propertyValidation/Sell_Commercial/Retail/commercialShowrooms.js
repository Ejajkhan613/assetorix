const component = require("../../components");


// Function
function commercialShowrooms(data) {

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



    // Retail Space Type
    let retailSpaceType = component.retailSpaceType(data.retailSpaceType);
    if (retailSpaceType.msg == "SUCCESS") {
        obj.retailSpaceType = retailSpaceType.data;
    } else {
        return retailSpaceType;
    }



    // Located Inside
    let locatedInside = component.retailLocatedInside(data.locatedInside);
    if (locatedInside.msg == "SUCCESS") {
        obj.locatedInside = locatedInside.data;
    } else {
        return locatedInside;
    }



    // --------------------------------- ADDRESS STARTING ---------------------------------

    // Checking Address
    if (!data.address) {
        return { "msg": "ERROR", "error": "Missing Address Detail Object" };
    }



    // Adding Address Data
    let address = {};



    // Address ( Optional )
    let type = component.houseNumber(data.address.type);
    if (type.msg == "SUCCESS") {
        address.address = type.data;
    } else {
        return type;
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

    // ------------------ Area Details and Unit Details ENDING -----------------------------



    // Entrance Width
    if (data.entranceWidth && data.entranceWidthUnit) {
        let entranceWidth = component.entranceWidth(data.shopFacedSize.entranceWidth)
        if (entranceWidth.msg == "SUCCESS") {
            obj.entranceWidth = entranceWidth.data;
        } else {
            return entranceWidth;
        }
    }



    // Entrance Width
    if (data.entranceWidth && data.entranceWidthUnit) {
        let entranceWidthUnit = component.entranceWidthUnit(data.shopFacedSize.entranceWidthUnit)
        if (entranceWidthUnit.msg == "SUCCESS") {
            obj.entranceWidthUnit = entranceWidthUnit.data;
        } else {
            return entranceWidthUnit;
        }
    }



    // Ceiling Height
    if (data.ceilingHeight && data.ceilingHeightUnit) {
        let ceilingHeight = component.ceilingHeight(data.shopFacedSize.ceilingHeight)
        if (ceilingHeight.msg == "SUCCESS") {
            obj.ceilingHeight = ceilingHeight.data;
        } else {
            return ceilingHeight;
        }
    }



    // Ceiling Height Unit
    if (data.ceilingHeight && data.ceilingHeightUnit) {
        let ceilingHeightUnit = component.ceilingHeightUnit(data.shopFacedSize.ceilingHeightUnit)
        if (ceilingHeightUnit.msg == "SUCCESS") {
            obj.ceilingHeightUnit = ceilingHeightUnit.data;
        } else {
            return ceilingHeightUnit;
        }
    }



    // Washroom details with private and shared washrooms
    let washroomDetails = component.washroomDetails({ "washrooms": data.washrooms, "washroomDetails": data.washroomDetails });
    if (washroomDetails.msg == "SUCCESS") {
        obj.washrooms = washroomDetails.data;
        if (washroomDetails.washroomDetails) {
            obj.washroomDetails = washroomDetails.washroomDetails;
        }
    } else {
        return washroomDetails;
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



    // Located Near (Optional)
    let locatedNear = component.locatedNear(data.locatedNear)
    if (locatedNear.msg == "SUCCESS") {
        obj.locatedNear = locatedNear.data;
    } else {
        return locatedNear;
    }



    // Parking Type
    let parkingWithPrivatePublicMultilevel = component.parkingWithPrivatePublicMultilevel(data.parking, data.parkingType || [])
    if (parkingWithPrivatePublicMultilevel.msg == "SUCCESS") {
        obj.parkingWithPrivatePublicMultilevel = parkingWithPrivatePublicMultilevel.data;
        if (parkingWithPrivatePublicMultilevel.parkingType) {
            obj.parkingType = parkingWithPrivatePublicMultilevel.parkingType;
        }
    } else {
        return parkingWithPrivatePublicMultilevel;
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



    // Suitable for business types
    let suitableFor = component.suitableFor(data.suitableFor);
    if (suitableFor.msg == "SUCCESS") {
        obj.suitableFor = suitableFor.data;
    } else {
        return suitableFor;
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
    let priceUnit = component.priceUnit(data.price, data.carpetArea);
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



    // Pre Leased / Pre Rented
    let preLeasedRentedDetails = component.preLeasedRentedDetails({ "preLeased_Rented": data.preLeased_Rented, "preLeased_RentedDetails": data.preLeasedRentedDetails });
    if (preLeasedRentedDetails.msg == "SUCCESS") {
        obj.preLeasedRentedDetails = preLeasedRentedDetails.data;
    } else {
        return preLeasedRentedDetails;
    }



    // Assured Returns
    if (data.assuredReturns && data.leaseGuarantee) {
        let assuredReturns = component.assuredReturns(data.investorLookFor.assuredReturns)
        if (assuredReturns.msg == "SUCCESS") {
            obj.assuredReturns = assuredReturns.data;
        } else {
            return assuredReturns;
        }
    }



    // Lease Guarantee
    if (data.assuredReturns && data.leaseGuarantee) {
        let leaseGuarantee = component.leaseGuarantee(data.investorLookFor.leaseGuarantee)
        if (leaseGuarantee.msg == "SUCCESS") {
            obj.leaseGuarantee = leaseGuarantee.data;
        } else {
            return leaseGuarantee;
        }
    }



    // Amenities ( Optional )
    if (data.amenities) {
        const list = ["Service / Goods Lift", "Maintenance Staff", "Rain Water Harvesting", "Waste Disposal", "Water Storage", "Security / Fire Alarm", "Visitor Parking", "ATM", "Near Bank", "Security Personnel", "Lift"];
        let amenities = component.amenities({ "data": data.amenities, list })
        if (amenities.msg == "SUCCESS") {
            obj.amenities = amenities.data;
        } else {
            return amenities;
        }
    }



    // Property Features ( Optional )
    if (data.propertyFeatures) {
        const list = ["Centrally Air Conditioned", "Power Back-up", "Reserved Parking", "Intercom Facility", "Feng Shui / Vaastu Compliant"];
        let propertyFeatures = component.propertyFeatures({ "data": data.propertyFeatures, list })
        if (propertyFeatures.msg == "SUCCESS") {
            obj.propertyFeatures = propertyFeatures.data;
        } else {
            return propertyFeatures;
        }
    }



    // Society / Building Features ( Optional )
    if (data.society_buildingFeatures) {
        const list = ["Shopping Centre", "Fitness Centre / GYM", "WheelChair Accessibilitiy", "DG Availability", "CCTV Surveillance", "Grade A Building", "Grocery Shop", "Swimming Pool", "Club house / Community Center"];
        let society_buildingFeatures = component.society_buildingFeatures({ "data": data.society_buildingFeatures, list })
        if (society_buildingFeatures.msg == "SUCCESS") {
            obj.society_buildingFeatures = society_buildingFeatures.data;
        } else {
            return society_buildingFeatures;
        }
    }



    // Additional Features ( Optional )
    if (data.additionalFeatures) {
        const list = ["Bank Attached Property"];
        let additionalFeatures = component.additionalFeatures({ "data": data.additionalFeatures, list })
        if (additionalFeatures.msg == "SUCCESS") {
            obj.additionalFeatures = additionalFeatures.data;
        } else {
            return additionalFeatures;
        }
    }



    // Other Features ( Optional )
    if (data.otherFeatures) {
        let list = ["Corner Property", "Main Road Facing"];
        let otherFeatures = component.otherFeatures({ "data": data.otherFeatures, list })
        if (otherFeatures.msg == "SUCCESS") {
            obj.otherFeatures = otherFeatures.data;
        } else {
            return otherFeatures;
        }
    }



    // Fire Safety
    let fireSafety = component.fireSafety(data.fireSafety);
    if (fireSafety.msg == "SUCCESS") {
        obj.fireSafety = fireSafety.data;
    } else {
        return fireSafety;
    }



    // Property Facing
    let propertyFacing = component.propertyFacing(data.propertyFacing)
    if (propertyFacing.msg == "SUCCESS") {
        obj.propertyFacing = propertyFacing.data;
    } else {
        return propertyFacing;
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
}



// Exporting Module
module.exports = { commercialShowrooms };



















// ::::::::::::::::::::::: OLD METHOD :::::::::::::::::::::::::::

// const xss = require("xss");


// function commercialShowrooms(data) {

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


//     // Retail Space Type
//     if (!data.retailSpaceType) {
//         return { "msg": "ERROR", "error": "Missing Retail Space Type" };
//     }
//     // Adding Retail Space Type
//     obj.retailSpaceType = xss(data.retailSpaceType);


//     // Located Inside
//     if (!data.locatedInside) {
//         return { "msg": "ERROR", "error": "Missing Located Inside Detail" };
//     }
//     // Adding Located Inside
//     obj.locatedInside = xss(data.locatedInside);


//     // --------------------------------- ADDRESS STARTING ---------------------------------

//     // Checking if address object is present in the input from frontend
//     if (!data.address) {
//         return { "msg": "ERROR", "error": "Address Details not Present" };
//     }

//     // if present then creating a new address object that will be added in Main Object
//     let address = {};

//     if (data.address.type) {
//         address.type = xss(data.address.type);
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


//     // Checking Builtup Area
//     if (data.builtupArea) {
//         obj.builtupArea = Number(xss(data.builtupArea));
//     }

//     // Checking Builtup Area Unit
//     if (data.builtupAreaUnit) {
//         obj.builtupAreaUnit = xss(data.builtupAreaUnit);
//     }



//     // Shop Faced Size
//     if (data.shopFacedSize) {
//         let shopFacedSize = {};

//         if (data.shopFacedSize.entranceWidth) {
//             shopFacedSize.entranceWidth = xss(data.shopFacedSize.entranceWidth);
//         }
//         if (data.shopFacedSize.entranceWidthUnit) {
//             shopFacedSize.entranceWidthUnit = xss(data.shopFacedSize.entranceWidthUnit);
//         }
//         if (data.shopFacedSize.ceilingHeight) {
//             shopFacedSize.ceilingHeight = xss(data.shopFacedSize.ceilingHeight);
//         }
//         if (data.shopFacedSize.ceilingHeightUnit) {
//             shopFacedSize.ceilingHeightUnit = xss(data.shopFacedSize.ceilingHeightUnit);
//         }
//         obj.shopFacedSize = shopFacedSize;
//     }




//     // --------------------------------- WASHROOM DETAILS STARTING ---------------------------------

//     if (!data.washrooms) {
//         return { "msg": "ERROR", "error": "Missing Washrooms" };
//     }

//     obj.washrooms = xss(data.washrooms);



//     if (data.washrooms == "Available") {
//         let washroomDetails = {};

//         washroomDetails.privateWashrooms = Number(xss(data.washrooms.privateWashrooms));
//         washroomDetails.sharedWashrooms = Number(xss(data.washrooms.sharedWashrooms));

//         obj.washroomDetails = washroomDetails;
//     }

//     // --------------------------------- WASHROOM DETAILS ENDING ---------------------------------

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


//     if (data.locatedNear) {
//         let locatedNear = [];

//         if (data.locatedNear.length) {
//             for (let a = 0; a < data.locatedNear.length; a++) {
//                 locatedNear.push(xss(data.locatedNear[a]));
//             }
//         }

//         obj.locatedNear = locatedNear;
//     }




//     // --------------------------------- PARKING STARTING ---------------------------------


//     // Checking if parking is present in the input from frontend
//     if (!data.parking) {
//         return { "msg": "ERROR", "error": "Missing Parking Details" };
//     }
//     obj.parking = xss(data.parking);

//     if (data.parking == "Available") {
//         let parkingType = [];

//         for (let a = 0; a < data.parkingType.length; a++) {
//             parkingType.push(xss(data.parkingType[a]));
//         }
//         obj.parkingType = parkingType;
//     }



//     // --------------------------------- PARKING ENDING ---------------------------------





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



//     if (data.suitableFor) {
//         let suitableFor = [];

//         if (data.suitableFor.length) {
//             for (let a = 0; a < data.suitableFor.length; a++) {
//                 suitableFor.push(xss(data.suitableFor[a]));
//             }
//         }

//         obj.suitableFor = suitableFor;
//     } else {
//         return { "msg": "ERROR", "error": "Missing Suitable For Business Types" };
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
//         additionalPricingDetails.bookingAmount = Number(xss(data.additionalPricingDetails.bookingAmount));

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


//     if (data.investorLookFor) {
//         let investorLookFor = {};

//         if (data.investorLookFor.assuredReturns) {
//             investorLookFor.assuredReturns = xss(data.investorLookFor.assuredReturns);
//         }
//         if (data.investorLookFor.leaseGuarantee) {
//             investorLookFor.leaseGuarantee = xss(data.investorLookFor.leaseGuarantee);
//         }

//         obj.investorLookFor = investorLookFor;
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



//     // Checking Property Facing (Direction of Property)
//     if (!data.propertyFacing) {
//         return { "msg": "ERROR", "error": "Missing Property Facing Direction" };
//     }
//     // Adding Property Facing
//     obj.propertyFacing = xss(data.propertyFacing);


//     // --------------------------------- FIRE SAFETY ARRAY ENDING ---------------------------------




//     // Checking Main Road Width
//     if (!data.roadFacingWidth) {
//         return { "msg": "ERROR", "error": "Missing Main Road Width" };
//     }
//     // Adding Main Road Width
//     obj.roadFacingWidth = Number(xss(data.roadFacingWidth));


//     // Checking Main Road Width Type
//     if (!data.roadFacingWidthType) {
//         return { "msg": "ERROR", "error": "Missing Main Road Width Type" };
//     }
//     // Adding Main Road Width Type
//     obj.roadFacingWidthType = xss(data.roadFacingWidthType);




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


// module.exports = { commercialShowrooms };
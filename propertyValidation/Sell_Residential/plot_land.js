const component = require("../components");


function plot_land(data) {

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



    // Plot Number ( Optional )
    let plotNumber = component.houseNumber(data.address.plotNumber);
    if (plotNumber.msg == "SUCCESS") {
        address.plotNumber = plotNumber.data;
    } else {
        return plotNumber;
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



    // // Carpet Area ( Optional )
    // if (data.carpetArea && data.carpetAreaUnit) {
    //     let carpetArea = component.carpetArea(data.carpetArea);
    //     if (carpetArea.msg == "SUCCESS") {
    //         obj.carpetArea = carpetArea.data;
    //     } else {
    //         return carpetArea;
    //     }
    // }



    // // Carpet Area Unit ( Optional )
    // if (data.carpetArea && data.carpetAreaUnit) {
    //     let carpetAreaUnit = component.carpetAreaUnit(data.carpetAreaUnit);
    //     if (carpetAreaUnit.msg == "SUCCESS") {
    //         obj.carpetAreaUnit = carpetAreaUnit.data;
    //     } else {
    //         return carpetAreaUnit;
    //     }
    // }



    // // Builtup Area ( Optional )
    // if (data.builtupArea && data.builtupAreaUnit) {
    //     let builtupArea = component.builtupArea(data.builtupArea);
    //     if (builtupArea.msg == "SUCCESS") {
    //         obj.builtupArea = builtupArea.data;
    //     } else {
    //         return builtupArea;
    //     }
    // }



    // // Builtup Area Unit ( Optional )
    // if (data.builtupArea && data.builtupAreaUnit) {
    //     let builtupAreaUnit = component.builtupAreaUnit(data.builtupAreaUnit);
    //     if (builtupAreaUnit.msg == "SUCCESS") {
    //         obj.builtupAreaUnit = builtupAreaUnit.data;
    //     } else {
    //         return builtupAreaUnit;
    //     }
    // }



    // // Super Builtup Area ( Optional )
    // if (data.superBuiltupArea && data.superBuiltupAreaUnit) {
    //     let superBuiltupArea = component.superBuiltupArea(data.superBuiltupArea);
    //     if (superBuiltupArea.msg == "SUCCESS") {
    //         obj.superBuiltupArea = superBuiltupArea.data;
    //     } else {
    //         return superBuiltupArea;
    //     }
    // }



    // // Super Builtup Area Unit ( Optional )
    // if (data.superBuiltupArea && data.superBuiltupAreaUnit) {
    //     let superBuiltupAreaUnit = component.superBuiltupAreaUnit(data.superBuiltupAreaUnit);
    //     if (superBuiltupAreaUnit.msg == "SUCCESS") {
    //         obj.superBuiltupAreaUnit = superBuiltupAreaUnit.data;
    //     } else {
    //         return superBuiltupAreaUnit;
    //     }
    // }

    // ------------------ Area Details and Unit Details ENDING -----------------------------

    // Adding Plot Length
    if (data.plotLength && data.plotBreadth) {
        let plotLength = component.plotLength(data.plotLength)
        if (plotLength.msg == "SUCCESS") {
            obj.plotLength = plotLength.data;
        } else {
            return plotLength;
        }
    }



    // Adding Plot Breadth
    if (data.plotBreadth && data.plotLength) {
        let plotBreadth = component.plotBreadth(data.plotBreadth)
        if (plotBreadth.msg == "SUCCESS") {
            obj.plotBreadth = plotBreadth.data;
        } else {
            return plotBreadth;
        }
    }



    // Adding total Floors Allowed for Construction
    let totalFloorsAllowed = component.totalFloorsAllowed(data.totalFloorsAllowed);
    if (totalFloorsAllowed.msg == "SUCCESS") {
        obj.totalFloorsAllowed = totalFloorsAllowed.data;
    } else {
        return totalFloorsAllowed;
    }



    // Adding Boundary Wall Details
    let boundaryWall = component.boundaryWall(data.boundaryWall);
    if (boundaryWall.msg == "SUCCESS") {
        obj.boundaryWall = boundaryWall.data;
    } else {
        return boundaryWall;
    }



    // Adding Open Sides
    let openSides = component.openSides(data.openSides);
    if (openSides.msg == "SUCCESS") {
        obj.openSides = openSides.data;
    } else {
        return openSides;
    }



    // Adding Construction Done Detail
    let constructionOnProperty = component.constructionOnProperty(data.constructionOnProperty, data.constructionOnPropertyList || []);
    if (constructionOnProperty.msg == "SUCCESS") {
        obj.constructionOnProperty = constructionOnProperty.data.constructionOnProperty;
        if (constructionOnProperty.data.constructionOnPropertyList) {
            obj.constructionOnPropertyList = constructionOnProperty.data.constructionOnPropertyList;
        }
    } else {
        return constructionOnProperty;
    }



    // Adding Plot Expected By Year
    let expectedByYear = component.expectedByYear(data.expectedByYear);
    if (expectedByYear.msg == "SUCCESS") {
        obj.expectedByYear = expectedByYear.data;
    } else {
        return expectedByYear;
    }



    // Ownership Type
    let ownership = component.ownership(data.ownership);
    if (ownership.msg == "SUCCESS") {
        obj.ownership = ownership.data;
    } else {
        return ownership;
    }



    // Adding List of Property Approval Authorities
    let propertyApprovalAuthorityList = component.propertyApprovalAuthorityList(data.propertyApprovalAuthorityList);
    if (propertyApprovalAuthorityList.msg == "SUCCESS") {
        obj.propertyApprovalAuthorityList = propertyApprovalAuthorityList.data;
    } else {
        return propertyApprovalAuthorityList;
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
        const list = ["Maintenance Staff", "Water Storage", "Rain Water Harvesting", "Feng Shui / Vaastu Compliant"];
        let amenities = component.amenities({ "data": data.amenities, list })
        if (amenities.msg == "SUCCESS") {
            obj.amenities = amenities.data;
        } else {
            return amenities;
        }
    }



    // Overlookings
    if (data.overLookings) {
        let list = ["Pool", "Park / Garden", "Club", "Main Road", "Other"];
        let overLookings = component.overLookings({ "data": data.overLookings, list })
        if (overLookings.msg == "SUCCESS") {
            obj.overLookings = overLookings.data;
        } else {
            return overLookings;
        }
    }



    // Other Features
    if (data.otherFeatures) {
        let list = ["In a gated society", "Corner Property"];
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



    // Property Location Advantages
    let locationAdv = component.locationAdv(data.locationAdv)
    if (locationAdv.msg == "SUCCESS") {
        obj.locationAdv = locationAdv.data;
    } else {
        return locationAdv;
    }

    return { "msg": "SUCCESS", "data": obj };
}


// Module Export
module.exports = { plot_land };










// ::::::::::::::::::::::: OLD METHOD :::::::::::::::::::::::::::


// const xss = require("xss");


// function plot_land(data) {

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



//     // Checking Plot Number
//     if (data.address.plotNumber) {
//         // Adding Plot Number
//         address.plotNumber = xss(data.address.plotNumber);
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




//     // Checking Property Facing (Direction of Property)
//     if (!data.propertyFacing) {
//         return { "msg": "ERROR", "error": "Missing Property Facing Direction" };
//     }
//     // Adding Property Facing
//     obj.propertyFacing = xss(data.propertyFacing);


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
//     if (!data.totalFloorsAllowed) {
//         return { "msg": "ERROR", "error": "Missing Total Allowed Floors" };
//     }
//     // Adding Missing Total Floors
//     obj.totalFloorsAllowed = Number(xss(data.totalFloorsAllowed));


//     // Checking Boundary Wall Detail
//     if (!data.boundaryWall) {
//         return { "msg": "ERROR", "error": "Missing Boundary Wall Detail" };
//     }
//     // Adding Boundary Wall Detail
//     obj.boundaryWall = xss(data.boundaryWall);


//     // Checking Number of Open Sides
//     if (!data.openSides) {
//         return { "msg": "ERROR", "error": "Missing Number of Open Sides" };
//     }
//     // Adding Number of Open Sides
//     obj.openSides = xss(data.openSides);


//     // Checking Any Construction Done Detail
//     if (!data.constructionOnProperty) {
//         return { "msg": "ERROR", "error": "Missing Any Construction On Plot Detail" };
//     }
//     // Adding Any Construction Done Detail
//     obj.constructionOnProperty = xss(data.constructionOnProperty);


//     // Adding List if Constructions Done on Plot
//     if (data.constructionOnProperty == "Yes") {

//         let constructionOnPropertyList = [];

//         for (let a = 0; a < data.constructionOnPropertyList.length; a++) {
//             constructionOnPropertyList.push(xss(data.constructionOnPropertyList[a]));
//         }
//         obj.constructionOnPropertyList = constructionOnPropertyList;
//     }


//     // Adding List of Property Approval Authorities
//     if (data.propertyApprovalAuthorityList) {

//         let propertyApprovalAuthorityList = [];

//         for (let a = 0; a < data.propertyApprovalAuthorityList.length; a++) {
//             propertyApprovalAuthorityList.push(xss(data.propertyApprovalAuthorityList[a]));
//         }
//         obj.propertyApprovalAuthorityList = propertyApprovalAuthorityList;
//     }



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


//     // Adding Plot Length
//     if (data.plotLength) {
//         obj.plotLength = Number(xss(data.plotLength));
//     }



//     // Adding Plot Breadth
//     if (data.plotBreadth) {
//         obj.plotBreadth = Number(xss(data.plotBreadth));
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


//     // Checking Plot Expected By Year
//     if (!data.expectedByYear) {
//         return { "msg": "ERROR", "error": "Missing Expected by Year" };
//     }
//     // Checking Plot Expected By Year
//     obj.expectedByYear = xss(data.expectedByYear);



//     if (data.additionalPricingDetails) {
//         let additionalPricingDetails = {};

//         additionalPricingDetails.maintenancePrice = Number(xss(data.additionalPricingDetails.maintenancePrice));
//         additionalPricingDetails.maintenanceTimePeriod = xss(data.additionalPricingDetails.maintenanceTimePeriod);
//         additionalPricingDetails.expectedRental = Number(xss(data.additionalPricingDetails.expectedRental));
//         additionalPricingDetails.bookingAmount = Number(xss(data.additionalPricingDetails.bookingAmount));
//         additionalPricingDetails.annualDuesPayable = Number(xss(data.additionalPricingDetails.annualDuesPayable));

//         obj.additionalPricingDetails = additionalPricingDetails;
//     }

//     return { "msg": "SUCCESS", "data": obj };
// }


// module.exports = { plot_land };
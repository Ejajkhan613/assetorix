const component = require("../../components");


function agricultural_farmLand(data) {

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



    // Plot Land Type
    let plotLandType = component.plotLandType(data.plotLandType);
    if (plotLandType.msg == "SUCCESS") {
        obj.plotLandType = plotLandType.data;
    } else {
        return plotLandType;
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
        address.address = plotNumber.data;
    } else {
        return plotNumber;
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



    // Property Facing
    let propertyFacing = component.propertyFacing(data.propertyFacing)
    if (propertyFacing.msg == "SUCCESS") {
        obj.propertyFacing = propertyFacing.data;
    } else {
        return propertyFacing;
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



    // Pre Leased / Pre Rented
    let preLeasedRentedDetails = component.preLeasedRentedDetails(data.preLeasedRentedDetails);
    if (preLeasedRentedDetails.msg == "SUCCESS") {
        obj.preLeasedRentedDetails = preLeasedRentedDetails.data;
    } else {
        return preLeasedRentedDetails;
    }



    // Amenities ( Optional )
    if (data.amenities) {
        const list = ["Maintenance Staff", "Rain Water Harvesting", "Waste Disposal", "Water Storage", "Feng Shui / Vaastu Compliant", "Security / Fire Alarm", "Visitor Parking"];
        let amenities = component.amenities({ "data": data.amenities, list })
        if (amenities.msg == "SUCCESS") {
            obj.amenities = amenities.data;
        } else {
            return amenities;
        }
    }



    // Property Features ( Optional )
    if (data.propertyFeatures) {
        const list = ["Near Bank", "Power Back-up", "Reserved Parking", "Intercom Facility"];
        let propertyFeatures = component.propertyFeatures({ "data": data.propertyFeatures, list })
        if (propertyFeatures.msg == "SUCCESS") {
            obj.propertyFeatures = propertyFeatures.data;
        } else {
            return propertyFeatures;
        }
    }



    // Other Features ( Optional )
    if (data.otherFeatures) {
        let list = ["Corner Property"];
        let otherFeatures = component.otherFeatures({ "data": data.otherFeatures, list })
        if (otherFeatures.msg == "SUCCESS") {
            obj.otherFeatures = otherFeatures.data;
        } else {
            return otherFeatures;
        }
    }



    // Property Location Advantages
    let locationAdv = component.locationAdv(data.locationAdv)
    if (locationAdv.msg == "SUCCESS") {
        obj.locationAdv = locationAdv.data;
    } else {
        return locationAdv;
    }

    return { msg: "SUCCESS", data: obj };
}




// Exporting Moduel
module.exports = { agricultural_farmLand };



















// ::::::::::::::::::::::: OLD METHOD :::::::::::::::::::::::::::

// const xss = require("xss");


// function agricultural_farmLand(data) {


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




//     // Plot Land Type
//     if (!data.plotLandType) {
//         return { "msg": "ERROR", "error": "Missing Plot Land Type" };
//     }
//     // Adding Plot Land Type
//     obj.plotLandType = xss(data.plotLandType);



//     // --------------------------------- ADDRESS STARTING ---------------------------------

//     // Checking if address object is present in the input from frontend
//     if (!data.address) {
//         return { "msg": "ERROR", "error": "Address Details not Present" };
//     }

//     // if present then creating a new address object that will be added in Main Object
//     let address = {};



//     // Checking Plot Number
//     if (!data.address.plotNumber) {
//         return { "msg": "ERROR", "error": "Missing Plot Number" };
//     }
//     // Adding Plot Number
//     address.plotNumber = xss(data.address.plotNumber);



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
//         obj.plotLength = xss(data.plotLength);
//     }



//     // Adding Plot Breadth
//     if (data.plotBreadth) {
//         obj.plotBreadth = xss(data.plotBreadth);
//     }


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



//     // Checking Property Facing (Direction of Property)
//     if (!data.propertyFacing) {
//         return { "msg": "ERROR", "error": "Missing Property Facing Direction" };
//     }
//     // Adding Property Facing
//     obj.propertyFacing = xss(data.propertyFacing);




//     // Checking Plot Expected By Year
//     if (!data.expectedByYear) {
//         return { "msg": "ERROR", "error": "Missing Expected by Year" };
//     }
//     // Checking Plot Expected By Year
//     obj.expectedByYear = xss(data.expectedByYear);




//     // Checking OwnerShip Type
//     if (!data.ownership) {
//         return { "msg": "ERROR", "error": "Missing Ownership" };
//     }
//     // Adding OwnerShip Type
//     obj.ownership = xss(data.ownership);




//     // Adding List of Property Approval Authorities
//     if (data.propertyApprovalAuthorityList) {

//         let propertyApprovalAuthorityList = [];

//         for (let a = 0; a < data.propertyApprovalAuthorityList.length; a++) {
//             propertyApprovalAuthorityList.push(xss(data.propertyApprovalAuthorityList[a]));
//         }
//         obj.propertyApprovalAuthorityList = propertyApprovalAuthorityList;
//     }


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


// module.exports = { agricultural_farmLand };
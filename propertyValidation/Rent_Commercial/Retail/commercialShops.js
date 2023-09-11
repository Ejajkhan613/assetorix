const xss = require("xss");


function commercialShops_Rent(data) {

    // --------------------------------- MAIN OBJECT ---------------------------------

    // Main Object that will be saved in DB
    let obj = {};



    // Checking Looking For
    if (!data.lookingFor) {
        return { "msg": "ERROR", "error": "Missing Looking For" };
    }
    // Adding Looking For
    obj.lookingFor = xss(data.lookingFor);


    // Checking Property Group
    if (!data.propertyGroup) {
        return { "msg": "ERROR", "error": "Missing Property Group" };
    }
    // Adding Property Group
    obj.propertyGroup = xss(data.propertyGroup);


    // Checking Property Type
    if (!data.propertyType) {
        return { "msg": "ERROR", "error": "Missing Property Type" };
    }
    // Adding Property Type
    obj.propertyType = xss(data.propertyType);


    // Retail Space Type
    if (!data.retailSpaceType) {
        return { "msg": "ERROR", "error": "Missing Retail Space Type" };
    }
    // Adding Retail Space Type
    obj.retailSpaceType = xss(data.retailSpaceType);


    // Located Inside
    if (!data.locatedInside) {
        return { "msg": "ERROR", "error": "Missing Located Inside Detail" };
    }
    // Adding Located Inside
    obj.locatedInside = xss(data.locatedInside);


    // --------------------------------- ADDRESS STARTING ---------------------------------

    // Checking if address object is present in the input from frontend
    if (!data.address) {
        return { "msg": "ERROR", "error": "Address Details not Present" };
    }

    // if present then creating a new address object that will be added in Main Object
    let address = {};

    if (data.address.address) {
        address.address = xss(data.address.address)
    }

    if (data.address.type) {
        address.type = xss(data.address.type);
    }


    // Checking Pincode
    if (!data.address.pincode) {
        return { "msg": "ERROR", "error": "Missing Pincode" };
    }
    // Adding Pincode
    address.pincode = xss(data.address.pincode);


    // Checking Locality
    if (!data.address.locality) {
        return { "msg": "ERROR", "error": "Missing Locality" };
    }
    // Adding Locality
    address.locality = xss(data.address.locality);


    // Checking City
    if (!data.address.city) {
        return { "msg": "ERROR", "error": "Missing City" };
    }
    // Adding City
    address.city = xss(data.address.city);


    // Checking State
    if (!data.address.state) {
        return { "msg": "ERROR", "error": "Missing State" };
    }
    // Adding State
    address.state = xss(data.address.state);


    // Checking Country
    if (!data.address.country) {
        return { "msg": "ERROR", "error": "Missing Country" };
    }
    // Adding Country
    address.country = xss(data.address.country);


    // Adding Address Object in Main Object
    obj.address = address;

    // --------------------------------- ADDRESS ENDING ---------------------------------


    // Checking Carpet Area
    if (!data.carpetArea) {
        return { "msg": "ERROR", "error": "Missing Carpet Area" };
    }
    // Adding Carpet Area
    obj.carpetArea = Number(xss(data.carpetArea));

    // Checking Carpet Area Unit
    if (!data.carpetAreaUnit) {
        return { "msg": "ERROR", "error": "Missing Carpet Area Unit" };
    }
    // Adding Carpet Area Unit
    obj.carpetAreaUnit = xss(data.carpetAreaUnit);


    // Checking Builtup Area
    if (data.builtupArea) {
        obj.builtupArea = Number(xss(data.builtupArea));
    }

    // Checking Builtup Area Unit
    if (data.builtupAreaUnit) {
        obj.builtupAreaUnit = xss(data.builtupAreaUnit);
    }


    // Shop Faced Size
    if (data.shopFacedSize) {
        let shopFacedSize = {};

        if (data.shopFacedSize.entranceWidth) {
            shopFacedSize.entranceWidth = xss(data.shopFacedSize.entranceWidth);
        }
        if (data.shopFacedSize.entranceWidthUnit) {
            shopFacedSize.entranceWidthUnit = xss(data.shopFacedSize.entranceWidthUnit);
        }
        if (data.shopFacedSize.ceilingHeight) {
            shopFacedSize.ceilingHeight = xss(data.shopFacedSize.ceilingHeight);
        }
        if (data.shopFacedSize.ceilingHeightUnit) {
            shopFacedSize.ceilingHeightUnit = xss(data.shopFacedSize.ceilingHeightUnit);
        }
    }


    // --------------------------------- WASHROOM DETAILS STARTING ---------------------------------

    if (!data.washrooms) {
        return { "msg": "ERROR", "error": "Missing Washrooms" };
    }

    obj.washrooms = xss(data.washrooms);


    if (data.washrooms == "Available") {
        let washroomDetails = {};

        if (!data.washroomDetails.privateWashrooms) {
            return { "msg": "ERROR", "error": "Missing Number of Private Washrooms" };
        }
        washroomDetails.privateWashrooms = Number(xss(privateWashrooms));

        if (!data.washroomDetails.sharedWashrooms) {
            return { "msg": "ERROR", "error": "Missing Number of Shared Washrooms" };
        }
        washroomDetails.sharedWashrooms = Number(xss(sharedWashrooms));
    }

    // --------------------------------- WASHROOM DETAILS ENDING ---------------------------------


    // Checking Missing Total Floors
    if (!data.totalFloors) {
        return { "msg": "ERROR", "error": "Missing Total Floors" };
    }
    // Adding Missing Total Floors
    obj.totalFloors = Number(xss(data.totalFloors));


    // Checking which Floor Number is Going to sell
    if (!data.floorOn) {
        return { "msg": "ERROR", "error": "Missing Property Floor Number" };
    }
    // Adding Floor Number
    obj.floorOn = xss(data.floorOn);


    if (data.locatedNear) {
        let locatedNear = [];

        if (data.locatedNear.length) {
            for (let a = 0; a < data.locatedNear.length; a++) {
                locatedNear.push(xss(data.locatedNear[a]));
            }
        }

        obj.locatedNear = locatedNear;
    }



    // --------------------------------- PARKING OBJECT STARTING ---------------------------------


    // Checking if parking object is present in the input from frontend
    if (!data.parking) {
        return { "msg": "ERROR", "error": "Missing Parking Details" };
    }
    obj.parking = xss(parking);


    if (obj.parking == "Available") {

        let parkingTypeList = [];

        if (data.parkingTypeList.length) {
            for (let a = 0; a < data.parkingTypeList.length; a++) {
                parkingTypeList.push(xss(data.parkingTypeList[a]));
            }
        }

        obj.parkingTypeList = parkingTypeList;
    }



    // --------------------------------- PARKING OBJECT ENDING ---------------------------------



    // Checking availabilityStatus
    if (!data.availabilityStatus) {
        return { "msg": "ERROR", "error": "Missing Availability Status" };
    }
    // Adding availabilityStatus
    obj.availabilityStatus = xss(data.availabilityStatus);

    if (data.availabilityStatus == "Ready to move") {
        if (data.propertyStatus) {
            obj.propertyStatus = xss(data.propertyStatus);
        } else {
            return { "msg": "ERROR", "error": "Missing Property Year Status" };
        }
        if (data.availableFrom) {
            obj.availableFrom = xss(data.availableFrom);
        } else {
            return { "msg": "ERROR", "error": "Missing Available From" };
        }
    }

    if (data.availabilityStatus == "Under construction") {
        if (data.expectedByYear) {
            obj.expectedByYear = xss(data.expectedByYear);
        } else {
            return { "msg": "ERROR", "error": "Missing Expected by Year" };
        }
    }


    if (data.suitableFor) {
        let suitableFor = [];

        if (data.suitableFor.length) {
            for (let a = 0; a < data.suitableFor.length; a++) {
                suitableFor.push(xss(data.suitableFor[a]));
            }
        }

        obj.suitableFor = suitableFor;
    } else {
        return { "msg": "ERROR", "error": "Missing Suitable For Business Types" };
    }



    // Checking Property Price
    if (!data.price) {
        return { "msg": "ERROR", "error": "Missing Price" };
    }
    // Adding Property Price
    obj.price = Number(xss(data.price));


    // Checking Price Per Unit
    if (!data.priceUnit) {
        return { "msg": "ERROR", "error": "Missing Price Per Unit" };
    }
    // Adding Price Per Unit
    obj.priceUnit = Number(xss(data.priceUnit));







    // --------------------------------- INCLUSIVE PRICE ARRAY STARTING ---------------------------------


    let inclusivePrices = [];

    if (data.inclusivePrices.length) {
        for (let a = 0; a < data.inclusivePrices.length; a++) {
            inclusivePrices.push(xss(data.inclusivePrices[a]));
        }
    }

    obj.inclusivePrices = inclusivePrices;


    // --------------------------------- INCLUSIVE PRICE ARRAY ENDING ---------------------------------



    if (data.additionalPricingDetails) {
        let additionalPricingDetails = {};

        additionalPricingDetails.maintenancePrice = Number(xss(data.additionalPricingDetails.maintenancePrice));
        additionalPricingDetails.maintenanceTimePeriod = xss(data.additionalPricingDetails.maintenanceTimePeriod);
        additionalPricingDetails.bookingAmount = Number(xss(data.additionalPricingDetails.bookingAmount));

        obj.additionalPricingDetails = additionalPricingDetails;
    }



    // Security deposit (Optional)
    if (!data.securityDeposit) {
        return { "msg": "ERROR", "error": "Missing Security Deposit Detail" };
    }
    obj.securityDeposit = xss(data.securityDeposit);

    if (data.securityDeposit == "Multiple of Rent") {
        if (!data.multipleOfRent) {
            return { "msg": "ERROR", "error": "Missing Security Deposit Value" };
        }
        obj.multipleOfRent = xss(data.multipleOfRent);
    }

    if (data.securityDeposit == "Fixed") {
        if (!data.depositValue) {
            return { "msg": "ERROR", "error": "Missing Security Deposit Value" };
        }
        obj.depositValue = xss(data.depositValue);
    }


    // Lock in Period
    if (!data.lockInPeriod) {
        return { "msg": "ERROR", "error": "Missing Lock in Period" };
    }
    obj.lockInPeriod = xss(data.lockInPeriod);

    // Expected Yearly Rent Increase in %
    if (!data.expectedYearlyRent) {
        return { "msg": "ERROR", "error": "Missing Expected Yearly Rent Increase in %" };
    }
    obj.expectedYearlyRent = xss(data.expectedYearlyRent);




    // Checking Country Currency Code
    if (!data.countryCurrency) {
        return { "msg": "ERROR", "error": "Missing Country Currency Code" };
    }
    // Adding Country Currency Code
    obj.countryCurrency = xss(data.countryCurrency);


    // Checking Description
    if (!data.description) {
        return { "msg": "ERROR", "error": "Missing Description" };
    }
    // Adding Description
    obj.description = xss(data.description);



    // --------------------------------- AMENITIES ARRAY STARTING ---------------------------------


    let amenities = [];

    if (data.amenities.length) {
        for (let a = 0; a < data.amenities.length; a++) {
            amenities.push(xss(data.amenities[a]));
        }
    }

    obj.amenities = amenities;


    // --------------------------------- AMENITIES ARRAY ENDING ---------------------------------


    // --------------------------------- PROPERTY FEATURES ARRAY STARTING ---------------------------------


    let propertyFeatures = [];

    if (data.propertyFeatures.length) {
        for (let a = 0; a < data.propertyFeatures.length; a++) {
            propertyFeatures.push(xss(data.propertyFeatures[a]));
        }
    }

    obj.propertyFeatures = propertyFeatures;


    // --------------------------------- PROPERTY FEATURES ARRAY ENDING ---------------------------------



    // --------------------------------- SOCIETY / BUILDING FEATURES ARRAY STARTING ---------------------------------


    let society_buildingFeatures = [];

    if (data.society_buildingFeatures.length) {
        for (let a = 0; a < data.society_buildingFeatures.length; a++) {
            society_buildingFeatures.push(xss(data.society_buildingFeatures[a]));
        }
    }

    obj.society_buildingFeatures = society_buildingFeatures;


    // --------------------------------- SOCIETY / BUILDING FEATURES ARRAY ENDING ---------------------------------


    // --------------------------------- ADDITIONAL FEATURES ARRAY STARTING ---------------------------------


    let additionalFeatures = [];

    if (data.additionalFeatures.length) {
        for (let a = 0; a < data.additionalFeatures.length; a++) {
            additionalFeatures.push(xss(data.additionalFeatures[a]));
        }
    }

    obj.additionalFeatures = additionalFeatures;


    // --------------------------------- ADDITIONAL FEATURES ARRAY ENDING ---------------------------------



    // --------------------------------- OTHER FEATURES ARRAY STARTING ---------------------------------


    let otherFeatures = [];

    if (data.otherFeatures.length) {
        for (let a = 0; a < data.otherFeatures.length; a++) {
            otherFeatures.push(xss(data.otherFeatures[a]));
        }
    }

    obj.otherFeatures = otherFeatures;


    // --------------------------------- OTHER FEATURES ARRAY ENDING ---------------------------------


    // --------------------------------- FIRE SAFETY ARRAY STARTING ---------------------------------


    if (data.fireSafety) {
        let fireSafety = [];


        if (data.fireSafety.length) {
            for (let a = 0; a < data.fireSafety.length; a++) {
                fireSafety.push(xss(data.fireSafety[a]));
            }
        }

        obj.fireSafety = fireSafety;
    }



    // Checking Property Facing (Direction of Property)
    if (!data.propertyFacing) {
        return { "msg": "ERROR", "error": "Missing Property Facing Direction" };
    }
    // Adding Property Facing
    obj.propertyFacing = xss(data.propertyFacing);


    // --------------------------------- FIRE SAFETY ARRAY ENDING ---------------------------------




    // Checking Main Road Width
    if (!data.roadFacingWidth) {
        return { "msg": "ERROR", "error": "Missing Main Road Width" };
    }
    // Adding Main Road Width
    obj.roadFacingWidth = Number(xss(data.roadFacingWidth));


    // Checking Main Road Width Type
    if (!data.roadFacingWidthType) {
        return { "msg": "ERROR", "error": "Missing Main Road Width Type" };
    }
    // Adding Main Road Width Type
    obj.roadFacingWidthType = xss(data.roadFacingWidthType);



    // --------------------------------- LOCATION ADVANTAGES ARRAY STARTING ---------------------------------


    let locationAdv = [];

    if (data.locationAdv.length) {
        for (let a = 0; a < data.locationAdv.length; a++) {
            locationAdv.push(xss(data.locationAdv[a]));
        }
    }

    obj.locationAdv = locationAdv;


    // --------------------------------- LOCATION ADVANTAGES ARRAY ENDING ---------------------------------







    return { "msg": "SUCCESS", "data": obj };
}


module.exports = { commercialShops_Rent };
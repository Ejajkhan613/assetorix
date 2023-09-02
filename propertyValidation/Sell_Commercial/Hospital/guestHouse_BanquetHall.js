const xss = require("xss");


function guestHouse_BanquetHall(data) {
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


    // Hospitality Type
    if (!data.hospitalityType) {
        return { "msg": "ERROR", "error": "Missing Hospitality Type" };
    }
    // Adding Hospitality Type
    obj.hospitalityType = xss(data.hospitalityType);




    // --------------------------------- ADDRESS STARTING ---------------------------------

    // Checking if address object is present in the input from frontend
    if (!data.address) {
        return { "msg": "ERROR", "error": "Address Details not Present" };
    }

    // if present then creating a new address object that will be added in Main Object
    let address = {};


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



    if (!data.rooms) {
        return { "msg": "ERROR", "error": "Missing Rooms Count" };
    }

    obj.rooms = xss(data.rooms);


    if (!data.washrooms) {
        return { "msg": "ERROR", "error": "Missing Washrooms" };
    }

    obj.washrooms = xss(data.washrooms);

    if (!data.balconies) {
        return { "msg": "ERROR", "error": "Missing Balconies" };
    }

    obj.balconies = xss(data.balconies);




    // Checking Plot Area
    if (!data.plotArea) {
        return { "msg": "ERROR", "error": "Missing Plot Area" };
    }
    // Adding Plot Area
    obj.plotArea = Number(xss(data.plotArea));


    // Checking Plot Area Unit
    if (!data.plotAreaUnit) {
        return { "msg": "ERROR", "error": "Missing Plot Area Unit" };
    }
    // Adding Plot Area Unit
    obj.plotAreaUnit = xss(data.plotAreaUnit);



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




    // --------------------------------- OTHER ROOMS ARRAY STARTING ---------------------------------


    let otherRoom = [];

    if (data.otherRoom.length) {
        for (let a = 0; a < data.otherRoom.length; a++) {
            otherRoom.push(xss(data.otherRoom[a]));
        }
    }

    obj.otherRoom = otherRoom;


    // --------------------------------- OTHER ROOMS ARRAY ENDING ---------------------------------


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
    }

    if (data.availabilityStatus == "Under construction") {
        if (data.expectedByYear) {
            obj.expectedByYear = xss(data.expectedByYear);
        } else {
            return { "msg": "ERROR", "error": "Missing Expected by Year" };
        }
    }


    // Checking quality Rating
    if (!data.qualityRating) {
        return { "msg": "ERROR", "error": "Missing Quality Rating" };
    }
    // Adding quality Rating
    obj.qualityRating = xss(data.qualityRating);




    // Checking OwnerShip Type
    if (!data.ownership) {
        return { "msg": "ERROR", "error": "Missing Ownership" };
    }
    // Adding OwnerShip Type
    obj.ownership = xss(data.ownership);


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
        additionalPricingDetails.expectedRental = Number(xss(data.additionalPricingDetails.expectedRental));
        additionalPricingDetails.bookingAmount = Number(xss(data.additionalPricingDetails.bookingAmount));
        additionalPricingDetails.annualDuesPayable = Number(xss(data.additionalPricingDetails.annualDuesPayable));

        obj.additionalPricingDetails = additionalPricingDetails;
    }




    if (!data.preLeased_Rented) {
        return { "msg": "ERROR", "error": "Missing Pre Leased / Pre Rented" };
    }
    obj.preLeased_Rented = xss(data.preLeased_Rented);


    if (data.preLeased_Rented == "Yes") {
        let preLeased_RentedDetails = {};

        preLeased_RentedDetails.currentRentPerMonth = Number(xss(data.preLeased_RentedDetails.currentRentPerMonth));
        preLeased_RentedDetails.leaseTenureInYear = xss(data.preLeased_RentedDetails.leaseTenureInYear);
        preLeased_RentedDetails.annualRentIncrease = xss(data.preLeased_RentedDetails.annualRentIncrease);
        preLeased_RentedDetails.businessType = xss(data.preLeased_RentedDetails.businessType);

        obj.preLeased_RentedDetails = preLeased_RentedDetails;
    }




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




    // Checking Property Facing (Direction of Property)
    if (!data.propertyFacing) {
        return { "msg": "ERROR", "error": "Missing Property Facing Direction" };
    }
    // Adding Property Facing
    obj.propertyFacing = xss(data.propertyFacing);


    // Checking Property Flooring Type
    if (!data.flooring) {
        return { "msg": "ERROR", "error": "Missing Property Flooring Type" };
    }
    // Adding Property Flooring Type
    obj.flooring = xss(data.flooring);




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


module.exports = { guestHouse_BanquetHall };
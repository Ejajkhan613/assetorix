const xss = require("xss");


function independentHouse_villa(data) {

    // --------------------------------- MAIN OBJECT ---------------------------------

    // Main Object that will be saved in DB
    let obj = {};



    // --------------------------------- ADDRESS STARTING ---------------------------------

    // Checking if address object is present in the input from frontend
    if (!data.address) {
        return { "msg": "ERROR", "error": "address Data is not Present" };
    }

    // if present then creating a new address object that will be added in Main Object
    let address = {};



    // Checking House Number
    if (data.address.houseNumber) {
        // Adding House Number
        address.houseNumber = xss(data.address.houseNumber);
    }


    // Checking Apartment Name
    if (data.address.apartmentName) {
        // Adding Apartment Name
        address.apartmentName = xss(data.address.apartmentName);
    }


    // Checking Pincode
    if (!data.address.pincode) {
        return { "msg": "ERROR", "error": "Missing pincode" };
    }
    // Adding Pincode
    address.pincode = xss(data.address.pincode);


    // Checking Locality
    if (!data.address.locality) {
        return { "msg": "ERROR", "error": "Missing locality" };
    }
    // Adding Locality
    address.locality = xss(data.address.locality);


    // Checking City
    if (!data.address.city) {
        return { "msg": "ERROR", "error": "Missing city" };
    }
    // Adding City
    address.city = xss(data.address.city);


    // Checking State
    if (!data.address.state) {
        return { "msg": "ERROR", "error": "Missing state" };
    }
    // Adding State
    address.state = xss(data.address.state);


    // Checking Country
    if (!data.address.country) {
        return { "msg": "ERROR", "error": "Missing country" };
    }
    // Adding Country
    address.country = xss(data.address.country);


    // Adding Address Object in Main Object
    obj.address = address;

    // --------------------------------- ADDRESS ENDING ---------------------------------




    // --------------------------------- ROOM DETAILS STARTING ---------------------------------


    // Checking if roomDetails Object is not present
    if (!data.roomDetails) {
        return { "msg": "ERROR", "error": "Room Details Data is not Present" }
    }

    // if present then creating a new roomDetails object that will be added in Main Object
    let roomDetails = {};


    // Checking Bedroom Counts
    if (!data.roomDetails.bedroom) {
        return { "msg": "ERROR", "error": "Missing Bedrooms Quantity" };
    }
    // Adding Bedroom Counts
    roomDetails.bedroom = Number(xss(data.roomDetails.bedroom));


    // Checking Bathroom Counts
    if (!data.roomDetails.bathroom) {
        return { "msg": "ERROR", "error": "Missing Bathrooms Quantity" };
    }
    // Adding Bathroom Counts
    roomDetails.bathroom = Number(xss(data.roomDetails.bathroom));


    // Checking Balcony Counts
    if (!data.roomDetails.balcony) {
        return { "msg": "ERROR", "error": "Missing Balconys Quantity" };
    }
    // Adding Balcony Counts
    roomDetails.balcony = Number(xss(data.roomDetails.balcony));

    obj.roomDetails = roomDetails;

    // --------------------------------- ROOM DETAILS ENDING ---------------------------------




    // Checking Looking For
    if (!data.lookingFor) {
        return { "msg": "ERROR", "error": "Missing lookingFor" };
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


    // Checking OwnerShip Type
    if (!data.ownership) {
        return { "msg": "ERROR", "error": "Missing Ownership" };
    }
    // Adding OwnerShip Type
    obj.ownership = xss(data.ownership);


    // Checking Property Price
    if (!data.price) {
        return { "msg": "ERROR", "error": "Missing price" };
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






    // --------------------------------- WATER SOURCES ARRAY STARTING ---------------------------------


    let waterSources = [];

    if (data.waterSources.length) {
        for (let a = 0; a < data.waterSources.length; a++) {
            waterSources.push(xss(data.waterSources[a]));
        }
    }

    obj.waterSources = waterSources;


    // --------------------------------- WATER SOURCES ARRAY ENDING ---------------------------------





    // --------------------------------- OTHER FEATURES ARRAY STARTING ---------------------------------


    let otherFeatures = [];

    if (data.otherFeatures.length) {
        for (let a = 0; a < data.otherFeatures.length; a++) {
            otherFeatures.push(xss(data.otherFeatures[a]));
        }
    }

    obj.otherFeatures = otherFeatures;


    // --------------------------------- OTHER FEATURES ARRAY ENDING ---------------------------------





    // --------------------------------- OVER LOOKINGS ARRAY STARTING ---------------------------------


    let overLookings = [];

    if (data.overLookings.length) {
        for (let a = 0; a < data.overLookings.length; a++) {
            overLookings.push(xss(data.overLookings[a]));
        }
    }

    obj.overLookings = overLookings;


    // --------------------------------- OVER LOOKINGS ARRAY ENDING ---------------------------------



    // --------------------------------- LOCATION ADVANTAGES ARRAY STARTING ---------------------------------


    let locationAdv = [];

    if (data.locationAdv.length) {
        for (let a = 0; a < data.locationAdv.length; a++) {
            locationAdv.push(xss(data.locationAdv[a]));
        }
    }

    obj.locationAdv = locationAdv;


    // --------------------------------- LOCATION ADVANTAGES ARRAY ENDING ---------------------------------



    // --------------------------------- FURNISHED LIST ARRAY STARTING ---------------------------------

    obj.furnished = data.furnished;

    if (data.furnished == "Furnished" || data.furnished == "Semi-Furnished") {

        let furnishedList = [];

        if (data.furnishedList.length) {
            for (let a = 0; a < data.furnishedList.length; a++) {
                furnishedList.push(xss(data.furnishedList[a]));
            }
        }

        obj.furnishedList = furnishedList;

        let furnishedObj = {};

        furnishedObj.light = xss(data.furnishedObj.light);
        furnishedObj.fans = xss(data.furnishedObj.fans);
        furnishedObj.ac = xss(data.furnishedObj.ac);
        furnishedObj.tv = xss(data.furnishedObj.tv);
        furnishedObj.beds = xss(data.furnishedObj.beds);
        furnishedObj.wardrobe = xss(data.furnishedObj.wardrobe);
        furnishedObj.geyser = xss(data.furnishedObj.geyser);

        obj.furnishedObj = furnishedObj;
    }



    // --------------------------------- FURNISHED LIST ARRAY ENDING ---------------------------------



    // --------------------------------- OTHER ROOMS ARRAY STARTING ---------------------------------


    let otherRoom = [];

    if (data.otherRoom.length) {
        for (let a = 0; a < data.otherRoom.length; a++) {
            otherRoom.push(xss(data.otherRoom[a]));
        }
    }

    obj.otherRoom = otherRoom;


    // --------------------------------- OTHER ROOMS ARRAY ENDING ---------------------------------



    // --------------------------------- PARKING OBJECT STARTING ---------------------------------


    // Checking if parking object is present in the input from frontend
    if (!data.parking) {
        return { "msg": "ERROR", "error": "Parking Data is not Present" };
    }

    // if present then creating a new parking object that will be added in Main Object
    let parking = {};


    // Checking Open Parking
    if (data.parking.openParking) {
        parking.openParking = Number(xss(data.parking.openParking));
    }



    // Checking Close Parking
    if (!data.parking.closeParking) {
        parking.closeParking = Number(xss(data.parking.closeParking));
    }

    obj.parking = parking;



    // --------------------------------- PARKING OBJECT ENDING ---------------------------------







    // Checking Power Backup
    if (!data.powerBackup) {
        return { "msg": "ERROR", "error": "Missing Power Backup" };
    }
    // Adding Power Backup
    obj.powerBackup = xss(data.powerBackup);


    // Checking Property Facing (Direction of Property)
    if (!data.propertyFacing) {
        return { "msg": "ERROR", "error": "Missing Property Facing" };
    }
    // Adding Property Facing
    obj.propertyFacing = xss(data.propertyFacing);


    // Checking Property Flooring Type
    if (!data.flooring) {
        return { "msg": "ERROR", "error": "Missing Property Flooring Type" };
    }
    // Adding Property Flooring Type
    obj.flooring = xss(data.flooring);



    // Checking Main Road Width
    if (!data.roadFacingWidth) {
        return { "msg": "ERROR", "error": "Missing Main Road Width" };
    }
    // Adding Main Road Width
    obj.roadFacingWidth = xss(data.roadFacingWidth);


    // Checking Main Road Width Type
    if (!data.roadFacingWidthType) {
        return { "msg": "ERROR", "error": "Missing Main Road Width Type" };
    }
    // Adding Main Road Width Type
    obj.roadFacingWidthType = xss(data.roadFacingWidthType);


    // Checking Total Floors
    if (!data.totalFloors) {
        return { "msg": "ERROR", "error": "Total Floors" };
    }
    // Adding Total Floors
    obj.totalFloors = Number(xss(data.totalFloors));


    // Checking which Floor Number is Going to sell
    // if (!data.floorOn) {
    //     return { "msg": "ERROR", "error": "Missing Property Floor Number" };
    // }
    // Adding Floor Number
    // obj.floorOn = xss(data.floorOn);


    if (!data.plotArea) {
        return { "msg": "ERROR", "error": "Missing Plot Area" };
    }
    obj.plotArea = Number(xss(data.plotArea));


    if (!data.areaUnit) {
        return { "msg": "ERROR", "error": "Missing Plot Area Unit" };
    }
    obj.areaUnit = xss(data.areaUnit);


    if (!data.countryCurrency) {
        return { "msg": "ERROR", "error": "Missing Country Currency Code" };
    }
    obj.countryCurrency = xss(data.countryCurrency);


    if (!data.description) {
        return { "msg": "ERROR", "error": "Missing Description" };
    }
    obj.description = xss(data.description);



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

    return { "msg": "SUCCESS", "data": obj };
}


module.exports = { flat_apartment };
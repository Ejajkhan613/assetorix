const xss = require("xss");


function flat_apartment_Sell(data) {

    // --------------------------------- MAIN OBJECT ---------------------------------

    // Main Object that will be saved in DB
    let obj = {};




    // Checking Looking For
    if (!data.lookingFor) {
        return { "msg": "ERROR", "error": "Missing looking For" };
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




    // --------------------------------- ADDRESS STARTING ---------------------------------

    // Checking if address object is present in the input from frontend
    if (!data.address) {
        return { "msg": "ERROR", "error": "Address Details not Present" };
    }

    // if present then creating a new address object that will be added in Main Object
    let address = {};


    // Checking House Number
    if (data.address.houseNumber) {
        // Adding House Number
        address.houseNumber = xss(data.address.houseNumber);
    }


    // Checking Apartment Name
    if (!data.address.apartmentName) {
        return { "msg": "ERROR", "error": "Missing Apartment Name" };
    }
    // Adding Apartment Name
    address.apartmentName = xss(data.address.apartmentName);


    // Checking Pincode
    if (!data.address.pincode) {
        return { "msg": "ERROR", "error": "Missing Pincode" };
    }
    // Adding Pincode
    address.pincode = Number(xss(data.address.pincode));


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
        return { "msg": "ERROR", "error": "Missing Balconies Quantity" };
    }
    // Adding Balcony Counts
    roomDetails.balcony = Number(xss(data.roomDetails.balcony));

    obj.roomDetails = roomDetails;

    // --------------------------------- ROOM DETAILS ENDING ---------------------------------



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


    // Adding Builtup Area
    if (data.builtupArea) {
        obj.builtupArea = Number(xss(data.builtupArea));
    }

    // Adding Builtup Area Unit
    if (data.builtupAreaUnit) {
        obj.builtupAreaUnit = xss(data.builtupAreaUnit);
    }


    // Adding Super Builtup Area
    if (data.superBuiltupArea) {
        obj.superBuiltupArea = Number(xss(data.superBuiltupArea));
    }

    // Adding Super Builtup Area Unit
    if (data.superBuiltupAreaUnit) {
        obj.superBuiltupAreaUnit = xss(data.superBuiltupAreaUnit);
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

        furnishedObj.light = Number(xss(data.furnishedObj.light));
        furnishedObj.fans = Number(xss(data.furnishedObj.fans));
        furnishedObj.ac = Number(xss(data.furnishedObj.ac));
        furnishedObj.tv = Number(xss(data.furnishedObj.tv));
        furnishedObj.beds = Number(xss(data.furnishedObj.beds));
        furnishedObj.wardrobe = Number(xss(data.furnishedObj.wardrobe));
        furnishedObj.geyser = Number(xss(data.furnishedObj.geyser));

        obj.furnishedObj = furnishedObj;
    }



    // --------------------------------- FURNISHED LIST ARRAY ENDING ---------------------------------




    // --------------------------------- PARKING OBJECT STARTING ---------------------------------


    // Checking if parking object is present in the input from frontend
    if (!data.parking) {
        return { "msg": "ERROR", "error": "Missing Parking Details" };
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

    // Age of Property
    if (!data.propertyStatus) {
        return { "msg": "ERROR", "error": "Missing Property Age Detail" };
    }
    obj.propertyStatus = xss(data.propertyStatus);


    // Available From
    if (!data.availableFrom) {
        return { "msg": "ERROR", "error": "Missing Available Date" };
    }
    obj.availableFrom = xss(data.availableFrom);


    // --------------------------------- WILLING TO STARTING ---------------------------------


    let willingToRent = [];

    if (data.willingToRent.length) {
        for (let a = 0; a < data.willingToRent.length; a++) {
            willingToRent.push(xss(data.willingToRent[a]));
        }
    }

    obj.willingToRent = willingToRent;


    // --------------------------------- WILLING TO ENDING ---------------------------------







    return { "msg": "SUCCESS", "data": obj };
}


module.exports = { flat_apartment_Sell };
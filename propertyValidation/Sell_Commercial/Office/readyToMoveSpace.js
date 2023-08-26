const xss = require("xss");


function readyToMoveSpace(data) {

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



    // Office Type
    if (!data.officeType) {
        return { "msg": "ERROR", "error": "Missing Office Type" };
    }
    // Adding Office Type
    obj.officeType = xss(data.officeType);



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


    // Checking Super Builtup Area
    if (data.superBuiltupArea) {
        obj.superBuiltupArea = Number(xss(data.superBuiltupArea));
    }

    // Checking Super Builtup Area Unit
    if (data.superBuiltupAreaUnit) {
        obj.superBuiltupAreaUnit = xss(data.superBuiltupAreaUnit);
    }


    // --------------------------------- ADDRESS STARTING ---------------------------------

    // Checking if address object is present in the input from frontend
    if (!data.address) {
        return { "msg": "ERROR", "error": "Address Details not Present" };
    }

    // if present then creating a new address object that will be added in Main Object
    let address = {};


    // Checking Zone Type
    if (!data.address.zoneType) {
        return { "msg": "ERROR", "error": "Missing Zone Type" };
    }
    // Adding Zone Type
    address.zoneType = xss(data.address.zoneType);


    // Checking Located Inside
    if (!data.address.locatedInside) {
        return { "msg": "ERROR", "error": "Missing Located Inside" };
    }
    // Adding Located Inside
    address.locatedInside = xss(data.address.locatedInside);


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




    // --------------------------------- OFFICE SETUP DETAILS STARTING ---------------------------------


    // Checking if office Setup Object is not present
    if (!data.officeSetup) {
        return { "msg": "ERROR", "error": "Office Setup Details is not Present" }
    }

    // if present then creating a new office Setup object that will be added in Main Object
    let officeSetup = {};


    // Checking Bedroom Counts
    if (!data.officeSetup.minSeats) {
        return { "msg": "ERROR", "error": "Missing Minimum Number of Seats" };
    }
    // Adding minSeats Counts
    officeSetup.minSeats = Number(xss(data.officeSetup.minSeats));


    // Checking maxSeats Counts
    if (data.officeSetup.maxSeats) {
        officeSetup.maxSeats = Number(xss(data.officeSetup.maxSeats));
    }


    // Checking cabins Counts
    if (!data.officeSetup.cabins) {
        return { "msg": "ERROR", "error": "Missing Number of Cabins" };
    }
    // Adding cabins Counts
    officeSetup.cabins = Number(xss(data.officeSetup.cabins));

    obj.officeSetup = officeSetup;





    // Checking meetingRooms Counts
    if (!data.officeSetup.meetingRooms) {
        return { "msg": "ERROR", "error": "Number of Meeting Rooms Missing" };
    }
    // Adding meetingRooms Counts
    officeSetup.meetingRooms = Number(xss(data.officeSetup.meetingRooms));

    // --------------------------------- OFFICE SETUP DETAILS ENDING ---------------------------------


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


    // Conference Room
    if (!data.conferenceRoom) {
        return { "msg": "ERROR", "error": "Missing Conference Room Detail" };
    }
    obj.conferenceRoom = xss(data.conferenceRoom);



    // Reception Area
    if (!data.receptionArea) {
        return { "msg": "ERROR", "error": "Missing Reception Area Detail" };
    }
    obj.receptionArea = xss(data.receptionArea);


    // Pantry Type
    if (!data.pantryType) {
        return { "msg": "ERROR", "error": "Missing Pantry Type Detail" };
    }
    obj.pantryType = xss(data.pantryType);

    if (data.pantryType == "Private" || data.pantryType == "Shared") {

        if (data.pantrySize) {
            obj.pantrySize = xss(data.pantrySize);
        }

        if (data.pantrySizeUnit) {
            obj.pantrySizeUnit = xss(data.pantrySizeUnit);
        }
    }




    // Facility Available
    if (!data.facilityAvailable) {
        return { "msg": "ERROR", "error": "Missing Facility Available Detail" };
    }

    let facilityAvailable = {};


    if (!data.facilityAvailable.furnishing) {
        return { "msg": "ERROR", "error": "Missing Furnishing Detail" };
    }
    facilityAvailable.furnishing = xss(data.facilityAvailable.furnishing);


    if (!data.facilityAvailable.centralAirConditioning) {
        return { "msg": "ERROR", "error": "Missing Central Air Conditioning Detail" };
    }
    facilityAvailable.centralAirConditioning = xss(data.facilityAvailable.centralAirConditioning);


    if (!data.facilityAvailable.oxygenDuct) {
        return { "msg": "ERROR", "error": "Missing Oxygen Duct Detail" };
    }
    facilityAvailable.oxygenDuct = xss(data.facilityAvailable.oxygenDuct);


    if (!data.facilityAvailable.ups) {
        return { "msg": "ERROR", "error": "Missing UPS Detail" };
    }
    facilityAvailable.ups = xss(data.facilityAvailable.ups);

    obj.facilityAvailable = facilityAvailable;





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



    // --------------------------------- FIRE SAFETY ARRAY ENDING ---------------------------------



    // Checking Missing Total Floors
    if (!data.totalFloors) {
        return { "msg": "ERROR", "error": "Missing Total Floors" };
    }
    // Adding Missing Total Floors
    obj.totalFloors = Number(xss(data.totalFloors));


    // Checking which Floor Number is Going to sell
    if (data.floorOn && data.floorOn.length) {
        let floorOn = [];


        for (let a = 0; a < data.floorOn.length; a++) {
            floorOn.push(xss(data.floorOn[a]));
        }

        obj.floorOn = floorOn;
    }




    // Checking Missing Total Floors
    if (data.staircases) {
        obj.staircases = Number(xss(data.staircases));
    }



    // Checking Lift Details
    if (!data.lift) {
        return { "msg": "ERROR", "error": "Missing Lift Details" };
    }
    obj.lift = xss(lift);

    if (data.lift == "Available") {
        let liftDetails = {};


        liftDetails.passenger = Number(xss(data.liftDetails.passenger));
        liftDetails.service = Number(xss(data.liftDetails.service));
        liftDetails.modern = xss(data.liftDetails.modern);
    }



    // Checking Lift Details
    if (!data.parking) {
        return { "msg": "ERROR", "error": "Missing parking Details" };
    }
    obj.parking = xss(parking);

    if (data.parking == "Available") {

        let parkingDetailsList = [];

        for (let a = 0; a < data.parkingDetailsList.length; a++) {
            parkingDetailsList.push(xss(data.parkingDetailsList[a]));
        }

        obj.parkingDetailsList = parkingDetailsList;

        if (data.parkingCount) {
            obj.parkingCount = Number(xss(data.parkingCount));
        }
    }




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

        obj.additionalPricingDetails = additionalPricingDetails;
    }


    if (!data.preLeased_Rented) {
        return { "msg": "ERROR", "error": "Missing Pre Leased / Pre Rented" };
    }
    obj.preLeased_Rented = xss(preLeased_Rented);


    if (!data.noc) {
        return { "msg": "ERROR", "error": "Missing NOC Certified" };
    }
    obj.noc = xss(noc);


    if (!data.occupancy) {
        return { "msg": "ERROR", "error": "Missing Occupancy Certified" };
    }
    obj.occupancy = xss(occupancy);





    // --------------------------------- AMENITIES ARRAY STARTING ---------------------------------

    if (data.previouslyUsedList) {
        let previouslyUsedList = [];

        if (data.previouslyUsedList.length) {
            for (let a = 0; a < data.previouslyUsedList.length; a++) {
                previouslyUsedList.push(xss(data.previouslyUsedList[a]));
            }
        }

        obj.previouslyUsedList = previouslyUsedList;
    }



    // --------------------------------- AMENITIES ARRAY ENDING ---------------------------------








    // --------------------------------- AMENITIES ARRAY STARTING ---------------------------------


    let amenities = [];

    if (data.amenities.length) {
        for (let a = 0; a < data.amenities.length; a++) {
            amenities.push(xss(data.amenities[a]));
        }
    }

    obj.amenities = amenities;


    // --------------------------------- AMENITIES ARRAY ENDING ---------------------------------




    // --------------------------------- LOCATION ADVANTAGES ARRAY STARTING ---------------------------------


    let locationAdv = [];

    if (data.locationAdv.length) {
        for (let a = 0; a < data.locationAdv.length; a++) {
            locationAdv.push(xss(data.locationAdv[a]));
        }
    }

    obj.locationAdv = locationAdv;


    // --------------------------------- LOCATION ADVANTAGES ARRAY ENDING ---------------------------------





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





    return { "msg": "SUCCESS", "data": obj };
}


module.exports = { readyToMoveSpace };
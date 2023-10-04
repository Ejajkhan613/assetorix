const xss = require("xss");


function bareShellOfficeSpace_Rent(data) {

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






    // Checking Super Builtup Area
    if (!data.superBuiltupArea) {
        return { "msg": "ERROR", "error": "Missing Super Builtup Area" };
    }
    obj.superBuiltupArea = Number(xss(data.superBuiltupArea));

    // Checking Super Builtup Area Unit
    if (!data.superBuiltupAreaUnit) {
        return { "msg": "ERROR", "error": "Missing Super Builtup Area Unit" };
    }
    obj.superBuiltupAreaUnit = xss(data.superBuiltupAreaUnit);


    // Carpet Area
    if (data.carpetArea) {
        obj.carpetArea = Number(xss(data.carpetArea));
    }

    // Carpet Area Unit
    if (data.carpetAreaUnit) {
        obj.carpetAreaUnit = xss(data.carpetAreaUnit);
    }


    // Checking Minimum Super Builtup Area
    if (!data.minLeasableSuperBuiltupArea) {
        return { "msg": "ERROR", "error": "Missing Minimum Super Builtup Area" };
    }
    obj.minLeasableSuperBuiltupArea = Number(xss(data.minLeasableSuperBuiltupArea));

    // Checking Minimum Super Builtup Area Unit
    if (!data.minLeasableSuperBuiltupAreaUnit) {
        return { "msg": "ERROR", "error": "Missing Minimum Super Builtup Area Unit" };
    }
    obj.minLeasableSuperBuiltupAreaUnit = xss(data.minLeasableSuperBuiltupAreaUnit);





    // Checking Construction Status of Walls
    if (!data.wallStatus) {
        return { "msg": "ERROR", "error": "Missing Status of Walls" };
    }
    // Adding Construction Status of Walls
    obj.wallStatus = xss(data.wallStatus);


    // Checking Doors Status
    if (!data.doorStatus) {
        return { "msg": "ERROR", "error": "Missing Construction of Doors" };
    }
    // Adding Doors Status
    obj.doorStatus = xss(data.doorStatus);



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
        washroomDetails.privateWashrooms = Number(xss(data.washroomDetails.privateWashrooms));

        if (!data.washroomDetails.sharedWashrooms) {
            return { "msg": "ERROR", "error": "Missing Number of Shared Washrooms" };
        }
        washroomDetails.sharedWashrooms = Number(xss(data.washroomDetails.sharedWashrooms));
    }

    // --------------------------------- WASHROOM DETAILS ENDING ---------------------------------



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



    // Checking Property Flooring Type
    if (!data.flooring) {
        return { "msg": "ERROR", "error": "Missing Property Flooring Type" };
    }
    // Adding Property Flooring Type
    obj.flooring = xss(data.flooring);




    // Facility Available
    if (!data.facilityAvailable) {
        return { "msg": "ERROR", "error": "Missing Facility Available Detail" };
    }

    let facilityAvailable = {};

    if (!data.facilityAvailable.centralAirConditioning) {
        return { "msg": "ERROR", "error": "Missing Central Air Conditioning Detail" };
    }
    facilityAvailable.centralAirConditioning = xss(data.facilityAvailable.centralAirConditioning);


    if (!data.facilityAvailable.oxygenDuct) {
        return { "msg": "ERROR", "error": "Missing Oxygen Duct Detail" };
    }
    facilityAvailable.oxygenDuct = xss(data.facilityAvailable.oxygenDuct);


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
    if (data.floorOn) {
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
    obj.lift = xss(data.lift);

    if (data.lift == "Available") {
        let liftDetails = {};


        liftDetails.passenger = Number(xss(data.liftDetails.passenger));
        liftDetails.service = Number(xss(data.liftDetails.service));
        liftDetails.modern = xss(data.liftDetails.modern);
        obj.liftDetails = liftDetails;
    }



    // Checking Lift Details
    if (!data.parking) {
        return { "msg": "ERROR", "error": "Missing parking Details" };
    }
    obj.parking = xss(data.parking);

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





    if (!data.noc) {
        return { "msg": "ERROR", "error": "Missing NOC Certified" };
    }
    obj.noc = xss(data.noc);


    if (!data.occupancy) {
        return { "msg": "ERROR", "error": "Missing Occupancy Certified" };
    }
    obj.occupancy = xss(data.occupancy);





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


module.exports = { bareShellOfficeSpace_Rent };
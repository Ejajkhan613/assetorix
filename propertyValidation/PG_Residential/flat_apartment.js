const xss = require("xss");


function flat_apartment_PG(data) {

    // --------------------------------- MAIN OBJECT ---------------------------------

    // Main Object that will be saved in DB
    let obj = {};



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


    // Checking Room Type
    if (!data.roomType) {
        return { "msg": "ERROR", "error": "Missing Room Type" };
    }
    // Adding Room Type
    obj.roomType = xss(data.roomType);

    if (data.roomType == "Sharing") {
        // How many people can share this room
        if (!data.roomShareCount) {
            return { "msg": "ERROR", "error": "Missing How many people can share this room" };
        }
        obj.roomShareCount = xss(data.roomShareCount);
    }


    // Capacity and Availability (Optional)
    if (data.totalBedsInPG) {
        obj.totalBedsInPG = Number(xss(data.totalBedsInPG));
    }

    // Capacity and Availability (Optional)
    if (data.totalBedsInPGAvailable) {
        obj.totalBedsInPGAvailable = Number(xss(data.totalBedsInPGAvailable));
    }

    if (data.bedsInPGDetails) {
        let bedsInPGDetails = [];

        for (let a = 0; a < data.bedsInPGDetails.length; a++) {
            bedsInPGDetails.push(xss(data.bedsInPGDetails[a]));
        }
        obj.bedsInPGDetails = bedsInPGDetails;
    }


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

    obj.furnished = xss(data.furnished);

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

        obj.furnishedObj = furnishedObj;
    }



    // --------------------------------- FURNISHED LIST ARRAY ENDING ---------------------------------



    // --------------------------------- COMMON FURNISHED LIST ARRAY STARTING ---------------------------------

    if (data.commonFurnishedList) {

        let commonFurnishedList = [];

        if (data.commonFurnishedList.length) {
            for (let a = 0; a < data.commonFurnishedList.length; a++) {
                commonFurnishedList.push(xss(data.commonFurnishedList[a]));
            }
        }

        obj.commonFurnishedList = commonFurnishedList;

    }

    if (data.commonFurnishedObj) {

        let commonFurnishedObj = {};

        commonFurnishedObj.light = Number(xss(data.commonFurnishedObj.light));
        commonFurnishedObj.ac = Number(xss(data.commonFurnishedObj.ac));
        commonFurnishedObj.tv = Number(xss(data.commonFurnishedObj.tv));
        commonFurnishedObj.wardrobe = Number(xss(data.commonFurnishedObj.wardrobe));
        commonFurnishedObj.washingMachine = Number(xss(data.commonFurnishedObj.washingMachine));

        obj.commonFurnishedObj = commonFurnishedObj;
    }




    // --------------------------------- COMMON FURNISHED LIST ARRAY ENDING ---------------------------------



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


    // Available for
    if (!data.availableFor) {
        return { "msg": "ERROR", "error": "Missing Available For (Girls , Boys, Any)" };
    }
    obj.availableFor = xss(data.availableFor);


    // --------------------------------- SUITABLE FOR STARTING ---------------------------------


    let suitableFor = [];

    if (data.suitableFor && data.suitableFor.length) {
        for (let a = 0; a < data.suitableFor.length; a++) {
            suitableFor.push(xss(data.suitableFor[a]));
        }
    }

    obj.suitableFor = suitableFor;


    // --------------------------------- SUITABLE FOR ENDING ---------------------------------



    // Checking Property Price
    if (!data.price) {
        return { "msg": "ERROR", "error": "Missing Price" };
    }
    // Adding Property Price
    obj.price = Number(xss(data.price));


    if (data.additionalPricingDetails) {
        let additionalPricingDetails = {};

        additionalPricingDetails.maintenancePrice = Number(xss(data.additionalPricingDetails.maintenancePrice));
        additionalPricingDetails.maintenanceTimePeriod = xss(data.additionalPricingDetails.maintenanceTimePeriod);
        additionalPricingDetails.bookingAmount = xss(data.additionalPricingDetails.bookingAmount);
        additionalPricingDetails.membershipCharge = xss(data.additionalPricingDetails.membershipCharge);

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




    // --------------------------------- TOTAL PRICE INCLUDES STARTING ---------------------------------


    let totalPriceIncludesList = [];

    if (data.totalPriceIncludesList.length) {
        for (let a = 0; a < data.totalPriceIncludesList.length; a++) {
            totalPriceIncludesList.push(xss(data.totalPriceIncludesList[a]));
        }
    }

    obj.totalPriceIncludesList = totalPriceIncludesList;


    // Services Excluding Price
    if (data.servicesExcludingPrice) {
        let servicesExcludingPrice = {};

        if (data.servicesExcludingPrice.laundry) {
            servicesExcludingPrice.laundry = xss(data.servicesExcludingPrice.laundry);
        }
        if (data.servicesExcludingPrice.water) {
            servicesExcludingPrice.water = xss(data.servicesExcludingPrice.water);
        }
        if (data.servicesExcludingPrice.wifi) {
            servicesExcludingPrice.wifi = xss(data.servicesExcludingPrice.wifi);
        }
        if (data.servicesExcludingPrice.housekeeping) {
            servicesExcludingPrice.housekeeping = xss(data.servicesExcludingPrice.housekeeping);
        }
        if (data.servicesExcludingPrice.dth) {
            servicesExcludingPrice.dth = xss(data.servicesExcludingPrice.dth);
        }
        if (data.servicesExcludingPrice.electricity) {
            servicesExcludingPrice.electricity = xss(data.servicesExcludingPrice.electricity);
        }
        obj.servicesExcludingPrice = servicesExcludingPrice;
    }




    // --------------------------------- TOTAL PRICE INCLUDES ENDING ---------------------------------



    // Food details
    if (!data.foodAvailability) {
        return { "msg": "ERROR", "error": "Missing Food Details Availability" };
    }
    obj.foodAvailability = xss(foodAvailability);

    if (data.foodAvailability == "Available") {

        let foodDetails = {};

        // Meal type (Optional)
        if (data.foodDetails.mealType) {
            foodDetails.mealType = xss(data.foodDetails.mealType);
        }

        // Availability of meal on weekdays (Optional)
        if (data.foodDetails.mealOnWeekdays) {
            foodDetails.mealOnWeekdays = xss(data.foodDetails.mealOnWeekdays);
        }

        // Availability of meal on weekends (Optional)
        if (data.foodDetails.mealOnWeekends) {
            foodDetails.mealOnWeekends = xss(data.foodDetails.mealOnWeekends);
        }

        // Charges for Food (Optional)
        if (data.foodDetails.chargesForFood) {
            foodDetails.chargesForFood = xss(data.foodDetails.chargesForFood);
        }


        if (data.foodDetails.chargesForFood == "Per meal basis") {
            let perMealBasis = {};
            if (data.foodDetails.perMealBasis) {

                if (data.foodDetails.perMealBasis.breakfast) {
                    perMealBasis.breakfast = xss(data.foodDetails.perMealBasis.breakfast)
                }
                if (data.foodDetails.perMealBasis.lunch) {
                    perMealBasis.lunch = xss(data.foodDetails.perMealBasis.lunch)
                }
                if (data.foodDetails.perMealBasis.dinner) {
                    perMealBasis.dinner = xss(data.foodDetails.perMealBasis.dinner)
                }
                foodDetails.perMealBasis = perMealBasis;
            }
            foodDetails.perMealBasis = perMealBasis;

        }

        if (data.foodDetails.chargesForFood == "Fixed monthly amount") {
            if (data.foodDetails.fixedMonthlyCharge) {
                foodDetails.fixedMonthlyCharge = xss(data.foodDetails.fixedMonthlyCharge);
            }
        }

        obj.foodDetails = foodDetails;

    }

    // Minimum contract duration(Optional)
    if (data.minContractDuration) {
        obj.minContractDuration = xss(data.minContractDuration);
    }



    // Months of Notice (Optional)
    if (data.monthsOfNotice) {
        obj.monthsOfNotice = xss(data.monthsOfNotice);
    }


    // Early leaving charges (Optional)
    if (data.earlyLeaveCharges) {
        obj.earlyLeaveCharges = xss(data.earlyLeaveCharges);
    }

    if (data.earlyLeaveCharges == "Fixed") {
        if (data.earlyLeaveChargesAmount) {
            obj.earlyLeaveChargesAmount = Number(xss(data.earlyLeaveChargesAmount));
        }
    }

    if (data.earlyLeaveCharges == "Multiple of Rent") {
        if (data.earlyLeaveRentInMonths) {
            obj.earlyLeaveRentInMonths = Number(xss(data.earlyLeaveRentInMonths));
        }
    }


    // Some house rules(Optional)

    if (data.houseRules) {
        let houseRules = {};

        if (data.houseRules.petsAllowed) {
            obj.houseRules.petsAllowed = xss(data.houseRules.petsAllowed);
        }
        if (data.houseRules.visitorsAllowed) {
            obj.houseRules.visitorsAllowed = xss(data.houseRules.visitorsAllowed);
        }
        if (data.houseRules.smokingAllowed) {
            obj.houseRules.smokingAllowed = xss(data.houseRules.smokingAllowed);
        }
        if (data.houseRules.alcoholAllowed) {
            obj.houseRules.alcoholAllowed = xss(data.houseRules.alcoholAllowed);
        }
        if (data.houseRules.partyEventAllowed) {
            obj.houseRules.partyEventAllowed = xss(data.houseRules.partyEventAllowed);
        }

        obj.houseRules = houseRules;
    }

    if (data.lastEntryTime) {
        obj.lastEntryTime = xss(data.lastEntryTime);
    }

    if (data.otherRules) {
        obj.otherRules = xss(data.otherRules);
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




    // Checking Power Backup
    if (!data.powerBackup) {
        return { "msg": "ERROR", "error": "Missing Power Backup Details" };
    }
    // Adding Power Backup
    obj.powerBackup = xss(data.powerBackup);


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


module.exports = { flat_apartment_PG };
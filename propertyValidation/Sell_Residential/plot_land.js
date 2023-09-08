const xss = require("xss");


function plot_land(data) {

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



    // Checking Plot Number
    if (data.address.plotNumber) {
        // Adding Plot Number
        address.plotNumber = xss(data.address.plotNumber);
    }


    // Checking Apartment Name
    if (data.address.apartmentName) {
        // Adding Apartment Name
        address.apartmentName = xss(data.address.apartmentName);
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



    // --------------------------------- AMENITIES ARRAY STARTING ---------------------------------


    let amenities = [];

    if (data.amenities.length) {
        for (let a = 0; a < data.amenities.length; a++) {
            amenities.push(xss(data.amenities[a]));
        }
    }

    obj.amenities = amenities;


    // --------------------------------- AMENITIES ARRAY ENDING ---------------------------------



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




    // Checking Property Facing (Direction of Property)
    if (!data.propertyFacing) {
        return { "msg": "ERROR", "error": "Missing Property Facing Direction" };
    }
    // Adding Property Facing
    obj.propertyFacing = xss(data.propertyFacing);


    // Checking Main Road Width
    if (!data.roadFacingWidth) {
        return { "msg": "ERROR", "error": "Missing Main Road Width" };
    }
    // Adding Main Road Width
    obj.roadFacingWidth = Number(Number(xss(data.roadFacingWidth)));


    // Checking Main Road Width Type
    if (!data.roadFacingWidthType) {
        return { "msg": "ERROR", "error": "Missing Main Road Width Type" };
    }
    // Adding Main Road Width Type
    obj.roadFacingWidthType = xss(data.roadFacingWidthType);


    // Checking Missing Total Floors
    if (!data.totalFloorsAllowed) {
        return { "msg": "ERROR", "error": "Missing Total Allowed Floors" };
    }
    // Adding Missing Total Floors
    obj.totalFloorsAllowed = Number(xss(data.totalFloorsAllowed));


    // Checking Boundary Wall Detail
    if (!data.boundaryWall) {
        return { "msg": "ERROR", "error": "Missing Boundary Wall Detail" };
    }
    // Adding Boundary Wall Detail
    obj.boundaryWall = xss(data.boundaryWall);


    // Checking Number of Open Sides
    if (!data.openSides) {
        return { "msg": "ERROR", "error": "Missing Number of Open Sides" };
    }
    // Adding Number of Open Sides
    obj.openSides = xss(data.openSides);


    // Checking Any Construction Done Detail
    if (!data.constructionOnProperty) {
        return { "msg": "ERROR", "error": "Missing Any Construction On Plot Detail" };
    }
    // Adding Any Construction Done Detail
    obj.constructionOnProperty = xss(data.constructionOnProperty);


    // Adding List if Constructions Done on Plot
    if (data.constructionOnProperty == "Yes") {

        let constructionOnPropertyList = [];

        for (let a = 0; a < data.constructionOnPropertyList.length; a++) {
            constructionOnPropertyList.push(xss(data.constructionOnPropertyList[a]));
        }
        obj.constructionOnPropertyList = constructionOnPropertyList;
    }


    // Adding List of Property Approval Authorities
    if (data.propertyApprovalAuthorityList) {

        let propertyApprovalAuthorityList = [];

        for (let a = 0; a < data.propertyApprovalAuthorityList.length; a++) {
            propertyApprovalAuthorityList.push(xss(data.propertyApprovalAuthorityList[a]));
        }
        obj.propertyApprovalAuthorityList = propertyApprovalAuthorityList;
    }



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


    // Adding Plot Length
    if (data.plotLength) {
        obj.plotLength = Number(xss(data.plotLength));
    }



    // Adding Plot Breadth
    if (data.plotBreadth) {
        obj.plotBreadth = Number(xss(data.plotBreadth));
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


    // Checking Plot Expected By Year
    if (!data.expectedByYear) {
        return { "msg": "ERROR", "error": "Missing Expected by Year" };
    }
    // Checking Plot Expected By Year
    obj.expectedByYear = xss(data.expectedByYear);



    if (data.additionalPricingDetails) {
        let additionalPricingDetails = {};

        additionalPricingDetails.maintenancePrice = Number(xss(data.additionalPricingDetails.maintenancePrice));
        additionalPricingDetails.maintenanceTimePeriod = xss(data.additionalPricingDetails.maintenanceTimePeriod);
        additionalPricingDetails.expectedRental = Number(xss(data.additionalPricingDetails.expectedRental));
        additionalPricingDetails.bookingAmount = Number(xss(data.additionalPricingDetails.bookingAmount));
        additionalPricingDetails.annualDuesPayable = Number(xss(data.additionalPricingDetails.annualDuesPayable));

        obj.additionalPricingDetails = additionalPricingDetails;
    }

    return { "msg": "SUCCESS", "data": obj };
}


module.exports = { plot_land };
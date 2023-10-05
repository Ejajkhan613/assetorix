const xss = require("xss");


function industrialLands_Plots(data) {


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
    if (!data.plotLandType) {
        return { "msg": "ERROR", "error": "Missing Plot Land Type" };
    }
    // Adding Office Type
    obj.plotLandType = xss(data.plotLandType);



    // --------------------------------- ADDRESS STARTING ---------------------------------

    // Checking if address object is present in the input from frontend
    if (!data.address) {
        return { "msg": "ERROR", "error": "Address Details not Present" };
    }

    // if present then creating a new address object that will be added in Main Object
    let address = {};



    // Checking Plot Number
    if (!data.address.plotNumber) {
        return { "msg": "ERROR", "error": "Missing Plot Number" };
    }
    // Adding Plot Number
    address.plotNumber = xss(data.address.plotNumber);



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
        obj.plotLength = xss(data.plotLength);
    }



    // Adding Plot Breadth
    if (data.plotBreadth) {
        obj.plotBreadth = xss(data.plotBreadth);
    }


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




    // Checking Property Facing (Direction of Property)
    if (!data.propertyFacing) {
        return { "msg": "ERROR", "error": "Missing Property Facing Direction" };
    }
    // Adding Property Facing
    obj.propertyFacing = xss(data.propertyFacing);





    // Checking Plot Expected By Year
    if (!data.expectedByYear) {
        return { "msg": "ERROR", "error": "Missing Expected by Year" };
    }
    // Checking Plot Expected By Year
    obj.expectedByYear = xss(data.expectedByYear);



    // Checking OwnerShip Type
    if (!data.ownership) {
        return { "msg": "ERROR", "error": "Missing Ownership" };
    }
    // Adding OwnerShip Type
    obj.ownership = xss(data.ownership);




    // Adding List of Property Approval Authorities
    if (data.propertyApprovalAuthorityList) {

        let propertyApprovalAuthorityList = [];

        for (let a = 0; a < data.propertyApprovalAuthorityList.length; a++) {
            propertyApprovalAuthorityList.push(xss(data.propertyApprovalAuthorityList[a]));
        }
        obj.propertyApprovalAuthorityList = propertyApprovalAuthorityList;
    }




    // Adding List of Approved Industry Type List
    if (data.approvedIndustryTypeList) {

        let approvedIndustryTypeList = [];

        for (let a = 0; a < data.approvedIndustryTypeList.length; a++) {
            approvedIndustryTypeList.push(xss(data.approvedIndustryTypeList[a]));
        }
        obj.approvedIndustryTypeList = approvedIndustryTypeList;
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
        preLeased_RentedDetails.leaseTenureInYear = Number(xss(data.preLeased_RentedDetails.leaseTenureInYear));
        preLeased_RentedDetails.annualRentIncrease = Number(xss(data.preLeased_RentedDetails.annualRentIncrease));
        preLeased_RentedDetails.businessType = xss(data.preLeased_RentedDetails.businessType);

        obj.preLeased_RentedDetails = preLeased_RentedDetails;
    } else {
        obj.preLeased_RentedDetails = {};
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




    // --------------------------------- ADDITIONAL FEATURES ARRAY STARTING ---------------------------------


    // let additionalFeatures = [];

    // if (data.additionalFeatures.length) {
    //     for (let a = 0; a < data.additionalFeatures.length; a++) {
    //         additionalFeatures.push(xss(data.additionalFeatures[a]));
    //     }
    // }

    // obj.additionalFeatures = additionalFeatures;


    // --------------------------------- ADDITIONAL FEATURES ARRAY ENDING ---------------------------------



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



module.exports = { industrialLands_Plots };
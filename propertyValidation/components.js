const xss = require("xss");


// ------------------ Basic Details START -----------------------------

// Looking For
function lookingFor(data = "") {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Looking For" };
    }

    const validTypes = new Set(["Sell", "Rent", "PG"]);
    const sanitizedData = xss(data.toString().trim());

    if (!validTypes.has(sanitizedData)) {
        return { "msg": "ERROR", "error": `Wrong Looking For Type - ${sanitizedData}` };
    }

    return { "msg": "SUCCESS", "data": sanitizedData };
}



// Property Group
function propertyGroup(data = "") {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Property Group" };
    }

    const validGroups = new Set(["Residential", "Commercial"]);
    const sanitizedData = xss(data.toString().trim());

    if (!validGroups.has(sanitizedData)) {
        return { "msg": "ERROR", "error": `Wrong Property Group - ${sanitizedData}` };
    }

    return { "msg": "SUCCESS", "data": sanitizedData };
}



// Property Type
function propertyType(data = "", propertyGroupValue) {
    if (!propertyGroupValue) {
        return { "msg": "ERROR", "error": "Missing Property Group" };
    }

    const sanitizedPropertyGroup = propertyGroup(propertyGroupValue);

    if (sanitizedPropertyGroup.msg === "ERROR") {
        return sanitizedPropertyGroup;
    }

    const sanitizedData = xss(data.toString().trim());

    let validTypes;
    if (sanitizedPropertyGroup.data === "Residential") {
        validTypes = new Set(["Flat / Apartment", "Independent House / Villa", "Independent / Builder Floor", "Serviced Apartment", "1RK / Studio Apartment", "Farmhouse", "Plot / Land"]);
    } else if (sanitizedPropertyGroup.data === "Commercial") {
        validTypes = new Set(["Office", "Storage", "Industry", "Hospitality", "Retail"]);
    } else {
        return { "msg": "ERROR", "error": `Wrong Property Group - ${sanitizedPropertyGroup.data}` };
    }

    if (!validTypes.has(sanitizedData)) {
        return { "msg": "ERROR", "error": `Wrong Property Type - ${sanitizedData}` };
    }

    return { "msg": "SUCCESS", "data": sanitizedData };
}



// Hospitality Type
function hospitalityType(data = "") {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Hospitality Type" };
    }

    const validHospitalityTypes = new Set(["Guest-House / Banquet-Hall", "Hotel / Resorts"]);

    const sanitizedData = xss(data.toString().trim());

    if (!validHospitalityTypes.has(sanitizedData)) {
        return { "msg": "ERROR", "error": `Wrong Hospitality Type - ${sanitizedData}` };
    }

    return { "msg": "SUCCESS", "data": sanitizedData };
}



// Industry Type
function industryType(data = "") {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Industry Type" };
    }

    const validIndustryTypes = new Set(["Factory", "Manufacturing"]);

    const sanitizedData = xss(data.toString().trim());

    if (!validIndustryTypes.has(sanitizedData)) {
        return { "msg": "ERROR", "error": `Wrong Industry Type - ${sanitizedData}` };
    }

    return { "msg": "SUCCESS", "data": sanitizedData };
}



// Office Type
function officeType(data = "") {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Office Type" };
    }

    const validOfficeTypes = new Set(["Co-working office space", "Bare shell office space", "Ready to move office space"]);

    const sanitizedData = xss(data.toString().trim());

    if (!validOfficeTypes.has(sanitizedData)) {
        return { "msg": "ERROR", "error": `Wrong Office Type - ${sanitizedData}` };
    }

    return { "msg": "SUCCESS", "data": sanitizedData };
}



// Plot Land Type
function plotLandType(data = "") {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Plot/Land Type" };
    }

    const validPlotLandType = new Set(["Commercial Land / Institutional Land", "Agricultural Land / Farm Land", "Industrial Lands / Plots"]);

    const sanitizedData = xss(data.toString().trim());

    if (!validPlotLandType.has(sanitizedData)) {
        return { "msg": "ERROR", "error": `Wrong Plot/Land Type - ${sanitizedData}` };
    }

    return { "msg": "SUCCESS", "data": sanitizedData };
}


// Retail Space Type
function retailSpaceType(data = "") {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Retail Space Type" };
    }

    const validRetailSpaceType = new Set(["Commercial Shops", "Commercial Showrooms"]);

    const sanitizedData = xss(data.toString().trim());

    if (!validRetailSpaceType.has(sanitizedData)) {
        return { "msg": "ERROR", "error": `Wrong Retail Space Type - ${sanitizedData}` };
    }

    return { "msg": "SUCCESS", "data": sanitizedData };
}



// Located Inside
function retailLocatedInside(data = "") {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Located Inside" };
    }

    const validRetailSpaceType = new Set(["Mall", "Commercial Project", "Residential Project", "Retail Complex / Building", "Market / High Street", "Other"]);

    const sanitizedData = xss(data.toString().trim());

    if (!validRetailSpaceType.has(sanitizedData)) {
        return { "msg": "ERROR", "error": `Wrong Located Inside - ${sanitizedData}` };
    }

    return { "msg": "SUCCESS", "data": sanitizedData };
}


// ------------------ Basic Details ENDING -----------------------------




// ------------------ Address Details START ----------------------------

// Address (Optional)
function address(data = "") {
    if (!data) {
        return { "msg": "SUCCESS", "data": "" };
    }

    const sanitizedData = xss(data.toString().trim());

    const minLength = 3;
    const maxLength = 100;

    if (sanitizedData.length < minLength || sanitizedData.length > maxLength) {
        return { "msg": "ERROR", "error": `Address should be between ${minLength} to ${maxLength} characters` };
    }

    return { "msg": "SUCCESS", "data": sanitizedData };
}



// Plot Number (Optional)
function plotNumber(data = "") {
    if (!data) {
        return { "msg": "SUCCESS", "data": "" };
    }

    const sanitizedData = xss(data.toString().trim());

    const minLength = 3;
    const maxLength = 100;

    if (sanitizedData.length < minLength || sanitizedData.length > maxLength) {
        return { "msg": "ERROR", "error": `Plot Number should be between ${minLength} to ${maxLength} characters` };
    }

    return { "msg": "SUCCESS", "data": sanitizedData };
}



// House Number (Optional)
function houseNumber(data = "") {
    if (!data) {
        return { "msg": "SUCCESS", "data": "" };
    }

    const sanitizedData = xss(data.toString().trim());

    const minLength = 2;
    const maxLength = 100;

    if (sanitizedData.length < minLength || sanitizedData.length > maxLength) {
        return { "msg": "ERROR", "error": `House Number should be between ${minLength} to ${maxLength} characters` };
    }

    return { "msg": "SUCCESS", "data": sanitizedData };
}



// Apartment Name
function apartmentName(data = "") {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Apartment Name" };
    }

    const sanitizedData = xss(data.toString().trim());

    const minLength = 3;
    const maxLength = 100;

    if (sanitizedData.length < minLength || sanitizedData.length > maxLength) {
        return { "msg": "ERROR", "error": `Apartment Name should be between ${minLength} to ${maxLength} characters` };
    }

    return { "msg": "SUCCESS", "data": sanitizedData };
}



// Pincode
function pincode(data = "") {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Pincode Number" };
    }

    const sanitizedData = xss(data.toString().trim());

    const numericPincode = parseInt(sanitizedData, 10);

    const minLength = 5;
    const maxLength = 6;

    if (isNaN(numericPincode) || !(sanitizedData.length >= minLength && sanitizedData.length <= maxLength)) {
        return { "msg": "ERROR", "error": `Invalid Pincode Number - ${sanitizedData}` };
    }

    return { "msg": "SUCCESS", "data": numericPincode };
}



// Locality
function locality(data = "") {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Locality Name" };
    }

    const sanitizedData = xss(data.toString().trim());

    const minLength = 3;
    const maxLength = 100;

    if (sanitizedData.length < minLength || sanitizedData.length > maxLength) {
        return { "msg": "ERROR", "error": `Locality Name should be between ${minLength} to ${maxLength} characters` };
    }

    return { "msg": "SUCCESS", "data": sanitizedData };
}



// City
function city(data = "") {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing City Name" };
    }

    const sanitizedData = xss(data.toString().trim());

    const minLength = 3;
    const maxLength = 100;

    if (sanitizedData.length < minLength || sanitizedData.length > maxLength) {
        return { "msg": "ERROR", "error": `City Name should be between ${minLength} to ${maxLength} characters` };
    }

    return { "msg": "SUCCESS", "data": sanitizedData };
}



// State
function state(data = "") {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing State Name" };
    }

    const sanitizedData = xss(data.toString().trim());

    const validIndiaStates = new Set(['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Jammu and Kashmir', 'Ladakh']);
    const validUSAStates = new Set(['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']);

    const minLength = 3;
    const maxLength = 100;

    if (sanitizedData.length < minLength || sanitizedData.length > maxLength) {
        return { "msg": "ERROR", "error": `State Name should be between ${minLength} to ${maxLength} characters` };
    }

    return { "msg": "SUCCESS", "data": sanitizedData };
}



// Country
function country(data = "") {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Country Name" };
    }

    const validCountries = new Set(["India", "United States of America"]);
    const sanitizedData = xss(data.toString().trim());

    if (!validCountries.has(sanitizedData)) {
        return { "msg": "ERROR", "error": `Wrong Country Name - ${sanitizedData}` };
    }

    return { "msg": "SUCCESS", "data": sanitizedData };
}



// Zone Type
function zoneType(data = "") {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Zone Type" };
    }

    const validTypes = new Set(["Industrial", "Commercial", "Residential", "Transport and Communication", "Public Utilities", "Public and Semi Public Use"]);
    const sanitizedData = xss(data.toString().trim());

    if (!validTypes.has(sanitizedData)) {
        return { "msg": "ERROR", "error": `Wrong Zone Type Selected - ${sanitizedData}` };
    }

    return { "msg": "SUCCESS", "data": sanitizedData };
}



// Located Inside Type
function locatedInside(data = "") {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Located Inside Detail" };
    }

    const validTypes = new Set(["IT Park", "Business Park", "Other"]);
    const sanitizedData = xss(data.toString().trim());

    if (!validTypes.has(sanitizedData)) {
        return { "msg": "ERROR", "error": `Wrong Located Inside Selected - ${sanitizedData}` };
    }

    return { "msg": "SUCCESS", "data": sanitizedData };
}

// ------------------ Address Details ENDING -------------------------





// ------------------ Room Details START -----------------------------

// Bedrooms
function bedroom(data = "") {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Bedroom Quantity" };
    }

    const sanitizedData = xss(data.toString().trim());

    const numericBedroom = parseInt(sanitizedData, 10);

    const minBedrooms = 0;
    const maxBedrooms = 30;

    if (isNaN(numericBedroom) || numericBedroom < minBedrooms || numericBedroom > maxBedrooms) {
        return { "msg": "ERROR", "error": `Number of Bedrooms should be between ${minBedrooms} and ${maxBedrooms}` };
    }

    return { "msg": "SUCCESS", "data": numericBedroom };
}



// Bathroom
function bathroom(data = "") {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Bathroom Quantity" };
    }

    const sanitizedData = xss(data.toString().trim());

    const numericBathroom = parseInt(sanitizedData, 10);

    const minBathrooms = 0;
    const maxBathrooms = 30;

    if (isNaN(numericBathroom) || numericBathroom < minBathrooms || numericBathroom > maxBathrooms) {
        return { "msg": "ERROR", "error": `Number of Bathrooms should be between ${minBathrooms} and ${maxBathrooms}` };
    }

    return { "msg": "SUCCESS", "data": numericBathroom };
}



// Balcony
function balcony(data = "") {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Balcony Quantity" };
    }

    const sanitizedData = xss(data.toString().trim());

    const numericBalcony = parseInt(sanitizedData, 10);

    const minBalconies = 0;
    const maxBalconies = 30;

    if (isNaN(numericBalcony) || numericBalcony < minBalconies || numericBalcony > maxBalconies) {
        return { "msg": "ERROR", "error": `Number of Balconies should be between ${minBalconies} and ${maxBalconies}` };
    }

    return { "msg": "SUCCESS", "data": numericBalcony };
}



// Rooms
function rooms(data = "") {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Total Rooms Quantity" };
    }

    const sanitizedData = xss(data.toString().trim());

    const numericRooms = parseInt(sanitizedData, 10);

    const minRooms = 0;
    const maxRooms = 100;

    if (isNaN(numericRooms) || numericRooms < minRooms || numericRooms > maxRooms) {
        return { "msg": "ERROR", "error": `Number of Rooms should be between ${minRooms} and ${maxRooms}` };
    }

    return { "msg": "SUCCESS", "data": numericRooms };
}

// ------------------ Room Details ENDING -----------------------------


// Total Washrooms
function washrooms(data = "") {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Total Washrooms Quantity" };
    }

    const sanitizedData = xss(data.toString().trim());

    const numericWashrooms = parseInt(sanitizedData, 10);

    const minWashrooms = 0;
    const maxWashrooms = 30;

    if (isNaN(numericWashrooms) || numericWashrooms < minWashrooms || numericWashrooms > maxWashrooms) {
        return { "msg": "ERROR", "error": `Number of Washrooms should be between ${minWashrooms} and ${maxWashrooms}` };
    }

    return { "msg": "SUCCESS", "data": numericWashrooms };
}



// Quality Rating
function qualityRating(data = "") {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Quality Rating" };
    }

    const validQualityRatings = new Set(["No Rating", "1 Star", "2 Star", "3 Star", "4 Star", "5 Star", "6 Star", "7 Star"]);
    const sanitizedData = xss(data.toString().trim());

    if (!validQualityRatings.has(sanitizedData)) {
        return { "msg": "ERROR", "error": `Wrong Quality Rating - ${sanitizedData}` };
    }

    return { "msg": "SUCCESS", "data": sanitizedData };
}



// ------------------ Area Details and Unit Details START -------------

const validAreaUnits = new Set(["sq.ft", "sq.yards", "sq.m", "acres", "marla", "cents", "bigha", "kottah", "kanal", "grounds", "ares", "biswa", "guntha", "aankadam", "hectares", "rood", "chataks", "perch"]);

// Plot Area
function plotArea(data) {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Plot Area" };
    }

    const numericPlotArea = Number(xss(data));

    if (isNaN(numericPlotArea)) {
        return { "msg": "ERROR", "error": `${data} is an Invalid Plot Area; it should be a number only` };
    } else if (numericPlotArea < 0) {
        return { "msg": "ERROR", "error": `Plot Area can't be below 0 - ${numericPlotArea}` };
    }

    return { "msg": "SUCCESS", "data": numericPlotArea };
}



// Plot Area Unit
function plotAreaUnit(data = "") {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Plot Area Unit" };
    }

    const sanitizedData = xss(data.toString().trim());

    if (!validAreaUnits.has(sanitizedData)) {
        return { "msg": "ERROR", "error": `${sanitizedData} is a Wrong Plot Area Unit` };
    }

    return { "msg": "SUCCESS", "data": sanitizedData };
}



// Carpet Area
function carpetArea(data) {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Carpet Area" };
    }

    const numericCarpetArea = Number(xss(data));

    if (isNaN(numericCarpetArea)) {
        return { "msg": "ERROR", "error": `${data} is an Invalid Carpet Area; it should be a number only` };
    } else if (numericCarpetArea < 0) {
        return { "msg": "ERROR", "error": `Carpet Area can't be below 0 - ${numericCarpetArea}` };
    }

    return { "msg": "SUCCESS", "data": numericCarpetArea };
}



// Carpet Area Unit
function carpetAreaUnit(data = "") {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Carpet Area Unit" };
    }

    const sanitizedData = xss(data.toString().trim());

    if (!validAreaUnits.has(sanitizedData)) {
        return { "msg": "ERROR", "error": `${sanitizedData} is a Wrong Carpet Area Unit` };
    }

    return { "msg": "SUCCESS", "data": sanitizedData };
}



// Builtup Area
function builtupArea(data) {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Builtup Area" };
    }

    const numericBuiltupArea = Number(xss(data));

    if (isNaN(numericBuiltupArea)) {
        return { "msg": "ERROR", "error": `${data} is an Invalid Builtup Area; it should be a number only` };
    } else if (numericBuiltupArea < 0) {
        return { "msg": "ERROR", "error": `Builtup Area can't be negative - ${numericBuiltupArea}` };
    }

    return { "msg": "SUCCESS", "data": numericBuiltupArea };
}



// Builtup Area Unit
function builtupAreaUnit(data = "") {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Builtup Area Unit" };
    }

    const sanitizedData = xss(data.toString().trim());

    if (!validAreaUnits.has(sanitizedData)) {
        return { "msg": "ERROR", "error": `${sanitizedData} is a Wrong Builtup Area Unit` };
    }

    return { "msg": "SUCCESS", "data": sanitizedData };
}



// Super Builtup Area
function superBuiltupArea(data) {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Super Builtup Area" };
    }

    const numericSuperBuiltupArea = Number(xss(data));

    if (isNaN(numericSuperBuiltupArea)) {
        return { "msg": "ERROR", "error": `${data} is an Invalid Super Builtup Area; it should be a number only` };
    } else if (numericSuperBuiltupArea < 0) {
        return { "msg": "ERROR", "error": `Super Builtup Area can't be negative - ${numericSuperBuiltupArea}` };
    }

    return { "msg": "SUCCESS", "data": numericSuperBuiltupArea };
}



// Super Builtup Area Unit
function superBuiltupAreaUnit(data = "") {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Super Builtup Area Unit" };
    }

    const sanitizedData = xss(data.toString().trim());

    if (!validAreaUnits.has(sanitizedData)) {
        return { "msg": "ERROR", "error": `${sanitizedData} is a Wrong Super Builtup Area Unit` };
    }

    return { "msg": "SUCCESS", "data": sanitizedData };
}

// ------------------ Area Details and Unit Details ENDING -----------------------------


// Pantry Type
function pantryType(data = "", pantrySize = "", pantrySizeUnit = "") {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Pantry Type Detail" };
    }

    const obj = {};

    const validTypes = new Set(["Shared Pantry", "No Shared Pantry"]);

    const sanitizedData = xss(data.toString().trim());

    if (!validTypes.has(sanitizedData)) {
        return { "msg": "ERROR", "error": `Wrong Pantry Type - ${sanitizedData}` };
    }

    if (sanitizedData == "Shared Pantry") {
        obj.pantryType = sanitizedData;

        if (pantrySize && pantrySizeUnit) {
            const newPantrySize = parseFloat(xss(pantrySize.trim()));
            if (isNaN(newPantrySize)) {
                return { "msg": "ERROR", "error": `Pantry Size Should be a number only` }
            }

            if (newPantrySize < 0) {
                return { "msg": "ERROR", "error": `Pantry Size can't be below 0` }
            }

            obj.pantrySize = newPantrySize;
        }

        if (pantrySize && pantrySizeUnit) {
            const newPantrySizeUnit = xss(pantrySizeUnit.trim());
            if (!validAreaUnits.has(newPantrySizeUnit)) {
                return { "msg": "ERROR", "error": `Wrong Pantry Size Unit - ${newPantrySizeUnit}` }
            }

            obj.pantrySizeUnit = newPantrySizeUnit;
        }
    } else {
        obj.pantryType = sanitizedData;
    }

    return { "msg": "SUCCESS", "data": obj };
}


// Conference Room
function conferenceRoom(data = "") {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Conference Room Detail" };
    }

    const validTypes = ["Available", "Not-Available"];

    const sanitizedData = xss(data.trim());

    if (!validTypes.includes(sanitizedData)) {
        return { "msg": "ERROR", "error": `Wrong Conference Room Detail - ${sanitizedData}` };
    }

    return { "msg": "SUCCESS", "data": sanitizedData };
}


// Reception Area
function receptionArea(data = "") {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Reception Area Detail" };
    }

    const validTypes = ["Available", "Not-Available"];

    const sanitizedData = xss(data.trim());

    if (!validTypes.includes(sanitizedData)) {
        return { "msg": "ERROR", "error": `Wrong Reception Area Detail - ${sanitizedData}` };
    }

    return { "msg": "SUCCESS", "data": sanitizedData };
}


// Facility Available with Central Air Conditioning, Oxygen Duct, Furnishing, UPS
function facilityAvailableMore(data) {
    if (!Object.keys(data).length) {
        return { "msg": "ERROR", "error": "Missing Facilities Available Detail" };
    }

    const validTypes = ["Available", "Not-Available"];

    const obj = {};

    if (!data.furnishing) {
        return { "msg": "ERROR", "error": "Missing Furnishing Detail" };
    }

    const sanitizedFurnishing = xss(data.furnishing.trim());

    if (!validTypes.includes(sanitizedFurnishing)) {
        return { "msg": "ERROR", "error": `Wrong Furnishing Detail - ${sanitizedFurnishing}` };
    }

    obj.furnishing = sanitizedFurnishing;


    if (!data.centralAirConditioning) {
        return { "msg": "ERROR", "error": "Missing Central Air Conditioning Detail" };
    }

    const sanitizedCentralAirConditioning = xss(data.centralAirConditioning.trim());

    if (!validTypes.includes(sanitizedCentralAirConditioning)) {
        return { "msg": "ERROR", "error": `Wrong Central Air Conditioning Detail - ${sanitizedCentralAirConditioning}` };
    }

    obj.centralAirConditioning = sanitizedCentralAirConditioning;


    if (!data.oxygenDuct) {
        return { "msg": "ERROR", "error": "Missing Oxygen Duct Detail" };
    }

    const sanitizedOxygenDuct = xss(data.oxygenDuct.trim());

    if (!validTypes.includes(sanitizedOxygenDuct)) {
        return { "msg": "ERROR", "error": `Wrong Oxygen Duct Detail - ${sanitizedOxygenDuct}` };
    }

    obj.oxygenDuct = sanitizedOxygenDuct;


    if (!data.ups) {
        return { "msg": "ERROR", "error": "Missing UPS Detail" };
    }

    const sanitizedUPS = xss(data.ups.trim());

    if (!validTypes.includes(sanitizedUPS)) {
        return { "msg": "ERROR", "error": `Wrong UPS Detail - ${sanitizedUPS}` };
    }

    obj.ups = sanitizedUPS;

    return { "msg": "SUCCESS", "data": obj };
}



// Facility Available with Central Air Conditioning, Oxygen Duct
function facilityAvailable(data) {
    if (!Object.keys(data).length) {
        return { "msg": "ERROR", "error": "Missing Facilities Available Detail" };
    }

    const validTypes = ["Available", "Not-Available"];

    const obj = {};

    if (!data.centralAirConditioning) {
        return { "msg": "ERROR", "error": "Missing Central Air Conditioning Detail" };
    }

    const sanitizedCentralAirConditioning = xss(data.centralAirConditioning.trim());

    if (!validTypes.includes(sanitizedCentralAirConditioning)) {
        return { "msg": "ERROR", "error": `Wrong Central Air Conditioning Detail - ${sanitizedCentralAirConditioning}` };
    }

    obj.centralAirConditioning = sanitizedCentralAirConditioning;

    if (!data.oxygenDuct) {
        return { "msg": "ERROR", "error": "Missing Oxygen Duct Detail" };
    }

    const sanitizedOxygenDuct = xss(data.oxygenDuct.trim());

    if (!validTypes.includes(sanitizedOxygenDuct)) {
        return { "msg": "ERROR", "error": `Wrong Oxygen Duct Detail - ${sanitizedOxygenDuct}` };
    }

    obj.oxygenDuct = sanitizedOxygenDuct;

    return { "msg": "SUCCESS", "data": obj };
}



// Fire Safety
function fireSafety(data = []) {
    if (!Array.isArray(data)) {
        return { "msg": "SUCCESS", "data": [] };
    }

    if (!data.length) {
        return { "msg": "SUCCESS", "data": [] };
    }

    const validTypes = ["Fire Extinguisher", "Fire Sensors", "Sprinklers", "Fire Hose"];
    const list = [];

    for (let a = 0; a < data.length; a++) {

        const value = xss(data[a].trim());

        if (!validTypes.includes(value)) {
            return { "msg": `Wrong Fire Safety Detail - ${value}` };
        }

        list.push(value);
    }

    return { "msg": "SUCCESS", "data": list };
}



// Lift with passenger, Service and Modern Lifts Detail
function liftWithPassengerServiceModern(data = "", liftDetail = {}) {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Lift Details" };
    }

    const sanitizedData = xss(data.trim());

    if (sanitizedData == "Available") {
        const liftDetails = {};

        if (!liftDetail.passenger) {
            return { "msg": "ERROR", "error": `Missing Passenger Lift Detail` }
        }

        const sanitizedPassenger = parseInt(xss(liftDetail.passenger.trim()));


        if (isNaN(sanitizedPassenger)) {
            return { "msg": "ERROR", "error": `Passenger Lift Detail should be a number only` }
        }

        if (sanitizedPassenger < 0) {
            return { "msg": "ERROR", "error": `Passenger Lift Detail can't be below 0` }
        }

        liftDetails.passenger = sanitizedPassenger;


        if (!liftDetail.service) {
            return { "msg": "ERROR", "error": `Missing Service Lift Detail` }
        }

        const sanitizedService = parseInt(xss(liftDetail.service.trim()));


        if (isNaN(sanitizedService)) {
            return { "msg": "ERROR", "error": `Service Lift Detail should be a number only` }
        }

        if (sanitizedService < 0) {
            return { "msg": "ERROR", "error": `Service Lift Detail can't be below 0` }
        }

        liftDetails.service = sanitizedService;

        return { "msg": "SUCCESS", "data": sanitizedData, liftDetails };
    } else {
        return { "msg": "SUCCESS", "data": sanitizedData };
    }
}



// Plot Length
function plotLength(data = "") {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Plot Length" };
    }

    const sanitizedData = xss(data.trim());

    const numericPlotLength = parseFloat(sanitizedData);

    if (isNaN(numericPlotLength)) {
        return { "msg": "ERROR", "error": "Plot Length should be a Number only" };
    }

    if (numericPlotLength < 0) {
        return { "msg": "ERROR", "error": "Plot Length can't be below 0" };
    }

    return { "msg": "SUCCESS", "data": numericPlotLength.toFixed(2) };
}



// Plot Breadth
function plotBreadth(data = "") {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Plot Breadth" };
    }

    const sanitizedData = xss(data.trim());

    const numericPlotBreadth = parseFloat(sanitizedData);
    if (isNaN(numericPlotBreadth)) {
        return { "msg": "ERROR", "error": "Plot Breadth should be a Number only" };
    }

    if (numericPlotBreadth < 0) {
        return { "msg": "ERROR", "error": "Plot Breadth can't be below 0" };
    }

    return { "msg": "SUCCESS", "data": numericPlotBreadth.toFixed(2) };
}



// Ownership
function ownership(data = "") {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Ownership Type" };
    }

    const sanitizedData = xss(data.trim());

    const validOwnershipTypes = new Set(["Freehold", "Leasehold", "Co-operative society", "Power of Attorney"]);

    if (!validOwnershipTypes.has(sanitizedData)) {
        return { "msg": "ERROR", "error": `Invalid Ownership Type - ${sanitizedData}` };
    }

    return { "msg": "SUCCESS", "data": sanitizedData };
}



// Price
function price(data) {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Price" };
    }

    const sanitizedData = Number(xss(data));

    if (isNaN(sanitizedData)) {
        return { "msg": "ERROR", "error": `Price should be a number only - ${data}` };
    }

    if (sanitizedData <= 0) {
        return { "msg": "ERROR", "error": `Price can't be a negative value` };
    }

    return { "msg": "SUCCESS", "data": sanitizedData };
}



// Price Per Unit
function priceUnit(price, area) {
    if (!price) {
        return { "msg": "ERROR", "error": "Missing Price" };
    }

    if (!area) {
        return { "msg": "ERROR", "error": "Missing Plot/Carpet Area Detail" };
    }

    const numericPrice = Number(xss(price));
    const numericArea = Number(xss(area));

    if (isNaN(numericPrice)) {
        return { "msg": "ERROR", "error": `${price} is an invalid price; it should be a number only` };
    }

    if (isNaN(numericArea)) {
        return { "msg": "ERROR", "error": `${area} is an invalid plot/carpet area; it should be a number only` };
    }

    if (numericArea === 0) {
        return { "msg": "ERROR", "error": "Plot/Carpet Area cannot be zero" };
    }

    const pricePerUnit = parseFloat((numericPrice / numericArea).toFixed(2));

    return { "msg": "SUCCESS", "data": pricePerUnit };
}



// Other Room
function otherRoom(data) {
    if (!Array.isArray(data)) {
        return { "msg": "ERROR", "error": "Please provide a valid list of other rooms" };
    }

    const otherRooms = ["Pooja Room", "Study Room", "Servant Room", "Store Room"];
    const validRooms = [];
    const invalidRooms = [];

    data.forEach(room => {
        const sanitizedRoom = xss(room.trim());

        if (otherRooms.includes(sanitizedRoom)) {
            validRooms.push(sanitizedRoom);
        } else {
            invalidRooms.push(sanitizedRoom);
        }
    });

    if (invalidRooms.length > 0) {
        return { "msg": "ERROR", "error": `Invalid rooms: ${invalidRooms.join(', ')}. Please select valid rooms.` };
    }

    return { "msg": "SUCCESS", "data": validRooms };
}



// Furnished
function furnished({ type, list, obj }) {
    const allowedFurnishingTypes = ["Furnished", "Semi-Furnished", "Un-Furnished"];

    if (!type) {
        return { msg: "ERROR", error: "Furnished Type is Missing" };
    }

    type = xss(type.trim());

    if (!allowedFurnishingTypes.includes(type)) {
        return { msg: "ERROR", error: `${type} is a Wrong Furnishing Type` };
    }

    const validFurnishedList = new Set(["Sofa", "Washing Machine", "Stove", "Fridge", "Water Purifier", "Microwave", "Modular Kitchen", "Chimney", "Dining Table", "Curtains", "Exhaust Fan"]);

    const newFurnishedList = (type !== "Un-furnished") ? (list ? Array.from(new Set(list.map(value => xss(value)))).filter(value => validFurnishedList.has(value)) : []) : [];

    const furnishedObj = (type !== "Un-furnished") ? {} : {};

    if (type !== "Un-furnished") {
        const properties = ["Light", "Fan", "AC", "TV", "Bed", "Wardrobe", "Geyser"];

        properties.forEach(prop => {
            const value = obj ? Number(xss(obj[prop])) : 0;
            furnishedObj[prop] = value;
            // furnishedObj[prop] = value <= 30 ? value : 30; // Max 30 Allowed
        });
    }

    return { msg: "SUCCESS", "furnished": type, "furnishedList": newFurnishedList, furnishedObj };
}



// Parking with open and close parking counts
function parking(data) {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Parking Details" };
    }

    let parking = {
        openParking: data ? Number(xss(data.openParking)) : 0,
        closeParking: data ? Number(xss(data.closeParking)) : 0
    };

    return { msg: "SUCCESS", parking };
}



// Parking with Private parking in Basement, Private parking outside, Public parking
function parkingWithPrivatePublic(data = "", parkingDetailsList = [], parkingCount = 0) {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Parking Details" };
    }

    const validTypes = ["Available", "Not-Available"];
    const sanitizedData = xss(data.trim());

    if (!validTypes.includes(sanitizedData)) {
        return { "msg": "ERROR", "error": `Wrong Parking Value - ${sanitizedData}` };
    }

    if (sanitizedData == validTypes[0]) {

        const validList = new Set(["Private Parking in Basement", "Private Parking Outside", "Public Parking"]);
        const sanitizedParkingDetailsList = [];

        for (let a = 0; a < parkingDetailsList.length; a++) {

            const value = xss(parkingDetailsList[a].trim());

            if (!validList.has(value)) {
                return { "msg": "ERROR", "error": `Wrong Parking Detail List Value - ${value}` };
            }

            sanitizedParkingDetailsList.push(value);
        };

        if (parkingCount) {
            const sanitizedParkingCount = Number(xss(parkingCount));
            const minValue = 0;
            const maxValue = 1000;

            if (sanitizedParkingCount < minValue) {
                return { "msg": "ERROR", "error": `Parking Count can't be below then ${minValue}` };
            }

            if (sanitizedParkingCount > maxValue) {
                return { "msg": "ERROR", "error": `Parking Count can't be more then ${maxValue}` };
            }
        }

        return { "msg": "SUCCESS", "data": sanitizedData, "parkingDetailsList": sanitizedParkingDetailsList, "parkingCount": sanitizedParkingCount };
    } else {
        return { "msg": "SUCCESS", "data": sanitizedData };
    }
}



// Total Floors
function totalFloors(data) {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Total Floors" };
    }

    const numericTotalFloors = Number(xss(data));

    if (isNaN(numericTotalFloors)) {
        return { "msg": "ERROR", "error": `${data} is Invalid Total Floors, It should be a number only` };
    }

    const minValue = 0;
    const maxValue = 90;

    if (numericTotalFloors < minValue) {
        return { "msg": "ERROR", "error": `Total Floors should not be below then - ${minValue}` };
    }

    if (numericTotalFloors > maxValue) {
        return { "msg": "ERROR", "error": `Total Floors should not be above then - ${maxValue}` };
    }

    return { "msg": "SUCCESS", "data": numericTotalFloors };
}



// Floor On
function floorOn(data, totalFloors) {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Current Floor Number" };
    }

    let list = ["Ground", "Basement", "Lower Ground"];

    const numericData = Number(xss(data));

    if (!isNaN(numericData) && numericData >= 1 && numericData <= totalFloors) {
        // Checking if the data is a number between 1 and the total number of floors
        return { "msg": "SUCCESS", "data": numericData };
    } else if (typeof data === "string" && list.includes(data)) {
        // Checking if the data is a valid string
        return { "msg": "SUCCESS", "data": data };
    } else {
        return { "msg": "ERROR", "error": `${data} is a Wrong Floor Number Value` };
    }
}



// Select Multiple Floors
function multiFloorOn(data, totalFloor) {
    if (!data) {
        return { "msg": "SUCCESS", "data": [] };
    }

    const validList = ["Ground", "Basement", "Lower Ground"];

    const sanitizedData = [];

    const totalFloorsCount = totalFloors(totalFloor);

    if (totalFloorsCount.msg === "SUCCESS") {
        for (let a = 1; a <= totalFloorsCount.data; a++) {
            validList.push(a);
        }
    }

    for (let a = 0; a < data.length; a++) {
        const value = xss(data[a]).trim();
        if (!validList.includes(value)) {
            return { "msg": "ERROR", "error": `Wrong Floor Number Selected - ${value}` };
        }

        sanitizedData.push(value);
    }

    const uniqueSanitizedData = Array.from(new Set(sanitizedData));

    return { "msg": "SUCCESS", "data": uniqueSanitizedData };
}


// Is your office fire NOC Certified
function NOC(data = "") {
    if (!data) {
        return { "msg": "ERROR", "error": `Missing NOC Ceritificate Detail` };
    }

    const validTypes = new Set(["Yes", "No"]);

    const sanitizedData = xss(data.trim());

    if (!validTypes.has(sanitizedData)) {
        return { "msg": "ERROR", "error": `Wrong NOC Value - ${sanitizedData}` };
    }

    return { "msg": "SUCCESS", "data": sanitizedData };
}


// Occupancy Certificate
function occupancy(data = "") {
    if (!data) {
        return { "msg": "ERROR", "error": `Missing Occupancy Ceritificate Detail` };
    }

    const validTypes = new Set(["Yes", "No"]);

    const sanitizedData = xss(data.trim());

    if (!validTypes.has(sanitizedData)) {
        return { "msg": "ERROR", "error": `Wrong Occupancy Value - ${sanitizedData}` };
    }

    return { "msg": "SUCCESS", "data": sanitizedData };
}


// Your office was previously used for (Optional)
function previouslyUsedList(data = []) {
    if (!isArray(data) || !data.length) {
        return { "msg": "SUCCESS", "data": [] };
    }

    const sanitizedData = [];
    const validTypes = new Set(["Backend Office", "CA Office", "Frontend Office", "Small Office Purpose", "Traders Office"]);

    for (let a = 0; a < data.length; a++) {
        const value = xss(data[a].trim());
        if (!validTypes.has(value)) {
            return { "msg": "ERROR", "error": `Wrong Office Previously Used For Value - ${value}` };
        }
        sanitizedData.push(value);
    }

    return { "msg": "SUCCESS", "data": sanitizedData };
}



// Number of Staircases (Optional)
function staircases(data) {
    if (!data) {
        return { "msg": "SUCCESS", "data": "" };
    }

    const sanitizedData = parseInt(xss(data));

    if (isNaN(sanitizedData)) {
        return { "msg": "ERROR", "error": `Number of Staircase should be a number only` }
    }

    if (sanitizedData < 0) {
        return { "msg": "ERROR", "error": `Number of Staircase can't be below 0` };
    }

    return { "msg": "SUCCESS", "data": sanitizedData };
}



// Availability Status
function availabilityStatus({ type, value }) {
    if (!type) {
        return { "msg": "ERROR", "error": "Missing Availability Status" };
    }

    let list = ["Ready to move", "Under construction"];

    let availabilityStatus = xss(type).trim();

    if (list.includes(availabilityStatus)) {
        if (availabilityStatus == list[0]) { // for ready to move
            if (value) {
                let propertyStatus = xss(value).trim();
                return { "msg": "SUCCESS", availabilityStatus, propertyStatus }
            } else {
                return { "msg": "ERROR", "error": "Missing Property Year Status" };
            }
        }

        if (availabilityStatus == list[1]) { // for under construction
            if (value) {
                let expectedByYear = xss(value).trim();
                return { "msg": "SUCCESS", availabilityStatus, expectedByYear }
            } else {
                return { "msg": "ERROR", "error": "Missing Expected by Year" };
            }
        }
    } else {
        return { "msg": "ERROR", "error": "Availability Type is Wrong - " + availabilityStatus };
    }
}



// Inclusive Price Array
function inclusivePrices(data) {
    let list = new Set(["All inclusive price", "Tax and Govt. charges excluded", "Price Negotiable"]);
    let inclusivePrices = new Set();

    if (data && data.length) {
        for (let a = 0; a < data.length; a++) {

            let value = xss(data[a].trim());

            if (list.has(value)) {
                inclusivePrices.add(value);
            } else {
                return { "msg": "ERROR", "error": `This Inclusive Price value is not valid - ${value}` }
            }
        }
    }

    return { "msg": "SUCCESS", "data": [...inclusivePrices] };
}



// Additional Pricing Details
function additionalPricingDetails(data) {
    let additionalPricingDetails = {};

    if (data.maintenancePrice) {
        const numericMaintenancePrice = Number(xss(data.maintenancePrice));
        if (isNaN(numericMaintenancePrice)) {
            return { "msg": "ERROR", "error": "Maintenance Amount should be a number only" };
        } else if (numericMaintenancePrice < 0) {
            return { "msg": "ERROR", "error": "Maintenance Amount should not be below 0" };
        } else if (numericMaintenancePrice.toString().length > 9) {
            return { "msg": "ERROR", "error": "Maintenance Amount should have a maximum length of 9 digits" };
        }
        additionalPricingDetails.maintenancePrice = numericMaintenancePrice;
    }

    if (data.maintenanceTimePeriod) {
        let list = ["Monthly", "Yearly"];
        if (list.includes(data.maintenanceTimePeriod)) {
            additionalPricingDetails.maintenanceTimePeriod = xss(data.maintenanceTimePeriod).trim();
        } else {
            return { "msg": "ERROR", "error": `Wrong Maintenance Time Period - ${data.maintenanceTimePeriod}` };
        }
    }

    if (data.expectedRental) {
        const numericExpectedRental = Number(xss(data.expectedRental));
        if (isNaN(numericExpectedRental)) {
            return { "msg": "ERROR", "error": "Expected Rental Amount should be a number only" };
        } else if (numericExpectedRental < 0) {
            return { "msg": "ERROR", "error": "Expected Rental Amount should not be below 0" };
        } else if (numericExpectedRental.toString().length > 9) {
            return { "msg": "ERROR", "error": "Expected Rental Amount should be maximum of 9 digits" };
        } else {
            additionalPricingDetails.expectedRental = numericExpectedRental;
        }
    }

    if (data.bookingAmount) {
        const numericBookingAmount = Number(xss(data.bookingAmount));
        if (isNaN(numericBookingAmount)) {
            return { "msg": "ERROR", "error": "Booking Amount should be a number only" };
        } else if (numericBookingAmount < 0) {
            return { "msg": "ERROR", "error": "Booking Amount should not be below 0" };
        } else if (numericBookingAmount.toString().length > 9) {
            return { "msg": "ERROR", "error": "Booking Amount should be maximum of 9 digits" };
        } else {
            additionalPricingDetails.bookingAmount = numericBookingAmount;
        }
    }

    if (data.annualDuesPayable) {
        const numericAnnualDuesPayable = Number(xss(data.annualDuesPayable));
        if (isNaN(numericAnnualDuesPayable)) {
            return { "msg": "ERROR", "error": "Annual Dues Amount should be a number only" };
        } else if (numericAnnualDuesPayable < 0) {
            return { "msg": "ERROR", "error": "Annual Dues Amount should not be below 0" };
        } else if (numericAnnualDuesPayable.toString().length > 9) {
            return { "msg": "ERROR", "error": "Annual Dues Amount should be maximum of 9 digits" };
        } else {
            additionalPricingDetails.annualDuesPayable = numericAnnualDuesPayable;
        }
    }

    if (data.membershipCharge) {
        const numericMembershipCharge = Number(xss(data.membershipCharge));
        if (isNaN(numericMembershipCharge)) {
            return { "msg": "ERROR", "error": "Membership Amount should be a number only" };
        } else if (numericMembershipCharge < 0) {
            return { "msg": "ERROR", "error": "Membership Amount should not be below 0" };
        } else if (numericMembershipCharge.toString().length > 9) {
            return { "msg": "ERROR", "error": "Membership Amount should be maximum length of 9 digits" };
        } else {
            additionalPricingDetails.membershipCharge = numericMembershipCharge;
        }
    }

    return { "msg": "SUCCESS", "data": additionalPricingDetails };
}




// Expected Annual Returns
function expectedAnnualReturns(data) {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Expected Annual Returns" };
    }

    const numericExpectedAnnualReturns = Number(xss(data));

    if (isNaN(numericExpectedAnnualReturns)) {
        return { "msg": "ERROR", "error": `${data} is Invalid Expected Annual Returns, It should be a number only` };
    }

    const minValue = 0;

    if (numericExpectedAnnualReturns < minValue) {
        return { "msg": "ERROR", "error": `Expected Annual Returns can't be below ${minValue}` };
    }

    return { "msg": "SUCCESS", "data": numericExpectedAnnualReturns };
}



// Describe your office setup
function officeSetup(data = {}) {
    if (!Object.keys(data).length) {
        return { "msg": "ERROR", error: "Missing Office Setup Details" };
    }

    const sanitizedObj = {};

    const sanitizedMinSeats = Number(xss(data.minSeats));

    if (isNaN(sanitizedMinSeats)) {
        return { "msg": "ERROR", "error": "Minimum Seats must be a number only, In Office Setup Details" };
    }

    if (sanitizedMinSeats < 0) {
        return { "msg": "ERROR", "error": "Minimum Seats can't be below 0, In Office Setup Details" };
    }

    sanitizedObj.minSeats = sanitizedMinSeats;

    if (data.maxSeats) {
        const sanitizedMaxSeats = Number(xss(data.maxSeats));

        if (isNaN(sanitizedMaxSeats)) {
            return { "msg": "ERROR", "error": "Maximum Seats must be a number only, In Office Setup Details" };
        }

        if (sanitizedMaxSeats < sanitizedMinSeats) {
            return { "msg": "ERROR", "error": "Maximum Seats can't be below then Minimum Seats, In Office Setup Details" };
        }
        sanitizedObj.maxSeats = sanitizedMaxSeats;
    }

    const sanitizedCabins = Number(xss(data.cabins));

    if (isNaN(sanitizedCabins)) {
        return { "msg": "ERROR", "error": "Cabins count must be a number only, In Office Setup Details" };
    }

    if (sanitizedCabins < 0) {
        return { "msg": "ERROR", "error": "Cabins can't be below 0, In Office Setup Details" };
    }

    sanitizedObj.cabins = sanitizedCabins;


    const sanitizedMeetingRooms = Number(xss(data.meetingRooms));

    if (isNaN(sanitizedMeetingRooms)) {
        return { "msg": "ERROR", "error": `Meeting Rooms must be a number only - ${sanitizedMeetingRooms}` };
    }

    if (sanitizedMeetingRooms < 0) {
        return { "msg": "ERROR", "error": `Meeting Rooms can't be below 0` };
    }

    sanitizedObj.meetingRooms = sanitizedMeetingRooms;

    return { "msg": "SUCCESS", "data": sanitizedObj };
}



// Country Currency Code
// function countryCurrency(data) {
//     let list = [{ "code": "$", "textCode": "USD", "alias": "US Dollar", "country": "United States Of America" }, { "code": "₹", "textCode": "INR", "alias": "Indian Rupees", "country": "India" }];

//     let countryCurrency = "₹";
//     if (data) {
//         for (let a = 0; a < list.length; a++) {

//         }
//     } else {
//         return { "msg": "ERROR", "error": "Country Type is Missing" };
//     }

// }
function countryCurrency(data) {
    let list = ["$", "₹"];

    if (data) {
        data = xss(data).trim();
        if (!list.includes(data)) {
            return { "msg": "ERROR", "error": `Country Code is Wrong - ${data}` };
        }
        return { "msg": "SUCCESS", "data": data };
    } else {
        return { "msg": "ERROR", "error": "Country Code is Missing" };
    }
};



// Description
function description(data) {
    if (data) {
        data = xss(data).trim();

        if (data.length <= 1000) {
            return { "msg": "SUCCESS", "data": data };
        } else {
            return { "msg": "ERROR", "error": "Description exceeds the 1000 character limit" };
        }
    } else {
        return { "msg": "ERROR", "error": "Description is Missing" };
    }
}



// ----------------------- AMENITIES STARTING --------------------------------------

// Amenities
function amenities({ data, list }) {
    if (!data || !Array.isArray(data)) {
        return { "msg": "SUCCESS", "data": [] };
    }

    let uniqueAmenities = new Set();

    for (let a = 0; a < data.length; a++) {
        let value = xss(data[a].trim());
        if (list.includes(value)) {
            uniqueAmenities.add(value);
        } else {
            return { "msg": "ERROR", "error": `This Amenity is not valid - ${value}` }
        }
    }

    return { "msg": "SUCCESS", "data": [...uniqueAmenities] };
}



// Property Features
function propertyFeatures({ data, list }) {
    if (!data || !Array.isArray(data)) {
        return { "msg": "SUCCESS", "data": [] };
    }

    let uniquePropertyFeatures = new Set();

    for (let a = 0; a < data.length; a++) {
        let value = xss(data[a].trim());
        if (list.includes(value)) {
            uniquePropertyFeatures.add(value);
        } else {
            return { "msg": "ERROR", "error": `This Property Feature is not valid - ${value}` }
        }
    }

    return { "msg": "SUCCESS", "data": [...uniquePropertyFeatures] };
}



// Society Building Features
function society_buildingFeatures({ data, list }) {
    if (!data || !Array.isArray(data)) {
        return { "msg": "SUCCESS", "data": [] };
    }

    let uniqueSocietyBuildingFeatures = new Set();

    for (let a = 0; a < data.length; a++) {
        let value = xss(data[a].trim());
        if (list.includes(value)) {
            uniqueSocietyBuildingFeatures.add(value);
        } else {
            return { "msg": "ERROR", "error": `This Society / Building Feature is not valid - ${value}` }
        }
    }

    return { "msg": "SUCCESS", "data": [...uniqueSocietyBuildingFeatures] };
}



// Additional Features
function additionalFeatures({ data, list }) {
    if (!data || !Array.isArray(data)) {
        return { "msg": "SUCCESS", "data": [] };
    }

    let uniqueAdditionalFeatures = new Set();

    for (let a = 0; a < data.length; a++) {
        let value = xss(data[a].trim());
        if (list.includes(value)) {
            uniqueAdditionalFeatures.add(value);
        } else {
            return { "msg": "ERROR", "error": `This Additional Featur is not valid - ${value}` }
        }
    }

    return { "msg": "SUCCESS", "data": [...uniqueAdditionalFeatures] };
}



// Water Sources
function waterSources(data) {
    if (!data || !Array.isArray(data)) {
        return { "msg": "SUCCESS", "data": [] };
    }

    let list = ["Municipal corporation", "Borewell / Tank", "24*7 Water"];
    let uniqueWaterSources = new Set();

    for (let a = 0; a < data.length; a++) {
        let value = xss(data[a].trim());
        if (list.includes(value)) {
            uniqueWaterSources.add(value);
        } else {
            return { "msg": "ERROR", "error": `This Water Source is not valid - ${value}` }
        }
    }

    return { "msg": "SUCCESS", "data": [...uniqueWaterSources] };
};



// Overlooking
function overLookings({ data, list }) {
    if (!data || !Array.isArray(data)) {
        return { "msg": "SUCCESS", "data": [] };
    }

    let uniqueOverLookings = new Set();

    for (let a = 0; a < data.length; a++) {
        let value = xss(data[a].trim());
        if (list.includes(value)) {
            uniqueOverLookings.add(value);
        } else {
            return { "msg": "ERROR", "error": `This Over Looking Feature is not valid - ${value}` }
        }
    }

    return { "msg": "SUCCESS", "data": [...uniqueOverLookings] };
};



// Other Features
function otherFeatures({ data, list }) {
    if (!data || !Array.isArray(data)) {
        return { "msg": "SUCCESS", "data": [] };
    }

    let uniqueOtherFeatures = new Set();

    for (let a = 0; a < data.length; a++) {
        let value = xss(data[a].trim());
        if (list.includes(value)) {
            uniqueOtherFeatures.add(value);
        } else {
            return { "msg": "ERROR", "error": `This Other Feature is not valid - ${value}` }
        }
    }

    return { "msg": "SUCCESS", "data": [...uniqueOtherFeatures] };
};


// ----------------------- AMENITIES ENDING --------------------------------------


// Power Backup
function powerBackup(data) {
    let list = ["None", "Partial", "Full"];

    if (data) {
        data = xss(data).trim();
        if (!list.includes(data)) {
            return { "msg": "ERROR", "error": `Power Backup Type is Wrong- ${data}` };
        }
        return { "msg": "SUCCESS", "data": data };
    } else {
        return { "msg": "ERROR", "error": "Power Backup is Missing" }
    }
};



// Property Facing
function propertyFacing(data) {
    let list = ["North", "South", "East", "West", "North-East", "North-West", "South-East", "South-West"];

    if (data) {
        data = xss(data).trim();
        if (!list.includes(data)) {
            return { "msg": "ERROR", "error": `Property Facing Direction is Wrong - ${data}` };
        }
        return { "msg": "SUCCESS", "data": data };
    } else {
        return { "msg": "ERROR", "error": "Property Facing Direction is Missing" }
    }
};



// Property Flooring
function flooring(data) {
    let list = ["Marble", "Concrete", "Poloshed concrete", "Granite", "Ceramic", "Mosaic", "Cement", "Stone", "Vinyl", "Wood", "Vitified", "Spartex", "IPSFinish", "Other"];

    if (data) {
        data = xss(data).trim();
        if (!list.includes(data)) {
            return { "msg": "ERROR", "error": `Flooring Type is Wrong - ${data}` }
        }
        return { "msg": "SUCCESS", "data": data };
    } else {
        return { "msg": "ERROR", "error": "Flooring Type is Missing" }
    }
};



// Width of Facing Road
function roadFacingWidth(data) {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Road Facing Width" };
    }

    const numericRoadFacingWidth = Number(xss(data));

    if (isNaN(numericRoadFacingWidth)) {
        return { "msg": "ERROR", "error": "Invalid Road Facing Width, It should be number only" };
    }

    if (numericRoadFacingWidth < 0) {
        return { "msg": "ERROR", "error": "Road Facing Width can't be below 0" };
    }

    if (numericRoadFacingWidth > 999) {
        return { "msg": "ERROR", "error": "Road Facing Width is Too High" };
    }

    return { "msg": "SUCCESS", "data": numericRoadFacingWidth };
};



// Width of Facing Road Type
function roadFacingWidthType(data) {
    if (!data) {
        return { "msg": "ERROR", "error": "Road Facing Width Unit is Missing" };
    }

    let list = ["Meter", "Feet"];
    data = xss(data).trim();

    if (!list.includes(data)) {
        return { "msg": "ERROR", "error": `Wrong Road Facing Width Type - ${data}` };
    }

    return { "msg": "SUCCESS", "data": data };
}



// Property Location Advantages
function locationAdv(data) {
    if (!data.length || !Array.isArray(data)) {
        return { "msg": "SUCCESS", "data": [] };
    }
    const valueList = ["Close to Metro Station", "Close to School", "Close to Hospital", "Close to Market", "Close to Railway Station", "Close to Airport", "Close to Mall", "Close to highway"];
    let uniqueLocationAdv = new Set();

    for (let a = 0; a < data.length; a++) {
        let value = xss(data[a]).trim();
        if (valueList.includes(value)) {
            uniqueLocationAdv.add(value);
        } else {
            return { "msg": "ERROR", "error": `This Location Advantage value is not valid - ${value}` }
        }
    }

    return { "msg": "SUCCESS", "data": [...uniqueLocationAdv] };
};



// Total Floors Allowed to Construct
function totalFloorsAllowed(data) {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Total Allowed Floors for Construction" };
    }

    const numericTotalAllowedFloors = Number(xss(data));

    if (isNaN(numericTotalAllowedFloors)) {
        return { "msg": "ERROR", "error": `${data} is Invalid Total Allowed Floors, It should be a number only` };
    }

    const minValue = 0;
    const maxValue = 90;

    if (numericTotalAllowedFloors < minValue) {
        return { "msg": "ERROR", "error": `Total Allowed Floors can't be below ${minValue}` };
    }

    if (numericTotalAllowedFloors > maxValue) {
        return { "msg": "ERROR", "error": `Total Allowed Floors should not be above ${maxValue}` };
    }

    return { "msg": "SUCCESS", "data": numericTotalAllowedFloors };
}



// Boundary Wall Details
function boundaryWall(data) {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Boundary Wall Detail" };
    }

    data = xss(data).trim();

    const types = ["Yes", "No"];

    if (!types.includes(data)) {
        return { "msg": "ERROR", "error": "Wrong Boundary Wall value, it Should be only Yes/No" };
    }

    return { "msg": "SUCCESS", "data": data };
}



// Construction Status Of Walls
function constructionStatusOfWalls(data) {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Construction Status Of Walls" };
    }

    const sanitizedData = xss(data).trim();

    const types = ["No walls", "Brick walls", "Cemented walls", "Plastered walls"];

    if (!types.includes(sanitizedData)) {
        return { "msg": "ERROR", "error": `Wrong Construction Status Of Walls - ${sanitizedData}` };
    }

    return { "msg": "SUCCESS", "data": sanitizedData };
}



// Are Doors Constructed
function areDoorsConstructed(data) {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Doors Construction Status" };
    }

    const sanitizedData = xss(data).trim();

    const types = ["Yes", "No"];

    if (!types.includes(sanitizedData)) {
        return { "msg": "ERROR", "error": `Wrong Doors Construction Status - ${sanitizedData}` };
    }

    return { "msg": "SUCCESS", "data": sanitizedData };
}



// Number of Open Sides
function openSides(data) {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Number of Open Sides Detail" };
    }

    data = xss(data).trim();

    const types = [1, 2, 3, "1", "2", "3", "4 or more"];

    if (!types.includes(data)) {
        return { "msg": "ERROR", "error": "Wrong Number of Open Sides Detail" };
    }

    return { "msg": "SUCCESS", "data": data };
}



// Washroom details with private and shared washrooms
function washroomDetails(data) {
    if (!data.washrooms) {
        return { "msg": "ERROR", "error": "Missing Washroom Details" };
    }

    const obj = {};
    obj.washrooms = xss(data.washrooms.trim());

    const validTypes = ["Available", "Not-Available"];

    if (!validTypes.includes(data.washrooms)) {
        return { "msg": "ERROR", "error": `Wrong Washroom Details - ${data.washrooms}` };
    }

    if (data.washrooms === validTypes[0]) {
        const washroomDetails = {};
        if (!Object.keys(data.washroomDetails).length) {
            return { "msg": "ERROR", "error": "Missing Washroom Details Values" }
        }

        if (!data.washroomDetails.privateWashrooms) {
            return { "msg": "ERROR", "error": "Missing Number of Private Washrooms" };
        }
        washroomDetails.privateWashrooms = Number(xss(data.washroomDetails.privateWashrooms));

        if (!data.washroomDetails.sharedWashrooms) {
            return { "msg": "ERROR", "error": "Missing Number of Shared Washrooms" };
        }
        washroomDetails.sharedWashrooms = Number(xss(data.washroomDetails.sharedWashrooms));

        obj.washroomDetails = washroomDetails;
    }

    return { "msg": "SUCCESS", "data": obj };
}



// Any Construction Done Details
function constructionOnProperty(data, detail) {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing Construction Status" };
    }

    data = xss(data.trim());

    let allowedType = ["Yes", "No"];

    if (!allowedType.includes(data)) {
        return { "msg": "ERROR", "error": "Wrong Construction Status, It Should be only Yes/No" };
    }

    if (data == allowedType[0]) {
        if (!detail.length) {
            return { "msg": "ERROR", "error": "Missing Types of Construction Done on Property" };
        }
        let list = ["Shed", "Room(s)", "Washroom", "Other"];

        let returnList = [];

        for (let a = 0; a < detail.length; a++) {
            let value = xss(detail[a]).trim();
            if (list.includes(value)) {
                returnList.push(value);
            } else {
                return { "msg": "ERROR", "error": `Wrong construction On Property list value - ${value}` }
            }
        }

        return { "msg": "SUCCESS", "data": { "constructionOnProperty": data, "constructionOnPropertyList": returnList } }
    } else {
        return { "msg": "SUCCESS", "data": { "constructionOnProperty": data } }
    }
}



// Plot Expected By Year Possession
function expectedByYear(data) {
    if (!data) {
        return { "msg": "ERROR", "error": "Missing  Possession By Year" };
    }
    data = xss(data).trim();

    let allowedType = ["Immediate", "Within 3 Months", "Within 6 Months"];

    const d = new Date();
    let year = d.getFullYear();

    if (allowedType.includes(data) || (data >= year && data <= year + 9)) {
        return { "msg": "SUCCESS", "data": data }
    } else {
        return { "msg": "ERROR", "error": "Wrong  Possession By Year Time" };
    }
}



// List of Property Approval Authorities
function propertyApprovalAuthorityList(data) {
    if (!Array.isArray(data) || !data.length) {
        return { "msg": "SUCCESS", "data": [] };
    }

    let list = ["DDA", "MCD", "NDMC", "Local Authority"];

    let returnList = new Set([]);

    for (let a = 0; a < data.length; a++) {
        let value = xss(data[a].trim());
        if (list.includes(value)) {
            returnList.add(value);
        } else {
            return { "msg": "ERROR", "error": `Wrong Property Approval Authority Detail- ${value}` };
        }
    }

    return { "msg": "SUCCESS", "data": returnList }
}



// Approved for Industry Type
function approvedIndustryTypeList(data) {
    if (!Array.isArray(data) || !data.length) {
        return { "msg": "SUCCESS", "data": [] };
    }

    let list = ["Automobiles", "Biotechnology", "Capital Goods", "Chemicals", "Construction", "Defence and Aerospace Manufacturing", "Electronics Hardware", "Engineering", "Food processing", "Gems and Jewellery", "Handicrafts", "IT and ITes", "Leather", "Manufacturing", "Medical devices", "Metals", "Mixed", "Petroleum", "Pharmaceuticals", "Renewable Energy", "Software", "Textiles"];

    let returnList = new Set([]);

    for (let a = 0; a < data.length; a++) {
        let value = xss(data[a].trim());
        if (list.includes(value)) {
            returnList.add(value);
        } else {
            return { "msg": "ERROR", "error": `Wrong Approved Industry Type Detail- ${value}` };
        }
    }

    return { "msg": "SUCCESS", "data": returnList }
}



// Pre Leased / Pre Rented
function preLeasedRentedDetails(data) {
    if (!data.preLeased_Rented) {
        return { "msg": "ERROR", "error": "Missing Pre Leased / Pre Rented" };
    }

    const obj = {};

    if (!data.preLeased_Rented) {
        return { "msg": "ERROR", "error": "Missing Pre Leased / Pre Rented, It should be Yes or No" }
    }

    const validValues = ["Yes", "No"];
    if (!validValues.includes(data.preLeased_Rented)) {
        return { "msg": "ERROR", "error": "Wrong Pre Leased / Pre Rented, It should be Yes or No only" }
    }

    obj.preLeased_Rented = xss(data.preLeased_Rented);

    if (data.preLeased_Rented == "Yes") {
        let preLeased_RentedDetails = {};

        if (!Object.keys(data.preLeased_RentedDetails).length) {
            return { "msg": "ERROR", "error": "Missing Pre Leased / Pre Rented Values" };
        }

        preLeased_RentedDetails.currentRentPerMonth = Number(
            xss(data.preLeased_RentedDetails.currentRentPerMonth)
        );

        if (isNaN(preLeasedRentedDetails.currentRentPerMonth)) {
            return { "msg": "ERROR", "error": "Current Rent Per Month should be a number only" }
        }

        if (preLeasedRentedDetails.currentRentPerMonth < 0) {
            return { "msg": "ERROR", "error": "Current Rent Per Month cannot be negative" }
        }

        preLeased_RentedDetails.leaseTenureInYear = Number(
            xss(data.preLeased_RentedDetails.leaseTenureInYear)
        );

        if (isNaN(preLeasedRentedDetails.leaseTenureInYear)) {
            return { "msg": "ERROR", "error": "Current Rent Per Month should be a number only" }
        }

        if (preLeasedRentedDetails.leaseTenureInYear < 0) {
            return { "msg": "ERROR", "error": "Lease Tenure In Year cannot be negative" }
        }

        preLeased_RentedDetails.annualRentIncrease = Number(
            xss(data.preLeased_RentedDetails.annualRentIncrease)
        );

        if (isNaN(preLeasedRentedDetails.annualRentIncrease)) {
            return { "msg": "ERROR", "error": "Current Rent Per Month should be a number only" }
        }

        if (preLeasedRentedDetails.annualRentIncrease < 0) {
            return { "msg": "ERROR", "error": "Annual Rent Increase cannot be negative" }
        }

        preLeased_RentedDetails.businessType = xss(
            data.preLeased_RentedDetails.businessType
        ).trim();


        obj.preLeased_RentedDetails = preLeased_RentedDetails;
    } else {
        obj.preLeased_RentedDetails = {};
    }

    return { "msg": "SUCCESS", "data": obj };
}



// Exporting Modules
module.exports = {
    address,
    plotNumber,
    houseNumber,
    apartmentName,
    pincode,
    locality,
    city,
    state,
    country,
    bedroom,
    bathroom,
    balcony,
    rooms,
    lookingFor,
    propertyGroup,
    propertyType,
    hospitalityType,
    plotLength,
    plotBreadth,
    ownership,
    price,
    priceUnit,
    plotArea,
    plotAreaUnit,
    carpetArea,
    carpetAreaUnit,
    builtupArea,
    builtupAreaUnit,
    superBuiltupArea,
    superBuiltupAreaUnit,
    otherRoom,
    furnished,
    parking,
    totalFloors,
    floorOn,
    availabilityStatus,
    inclusivePrices,
    additionalPricingDetails,
    amenities,
    propertyFeatures,
    countryCurrency,
    description,
    society_buildingFeatures,
    additionalFeatures,
    waterSources,
    overLookings,
    otherFeatures,
    powerBackup,
    propertyFacing,
    flooring,
    roadFacingWidth,
    roadFacingWidthType,
    locationAdv,
    totalFloorsAllowed,
    boundaryWall,
    openSides,
    constructionOnProperty,
    expectedByYear,
    propertyApprovalAuthorityList,
    washrooms,
    qualityRating,
    preLeasedRentedDetails,
    industryType,
    officeType,
    constructionStatusOfWalls,
    areDoorsConstructed,
    washroomDetails,
    pantryType,
    multiFloorOn,
    staircases,
    zoneType,
    locatedInside,
    facilityAvailable,
    fireSafety,
    liftWithPassengerServiceModern,
    parkingWithPrivatePublic,
    NOC,
    occupancy,
    previouslyUsedList,
    expectedAnnualReturns,
    officeSetup,
    plotLandType,
    approvedIndustryTypeList,
    retailLocatedInside,
    retailSpaceType
};
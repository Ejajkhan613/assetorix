const component = require("../components");


function independent_builderFloor(data) {

    // --------------------------------- MAIN OBJECT ---------------------------------

    // Main Object that will be saved in DB
    let obj = {};



    // Looking For
    let lookingFor = component.lookingFor(data.lookingFor);
    if (lookingFor.msg == "SUCCESS") {
        obj.lookingFor = lookingFor.data;
    } else {
        return lookingFor;
    }



    // Property Group
    let propertyGroup = component.propertyGroup(data.propertyGroup);
    if (propertyGroup.msg == "SUCCESS") {
        obj.propertyGroup = propertyGroup.data;
    } else {
        return propertyGroup;
    }



    // Property Type
    let propertyType = component.propertyType(data.propertyType, data.propertyGroup);
    if (propertyType.msg == "SUCCESS") {
        obj.propertyType = propertyType.data;
    } else {
        return propertyType;
    }


    // --------------------------------- ADDRESS STARTING ---------------------------------

    // Checking Address
    if (!data.address) {
        return { "msg": "ERROR", "error": "Missing Address Detail Object" };
    }

    // Adding Address Data
    let address = {};



    // House Number ( Optional )
    let houseNumber = component.houseNumber(data.address.houseNumber);
    if (houseNumber.msg == "SUCCESS") {
        address.houseNumber = houseNumber.data;
    } else {
        return houseNumber;
    }


    // // Apartment Name ( Optional )
    let apartmentName = component.apartmentName(data.address.apartmentName);
    if (apartmentName.msg == "SUCCESS") {
        address.apartmentName = apartmentName.data;
    } else {
        return apartmentName;
    }


    // Pincode
    let pincode = component.pincode(data.address.pincode);
    if (pincode.msg == "SUCCESS") {
        address.pincode = pincode.data;
    } else {
        return pincode;
    }


    // Locality
    let locality = component.locality(data.address.locality);
    if (locality.msg == "SUCCESS") {
        address.locality = locality.data;
    } else {
        return locality;
    }


    // City
    let city = component.city(data.address.city);
    if (city.msg == "SUCCESS") {
        address.city = city.data;
    } else {
        return city;
    }


    // State
    let state = component.state(data.address.state);
    if (state.msg == "SUCCESS") {
        address.state = state.data;
    } else {
        return state;
    }


    // Country
    let country = component.country(data.address.country);
    if (country.msg == "SUCCESS") {
        address.country = country.data;
    } else {
        return country;
    }

    obj.address = address;

    // --------------------------------- ADDRESS ENDING ---------------------------------



    // --------------------------------- ROOM DETAILS STARTING ---------------------------------


    // Checking Room Details
    if (!data.roomDetails) {
        return { "msg": "ERROR", "error": "Room Details Data is not Present" }
    }

    // Adding Room Details
    let roomDetails = {};


    // Bedroom
    let bedroom = component.bedroom(data.roomDetails.bedroom);
    if (bedroom.msg == "SUCCESS") {
        roomDetails.bedroom = bedroom.data;
    } else {
        return bedroom;
    }


    // Bathroom
    let bathroom = component.bathroom(data.roomDetails.bathroom);
    if (bathroom.msg == "SUCCESS") {
        roomDetails.bathroom = bathroom.data;
    } else {
        return bathroom;
    }


    // Balcony
    let balcony = component.balcony(data.roomDetails.balcony);
    if (balcony.msg == "SUCCESS") {
        roomDetails.balcony = balcony.data;
    } else {
        return balcony;
    }

    obj.roomDetails = roomDetails;

    // --------------------------------- ROOM DETAILS ENDING ---------------------------------



    // ------------------ Area Details and Unit Details STARTING -----------------------------

    // Plot Area
    let plotArea = component.plotArea(data.plotArea);
    if (plotArea.msg == "SUCCESS") {
        obj.plotArea = plotArea.data;
    } else {
        return plotArea;
    }


    // Plot Area Unit
    let plotAreaUnit = component.plotAreaUnit(data.plotAreaUnit);
    if (plotAreaUnit.msg == "SUCCESS") {
        obj.plotAreaUnit = plotAreaUnit.data;
    } else {
        return plotAreaUnit;
    }


    // Carpet Area ( Optional )
    if (data.carpetArea && data.carpetAreaUnit) {
        let carpetArea = component.carpetArea(data.carpetArea);
        if (carpetArea.msg == "SUCCESS") {
            obj.carpetArea = carpetArea.data;
        } else {
            return carpetArea;
        }
    }

    // Carpet Area Unit ( Optional )
    if (data.carpetArea && data.carpetAreaUnit) {
        let carpetAreaUnit = component.carpetAreaUnit(data.carpetAreaUnit);
        if (carpetAreaUnit.msg == "SUCCESS") {
            obj.carpetAreaUnit = carpetAreaUnit.data;
        } else {
            return carpetAreaUnit;
        }
    }


    // Builtup Area ( Optional )
    if (data.builtupArea && data.builtupAreaUnit) {
        let builtupArea = component.builtupArea(data.builtupArea);
        if (builtupArea.msg == "SUCCESS") {
            obj.builtupArea = builtupArea.data;
        } else {
            return builtupArea;
        }
    }

    // Builtup Area Unit ( Optional )
    if (data.builtupArea && data.builtupAreaUnit) {
        let builtupAreaUnit = component.builtupAreaUnit(data.builtupAreaUnit);
        if (builtupAreaUnit.msg == "SUCCESS") {
            obj.builtupAreaUnit = builtupAreaUnit.data;
        } else {
            return builtupAreaUnit;
        }
    }


    // Super Builtup Area ( Optional )
    if (data.superBuiltupArea && data.superBuiltupAreaUnit) {
        let superBuiltupArea = component.superBuiltupArea(data.superBuiltupArea);
        if (superBuiltupArea.msg == "SUCCESS") {
            obj.superBuiltupArea = superBuiltupArea.data;
        } else {
            return superBuiltupArea;
        }
    }

    // Super Builtup Area Unit ( Optional )
    if (data.superBuiltupArea && data.superBuiltupAreaUnit) {
        let superBuiltupAreaUnit = component.superBuiltupAreaUnit(data.superBuiltupAreaUnit);
        if (superBuiltupAreaUnit.msg == "SUCCESS") {
            obj.superBuiltupAreaUnit = superBuiltupAreaUnit.data;
        } else {
            return superBuiltupAreaUnit;
        }
    }

    // ------------------ Area Details and Unit Details ENDING -----------------------------


    // Other Room ( Optional )
    let otherRoom = component.otherRoom(data.otherRoom || []);
    if (otherRoom.msg == "SUCCESS") {
        obj.otherRoom = otherRoom.data;
    } else {
        return otherRoom;
    }


    // Furnished
    let furnished = component.furnished({ "type": data.furnished, "list": data.furnishedList, "obj": data.furnishedObj });
    if (furnished.msg == "SUCCESS") {
        obj.furnished = furnished.furnished;
        obj.furnishedList = furnished.furnishedList;
        obj.furnishedObj = furnished.furnishedObj;
    } else {
        return furnished;
    }


    // Parking
    let parking = component.parking(data.parking);
    if (parking.msg == "SUCCESS") {
        obj.parking = parking.parking;
    } else {
        return parking;
    }


    // Total Floors
    let totalFloors = component.totalFloors(data.totalFloors);
    if (totalFloors.msg == "SUCCESS") {
        obj.totalFloors = totalFloors.data;
    } else {
        return totalFloors;
    }


    // Floor Number
    let floorOn = component.floorOn(data.floorOn, data.totalFloors);
    if (floorOn.msg == "SUCCESS") {
        obj.floorOn = floorOn.data;
    } else {
        return floorOn;
    }


    // Availability Status
    let availabilityData = { "type": data.availabilityStatus, "value": data.propertyStatus || data.expectedByYear };

    let validateAvailabilityStatusResult = component.availabilityStatus(availabilityData);

    if (validateAvailabilityStatusResult.msg == "SUCCESS") {
        obj.availabilityStatus = validateAvailabilityStatusResult.availabilityStatus;

        if (validateAvailabilityStatusResult.propertyStatus) {
            obj.propertyStatus = validateAvailabilityStatusResult.propertyStatus;
        } else if (validateAvailabilityStatusResult.expectedByYear) {
            obj.expectedByYear = validateAvailabilityStatusResult.expectedByYear;
        }
    } else {
        return validateAvailabilityStatusResult;
    }


    // Ownership Type
    let ownership = component.ownership(data.ownership);
    if (ownership.msg == "SUCCESS") {
        obj.ownership = ownership.data;
    } else {
        return ownership;
    }


    // Price
    let price = component.price(data.price);
    if (price.msg == "SUCCESS") {
        obj.price = price.data;
    } else {
        return price;
    }


    // Price Per Unit
    let priceUnit = component.priceUnit(data.price, data.plotArea);
    if (priceUnit.msg == "SUCCESS") {
        obj.priceUnit = priceUnit.data;
    } else {
        return priceUnit;
    }


    // Country Currency
    let countryCurrency = component.countryCurrency(data.countryCurrency);
    if (countryCurrency.msg == "SUCCESS") {
        obj.countryCurrency = countryCurrency.data;
    } else {
        return countryCurrency;
    }


    // Inclusive Prices ( Optional )
    let inclusivePrices = component.inclusivePrices(data.inclusivePrices);
    if (inclusivePrices.msg == "SUCCESS") {
        obj.inclusivePrices = inclusivePrices.data;
    } else {
        return inclusivePrices;
    }


    // Additional Pricing Details ( Optional )
    let additionalPricingDetails = component.additionalPricingDetails(data.additionalPricingDetails);
    if (additionalPricingDetails.msg == "SUCCESS") {
        obj.additionalPricingDetails = additionalPricingDetails.data;
    } else {
        return additionalPricingDetails;
    }


    // Description
    let description = component.description(data.description);
    if (description.msg == "SUCCESS") {
        obj.description = description.data;
    } else {
        return description;
    }


    // Amenities ( Optional )
    if (data.amenities) {
        const list = ["Maintenance Staff", "Water Storage", "Waste Disposal", "Rain Water Harvesting", "Visitor Parking", "Park", "Feng Shui / Vaastu Compliant", "Piped-gas"];
        let amenities = component.amenities({ "data": data.amenities, list })
        if (amenities.msg == "SUCCESS") {
            obj.amenities = amenities.data;
        } else {
            return amenities;
        }
    }


    // Property Features ( Optional )
    if (data.propertyFeatures) {
        const list = ["High Ceiling Height", "False Ceiling Lighting", "Internet / wi-fi connectivity", "Intercom Facility", "Security / Fire Alarm", "Centrally Air Renovated", "Recently Renovated", "Private Garden / Terrace", "Natural Light", "Airy Roooms", "Spacious Interiors"];
        let propertyFeatures = component.propertyFeatures({ "data": data.propertyFeatures, list })
        if (propertyFeatures.msg == "SUCCESS") {
            obj.propertyFeatures = propertyFeatures.data;
        } else {
            return propertyFeatures;
        }
    }



    // Society / Building Features ( Optional )
    if (data.society_buildingFeatures) {
        const list = ["Lift", "Fitness Centre / GYM", "Swimming Pool","Club house / Community Center", "Security Personnel"];
        let society_buildingFeatures = component.society_buildingFeatures({ "data": data.society_buildingFeatures, list })
        if (society_buildingFeatures.msg == "SUCCESS") {
            obj.society_buildingFeatures = society_buildingFeatures.data;
        } else {
            return society_buildingFeatures;
        }
    }


    // Additional Features ( Optional )
    if (data.additionalFeatures) {
        const list = ["Separate entry for servant room", "No open drainage around", "Bank Attached Property", "Low Density Society"];
        let additionalFeatures = component.additionalFeatures({ "data": data.additionalFeatures, list })
        if (additionalFeatures.msg == "SUCCESS") {
            obj.additionalFeatures = additionalFeatures.data;
        } else {
            return additionalFeatures;
        }
    }



    // Water Sources ( Optional )
    if (data.waterSources) {
        let waterSources = component.waterSources(data.waterSources)
        if (waterSources.msg == "SUCCESS") {
            obj.waterSources = waterSources.data;
        } else {
            return waterSources;
        }
    }



    // Overlookings ( Optional )
    if (data.overLookings) {
        let list = ["Pool", "Park / Garden", "Club", "Main Road", "Other"];
        let overLookings = component.overLookings({ "data": data.overLookings, list })
        if (overLookings.msg == "SUCCESS") {
            obj.overLookings = overLookings.data;
        } else {
            return overLookings;
        }
    }



    // Other Features ( Optional )
    if (data.otherFeatures) {
        let list = ["In a gated society", "Corner Property", "Pet Friendly", "Wheelchair friendly"];
        let otherFeatures = component.otherFeatures({ "data": data.otherFeatures, list })
        if (otherFeatures.msg == "SUCCESS") {
            obj.otherFeatures = otherFeatures.data;
        } else {
            return otherFeatures;
        }
    }


    // Power Backup
    let powerBackup = component.powerBackup(data.powerBackup)
    if (powerBackup.msg == "SUCCESS") {
        obj.powerBackup = powerBackup.data;
    } else {
        return powerBackup;
    }



    // Property Facing
    let propertyFacing = component.propertyFacing(data.propertyFacing)
    if (propertyFacing.msg == "SUCCESS") {
        obj.propertyFacing = propertyFacing.data;
    } else {
        return propertyFacing;
    }



    // Property Flooring Type
    let flooring = component.flooring(data.flooring)
    if (flooring.msg == "SUCCESS") {
        obj.flooring = flooring.data;
    } else {
        return flooring;
    }



    // Road Facing Width
    let roadFacingWidth = component.roadFacingWidth(data.roadFacingWidth)
    if (roadFacingWidth.msg == "SUCCESS") {
        obj.roadFacingWidth = roadFacingWidth.data;
    } else {
        return roadFacingWidth;
    }



    // Road Facing Width Type
    let roadFacingWidthType = component.roadFacingWidthType(data.roadFacingWidthType)
    if (roadFacingWidthType.msg == "SUCCESS") {
        obj.roadFacingWidthType = roadFacingWidthType.data;
    } else {
        return roadFacingWidthType;
    }


    // Property Location Advantages ( Optional )
    let locationAdv = component.locationAdv(data.locationAdv)
    if (locationAdv.msg == "SUCCESS") {
        obj.locationAdv = locationAdv.data;
    } else {
        return locationAdv;
    }


    return { "msg": "SUCCESS", "data": obj };
}


module.exports = { independent_builderFloor };
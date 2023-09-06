
// Function to check if required fields exist and have non-empty values in the object
function checkRequiredFields(object, requiredFields) {
    const missingFields = [];
    requiredFields.forEach((field) => {
        if (!(field in object) || object[field] === "") {
            missingFields.push(field);
        }
    });
    return missingFields;
};


module.exports = { checkRequiredFields };
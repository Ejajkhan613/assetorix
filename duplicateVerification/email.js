// Custom Modules
const { UserModel } = require("../models/userModel");



// Middleware
async function userEmailDuplicateVerification(email) {
    try {
        const checking = await UserModel.findOne({ "email": email });
        if (checking) {
            return true
        } else {
            return false
        }
    } catch (error) {
        res.status(500).send({ "msg": "Server Error While checking Email" });
    }
}



// Exporting Module
module.exports = { userEmailDuplicateVerification };

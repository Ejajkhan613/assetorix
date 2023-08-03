// Custom Modules
const { UserModel } = require("../models/userModel");



// Middleware
const userMobileDuplicateVerification = async (req, res, next) => {
    let { mobile } = req.body;
    try {
        const checking = await UserModel.find({ "mobile": mobile });
        if (checking.length == 0) {
            next();
        } else {
            res.status(409).send({ "msg": "Mobile is already Registered" });
        }
    } catch (error) {
        res.status(500).send({ "msg": "Server Error While checking Mobile Number" });
    }
};



// Exporting Module
module.exports = { userMobileDuplicateVerification };

// Custom Modules
const { UserModel } = require("../models/userModel");



// Middleware
const userEmailDuplicateVerification = async (req, res, next) => {
    let { email } = req.body;
    try {
        const checking = await UserModel.find({ "email": email });
        if (checking.length == 0) {
            next();
        } else {
            res.status(409).send({ "msg": "Email is already Registered" });
        }
    } catch (error) {
        res.status(500).send({ "msg": "Server Error While checking Email" });
    }
};



// Exporting Module
module.exports = { userEmailDuplicateVerification };

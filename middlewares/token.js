// Dependencies
const jwt = require("jsonwebtoken");
const xss = require("xss");

// Custom Modules
const { UserModel } = require("../models/userModel");

// Secret Key
const secretKey = process.env.secretKey;


// Verification
const tokenVerify = async (req, res, next) => {
    const token = xss(req.headers.authorization);
    let id = xss(req.headers.id);
    try {
        if (token && id) {
            jwt.verify(token, secretKey, async (err, decoded) => {
                if (err) {
                    res.status(401).send({ "msg": "Unauthorized: Please Login to access" });
                    return;
                }

                let checking = await UserModel.findById(decoded.userID);

                if (checking && checking._id == id && checking.isBlocked == false) {
                    req.userDetail = checking;
                    next();
                } else {
                    res.status(401).send({ "msg": "Unauthorized: User not found, login again" });
                }
            });
        } else {
            res.status(401).send({ "msg": "Unauthorized: Please Login to access" });
        }
    } catch (error) {
        res.status(500).send({ "msg": "Internal Server Error: While Authorization" });
    }
};



// Exporting Module
module.exports = { tokenVerify };
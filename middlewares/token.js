// Dependencies
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/userModel");

// Secret Key
const secretKey = process.env.secretKey;


// Verification
const tokenVerify = async (req, res, next) => {
    const token = req.headers.authorization;
    let id = req.headers.id;
    try {
        if (token && id) {
            jwt.verify(token, secretKey, async (err, decoded) => {
                if (err) {
                    res.status(401).send({ "msg": "Unauthorized: Please Login to access this resource" });
                    return;
                }

                let checking = await UserModel.find({ "mobile": decoded.mobile });
                if (checking.length >= 1 && checking[0]._id == id && checking[0].isBlocked == false) {
                    res.setHeader("role", checking[0].role);
                    res.setHeader("x-powered-by", "Ejajul Ansari - NodeJS Developer");
                    next();
                } else {
                    res.status(401).send({ "msg": "Unauthorized: User not found, please login again" });
                }
            });
        } else {
            res.status(401).send({ "msg": "Unauthorized: Please Login to access this resource" });
        }
    } catch (error) {
        res.status(500).send({ "msg": "Internal Server Error: Something Went Wrong While Authorization" });
    }
};



// Exporting Module
module.exports = { tokenVerify };
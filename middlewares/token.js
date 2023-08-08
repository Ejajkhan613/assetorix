// Dependencies
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/userModel");

// 
const secretKey = process.env.secretKey;

const tokenVerify = async (req, res, next) => {
    const token = req.headers.authorization;
    let id = req.headers.id;
    try {
        if (token) {
            jwt.verify(token, secretKey, async (err, decoded) => {
                if (err) {
                    console.log(err)
                    res.status(401).send({ "msg": "Unauthorized: Please Login to access this resource" });
                    return;
                }

                let checking = await UserModel.find({ "mobile": decoded.mobile });
                if (checking.length >= 1 && checking[0]._id == id) {
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


module.exports = {
    tokenVerify
};
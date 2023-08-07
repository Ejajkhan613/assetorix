const jwt = require("jsonwebtoken");
const { UsersModel } = require("../models/users");


const secretKey = process.env.secret_key;

const tokenVerify = async (req, res, next) => {
    const token = req.headers.authorization;
    try {
        if (token) {
            jwt.verify(token, secretKey, async (err, decoded) => {
                if (err) {
                    res.status(400).send({ "msg": "Please Login" });
                }
                if (decoded) {
                    let checking = await UsersModel.find({ "mobile": decoded.mobile });
                    if (checking.length >= 1) {
                        next();
                    } else {
                        res.status(201).send({ "msg": "Please Login" });
                    }
                }
            });
        } else {
            res.send({ "msg": "Please Login" });
        }
    } catch (error) {
        res.send({ "msg": "Something Went Wrong While Authorization" });
    }
};


module.exports = {
    tokenVerify
};
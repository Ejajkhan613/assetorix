// Dependencies
const express = require("express");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/userModel");
const cookieParser = require('cookie-parser');

// Create Express app
const app = express();

// Use cookieParser middleware
app.use(cookieParser());

// Secret Key
const secretKey = process.env.secretKey;

// Verification middleware
const tokenVerify = async (req, res, next) => {
    const token = req.cookies.authorization || req.headers.authorization;
    const id = req.cookies.id || req.headers.id;
    console.log(token, id)

    try {
        if (!token || !id) {
            return res.status(401).send({ "msg": "Unauthorized: Please Login to access this resource" });
        }

        jwt.verify(token, secretKey, async (err, decoded) => {
            if (err) {
                return res.status(401).send({ "msg": "Unauthorized: Please Login to access this resource" });
            }

            try {
                const checking = await UserModel.find({ "mobile": decoded.mobile });

                if (checking.length === 0 || checking[0]._id != id || checking[0].isBlocked) {
                    return res.status(401).send({ "msg": "Unauthorized: User not found or blocked, please login again" });
                }

                res.locals.role = checking[0].role; // Store role in response locals
                next();
            } catch (error) {
                return res.status(500).send({ "msg": "Internal Server Error: Something Went Wrong While Authorization" });
            }
        });
    } catch (error) {
        res.status(500).send({ "msg": "Internal Server Error: Something Went Wrong While Authorization" });
    }
};

module.exports = {
    tokenVerify
};

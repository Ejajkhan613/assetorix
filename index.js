// Dependencies
const express = require("express");
const cors = require("cors");


// Dot env addition
require('dotenv').config();



// Importin Custom Modules
const { connection } = require("./configs/db");
const { userRoute } = require("./routes/userRoute");
const { adminRoute } = require("./routes/adminRoute");


// Port
const Port = process.env.port;



// Converting express into an app variable
const app = express();



// Using Cors
app.use(cors());



// Homepage Route
app.get("/", (req, res) => {
    res.send("Welcome to Assetorix");
});


// Users Route
app.use("/user", userRoute);



// Admin Route
app.use("/admin", adminRoute);


// Starting server and connecting to the MongoDB
app.listen(Port, async (req, res) => {
    try {
        await connection;
        console.log("Connected to Database");
    } catch (error) {
        console.log("Error while connecting to Database");
    }
    console.log(`Listening to the port ${Port}`);
});
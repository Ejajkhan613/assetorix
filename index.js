// Dependencies
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');


// Dot env addition
require('dotenv').config();



// Importin Custom Modules
const { connection } = require("./configs/db");
const { userRoute } = require("./routes/userRoute");
const { propertyRoute } = require("./routes/propertyRoute");
const { pincodeRoute } = require("./routes/pincodeRoute");
const { adminRoute } = require("./routes/adminRoute");
const { uploads } = require("./routes/upload");
const { avatar } = require("./routes/avatar");
const { leadFormRoute } = require("./routes/leadForm");
const { LogsModel } = require("./models/logs");


// Port
const Port = process.env.port;



// Converting express into an app variable
const app = express();

// Using Cors to Block
// app.use(cors({
//     origin: "https://assetorix.com", // Add your frontend URL here
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true,
// }));

app.use(bodyParser.json());
app.use(async (req, res, next) => {
    const log = new LogsModel({
        method: req.method,
        url: req.originalUrl,
        headers: req.headers,
        body: req.body,
        query: req.query
    });

    // Capture response details
    const originalSend = res.send;

    // Use try-catch block to handle potential errors during save
    try {
        res.send = async function (body) {
            log.responseHeaders = res.getHeaders();
            log.responseBody = body;

            // Save log to MongoDB using async/await
            await log.save();

            originalSend.apply(res, arguments);
        };

        next();
    } catch (error) {
        console.error('Error saving request log:', error);
        next(error);
    }
});

app.use(cors());


// Homepage Route
app.get("/", (req, res) => {
    res.send("Welcome to Assetorix");
});


// Users Route
app.use("/user", userRoute);


// Avatar Route
app.use("/avatar", avatar);


// Upload Imges
app.use("/upload", uploads);



// Property Route
app.use("/property", propertyRoute);



// Lead Form Route
app.use("/leadForm", leadFormRoute);



// Pincode Route
app.use("/pincode", pincodeRoute);



// Admin Route
app.use("/admin", adminRoute);


// Starting server and connecting to the MongoDB
app.listen(Port, async () => {
    try {
        await connection;
        console.log("Connected to Database");
    } catch (error) {
        console.log("Error while connecting to Database");
    }
    console.log(`Listening to the port ${Port}`);
});
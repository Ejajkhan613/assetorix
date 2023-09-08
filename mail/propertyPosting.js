const nodemailer = require("nodemailer");
require('dotenv').config();

async function propertyPosted(property, user) {

    try {
        // Create a Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });


        // Send the email
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: "it@unifie.in",
            cc: "gks@ametheus.com",
            subject: "Property Posted Successfully",
            html: `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>New Property Posted</title>
                </head>
                <body>
                    <h1>New Property Posted</h1>

                    <p>UserID - ${user._id}</p>
                    <p>Username - ${user.name}</p>
                    <p>Mobile No - ${user.mobile}</p>
                    <p>User Role - ${user.role}</p>
                    
                    <p>New property Posted in '${property.lookingFor} -> ${property.propertyGroup} -> ${property.propertyType}'.</p>
                    
                    <p>Property Details:</p>
                    <ul>
                        <li>Property ID: ${property._id}</li>
                        <li>Type: ${property.propertyType}</li>
                        <li>Group: ${property.propertyGroup}</li>
                        <li>Price: ${property.price}</li>
                        <li>Locality: ${property.address.locality}</li>
                        <li>Pincode: ${property.address.pincode}</li>
                        <li>City: ${property.address.city}</li>
                        <li>State: ${property.address.state}</li>
                        <li>Country: ${property.address.country}</li>
                        <li>Time :  ${property.createdOn}</li>
                    </ul>

                    <p><b>Assetorix</b></p>
                    <p>Parent Company - <b>Ametheus Holdings Pvt. Ltd.</b></p>
                </body>
            </html>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: Property ID: ${property._id} / User ID ${user._id}` + info.response);
    } catch (error) {
        console.error(`Email Sending Error: Property ID: ${property._id} / User ID ${user._id}`, error);
    }
}

module.exports = { propertyPosted };

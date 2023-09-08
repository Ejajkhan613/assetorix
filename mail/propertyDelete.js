const nodemailer = require("nodemailer");
require('dotenv').config();

async function propertyDeletion(property, user) {

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
            subject: `Property Deleted`,
            html: `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>Property Deleted</title>
                </head>
                <body>
                    <h1>Property Deleted By ${user.name}</h1>

                    <p>UserID - ${user._id}</p>
                    <p>Username - ${user.name}</p>
                    <p>Mobile No - ${user.mobile}</p>
                    <p>User Role - ${user.role}</p>
                    
                    <p>Property Deleted in '${property.lookingFor} -> ${property.propertyGroup} -> ${property.propertyType}'.</p>
                    
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
                        <li>Property Posted On :  ${property.createdOn}</li>
                    </ul>

                    <p><b>Assetorix</b></p>
                    <p>Parent Company - <b>Ametheus Holdings Pvt. Ltd.</b></p>
                </body>
            </html>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Property Deletion Email sent: Property ID: ${property._id} / User ID ${user._id}` + info.response);
        return `Property Deletion Email sent: Property ID: ${property._id} / User ID ${user._id} / ${info.response}`
    } catch (error) {
        console.error(`Property Deletion Email Sending Error: Property ID: ${property._id} / User ID ${user._id}`, error);
        return `Property Deletion Email Sending Error: Property ID: ${property._id} / User ID ${user._id} / ${error}`
    }
}

module.exports = { propertyDeletion };

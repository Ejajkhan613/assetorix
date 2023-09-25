const nodemailer = require("nodemailer");
require('dotenv').config();

async function contactOwner(email, property, buyer) {
    try {
        // Create a Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // Customize your email subject and body
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            cc: "gks@ametheus.com",
            subject: `New Buyer Inquiry for Your Property`,
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>New Buyer Inquiry</title>
            </head>
            <body>
                <h1>New Buyer Inquiry</h1>
                <div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2">
                    <div style="margin: 50px auto; width: 70%; padding: 20px 0">
                        <div style="border-bottom: 1px solid #eee">
                            <a href="https://www.assetorix.com/" style="font-size: 1.4em; color: #00466a; text-decoration: none; font-weight: 600">Assetorix</a>
                        </div>
                        <p style="font-size: 1.1em">Hi,</p>
                        <p>You have received a new inquiry from a potential buyer for your property:</p>
                        <p>Here are the buyer detail:</p>
                        <ul>
                            <li><strong>Name:</strong> ${buyer.name}</li>
                            <li><strong>Email:</strong> ${buyer.email}</li>
                            <li><strong>Phone:</strong> ${buyer.mobile}</li>
                            <li><strong>Message:</strong> ${buyer.message}</li>
                        </ul>
                        <p>Please respond to the buyer as soon as possible for your property.</p>
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
                        <p style="font-size: 0.9em;">Regards,<br />Assetorix</p>
                        <hr style="border: none; border-top: 1px solid #eee" />
                        <div style="float: right; padding: 8px 0; color: #aaa; font-size: 0.8em; line-height: 1; font-weight: 300">
                            <p>Assetorix</p>
                            <p>Hauz Khas, New Delhi</p>
                            <p>India</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        return { "status": true, "msg": info };
    } catch (error) {
        return { "status": false, "msg": error };
    }
}

module.exports = { contactOwner };
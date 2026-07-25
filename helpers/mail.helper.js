// Import the Nodemailer library
const nodemailer = require('nodemailer');

module.exports.sendMail = (email, subject, content) => {
    // Create a transporter object
    const secure = process.env.MAIL_SECURITY == "false"? false: true;

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: secure, // use false for STARTTLS; true for SSL on port 465 , HTTP FASLE, HTTPS TRUE
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        }
    });

    // Configure the mailoptions object
    const mailOptions = {
        from: 'thucyent09@gmail.com',
        to: email,
        subject: subject,
        html: content
    };

    // Send the email
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log('Error:', error);
        } else {
            console.log('Email sent: ', info.response);
        }
    });
}
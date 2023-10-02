//send mail notification when adding modifying or deleting an event
const sendMail = (message) => {
  //library for sending email
  const nodemailer = require("nodemailer");
  //used to get env variables for security
  require("dotenv").config();
  const password = process.env.PASSWORD;
  // Create a Nodemailer transporter using the provided SMTP server, port, and login information
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com", // SMTP server
    port: 587, // Port

    auth: {
      user: "yourEmail", // Your email address
      pass: password, // Your email password or an application-specific password
    },
  });

  // Define email content and options
  const mailOptions = {
    from: "yourEmail",
    to: ["email1", "email2"],
    subject: "notification de calendrier",
    html: `<p>:${message}</p><a href="http://localhost:3000/">clicker ici pour acceder l'application</a>`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = { sendMail };

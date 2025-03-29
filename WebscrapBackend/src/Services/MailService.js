// src/services/mailService.js
require('dotenv').config(); 
const nodemailer = require('nodemailer');



// Configure the transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail', // You can use any email service like Gmail, Yahoo, Outlook, etc.
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS  // Your email password or app-specific password
  }
});

// Function to send email
const sendMail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: text,
    });

    if (info.accepted.includes(to)) {
      console.log(`Email sent successfully to ${to}: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } else {
      console.error(`Email to ${to} was not accepted by the server.`);
      return { success: false, error: "Email not accepted by the server." };
    }
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error.message);
    return { success: false, error: error.message };
  }
};


module.exports = sendMail;

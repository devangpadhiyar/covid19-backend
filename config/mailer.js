const nodemailer = require('nodemailer');

const config = require('./index');

const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  secure: config.SMTP_SECURE, // true for 465, false for other ports
  auth: {
    user: config.SMTP_USER, // generated ethereal user
    pass: config.SMTP_PASSWORD, // generated ethereal password
  },
});

module.exports = transporter;

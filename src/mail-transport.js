const nodemailer = require("nodemailer");

const { EMAIL, EMAIL_PW } = process.env

if (!EMAIL || !EMAIL_PW) throw new Error('Missing email creds')

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: EMAIL,
    pass: EMAIL_PW
  },
});



module.exports = transporter
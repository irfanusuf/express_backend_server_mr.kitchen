
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false, // if true it needs tls certificate
  auth: {
    user: `irfanusuf33@gmail.com`,
    pass: "dban ydhi vrww ixni",
  },
});


  module.exports = transporter
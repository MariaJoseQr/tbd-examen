const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

async function sendMail(to, subject, htmlContent) {
  try {
    await transporter.sendMail({
      from: `"María José Quispe R." <${process.env.MAIL_FROM_ADDRESS}>`,
      to: to,
      subject: subject,
      html: htmlContent,
    });
    console.log("Correo enviado correctamente");
  } catch (error) {
    console.error("Error al enviar el correo:", error);
  }
}

module.exports = sendMail;

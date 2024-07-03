const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const { Lead } = require("./models/lead");
const connectDB = require("./config/db");
const indexRoutes = require("./routes/index");
const sendMail = require("./mail");
const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRoutes);

const PORT = process.env.PORT || 3000;

app.post("/send-email", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const newLead = new Lead({
      name,
      email,
      subject,
      message,
    });
    await newLead.save();

    const htmlTemplate = await fs.readFile(
      "./templates/mailTemplate.html",
      "utf-8"
    );

    const htmlContent = htmlTemplate
      .replace("{{name}}", name)
      .replace("{{email}}", email)
      .replace("{{message}}", message);

    await sendMail(email, subject, htmlContent);
    res.status(200).send("Correo enviado correctamente");
  } catch (error) {
    res.status(500).send("Error al enviar el correo");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

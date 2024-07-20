const express = require("express");
const cors = require("cors");
const session = require("express-session");
const fs = require("fs").promises;
const { Lead } = require("./models/lead");

const connectDB = require("./config/db");
const indexRoutes = require("./routes/index");
const sendMail = require("./mail");
const app = express();

const PORT = process.env.PORT || 3000;

connectDB();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRoutes);

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

    req.session.flash = { message: "El formulario se registró exitosamente!" };
    res.status(200).json({ flashMessage: req.session.flash.message });
  } catch (error) {
    req.session.flash = { message: "Error al registrar el formulario" };
    res.status(500).json({ flashMessage: req.session.flash.message });
  } finally {
    req.session.flash = null;
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

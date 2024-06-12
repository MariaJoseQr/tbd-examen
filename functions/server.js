const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const indexRoutes = require("./routes/index");
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
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

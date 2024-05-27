const express = require("express");
const app = express();
const cors = require("cors");
const indexRoutes = require("./routes/index");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running`);
});

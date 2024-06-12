const mongoose = require("mongoose");

const DB_URI =
  "mongodb+srv://t512700420:FiBTnrVUg9P2BTgX@empresa.wjttio1.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Conexión establecida!");
  } catch (err) {
    console.error("DB: ERROR", err);
    process.exit(1);
  }
};

module.exports = connectDB;

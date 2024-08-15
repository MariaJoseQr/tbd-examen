const mongoose = require("mongoose");
const { Schema } = mongoose;

const db = mongoose.connection.useDb("examen-final");

const ClientScheme = new Schema(
  {
    name: { type: String },
    last_name: { type: String },
    email: { type: String },
    address: { type: String },
    phone: { type: String },
  },
  {
    collection: "client",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Client = db.model("ClientScheme", ClientScheme);
module.exports = { Client };

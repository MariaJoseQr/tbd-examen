const mongoose = require("mongoose");
const { Schema } = mongoose;

const db = mongoose.connection.useDb("empresa");

const ClientScheme = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    document_number: {
      type: String,
      required: true,
    },
  },
  {
    collection: "client",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Client = db.model("ClientScheme", ClientScheme);
module.exports = { Client };

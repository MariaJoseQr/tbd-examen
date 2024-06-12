const mongoose = require("mongoose");
const { Schema } = mongoose;

const db = mongoose.connection.useDb("empresa");

const ClientScheme = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId },
    name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    document_number: {
      type: String,
      required: true,
    },
  },
  { collection: "client" }
);

const Client = db.model("ClientScheme", ClientScheme);
module.exports = { Client };

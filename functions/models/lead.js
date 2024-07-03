const mongoose = require("mongoose");
const { Schema } = mongoose;

const db = mongoose.connection.useDb("empresa");

const LeadSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
  },
  {
    collection: "lead",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Lead = db.model("LeadSchema", LeadSchema);
module.exports = { Lead };

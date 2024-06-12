const { Client } = require("../models/client");

exports.getData = async (req, res) => {
  try {
    const docs = await Client.find({});

    if (docs.length === 0) console.log("No clients found.");
    else console.log(`Found ${docs.length} clients.`);

    res.send({ docs });
  } catch (err) {
    console.error("Error fetching clients: ", err);
    res.status(500).send({ error: "An error occurred while retrieving data." });
  }
};

const { Client } = require("../models/client");

exports.get = async (req, res) => {
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

exports.post = async (req, res) => {
  try {
    const { name, last_name, document_number } = req.body;

    const newClient = new Client({ name, last_name, document_number });
    const savedClient = await newClient.save();

    res.status(201).json(savedClient);
  } catch (error) {
    console.error("Error creating client: ", error);
    res.status(500).json({ error: "An error occurred while saving data." });
  }
};

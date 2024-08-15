const { Client } = require("../models/client");

exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await Client.findById(id);

    if (!doc) return res.status(404).send({ error: "Client not found." });

    res.send({ doc });
  } catch (err) {
    console.error("Error fetching client: ", err);
    res.status(500).send({ error: "An error occurred while retrieving data." });
  }
};

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
    const { name, last_name, email, address, phone } = req.body;

    const newClient = new Client({ name, last_name, email, address, phone });
    const savedClient = await newClient.save();

    res.status(201).json(savedClient);
  } catch (error) {
    console.error("Error creating client: ", error);
    res.status(500).json({ error: "An error occurred while saving data." });
  }
};

exports.patch = async (req, res) => {
  try {
    const { id } = req.params;
    const dataToUpdate = req.body;

    const updatedClient = await Client.findByIdAndUpdate(id, dataToUpdate, {
      new: true,
    });

    if (!updatedClient) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    res.json(updatedClient);
  } catch (error) {
    console.error("Error al actualizar el cliente:", error.message);
    res.status(500).json({ error: "Hubo un error al actualizar el cliente" });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedClient = await Client.findByIdAndDelete(id);

    if (!deletedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    console.error("Error deleting client: ", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the client" });
  }
};

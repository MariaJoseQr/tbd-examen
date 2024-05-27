const home = (req, res) => {
  res.send("Welcome to the Home page!");
};

const services = (req, res) => {
  const { param } = req.params;

  if (!param || /^[a-zA-Z]+$/.test(param))
    res.send(`Services page with param: ${param}`);
  else res.status(400).send("Invalid parameter");
};

const projects = (req, res) => {
  const { param } = req.params;

  if (!param || /^[a-zA-Z]+$/.test(param))
    res.send(`Projects page with param: ${param}`);
  else res.status(400).send("Invalid parameter");
};

const clients = (req, res) => {
  const { param } = req.params;

  if (!param || /^[a-zA-Z]+$/.test(param))
    res.send(`Clients page with param: ${param}`);
  else res.status(400).send("Invalid parameter");
};

const blog = (req, res) => {
  const { param } = req.params;

  if (!param || /^[0-9]+$/.test(param))
    res.send(`Blog page with param: ${param}`);
  else res.status(400).send("Invalid parameter");
};

const contact = (req, res) => {
  res.send("Contact page");
};

module.exports = {
  home,
  services,
  projects,
  clients,
  blog,
  contact,
};

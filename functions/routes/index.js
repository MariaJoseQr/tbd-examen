const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const clientsRouter = require("./client");

router.get("/", indexController.home);
router.get("/services/:param?", indexController.services);
router.get("/projects/:param?", indexController.projects);
router.use("/clients", clientsRouter);
router.get("/blog/:param?", indexController.blog);
router.get("/contact", indexController.contact);

module.exports = router;

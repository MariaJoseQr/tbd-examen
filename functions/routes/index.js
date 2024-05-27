const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");

router.get("/", indexController.home);
router.get("/services/:param?", indexController.services);
router.get("/projects/:param?", indexController.projects);
router.get("/clients/:param?", indexController.clients);
router.get("/blog/:param?", indexController.blog);
router.get("/contact", indexController.contact);

module.exports = router;

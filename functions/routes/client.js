const express = require("express");
const controller = require("../controllers/client");

const router = express.Router();

router.get(`/:id`, controller.getById);
router.get(`/`, controller.get);
router.post("/", controller.post);
router.patch("/:id", controller.patch);

module.exports = router;

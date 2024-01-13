const express = require("express");
const router = express.Router();
const controller = require("../controller/registercontroller");

router.post("/register", controller.register);
router.post("/sign", controller.signin);
module.exports = router;

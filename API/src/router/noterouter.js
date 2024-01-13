const express = require("express");
const noterouter = express.Router();
const authetication = require("../middleware/auth");
const controller = require("../controller/notecontroller");

noterouter.post("/noteadd", authetication, controller.createnote);
noterouter.get("/getnote", authetication, controller.getnotes);
noterouter.put("/updatenote/:id", authetication, controller.updatenote);
noterouter.delete("/deletenote/:id", authetication, controller.deltenote);

module.exports = noterouter;

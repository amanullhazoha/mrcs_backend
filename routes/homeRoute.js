const express = require("express");
const { getAllData } = require("../controller/homeController");

const router = express.Router();

router.get("/", getAllData);

module.exports = router;

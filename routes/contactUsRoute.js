// external imports
const express = require("express");
const router = express.Router();
const { contactUs } = require("../controller/contactUsController");

router.post("/", contactUs);

module.exports = router;

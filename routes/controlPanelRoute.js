const express = require("express");
const Authorize = require("../middleware/users/authorize");
const Authenticate = require("../middleware/users/authenticate");
const {
  getAllData,
  addControlPanel,
  updateControlPanel,
  deleteControlPanel,
} = require("../controller/controlPanel");

const router = express.Router();

router.get("/", getAllData);
router.post("/add", Authenticate, Authorize("admin"), addControlPanel);
router.put("/update/:id", Authenticate, Authorize("admin"), updateControlPanel);
router.delete("/delete/:id", Authenticate, Authorize("admin"), deleteControlPanel);

module.exports = router;

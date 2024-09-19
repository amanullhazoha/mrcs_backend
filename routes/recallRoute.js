const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const Authorize = require("../middleware/users/authorize");
const Authenticate = require("../middleware/users/authenticate");
const {
  addRecall,
  updateRecall,
  deleteRecall,
  getRecallbyId,
  getAllRecallData,
} = require("../controller/recallController");

const router = express.Router();

router.get("/", getAllRecallData);
router.get("/:id", getRecallbyId);
router.post("/add", Authenticate, Authorize("admin"), upload, addRecall);
router.delete("/delete/:id", Authenticate, Authorize("admin"), deleteRecall);
router.put("/update/:id", Authenticate, Authorize("admin"), upload, updateRecall);

module.exports = router;

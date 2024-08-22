// external imports
const express = require("express");

const router = express.Router();

const {
  addRecall,
  updateRecall,
  getRecallbyId,
  getAllRecallData,
  deleteRecall,
} = require("../controller/recallController");

const upload = require("../middleware/uploadMiddleware");
// const { imageValidator,imageValidationHandler } = require("../middleware/image/imageValidator");

// get All Questions
router.get("/", getAllRecallData);

// get by Single Question
router.get("/:id", getRecallbyId);

// post Question
router.post("/add", upload, addRecall);

// delete question
router.delete("/delete/:id", deleteRecall);

// update question
router.put("/update/:id", upload, updateRecall);

module.exports = router;

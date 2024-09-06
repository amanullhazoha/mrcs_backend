const express = require("express");
const router = express.Router();

const {
  getReview,
  addReview,
  updateReview,
  deleteReview,
  getShowReview,
  getSingleReview,
} = require("../controller/reviewController");
const upload = require("../middleware/uploadMiddleware");

router.get("/", getReview);

router.get("/show", getShowReview);

// get by Single faq
router.get("/:id", getSingleReview);

// post faq
router.post("/add", addReview);

// delete faq
router.delete("/delete/:id", deleteReview);

// update faq
router.put("/update/:id", upload, updateReview);

module.exports = router;

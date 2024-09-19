const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const Authenticate = require("../middleware/users/authenticate");
const {
  getReview,
  addReview,
  updateReview,
  deleteReview,
  getShowReview,
  getSingleReview,
  getLoggedInUserReview
} = require("../controller/reviewController");

const router = express.Router();

router.get("/", Authenticate, getReview);

router.get("/show", Authenticate, getShowReview);
router.get("/logged-in-user", Authenticate, getLoggedInUserReview);
router.get("/:id", Authenticate, getSingleReview);

router.post("/add", Authenticate, addReview);
router.put("/update/:id", Authenticate, upload, updateReview);

router.delete("/delete/:id", Authenticate, deleteReview);

module.exports = router;

const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const Authorize = require("../middleware/users/authorize");
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

router.get("/", Authenticate, Authorize("admin"), getReview);

router.get("/show", getShowReview);
router.get("/logged-in-user", Authenticate, getLoggedInUserReview);
router.get("/:id", Authenticate, Authorize("admin"), getSingleReview);

router.post("/add", Authenticate, addReview);
router.put("/update/:id", Authenticate, Authorize("admin"), upload, updateReview);

router.delete("/delete/:id", Authenticate, Authorize("admin"), deleteReview);

module.exports = router;

const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const Authorize = require("../middleware/users/authorize");
const Authenticate = require("../middleware/users/authenticate");
const {
  categoryValidator,
  categoryValidationHandler,
} = require("../middleware/category/categoryValidator");
const {
  getRecallCategory,
  addRecallCategory,
  updateRecallCategory,
  deleteRecallCategory,
  getSingleRecallCategory,
} = require("../controller/recallCategoryController");

const router = express.Router();

router.get("/", getRecallCategory);
router.get("/:id", getSingleRecallCategory);
router.post(
  "/add",
  Authenticate,
  Authorize("admin"),
  upload,
  categoryValidator,
  categoryValidationHandler,
  addRecallCategory
);
router.delete(
  "/delete/:id",
  Authenticate,
  Authorize("admin"),
  deleteRecallCategory
);
router.put(
  "/update/:id",
  Authenticate,
  Authorize("admin"),
  upload,
  updateRecallCategory
);

module.exports = router;

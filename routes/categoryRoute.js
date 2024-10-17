const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const Authorize = require("../middleware/users/authorize");
const Authenticate = require("../middleware/users/authenticate");
const {
  categoryValidator,
  categoryValidationHandler,
} = require("../middleware/category/categoryValidator");
const {
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
  getSingleCategory,
} = require("../controller/categoryController");

const router = express.Router();

router.get("/", getCategory);
router.get("/:id", getSingleCategory);
router.post(
  "/add",
  Authenticate,
  Authorize("admin"),
  upload,
  categoryValidator,
  categoryValidationHandler,
  addCategory
);
router.delete("/delete/:id", Authenticate, Authorize("admin"), deleteCategory);
router.put(
  "/update/:id",
  Authenticate,
  Authorize("admin"),
  upload,
  updateCategory
);

module.exports = router;

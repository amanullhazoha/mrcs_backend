const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const Authorize = require("../middleware/users/authorize");
const Authenticate = require("../middleware/users/authenticate");
const {
  getFaq,
  addFaq,
  updateFaq,
  deleteFaq,
  getSingleFaq,
} = require("../controller/faqController");

const router = express.Router();

router.get("/", getFaq);
router.get("/:id", getSingleFaq);
router.post("/add", Authenticate, Authorize("admin"), upload, addFaq);
router.delete("/delete/:id", Authenticate, Authorize("admin"), deleteFaq);
router.put("/update/:id", Authenticate, Authorize("admin"), upload, updateFaq);

module.exports = router;

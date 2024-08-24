const express = require("express");
const router = express.Router();

const {
  getFaq,
  addFaq,
  updateFaq,
  deleteFaq,
  getSingleFaq,
} = require("../controller/faqController");
const upload = require("../middleware/uploadMiddleware");

router.get("/", getFaq);

// get by Single faq
router.get("/:id", getSingleFaq);

// post faq
router.post("/add", upload, addFaq);

// delete faq
router.delete("/delete/:id", deleteFaq);

// update faq
router.put("/update/:id", upload, updateFaq);

module.exports = router;

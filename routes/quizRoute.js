const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const Authorize = require("../middleware/users/authorize");
const Authenticate = require("../middleware/users/authenticate");
const { quizValidator, quizValidationHandler } = require("../middleware/quiz/quizValidation");
const {
  getQuiz,
  addQuiz,
  updateQuiz,
  deleteQuiz,
  getSingleQuiz,
  getCategory_NameWise_AllQuiz,
} = require("../controller/quizController");

const router = express.Router();

router.get("/", getQuiz);
router.get("/quizbycategory", getCategory_NameWise_AllQuiz);
router.get("/:id", getSingleQuiz);
router.post("/add", Authenticate, Authorize("admin"), upload, quizValidator, quizValidationHandler, addQuiz);
router.delete("/delete/:id", Authenticate, Authorize("admin"), deleteQuiz);
router.put("/update/:id", Authenticate, Authorize("admin"), upload, updateQuiz);

module.exports = router;

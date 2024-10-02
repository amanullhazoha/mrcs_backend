// external imports
const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const Authorize = require("../middleware/users/authorize");
const Authenticate = require("../middleware/users/authenticate");
const {
    addQuestion,
    deleteQuestion,
    updateQuestion,
    getQuestionbyId,
    getAllQuestionData,
    getAllQuestion_BY_Quiz,
} = require("../controller/questionController");

const router = express.Router();

router.get("/", getAllQuestionData);
router.get("/questionbyquiz", Authenticate, getAllQuestion_BY_Quiz);
router.get("/:id", getQuestionbyId);
router.post("/add", Authenticate, Authorize("admin"), upload, addQuestion);
router.delete("/delete/:id", Authenticate, Authorize("admin"), deleteQuestion);
router.put("/update/:id", Authenticate, Authorize("admin"), upload, updateQuestion);

module.exports = router;

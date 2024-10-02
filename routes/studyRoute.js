const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const Authorize = require("../middleware/users/authorize");
const Authenticate = require("../middleware/users/authenticate");
const { addStudy, updateStudy, getStudybyId, getAllStudyData, deleteStudy } = require("../controller/studyController");

const router = express.Router();

router.get("/", getAllStudyData);
router.get("/:id", getStudybyId);
router.post("/add", Authenticate, Authorize("admin"), upload, addStudy);
router.delete("/delete/:id", Authenticate, Authorize("admin"), deleteStudy);
router.put("/update/:id", Authenticate, Authorize("admin"), upload, updateStudy);

module.exports = router;

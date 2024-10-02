const express = require("express");
const Authorize = require("../middleware/users/authorize");
const Authenticate = require("../middleware/users/authenticate");
const {
    addResult,
    getAllResult,
    getResultbyId,
    getAllResult_BY_User,
} = require("../controller/questionController");

const router = express.Router();

router.get("/", getAllResult);
router.post("/add", Authenticate, addResult); 
router.get("/:userId", getAllResult_BY_User);
router.get("/singleresult/:id", getResultbyId);

module.exports = router;

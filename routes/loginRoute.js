const express = require("express");
const { doLoginValidators, doLoginValidationHandler } = require("../middleware/login/loginValidator");
const {
  login,
  logout,
  getUserActivity,
  deleteUserActivity,
} = require("../controller/loginController");

const router = express.Router();

router.post("/login", doLoginValidators, doLoginValidationHandler, login);
router.delete("/logout", logout);
router.get("/user-activity", getUserActivity);
router.delete("/user-activity/delete/:id", deleteUserActivity);

module.exports = router;

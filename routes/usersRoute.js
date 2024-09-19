const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const Authorize = require("../middleware/users/authorize");
const Authenticate = require("../middleware/users/authenticate");
const { addUserValidators, addUserValidationHandler } = require("../middleware/users/userValidator");
const {
  addUser,
  getUsers,
  updateUser,
  deleteUser,
  getSingleUser,
  getLoginUserProfile,
  loggedInUserProfileUpdate
} = require("../controller/usersController");

const router = express.Router();

router.get("/", Authenticate, Authorize("admin"), getUsers);

router.get("/profile", Authenticate, getLoginUserProfile);
router.put("/profile/update", Authenticate, loggedInUserProfileUpdate);

router.get("/:id", Authenticate, Authorize("admin"), getSingleUser);

router.post("/adduser", upload, addUserValidators, addUserValidationHandler, addUser);

router.put("/update/:id", Authenticate, Authorize("admin"), upload, updateUser);

router.delete("/delete/:id", Authenticate, Authorize("admin"), deleteUser);

module.exports = router;

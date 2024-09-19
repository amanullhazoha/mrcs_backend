const express = require("express");
const Authorize = require("../middleware/users/authorize");
const Authenticate = require("../middleware/users/authenticate");
const { getSubscription, updateSubscription } = require("../controller/subscriptionController");

const router = express.Router();

router.get("/", getSubscription);
router.put("/update/:id", Authenticate, Authorize("admin"), updateSubscription);

module.exports = router;
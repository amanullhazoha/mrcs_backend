const express = require("express"); 
const { resetPassword, forgotPassword } = require("../controller/forgotPasswordController");

const router = express.Router(); 

router.post("/forgot-password",forgotPassword); 
router.post('/reset-password/:token', resetPassword);

module.exports = router; 
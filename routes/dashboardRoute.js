const express = require("express"); 
const { getAllData } = require("../controller/dashboardController");

const router = express.Router(); 

router.get("/", getAllData ); 

module.exports = router; 
const express = require("express");
const Authorize = require("../middleware/users/authorize");
const Authenticate = require("../middleware/users/authenticate");
const { sliderValidator, sliderValidationHandler} = require("../middleware/slider/SliderValidator");
const { addSlider, deleteSlider, updateSlider, getSliderImageById, getAllSliderImages } = require("../controller/sliderController");

const router = express.Router(); 

router.get("/", getAllSliderImages);
router.get("/:id", Authenticate, Authorize("admin"), getSliderImageById); 
router.post("/add", Authenticate, Authorize("admin"), addSlider); 
router.delete("/delete/:id", Authenticate, Authorize("admin"), deleteSlider); 
router.put("/update/:id", Authenticate, Authorize("admin"), updateSlider); 

module.exports = router;

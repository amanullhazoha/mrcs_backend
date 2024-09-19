const express = require("express");
const { addTags, getTags } = require("../controller/tagsController");

const router = express.Router(); 

router.get("/",getTags)
router.post("/addtags",addTags);

module.exports = router;

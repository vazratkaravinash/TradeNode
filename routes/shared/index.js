var express = require("express");
var seller = require("../../controller/seller/seller");
var router = express.Router();

/* GET users listing. */
router.get("/getAllItems", [seller.getAllItems]);
router.get("/searchItems", [seller.searchItems]);

module.exports = router;

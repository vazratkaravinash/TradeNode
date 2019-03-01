var express = require("express");
var auth = require("../../controller/middleware/index");
var seller = require("../../controller/seller/seller");
var router = express.Router();

/* GET users listing. */
router.post("/", [auth.authenticate, seller.addItem]);
router.put("/", [auth.authenticate, seller.updateItem]);
router.delete("/", [auth.authenticate, seller.deleteItem]);

module.exports = router;

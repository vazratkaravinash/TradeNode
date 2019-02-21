var express = require("express");
var user = require("../../controller/user/user");
var router = express.Router();

/* GET users listing. */
router.post("/",user.addUser);

module.exports = router;

var express = require("express");
var user = require("../../controller/user/user");
var router = express.Router();

/* GET users listing. */
router.post("/register",user.addUser);
router.post("/login",user.getUser);

module.exports = router;

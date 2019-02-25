"use strict";

const jwt = require("../../helpers/jwt");

const authenticate = (req, res, next) => {
	jwt.authinticate(req.body.token).then((decoded) => { 
		req.body.user = decoded;   
		next();
	}).catch((error) => {
		res.send({success:false, error: {message:"Not a valid user or time expired.. Please login" , reason:error}});
	});
};

module.exports = {
	authenticate
};

//localStorage.setItem('whatever', 'something');3
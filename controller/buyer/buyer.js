
var user = require("../../model/buyer/buyer");
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const addItem = (req) => {
	buyer.addItem(req.body).then((result) => {
		if (result) {
			res.send({success: false, error: "Email already exists"});
		}
		else {
			user.addUser(req.body).then((result) => {
				res.send({success: true, result: result});
			});
		}
	})
		.catch((error) => {
			res.send({success: false, error: error});
		});
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getUser = (req, res) => {
	user.checkEmailExist(req.body).then((email) => {
		if (email) {
			user.checkPassword(req.body).then((result) => {
				if(result.verify){
					res.send({success: true, result: result});
				}
				else {
					res.send({success: false, error:"Invalid Password"});
				}
			});
		}
		else {
			res.send({success: false, error: "Invalid Email Address"});
		}
	}).catch((error) => {
		res.send({success: false, error: error});
	});
};

module.exports = {
	addUser,
	getUser
};
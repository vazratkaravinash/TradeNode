var user = require("../../model/user/users");
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const addUser = (req, res) => {
	user.checkEmailExist(req.body).then((email) => {
		if (email) {
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
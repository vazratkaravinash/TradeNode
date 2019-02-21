var user = require("../../model/user/users");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const addUser = (req, res) => { 
	user.addUser(req.body).then((result)=>{
		res.send(result);
	})
		.catch((error)=>{
			res.send(error);
		});
};

module.exports = {
	addUser
};
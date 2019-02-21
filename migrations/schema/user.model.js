const mongoose = require("mongoose");
var Schema = mongoose.Schema;

function userSchema(connection) {
	return new Promise((resolve) => {
		var userschema = new Schema({
			email: String,
			password: String,
			contact: String,
			address: String,
			city: String,
			state: String,
			countary: String
		});
		var user = connection.model("User", userschema);
		resolve(user);
	});
}


module.exports = {
	userSchema
};
var userSchema = require("../../migrations/schema/user.model");
const db = require("../../helpers/mongo-connection");


function addUser(data) {
	return new Promise((resolve, reject) => {
		db.mongoConnection()
			.then((connection) => {
				userSchema.userSchema(connection)
					.then((result) => {
						result.create(data)
							.then((res1) => {
								connection.close();
								resolve("User Successfully Added" + res1);
							});
					});
			}).catch((error) => {
				reject("Error in user creation" + error);
			});
	});
}

module.exports = {
	addUser
};
var userSchema = require("../../migrations/schema/user.model");
const db = require("../../helpers/mongo-connection");
const bcrypt = require("../../helpers/bcrypt");
const jwt = require("../../helpers/jwt");

function addUser(data) {
	return new Promise((resolve, reject) => {
		db.mongoConnection().then((connection) => {
			bcrypt.encryptPassword(data.password).then((hash)=> {
				data.password = hash;
				userSchema.user(connection).then((result) => {
					result.create(data).then((res1) => {
						connection.close();
						resolve("User Successfully Added" + res1);
					});
				});
			});
		}).catch((error) => {
			reject("Error in user creation" + error);
		});
	});
}

const checkEmailExist = (data) => {	
	return new Promise((resolve, reject) => {
		db.mongoConnection()
			.then((connection) => {
				userSchema.user(connection).then((result) => {
					result.findOne({email:data.email}).then((res1) => {
						connection.close();
						if(res1)
							resolve(res1.email);
						else
							resolve(null);
					});
				});
			}).catch((error) => {
				reject("Error in getting user" + error);
			});
	});
}; 

const checkPassword = (data) => {
	return new Promise((resolve, reject) => {
		db.mongoConnection().then((connection) => {
			userSchema.user(connection).then((result) => {
				result.findOne({email:data.email}).then((dbres) => {
					connection.close();
					bcrypt.verifyPassword(data.password,dbres.password).then((isVerified) => {
						jwt.createToken(dbres).then((token) => {
							if(isVerified){
								resolve({verify:isVerified, token:token});
							}
							else {
								resolve(isVerified);
							}
						});
					});
				});
			});
		}).catch((error) => {
			reject("Error in getting user" + error);
		});
	});
};

module.exports = {    addUser,
	checkEmailExist,
	checkPassword
};
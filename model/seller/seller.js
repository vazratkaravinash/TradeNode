var itemSchema = require("../../migrations/schema/item.model");
const db = require("../../helpers/mongo-connection");

/**
 * Function to add item details in the database
 * @param {object} data which is all item details
 */
const addItem = (data) => {
	return new Promise((resolve, reject) => {
		db.mongoConnection().then((connection) => {
			itemSchema.createItemSchema(connection).then((result) => {
				result.create(data).then((res1) => {
					connection.close();
					resolve("User Successfully Added" + res1);
				}).catch(error => reject(error));
			}).catch(error => reject(error));
		}).catch((error) => {
			reject("Error in user creation" + error);
		});
	});
};

/**
 * Function to check whether item is already added by a user in database or not
 * @param {object} data is name, type, userId, category
 */
const isDuplicateItem = (data) => {
	return new Promise((resolve, reject) => {
		db.mongoConnection().then((connection) => {
			itemSchema.createItemSchema(connection).then((result) => {
				result.find(
					{category:data.category,
						name:data.name, 
						type:data.type,
						userId:data.user.data._id
					}).then((res1) => {
					connection.close();
					resolve(res1);
				}).catch(error => reject(error));
			});
		}).catch((error) => {
			reject("Error in getting item from database" + error);
		});
	});
};

// /**
//  * Function to get item details by item Id
//  * @param {object} data is _id
//  */
// const getItemById = (data) => {
// 	return new Promise((resolve, reject) => {
// 		db.mongoConnection().then((connection) => {
// 			itemSchema.createItemSchema(connection).then((result) => {
// 				result.findOne({_id:data._id}).then((dbres) => {
// 					connection.close();
// 					resolve(dbres);
// 				});
// 			});
// 		}).catch((error) => {
// 			reject("Error in getting user" + error);
// 		});
// 	});
// };

/**
 * Function to get all items of a specific category
 * @param {object} data is category
 */
const searchItems = (data) => {
	return new Promise((resolve, reject) => {
		db.mongoConnection().then((connection) => {
			itemSchema.createItemSchema(connection).then((result) => {
				if(data.category){
					result.find({category:data.category}).then((dbres) => {
						connection.close();
						resolve(dbres);
					}).catch(error => reject(error));
				}
				else {
					result.findOne({_id:data._id}).then((dbres) => {
						connection.close();
						resolve(dbres);
					}).catch(error => reject(error));
				}
			});
		}).catch((error) => {
			reject("Error in getting user" + error);
		});
	});
};

/**
 * Function will return all item details 
 */
const getAllItems = () => {
	return new Promise((resolve, reject) => {
		db.mongoConnection().then((connection) => {
			itemSchema.createItemSchema(connection).then((result) => {
				result.find({}).then((dbres) => {
					connection.close();
					resolve(dbres);
				});
			}).catch(error => reject(error));
		}).catch((error) => {
			reject("Error in getting user" + error);
		});
	});
};

/**
 * Function to update the item by _id
 * @param {object} data is item id
 */
const updateItem = (data) => {
	return new Promise((resolve, reject) => {
		db.mongoConnection().then((connection) => {
			itemSchema.createItemSchema(connection).then((result) => {
				result.findOneAndUpdate({_id: data._id, userId: data.user.data._id}, data , { upsert: false }, function(err, rdbs){
					if(err){
						reject(err);
					}
					else {
						resolve(rdbs);
					}
				});
			});
		}).catch((error) => {
			reject("Error in getting user" + error);
		});
	});
};

/**
 * Function to update many items by category
 * @param {object} updateQuery 
 * @param {object} data 
 */
const updateAllItems = (updateQuery, data) => {
	return new Promise((resolve, reject) => {
		db.mongoConnection().then((connection) => {
			itemSchema.createItemSchema(connection).then((result) => {
				result.updateMany(updateQuery, data , { upsert: false }, { multi: true }).then((dbres) => {
					connection.close();
					resolve(dbres);
				}).catch(error => reject(error));
			});
		}).catch((error) => {
			reject("Error in getting user" + error);
		});
	});
};

/**
 * Function to delete the specific item by _id
 * @param {Object} data is json object having item _id
 */
const deleteItem = (data) => {
	return new Promise((resolve, reject) => {
		db.mongoConnection().then((connection) => {
			itemSchema.createItemSchema(connection).then((result) => {
				result.findOneAndDelete({_id: data._id, userId: data.userId}).then((dbres) => {
					connection.close();
					resolve(dbres);
				}).catch(error => reject(error));
			});
		}).catch((error) => {
			reject("Error in getting user" + error);
		});
	});
};

module.exports = {    
	addItem,
	deleteItem,
	updateAllItems,
	updateItem,
	getAllItems,
	searchItems,
	isDuplicateItem
};
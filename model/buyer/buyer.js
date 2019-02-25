var itemSchema = require("../../migrations/schema/item.model");
const db = require("../../helpers/mongo-connection");

const addItem = (data) => {
	return new Promise((resolve, reject) => {
		db.mongoConnection().then((connection) => {
			itemSchema.createItemSchema(connection).then((result) => {
				result.create(data).then((res1) => {
					connection.close();
					resolve("User Successfully Added" + res1);
				});
			});
		}).catch((error) => {
			reject("Error in user creation" + error);
		});
	});
};


const getItemById = (data) => {
	return new Promise((resolve, reject) => {
		db.mongoConnection().then((connection) => {
			itemSchema.createItemSchema(connection).then((result) => {
				result.findOne({_id:data._id}).then((dbres) => {
					connection.close();
					resolve(dbres);
				});
			});
		}).catch((error) => {
			reject("Error in getting user" + error);
		});
	});
};

const getAllItemsByCategory = (data) => {
	return new Promise((resolve, reject) => {
		db.mongoConnection().then((connection) => {
			itemSchema.createItemSchema(connection).then((result) => {
				result.find({category:data.category}).then((dbres) => {
					connection.close();
					resolve(dbres);
				});
			});
		}).catch((error) => {
			reject("Error in getting user" + error);
		});
	});
};

const getAllItems = () => {
	return new Promise((resolve, reject) => {
		db.mongoConnection().then((connection) => {
			itemSchema.createItemSchema(connection).then((result) => {
				result.find({}).then((dbres) => {
					connection.close();
					resolve(dbres);
				});
			});
		}).catch((error) => {
			reject("Error in getting user" + error);
		});
	});
};

const updateItem = (data) => {
	return new Promise((resolve, reject) => {
		db.mongoConnection().then((connection) => {
			itemSchema.createItemSchema(connection).then((result) => {
				result.updateOne({_id: data._id}, data , { upsert: false }, { multi: false }).then((dbres) => {
					connection.close();
					resolve(dbres);
				});
			});
		}).catch((error) => {
			reject("Error in getting user" + error);
		});
	});
};

const updateAllItems = (updateQuery, data) => {
	return new Promise((resolve, reject) => {
		db.mongoConnection().then((connection) => {
			itemSchema.createItemSchema(connection).then((result) => {
				result.updateMany(updateQuery, data , { upsert: false }, { multi: true }).then((dbres) => {
					connection.close();
					resolve(dbres);
				});
			});
		}).catch((error) => {
			reject("Error in getting user" + error);
		});
	});
};

const deleteItem = (data) => {
	return new Promise((resolve, reject) => {
		db.mongoConnection().then((connection) => {
			itemSchema.createItemSchema(connection).then((result) => {
				result.deleteOne({_id: data._id}).then((dbres) => {
					connection.close();
					resolve(dbres);
				});
			});
		}).catch((error) => {
			reject("Error in getting user" + error);
		});
	});
};



module.exports = {    
	addItem,
	getItemById,
	deleteItem,
	updateAllItems,
	updateItem,
	getAllItems,
	getAllItemsByCategory
};
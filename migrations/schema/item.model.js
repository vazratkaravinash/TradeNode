const mongoose = require("mongoose");
var Schema = mongoose.Schema;

function createItemSchema(connection) {
	return new Promise((resolve) => {
		var itemschema = new Schema({
			name: String,
			type: String,
			price: Number,
			categoty: String,
			photosId: [String],
			description: String,
			owner: String,
			writer: String,
			size: [Number],
			color: [String],
			status: String,
			updated: { type: Date, default: Date.now },
			created: { type: Date, default: Date.now }
		});
		var user = connection.model("Item", itemschema);
		resolve(user);
	});
}



module.exports = {
	createItemSchema
};
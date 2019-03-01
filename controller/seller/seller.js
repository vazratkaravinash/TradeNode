var seller = require("../../model/seller/seller");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const addItem = (req, res) => {
	seller.isDuplicateItem(req.body).then((item)=>{
		if(item.length){
			res.send({success: false, error: "Book already exists"});
		}
		else {
			req.body.created = new Date();
			req.body.updated = new Date();
			req.body.userId = req.body.user.data._id;
			seller.addItem(req.body).then((result) => {
				res.send({success: true, result: result});
			});
		}
	}).catch((error) => {
		res.send({success: false, error: error});
	});
};

/**
 * Function to get all items
 * @param {*} req 
 * @param {*} res 
 */
const getAllItems = (req, res) => {
	seller.getAllItems().then((items) => {
		res.send({success: true, result:items});
	}).catch((error) => {
		res.send({success: false, error: error});
	});
};

/**
 * Function to get all items by category
 * @param {*} req 
 * @param {*} res 
 */
const searchItems = (req, res) => {
	seller.searchItems(req.query).then((items) => {
		res.send({success: true, result:items});
	}).catch((error) => {
		res.send({success: false, error: error});
	});
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = (req, res) => {
	req.body.updated = new Date();
	seller.updateItem(req.body).then((items) => {
		res.send({success: true, result:items});
	}).catch((error) => {
		res.send({success: false, error: error});
	});
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = (req, res) => {
	req.query.userId = req.body.user.data._id;
	seller.deleteItem(req.query).then((items) => {
		res.send({success: true, result:items});
	}).catch((error) => {
		res.send({success: false, error: error});
	});
};

module.exports = {
	addItem,
	getAllItems,
	searchItems,
	updateItem,
	deleteItem
};
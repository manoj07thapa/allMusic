const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [ true, 'Please add a title' ],
		unique: true,
		maxlength: [ 40, 'Title cannot be more than 40 characters' ]
	},
	price: {
		type: Number,
		required: true
	},
	description: {
		type: String,
		required: true,
		maxlength: [ 200, 'Description cannot be more than 200 characters' ]
	},
	image: {
		type: String,
		required: true
	}
});

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema);

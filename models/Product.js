import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
	category: {
		type: String,
		required: [ true, 'Please add a category' ]
	},

	make: {
		type: String,
		required: [ true, 'Please add a title' ],
		maxlength: [ 40, 'Title cannot be more than 40 characters' ]
	},
	model: {
		type: String,
		required: [ true, 'Please add a title' ],
		maxlength: [ 40, 'Title cannot be more than 40 characters' ]
	},
	price: {
		type: Number,
		required: true
	},
	description: {
		type: String,
		required: true,
		maxlength: [ 1000, 'Description cannot be more than 1000 characters' ]
	},
	image: {
		type: String,
		required: true
	},
	rating: {
		type: Number
	}
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);

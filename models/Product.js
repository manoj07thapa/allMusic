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
	files: {
		type: [ {} ],
		required: true
	},
	rating: {
		type: Number
	}
});

ProductSchema.index(
	{
		category: 'text',
		make: 'text',
		model: 'text',
		description: 'text'
	},
	{
		weights: {
			category: 5,
			make: 5,
			model: 5,
			description: 1
		}
	}
);

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);

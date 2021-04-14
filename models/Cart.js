import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

// const cartProductSchema = new mongoose.Schema({
// 	quantity: { type: Number, default: 1 },
// 	product: { type: ObjectId, ref: 'Product' },
// 	isChecked: { type: Number, default: 1 }
// 	 createdAt: { type: Date, default: Date.now, expires: '1m' }
// });

// cartProductSchema.post('save', function(doc) {
// 	console.log('SchemaDOC', doc);
// 	if (doc.createdAt && doc.createdAt.expires) {
// 		setTimeout(doc.products.remove(), doc.createdAt.expires * 1);
// 	}
// });

const cartSchema = new mongoose.Schema({
	user: {
		type: ObjectId,
		ref: 'User'
	},
	products: [
		{
			quantity: { type: Number, default: 1 },
			product: { type: ObjectId, ref: 'Product' },
			isChecked: { type: Number, default: 1 }
		}
	]
});

export default mongoose.models.Cart || mongoose.model('Cart', cartSchema);

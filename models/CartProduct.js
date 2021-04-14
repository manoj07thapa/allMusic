// import mongoose from 'mongoose';
// const { ObjectId } = mongoose.Schema.Types;

// const cartProductSchema = new mongoose.Schema({
// 	quantity: { type: Number, default: 1 },
// 	product: { type: ObjectId, ref: 'Product' },
// 	createdAt: { type: Date, default: Date.now, expires: '1m' }
// });

// cartProductSchema.post('save', function(doc) {
// 	if (doc.createdAt && doc.createdAt.expires) {
// 		setTimeout(doc.remove(), doc.createdAt.expires * 1000);
// 	}
// });

// export default mongoose.models.CartProduct || mongoose.model('CartProduct', cartProductSchema);

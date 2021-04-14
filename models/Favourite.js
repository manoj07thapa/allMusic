import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const favouriteSchema = new mongoose.Schema({
	user: {
		type: ObjectId,
		ref: 'User'
	},
	products: [
		{
			quantity: { type: Number, default: 1 },
			product: { type: ObjectId, ref: 'Product' }
		}
	]
});

export default mongoose.models.Favourite || mongoose.model('Favourite', favouriteSchema);

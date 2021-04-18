import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const shipInfoSchema = new mongoose.Schema(
	{
		user: {
			type: ObjectId,
			ref: 'User'
		},
		shipInfo: {
			phone: Number,
			zone: String,
			district: String,
			city: String,
			area: String,
			address: String
		}
	},
	{
		timestamps: true
	}
);

export default mongoose.models.ShipInfo || mongoose.model('ShipInfo', shipInfoSchema);

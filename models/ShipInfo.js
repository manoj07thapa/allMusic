import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const shipInfoSchema = new mongoose.Schema(
	{
		user: {
			type: ObjectId,
			ref: 'User'
		},
		phone: {
			type: Number
		},
		zone: {
			type: String
		},
		district: {
			type: String
		},
		city: {
			type: String
		},
		area: {
			type: String
		},
		address: {
			type: String
		}
	},
	{
		timestamps: true
	}
);

export default mongoose.models.ShipInfo || mongoose.model('ShipInfo', shipInfoSchema);

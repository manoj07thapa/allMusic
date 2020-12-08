import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
	{
		firstname: {
			type: String,
			required: [ true, 'Please add a name' ],
			unique: true,
			maxlength: [ 40, 'Name cannot be more than 40 characters' ]
		},
		lastname: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		},
		remember: {
			type: Boolean,
			default: false
		},
		role: {
			type: String,
			required: true,
			default: 'user',
			enum: [ 'user', 'admin', 'root' ]
		},
		resetToken: String,
		expireToken: Date
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);

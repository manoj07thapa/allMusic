import User from '../../../models/User';
import Authenticated from '../../../utils/Authenticated';
import jwt from 'jsonwebtoken';
import { sendResetPasswordEmail } from '../../../mailer/mailer';
import dbConnect from '../../../utils/dbConnect';

export default async (req, res) => {
	await dbConnect();
	switch (req.method) {
		case 'GET':
			await getUsers(req, res);
			break;
		case 'PUT':
			await changeRole(req, res);
			break;
		case 'POST':
			await forgotPassword(req, res);
			break;
	}
};

const getUsers = Authenticated(async (req, res) => {
	/*getting all the users except for the  loggedin user
    In this case the logged in user is root user */

	try {
		const users = await User.find({ _id: { $ne: req.userId } }).select('-password');
		return res.status(200).json({ success: true, users });
	} catch (error) {
		return res.status(404).json({ success: false, data: {} });
	}
});

const changeRole = Authenticated(async (req, res) => {
	const { _id, currentRole } = req.body;
	try {
		const newRole = currentRole === 'user' ? 'admin' : 'user';
		const user = await User.findByIdAndUpdate({ _id }, { role: newRole }, { new: true });
		return res.status(200).json({ success: true, user });
	} catch (error) {
		return res.status(404).json({ success: false });
	}
});

const forgotPassword = async (req, res) => {
	const { email } = req.body;
	console.log(email);
	try {
		const user = await User.findOne({ email });
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

		if (!user) {
			return res.status(404).json({ success: false, error: 'User doesnot exist with this email' });
		} else {
			user.resetToken = token;
			user.expireToken = Date.now() + 3600000;
			await user.save();
			await sendResetPasswordEmail(user, token);
			return res.json({
				success: true,
				message: 'Please, check in your email and follow the instruction to reset your passowrd.'
			});
		}
	} catch (err) {
		return res.json({ success: false, error: ' Invalid Email !!' });
	}
};

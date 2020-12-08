import bcrypt from 'bcryptjs';
import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

dbConnect();

export default async (req, res) => {
	const { password, confirmpassword } = req.body.values;
	const { tokenId } = req.body;

	try {
		if (password.length === 0 || confirmpassword.length === 0) {
			return res.status(422).json({ success: false, error: 'Please add all the fields' });
		}
		const user = await User.findOne({ resetToken: tokenId, expireToken: { $gt: Date.now() } });
		if (!user) {
			return res.status(404).json({ success: false, error: 'Invalid Token,  please try again.' });
		}
		const hashedPassword = await bcrypt.hash(password, 12);
		user.password = hashedPassword;
		user.resetToken = undefined;
		user.expireToken = undefined;
		await user.save();
		res.status(201).json({ success: true, message: 'Password successfully changed, you can now login' });
	} catch (err) {
		res.status(400).json({ success: false, error: 'Server error, please try again' });
	}
};

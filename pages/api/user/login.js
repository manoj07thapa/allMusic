import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dbConnect();

export default async (req, res) => {
	console.log(req.body);
	const { email, password } = req.body;
	try {
		if (!email || !password) {
			return res.status(422).json({ success: false, error: 'Please add all the fields' });
		}
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ success: false, error: 'Invalid credentials' });
		}
		const doMatch = await bcrypt.compare(password, user.password);
		if (doMatch) {
			const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
				expiresIn: '7d'
			});
			const { firstname, role, email } = user;
			res.status(201).json({ success: true, token, user: { firstname, role, email } });
		} else {
			return res.status(401).json({ success: false, error: 'Email or password is Invalid' });
		}
	} catch (err) {
		res.status(400).json({ success: false, error: 'server error' });
	}
};

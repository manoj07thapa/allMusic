import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dbConnect();

export default async (req, res) => {
	const { email, password } = req.body;
	try {
		if (!email || !password) {
			return res.status(422).json({ error: 'please add all the fields' });
		}
		const user = await User.findOne({ email });
		console.log(user);
		if (!user) {
			return res.status(404).json({ error: 'user dont exists with that email' });
		}
		const doMatch = await bcrypt.compare(password, user.password);
		if (doMatch) {
			const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
				expiresIn: '7d'
			});
			const { firstname, role, email } = user;
			res.status(201).json({ success: true, token, user: { firstname, role, email } });
		} else {
			return res.status(401).json({ success: false, error: 'email or password dont match' });
		}
	} catch (err) {
		res.status(400).json({ success: false, error: err });
	}
};

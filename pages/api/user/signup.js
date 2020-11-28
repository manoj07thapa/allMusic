import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import Cart from '../../../models/Cart';
import bcrypt from 'bcryptjs';

dbConnect();

export default async (req, res) => {
	const { firstname, lastname, email, password } = req.body;
	try {
		if (!firstname || !lastname || !email || !password) {
			return res.status(422).json({ error: 'please add all the fields' });
		}
		const user = await User.findOne({ email });
		if (user) {
			return res.status(422).json({ error: 'user already exists with that email' });
		}
		const hashedPassword = await bcrypt.hash(password, 12);
		const newUser = await new User({
			firstname,
			lastname,
			email,
			password: hashedPassword
		}).save();
		await new Cart({ user: newUser._id }).save();
		res.status(201).json({ success: true, data: newUser });
	} catch (err) {
		res.status(404).json({ success: false, error: err });
	}
};

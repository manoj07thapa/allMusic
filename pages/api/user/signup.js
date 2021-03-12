import bcrypt from 'bcryptjs';
import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import Cart from '../../../models/Cart';
import { sendConfirmationEmail } from '../../../mailer/mailer';

export default async (req, res) => {
	await dbConnect();
	const { firstname, lastname, email, password, confirmpassword } = req.body;
	try {
		if (!firstname || !email || !password || !confirmpassword) {
			return res.status(422).json({ error: 'please add all the fields' });
		}
		const user = await User.findOne({ email });

		if (user) {
			return res.status(422).json({ error: 'User already exists with that email' });
		}
		const hashedPassword = await bcrypt.hash(password, 12);

		const newUser = await new User({
			firstname,
			lastname,
			email,
			password: hashedPassword
		}).save();

		/*sending signup confirmation to newuser */
		await sendConfirmationEmail(newUser);

		await new Cart({ user: newUser._id }).save();
		return res.status(201).json({ success: true, data: newUser });
	} catch (error) {
		return res.json({ success: false, message: error.toString() });
	}
};

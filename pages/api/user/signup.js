import bcrypt from 'bcryptjs';
import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import Cart from '../../../models/Cart';
import ShipInfo from '../../../models/ShipInfo';
import { sendConfirmationEmail } from '../../../mailer/mailer';

export default async (req, res) => {
	await dbConnect();
	switch (req.method) {
		case 'POST':
			await signUpUser(req, res);
			break;
		case 'PUT':
			await editUser(req, res);
			break;
		case 'GET':
			await getUser(req, res);
			break;
	}
};

const signUpUser = async (req, res) => {
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
		await new ShipInfo({ user: newUser._id }).save();
		res.status(201).json({ success: true, data: newUser });
	} catch (error) {
		res.json({ success: false, message: error.toString() });
	}
};

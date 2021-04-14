import Cart from '../../../models/Cart';
import Order from '../../../models/Order';
import dbConnect from '../../../utils/dbConnect';
import Authenticated from '../../../utils/Authenticated';
import axios from 'axios';

export default Authenticated(async (req, res) => {
	await dbConnect();
	const { payload } = req.body;

	const data = {
		token: payload.token,
		amount: payload.amount
	};

	let config = {
		headers: { Authorization: 'Key test_secret_key_b9e7778b3b4845269094a8c8cb095968' }
	};

	try {
		const response = await axios.post('https://khalti.com/api/v2/payment/verify/', data, config);
		res.status(200).json({ success: true, message: 'Payment successful' });
	} catch (error) {
		res.status(200).json({ success: false, message: 'Payment Unsuccessful' });
	}
});

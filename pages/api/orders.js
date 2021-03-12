import Order from '../../models/Order';
import Authenticated from '../../utils/Authenticated';
import dbConnect from '../../utils/dbConnect';

export default async (req, res) => {
	await dbConnect();
	switch (req.method) {
		case 'GET':
			await getOrders(req, res);
			break;
	}
};

const getOrders = Authenticated(async (req, res) => {
	try {
		const orders = await Order.find({ user: req.userId }).populate('products.product');
		return res.status(200).json({ message: 'success', orders });
	} catch (error) {
		return res.status(401).json({ message: 'failure', orders });
	}
});

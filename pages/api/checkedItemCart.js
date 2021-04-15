import dbConnect from '../../utils/dbConnect';
import Cart from '../../models/Cart';
import Authenticated from '../../utils/Authenticated';
import Product from '../../models/Product';

export default async (req, res) => {
	await dbConnect();
	switch (req.method) {
		case 'PUT':
			await editCart(req, res);
			break;
		case 'POST':
			await postCart(req, res);
			break;
	}
};

const editCart = Authenticated(async (req, res) => {
	const { checkedItem } = req.body;

	try {
		const resp = await Cart.findOneAndUpdate(
			{ user: req.userId, 'products._id': checkedItem },
			{ $inc: { 'products.$.isChecked': 1 } },
			{ useFindAndModify: false }
		).populate('products.product', Product);

		res.status(200).json({ success: true, checkedCart: resp });
	} catch (err) {
		console.log(err);
		return res.status(400).json({ success: false, error: 'server error' });
	}
});

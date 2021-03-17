import Cart from '../../models/Cart';
import Authenticated from '../../utils/Authenticated';
import dbConnect from '../../utils/dbConnect';

export default async (req, res) => {
	await dbConnect();
	switch (req.method) {
		case 'PUT':
			await addProduct(req, res);
			break;
		case 'DELETE':
			await removeProduct(req, res);
			break;
	}
};

const addProduct = Authenticated(async (req, res) => {
	const { quantity, productId } = req.body;

	try {
		const cart = await Cart.findOne({ user: req.userId });
		/**checking if the product id from client exist in product array of cart colection */
		const productExists = cart.products.some((pdoc) => productId === pdoc.product.toString());

		if (productExists) {
			await Cart.findOneAndUpdate(
				{ _id: cart._id, 'products.product': productId },
				{ $inc: { 'products.$.quantity': quantity } }
			);
		} else {
			const newProduct = { quantity, product: productId };
			await Cart.findOneAndUpdate({ _id: cart._id }, { $push: { products: newProduct } });
		}

		res.status(200).json({ success: true, message: 'product added to cart' });
	} catch (error) {
		res.status(400).json({ success: false, message: 'Couldnot add product to cart' });
	}
});

const removeProduct = Authenticated(async (req, res) => {
	const { productId } = req.body;
	try {
		const cart = await Cart.findOneAndUpdate(
			{ user: req.userId },
			{ $pull: { products: { product: productId } } },
			{ new: true }
		).populate('products.product');
		return res.status(200).json({ success: true, cartProducts: cart.products });
	} catch (error) {
		return res.status(401).json({ success: false, message: 'Unable to delete product' });
	}
});

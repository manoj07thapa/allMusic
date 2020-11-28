import Cart from '../../models/Cart';
import Authenticated from '../../utils/Authenticated';
import dbConnect from '../../utils/dbConnect';
import jwt from 'jsonwebtoken';

dbConnect();

export default async (req, res) => {
	switch (req.method) {
		// case 'GET':
		// 	await fetchUserCart(req, res);
		// 	break;
		case 'PUT':
			await addProduct(req, res);
			break;
		case 'DELETE':
			await removeProduct(req, res);
			break;
	}
};

// const fetchUserCart = Authenticated(async (req, res) => {
// 	const cart = await Cart.findOne({ user: req.userId }).populate('products.product');
// 	res.status(200).json(cart.products);
// });
// function Authenticated(icomponent) {
// 	return (req, res) => {
// 		console.log(req.headers);
// 		const { authorization } = req.headers;
// 		console.log(authorization);
// 		if (!authorization) {
// 			return res.status(401).json({ error: 'you must logged in' });
// 		}
// 		try {
// 			const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
// 			req.userId = userId;
// 			return icomponent(req, res);
// 		} catch (err) {
// 			console.log(err);
// 			return res.status(401).json({ error: 'you must logged in' });
// 		}
// 	};
// }

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

	const cart = await Cart.findOneAndUpdate(
		{ user: req.userId },
		{ $pull: { products: { product: productId } } },
		{ new: true }
	).populate('products.product');
	res.status(200).json({ success: true, cartProducts: cart.products });
});

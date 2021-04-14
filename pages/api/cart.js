import Cart from '../../models/Cart';
import Authenticated from '../../utils/Authenticated';
import dbConnect from '../../utils/dbConnect';
import Product from '../../models/Product';

export default async (req, res) => {
	await dbConnect();
	switch (req.method) {
		case 'PUT':
			await addProduct(req, res);
			break;
		case 'DELETE':
			await removeProduct(req, res);
			break;
		case 'GET':
			await getCartByUser(req, res);
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
				{ $inc: { 'products.$.quantity': quantity } }, //$inc was replaced to $set
				{ useFindAndModify: false }
			);
		} else {
			const newProduct = { quantity, product: productId };
			await Cart.findOneAndUpdate(
				{ _id: cart._id },
				{ $push: { products: newProduct } },
				{ useFindAndModify: false }
			);
		}
		const newCart = await Cart.findOne({ user: req.userId });
		res.status(200).json({ success: true, message: 'product added to cart', newCart });
	} catch (error) {
		res.status(400).json({ success: false, message: 'Couldnot add product to cart' });
	}
});

const removeProduct = Authenticated(async (req, res) => {
	const { productId } = req.body;
	console.log('PID', productId);
	try {
		const cart = await Cart.findOneAndUpdate(
			{ user: req.userId },
			{ $pull: { products: { product: productId } } },
			{ useFindAndModify: false }
		).populate('products.product', Product);
		res.status(200).json({ success: true, cartProducts: cart.products });
	} catch (error) {
		console.log('ErrorDelete', error);
		res.status(401).json({ success: false, message: 'Unable to delete product' });
	}
});

const getCartByUser = Authenticated(async (req, res) => {
	try {
		const cart = await Cart.findOne({ user: req.userId }).populate('products.product', Product);

		res.status(200).json({ success: true, cartProducts: cart.products });
	} catch (error) {
		console.log(error);
		res.status(401).json({ success: false, message: 'Unable to fetch cart for this user' });
	}
});

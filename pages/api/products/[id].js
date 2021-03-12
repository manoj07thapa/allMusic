import dbConnect from '../../../utils/dbConnect';
import Product from '../../../models/Product';

export default async (req, res) => {
	await dbConnect();
	const { query: { id }, method } = req;

	switch (method) {
		case 'GET':
			try {
				const product = await Product.findById(id);
				if (!product) {
					return res.status(400).json({ success: false, message: 'couldnot find the product' });
				}
				res.status(200).json({ success: true, data: product });
			} catch (error) {
				return res.status(400).json({ success: false, message: 'couldnot find the product' });
			}
			break;

		case 'PUT':
			try {
				const product = await Product.findByIdAndUpdate(id, req.body);
				if (!product) {
					return res.status(400).json({ success: false, message: 'couldnot find the product' });
				}
				return res.status(200).json({ success: true, data: product });
			} catch (error) {
				return res.status(400).json({ success: false, message: 'couldnot find the product' });
			}
			break;

		case 'DELETE':
			try {
				const product = await Product.findByIdAndRemove({ _id: id, useFindAndModify: false });
				if (!product) {
					return res.status(400).json({ success: false, message: 'couldnot find the product' });
				}
				return res.status(200).json({ success: true, data: {} });
			} catch (error) {
				return res.status(400).json({ success: false, message: 'couldnot find the product' });
			}
			break;
		default:
			return res.status(400).json({ success: false, message: 'couldnot find the product' });
			break;
	}
};

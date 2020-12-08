// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from '../../../utils/dbConnect';
import Product from '../../../models/Product';

dbConnect();

export default async (req, res) => {
	const { name, price, description } = req.body.values;
	console.log(name);
	const { image } = req.body;
	console.log(image);
	const { method } = req;
	switch (method) {
		case 'GET':
			try {
				const products = await Product.find({});
				res.status(200).json({ success: true, data: products });
			} catch (error) {
				res.status(400).json({ success: false, error: 'Sorry couldnot find products' });
			}
			break;
		case 'POST':
			try {
				if (!name || !price || !description || !image) {
					return res.status(404).json({ success: false, error: 'Add all the required fields' });
				}
				const product = await new Product({ name, price, description, image }).save();
				res.status(201).json({ success: true, data: product, message: 'Product Created' });
			} catch (error) {
				res.status(400).json({ success: false, error: 'Sorry couldnot create the product' });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
};

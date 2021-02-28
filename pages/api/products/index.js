// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from '../../../utils/dbConnect';
import Product from '../../../models/Product';

export default async (req, res) => {
	await dbConnect();
	switch (req.method) {
		case 'GET':
			try {
				const products = await Product.find({});
				res.status(200).json({ success: true, data: products });
			} catch (error) {
				res.status(400).json({ success: false, error: 'Sorry couldnot find products' });
			}
			break;
		case 'POST':
			const { category, make, model, price, description } = req.body.values;
			console.log(req.body.values);
			const { image } = req.body;
			try {
				if (!category || !make || !model || !price || !description || !image) {
					return res.status(404).json({ success: false, error: 'Add all the required fields' });
				}
				const product = await new Product({ category, make, model, price, description, image }).save();
				res.status(201).json({ success: true, data: product, message: 'Product Created' });
			} catch (error) {
				console.log(error);
				res.status(400).json({ success: false, error: 'Sorry couldnot create the product' });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
};

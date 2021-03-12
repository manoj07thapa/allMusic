import Product from '../../models/Product';
import dbConnect from '../../utils/dbConnect';
import { getAsString } from '../../utils/getAsString';

export default async (req, res) => {
	await dbConnect();
	console.log(req.query);
	const make = getAsString(req.query.make);
	const category = getAsString(req.query.category);

	try {
		const models = await Product.aggregate([
			{
				$match: { make, category }
			},

			{
				$group: {
					_id: '$model',
					count: { $sum: 1 }
				}
			}
		]);
		return res.status(200).json(models);
	} catch (error) {
		return res.status(401).json({ success: flase });
	}
};

import Product from '../../models/Product';
import dbConnect from '../../utils/dbConnect';
import { getAsString } from '../../utils/getAsString';

export default async (req, res) => {
	await dbConnect();
	const category = getAsString(req.query.category);
	try {
		const makes = await Product.aggregate([
			{
				$match: { category }
			},

			{
				$group: {
					_id: '$make',
					count: { $sum: 1 }
				}
			}
		]);
		return res.status(200).json(makes);
	} catch (error) {
		return res.status(401).json({ success: false });
	}
};

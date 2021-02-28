import Product from '../../models/Product';
import dbConnect from '../../utils/dbConnect';
import { getAsString } from '../../utils/getAsString';

export default async (req, res) => {
	await dbConnect();
	const category = getAsString(req.query.category);

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
	res.json(makes);
};

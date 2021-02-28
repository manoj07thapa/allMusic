import Product from '../models/Product';
import dbConnect from '../utils/dbConnect';

export async function getModels(category, make) {
	// await dbConnect();
	const models = await Product.aggregate([
		{
			$match: {
				$and: [ { make }, { category } ]
			}
		},

		{
			$group: {
				_id: '$model',
				count: { $sum: 1 }
			}
		}
	]);
	return models;
}

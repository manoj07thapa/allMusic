import Product from '../models/Product';
import dbConnect from '../utils/dbConnect';

export async function getMakes(category) {
	// await dbConnect();
	const makes = await Product.aggregate([
		{
			$match: {
				category
			}
		},

		{
			$group: {
				_id: '$make',
				count: { $sum: 1 }
			}
		}
	]);
	return makes;
}

import Product from '../models/Product';
import dbConnect from '../utils/dbConnect';

export async function getCategories() {
	// await dbConnect();
	const categories = await Product.aggregate([
		{
			$group: {
				_id: '$category',
				count: { $sum: 1 }
			}
		}
	]);
	return categories;
}

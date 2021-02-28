import Product from '../../models/Product';
import dbConnect from '../../utils/dbConnect';
import { getAsString } from '../../utils/getAsString';

export default async (req, res) => {
	await dbConnect();
	console.log(req.query);
	const make = getAsString(req.query.make);
	const category = getAsString(req.query.category);

	const models = await Product.aggregate([
		// {
		// 	$match: {
		// 		$and: [ { make: makeQ }, { category: categoryQ } ]
		// 	}
		// },
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
	res.json(models);
};

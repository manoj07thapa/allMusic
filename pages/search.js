import { getPaginatedProducts } from '../dbQuery/getPaginatedProducts';
import dbConnect from '../utils/dbConnect';

export default function Search() {
	return (
		<div>
			<h1>Search page</h1>
		</div>
	);
}

export const getServerSideProps = async (ctx) => {
	await dbConnect();

	// const search = getAsString(ctx.query.search);

	/**Instead of running two different query synchronously this method
	 * runs both query for makes and models parallely
	 */
	// const [ categories, makes, models, pagination ] = await Promise.all([
	// 	getCategories(),
	// 	getMakes(category),
	// 	getModels(category, make),
	// 	getPaginatedProducts(ctx.query)
	// ]);

	const searchProducts = await getPaginatedProducts(ctx.query);
	console.log(searchProducts);

	return {
		props: {}
	};
};

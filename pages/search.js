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

	try {
		const searchProducts = await getPaginatedProducts(ctx.query);
	} catch (error) {
		console.log(error);
	}

	return {
		props: {}
	};
};

import { useRouter } from 'next/router';
import { Grid } from '@material-ui/core';
import { getValueNumber } from '../../../dbQuery/getPaginatedProducts';
import dbConnect from '../../../utils/dbConnect';
import { getAsString } from '../../../utils/getAsString';
import Product from '../../../models/Product';
import ProductCard from '../../../components/ProductCard';
import NavProductsPagination from '../../../components/NavProductsPagination';

export default function Index({ ssProducts, totalPages }) {
	const products = JSON.parse(ssProducts);
	console.log('SSProps', products);
	console.log('TotalPages', totalPages);
	const router = useRouter();
	console.log(router);
	return (
		<div>
			<Grid container item xs={12} sm={8} spacing={5}>
				<Grid item xs={12}>
					<NavProductsPagination totalPages={totalPages} />
				</Grid>
				{products.map((product) => (
					<Grid item xs={12} sm={4} key={product._id}>
						<ProductCard product={product} />
					</Grid>
				))}
				<Grid item xs={12}>
					<NavProductsPagination totalPages={totalPages} />
				</Grid>
			</Grid>
		</div>
	);
}

export async function getServerSideProps(ctx) {
	console.log('Context of serverside', ctx.query);

	const make = getAsString(ctx.query.make);
	const category = getAsString(ctx.query.category);
	const page = getValueNumber(ctx.query.page);
	const productsPerPage = getValueNumber(ctx.query.productsPerPage) || 2;
	const skip = (page - 1) * productsPerPage;
	const productsPromise = Product.find({ category, make }).limit(productsPerPage).skip(skip);
	const totalProductsPromise = Product.find({ category, make }).countDocuments();

	const [ res, totalProducts ] = await Promise.all([ productsPromise, totalProductsPromise ]);

	const ssProducts = JSON.stringify(res);
	console.log('SSProducts', ssProducts);

	const totalPages = Math.ceil(totalProducts / productsPerPage);
	console.log('SSTotalPages', totalPages);

	await dbConnect();
	return {
		props: { totalPages, ssProducts }
	};
}

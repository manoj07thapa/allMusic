import Head from 'next/head';
import { useEffect, useState } from 'react';
import deepEqual from 'fast-deep-equal';
import useSwr from 'swr';
import { stringify } from 'querystring';
import dbConnect from '../utils/dbConnect';
import { Formik, Form, Field, useField, useFormikContext } from 'formik';
import { useRouter } from 'next/router';
import Filters from '../components/Filters';

import {
	Paper,
	Grid,
	makeStyles,
	FormControl,
	MenuItem,
	Typography,
	InputLabel,
	Select,
	Button,
	Drawer,
	Toolbar,
	Container
} from '@material-ui/core';
import { getAsString } from '../utils/getAsString';
import { getCategories } from '../dbQuery/getCatogories';
import { getMakes } from '../dbQuery/getMakes';
import { getModels } from '../dbQuery/getModels';
import { getPaginatedProducts } from '../dbQuery/getPaginatedProducts';
import ProductPagination from '../components/ProductPagination';
import ProductCard from '../components/ProductCard';

const prices = [ 5000, 10000, 20000, 50000, 100000, 200000, 500000 ];

const drawerWidth = 270;

const useStyles = makeStyles((theme) => ({
	paper: {
		maxWidth: 270,
		padding: theme.spacing(2),
		marginTop: '1rem'
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	drawerContainer: {
		overflow: 'auto'
	},
	drawerDisplay: {
		display: 'block',
		[theme.breakpoints.down('sm')]: {
			display: 'none'
		}
	},
	marginMobile: {
		[theme.breakpoints.down('sm')]: {
			marginTop: '5rem',
			marginLeft: '6rem'
		},
		[theme.breakpoints.down('xs')]: {
			marginTop: '5rem',
			marginLeft: '4rem'
		}
	},
	productGrid: {
		marginTop: '2rem',
		[theme.breakpoints.down('sm')]: {
			marginTop: '0.2rem'
		}
	}
}));

export default function Products({ categories, makes, models, ssProducts, totalPages }) {
	const products = JSON.parse(ssProducts);
	const classes = useStyles();

	const { query } = useRouter();

	const [ serverQuery ] = useState(query);

	const { data } = useSwr('/api/products?' + stringify(query), {
		dedupingInterval: 60000,
		initialData: deepEqual(query, serverQuery) ? { products, totalPages } : undefined
	});

	return (
		<div>
			<Head>
				<title>Shopify | Products</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Grid container className={classes.marginMobile}>
				<Filters categories={categories} makes={makes} models={models} />
				<Grid container item xs={9} spacing={3} className={classes.productGrid}>
					<Grid item xs={12}>
						<Typography variant="h6">{`Your Search results for Products`}</Typography>
						<Typography variant="body2">{`${data
							? data.products.length
							: products.length} products found`}</Typography>
					</Grid>
					{(data ? data.products : products || []).map((product) => (
						<Grid item xs={12} sm={4} md={3} key={product._id}>
							<ProductCard product={product} />
						</Grid>
					))}
					<Grid item xs={12}>
						<ProductPagination totalPages={data ? data.totalPages : totalPages} />
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
}

export const getServerSideProps = async (ctx) => {
	await dbConnect();

	const make = getAsString(ctx.query.make);
	const category = getAsString(ctx.query.category);

	/**Instead of running two different query synchronously this method
	 * runs both query for makes and models parallely
	 * 
	 */

	const [ categories, makes, models, pagination ] = await Promise.all([
		getCategories(),
		getMakes(category),
		getModels(category, make),
		getPaginatedProducts(ctx.query)
	]);

	const ssProducts = JSON.stringify(pagination.products);

	return {
		props: { categories, makes, models, ssProducts, totalPages: pagination.totalPages }
	};
};

import Head from 'next/head';
import { useEffect, useState } from 'react';
import deepEqual from 'fast-deep-equal';
import useSwr from 'swr';
import { stringify } from 'querystring';
import dbConnect from '../utils/dbConnect';
import { Formik, Form, Field, useField, useFormikContext } from 'formik';
import { useRouter } from 'next/router';
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
	Toolbar
} from '@material-ui/core';
import { getAsString } from '../utils/getAsString';
import { getCategories } from '../dbQuery/getCatogories';
import { getMakes } from '../dbQuery/getMakes';
import { getModels } from '../dbQuery/getModels';
import { getPaginatedProducts } from '../dbQuery/getPaginatedProducts';
import ProductPagination from '../components/ProductPagination';
import ProductCard from '../components/ProductCard';

const prices = [ 5000, 10000, 20000, 50000, 100000, 200000, 500000 ];

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	paper: {
		maxWidth: 250,
		padding: theme.spacing(3),
		marginTop: '4.5rem'
	},
	root: {
		display: 'flex'
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	drawerContainer: {
		overflow: 'auto',
		marginTop: '3rem'
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		marginTop: '3rem'
	}
}));

export default function Products({ categories, makes, models, ssProducts, totalPages }) {
	const products = JSON.parse(ssProducts);
	const classes = useStyles();

	const { query } = useRouter();
	const searchQuery = query.search;
	const router = useRouter();
	const [ serverQuery ] = useState(query);

	const { data } = useSwr('/api/products?' + stringify(query), {
		dedupingInterval: 60000,
		initialData: deepEqual(query, serverQuery) ? { products, totalPages } : undefined
	});

	const initialValues = {
		category: getAsString(query.category) || 'all',
		make: getAsString(query.make) || 'all',
		model: getAsString(query.model) || 'all',
		minPrice: getAsString(query.minPrice) || 'all',
		maxPrice: getAsString(query.maxPrice) || 'all'
	};

	const handleSubmit = (values) => {
		router.push(
			{
				pathname: '/products',
				query: { ...values, page: 1 }
			},
			undefined,
			{ shallow: true }
		);
	};

	return (
		<div className={classes.root}>
			<Head>
				<title>Shopify || Products</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Typography variant="h2">Product page</Typography>
			<Grid container>
				<Grid item xs={12} sm={3}>
					<Formik initialValues={initialValues} onSubmit={handleSubmit}>
						{({ values }) => (
							<Form>
								<Drawer
									className={classes.drawer}
									variant="permanent"
									classes={{
										paper: classes.drawerPaper
									}}
								>
									<Toolbar />
									<Paper className={classes.paper}>
										<Grid container spacing={3}>
											<Grid item xs={12}>
												<FormControl variant="outlined" fullWidth>
													<InputLabel id="search-category">Choose Category</InputLabel>
													<Field
														name="category"
														as={Select}
														id="search-category"
														label="Category"
													>
														<MenuItem value="all">
															<em>All categories</em>
														</MenuItem>
														{categories.map((category, i) => (
															<MenuItem value={category._id} key={i}>
																{category._id}
															</MenuItem>
														))}
													</Field>
												</FormControl>
											</Grid>
											<Grid item xs={12}>
												<MakeSelect
													initialCategory={initialValues.category}
													name="make"
													makes={makes}
													category={values.category}
												/>
											</Grid>
											<Grid item xs={12}>
												<ModelSelect
													initialMake={initialValues.make}
													name="model"
													models={models}
													make={values.make}
													category={values.category}
												/>
											</Grid>
											<Grid item xs={12}>
												<FormControl variant="outlined" fullWidth>
													<InputLabel id="search-minPrice">Choose Min Price</InputLabel>
													<Field
														name="minPrice"
														as={Select}
														id="search-minPrice"
														label="MinPrice"
													>
														<MenuItem value="all">
															<em>No Min</em>
														</MenuItem>
														{prices.map((price, i) => (
															<MenuItem value={price} key={i}>
																{price}
															</MenuItem>
														))}
													</Field>
												</FormControl>
											</Grid>
											<Grid item xs={12}>
												<FormControl variant="outlined" fullWidth>
													<InputLabel id="search-maxPrice"> Choose Max Price</InputLabel>
													<Field
														name="maxPrice"
														as={Select}
														id="search-maxPrice"
														label="MaxPrice"
													>
														<MenuItem value="all">
															<em>No max</em>
														</MenuItem>
														{prices.map((price, i) => (
															<MenuItem value={price} key={i}>
																{price}
															</MenuItem>
														))}
													</Field>
												</FormControl>
											</Grid>
											<Grid item xs={12}>
												<Button type="submit" variant="contained" fullWidth color="primary">
													Search
												</Button>
											</Grid>
										</Grid>
									</Paper>
								</Drawer>
							</Form>
						)}
					</Formik>
				</Grid>
				<main className={classes.content}>
					<Toolbar />
					<Grid container item xs={12} sm={10} spacing={5}>
						<Grid item xs={12}>
							<ProductPagination totalPages={data ? data.totalPages : totalPages} />
						</Grid>
						{(data ? data.products : products || []).map((product) => (
							<Grid item xs={12} sm={4} key={product._id}>
								<ProductCard product={product} />
							</Grid>
						))}
						<Grid item xs={12}>
							<ProductPagination totalPages={data ? data.totalPages : totalPages} />
						</Grid>
					</Grid>
				</main>
			</Grid>
		</div>
	);
}

export function MakeSelect({ initialCategory, makes, category, ...props }) {
	const { setFieldValue } = useFormikContext();
	const [ field ] = useField({
		name: props.name
	});
	const initialMakesOrUndefined = category === initialCategory ? makes : undefined;
	const { data } = useSwr('/api/makes?category=' + category, {
		dedupingInterval: 60000,
		initialData: category === 'all' ? [] : initialMakesOrUndefined
	});
	const newMakes = data || makes;

	useEffect(
		() => {
			if (!newMakes.map((a) => a._id).includes(field.value)) {
				setFieldValue('make', 'all');
			}
		},
		[ category, newMakes ]
	);

	//we call api for new data set of make when user changes category in the select dropdown
	//on successful fetch of new category we set make and models to ALLmakes and allmodels
	// const { data } = useSwr('/api/makes?category=' + category);
	// const { data } = useSwr('/api/makes?category=' + category, {
	// 	dedupingInterval: 60000,
	// 	onSuccess: (newValues) => {
	// 		if (!newValues.map((a) => a._id).includes(field.value)) {
	// 			setFieldValue('make', 'all');
	// 		}
	// 	}
	// });
	//if no new category is selected we use makess from serverside if not the we use newly fetched data from swr
	// const newMakes = data || makes;
	return (
		<FormControl variant="outlined" fullWidth>
			<InputLabel id="search-make">Choose Make</InputLabel>
			<Select name="make" id="search-make" label="Make" {...field} {...props}>
				<MenuItem value="all">
					<em>All Makes</em>
				</MenuItem>
				{newMakes.map((make, i) => (
					<MenuItem value={make._id} key={i}>
						{`${make._id} (${make.count})`}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}

export function ModelSelect({ initialMake, models, category, make, ...props }) {
	const { setFieldValue } = useFormikContext();
	const [ field ] = useField({
		name: props.name
	});
	const initialModelsOrUndefined = make === initialMake ? models : undefined;
	const { data } = useSwr(`/api/models?category=${category}&make=${make}`, {
		dedupingInterval: 60000,
		initialData: make === 'all' ? [] : initialModelsOrUndefined
	});
	const newModels = data || models;

	useEffect(
		() => {
			if (!newModels.map((a) => a._id).includes(field.value)) {
				setFieldValue('model', 'all');
			}
		},
		[ newModels, make ]
	);

	return (
		<FormControl variant="outlined" fullWidth>
			<InputLabel id="search-model">Choose Model</InputLabel>
			<Select name="model" id="search-model" label="Model" {...field} {...props}>
				<MenuItem value="all">
					<em>All Models</em>
				</MenuItem>
				{newModels.map((model, i) => (
					<MenuItem value={model._id} key={i}>
						{`${model._id} (${model.count})`}
					</MenuItem>
				))}
			</Select>
		</FormControl>
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

	// try {

	// } catch (error) {

	// }
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

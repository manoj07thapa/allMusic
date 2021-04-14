import { useEffect, useState } from 'react';
import useSwr from 'swr';

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
	Toolbar,
	Container
} from '@material-ui/core';
import { getAsString } from '../utils/getAsString';

const prices = [ 5000, 10000, 20000, 50000, 100000, 200000, 500000 ];

const drawerWidth = 270;

const useStyles = makeStyles((theme) => ({
	paper: {
		maxWidth: 270,
		padding: theme.spacing(2),
		marginTop: '1rem'
	},
	drawerPaper: {
		width: drawerWidth,
		backgroundColor: theme.palette.primary.contrastText
	},
	drawerContainer: {
		overflow: 'auto'
	},
	drawerDisplay: {
		[theme.breakpoints.down('sm')]: {
			display: 'none'
		}
	}
}));

export default function Filters({ categories, makes, models }) {
	const classes = useStyles();

	const { query } = useRouter();
	const router = useRouter();

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
		<Grid container item xs={3} spacing={3} className={classes.drawerDisplay}>
			<Formik initialValues={initialValues} onSubmit={handleSubmit}>
				{({ values }) => (
					<Form>
						<Drawer
							variant="permanent"
							classes={{
								paper: classes.drawerPaper
							}}
						>
							<Toolbar />

							<div className={classes.paper}>
								<Grid container item xs={12} spacing={3}>
									<Grid item xs={12}>
										<Typography variant="body1">Search By Filters</Typography>
										<hr />
									</Grid>
									<Grid item xs={12}>
										<FormControl variant="outlined" fullWidth>
											<InputLabel id="search-category">Category</InputLabel>
											<Field name="category" as={Select} id="search-category" label="Category">
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
											<InputLabel id="search-minPrice"> Min Price</InputLabel>
											<Field name="minPrice" as={Select} id="search-minPrice" label="MinPrice">
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
											<InputLabel id="search-maxPrice"> Max Price</InputLabel>
											<Field name="maxPrice" as={Select} id="search-maxPrice" label="MaxPrice">
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
										<Button type="submit" variant="contained" fullWidth color="secondary">
											Search
										</Button>
									</Grid>
								</Grid>
							</div>
						</Drawer>
					</Form>
				)}
			</Formik>
		</Grid>
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
			<InputLabel id="search-make"> Make</InputLabel>
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
			<InputLabel id="search-model">Model</InputLabel>
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

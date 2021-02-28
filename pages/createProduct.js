import React, { Fragment, useState } from 'react';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import Button from '@material-ui/core/Button';

import { Typography, LinearProgress, FormControl, InputLabel, MenuItem, Select, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import fetch from 'isomorphic-unfetch';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Alert from '@material-ui/lab/Alert';
import { FormikTextField } from '../hooks/FormikTextField';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	},
	paper: {
		margin: 'auto',
		maxWidth: 500,
		padding: theme.spacing(3)
	}
}));

const initialValues = {
	category: '',
	make: '',
	model: '',
	price: '',
	description: ''
};

const validationSchema = Yup.object({
	category: Yup.string().required(),
	make: Yup.string().required(),
	model: Yup.string().required(),
	price: Yup.number().required(),
	description: Yup.string().required()
});

const categories = [ 'smartphone', 'laptop', 'tab', 'desktop' ];

export default function CreateProduct() {
	const classes = useStyles();
	const router = useRouter();

	const [ image, setImage ] = useState('');

	const handleSubmit = async (values, actions) => {
		console.log(values);
		console.log(image);
		const cloudinaryImage = await imageUpload();

		const res = await fetch('/api/products', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ values, image: cloudinaryImage })
		});
		const data = await res.json();
		if (data.success === false) {
			actions.setErrors(data);
		} else {
			alert(data.message);
			actions.resetForm();
		}
		console.log(data);
		// router.push('/');
	};

	const imageUpload = async () => {
		const formData = new FormData();
		formData.append('file', image);
		formData.append('upload_preset', 'mystore'); //my store is a store in cloudinary
		formData.append('cloud_name', 'karma-777'); //karma-777 is is my cloud name in cloudinary
		const res = await fetch('https://api.cloudinary.com/v1_1/karma-777/image/upload', {
			method: 'POST',
			body: formData
		});
		const data = await res.json();
		return data.url;
	};

	// const Image = () => <div>{image ? <p>{image}</p> : null}</div>;

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={handleSubmit}
			validationSchema={validationSchema}
			validateOnBlur={false}
		>
			{({ errors, isSubmitting }) => (
				<div>
					<Form>
						<Paper className={classes.paper}>
							<Typography component="h1" variant="h5">
								Create Product
							</Typography>
							<Grid container>
								<Grid item xs={12}>
									<FormControl variant="outlined" className={classes.formControl}>
										<InputLabel id="category">Category</InputLabel>
										<Field name="category" as={Select} id="category" label="Category">
											{categories.map((category, i) => (
												<MenuItem value={category} key={i}>
													<em>{category}</em>
												</MenuItem>
											))}
										</Field>
									</FormControl>
								</Grid>
								<br />
								<Grid item xs={12}>
									<FormikTextField
										margin="normal"
										label="Product make"
										autoComplete="make"
										type="text"
										formikKey="make"
										variant="outlined"
									/>
								</Grid>
								<br />
								<Grid item xs={12}>
									<FormikTextField
										margin="normal"
										label="Product model"
										autoComplete="model"
										type="text"
										formikKey="model"
										variant="outlined"
									/>
								</Grid>
								<br />
								<Grid item xs={12}>
									<FormikTextField
										margin="normal"
										label="Price"
										autoComplete="price"
										type="number"
										formikKey="price"
										variant="outlined"
									/>
								</Grid>
								<br />
								<Grid item xs={12}>
									<FormikTextField
										margin="normal"
										label="Description"
										autoComplete="description"
										type="text"
										formikKey="description"
										variant="outlined"
									/>
								</Grid>

								<br />
								<br />
								<Grid item xs={12}>
									<Button variant="contained" component="label">
										Upload Image
										<input
											type="file"
											hidden
											accept="image/*"
											onChange={(e) => setImage(e.target.files[0])}
										/>
									</Button>
								</Grid>

								<br />
								<br />
								<Grid item xs={12}>
									<Button type="submit" variant="contained" color="primary">
										Create
									</Button>
								</Grid>
								<br />
								<br />

								{errors.error ? <Alert severity="error">{errors.error}</Alert> : null}

								{isSubmitting && <LinearProgress />}
							</Grid>
						</Paper>
					</Form>
				</div>
			)}
		</Formik>
	);
}

export async function getServerSideProps(ctx) {
	const cookie = parseCookies(ctx);
	const user = cookie.user ? JSON.parse(cookie.user) : '';
	if (user.role === 'user' || user === '') {
		return {
			notFound: true
		};
	}
	return {
		props: {}
	};
}

import React, { Fragment, useState } from 'react';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import Button from '@material-ui/core/Button';

import {
	Container,
	Typography,
	LinearProgress,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Grid,
	Paper
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import fetch from 'isomorphic-unfetch';
import { Formik, Form, Field } from 'formik';
import { array, object, string, number } from 'yup';
import Alert from '@material-ui/lab/Alert';
import { FormikTextField } from '../hooks/FormikTextField';
import { MultipleFileUploadField } from './uploads/MultipleFileUploadField';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	},
	paper: {
		margin: 'auto',
		padding: theme.spacing(3)
	}
}));

const initialValues = {
	category: '',
	make: '',
	model: '',
	price: '',
	files: [],
	description: ''
};

const validationSchema = object({
	category: string().required(),
	make: string().required(),
	model: string().required(),
	price: number().required(),
	files: array(
		object({
			url: string().required()
		})
	),
	description: string().required()
});

const categories = [ 'smartphone', 'laptop', 'tab', 'desktop' ];

export default function CreateProduct() {
	const classes = useStyles();

	const handleSubmit = async (values, actions) => {
		// const cloudinaryImage = await imageUpload();
		try {
			const res = await fetch('/api/products', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ values })
			});
			const data = await res.json();
			if (data.success === false) {
				actions.setErrors(data);
			} else {
				alert(data.message);
				actions.resetForm();
			}
			// router.push('/');
		} catch (error) {
			console.log(error);
		}
	};
	// this is a single file upload system for cloudinary
	// const imageUpload = async () => {
	// 	const formData = new FormData();
	// 	formData.append('file', image);
	// 	formData.append('upload_preset', 'mystore'); //my store is a store in cloudinary
	// 	formData.append('cloud_name', 'karma-777'); //karma-777 is is my cloud name in cloudinary
	// 	const res = await fetch('https://api.cloudinary.com/v1_1/karma-777/image/upload', {
	// 		method: 'POST',
	// 		body: formData
	// 	});
	// 	const data = await res.json();
	// 	return data.url;
	// };

	// const Image = () => <div>{image ? <p>{image}</p> : null}</div>;

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={handleSubmit}
			validationSchema={validationSchema}
			validateOnBlur={false}
		>
			{({ values, errors, isSubmitting, isValid }) => (
				<Container>
					<Form>
						<Typography component="h1" variant="h5">
							Create Product
						</Typography>
						<Grid container>
							<Grid item xs={12} sm={4}>
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
							<Grid item xs={12} sm={4}>
								<FormikTextField
									margin="normal"
									label="Product make"
									autoComplete="make"
									type="text"
									formikKey="make"
									variant="outlined"
								/>
							</Grid>
							<Grid item xs={12} sm={4}>
								<FormikTextField
									margin="normal"
									label="Product model"
									autoComplete="model"
									type="text"
									formikKey="model"
									variant="outlined"
								/>
							</Grid>
							<Grid item xs={12} sm={4}>
								<FormikTextField
									margin="normal"
									label="Price"
									autoComplete="price"
									type="number"
									formikKey="price"
									variant="outlined"
								/>
							</Grid>

							<Grid item xs={12} sm={4}>
								<FormikTextField
									margin="normal"
									label="Description"
									autoComplete="description"
									type="text"
									formikKey="description"
									variant="outlined"
									multiline
									rows={4}
								/>
							</Grid>

							<Grid item xs={12} sm={4}>
								<MultipleFileUploadField name="files" />
							</Grid>
							{/* <Grid item xs={12}>
									<Button variant="contained" component="label" disabled={!isValid || isSubmitting}>
										Upload Image
										<input
											type="file"
											hidden
											accept="image/*"
											onChange={(e) => setImage(e.target.files[0])}
										/>
									</Button>
								</Grid> */}

							<Grid item xs={12} sm={4}>
								<Button
									type="submit"
									variant="contained"
									color="primary"
									disabled={!isValid || isSubmitting}
								>
									Create
								</Button>
							</Grid>

							{errors.error ? <Alert severity="error">{errors.error}</Alert> : null}

							{isSubmitting && <LinearProgress />}
						</Grid>
					</Form>
				</Container>
			)}
		</Formik>
	);
}

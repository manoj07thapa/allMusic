import React, { Fragment, useState } from 'react';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import {
	Container,
	Typography,
	Snackbar,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Grid,
	Avatar,
	makeStyles
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import fetch from 'isomorphic-unfetch';
import { Formik, Form, Field } from 'formik';
import { array, object, string, number } from 'yup';
import Alert from '@material-ui/lab/Alert';
import { FormikTextField } from '../hooks/FormikTextField';
import { MultipleFileUploadField } from './uploads/MultipleFileUploadField';
import CustomizedSnackbar from './Snackbar';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(1),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
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
	const [ response, setResponse ] = useState({});

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
			setResponse(data);

			if (data.success === false) {
				actions.setErrors(data);
			} else {
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
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<AddCircleIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Add Product
				</Typography>
				<Formik
					initialValues={initialValues}
					onSubmit={handleSubmit}
					validationSchema={validationSchema}
					validateOnBlur={false}
				>
					{({ values, errors, isSubmitting, isValid }) => (
						<Form className={classes.form}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<FormControl variant="outlined" fullWidth>
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
								<Grid item xs={12} sm={6}>
									<FormikTextField
										margin="normal"
										label="Product make"
										autoComplete="make"
										type="text"
										formikKey="make"
										variant="outlined"
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<FormikTextField
										margin="normal"
										label="Product model"
										autoComplete="model"
										type="text"
										formikKey="model"
										variant="outlined"
									/>
								</Grid>

								<Grid item xs={12}>
									<FormikTextField
										margin="normal"
										label="Price"
										autoComplete="price"
										type="number"
										formikKey="price"
										variant="outlined"
										fullWidth
									/>
								</Grid>

								<Grid item xs={12}>
									<FormikTextField
										margin="normal"
										label="Description"
										autoComplete="description"
										type="text"
										formikKey="description"
										variant="outlined"
										multiline
										rows={4}
										fullWidth
									/>
								</Grid>

								<Grid item xs={12}>
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

								<Button
									type="submit"
									variant="contained"
									color="secondary"
									disabled={!isValid || isSubmitting}
									className={classes.submit}
									fullWidth
								>
									Submit
								</Button>

								{errors.error ? <Alert severity="error">{errors.error}</Alert> : null}
							</Grid>
						</Form>
					)}
				</Formik>
				{response.success && <CustomizedSnackbar response={response} />}
			</div>
		</Container>
	);
}

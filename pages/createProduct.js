import React, { Fragment, useState } from 'react';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import fetch from 'isomorphic-unfetch';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Alert from '@material-ui/lab/Alert';
import { FormikTextField } from '../hooks/FormikTextField';

// const useStyles = makeStyles((theme) => ({
// 	root: {
// 		width: '100%',
// 		'& > * + *': {
// 			marginTop: theme.spacing(2)
// 		}
// 	}
// }));

const initialValues = {
	name: '',
	price: '',
	description: ''
};

const validationSchema = Yup.object({
	name: Yup.string().required('Name is required !!'),
	price: Yup.number().required('Price is required !!'),
	description: Yup.string().required('Description is required !!')
});

export default function CreateProduct() {
	const router = useRouter();

	const [ image, setImage ] = useState('');

	const handleSubmit = async (values, actions) => {
		console.log(actions);
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
					<Typography component="h1" variant="h5">
						Create Product
					</Typography>

					<Form>
						<FormikTextField
							margin="normal"
							label="Product name"
							autoComplete="name"
							autoFocus
							type="text"
							formikKey="name"
							variant="outlined"
						/>
						<br />
						<FormikTextField
							margin="normal"
							label="Price"
							autoComplete="price"
							type="number"
							formikKey="price"
							variant="outlined"
						/>
						<br />
						<FormikTextField
							margin="normal"
							label="Description"
							autoComplete="description"
							type="text"
							formikKey="description"
							variant="outlined"
						/>

						<br />
						<br />
						<Button variant="contained" component="label">
							Upload Image
							<input type="file" hidden accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
						</Button>

						<br />
						<br />
						<Button type="submit" variant="contained" color="primary">
							Create
						</Button>

						<br />
						<br />

						{errors.error ? <Alert severity="error">{errors.error}</Alert> : null}

						{isSubmitting && <LinearProgress />}
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

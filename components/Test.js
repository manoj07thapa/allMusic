import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import { TextField, Button, Typography, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { parseCookies } from 'nookies';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Alert from '@material-ui/lab/Alert';
import { FormikTextField } from '../hooks/FormikTextField';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2)
		}
	}
}));

const initialValues = {
	name: '',
	price: '',
	description: '',
	image: ''
};

const validationSchema = Yup.object({
	name: Yup.string().required('Name is required !!'),
	price: Yup.string().required('Price is required !!'),
	description: Yup.string().required('Description is required !!'),
	image: Yup.string().required('Image is required !!')
});

export default function createProduct() {
	const classes = useStyles();

	// const [ name, setName ] = useState('');
	// const [ price, setPrice ] = useState('');
	// const [ description, setDescription ] = useState('');
	// const [ image, setImage ] = useState('');
	// const [ loading, setLoading ] = useState(false);
	// const [ errors, setErrors ] = useState('');
	const router = useRouter();

	const handleSubmit = async (values, actions) => {
		const cloudinaryImage = await imageUpload();
		console.log(values);

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
			alert(data.message);
		} else {
			alert(data.success);
		}
		console.log(data);
		router.push('/');
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

	return (
		<div>
			<Formik
				initialValues={initialValues}
				onSubmit={handleSubmit}
				validationSchema={validationSchema}
				validateOnBlur={false}
			>
				{({ errors, isSubmitting }) => (
					<Form>
						<Typography variant="h3">Create a Product</Typography>
						<hr />
						<br />
						<br />
						<br />
						<FormikTextField
							margin="normal"
							required
							fullWidth
							label="Product name"
							autoComplete="name"
							autoFocus
							type="text"
							formikKey="name"
							variant="outlined"
						/>
						<br />
						<br />
						<FormikTextField
							margin="normal"
							required
							fullWidth
							label="Price"
							autoComplete="price"
							autoFocus
							type="number"
							formikKey="price"
							variant="outlined"
						/>
						<br />
						<br />
						<FormikTextField
							margin="normal"
							required
							fullWidth
							label="Description"
							autoComplete="description"
							autoFocus
							type="text"
							formikKey="description"
							variant="outlined"
						/>
						<br />
						<br />
						<Button variant="contained" component="label">
							Upload Image
							<input type="file" hidden accept="image/*" name="image" />
						</Button>
						<br />
						<br />
						<Button color="primary" variant="contained" size="large">
							Create
						</Button>
					</Form>
				)}
			</Formik>
		</div>
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

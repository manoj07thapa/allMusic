import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import { TextField, Button, Typography, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2)
		}
	}
}));

export default function createProduct() {
	const classes = useStyles();

	const [ name, setName ] = useState('');
	const [ price, setPrice ] = useState(null);
	const [ description, setDescription ] = useState('');
	const [ image, setImage ] = useState('');
	const [ loading, setLoading ] = useState(false);
	const [ errors, setErrors ] = useState('');
	const router = useRouter();

	// useEffect(
	// 	() => {
	// 		if (loading) {
	// 			if (Object.keys(errors).length === 0) {
	// 				createNote();
	// 			} else {
	// 				setLoading(false);
	// 			}
	// 		}
	// 	},
	// 	[ errors ]
	// );

	const handleSubmit = async (e) => {
		e.preventDefault();
		// const errors = validate(formData);
		// setErrors(errors);
		console.log({ name, price, description, image });
		if (Object.keys(errors).length === 0) {
			setLoading(true);
			try {
				const res = await fetch('/api/products', {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ name, price, description, image })
				});
				const data = await res.json();
				if (data.success === false) {
					alert(data.message);
				}
				console.log(data);
				router.push('/');
			} catch (error) {
				setLoading(false);
				console.log(error.message, 'server error');
				setErrors(error.message);
			}
		}
	};

	// const validate = (data) => {
	// 	const errors = {};
	// 	if (!name) errors.name = 'Please enter the title';
	// 	if (!price) errors.price = 'Please enter the title';

	// 	if (!description) errors.description = 'please enter the description';
	// 	return errors;
	// };

	return (
		<div>
			{loading ? (
				<div className={classes.root}>
					<LinearProgress />
				</div>
			) : (
				<form onSubmit={handleSubmit}>
					<Typography variant="h3">Create a Product</Typography>
					<hr />
					<br />
					<br />
					<br />
					<TextField
						name="name"
						label="Name"
						variant="outlined"
						value={name}
						onChange={(e) => setName(e.target.value)}
						helperText={errors.name ? <p style={{ color: 'red', marginTop: 20 }}>{errors.name}</p> : null}
					/>
					<br />
					<br />
					<TextField
						name="price"
						label="Price"
						type="number"
						variant="outlined"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						helperText={errors.price ? <p style={{ color: 'red', marginTop: 20 }}>{errors.price}</p> : null}
					/>
					<br />
					<br />
					<TextField
						name="description"
						label="Description"
						variant="outlined"
						multiline
						rows={5}
						onChange={(e) => setDescription(e.target.value)}
						value={description}
						helperText={errors.description ? <p style={{ color: 'red' }}>{errors.description}</p> : null}
					/>
					<br />
					<br />
					<Button variant="contained" component="label">
						Upload Image
						<input type="file" hidden accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
					</Button>
					<br />
					<br />
					<Button color="primary" variant="contained" size="large" onClick={handleSubmit}>
						Create
					</Button>
				</form>
			)}
		</div>
	);
}

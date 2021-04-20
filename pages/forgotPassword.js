import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import fetch from 'isomorphic-unfetch';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Alert from '@material-ui/lab/Alert';
import { FormikTextField } from '../hooks/FormikTextField';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import { useState, Fragment } from 'react';
import Head from 'next/head';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="#">
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		width: '30%',
		position: 'fixed' /* or absolute */,
		top: '40%',
		left: '35%'
	}
}));

const initialValues = {
	email: '',
	serverMsg: ''
};

const validationSchema = Yup.object({
	email: Yup.string().required('Email is required !!').email('Invalid email format !!')
});

export default function ForgotPassword() {
	const classes = useStyles();
	const [ response, setResponse ] = useState({});

	const handleSubmit = async (values, actions) => {
		try {
			const res = await fetch('/api/user/users', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(values)
			});
			const data = await res.json();
			if (data.success === true) {
				setResponse(data);
				actions.resetForm();
			}
			if (data.success === false) {
				actions.setErrors(data);
			}
			actions.setSubmitting(false);
			// actions.resetForm();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Fragment>
			<Head>
				<title>Forgot Password</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Formik
				initialValues={initialValues}
				onSubmit={handleSubmit}
				validationSchema={validationSchema}
				validateOnBlur={false}
			>
				{({ errors, isSubmitting, isValid }) => (
					<Grid container component="main">
						<Grid item xs={12} sm={6}>
							<div className={classes.paper}>
								<Typography component="h3">Please type your email and send.</Typography>
								<Form className={classes.form}>
									<FormikTextField
										margin="normal"
										fullWidth
										label="Email Address"
										autoComplete="email"
										autoFocus
										type="email"
										formikKey="email"
										variant="outlined"
									/>

									<br />
									{errors.error ? <Alert severity="error">{errors.error}</Alert> : null}
									{response.success && <Alert severity="info">{response.message}</Alert>}
									<br />
									<Button
										type="submit"
										fullWidth
										variant="contained"
										color="secondary"
										className={classes.submit}
										disabled={!isValid || isSubmitting}
									>
										Send
									</Button>

									<Box mt={5}>
										<Copyright />
									</Box>
									<br />
									<br />
									{/* {isSubmitting && <LinearProgress />} */}
								</Form>
							</div>
						</Grid>
					</Grid>
				)}
			</Formik>
		</Fragment>
	);
}

export async function getServerSideProps(ctx) {
	const cookie = parseCookies(ctx);
	const user = cookie.user ? JSON.parse(cookie.user) : '';
	if (user) {
		return {
			notFound: true
		};
	}
	return {
		props: {}
	};
}

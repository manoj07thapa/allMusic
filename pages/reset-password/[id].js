import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import fetch from 'isomorphic-unfetch';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Alert from '@material-ui/lab/Alert';
import { FormikTextField } from '../../hooks/FormikTextField';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { Router } from '@material-ui/icons';
import { useState } from 'react';

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
		top: '35%',
		left: '35%'
	}
}));

const initialValues = {
	password: '',
	confirmpassword: ''
};

const validationSchema = Yup.object({
	password: Yup.string().required('Password is required !!').min(8, 'Password must be at least 8 characters'),
	confirmpassword: Yup.string().oneOf([ Yup.ref('password') ], "Password doesn't match")
});

export default function ResetPassword() {
	const classes = useStyles();

	const router = useRouter();

	const [ response, setResponse ] = useState({});

	const handleSubmit = async (values, actions) => {
		try {
			const res = await fetch('/api/user/resetPassword', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ values, tokenId: router.query.id })
			});
			const data = await res.json();
			if (data.success === true) {
				setResponse(data);
				actions.resetForm();
				// router.push('/login');
			}
			if (data.success === false) {
				actions.setErrors(data);
				// router.push('/forgotPassword');
			}
			actions.setSubmitting(false);
			// actions.resetForm();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={handleSubmit}
			validationSchema={validationSchema}
			validateOnBlur={false}
		>
			{({ errors, isSubmitting, isValid }) => (
				<Grid container component="main">
					<Grid item xs={12} sm={8} md={5}>
						<div className={classes.paper}>
							<Typography component="h1" variant="h5">
								Please, fill the form to reset your password.
							</Typography>
							<Form>
								<FormikTextField
									margin="normal"
									fullWidth
									label="New Password"
									autoComplete="password"
									autoFocus
									type="password"
									formikKey="password"
									variant="outlined"
								/>
								<FormikTextField
									margin="normal"
									fullWidth
									label="Confirm New Password"
									autoComplete="password"
									autoFocus
									type="password"
									formikKey="confirmpassword"
									variant="outlined"
								/>

								<br />
								{errors.error ? <Alert severity="error">{errors.error}</Alert> : null}
								{response.success && <Alert severity="success">{response.message}</Alert>}

								<br />
								<Button
									type="submit"
									fullWidth
									variant="contained"
									color="secondary"
									className={classes.submit}
									disabled={!isValid || isSubmitting}
								>
									Reset Password
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

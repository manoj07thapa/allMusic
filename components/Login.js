import React, { Fragment } from 'react';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from 'next/link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import fetch from 'isomorphic-unfetch';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Alert from '@material-ui/lab/Alert';
import { FormikTextField } from '../hooks/FormikTextField';
import { useState } from 'react';
import CustomizedSnackbar from '../components/Snackbar';

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
		margin: theme.spacing(8, 4),
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
		marginLeft: '11rem',
		[theme.breakpoints.down('md')]: {
			marginLeft: '7rem'
		}
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	signin: {
		marginLeft: '10rem',
		[theme.breakpoints.down('md')]: {
			marginLeft: '6rem'
		}
	}
}));

const initialValues = {
	email: '',
	password: ''
};

const validationSchema = Yup.object({
	email: Yup.string().required('Email is required !!').email('Invalid email format !!'),
	password: Yup.string().required('Password is required !!')
});

export default function Login() {
	const router = useRouter();
	const classes = useStyles();
	const [ response, setResponse ] = useState({});

	const handleSubmit = async (values, actions) => {
		try {
			const res = await fetch('/api/user/login', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(values)
			});
			const data = await res.json();
			setResponse(data);
			if (data.success === true) {
				cookie.set('token', data.token);
				cookie.set('user', data.user);
				router.back();
			}
			if (data.success === false) {
				actions.setErrors(data);
			}
			actions.setSubmitting(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<Formik
				initialValues={initialValues}
				onSubmit={handleSubmit}
				validationSchema={validationSchema}
				validateOnBlur={false}
			>
				{({ errors, isSubmitting, isValid }) => (
					<div className={classes.paper}>
						<Avatar className={classes.avatar}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5" className={classes.signin}>
							Sign in
						</Typography>

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
							<FormikTextField
								margin="normal"
								fullWidth
								label="Password"
								autoComplete="password"
								type="password"
								formikKey="password"
								variant="outlined"
							/>

							{errors.error ? <Alert severity="error">{errors.error}</Alert> : null}
							<br />
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="secondary"
								className={classes.submit}
								disabled={!isValid || isSubmitting}
							>
								Login
							</Button>
							<Grid container>
								<Grid item xs>
									<Link href="/forgotPassword" variant="body2">
										<a>Forgot password?</a>
									</Link>
								</Grid>
								<Grid item>
									<Link href="/signup" variant="body2">
										<a>{"Don't have an account? Sign Up"}</a>
									</Link>
								</Grid>
							</Grid>
							<Box mt={5}>
								<Copyright />
							</Box>
							<br />
							<br />
							{/* {isSubmitting && <LinearProgress />} */}
						</Form>
					</div>
				)}
			</Formik>
			{response.success && <CustomizedSnackbar response={response} />}
		</div>
	);
}

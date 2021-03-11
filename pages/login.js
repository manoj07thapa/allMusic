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
	root: {
		height: '100vh'
	},
	image: {
		backgroundImage:
			'url(https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)',
		backgroundRepeat: 'no-repeat',
		backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
		backgroundSize: 'cover',
		backgroundPosition: 'center'
	},
	paper: {
		margin: theme.spacing(8, 4),
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
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
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
			if (data.success === true) {
				alert(data.success);
				cookie.set('token', data.token);
				cookie.set('user', data.user);
				router.push('/dashboard');
			}
			if (data.success === false) {
				console.log(data.error);
				// actions.setFieldError('email', data.error);
				// actions.setFieldError('password', data.error);

				actions.setErrors(data);
			}
			actions.setSubmitting(false);
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
			{({ errors, isSubmitting }) => (
				<Grid container component="main" className={classes.root}>
					<Grid item xs={false} sm={4} md={7} className={classes.image} />
					<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
						<div className={classes.paper}>
							<Avatar className={classes.avatar}>
								<LockOutlinedIcon />
							</Avatar>
							<Typography component="h1" variant="h5">
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
									color="primary"
									className={classes.submit}
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
								{isSubmitting && <LinearProgress />}
							</Form>
						</div>
					</Grid>
				</Grid>
			)}
		</Formik>
	);
}

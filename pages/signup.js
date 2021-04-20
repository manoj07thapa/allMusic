import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Alert from '@material-ui/lab/Alert';
import { FormikTextField } from '../hooks/FormikTextField';
import { Fragment } from 'react';
import Head from 'next/head';
import { parseCookies } from 'nookies';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="#">
				All Music
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
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
	firstname: '',
	lastname: '',
	email: '',
	password: '',
	confirmpassword: ''
};

const validationSchema = Yup.object({
	firstname: Yup.string().required(),
	lastname: Yup.string(),
	email: Yup.string().required().email(),
	password: Yup.string().required().min(8, 'Password must be at least 8 characters'),
	confirmpassword: Yup.string().oneOf([ Yup.ref('password') ], "Password doesn't match").required()
});

export default function SignUp() {
	const classes = useStyles();
	const router = useRouter();

	const handleSubmit = async (values, actions) => {
		try {
			const res = await fetch('/api/user/signup', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(values)
			});
			const data = await res.json();
			console.log('SIGNUPRES', data);
			if (data.success === true) {
				router.push('/login');
			} else {
				actions.setErrors(data);
			}
			actions.setSubmitting(false);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Fragment>
			<Head>
				<title>SignUp</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Container component="main" maxWidth="xs">
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
						{({ errors, isSubmitting, isValid }) => (
							<Form className={classes.form}>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={6}>
										<FormikTextField
											autoComplete="fname"
											formikKey="firstname"
											variant="outlined"
											fullWidth
											id="firstname"
											label="First Name"
											autoFocus
											type="text"
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<FormikTextField
											variant="outlined"
											fullWidth
											id="lastname"
											label="Last Name"
											formikKey="lastname"
											autoComplete="lname"
											type="text"
										/>
									</Grid>
									<Grid item xs={12}>
										<FormikTextField
											variant="outlined"
											fullWidth
											id="email"
											label="Email Address"
											formikKey="email"
											autoComplete="email"
											type="email"
										/>
									</Grid>
									<Grid item xs={12}>
										<FormikTextField
											variant="outlined"
											fullWidth
											formikKey="password"
											label="Password"
											type="password"
											id="password"
											autoComplete="current-password"
										/>
									</Grid>
									<Grid item xs={12}>
										<FormikTextField
											variant="outlined"
											fullWidth
											formikKey="confirmpassword"
											label="Confirm Password"
											type="password"
											id="confirmpassword"
											autoComplete="current-password"
										/>
									</Grid>
									<Grid item xs={12}>
										<FormControlLabel
											control={<Checkbox value="allowExtraEmails" color="primary" />}
											label="I want to receive inspiration, marketing promotions and updates via email."
										/>
									</Grid>
								</Grid>
								<br />
								{errors.error ? <Alert severity="error">{errors.error}</Alert> : null}
								<br />
								<Button
									type="submit"
									fullWidth
									variant="contained"
									color="secondary"
									className={classes.submit}
									onClick={handleSubmit}
									disabled={!isValid || isSubmitting}
								>
									Sign Up
								</Button>
								<Grid container justify="flex-end">
									<Grid item>
										<Link href="/login" variant="body2">
											<a>Already have an account? Sign in</a>
										</Link>
									</Grid>
								</Grid>
							</Form>
						)}
					</Formik>
				</div>
				<Box mt={5}>
					<Copyright />
				</Box>
			</Container>
		</Fragment>
	);
}

export async function getServerSideProps(ctx) {
	const { token } = parseCookies(ctx);

	if (token) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		};
	}

	return {
		props: {}
	};
}

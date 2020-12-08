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
import { FormikTextField } from '../hooks/FormikTextField';
import Link from 'next/link';
import { parseCookies } from 'nookies';

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
		marginTop: '5rem'
	},

	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
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
	serverMsg: ''
};

const validationSchema = Yup.object({
	email: Yup.string().required('Email is required !!').email('Invalid email format !!')
});

export default function ForgotPassword() {
	const classes = useStyles();

	const handleSubmit = async (values, actions) => {
		console.log(actions);
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
			console.log(data);
			if (data.success === true) {
				alert(data.message);
				actions.resetForm();
			}
			if (data.success === false) {
				actions.setErrors(data);
			}
			actions.setSubmitting(false);
			// actions.resetForm();
		} catch (error) {}
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
					<Grid item xs={12} sm={8} md={5} component={Paper}>
						<div className={classes.paper}>
							<Typography component="h1" variant="h5">
								Please,type your email and send.
							</Typography>
							{console.log(errors)}
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
								{/* {values.serverMsg && <Alert severity="info">{values.serverMsg}</Alert>} */}
								<br />
								<Button
									type="submit"
									fullWidth
									variant="contained"
									color="primary"
									className={classes.submit}
								>
									Send
								</Button>

								<Box mt={5}>
									<Copyright />
								</Box>
								<br />
								<br />
								{isSubmitting && <LinearProgress />}
							</Form>
						</div>
						<Link href="/resetPassword">
							<a>Reset Password</a>
						</Link>
					</Grid>
				</Grid>
			)}
		</Formik>
	);
}

export async function getServerSideProps(ctx) {
	const cookie = parseCookies(ctx);
	const user = cookie.user ? JSON.parse(cookie.user) : '';
	console.log(user);
	if (user) {
		return {
			notFound: true
		};
	}
	return {
		props: {}
	};
}

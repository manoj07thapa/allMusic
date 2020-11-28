import { useState, Fragment } from 'react';
import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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

export default function SignUp() {
	const classes = useStyles();
	const router = useRouter();
	const [ loading, setLoading ] = useState(false);
	const [ formData, setFormData ] = useState({ firstname: '', lastname: '', email: '', password: '' });

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await fetch('/api/user/signup', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});
			const data = await res.json();
			if (data.success === false) {
				alert(data.message);
			} else {
				alert(data.success);
				router.push('/login');
			}
			console.log(data);
		} catch (err) {
			alert(err.error, err.success);
			setLoading(false);
		}
	};

	return (
		<Fragment>
			{loading ? (
				<div className={classes.root}>
					<LinearProgress />
				</div>
			) : (
				<Container component="main" maxWidth="xs">
					<div className={classes.paper}>
						<Avatar className={classes.avatar}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Sign up
						</Typography>
						<form className={classes.form} noValidate onSubmit={handleSubmit}>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<TextField
										autoComplete="fname"
										name="firstname"
										variant="outlined"
										required
										fullWidth
										id="firstname"
										label="First Name"
										autoFocus
										value={formData.firstname}
										onChange={handleChange}
										type="text"
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="lastname"
										label="Last Name"
										name="lastname"
										autoComplete="lname"
										value={formData.lastname}
										onChange={handleChange}
										type="text"
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="email"
										label="Email Address"
										name="email"
										autoComplete="email"
										value={formData.email}
										onChange={handleChange}
										type="email"
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										name="password"
										label="Password"
										type="password"
										id="password"
										autoComplete="current-password"
										value={formData.password}
										onChange={handleChange}
									/>
								</Grid>
								<Grid item xs={12}>
									<FormControlLabel
										control={<Checkbox value="allowExtraEmails" color="primary" />}
										label="I want to receive inspiration, marketing promotions and updates via email."
									/>
								</Grid>
							</Grid>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
								onClick={handleSubmit}
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
						</form>
					</div>
					<Box mt={5}>
						<Copyright />
					</Box>
				</Container>
			)}
		</Fragment>
	);
}

import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Alert from '@material-ui/lab/Alert';
import { FormikTextField } from '../hooks/FormikTextField';
import { parseCookies } from 'nookies';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: '2rem',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: theme.palette.background.paper
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
	zone: '',
	district: '',
	phNumber: '',
	city: '',
	area: '',
	address: ''
};

const validationSchema = Yup.object({
	zone: Yup.string().required().max(10, 'Zone must be at most 10 characters'),
	district: Yup.string().required().max(10, 'District must be at most 10 characters'),
	phNumber: Yup.number().required().min(10, 'Phone number must be at most 10 characters'),
	city: Yup.string(),
	area: Yup.string().required(),
	address: Yup.string().required()
});

export default function ShippingInfoForm({ handleClose, mutate, shipInfo }) {
	const classes = useStyles();
	const router = useRouter();
	const { token } = parseCookies();

	const handleSubmit = async (values, actions) => {
		try {
			const res = await fetch('/api/user/shipInfo', {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: token
				},
				body: JSON.stringify(values)
			});
			const data = await res.json();
			const info = data.shipInfo;
			mutate();
			if (data.success === true) {
				handleClose();
				router.push('/checkout');
			} else {
				actions.setErrors(data);
			}
			actions.setSubmitting(false);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LocalShippingIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Product shipment form
				</Typography>
				<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
					{({ errors, isSubmitting, isValid, values }) => (
						<Form className={classes.form}>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<FormikTextField
										autoComplete="zone"
										formikKey="zone"
										variant="outlined"
										fullWidth
										id="zone"
										label="Zone"
										autoFocus
										type="text"
										placeholder="egg: Bagmati, Gandaki, Koshi"
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<FormikTextField
										variant="outlined"
										fullWidth
										id="district"
										label="District"
										formikKey="district"
										autoComplete="district"
										type="text"
										placeholder="egg: Kathmandu, Kavre"
									/>
								</Grid>
								<Grid item xs={12}>
									<FormikTextField
										variant="outlined"
										fullWidth
										id="phNumber"
										label="Phone Number"
										formikKey="phNumber"
										autoComplete="phNumber"
										type="number"
									/>
								</Grid>
								<Grid item xs={12}>
									<FormikTextField
										variant="outlined"
										fullWidth
										id="city"
										label="City"
										formikKey="city"
										autoComplete="city"
										type="text"
									/>
								</Grid>
								<Grid item xs={12}>
									<FormikTextField
										variant="outlined"
										fullWidth
										formikKey="area"
										label="Area"
										type="text"
										id="area"
										autoComplete="area"
									/>
								</Grid>
								<Grid item xs={12}>
									<FormikTextField
										variant="outlined"
										fullWidth
										formikKey="address"
										label="Address"
										type="text"
										id="address"
										autoComplete="address"
										placeholder="For example: House #123, Street #123, ABC road "
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
								Submit
							</Button>
						</Form>
					)}
				</Formik>
			</div>
		</Container>
	);
}

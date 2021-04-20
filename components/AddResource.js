import {
	Button,
	Typography,
	LinearProgress,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Grid,
	makeStyles,
	Container,
	Avatar
} from '@material-ui/core';
import fetch from 'isomorphic-unfetch';
import { Formik, Form, Field } from 'formik';
import { array, object, string } from 'yup';
import Alert from '@material-ui/lab/Alert';
import { FormikTextField } from '../hooks/FormikTextField';
import { MultipleFileUploadField } from './uploads/MultipleFileUploadField';
import BackupIcon from '@material-ui/icons/Backup';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(1),
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
	category: '',
	title: '',
	subtitle: '',
	subtitle1: '',
	subtitle2: '',
	subtitle3: '',
	files: [],
	description: ''
};

const validationSchema = object({
	category: string().required(),
	title: string().required(),
	subtitle: string().required(),
	subtitle1: string().required(),
	subtitle2: string().required(),
	subtitle3: string().required(),
	files: array(
		object({
			url: string().required()
		})
	),
	description: string().required()
});

const categories = [ 'carousel', 'carousel1', 'carouse2', 'carousel3' ];

export default function AddResource() {
	const classes = useStyles();

	const handleSubmit = async (values, actions) => {
		// const cloudinaryImage = await imageUpload();
		try {
			const res = await fetch('/api/resource', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ values })
			});
			const data = await res.json();
			if (data.success === false) {
				actions.setErrors(data);
			} else {
				alert(data.message);
				actions.resetForm();
			}
			// router.push('/');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<BackupIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Add Resource
				</Typography>
				<Formik
					initialValues={initialValues}
					onSubmit={handleSubmit}
					validationSchema={validationSchema}
					validateOnBlur={false}
				>
					{({ errors, isSubmitting, isValid }) => (
						<Form className={classes.form}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<FormControl variant="outlined" fullWidth>
										<InputLabel id="category">Category</InputLabel>
										<Field name="category" as={Select} id="category" label="Category">
											{categories.map((category, i) => (
												<MenuItem value={category} key={i}>
													<em>{category}</em>
												</MenuItem>
											))}
										</Field>
									</FormControl>
								</Grid>

								<Grid item xs={12} sm={6}>
									<FormikTextField
										margin="normal"
										label="Title"
										autoComplete="title"
										type="text"
										formikKey="title"
										variant="outlined"
										fullWidth
									/>
								</Grid>

								<Grid item xs={12} sm={6}>
									<FormikTextField
										margin="normal"
										label="Subtitle"
										autoComplete="subtitle"
										type="text"
										formikKey="subtitle"
										variant="outlined"
										fullWidth
									/>
								</Grid>
								<Grid item xs={12}>
									<FormikTextField
										margin="normal"
										label="Subtitle1"
										autoComplete="subtitle1"
										type="text"
										formikKey="subtitle1"
										variant="outlined"
										fullWidth
									/>
								</Grid>
								<Grid item xs={12}>
									<FormikTextField
										margin="normal"
										label="Subtitle2"
										autoComplete="subtitle2"
										type="text"
										formikKey="subtitle2"
										variant="outlined"
										fullWidth
									/>
								</Grid>
								<Grid item xs={12}>
									<FormikTextField
										margin="normal"
										label="Subtitle3"
										autoComplete="subtitle3"
										type="text"
										formikKey="subtitle3"
										variant="outlined"
										fullWidth
									/>
								</Grid>

								<Grid item xs={12}>
									<FormikTextField
										margin="normal"
										label="Description"
										autoComplete="description"
										type="text"
										formikKey="description"
										variant="outlined"
										multiline
										rows={4}
										fullWidth
									/>
								</Grid>
								<Grid item xs={12}>
									<MultipleFileUploadField name="files" />
								</Grid>

								<Button
									type="submit"
									variant="contained"
									color="secondary"
									disabled={!isValid || isSubmitting}
									fullWidth
								>
									Create Resource
								</Button>

								{errors.error ? <Alert severity="error">{errors.error}</Alert> : null}
							</Grid>
						</Form>
					)}
				</Formik>
			</div>
		</Container>
	);
}

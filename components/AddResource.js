import {
	Button,
	Typography,
	LinearProgress,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Grid,
	Paper,
	makeStyles
} from '@material-ui/core';
import fetch from 'isomorphic-unfetch';
import { Formik, Form, Field } from 'formik';
import { array, object, string, number } from 'yup';
import Alert from '@material-ui/lab/Alert';
import { FormikTextField } from '../hooks/FormikTextField';
import { MultipleFileUploadField } from './uploads/MultipleFileUploadField';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	},
	paper: {
		margin: 'auto',
		padding: theme.spacing(3)
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
		<Formik
			initialValues={initialValues}
			onSubmit={handleSubmit}
			validationSchema={validationSchema}
			validateOnBlur={false}
		>
			{({ errors, isSubmitting, isValid }) => (
				<div>
					<Form>
						<Paper className={classes.paper}>
							<Typography component="h1" variant="h5">
								Create Utility
							</Typography>
							<Grid container>
								<Grid item xs={12} sm={4}>
									<FormControl variant="outlined" className={classes.formControl}>
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

								<Grid item xs={12} sm={4}>
									<FormikTextField
										margin="normal"
										label="Title"
										autoComplete="title"
										type="text"
										formikKey="title"
										variant="outlined"
									/>
								</Grid>

								<Grid item xs={12} sm={4}>
									<FormikTextField
										margin="normal"
										label="Subtitle"
										autoComplete="subtitle"
										type="text"
										formikKey="subtitle"
										variant="outlined"
									/>
								</Grid>
								<Grid item xs={12} sm={4}>
									<FormikTextField
										margin="normal"
										label="Subtitle1"
										autoComplete="subtitle1"
										type="text"
										formikKey="subtitle1"
										variant="outlined"
									/>
								</Grid>
								<Grid item xs={12} sm={4}>
									<FormikTextField
										margin="normal"
										label="Subtitle2"
										autoComplete="subtitle2"
										type="text"
										formikKey="subtitle2"
										variant="outlined"
									/>
								</Grid>
								<Grid item xs={12} sm={4}>
									<FormikTextField
										margin="normal"
										label="Subtitle3"
										autoComplete="subtitle3"
										type="text"
										formikKey="subtitle3"
										variant="outlined"
									/>
								</Grid>
								<Grid item xs={12} sm={3}>
									<MultipleFileUploadField name="files" />
								</Grid>
								<Grid item xs={12} sm={4}>
									<FormikTextField
										margin="normal"
										label="Description"
										autoComplete="description"
										type="text"
										formikKey="description"
										variant="outlined"
										multiline
										rows={4}
									/>
								</Grid>

								<Grid item xs={12} sm={4}>
									<Button
										type="submit"
										variant="contained"
										color="primary"
										disabled={!isValid || isSubmitting}
									>
										Create
									</Button>
								</Grid>

								{errors.error ? <Alert severity="error">{errors.error}</Alert> : null}

								{isSubmitting && <LinearProgress />}
							</Grid>
						</Paper>
					</Form>
				</div>
			)}
		</Formik>
	);
}

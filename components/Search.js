import { Grid, Paper, InputBase, makeStyles, fade, TextField } from '@material-ui/core';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Formik, Form, Field } from 'formik';
import { FormikTextField } from '../hooks/FormikTextField';
import { useRouter } from 'next/router';
import { getAsString } from '../utils/getAsString';
import { stringify } from 'querystring';
import AccessibleIcon from '@material-ui/icons/Accessible';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25)
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto'
		}
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	inputRoot: {
		color: 'inherit'
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch'
		}
	}
}));

export default function Search() {
	const { query } = useRouter();
	console.log(query);
	const router = useRouter();
	const classes = useStyles();
	const initialValues = {
		search: ''
	};

	const handleSubmit = async (values) => {
		console.log('form values', values);
		router.push(
			{
				pathname: '/products',
				query: { ...values, page: 1 }
			},
			undefined,
			{ shallow: true }
		);
		// try {
		// 	const res = await fetch('/api/searchProducts', {
		// 		method: 'POST',
		// 		headers: {
		// 			Accept: 'application/json',
		// 			'Content-Type': 'application/json'
		// 		},
		// 		body: JSON.stringify({ query: values.search })
		// 	});
		// 	const data = await res.json();
		// 	console.log(data);
		// } catch (error) {
		// 	console.log(error);
		// }
	};

	return (
		<div className={classes.search}>
			<div className={classes.searchIcon}>
				<SearchIcon />
			</div>

			<Formik initialValues={initialValues} onSubmit={handleSubmit}>
				{({ values }) => (
					<Form>
						<Field
							as={InputBase}
							type="text"
							name="search"
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput
							}}
							inputProps={{ 'aria-label': 'search' }}
						/>
					</Form>
				)}
			</Formik>
		</div>
	);
}

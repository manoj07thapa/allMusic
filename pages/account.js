import { useState, useEffect, Fragment } from 'react';
import { parseCookies } from 'nookies';
import Link from 'next/link';
import { Button, makeStyles, Paper, Grid, Container } from '@material-ui/core';
import fetch from 'isomorphic-unfetch';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary
	}
}));

export default function account() {
	const classes = useStyles();

	const { token } = parseCookies();
	const cookie = parseCookies();

	useEffect(() => {
		getCheckedItems();
	}, []);

	const getCheckedItems = async () => {
		try {
			const res = await axios.put('/api/resource');
			console.log('CheckedCartRes', res);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<Container>
				<h1> Account page</h1>
			</Container>
		</div>
	);
}

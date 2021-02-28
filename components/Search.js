import { Grid, Paper } from '@material-ui/core';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';

export default function Search() {
	useEffect(() => {
		getMakes();
	}, []);

	const getMakes = async () => {
		const res = await fetch('/api/products', {
			method: 'GET'
		});

		console.log(res);
	};

	return (
		<div>
			<Grid container spacing={5} justify="center" alignContent="center">
				<Grid item lg={6}>
					<Paper>xs=6</Paper>
				</Grid>
			</Grid>
		</div>
	);
}

import React from 'react';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Typography, IconButton, makeStyles, Button } from '@material-ui/core';
import router from 'next/router';

const useStyles = makeStyles((theme) => ({
	center: {
		marginTop: '15rem',
		marginLeft: '37rem',

		[theme.breakpoints.down('xs')]: {}
	}
}));

export default function PaymentSuccess() {
	const classes = useStyles();

	return (
		<div className={classes.center}>
			<IconButton style={{ marginLeft: '8rem', color: 'green' }}>
				<CheckCircleIcon fontSize="large" />
			</IconButton>
			<Typography variant="h5">Your Payment was successful</Typography>

			<Button onClick={() => router.push('/products')} style={{ marginLeft: '5rem' }}>
				continue shopping
			</Button>
		</div>
	);
}

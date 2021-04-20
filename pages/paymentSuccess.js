import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Typography, IconButton, makeStyles, Button } from '@material-ui/core';
import router from 'next/router';
import Head from 'next/head';
import { Fragment } from 'react';

const useStyles = makeStyles((theme) => ({
	paper: {
		width: '30%',
		position: 'fixed' /* or absolute */,
		top: '40%',
		left: '40%'
	}
}));

export default function PaymentSuccess() {
	const classes = useStyles();

	return (
		<Fragment>
			<Head>
				<title>Payment Success</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className={classes.paper}>
				<IconButton style={{ color: 'green' }}>
					<CheckCircleIcon fontSize="large" />
				</IconButton>
				<Button onClick={() => router.push('/products')}>continue shopping</Button>

				<Typography variant="h5">Your Payment was successful</Typography>
			</div>
		</Fragment>
	);
}

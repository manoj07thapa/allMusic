import { Typography, IconButton, makeStyles, Button } from '@material-ui/core';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import router from 'next/router';
import { Fragment } from 'react';
import Head from 'next/head';

const useStyles = makeStyles((theme) => ({
	paper: {
		width: '30%',
		position: 'fixed' /* or absolute */,
		top: '40%',
		left: '40%'
	}
}));

export default function paymentFailed() {
	const classes = useStyles();

	return (
		<Fragment>
			<Head>
				<title>Payment Failed</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className={classes.paper}>
				<IconButton color="secondary">
					<ReportProblemIcon fontSize="large" />
				</IconButton>
				<Button onClick={() => router.back()}>try again</Button>
				<Typography variant="h5">Sorry your payment failed</Typography>
			</div>
		</Fragment>
	);
}

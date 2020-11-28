import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary">
			{'Copyright © '}
			<Link color="inherit">allmusic.com</Link> {new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100vh'
	},
	main: {
		marginTop: theme.spacing(8),
		marginBottom: theme.spacing(2)
	},
	footer: {
		textAlign: 'center',
		padding: theme.spacing(3, 2),
		marginTop: 'auto',
		backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]
	}
}));

export default function Footer() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<footer className={classes.footer}>
				<Typography variant="body1">All Music.</Typography>
				<Copyright />
			</footer>
		</div>
	);
}

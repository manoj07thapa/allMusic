import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button } from '@material-ui/core';
import Login from './Login';

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: '40%',
		height: '70%',
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		marginTop: '10em',
		marginLeft: '35em',
		[theme.breakpoints.down('sm')]: {
			marginTop: '1em',
			marginLeft: '13em',
			width: '50%',
			height: '100%'
		},
		[theme.breakpoints.down('xs')]: {
			marginTop: '8em',
			marginLeft: '1em',
			width: '90%',
			height: '70%'
		}
	}
}));

export default function LoginModal() {
	const classes = useStyles();

	const [ open, setOpen ] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const body = (
		<div className={classes.paper}>
			<Login />
		</div>
	);

	return (
		<Fragment>
			<Button type="button" onClick={handleOpen} color="secondary" variant="contained">
				Add to cart
			</Button>

			<Modal open={open} onClose={handleClose} aria-labelledby="login-modal" aria-describedby="login-modal">
				{body}
			</Modal>
		</Fragment>
	);
}

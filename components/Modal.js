import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: '27%',
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		marginTop: '21em',
		marginLeft: '43em',
		[theme.breakpoints.down('sm')]: {
			marginTop: '8em',
			marginLeft: '20em'
		},
		[theme.breakpoints.down('xs')]: {
			width: '60%',
			marginTop: '19em',
			marginLeft: '6em'
		}
	}
}));

export default function SimpleModal({ handleDelete }) {
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
			<h2 id="simple-modal-title">Are you sure you want to delete ?</h2>
			<Button onClick={handleDelete}>Yes</Button>
			<Button onClick={handleClose}>No</Button>
		</div>
	);

	return (
		<Fragment>
			<IconButton type="button" onClick={handleOpen} variant="contained">
				<DeleteIcon />
			</IconButton>

			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				{body}
			</Modal>
		</Fragment>
	);
}

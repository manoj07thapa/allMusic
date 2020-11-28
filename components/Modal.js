import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button } from '@material-ui/core';
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
		marginLeft: '43em'
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
			<h2 id="simple-modal-title">Are you sure, you want to delete ?</h2>
			<Button onClick={handleDelete}>Yes</Button>
			<Button onClick={handleClose}>No</Button>
		</div>
	);

	return (
		<div>
			<Button type="button" onClick={handleOpen} color="secondary" variant="contained">
				<DeleteIcon />
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				{body}
			</Modal>
		</div>
	);
}

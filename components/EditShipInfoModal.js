import { Fragment, useState, useEffect } from 'react';
import { makeStyles, Modal, Button, Container, IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import ShippingInfoForm from './ShippingInfoForm';

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: '50%',
		height: '90%',
		backgroundColor: '#e9ecef',
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		marginTop: '3em',
		marginLeft: '27em',
		[theme.breakpoints.down('sm')]: {
			marginTop: '5em',
			marginLeft: '8em',
			width: '70%',
			height: '70%'
		},
		[theme.breakpoints.down('xs')]: {
			marginTop: '10em',
			marginLeft: '3em',
			width: '80%',
			height: '50%'
		}
	}
}));

export default function CartModal({ recentlyAddedItem, addToCart }) {
	const classes = useStyles();

	const [ open, setOpen ] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const body = (
		<div className={classes.paper}>
			<IconButton onClick={handleClose} style={{ marginLeft: '45rem' }}>
				<ClearIcon />
			</IconButton>
			<Container>
				<ShippingInfoForm handleClose={handleClose} />
			</Container>
		</div>
	);
	return (
		<Fragment>
			<Button
				type="button"
				onClick={() => {
					handleOpen();
				}}
			>
				Change
			</Button>

			<Modal open={open} onClose={handleClose} aria-labelledby="shipInfo-modal" aria-describedby="shipInfo-modal">
				{body}
			</Modal>
		</Fragment>
	);
}

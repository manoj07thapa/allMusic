import { Fragment, useState } from 'react';
import { makeStyles, Typography, Modal, Button, Grid, Container, IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import router from 'next/router';
import EsewaPayment from './EsewaPayment';
import KhaltiPayment from './KhaltiPayment';

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: '50%',
		height: '60%',
		backgroundColor: '#e9ecef',
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		marginTop: '10em',
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
	},
	display: {
		[theme.breakpoints.down('md')]: {
			display: 'none'
		}
	}
}));

export default function PaymentOptionsModal({ product, total }) {
	console.log('propProduct', product);
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
			<div style={{ marginTop: '2rem' }}>
				<Container>
					<Grid container spacing={3}>
						<Grid item xs={11}>
							<Typography variant="h6">Please choose your payment option.</Typography>
						</Grid>
						<Grid item xs={1}>
							<IconButton onClick={handleClose}>
								<ClearIcon />
							</IconButton>
						</Grid>
						<Grid item xs={4}>
							<KhaltiPayment handleClose={handleClose} />
						</Grid>
						<Grid item xs={4}>
							<EsewaPayment />
						</Grid>
						<Grid item xs={4}>
							<Button color="secondary" variant="contained">
								Cash On delivary
							</Button>
						</Grid>
					</Grid>
				</Container>
			</div>
		</div>
	);
	return (
		<Fragment>
			<Button
				type="button"
				onClick={() => {
					handleOpen();
				}}
				style={{ backgroundColor: '#058c42', color: 'white' }}
				variant="contained"
				fullWidth
			>
				Proceed To Payment
			</Button>

			<Modal open={open} onClose={handleClose} aria-labelledby="login-modal" aria-describedby="login-modal">
				{body}
			</Modal>
		</Fragment>
	);
}

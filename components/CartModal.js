import { Fragment, useState, useEffect } from 'react';
import {
	makeStyles,
	Typography,
	Modal,
	Button,
	Grid,
	Container,
	Paper,
	CircularProgress,
	Divider,
	IconButton
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ClearIcon from '@material-ui/icons/Clear';
import router from 'next/router';
import StripePayment from '../components/StripePayment';
import Image from 'next/image';
import PaymentOptionsModal from './paymentOptions/PaymentOptionsModal';

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

export default function CartModal({ recentlyAddedItem, addToCart }) {
	const classes = useStyles();
	if (recentlyAddedItem) {
		console.log('recentCartItems', recentlyAddedItem);
		// console.log('Image', recentlyAddedItem.files[0].url);
	}

	const [ open, setOpen ] = useState(false);
	// useEffect(
	// 	() => {
	// 		addToCart();
	// 	},
	// 	[ recentlyAddedItem ]
	// );

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
					<Grid container spacing={9}>
						<Grid item xs={11}>
							<Typography variant="h6">1 item has been added to your cart.</Typography>
						</Grid>
						<Grid xs={1}>
							<IconButton onClick={handleClose}>
								<ClearIcon />
							</IconButton>
						</Grid>
						<Grid container item xs={8} spacing={3} className={classes.display}>
							<Grid item xs={6}>
								<Image
									src={recentlyAddedItem.files[0].url}
									objectFit="cover"
									layout="responsive"
									objectPosition="center center"
									height={50}
									width={70}
								/>
							</Grid>
							<Grid item xs={6}>
								<Typography variant="h6">{recentlyAddedItem.make}</Typography>
								<Typography variant="subtitle1">{recentlyAddedItem.model}</Typography>
								<Typography variant="subtitle1" color="secondary">
									Rs. {recentlyAddedItem.price}
								</Typography>
							</Grid>
						</Grid>
						<Grid container item xs={4} className={classes.display}>
							<Grid item xs={12}>
								<Typography variant="h6">My shopping cart</Typography>
							</Grid>
							<Grid item xs={5}>
								<Typography variant="caption">Sub-total</Typography>
							</Grid>
							<Grid item xs={3}>
								<ArrowRightIcon />
							</Grid>
							<Grid item xs={4}>
								Rs. {recentlyAddedItem.price}
							</Grid>
							<Grid item xs={5}>
								<Typography variant="caption">Shipping</Typography>
							</Grid>
							<Grid item xs={3}>
								<ArrowRightIcon />
							</Grid>
							<Grid item xs={4}>
								Rs. 100
							</Grid>
							<Grid item xs={5}>
								<Typography variant="subtitle1">Total</Typography>
							</Grid>
							<Grid item xs={3} />
							<Grid item xs={4}>
								<Typography variant="subtitle1" color="secondary">
									Rs.{recentlyAddedItem.price + 100}
								</Typography>
							</Grid>
						</Grid>
						<Grid item xs={3} />
						<Grid item xs={6}>
							<Button
								color="secondary"
								onClick={() => router.push('/cart')}
								variant="contained"
								fullWidth
							>
								Go to cart
							</Button>
						</Grid>
						{/* <Grid item xs={4}>
							<Button
								type="button"
								onClick={() => {
									shipInfo.zone ? router.push('/payment-options') : router.push('/shippingInfo');
								}}
								style={{ backgroundColor: '#058c42', color: 'white' }}
								variant="contained"
								fullWidth
							>
								By it now
							</Button>
						</Grid> */}
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
					addToCart();
				}}
				color="secondary"
				variant="contained"
			>
				Add to cart
			</Button>

			<Modal open={open} onClose={handleClose} aria-labelledby="login-modal" aria-describedby="login-modal">
				{body}
			</Modal>
		</Fragment>
	);
}

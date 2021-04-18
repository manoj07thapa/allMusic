import KhaltiPayment from '../components/paymentOptions/KhaltiPayment';
import EsewaPayment from '../components/paymentOptions/EsewaPayment';
import { Grid, Container, makeStyles, Paper, Typography, Button, ButtonBase } from '@material-ui/core';
import Head from 'next/head';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getCart } from '../hooks/getCart';
import { getShipInfo } from '../hooks/getShipInfo';
import { parseCookies } from 'nookies';
import CheckoutInfo from '../components/paymentOptions/CheckoutInfo';
import router from 'next/router';
import ShipInfo from '../models/ShipInfo';
import dbConnect from '../utils/dbConnect';
import jwt from 'jsonwebtoken';

const useStyles = makeStyles((theme) => ({
	center: {
		marginTop: '20rem',
		marginLeft: '50rem'
	},
	paper: {
		backgroundColor: theme.palette.primary.contrastText,
		padding: '2rem'
	},
	delivery: {
		marginLeft: '18rem',
		[theme.breakpoints.down('sm')]: {
			marginLeft: '10rem'
		}
	}
}));

export default function Checkout() {
	const classes = useStyles();
	const cookie = parseCookies();
	const user = cookie.user ? JSON.parse(cookie.user) : '';

	const { cart, isLoading, isError, mutate } = getCart();
	console.log('swrCart', cart);
	const { shipInfo } = getShipInfo();

	console.log('SHIPINFOCHECKOUT', shipInfo);

	if (isError)
		return (
			<Typography variant="h6" className={classes.center}>
				Something went wrong
			</Typography>
		);

	if (isLoading)
		return (
			<div className={classes.center}>
				<CircularProgress />
			</div>
		);

	var checkedCart = cart.cartProducts.filter(function(x) {
		return x.isChecked % 2 === 0;
	});
	console.log('CHECKEDCART', checkedCart);
	let subTotal = 0;
	checkedCart.map((p) => {
		subTotal += p.product.price * p.quantity;
	});
	return (
		<Container>
			<Head>
				<title>Checkout</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Grid container style={{ marginTop: '6rem' }} spacing={4}>
				<Grid container item xs={12} sm={7} spacing={3}>
					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<Typography variant="h6">Email Address</Typography>
							<Typography variant="subtitle1" style={{ marginTop: '1rem' }}>
								{user.email}
							</Typography>
						</Paper>
					</Grid>

					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<div style={{ display: 'flex' }}>
								<Typography variant="h6">Delivery Address</Typography>
								<Button className={classes.delivery}>Change</Button>
							</div>
							<div style={{ marginTop: '1rem' }}>
								<Typography variant="subtitle1">
									{user.firstname} {user.lastname}
								</Typography>
								<Typography variant="subtitle1">{shipInfo.shipInfo.zone}</Typography>
								<Typography variant="subtitle1">{shipInfo.shipInfo.district}</Typography>
								<Typography variant="subtitle1">{shipInfo.shipInfo.city}</Typography>
								<Typography variant="subtitle1">{shipInfo.shipInfo.area}</Typography>
								<Typography variant="subtitle1">{shipInfo.shipInfo.address}</Typography>
								<Typography variant="subtitle1">{shipInfo.shipInfo.phone}</Typography>
							</div>
						</Paper>
					</Grid>
					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<div style={{ display: 'flex' }}>
								<Typography variant="h6">Payment Options</Typography>
								<Typography variant="h6" className={classes.delivery}>
									Pay Rs. {subTotal}
								</Typography>
							</div>

							<div style={{ display: 'flex', marginTop: '1rem' }}>
								<KhaltiPayment />
								<div style={{ marginRight: '1rem', marginLeft: '1rem' }}>
									<EsewaPayment />
								</div>

								<Button color="secondary" variant="contained">
									Cash on delivery
								</Button>
							</div>
						</Paper>
					</Grid>
				</Grid>
				<CheckoutInfo checkedCart={checkedCart} />
			</Grid>
		</Container>
	);
}

export async function getServerSideProps(ctx) {
	await dbConnect();

	const { token } = parseCookies(ctx);

	if (!token) {
		return {
			notFound: true
		};
	}

	const { userId } = jwt.verify(token, process.env.JWT_SECRET);

	const ship = await ShipInfo.findOne({ user: userId });
	const shipInfo = ship.shipInfo.zone;

	if (!shipInfo) {
		return {
			redirect: {
				destination: '/shippingInfo',
				permanent: false
			}
		};
	}

	return {
		props: {}
	};
}

import KhaltiPayment from '../components/paymentOptions/KhaltiPayment';
import EsewaPayment from '../components/paymentOptions/EsewaPayment';
import { Grid, Container, makeStyles, Paper, Typography, Button, ButtonBase } from '@material-ui/core';
import Head from 'next/head';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getCart } from '../hooks/getCart';
import { getShipInfo } from '../hooks/getShipInfo';
import CartTotal from '../components/CartTotal';
import { parseCookies } from 'nookies';
import CheckoutInfo from '../components/paymentOptions/CheckoutInfo';

const useStyles = makeStyles((theme) => ({
	center: {
		marginTop: '20rem',
		marginLeft: '50rem'
	}
}));

export default function Checkout() {
	const classes = useStyles();

	const { cart, isLoading, isError, mutate } = getCart();
	console.log('swrCart', cart);

	const { shipInfo } = getShipInfo();

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
	return (
		<Container>
			<Head>
				<title>Checkout</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Grid container style={{ marginTop: '7rem' }} spacing={4}>
				<Grid container item xs={12} sm={7} spacing={2}>
					<Grid item xs={12}>
						<Paper>DELIVERY COUNTRY</Paper>
					</Grid>
					<Grid item xs={12}>
						<Paper>EMAIL ADDRESS</Paper>
					</Grid>
				</Grid>
				<CheckoutInfo checkedCart={checkedCart} />
			</Grid>
		</Container>
	);
}

export async function getServerSideProps(ctx) {
	const { token } = parseCookies(ctx);

	if (!token) {
		return {
			notFound: true
		};
	}

	return {
		props: {}
	};
}

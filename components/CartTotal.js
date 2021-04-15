import { Grid, Container, Drawer, Toolbar, makeStyles, Typography, Button } from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import router from 'next/router';
import { useEffect, useState } from 'react';
import KhaltiPayment from './paymentOptions/KhaltiPayment';
import PaymentOptionsModal from './paymentOptions/PaymentOptionsModal';

const useStyles = makeStyles((theme) => ({
	drawerPaper: {
		width: 350,
		height: 400,
		marginLeft: '59rem',
		marginTop: '8.5rem',
		border: '1px solid #dee2e6',
		backgroundColor: theme.palette.primary.contrastText
	}
}));
export default function CartTotal({ checked }) {
	const [ subTotal, setSubTotal ] = useState(0);

	useEffect(
		() => {
			calcTotal(checked);
		},
		[ checked ]
	);

	const calcTotal = (checked) => {
		let subTotal = 0;
		checked.map((p) => {
			subTotal += p.product.price * p.quantity;
		});
		setSubTotal(subTotal);
	};

	const classes = useStyles();
	return (
		<Drawer
			variant="permanent"
			classes={{
				paper: classes.drawerPaper
			}}
		>
			<Toolbar />
			<Container>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant="h6">My Shopping Cart</Typography>
					</Grid>
					<Grid item xs={5}>
						<Typography variant="caption">Sub-total</Typography>
					</Grid>
					<Grid item xs={3}>
						<ArrowRightIcon />
					</Grid>
					<Grid item xs={4}>
						{subTotal}
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
							{subTotal + 100}
						</Typography>
					</Grid>
					<Button
						type="button"
						onClick={() => {
							router.push('/shippingInfo');
						}}
						style={{ backgroundColor: '#058c42', color: 'white', marginTop: '2rem' }}
						variant="contained"
						fullWidth
					>
						Proceed To Payment
					</Button>

					{/* <Grid item xs={12}>
						<PaymentOptionsModal products={checked} totalAmt={subTotal} />
					</Grid> */}
					{/* <Grid item xs={12}>
						<KhaltiPayment products={checked} totalAmt={subTotal} />
					</Grid> */}
				</Grid>
			</Container>
		</Drawer>
	);
}

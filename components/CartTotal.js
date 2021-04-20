import { Grid, Container, Drawer, Divider, makeStyles, Typography, Button } from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { getShipInfo } from '../hooks/getShipInfo';

const useStyles = makeStyles((theme) => ({
	drawerPaper: {
		width: 350,
		height: 400,
		marginLeft: '59rem',
		marginTop: '8.5rem',
		// border: '1px solid #dee2e6',
		// backgroundColor: theme.palette.primary.contrastText,
		padding: '1rem'
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

	const { shipInfo } = getShipInfo();

	const classes = useStyles();
	return (
		<Drawer
			variant="permanent"
			classes={{
				paper: classes.drawerPaper
			}}
		>
			<Container>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant="h6">My Shopping Cart</Typography>
						<Divider style={{ marginTop: '1rem' }} />
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
							shipInfo.zone ? router.push('/checkout') : router.push('/shippingInfo');
						}}
						style={{ backgroundColor: '#058c42', color: 'white', marginTop: '3rem' }}
						variant="contained"
						fullWidth
						disabled={checked.length === 0}
					>
						Proceed To Payment
					</Button>
				</Grid>
			</Container>
		</Drawer>
	);
}

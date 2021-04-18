import { Grid, Container, makeStyles, Paper, Typography, Button, Drawer } from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Image from 'next/image';
import { Fragment } from 'react';
import router from 'next/router';

const useStyles = makeStyles((theme) => ({
	drawerPaper: {
		width: 450,
		height: 500,
		marginLeft: '57rem',
		marginTop: '7rem',
		border: '1px solid #dee2e6',
		backgroundColor: theme.palette.primary.contrastText
	},
	margin: {
		marginTop: '2rem'
	},
	title: {
		fontWeight: 'bold',
		marginTop: '2rem'
	},
	subtitleMargin: {
		marginTop: '2rem'
	},
	image: {
		width: 128,
		height: 128
	},
	img: {
		margin: 'auto',
		display: 'block',
		maxWidth: '100%',
		maxHeight: '100%'
	}
}));

export default function CheckoutInfo({ checkedCart }) {
	const classes = useStyles();

	let subTotal = 0;
	checkedCart.map((p) => {
		subTotal += p.product.price * p.quantity;
	});

	return (
		<Fragment>
			<Drawer
				variant="permanent"
				classes={{
					paper: classes.drawerPaper
				}}
			>
				<Container>
					<div className={classes.margin}>
						<Grid container item spacing={2}>
							<Grid item xs={9}>
								<Typography variant="h6">{checkedCart.length} Items</Typography>
							</Grid>
							<Grid item xs={3}>
								<Button onClick={() => router.push('/cart')}>Edit</Button>
							</Grid>
						</Grid>
						<hr />
						{checkedCart.map((item) => (
							<Grid item container key={item._id} spacing={3} className={classes.margin}>
								<Grid item xs={5}>
									<Image src={item.product.files[0].url} alt="cart items" height={150} width={200} />
								</Grid>

								<Grid item xs={7}>
									<Typography variant="h6">Rs. {item.product.price}</Typography>
									<Typography variant="subtitle1">
										{`${item.product.make} (${item.product.model})`}
									</Typography>
									<Typography variant="subtitle1">Qty: {item.quantity}</Typography>
								</Grid>
							</Grid>
						))}
					</div>
				</Container>
			</Drawer>
		</Fragment>
	);
}

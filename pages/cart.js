import { useState, Fragment } from 'react';
import fetch from 'isomorphic-unfetch';
import { parseCookies } from 'nookies';
import Cart from '../models/Cart';
import dbConnect from '../utils/dbConnect';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import Link from 'next/link';
import { Button, Paper, Typography, Grid, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing(2),
		color: theme.palette.text.secondary,
		display: 'flex'
	},
	margin: {
		margin: theme.spacing(1)
	}
}));

export default function CartPage({ error, products }) {
	const classes = useStyles();

	const [ cartProducts, setCartProducts ] = useState(products);

	const router = useRouter();

	const { token } = parseCookies();
	if (!token) {
		return (
			<div>
				<h2>please lgin to view cart</h2>
				<Link href="/login">
					<Button color="inherit" component="a">
						Login
					</Button>
				</Link>
			</div>
		);
	}
	/**if in case the token is tampered we show error returned in error from getServerSideProps */
	if (error) {
		alert(error);
		cookie.remove('user');
		cookie.remove('token');
		router.push('/login');
	}

	const deleteCart = async (pId) => {
		try {
			const res = await fetch('/api/cart', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token
				},
				body: JSON.stringify({ productId: pId })
			});
			const data = await res.json();
			setCartProducts(data.cartProducts);
		} catch (error) {
			console.log(error);
		}
	};

	const CartItems = () => (
		<Fragment>
			{cartProducts.map((item) => (
				<Grid container spacing={3} className={classes.root} key={item.product._id}>
					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<img src={item.product.image} alt="d" style={{ height: 250, width: 250 }} />
							<div style={{ marginLeft: 250 }}>
								<Typography variant="h2">{item.product.name}</Typography>
								<Typography variant="h5">Rs {item.product.price}</Typography>
								<Typography variant="h6">Quantity: {item.quantity}</Typography>
								<Typography variant="body1">{item.product.description}</Typography>
							</div>
							<Button
								aria-label="delete"
								variant="contained"
								color="secondary"
								className={classes.margin}
								onClick={() => {
									deleteCart(item.product._id);
								}}
							>
								<DeleteIcon fontSize="large" />
							</Button>
						</Paper>
					</Grid>
					{/* <Grid item xs={4}>
						<Typography variant="h2">{item.product.name}</Typography>
					</Grid> */}
				</Grid>
			))}
		</Fragment>
	);

	return (
		<div>
			<CartItems />
		</div>
	);
}

export async function getServerSideProps(ctx) {
	const { token } = parseCookies(ctx);
	if (!token) {
		return {
			props: { products: [] }
		};
	}
	dbConnect();
	try {
		const { userId } = jwt.verify(token, process.env.JWT_SECRET);

		const cart = await Cart.findOne({ user: userId }).populate('products.product');

		const products = JSON.parse(JSON.stringify(cart.products));
		console.log(products);

		return {
			props: { products }
		};
	} catch (err) {
		return {
			props: { error: 'Authentication failed' }
		};
	}
}

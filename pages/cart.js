import { useState, Fragment, useEffect } from 'react';
import unfetch from 'isomorphic-unfetch';
import { parseCookies } from 'nookies';
import cookie from 'js-cookie';
import Cart from '../models/Cart';
import Product from '../models/Product';
import dbConnect from '../utils/dbConnect';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { IconButton, Paper, Typography, Grid, makeStyles, Container, Button, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import StripePayment from '../components/StripePayment';
import Image from 'next/image';
import useSwr, { mutate, trigger } from 'swr';
import axios from 'axios';
import deepEqual from 'fast-deep-equal';
import CircularProgress from '@material-ui/core/CircularProgress';

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

export default function CartPage({ products, message }) {
	const router = useRouter();

	if (message) {
		router.push('/login');
	}
	const { token } = parseCookies();

	console.log('Products', products);
	if (!products) {
		return (
			<div style={{ marginTop: '5rem' }}>
				<h1>There are no products yet in your cart</h1>
				{/* <CircularProgress /> */}
			</div>
		);
	}
	const { data, error } = useSwr('/api/cart', {
		dedupingInterval: 60000,
		initialData: products
	});
	console.log('SWRdATA', data.cartProducts);

	const cookie1 = parseCookies();

	const classes = useStyles();

	const [ cartProducts, setCartProducts ] = useState(products);
	const [ total, setTotal ] = useState(0);

	// if (!data.cartProducts) {
	// 	return (
	// 		<div style={{ marginTop: '5rem' }}>
	// 			<h1>No products in cart</h1>
	// 			{/* <CircularProgress /> */}
	// 		</div>
	// 	);
	// }

	/**if in case the token is tampered we show error returned in error from getServerSideProps */
	// if (error) {
	// 	alert(error);
	// 	cookie.remove('user');
	// 	cookie.remove('token');
	// 	router.push('/login');
	// }

	useEffect(
		() => {
			calcTotal(cartProducts);
		},
		[ cartProducts ]
	);

	const calcTotal = (cartProducts) => {
		let total = 0;
		cartProducts.map((p) => {
			total += p.product.price * p.quantity;
		});
		setTotal(total);
	};

	const deleteCart = async (pId) => {
		try {
			// mutate('/api/cart', data.cartProducts.filter((c) => c.id !== pId), false);

			const res = await fetch('/api/cart', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token
				},
				body: JSON.stringify({ productId: pId })
			});
			mutate('/api/cart');

			// const data = await res.json();
			// setCartProducts(data.cartProducts);
		} catch (error) {
			console.log(error);
		}
	};

	// onClick={async () => {
	// 	const deleteUrl = '/api/cart' + item.product._id;
	// 	const url = '/api/cart';
	// 	mutate(url, data.filter((c) => c.id !== item.product._id), false);
	// 	await axios.delete(deleteUrl);
	// 	trigger(url);
	// }}

	const CartItems = () => (
		<Container>
			{(data.cartProducts ? data.cartProducts : products).map((item) => (
				<Grid container spacing={3} key={item.product._id} style={{ marginTop: '3rem' }}>
					<Grid item xs={12} lg={4}>
						<Image src={item.product.files[0].url} alt="cart items" height={250} width={200} />
					</Grid>
					<Grid item xs={12} lg={4}>
						<Typography variant="h2">{item.product.name}</Typography>
						<Typography variant="h5">Rs {item.product.price}</Typography>
						<Typography variant="h6">Quantity: {item.quantity}</Typography>
					</Grid>
					<Grid item xs={12} lg={2}>
						<Tooltip title="remove from cart">
							<IconButton
								aria-label="delete"
								variant="contained"
								color="secondary"
								className={classes.margin}
								onClick={() => {
									deleteCart(item.product._id);
								}}
							>
								<DeleteIcon fontSize="large" />
							</IconButton>
						</Tooltip>
					</Grid>
					<Grid item xs={12} lg={2}>
						<Button color="primary" variant="contained">
							<StripePayment />
						</Button>
					</Grid>
				</Grid>
			))}
			{products !== null && <Typography>Total: Rs. {total}</Typography>}
		</Container>
	);

	return (
		<div>
			<CartItems />
		</div>
	);
}

export async function getServerSideProps(ctx) {
	await dbConnect();
	const { token } = parseCookies(ctx);
	if (token) {
		const { userId } = jwt.verify(token, process.env.JWT_SECRET);

		//adding Product model to the populate function is needed to eleviate connection issues which occure during  population
		const cart = await Cart.findOne({ user: userId }).populate('products.product', Product);
		console.log('Cart', cart);
		// const products = JSON.parse(JSON.stringify(cart));
		const products = JSON.parse(JSON.stringify(cart.products));
		console.log('SSRproducts', products);

		return {
			props: { products }
		};
	} else {
		return {
			props: { message: 'Login to view cart' }
		};
	}
}

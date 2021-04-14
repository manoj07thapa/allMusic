import { useState } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import { parseCookies } from 'nookies';
import { Typography, TextField, Button, Grid, Container, Tooltip, IconButton } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import dbConnect from '../../../../utils/dbConnect';
import Product from '../../../../models/Product';
import Modal from '../../../../components/Modal';
import cookie1 from 'js-cookie';
import Carousel from '../../../../components/Carousel';
import SuggestedCarousel from '../../../../components/SuggestedCarousel';
import StripePayment from '../../../../components/StripePayment';
import LoginModal from '../../../../components/LoginModal';
import CartModal from '../../../../components/CartModal';

const useStyles = makeStyles((theme) => ({
	mainGrid: {
		marginTop: '6rem',
		backgroundColor: theme.palette.primary.contrastText
	}
}));

export default function SingleProduct({ product, suggestedProducts }) {
	if (!product || null) {
		return <h1>This product is un avillable</h1>;
	}
	const classes = useStyles();
	const [ quantity, setQuantity ] = useState(1);

	const router = useRouter();

	const cookie = parseCookies();
	const user = cookie.user ? JSON.parse(cookie.user) : '';

	const addToCart = async () => {
		try {
			const res = await fetch(`/api/cart`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: cookie.token
				},
				body: JSON.stringify({ quantity, productId: product._id })
			});
			// const data = await res.json();
			// console.log('CARTADDEDRES', data);
			// setRecentlyAddedItem(data.newProductCart);
		} catch (error) {
			cookie1.remove('user');
			cookie1.remove('token');
			router.push('/login');
		}
	};

	const handleDelete = async () => {
		const productId = router.query.id;
		try {
			const res = await fetch(`/api/products/${productId}`, {
				method: 'DELETE'
			});
			if (res.status === 200) {
				router.back();
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (router.isFallback) {
		return <h3>Loading...</h3>;
	}

	return (
		<div>
			<Head>
				<title>{product.make + '' + product.model}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Container>
				<Grid container spacing={9} className={classes.mainGrid}>
					<Grid item xs={12} sm={5}>
						<Carousel product={product} />
					</Grid>

					<Grid item xs={12} sm={6} container>
						<Grid container item xs={8} spacing={2}>
							<Grid item xs={12}>
								<Typography gutterBottom variant="h5">
									{product.make}
								</Typography>
								<Typography variant="subtitle1">{product.model}</Typography>

								<Typography variant="h6">Rs. {product.price}</Typography>
								<Typography variant="body2" color="textSecondary">
									{product.description}
								</Typography>
								<TextField
									id="outlined-number"
									label="Quantity"
									type="number"
									InputLabelProps={{
										shrink: true
									}}
									variant="outlined"
									value={quantity}
									onChange={(e) => setQuantity(parseInt(e.target.value))}
									style={{ marginTop: '2rem' }}
								/>
							</Grid>

							<Grid item xs={6} style={{ marginTop: '2rem' }}>
								{user ? (
									<CartModal addToCart={addToCart} recentlyAddedItem={product} />
								) : (
									<LoginModal />
								)}
							</Grid>
						</Grid>

						<Grid item xs={1}>
							<Tooltip title="Delete product">
								<Typography variant="body2" style={{ cursor: 'pointer' }}>
									{user.role === 'admin' || user.role === 'root' ? (
										<Modal handleDelete={handleDelete} />
									) : null}
								</Typography>
							</Tooltip>
							<Tooltip title="add to favourite" style={{ marginTop: '2rem' }}>
								<IconButton aria-label="delete" variant="contained" className={classes.margin}>
									<FavoriteBorderIcon />
								</IconButton>
							</Tooltip>
						</Grid>
					</Grid>
				</Grid>
				<SuggestedCarousel suggestedProducts={suggestedProducts} />
			</Container>
		</div>
	);
}

export async function getStaticProps(ctx) {
	await dbConnect();
	const id = ctx.params.id;
	const category = ctx.params.category;
	const make = ctx.params.make;

	const productPromise = Product.findById(id).lean();

	//querying for similar products suggestion in individual product page
	const resPromise = Product.find({ category, make }).limit(10);

	try {
		const [ product, res ] = await Promise.all([ productPromise, resPromise ]);
		product._id = product._id.toString();
		const suggestedProducts = JSON.parse(JSON.stringify(res));

		return { props: { product, suggestedProducts }, revalidate: 3 };
	} catch (error) {
		return { props: { err: 'No product' } };
	}
}

export const getStaticPaths = async () => {
	await dbConnect();
	try {
		const products = await Product.find({}).limit(5);

		return {
			fallback: true, //fallback set to false means we dont need this at runtime
			paths: products.map((p) => {
				return {
					params: {
						id: p._id.toString(),
						category: p.category.toString(),
						make: p.make.toString(),
						model: p.model.toString()
					}
				};
			}) // params we get in ctx object in getStaticProps function, only ids sent via paths are statically served at buildtime
		};
	} catch (error) {
		console.log(error);
	}
};

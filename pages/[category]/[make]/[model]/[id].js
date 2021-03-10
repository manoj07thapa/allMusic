import { useState } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import AddIcon from '@material-ui/icons/Add';
import { parseCookies } from 'nookies';
import { Typography, Paper, TextField, Button, ButtonBase, Grid, Container } from '@material-ui/core';
import dbConnect from '../../../../utils/dbConnect';
import Product from '../../../../models/Product';
import Modal from '../../../../components/Modal';
import cookie1 from 'js-cookie';
import Carousel from '../../../../components/Carousel';
import SuggestedCarousel from '../../../../components/SuggestedCarousel';

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),
		margin: 'auto',
		textAlign: 'center'
	},

	img: {
		width: '100%'
	}
}));

export default function SingleProduct({ product, suggestedProducts }) {
	const suggestion = JSON.parse(suggestedProducts);

	if (!product || null) {
		return <h1>This product is un avillable</h1>;
	}
	const classes = useStyles();
	const [ quantity, setQuantity ] = useState(1);

	const router = useRouter();
	console.log(router);

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
			const data = await res.json();
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
				router.push('/');
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
			<Paper className={classes.paper}>
				<Grid container spacing={5}>
					<Grid item xs={12} lg={4}>
						<Carousel product={product} />
					</Grid>
					<Grid item xs={12} lg={6} container>
						<Grid item xs container direction="column" spacing={2}>
							<Grid item xs>
								<Typography gutterBottom variant="h4">
									{product.make}
								</Typography>
								<Typography variant="h5" gutterBottom>
									Model: {product.model}
								</Typography>

								<Typography variant="subtitle1"> ${product.price}</Typography>
								<TextField
									id="outlined-number"
									label="Number"
									type="number"
									InputLabelProps={{
										shrink: true
									}}
									variant="outlined"
									value={quantity}
									onChange={(e) => setQuantity(parseInt(e.target.value))}
								/>
							</Grid>
							<Grid item>
								<Typography variant="body2" color="textSecondary">
									{product.description}
								</Typography>
							</Grid>
							<Grid item>
								<Typography variant="body2" style={{ cursor: 'pointer' }}>
									{user.role === 'admin' || user.role === 'root' ? (
										<Modal handleDelete={handleDelete} />
									) : null}
								</Typography>
							</Grid>
						</Grid>

						<Grid item>
							{user ? (
								<Button color="primary" variant="contained" onClick={addToCart}>
									<AddIcon /> Add to cart
								</Button>
							) : (
								<Button color="primary" variant="contained" onClick={() => router.push('/login')}>
									Login To add product
								</Button>
							)}
						</Grid>
					</Grid>
				</Grid>
			</Paper>
			<Grid container spacing={5}>
				<Container>
					<Paper className={classes.paper}>
						<Grid item xs={10}>
							<SuggestedCarousel suggestedProducts={suggestion} />
						</Grid>
					</Paper>
				</Container>
			</Grid>
		</div>
	);
}

export async function getStaticProps(ctx) {
	const id = ctx.params.id;
	const category = ctx.params.category;
	const make = ctx.params.make;
	await dbConnect();
	const product = await Product.findById(id).lean();
	product._id = product._id.toString();

	//querying for similar products suggestion in individual product page
	const res = await Product.find({ category, make }).limit(10);
	const suggestedProducts = JSON.stringify(res);

	return { props: { product, suggestedProducts }, revalidate: 3 };
}

export const getStaticPaths = async () => {
	await dbConnect();
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
};

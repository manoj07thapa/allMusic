import { useState } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import fetch from 'isomorphic-unfetch';
import AddIcon from '@material-ui/icons/Add';
import { parseCookies } from 'nookies';
import { Typography, Card, CardActions, CardContent, TextField, Button } from '@material-ui/core';
import dbConnect from '../../utils/dbConnect';
import Product from '../../models/Product';
import Modal from '../../components/Modal';
import cookie1 from 'js-cookie';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	title: {
		fontSize: 14
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary
	}
}));

export default function SingleNote({ product }) {
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
			const data = await res.json();
			console.log(data);
			// if (res.status === 200) {
			// 	router.push('/');
			// }
		} catch (error) {
			console.log(error);
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
		<Card variant="outlined" className={classes.paper}>
			<CardContent>
				<Typography className={classes.title} color="textSecondary" gutterBottom variant="h6">
					{product.name}
				</Typography>
				<Typography variant="body2" component="p">
					{product.description}
				</Typography>
			</CardContent>
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
			{user ? (
				<Button color="primary" variant="contained" onClick={addToCart}>
					<AddIcon /> Add Product
				</Button>
			) : (
				<Button color="primary" variant="contained" onClick={() => router.push('/login')}>
					Login To add product
				</Button>
			)}

			<br />
			<br />
			{user.role === 'asmin' || user.role === 'root' ? (
				<CardActions>
					<Modal handleDelete={handleDelete} />
				</CardActions>
			) : null}
			{/* <CardActions>
				<Modal handleDelete={handleDelete} />
			</CardActions> */}
		</Card>
	);
}

export async function getStaticProps(ctx) {
	const id = ctx.params.id;
	await dbConnect();
	const product = await Product.findById(id).lean();
	product._id = product._id.toString();

	return { props: { product }, revalidate: 3 };
}

export const getStaticPaths = async () => {
	await dbConnect();
	const products = await Product.find({});
	const productIds = products.map((product) => {
		return {
			params: { id: product._id.toString() }
		};
	});
	return {
		fallback: true, //fallback set to false means we dont need this at runtime
		paths: productIds // params we get in ctx object in getStaticProps function, only ids sent via paths are statically served at buildtime
	};
};

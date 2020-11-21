import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import fetch from 'isomorphic-unfetch';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { Typography, Card, CardActions, CardContent, TextField, Button } from '@material-ui/core';
import dbConnect from '../../utils/dbConnect';
import Product from '../../models/Product';
import Modal from '../../components/Modal';

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

	const router = useRouter();

	console.log(router);
	const handleDelete = async () => {
		const productId = router.query.id;
		try {
			const res = await fetch(`/api/products/${productId}`, {
				method: 'DELETE'
			});
			console.log(res);
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
				defaultValue="1"
			/>
			<Button color="primary" variant="contained">
				<AddIcon /> Add Product
			</Button>
			<br />
			<br />
			<CardActions>
				<Modal handleDelete={handleDelete} />
			</CardActions>
		</Card>
	);
}

export async function getStaticProps(ctx) {
	console.log(ctx);
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

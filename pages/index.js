import { Fragment } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import dbConnect from '../utils/dbConnect';
import Product from '../models/Product';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	media: {
		height: 300
	},
	card: {
		padding: theme.spacing(1),
		textAlign: 'center',
		color: theme.palette.text.secondary
	}
}));

export default function Home({ products, error }) {
	if (error) {
		alert(error);
	}
	const classes = useStyles();
	function FormRow() {
		return (
			<Fragment>
				{products.map((product) => (
					<Grid item xs={12} sm={6} lg={4} key={product._id}>
						<Card className={classes.card}>
							<CardActionArea>
								<CardMedia
									className={classes.media}
									title="Contemplative Reptile"
									image={product.image}
								/>
								{/* <Image src={product.image} height={250} width={300} alt="my product" />
						</CardMedia> */}
								<CardContent>
									<Typography gutterBottom variant="h5" component="h2">
										{product.name}
									</Typography>
									<Typography gutterBottom variant="h5" component="h2">
										{product.price}
									</Typography>
									<Typography variant="body2" color="textSecondary" component="p">
										{product.description}
									</Typography>
								</CardContent>
							</CardActionArea>
							<CardActions>
								<Link href={`/product/${product._id}`}>
									<Button size="small" color="primary" component="a">
										Learn More
									</Button>
								</Link>
							</CardActions>
						</Card>
					</Grid>
				))}
			</Fragment>
		);
	}
	return (
		<div>
			<Head>
				<title>Shoppify</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className={classes.root}>
				<Grid container spacing={1}>
					<Grid container item xs={12} spacing={3}>
						<FormRow />
					</Grid>
				</Grid>
			</div>
		</div>
	);
}

export async function getStaticProps() {
	await dbConnect();
	try {
		const result = await Product.find({});
		const products = result.map((doc) => {
			const product = doc.toObject();
			product._id = product._id.toString();
			return product;
		});

		return {
			props: {
				products
			}
		};
	} catch (err) {
		return {
			props: {
				error: 'Failed to load the products'
			}
		};
	}

	/* In getStaticProps we can directly qury database since it runs on server */
}

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
import dbConnect from '../utils/dbConnect';
import Product from '../models/Product';

const useStyles = makeStyles({
	root: {
		maxWidth: 345
	},
	media: {
		height: 300
	}
});

export default function Home({ products }) {
	const classes = useStyles();
	console.log(products);
	return (
		<div>
			<Head>
				<title>Shoppify</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{products.map((product) => (
				<Card className={classes.root} key={product._id}>
					<CardActionArea>
						<CardMedia className={classes.media} title="Contemplative Reptile">
							<Image src={product.image} height={250} width={300} alt="my product" />
						</CardMedia>
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
						<Button size="small" color="primary">
							Share
						</Button>
						<Link href={`/product/${product._id}`}>
							<Button size="small" color="primary" component="a">
								Learn More
							</Button>
						</Link>
					</CardActions>
				</Card>
			))}

			{/* <Card className={classes.root}>
				<CardActionArea>
					<CardMedia className={classes.media} title="Contemplative Reptile">
						<Image src={products.image} height={140} width={140} alt="my product" />
					</CardMedia>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							{products.title}
						</Typography>
						<Typography gutterBottom variant="h5" component="h2">
							{products.price}
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							{products.description}
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Button size="small" color="primary">
						Share
					</Button>
					<Button size="small" color="primary">
						Learn More
					</Button>
				</CardActions>
			</Card> */}
		</div>
	);
}

export async function getStaticProps() {
	await dbConnect();

	/* In getStaticProps we can directly qury database since it runs on server */
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
}

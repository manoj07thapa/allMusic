import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
	media: {
		height: 0,
		paddingTop: '56.25%' // 16:9
	},
	anchorTag: {
		textDecoration: 'none'
	}
}));

export default function ProductCard({ product }) {
	const classes = useStyles();

	return (
		<Link href={`/product/${product.make}/${product.model}/${product._id}`}>
			<a className={classes.anchorTag}>
				<Card className={classes.root}>
					<CardHeader
						avatar={
							<Avatar aria-label="recipe" className={classes.avatar}>
								R
							</Avatar>
						}
						action={
							<IconButton aria-label="settings">
								<MoreVertIcon />
							</IconButton>
						}
						title={product.make + '' + product.model}
						subheader={`Rs. ${product.price}`}
					/>
					<CardMedia
						className={classes.media}
						image={product.image}
						title={product.make + '' + product.model}
					/>
					<CardContent>
						<Typography variant="body2" color="textSecondary" component="p">
							{product.description}
						</Typography>
					</CardContent>
				</Card>
			</a>
		</Link>
	);
}

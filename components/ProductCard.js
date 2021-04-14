import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Tooltip from '@material-ui/core/Tooltip';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Link from 'next/link';
import Skeleton from '@material-ui/lab/Skeleton';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.primary.contrastText,
		padding: '1rem'
	},
	media: {
		height: 0,
		paddingTop: '56.25%' // 16:9
	},
	anchorTag: {
		textDecoration: 'none'
	},
	avatar: {
		backgroundColor: red[500]
	}
}));

export default function ProductCard({ product }) {
	const classes = useStyles();

	const image = product.files.map((file) => file.url);
	const avatar = product.make.replace(/\W*(\w)\w*/g, '$1').toUpperCase();

	return (
		<Link href={`/${product.category}/${product.make}/${product.model}/${product._id}`}>
			<a className={classes.anchorTag}>
				<Card className={classes.root}>
					<CardHeader
						avatar={
							!product ? (
								<Skeleton animation="wave" variant="circle" width={40} height={40} />
							) : (
								<Avatar aria-label="recipe">{avatar}</Avatar>
							)
						}
						title={
							!product ? (
								<Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
							) : (
								product.make + '' + product.model
							)
						}
						subheader={
							!product ? <Skeleton animation="wave" height={10} width="40%" /> : `Rs. ${product.price}`
						}
					/>

					{!product ? (
						<Skeleton animation="wave" variant="rect" className={classes.media} />
					) : (
						<CardMedia
							className={classes.media}
							image={image[0]}
							title={product.make + '' + product.model}
						/>
					)}
					<Tooltip title="add to favourite">
						<IconButton aria-label="delete" variant="contained" className={classes.margin}>
							<FavoriteBorderIcon />
						</IconButton>
					</Tooltip>
				</Card>
			</a>
		</Link>
	);
}

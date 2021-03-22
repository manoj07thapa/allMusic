import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Grid, Typography } from '@material-ui/core';
import ProductCard from './ProductCard';

export default function Carousel({ suggestedProducts }) {
	const settings = {
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		speed: 12000,
		autoplaySpeed: 12000
	};
	return (
		<Grid container spacing={3} style={{ marginTop: '7rem' }}>
			<Grid item xs={12}>
				<Typography variant="h6">You might also like</Typography>
			</Grid>
			<Grid item xs={12}>
				<Slider {...settings}>
					{suggestedProducts.map((product, i) => <ProductCard product={product} key={i} />)}
				</Slider>
			</Grid>
		</Grid>
	);
}

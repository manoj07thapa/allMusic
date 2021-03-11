import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Grid } from '@material-ui/core';
import ProductCard from './ProductCard';

export default function Carousel({ suggestedProducts }) {
	console.log(suggestedProducts);
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3,
		autoplay: true,
		speed: 12000,
		autoplaySpeed: 12000
	};
	return (
		<Slider {...settings}>
			{suggestedProducts.map((product, i) => <ProductCard product={product} key={i} />)}
		</Slider>
	);
}

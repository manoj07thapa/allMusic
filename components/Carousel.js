import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Carousel({ product }) {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		pauseOnHover: true,
		adaptiveHeight: true,
		autoplay: true,
		cssEase: 'linear'
	};
	return (
		<div>
			<Slider {...settings}>{product.files.map((file, i) => <img key={i} src={file.url} alt="" />)}</Slider>
		</div>
	);
}

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

export default function Carousel({ product }) {
	const settings = {
		customPaging: function(i) {
			return (
				<div>
					<a style={{ marginTop: '5rem' }}>
						<Image src={`${product.files[0].url}`} width={100} height={100} />
					</a>
				</div>
				// {product.files.map((img, i) => (
				// 	<a key={i} style={{ marginTop: '5rem' }}>
				// 		<Image src={`${img.url} `} width={50} height={50} />
				// 	</a>
				// ))}
			);
		},

		dotsClass: 'slick-dots slick-thumb',
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		pauseOnHover: true,
		// autoplay: true,
		arrows: false
	};
	return (
		<Slider {...settings}>
			{product.files.map((file, i) => (
				<Image
					key={i}
					src={file.url}
					alt="Individual Image"
					height={600}
					width={500}
					objectFit="cover"
					layout="responsive"
					objectPosition="center center"
				/>
			))}
		</Slider>
	);
}

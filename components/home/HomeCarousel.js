import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { makeStyles, Grid } from '@material-ui/core';
import Image from 'next/image';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: '3.5rem'
	}
}));

export default function HomeCarousel({ resource }) {
	const classes = useStyles();

	const settings = {
		className: 'center',
		dots: true,
		infinite: true,
		speed: 800,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false
		// autoplay: true
	};
	return (
		<div>
			<Grid container>
				<Grid item xs={12}>
					<Slider {...settings}>
						{resource.map((r) => {
							return r.files.map((f) => (
								<Image
									src={f.url}
									alt="carousel"
									height={500}
									width={1400}
									objectFit="cover"
									layout="responsive"
									objectPosition="center center"
								/>
							));
						})}
					</Slider>
				</Grid>
			</Grid>
		</div>
	);
}

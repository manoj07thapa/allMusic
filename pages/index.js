import Head from 'next/head';
import HomeCarousel from '../components/home/HomeCarousel';
import dbConnect from '../utils/dbConnect';
import Resource from '../models/Resource';

export default function Home({ resource }) {
	return (
		<div>
			<Head>
				<title>Shopify</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div>
				<HomeCarousel resource={resource} />
			</div>
		</div>
	);
}

export async function getStaticProps() {
	await dbConnect();
	const res = await Resource.find({});
	const resource = JSON.parse(JSON.stringify(res));
	return {
		props: { resource }
	};
}

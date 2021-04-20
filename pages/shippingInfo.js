import { parseCookies } from 'nookies';
import ShipInfo from '../models/ShipInfo';
import dbConnect from '../utils/dbConnect';
import jwt from 'jsonwebtoken';
import { Fragment } from 'react';
import Head from 'next/head';
import ShippingInfoForm from '../components/ShippingInfoForm';

export default function ShippingInfo() {
	return (
		<Fragment>
			<Head>
				<title>Shipping Infoormation</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<ShippingInfoForm />
		</Fragment>
	);
}

export async function getServerSideProps(ctx) {
	await dbConnect();
	const { token } = parseCookies(ctx);

	if (!token) {
		return {
			notFound: true
		};
	}
	const { userId } = jwt.verify(token, process.env.JWT_SECRET);

	const ship = await ShipInfo.findOne({ user: userId });
	const shipInfo = ship.shipInfo.zone;

	if (shipInfo) {
		return {
			redirect: {
				destination: '/checkout',
				permanent: false
			}
		};
	}
	return {
		props: {}
	};
}

import { parseCookies } from 'nookies';
import ShipInfo from '../models/ShipInfo';
import dbConnect from '../utils/dbConnect';
import jwt from 'jsonwebtoken';
import ShippingInfoForm from '../components/ShippingInfoForm';

export default function ShippingInfo() {
	return <ShippingInfoForm />;
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

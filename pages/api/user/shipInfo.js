import ShipInfo from '../../../models/ShipInfo';
import dbConnect from '../../../utils/dbConnect';
import Authenticated from '../../../utils/Authenticated';

export default async function cart(req, res) {
	await dbConnect();
	switch (req.method) {
		case 'PUT':
			await addShipInfo(req, res);
			break;
		case 'GET':
			await getShipInfo(req, res);
			break;
	}
}

const addShipInfo = Authenticated(async (req, res) => {
	console.log('REQSHIP', req.body);
	const { zone, district, phNumber, city, area, address } = req.body;
	const phone = parseInt(phNumber);
	console.log('OUTER', zone);
	try {
		console.log('INNER', zone);
		if (!zone || !district || !phone || !area || !address) {
			return res.status(422).json({ error: 'Please add all the required fields' });
		}
		const ship = await ShipInfo.findOne({ user: req.userId });

		const shipInfo = await ShipInfo.findOneAndUpdate(
			{ _id: ship._id },
			{ $set: { zone, district, phone, city, area, address } },
			{ useFindAndModify: false }
		);
		console.log('SHIPINFO', shipInfo);
		return res.json({ success: true, shipInfo });
	} catch (error) {
		console.log('SHIPERROR', error);
		return res.json({ success: false, message: 'Couidnot create the shipping info' });
	}
});

const getShipInfo = Authenticated(async (req, res) => {
	try {
		const shipInfo = await ShipInfo.findOne({ user: req.userId });
		res.status(200).json({ success: true, shipInfo });
	} catch (error) {
		console.log(error);
		res.status(401).json({ success: false, message: 'Unable to fetch shipping info' });
	}
});

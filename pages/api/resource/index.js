// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from '../../../utils/dbConnect';
import Resource from '../../../models/Resource';

export default async (req, res) => {
	await dbConnect();
	switch (req.method) {
		case 'GET':
			try {
				const resource = await Resource.find({});
				return res.status(200).json(resource);
			} catch (error) {
				return res.status(400).json({ success: false, error: 'Sorry couldnot find products' });
			}
			break;
		case 'POST':
			const { category, title, subtitle, subtitle1, subtitle2, subtitle3, files, description } = req.body.values;
			try {
				if (!category || !title || !subtitle || !description || !files) {
					return res.status(404).json({ success: false, error: 'Add all the required fields' });
				}
				const resource = await new Resource({
					category,
					title,
					subtitle,
					subtitle1,
					subtitle2,
					subtitle3,
					description,
					files
				}).save();
				return res.status(201).json({ success: true, data: resource, message: 'Utility Created' });
			} catch (error) {
				console.log(error);
				return res.status(400).json({ success: false, error: 'Sorry couldnot create the utility' });
			}
			break;

		default:
			return res.status(400).json({ success: false });
			break;
	}
};

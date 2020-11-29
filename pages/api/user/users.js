import User from '../../../models/User';
import Authenticated from '../../../utils/Authenticated';

export default async (req, res) => {
	switch (req.method) {
		case 'GET':
			await getUsers(req, res);
			break;
		case 'PUT':
			await changeRole(req, res);
			break;
	}
};

const getUsers = Authenticated(async (req, res) => {
	/*getting all the users except for the  loggedin user
    In this case the logged in user is root user */

	try {
		const users = await User.find({ _id: { $ne: req.userId } }).select('-password');
		res.status(200).json({ success: true, users });
	} catch (error) {
		res.status(404).json({ success: false, data: {} });
	}
});

const changeRole = Authenticated(async (req, res) => {
	const { _id, currentRole } = req.body;
	try {
		const newRole = currentRole === 'user' ? 'admin' : 'user';
		const user = await User.findByIdAndUpdate({ _id }, { role: newRole }, { new: true });
		res.status(200).json({ success: true, user });
	} catch (error) {
		res.status(404).json({ success: false });
	}
});

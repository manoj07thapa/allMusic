import User from '../../../models/User';
import Authenticated from '../../../utils/Authenticated';

export default Authenticated(async (req, res) => {
	/*getting all the users except for the  loggedin user
    In this case the logged in user is root user */

	try {
		const users = await User.find({ _id: { $ne: req.userId } }).select('-password');
		res.status(200).json({ success: true, users });
	} catch (error) {
		res.status(404).json({ success: false, data: {} });
	}
});

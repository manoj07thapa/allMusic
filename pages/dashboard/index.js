import { parseCookies } from 'nookies';
import UserRoles from '../../components/UserRoles';
import Sidebar from '../../components/Sidebar';

// {
// 	/* <div>
// 			<h2>User's Detail</h2>
// 			<hr />
// 			<br />
// 			<br />
// 			{user.role === 'root' && <UserRoles />}
// 		</div> */
// }

export default function DashBoard() {
	const cookie = parseCookies();
	const user = cookie.user ? JSON.parse(cookie.user) : '';
	return (
		<div>
			<Sidebar />
		</div>
	);
}

export async function getServerSideProps(ctx) {
	const { token } = parseCookies(ctx);
	if (!token) {
		return {
			redirect: {
				destination: '/login',
				permanent: false
			}
		};
	}
	return {
		props: {}
	};
}

import { parseCookies } from 'nookies';
import UserRoles from '../components/UserRoles';

export default function DashBoard() {
	return (
		<div>
			<h2>User's Detail</h2>
			<hr />
			<br />
			<br />
			<UserRoles />
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

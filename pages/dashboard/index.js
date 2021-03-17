import { parseCookies } from 'nookies';
import Sidebar from '../../components/Sidebar';

export default function DashBoard() {
	const cookie = parseCookies();
	const user = cookie.user ? JSON.parse(cookie.user) : '';
	return (
		<div style={{ display: 'flex' }}>
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

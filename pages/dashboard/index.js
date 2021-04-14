import { parseCookies } from 'nookies';
import DashboardSidebar from '../../components/DashboardSidebar';

export default function DashBoard() {
	const cookie = parseCookies();
	const user = cookie.user ? JSON.parse(cookie.user) : '';
	return (
		<div style={{ display: 'flex' }}>
			<DashboardSidebar />
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

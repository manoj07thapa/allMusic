import { parseCookies } from 'nookies';
import DashboardSidebar from '../../components/DashboardSidebar';
import { Fragment } from 'react';
import Head from 'next/head';

export default function DashBoard() {
	const cookie = parseCookies();
	const user = cookie.user ? JSON.parse(cookie.user) : '';
	return (
		<Fragment>
			<Head>
				<title>Dashboard</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div style={{ display: 'flex' }}>
				<DashboardSidebar />
			</div>
		</Fragment>
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

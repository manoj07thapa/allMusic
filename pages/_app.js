import { Box, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import Head from 'next/head';
import React from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { darkTheme } from '../components/theme';
import { SWRConfig } from 'swr';
import axios from 'axios';
import { useState } from 'react';
import { parseCookies } from 'nookies';
// import '../styles/globals.css';

// axios.defaults.baseURL = 'http://localhost:3000';
NProgress.configure({ showSpinner: true });
Router.events.on('routeChangeStart', () => {
	NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function MyApp({ Component, pageProps }) {
	const [ theme, setTheme ] = useState(darkTheme);
	const isDarkTheme = theme === darkTheme;

	React.useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);
	const { token } = parseCookies();

	const auth = {
		headers: { Authorization: token }
	};

	return (
		<React.Fragment>
			<Head>
				<title>My page</title>
				<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
			</Head>
			<ThemeProvider theme={theme}>
				{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				<Navbar isDarkTheme={isDarkTheme} setTheme={setTheme} />

				<SWRConfig value={{ fetcher: (url) => axios(url, auth).then((r) => r.data) }}>
					<Box marginTop={7}>
						<Component {...pageProps} />
					</Box>
				</SWRConfig>
				{/* <Footer /> */}
			</ThemeProvider>
		</React.Fragment>
	);
}
